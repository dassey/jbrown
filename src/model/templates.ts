/**
 * Starter basement layouts. Each returns a draft (items without ids); the store
 * assigns ids on load. The default is the "Guest suite".
 */
import { getElement } from './catalog'
import { placeAgainstWall } from './geometry'
import type { Item, Opening, Palette, Room, WallSide } from './types'

export type DraftItem = Omit<Item, 'id'>
export interface PlanDraft {
  name: string
  room: Room
  palette: Palette
  items: DraftItem[]
  openings: Omit<Opening, 'id'>[]
}

export const DEFAULT_PALETTE: Palette = {
  floor: 'lvp',
  wall: '#efe9dd',
  ceiling: 'drywall',
  trim: '#f4f1ea',
}

function room(width: number, depth: number, height = 96): Room {
  return { width, depth, height, wallThickness: 6 }
}

/** A finished-room zone rectangle. */
function zone(defId: string, x: number, y: number, w: number, d: number): DraftItem {
  return { defId, x, y, width: w, depth: d, rotation: 0 }
}
/** A free-standing feature at a point. */
function at(defId: string, x: number, y: number, rotation = 0): DraftItem {
  const def = getElement(defId)!
  return { defId, x, y, width: def.width, depth: def.depth, rotation }
}
/** A feature flush against a wall. */
function wall(r: Room, defId: string, w: WallSide, along: number, width?: number): DraftItem {
  return placeAgainstWall(r, getElement(defId)!, w, along, width)
}

/* ------------------------------ Guest suite ------------------------------ */
function guest(): PlanDraft {
  const r = room(384, 276)
  return {
    name: 'Guest suite',
    room: r,
    palette: { ...DEFAULT_PALETTE },
    items: [
      zone('rec-room', 132, 138, 252, 252),
      zone('bedroom', 324, 78, 120, 144),
      zone('bathroom', 324, 210, 120, 120),
      at('stairs', 44, 72),
      wall(r, 'egress', 'east', 78, 48),
      wall(r, 'wet-bar', 'north', 168, 72),
      at('sectional', 150, 210),
      wall(r, 'tv', 'west', 150, 65),
      wall(r, 'toilet', 'east', 250, 20),
      wall(r, 'vanity', 'south', 296, 36),
      wall(r, 'shower', 'south', 345, 48),
    ],
    openings: [],
  }
}

/* ------------------------------- Open rec -------------------------------- */
function open(): PlanDraft {
  const r = room(420, 300)
  return {
    name: 'Open rec room',
    room: r,
    palette: { ...DEFAULT_PALETTE, floor: 'carpet' },
    items: [
      zone('rec-room', 222, 156, 360, 264),
      at('stairs', 56, 78),
      wall(r, 'wet-bar', 'north', 300, 96),
      wall(r, 'tv', 'south', 240, 65),
      at('sectional', 240, 220),
      at('pool-table', 150, 130, 0),
      wall(r, 'egress', 'east', 150, 48),
      zone('mechanical', 372, 264, 84, 60),
    ],
    openings: [],
  }
}

/* --------------------------- Entertainer's den --------------------------- */
function entertain(): PlanDraft {
  const r = room(444, 312)
  return {
    name: "Entertainer's basement",
    room: r,
    palette: { ...DEFAULT_PALETTE, floor: 'lvp', ceiling: 'drywall', wall: '#d8d2c8' },
    items: [
      zone('theater', 120, 168, 216, 264),
      zone('bar-room', 348, 102, 168, 180),
      zone('bathroom', 360, 252, 144, 96),
      at('stairs', 48, 78),
      wall(r, 'tv', 'south', 120, 65),
      at('theater-seating', 120, 120),
      wall(r, 'wet-bar', 'north', 348, 96),
      wall(r, 'egress', 'north', 120, 48),
      wall(r, 'toilet', 'east', 270, 20),
      wall(r, 'vanity', 'south', 330, 36),
    ],
    openings: [],
  }
}

/* ------------------------------- Full finish ----------------------------- */
function full(): PlanDraft {
  const r = room(480, 336)
  return {
    name: 'Full finish',
    room: r,
    palette: { ...DEFAULT_PALETTE },
    items: [
      zone('rec-room', 162, 192, 300, 264),
      zone('bedroom', 408, 90, 132, 156),
      zone('bathroom', 408, 252, 132, 144),
      zone('office', 84, 60, 144, 108),
      zone('gym', 252, 60, 156, 108),
      at('stairs', 48, 252),
      wall(r, 'egress', 'east', 90, 48),
      wall(r, 'wet-bar', 'south', 180, 72),
      at('sectional', 220, 280),
      wall(r, 'toilet', 'east', 300, 20),
      wall(r, 'vanity', 'south', 380, 36),
      wall(r, 'shower', 'south', 440, 48),
    ],
    openings: [],
  }
}

export function emptyPlan(): PlanDraft {
  return { name: 'My basement', room: room(360, 264), palette: { ...DEFAULT_PALETTE }, items: [], openings: [] }
}

export interface TemplateMeta {
  id: string
  label: string
  blurb: string
  build: () => PlanDraft
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'guest', label: 'Guest suite', blurb: 'Rec room + a legal bedroom & bath.', build: guest },
  { id: 'open', label: 'Open rec room', blurb: 'One big open entertaining space.', build: open },
  { id: 'entertain', label: "Entertainer's", blurb: 'Theater, bar lounge & bath.', build: entertain },
  { id: 'full', label: 'Full finish', blurb: 'Rec, bedroom, bath, office & gym.', build: full },
  { id: 'empty', label: 'Empty shell', blurb: 'Start from your bare footprint.', build: emptyPlan },
]

export function buildTemplate(id: string): PlanDraft {
  return (TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]).build()
}
