/**
 * Basement Designer — ELEMENT CATALOG.
 *
 * ZONES are finished rooms (priced per finished sq ft). FEATURES are things you
 * place inside them (priced flat). Plus basement-wide finishes (floor, wall,
 * ceiling, trim). All dimensions in inches. Edit prices/sizes here.
 */
import type {
  CeilingType,
  ElementCategory,
  ElementDef,
  FloorFinish,
} from './types'

const ZONE_STEPS = [60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 216, 240, 264, 288]

export const ELEMENTS: ElementDef[] = [
  /* -------------------------------- zones -------------------------------- */
  { id: 'rec-room', label: 'Rec / family room', class: 'zone', kind: 'rec-room', category: 'rooms', width: 192, depth: 168, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 38, priceUnit: 'sqft', blurb: 'The big open living + play space.', icon: 'rec', model: '3d-zone', color: '#d8c7a6', minSqft: 100 },
  { id: 'bedroom', label: 'Bedroom', class: 'zone', kind: 'bedroom', category: 'rooms', width: 132, depth: 132, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 42, priceUnit: 'sqft', blurb: 'A legal bedroom needs an egress window.', icon: 'bed', model: '3d-zone', color: '#c9c2da', needsEgress: true, minSqft: 70 },
  { id: 'bathroom', label: 'Bathroom', class: 'zone', kind: 'bathroom', category: 'rooms', width: 60, depth: 96, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 120, priceUnit: 'sqft', blurb: 'Full or half bath. Plumbing-heavy.', icon: 'bath', model: '3d-zone', color: '#b9d3d8', minSqft: 18 },
  { id: 'theater', label: 'Home theater', class: 'zone', kind: 'theater', category: 'rooms', width: 168, depth: 192, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 55, priceUnit: 'sqft', blurb: 'Wired and acoustically treated for movie night.', icon: 'theater', model: '3d-zone', color: '#b6aecb', minSqft: 120 },
  { id: 'bar-room', label: 'Bar / lounge', class: 'zone', kind: 'bar-room', category: 'rooms', width: 132, depth: 120, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 58, priceUnit: 'sqft', blurb: 'Entertaining space for a wet bar.', icon: 'bar', model: '3d-zone', color: '#d6b9a6', minSqft: 80 },
  { id: 'office', label: 'Office / den', class: 'zone', kind: 'office', category: 'rooms', width: 120, depth: 120, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 40, priceUnit: 'sqft', blurb: 'Quiet work-from-home space.', icon: 'office', model: '3d-zone', color: '#c2cdb6', minSqft: 60 },
  { id: 'gym', label: 'Home gym', class: 'zone', kind: 'gym', category: 'rooms', width: 144, depth: 144, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 36, priceUnit: 'sqft', blurb: 'Rubber floor and mirrors.', icon: 'gym', model: '3d-zone', color: '#b9c9d6', minSqft: 80 },
  { id: 'playroom', label: 'Playroom', class: 'zone', kind: 'playroom', category: 'rooms', width: 144, depth: 144, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 36, priceUnit: 'sqft', blurb: 'Soft, safe space for the kids.', icon: 'play', model: '3d-zone', color: '#d8c2cf', minSqft: 60 },
  { id: 'laundry', label: 'Laundry', class: 'zone', kind: 'laundry', category: 'rooms', width: 84, depth: 84, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 52, priceUnit: 'sqft', blurb: 'Washer, dryer, utility sink.', icon: 'laundry', model: '3d-zone', color: '#c2cdcf', minSqft: 24 },
  { id: 'storage', label: 'Storage', class: 'zone', kind: 'storage', category: 'rooms', width: 96, depth: 96, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 18, priceUnit: 'sqft', blurb: 'Unfinished or shelved storage.', icon: 'storage', model: '3d-zone', color: '#c7c2b8' },
  { id: 'mechanical', label: 'Mechanical', class: 'zone', kind: 'mechanical', category: 'rooms', width: 72, depth: 72, height: 0, widths: ZONE_STEPS, depths: ZONE_STEPS, mount: 'floor', price: 12, priceUnit: 'sqft', blurb: 'Furnace, water heater, panel — leave access.', icon: 'mech', model: '3d-zone', color: '#bdb8b0' },

  /* ------------------------------- features ------------------------------ */
  { id: 'egress', label: 'Egress window', class: 'feature', kind: 'egress', category: 'features', width: 48, depth: 12, height: 48, widths: [36, 48, 60], mount: 'wall', elevation: 24, price: 4200, priceUnit: 'each', blurb: 'Code-required escape window + well for any bedroom.', snapsToWall: true, icon: 'egress', model: '3d-egress' },
  { id: 'stairs', label: 'Staircase', class: 'feature', kind: 'stairs', category: 'features', width: 40, depth: 132, height: 96, mount: 'floor', price: 2800, priceUnit: 'each', blurb: 'Finished stairs up to the main floor.', icon: 'stairs', model: '3d-stairs' },
  { id: 'column', label: 'Support column', class: 'feature', kind: 'column', category: 'features', width: 8, depth: 8, height: 96, mount: 'floor', price: 0, priceUnit: 'each', blurb: 'A structural post — design around it.', icon: 'column', model: '3d-column' },
  /* ------------------------------- systems ------------------------------- */
  { id: 'furnace', label: 'Furnace', class: 'feature', kind: 'furnace', category: 'systems', width: 32, depth: 30, height: 60, mount: 'floor', price: 0, priceUnit: 'each', blurb: 'Forced-air furnace — leave service clearance.', icon: 'furnace', model: '3d-furnace' },
  { id: 'water-heater', label: 'Water heater', class: 'feature', kind: 'water-heater', category: 'systems', width: 24, depth: 24, height: 58, mount: 'floor', price: 0, priceUnit: 'each', blurb: 'Tank water heater.', icon: 'waterheater', model: '3d-waterheater' },
  { id: 'subpanel', label: 'Electrical sub-panel', class: 'feature', kind: 'subpanel', category: 'systems', width: 16, depth: 5, height: 30, mount: 'wall', elevation: 48, price: 1800, priceUnit: 'each', blurb: 'Sub-panel feeding the basement circuits.', snapsToWall: true, icon: 'subpanel', model: '3d-subpanel' },
  { id: 'sump', label: 'Sump pump', class: 'feature', kind: 'sump', category: 'systems', width: 24, depth: 24, height: 6, mount: 'floor', price: 1400, priceUnit: 'each', blurb: 'Sump pit + pump for groundwater.', snapsToWall: true, icon: 'sump', model: '3d-sump' },
  { id: 'dehumidifier', label: 'Dehumidifier', class: 'feature', kind: 'dehumidifier', category: 'systems', width: 18, depth: 24, height: 34, mount: 'floor', price: 1200, priceUnit: 'each', blurb: 'Whole-basement dehumidifier.', icon: 'dehumidifier', model: '3d-dehumidifier' },
  { id: 'fireplace', label: 'Fireplace', class: 'feature', kind: 'fireplace', category: 'features', width: 50, depth: 14, height: 48, widths: [42, 50, 60], mount: 'wall', elevation: 0, price: 3200, priceUnit: 'each', blurb: 'Linear gas or electric fireplace.', snapsToWall: true, icon: 'fireplace', model: '3d-fireplace' },
  { id: 'tv', label: 'Wall TV', class: 'feature', kind: 'tv', category: 'features', width: 65, depth: 5, height: 38, mount: 'wall', elevation: 34, price: 0, priceUnit: 'each', blurb: 'Mounted television.', snapsToWall: true, icon: 'tv', model: '3d-tv' },

  /* ------------------------------- fixtures ------------------------------ */
  { id: 'toilet', label: 'Toilet', class: 'feature', kind: 'toilet', category: 'fixtures', width: 20, depth: 28, height: 30, mount: 'wall', price: 450, priceUnit: 'each', blurb: 'Needs 21″ clearance in front.', snapsToWall: true, icon: 'toilet', model: '3d-toilet' },
  { id: 'vanity', label: 'Vanity', class: 'feature', kind: 'vanity', category: 'fixtures', width: 36, depth: 21, height: 32, widths: [24, 30, 36, 48], mount: 'wall', price: 650, priceUnit: 'each', blurb: 'Sink + storage.', snapsToWall: true, icon: 'vanity', model: '3d-vanity' },
  { id: 'shower', label: 'Shower', class: 'feature', kind: 'shower', category: 'fixtures', width: 48, depth: 36, height: 80, widths: [36, 48, 60], mount: 'wall', price: 1800, priceUnit: 'each', blurb: 'Tiled or prefab shower.', snapsToWall: true, icon: 'shower', model: '3d-shower' },
  { id: 'tub', label: 'Bathtub', class: 'feature', kind: 'tub', category: 'fixtures', width: 60, depth: 30, height: 22, mount: 'wall', price: 1400, priceUnit: 'each', blurb: 'Soaking or tub-shower combo.', snapsToWall: true, icon: 'tub', model: '3d-tub' },
  { id: 'wet-bar', label: 'Wet bar', class: 'feature', kind: 'wet-bar', category: 'fixtures', width: 72, depth: 24, height: 42, widths: [48, 60, 72, 96], mount: 'wall', price: 4800, priceUnit: 'each', blurb: 'Cabinets, sink, counter — the hub of the lounge.', snapsToWall: true, icon: 'wetbar', model: '3d-bar' },
  { id: 'sectional', label: 'Sectional sofa', class: 'feature', kind: 'sectional', category: 'fixtures', width: 100, depth: 40, height: 30, mount: 'floor', price: 0, priceUnit: 'each', blurb: 'Big comfortable seating.', icon: 'sofa', model: '3d-sectional' },
  { id: 'theater-seating', label: 'Theater seating', class: 'feature', kind: 'theater-seating', category: 'fixtures', width: 112, depth: 64, height: 40, mount: 'floor', price: 3200, priceUnit: 'each', blurb: 'Tiered recliner row.', icon: 'recliner', model: '3d-seating' },
  { id: 'pool-table', label: 'Pool table', class: 'feature', kind: 'pool-table', category: 'fixtures', width: 96, depth: 54, height: 32, mount: 'floor', price: 0, priceUnit: 'each', blurb: 'Needs ~5 ft of cue clearance all around.', icon: 'pool', model: '3d-pool' },
]

