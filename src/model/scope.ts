/**
 * Project-wide SCOPE & SYSTEMS — the work beyond the finished rooms themselves:
 * electrical, waterproofing/moisture, structural repair, and air quality. These
 * feed the estimate (and a couple nudge the code check). Edit prices here.
 *
 * unit: 'each' (× qty) · 'sqft' (× finished area) · 'linft' (× perimeter) · 'flat'
 * mode: 'toggle' (on/off) · 'qty' (a counted amount)
 */
import type { ScopeGroup, ScopeItem } from './types'

export const SCOPE_GROUP_LABEL: Record<ScopeGroup, string> = {
  electrical: 'Electrical & lighting',
  waterproofing: 'Waterproofing & moisture',
  structural: 'Structural & repair',
  air: 'Air quality & comfort',
}

export const SCOPE_ITEMS: ScopeItem[] = [
  // electrical
  { id: 'electrical-design', group: 'electrical', label: 'Electrical & lighting plan', blurb: "John's full electrical layout, drawn to current IRC code.", price: 850, unit: 'flat', mode: 'toggle' },
  { id: 'recessed-lighting', group: 'electrical', label: 'Recessed LED lighting', blurb: '6-inch dimmable can lights.', price: 95, unit: 'each', mode: 'qty', step: 1, max: 80 },
  { id: 'circuits', group: 'electrical', label: 'Added circuits & outlets', blurb: 'Dedicated circuits, outlets and switches.', price: 180, unit: 'each', mode: 'qty', step: 1, max: 40 },

  // waterproofing & moisture
  { id: 'perimeter-drain', group: 'waterproofing', label: 'Interior perimeter drain + sump', blurb: 'Drainage channel around the footing, routed to a sump pit.', price: 55, unit: 'linft', mode: 'toggle' },
  { id: 'vapor-barrier', group: 'waterproofing', label: 'Moisture barrier & wall insulation', blurb: 'Dimple board / rigid foam behind the framing.', price: 4, unit: 'sqft', mode: 'toggle' },
  { id: 'crack-injection', group: 'waterproofing', label: 'Foundation crack injection', blurb: 'Polyurethane seal on a leaking crack.', price: 650, unit: 'each', mode: 'qty', step: 1, max: 12 },
  { id: 'well-drain', group: 'waterproofing', label: 'Egress window-well drain', blurb: 'Keeps the egress well from filling with water.', price: 450, unit: 'each', mode: 'qty', step: 1, max: 6 },

  // structural & repair
  { id: 'carbon-fiber', group: 'structural', label: 'Carbon-fiber wall reinforcement', blurb: 'Straps for a bowing or cracked foundation wall.', price: 450, unit: 'each', mode: 'qty', step: 1, max: 24 },
  { id: 'post-repair', group: 'structural', label: 'Support post replacement', blurb: 'Replace a failing jack post / telepost.', price: 1200, unit: 'each', mode: 'qty', step: 1, max: 8 },
  { id: 'beam', group: 'structural', label: 'Beam / header reinforcement', blurb: 'Sister or add a beam for a new opening.', price: 1800, unit: 'each', mode: 'qty', step: 1, max: 6 },

  // air quality & comfort
  { id: 'radon', group: 'air', label: 'Radon mitigation system', blurb: 'Sub-slab suction fan and vent stack.', price: 1500, unit: 'flat', mode: 'toggle' },
  { id: 'mold', group: 'air', label: 'Mold remediation', blurb: 'Treat and remove existing mold before finishing.', price: 9, unit: 'sqft', mode: 'toggle' },
  { id: 'bath-fan', group: 'air', label: 'Bath exhaust fan', blurb: 'Quiet fan vented to the exterior.', price: 350, unit: 'each', mode: 'qty', step: 1, max: 6 },
  { id: 'hvac', group: 'air', label: 'HVAC supply / return extension', blurb: 'Add registers so the basement stays comfortable.', price: 300, unit: 'each', mode: 'qty', step: 1, max: 16 },
]

export function getScopeItem(id: string): ScopeItem | undefined {
  return SCOPE_ITEMS.find((s) => s.id === id)
}

export const SCOPE_GROUPS: ScopeGroup[] = ['electrical', 'waterproofing', 'structural', 'air']
