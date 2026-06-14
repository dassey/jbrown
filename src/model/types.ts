/**
 * Basement Designer — domain model.
 *
 * All inches. The "Room" type is the basement SHELL (outer footprint). Inside it
 * you place two classes of element:
 *   • zones    — finished rooms (rec room, bedroom, bath…), resizable rectangles
 *                drawn as floor areas with partition walls.
 *   • features — things inside (egress window, stairs, column, fixtures, sofa…).
 *
 * Coordinates: origin (0,0) = interior top-left; x→right, y→down. An item's
 * (x,y) is the CENTER of its footprint. Rotation 0/90/180/270 (back-to-wall).
 */

export type WallSide = 'north' | 'south' | 'east' | 'west'

export type ElementClass = 'zone' | 'feature'
export type ElementCategory = 'rooms' | 'features' | 'fixtures'

export type ElementKind =
  // zones
  | 'rec-room' | 'bedroom' | 'bathroom' | 'theater' | 'bar-room' | 'office' | 'gym' | 'playroom' | 'laundry' | 'storage' | 'mechanical'
  // features
  | 'egress' | 'stairs' | 'column' | 'toilet' | 'vanity' | 'shower' | 'tub' | 'wet-bar' | 'tv' | 'sectional' | 'pool-table' | 'fireplace' | 'theater-seating' | 'furnace'

export type Mount = 'floor' | 'wall'

export interface ElementDef {
  id: string
  label: string
  class: ElementClass
  kind: ElementKind
  category: ElementCategory
  /** Default footprint (inches): width across, depth into the room. */
  width: number
  depth: number
  /** Object height in inches (for 3D). Zones use the ceiling height. */
  height: number
  /** Resizable steps (inches). Zones resize on both axes. */
  widths?: number[]
  depths?: number[]
  mount: Mount
  /** Bottom elevation off the floor (wall-mounted features). */
  elevation?: number
  /** Price; per finished square foot for zones, flat each for features. */
  price: number
  priceUnit: 'sqft' | 'each'
  blurb: string
  snapsToWall?: boolean
  icon: string
  /** 3D archetype. Zones use '3d-zone' (floor + partitions). */
  model: string
  /** Floor/zone color (zones only). */
  color?: string
  /** Code: this zone requires an egress window. */
  needsEgress?: boolean
  /** Code: minimum habitable size (sq ft). */
  minSqft?: number
}

export interface Opening {
  id: string
  kind: 'door' | 'window'
  wall: WallSide
  offset: number
  width: number
  sill?: number
  swing?: 'in' | 'out'
}

export interface Item {
  id: string
  defId: string
  x: number
  y: number
  rotation: number
  width: number
  depth: number
}

export type FloorFinish = 'carpet' | 'lvp' | 'tile' | 'polished' | 'epoxy'
export type CeilingType = 'drywall' | 'drop' | 'exposed'

/** Basement-wide finishes (drive the 3D look + a little of the cost). */
export interface Palette {
  floor: FloorFinish
  wall: string // hex (paint)
  ceiling: CeilingType
  trim: string // hex
}

/** The basement shell (outer footprint). */
export interface Room {
  width: number
  depth: number
  height: number // ceiling height
  wallThickness: number
}

export interface Plan {
  room: Room
  openings: Opening[]
  items: Item[]
  palette: Palette
  project: { name: string }
}

export type IssueSeverity = 'error' | 'warning' | 'ok'

export interface Issue {
  id: string
  severity: IssueSeverity
  title: string
  detail: string
  fix?: string
  itemIds?: string[]
  marker?: { x: number; y: number }
}