export function getElement(id: string): ElementDef | undefined {
  return ELEMENTS.find((e) => e.id === id)
}

export const CATEGORY_LABEL: Record<ElementCategory, string> = {
  rooms: 'Rooms',
  features: 'Structure & features',
  fixtures: 'Fixtures & furniture',
  systems: 'Systems & mechanical',
}

/* -------------------------- basement-wide finishes ---------------------- */

export interface FinishDef<T extends string> {
  id: T
  label: string
  color: string
  roughness?: number
  metalness?: number
  /** Added $ per finished sq ft. */
  pricePerSqft?: number
}

export const FLOOR_FINISHES: FinishDef<FloorFinish>[] = [
  { id: 'carpet', label: 'Carpet', color: '#a99b86', roughness: 0.95, pricePerSqft: 4 },
  { id: 'lvp', label: 'Luxury vinyl plank', color: '#b1844f', roughness: 0.5, pricePerSqft: 6 },
  { id: 'tile', label: 'Tile', color: '#cfc9bd', roughness: 0.3, pricePerSqft: 12 },
  { id: 'polished', label: 'Polished concrete', color: '#9a958c', roughness: 0.35, metalness: 0.05, pricePerSqft: 8 },
  { id: 'epoxy', label: 'Epoxy', color: '#7f8a93', roughness: 0.2, metalness: 0.1, pricePerSqft: 7 },
]

export interface CeilingDef extends FinishDef<CeilingType> {}
export const CEILING_TYPES: CeilingDef[] = [
  { id: 'drywall', label: 'Drywall', color: '#efece4', pricePerSqft: 9 },
  { id: 'drop', label: 'Drop ceiling', color: '#e2e0d8', pricePerSqft: 6 },
  { id: 'exposed', label: 'Painted / exposed', color: '#2f2f31', pricePerSqft: 3 },
]

export const WALL_COLORS = ['#efe9dd', '#e3dccd', '#d8d2c8', '#cfd6cf', '#c4cdd6', '#b9c0ca']
export const TRIM_COLORS = ['#f4f1ea', '#e9e4d8', '#6b4a2f', '#2c2a28']

export function floorDef(id: FloorFinish): FinishDef<FloorFinish> {
  return FLOOR_FINISHES.find((f) => f.id === id) ?? FLOOR_FINISHES[0]
}
export function ceilingDef(id: CeilingType): CeilingDef {
  return CEILING_TYPES.find((c) => c.id === id) ?? CEILING_TYPES[0]
}
