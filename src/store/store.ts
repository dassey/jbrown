/**
 * Basement Designer — planner store (Zustand + localStorage persist).
 * Holds the whole Plan (basement shell, zones + features, finishes) + UI state.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getElement } from '../model/catalog'
import { clampItemToRoom, footprintSize } from '../model/geometry'
import { buildTemplate, type PlanDraft } from '../model/templates'
import type { Item, Opening, Palette, Plan, Room } from '../model/types'

let seq = 0
function uid(prefix: string): string {
  seq += 1
  return `${prefix}-${Date.now().toString(36)}-${seq}`
}

function hydrate(draft: PlanDraft): Plan {
  return {
    room: draft.room,
    palette: draft.palette,
    project: { name: draft.name },
    items: draft.items.map((it) => ({ ...it, id: uid('it') })),
    openings: draft.openings.map((op) => ({ ...op, id: uid('op') })),
  }
}

export type ViewMode = '2d' | '3d'

interface PlannerState {
  plan: Plan
  selectedId: string | null
  view: ViewMode
  showGrid: boolean
  snap: boolean

  loadTemplate: (id: string) => void
  loadPlan: (plan: Plan) => void
  reset: () => void

  addElement: (defId: string, pos?: { x: number; y: number }) => string
  updateItem: (id: string, patch: Partial<Item>) => void
  moveItem: (id: string, x: number, y: number) => void
  rotateItem: (id: string, by?: number) => void
  removeItem: (id: string) => void
  duplicateItem: (id: string) => void
  select: (id: string | null) => void

  setRoom: (patch: Partial<Room>) => void
  addOpening: (op: Omit<Opening, 'id'>) => void
  updateOpening: (id: string, patch: Partial<Opening>) => void
  removeOpening: (id: string) => void

  setPalette: (patch: Partial<Palette>) => void
  setProjectName: (name: string) => void

  setView: (v: ViewMode) => void
  toggleGrid: () => void
  toggleSnap: () => void
}

function clampAll(plan: Plan): Plan {
  return { ...plan, items: plan.items.map((it) => clampItemToRoom(it, plan.room)) }
}

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      plan: hydrate(buildTemplate('guest')),
      selectedId: null,
      view: '2d',
      showGrid: true,
      snap: true,

      loadTemplate: (id) => set({ plan: hydrate(buildTemplate(id)), selectedId: null }),
      loadPlan: (plan) => set({ plan, selectedId: null }),
      reset: () => set({ plan: hydrate(buildTemplate('empty')), selectedId: null }),

      addElement: (defId, pos) => {
        const def = getElement(defId)
        if (!def) return ''
        const { room } = get().plan
        const id = uid('it')
        const item: Item = {
          id,
          defId,
          x: pos?.x ?? room.width / 2,
          y: pos?.y ?? room.depth / 2,
          rotation: 0,
          width: def.width,
          depth: def.depth,
        }
        set((s) => ({ plan: { ...s.plan, items: [...s.plan.items, clampItemToRoom(item, room)] }, selectedId: id }))
        return id
      },

      updateItem: (id, patch) =>
        set((s) => ({
          plan: {
            ...s.plan,
            items: s.plan.items.map((it) => (it.id === id ? clampItemToRoom({ ...it, ...patch }, s.plan.room) : it)),
          },
        })),

      moveItem: (id, x, y) =>
        set((s) => ({
          plan: {
            ...s.plan,
            items: s.plan.items.map((it) => (it.id === id ? clampItemToRoom({ ...it, x, y }, s.plan.room) : it)),
          },
        })),

      rotateItem: (id, by = 90) =>
        set((s) => ({
          plan: {
            ...s.plan,
            items: s.plan.items.map((it) =>
              it.id === id ? clampItemToRoom({ ...it, rotation: (it.rotation + by) % 360 }, s.plan.room) : it,
            ),
          },
        })),

      removeItem: (id) =>
        set((s) => ({
          plan: { ...s.plan, items: s.plan.items.filter((it) => it.id !== id) },
          selectedId: s.selectedId === id ? null : s.selectedId,
        })),

      duplicateItem: (id) =>
        set((s) => {
          const orig = s.plan.items.find((it) => it.id === id)
          if (!orig) return s
          const copy: Item = { ...orig, id: uid('it'), x: orig.x + 12, y: orig.y + 12 }
          return { plan: { ...s.plan, items: [...s.plan.items, clampItemToRoom(copy, s.plan.room)] }, selectedId: copy.id }
        }),

      select: (id) => set({ selectedId: id }),

      setRoom: (patch) =>
        set((s) => {
          const room = { ...s.plan.room, ...patch }
          return { plan: clampAll({ ...s.plan, room }) }
        }),

      addOpening: (op) => set((s) => ({ plan: { ...s.plan, openings: [...s.plan.openings, { ...op, id: uid('op') }] } })),
      updateOpening: (id, patch) =>
        set((s) => ({ plan: { ...s.plan, openings: s.plan.openings.map((o) => (o.id === id ? { ...o, ...patch } : o)) } })),
      removeOpening: (id) => set((s) => ({ plan: { ...s.plan, openings: s.plan.openings.filter((o) => o.id !== id) } })),

      setPalette: (patch) => set((s) => ({ plan: { ...s.plan, palette: { ...s.plan.palette, ...patch } } })),
      setProjectName: (name) => set((s) => ({ plan: { ...s.plan, project: { ...s.plan.project, name } } })),

      setView: (v) => set({ view: v }),
      toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
      toggleSnap: () => set((s) => ({ snap: !s.snap })),
    }),
    {
      name: 'jbrown-plan-v1',
      version: 1,
      partialize: (s) => ({ plan: s.plan, view: s.view, showGrid: s.showGrid, snap: s.snap }),
    },
  ),
)

/** Selectors */
export function selectedItem(s: PlannerState): Item | null {
  return s.plan.items.find((it) => it.id === s.selectedId) ?? null
}

export { footprintSize }
