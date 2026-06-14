/**
 * Engineered themes. Each is a complete, hand-tuned design system — surfaces,
 * ink, one accent, status hues, the 2D editor canvas, and the 3D backdrop — not
 * a hue rotation. Switching sets every CSS color token at once (see useTheme).
 *
 * `vars`   → the Tailwind color tokens (drive all chrome, panels, landing).
 * `canvas` → the 2D Konva editor colors (JS, can't read CSS vars).
 * `scene`  → the 3D background gradient.
 * `swatch` → [surface, accent, canvas] preview dots for the picker.
 */
export interface CanvasTheme {
  bg: string; floor: string; grid: string; gridFoot: string; wall: string
  dim: string; dimText: string; feature: string; featureLine: string
  fixture: string; fixtureLine: string; front: string; select: string
  error: string; warning: string
}

export interface Theme {
  id: string
  label: string
  blurb: string
  vars: Record<string, string>
  canvas: CanvasTheme
  scene: string
  swatch: [string, string, string]
}

export const THEMES: Theme[] = [
  {
    id: 'copper',
    label: 'Copper & Slate',
    blurb: 'Warm copper on cool stone — the default.',
    swatch: ['#f1f0ea', '#c1762e', '#23262b'],
    vars: {
      '--color-paper': '#fcfbf8', '--color-bone': '#f1f0ea', '--color-canvas': '#e6e5df',
      '--color-graphite': '#191b1f', '--color-graphite-soft': '#262a30',
      '--color-ink': '#1b1d21', '--color-ink-soft': '#494d54', '--color-ink-faint': '#888d95',
      '--color-line': '#e1ded5', '--color-line-soft': '#edebe3',
      '--color-brass': '#c1762e', '--color-brass-bright': '#d98a3c', '--color-brass-deep': '#8f5219',
      '--color-clay': '#a8623f', '--color-sage': '#5d7a5a', '--color-sage-deep': '#45593f',
      '--color-blueprint': '#3d566e', '--color-blueprint-soft': '#6b8199', '--color-walnut': '#2d3942',
      '--color-flag': '#c0492b', '--color-amber': '#bf8a2a',
    },
    canvas: { bg: '#15171a', floor: '#23262b', grid: 'rgba(238,240,244,0.05)', gridFoot: 'rgba(238,240,244,0.10)', wall: '#b9c0c8', dim: 'rgba(238,240,244,0.45)', dimText: '#c4c8cf', feature: '#cfd4d9', featureLine: '#969da6', fixture: '#e6ddcd', fixtureLine: '#b6a98c', front: '#d98a3c', select: '#d98a3c', error: '#cf5034', warning: '#cf9636' },
    scene: 'radial-gradient(120% 120% at 50% 6%, #2b2d31 0%, #17181b 60%, #0e0f11 100%)',
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    blurb: 'Architect’s navy with a true blueprint grid.',
    swatch: ['#eef2f6', '#2f6db0', '#0f2747'],
    vars: {
      '--color-paper': '#fbfcfd', '--color-bone': '#eef2f6', '--color-canvas': '#e0e7ee',
      '--color-graphite': '#11203a', '--color-graphite-soft': '#1b2c49',
      '--color-ink': '#16263b', '--color-ink-soft': '#41546b', '--color-ink-faint': '#7f93a8',
      '--color-line': '#d6e0ea', '--color-line-soft': '#e8eef4',
      '--color-brass': '#2f6db0', '--color-brass-bright': '#3f86d4', '--color-brass-deep': '#1f4f86',
      '--color-clay': '#4a6f97', '--color-sage': '#3f8a86', '--color-sage-deep': '#2c615e',
      '--color-blueprint': '#21609e', '--color-blueprint-soft': '#6f93ba', '--color-walnut': '#1c2c44',
      '--color-flag': '#d2502f', '--color-amber': '#c08a2a',
    },
    canvas: { bg: '#0f2747', floor: '#143157', grid: 'rgba(150,190,235,0.18)', gridFoot: 'rgba(170,205,245,0.34)', wall: '#cfe0f5', dim: 'rgba(180,210,240,0.5)', dimText: '#cfe0f5', feature: '#bcd2ec', featureLine: '#6f93ba', fixture: '#d7e3f2', fixtureLine: '#7f9fc4', front: '#7fd0ff', select: '#7fd0ff', error: '#ff7a5c', warning: '#ffcf6a' },
    scene: 'radial-gradient(120% 120% at 50% 6%, #1c3a64 0%, #0f2342 60%, #081830 100%)',
  },
  {
    id: 'walnut',
    label: 'Walnut & Brass',
    blurb: 'Warm, woody and a little luxe.',
    swatch: ['#f3eee3', '#b08442', '#2a2118'],
    vars: {
      '--color-paper': '#fffdf8', '--color-bone': '#f3eee3', '--color-canvas': '#ece3d2',
      '--color-graphite': '#211a14', '--color-graphite-soft': '#2e251c',
      '--color-ink': '#221a14', '--color-ink-soft': '#4b4038', '--color-ink-faint': '#8a7c6d',
      '--color-line': '#e2d8c5', '--color-line-soft': '#efe7d6',
      '--color-brass': '#b08442', '--color-brass-bright': '#ca9c54', '--color-brass-deep': '#836022',
      '--color-clay': '#a8623f', '--color-sage': '#6a7359', '--color-sage-deep': '#4c5340',
      '--color-blueprint': '#5b6b7a', '--color-blueprint-soft': '#8a98a6', '--color-walnut': '#5b3a26',
      '--color-flag': '#b1492c', '--color-amber': '#b9882f',
    },
    canvas: { bg: '#1c1610', floor: '#2a2118', grid: 'rgba(240,230,210,0.05)', gridFoot: 'rgba(240,230,210,0.11)', wall: '#d8c7a6', dim: 'rgba(240,230,210,0.45)', dimText: '#d8c7a6', feature: '#d9cdb6', featureLine: '#a8997c', fixture: '#e6d8bd', fixtureLine: '#bda87f', front: '#ca9c54', select: '#ca9c54', error: '#c0573a', warning: '#c79a4f' },
    scene: 'radial-gradient(120% 120% at 50% 6%, #33281c 0%, #1f1810 60%, #130e08 100%)',
  },
  {
    id: 'sage',
    label: 'Sage & Clay',
    blurb: 'Calm green rooms, warm terracotta accent.',
    swatch: ['#eef1e9', '#b5663f', '#232a20'],
    vars: {
      '--color-paper': '#fbfcf9', '--color-bone': '#eef1e9', '--color-canvas': '#e3e8db',
      '--color-graphite': '#1b211a', '--color-graphite-soft': '#283025',
      '--color-ink': '#1d241b', '--color-ink-soft': '#45503f', '--color-ink-faint': '#828d7c',
      '--color-line': '#dce2d2', '--color-line-soft': '#e9eee1',
      '--color-brass': '#b5663f', '--color-brass-bright': '#cc7c4e', '--color-brass-deep': '#8a4a28',
      '--color-clay': '#a8623f', '--color-sage': '#5f7a52', '--color-sage-deep': '#45583b',
      '--color-blueprint': '#4f6a6a', '--color-blueprint-soft': '#80999a', '--color-walnut': '#2f3a2b',
      '--color-flag': '#bf4a2c', '--color-amber': '#b58a2c',
    },
    canvas: { bg: '#161a14', floor: '#232a20', grid: 'rgba(225,235,215,0.05)', gridFoot: 'rgba(225,235,215,0.11)', wall: '#b9c4ac', dim: 'rgba(225,235,215,0.45)', dimText: '#c6cfba', feature: '#cdd6c2', featureLine: '#93a085', fixture: '#e3dcc8', fixtureLine: '#b3a987', front: '#cc7c4e', select: '#cc7c4e', error: '#bf4a2c', warning: '#c79a4f' },
    scene: 'radial-gradient(120% 120% at 50% 6%, #2a3326 0%, #181d14 60%, #0e120b 100%)',
  },
  {
    id: 'graphite',
    label: 'Graphite',
    blurb: 'High-contrast monochrome, one gold accent.',
    swatch: ['#f3f3f2', '#c2902f', '#1f1f21'],
    vars: {
      '--color-paper': '#ffffff', '--color-bone': '#f3f3f2', '--color-canvas': '#e8e8e7',
      '--color-graphite': '#161617', '--color-graphite-soft': '#242426',
      '--color-ink': '#18181a', '--color-ink-soft': '#46474b', '--color-ink-faint': '#8b8c91',
      '--color-line': '#e4e4e3', '--color-line-soft': '#f0f0ef',
      '--color-brass': '#c2902f', '--color-brass-bright': '#dba63f', '--color-brass-deep': '#8c641d',
      '--color-clay': '#a8623f', '--color-sage': '#5f7a5a', '--color-sage-deep': '#45593f',
      '--color-blueprint': '#46566a', '--color-blueprint-soft': '#7d8a9a', '--color-walnut': '#2a2a2c',
      '--color-flag': '#c2402c', '--color-amber': '#bf8a2a',
    },
    canvas: { bg: '#101011', floor: '#1f1f21', grid: 'rgba(255,255,255,0.05)', gridFoot: 'rgba(255,255,255,0.11)', wall: '#c8c8ca', dim: 'rgba(255,255,255,0.4)', dimText: '#cdcdcf', feature: '#d3d3d5', featureLine: '#97979b', fixture: '#e2ddd2', fixtureLine: '#b3ab97', front: '#dba63f', select: '#dba63f', error: '#d05236', warning: '#cf9636' },
    scene: 'radial-gradient(120% 120% at 50% 6%, #2a2a2c 0%, #161617 60%, #0c0c0d 100%)',
  },
]

export const DEFAULT_THEME = 'copper'

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
