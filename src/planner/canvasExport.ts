/**
 * Tiny registry so the toolbar can export whichever view is mounted (2D Konva
 * stage or 3D WebGL canvas) to a PNG without prop-drilling refs.
 */
let exporter: (() => string | null) | null = null

export function registerExporter(fn: (() => string | null) | null) {
  exporter = fn
}

export function exportPNG(filename = 'frame-and-panel-kitchen.png') {
  const url = exporter?.()
  if (!url) return false
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  return true
}
