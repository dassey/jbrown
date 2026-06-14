/**
 * Basement Designer — CODE CHECK.
 *
 * Validates a basement plan against the common building-code rules a finished
 * basement must meet (egress, ceiling height, room sizes, bathroom fixtures,
 * stairs, blocked egress, overlapping rooms). Each issue has a severity, a
 * plain-English reason, and a fix. Passing checks are reported too.
 *
 * Thresholds live in RULES. Numbers reflect IRC-style basement conventions;
 * always confirm against your local code.
 */
import { getElement } from './catalog'
import { footprintSize, frontCenter, inchesToFeet, itemBox, overlapArea, quarter, type Box } from './geometry'
import type { Issue, Item, Plan, WallSide } from './types'

export const RULES = {
  ceilingMin: 84, // 7 ft
  bedroomMinSqft: 70,
  bathMinSqft: 18,
  egressClear: 36,
  poolClear: 40,
}

function wallOf(it: Item): WallSide {
  return (['north', 'east', 'south', 'west'] as WallSide[])[quarter(it.rotation) / 90]
}
function area(it: Item): number {
  return (it.width * it.depth) / 144
}
function gapBetween(a: Box, b: Box): number {
  const xO = a.minX < b.maxX && a.maxX > b.minX
  const yO = a.minY < b.maxY && a.maxY > b.minY
  if (xO && yO) return 0
  if (xO) return Math.max(b.minY - a.maxY, a.minY - b.maxY)
  if (yO) return Math.max(b.minX - a.maxX, a.minX - b.maxX)
  return Infinity
}

