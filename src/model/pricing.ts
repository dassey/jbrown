/**
 * Budget estimate. Finished rooms (zones) price per finished square foot; the
 * floor + ceiling finishes add per sq ft on top; features are flat each.
 */
import { ceilingDef, floorDef, getElement } from './catalog'
import type { Plan } from './types'

export interface CostBreakdown {
  finishedSqft: number
  rooms: number
  finishes: { total: number; label: string }
  features: number
  total: number
  roomCount: number
  featureCount: number
}

export function computeCost(plan: Plan): CostBreakdown {
  let rooms = 0
  let features = 0
  let sqft = 0
  let roomCount = 0
  let featureCount = 0

  for (const it of plan.items) {
    const def = getElement(it.defId)
    if (!def) continue
    if (def.class === 'zone') {
      const area = (it.width * it.depth) / 144
      sqft += area
      rooms += area * def.price
      roomCount += 1
    } else {
      features += def.price
      if (def.price > 0) featureCount += 1
    }
  }

  const fd = floorDef(plan.palette.floor)
  const cd = ceilingDef(plan.palette.ceiling)
  const finishesTotal = Math.round(sqft * ((fd.pricePerSqft ?? 0) + (cd.pricePerSqft ?? 0)))

  return {
    finishedSqft: Math.round(sqft),
    rooms: Math.round(rooms),
    finishes: { total: finishesTotal, label: `${fd.label} · ${cd.label}` },
    features: Math.round(features),
    total: Math.round(rooms + finishesTotal + features),
    roomCount,
    featureCount,
  }
}

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
