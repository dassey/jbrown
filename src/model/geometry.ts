/**
 * Geometry helpers shared by the 2D editor, 3D view, validator, and templates.
 * All inches, room coordinates (x→right, y→down, origin = interior top-left).
 *
 * Rotation convention (degrees, snapped to 0/90/180/270):
 *   0   → back against NORTH wall (top),    front faces +y (down)
 *   90  → back against EAST wall (right),   front faces -x (left)
 *   180 → back against SOUTH wall (bottom), front faces -y (up)
 *   270 → back against WEST wall (left),    front faces +x (right)
 */
import type { ElementDef, Item, Room, WallSide } from './types'

export interface Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface Vec {
  x: number
  y: number
}

/** Normalize any angle to one of 0/90/180/270. */
export function quarter(rotation: number): 0 | 90 | 180 | 270 {
  const q = (((Math.round(rotation / 90) % 4) + 4) % 4) as 0 | 1 | 2 | 3
  return (q * 90) as 0 | 90 | 180 | 270
}

/** Axis-aligned footprint size after rotation. */
export function footprintSize(item: Pick<Item, 'width' | 'depth' | 'rotation'>): { w: number; h: number } {
  const q = quarter(item.rotation)
  return q === 90 || q === 270 ? { w: item.depth, h: item.width } : { w: item.width, h: item.depth }
}

/** Axis-aligned bounding box of an item's footprint. */
export function itemBox(item: Pick<Item, 'x' | 'y' | 'width' | 'depth' | 'rotation'>): Box {
  const { w, h } = footprintSize(item)
  return { minX: item.x - w / 2, minY: item.y - h / 2, maxX: item.x + w / 2, maxY: item.y + h / 2 }
}

export function boxCenter(b: Box): Vec {
  return { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 }
}

/** Center of the FRONT face (the working side) of an item. */
export function frontCenter(item: Pick<Item, 'x' | 'y' | 'depth' | 'rotation'>): Vec {
  const d = item.depth / 2
  switch (quarter(item.rotation)) {
    case 0: return { x: item.x, y: item.y + d }
    case 90: return { x: item.x - d, y: item.y }
    case 180: return { x: item.x, y: item.y - d }
    case 270: return { x: item.x + d, y: item.y }
  }
}

export function rotationForWall(wall: WallSide): number {
  return { north: 0, east: 90, south: 180, west: 270 }[wall]
}

export function wallLength(room: Room, wall: WallSide): number {
  return wall === 'north' || wall === 'south' ? room.width : room.depth
}

/**
 * Build an item placed flush against a wall, centered `along` inches from the
 * wall's start (left end for N/S, top end for E/W).
 */
export function placeAgainstWall(
  room: Room,
  def: ElementDef,
  wall: WallSide,
  along: number,
  width?: number,
): Omit<Item, 'id'> {
  const w = width ?? def.width
  const d = def.depth
  const rotation = rotationForWall(wall)
  let x = 0
  let y = 0
  switch (wall) {
    case 'north': x = along; y = d / 2; break
    case 'south': x = along; y = room.depth - d / 2; break
    case 'west': y = along; x = d / 2; break
    case 'east': y = along; x = room.width - d / 2; break
  }
  return { defId: def.id, x, y, width: w, depth: d, rotation }
}

export function rectsOverlap(a: Box, b: Box, pad = 0): boolean {
  return a.minX < b.maxX - pad && a.maxX > b.minX + pad && a.minY < b.maxY - pad && a.maxY > b.minY + pad
}

/** Overlap area (square inches) between two boxes — 0 if disjoint. */
export function overlapArea(a: Box, b: Box): number {
  const ox = Math.max(0, Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX))
  const oy = Math.max(0, Math.min(a.maxY, b.maxY) - Math.max(a.minY, b.minY))
  return ox * oy
}

export function dist(a: Vec, b: Vec): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function clampItemToRoom(item: Item, room: Room): Item {
  const { w, h } = footprintSize(item)
  return {
    ...item,
    x: Math.min(room.width - w / 2, Math.max(w / 2, item.x)),
    y: Math.min(room.depth - h / 2, Math.max(h / 2, item.y)),
  }
}

/** Which wall (if any) an item's back is closest to, within `threshold` inches. */
export function nearestWall(item: Item, room: Room, threshold = 10): WallSide | null {
  const b = itemBox(item)
  const gaps: Array<[WallSide, number]> = [
    ['north', b.minY],
    ['south', room.depth - b.maxY],
    ['west', b.minX],
    ['east', room.width - b.maxX],
  ]
  gaps.sort((p, q) => p[1] - q[1])
  return gaps[0][1] <= threshold ? gaps[0][0] : null
}

export const inchesToFeet = (n: number): string => {
  const ft = Math.floor(n / 12)
  const inch = Math.round(n - ft * 12)
  if (inch === 0) return `${ft}′`
  if (ft === 0) return `${inch}″`
  return `${ft}′ ${inch}″`
}