export function validate(plan: Plan): Issue[] {
  const issues: Issue[] = []
  const items = plan.items
  const defOf = (i: Item) => getElement(i.defId)
  const zones = items.filter((i) => defOf(i)?.class === 'zone')
  const byKind = (k: string) => items.filter((i) => defOf(i)?.kind === k)
  const egress = byKind('egress')
  const stairs = byKind('stairs')

  /* --------------------------- ceiling height --------------------------- */
  if (plan.room.height < RULES.ceilingMin) {
    issues.push({ id: 'ceiling', severity: 'warning', title: `Ceiling height is ${plan.room.height}″`, detail: 'Finished basements generally need 7 ft (84″) of clear height under beams and ducts.', fix: 'Raise the ceiling height, or check for a local variance.' })
  } else {
    issues.push({ id: 'ceiling-ok', severity: 'ok', title: `Ceiling height ${inchesToFeet(plan.room.height)}`, detail: 'Meets the 7 ft minimum for finished space.' })
  }

  /* ------------------------------- stairs ------------------------------- */
  if (zones.length > 0 && stairs.length === 0) {
    issues.push({ id: 'stairs', severity: 'warning', title: 'No staircase placed', detail: 'A finished basement needs safe, finished access to the floor above.', fix: 'Add a staircase from the Structure & features list.' })
  } else if (stairs.length > 0) {
    issues.push({ id: 'stairs-ok', severity: 'ok', title: 'Staircase placed', detail: 'Finished access to the upper floor.' })
  }

  /* ------------------------- bedrooms (egress) -------------------------- */
  for (const bed of byKind('bedroom')) {
    const bb = itemBox(bed)
    const hasEgress = egress.some((e) => overlapArea(bb, itemBox(e)) > 4 || gapBetween(bb, itemBox(e)) < 2)
    if (!hasEgress) {
      issues.push({ id: `egress-${bed.id}`, severity: 'error', title: 'Bedroom has no egress window', detail: 'A legal, sleepable bedroom must have an egress window + well for escape and rescue.', fix: 'Add an egress window on this bedroom’s exterior wall.', itemIds: [bed.id], marker: { x: bed.x, y: bed.y } })
    } else {
      issues.push({ id: `egress-ok-${bed.id}`, severity: 'ok', title: 'Bedroom egress OK', detail: 'This bedroom has an egress window.' })
    }
    if (area(bed) < RULES.bedroomMinSqft) {
      issues.push({ id: `bedsize-${bed.id}`, severity: 'warning', title: `Bedroom is ${Math.round(area(bed))} sq ft`, detail: 'Habitable rooms generally need at least 70 sq ft and a 7 ft minimum dimension.', fix: 'Enlarge the bedroom.', itemIds: [bed.id] })
    }
  }

  /* ------------------------------ bathrooms ----------------------------- */
  for (const bath of byKind('bathroom')) {
    const bb = itemBox(bath)
    const hasToilet = byKind('toilet').some((t) => overlapArea(bb, itemBox(t)) > 4)
    if (!hasToilet) {
      issues.push({ id: `bath-toilet-${bath.id}`, severity: 'warning', title: 'Bathroom has no toilet', detail: 'Place a toilet (and a sink) inside the bathroom.', fix: 'Add a toilet and vanity from Fixtures.', itemIds: [bath.id], marker: { x: bath.x, y: bath.y } })
    }
    if (area(bath) < RULES.bathMinSqft) {
      issues.push({ id: `bathsize-${bath.id}`, severity: 'warning', title: `Bathroom is tight (${Math.round(area(bath))} sq ft)`, detail: 'Allow room for fixture clearances — a toilet needs 21″ in front and 15″ to each side.', fix: 'Enlarge the bathroom.', itemIds: [bath.id] })
    }
  }

  /* -------------------------- egress not blocked ------------------------ */
  for (const e of egress) {
    const fc = frontCenter(e)
    const w = wallOf(e)
    const depth = RULES.egressClear
    let zone: Box
    if (w === 'north') zone = { minX: e.x - e.width / 2, maxX: e.x + e.width / 2, minY: e.y, maxY: e.y + depth }
    else if (w === 'south') zone = { minX: e.x - e.width / 2, maxX: e.x + e.width / 2, minY: e.y - depth, maxY: e.y }
    else if (w === 'west') zone = { minY: e.y - e.width / 2, maxY: e.y + e.width / 2, minX: e.x, maxX: e.x + depth }
    else zone = { minY: e.y - e.width / 2, maxY: e.y + e.width / 2, minX: e.x - depth, maxX: e.x }
    const blocker = items.find((i) => i.id !== e.id && getElement(i.defId)?.class === 'feature' && getElement(i.defId)?.mount === 'floor' && overlapArea(zone, itemBox(i)) > 20)
    if (blocker) {
      issues.push({ id: `egress-block-${e.id}`, severity: 'warning', title: 'Egress window is blocked', detail: 'Keep the floor clear in front of an egress window so it can actually be used to escape.', fix: 'Move furniture away from the egress.', itemIds: [e.id, blocker.id], marker: fc })
    }
  }

  /* ----------------------------- room overlaps -------------------------- */
  for (let a = 0; a < zones.length; a++) {
    for (let b = a + 1; b < zones.length; b++) {
      if (overlapArea(itemBox(zones[a]), itemBox(zones[b])) > 144) {
        issues.push({ id: `overlap-${zones[a].id}-${zones[b].id}`, severity: 'error', title: `${getElement(zones[a].defId)?.label} overlaps ${getElement(zones[b].defId)?.label}`, detail: 'Two rooms occupy the same space.', fix: 'Drag one room so they sit side by side.', itemIds: [zones[a].id, zones[b].id], marker: { x: (zones[a].x + zones[b].x) / 2, y: (zones[a].y + zones[b].y) / 2 } })
      }
    }
  }

  /* ------------------------ finished-area summary ----------------------- */
  const totalSqft = zones.reduce((n, z) => n + area(z), 0)
  if (totalSqft > 0) {
    issues.push({ id: 'area-ok', severity: 'ok', title: `Finished area: ${Math.round(totalSqft)} sq ft`, detail: `${zones.length} room${zones.length === 1 ? '' : 's'} laid out.` })
  } else {
    issues.push({ id: 'empty', severity: 'warning', title: 'No rooms yet', detail: 'Add a room from the Rooms list to start your basement.', fix: 'Drag in a rec room to begin.' })
  }

  const order = { error: 0, warning: 1, ok: 2 }
  return issues.sort((a, b) => order[a.severity] - order[b.severity])
}

export function issueCounts(issues: Issue[]) {
  return {
    errors: issues.filter((i) => i.severity === 'error').length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
    ok: issues.filter((i) => i.severity === 'ok').length,
  }
}
