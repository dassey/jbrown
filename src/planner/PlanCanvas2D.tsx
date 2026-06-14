import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Line, Group, Text, Circle } from 'react-konva'
import { getElement } from '../model/catalog'
import { footprintSize, inchesToFeet, nearestWall, rotationForWall } from '../model/geometry'
import type { Issue, Item } from '../model/types'
import { usePlanner } from '../store/store'
import { useElementSize } from '../lib/useElementSize'
import { registerExporter } from './canvasExport'
import { useActiveTheme } from '../theme/useTheme'

interface View { scale: number; x: number; y: number }

export function PlanCanvas2D({ issues }: { issues: Issue[] }) {
  const { ref, size } = useElementSize<HTMLDivElement>()
  const plan = usePlanner((s) => s.plan)
  const selectedId = usePlanner((s) => s.selectedId)
  const select = usePlanner((s) => s.select)
  const updateItem = usePlanner((s) => s.updateItem)
  const moveItem = usePlanner((s) => s.moveItem)
  const showGrid = usePlanner((s) => s.showGrid)
  const snap = usePlanner((s) => s.snap)
  const room = plan.room
  const C = useActiveTheme().canvas
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 })
  const stageRef = useRef<any>(null)

  useEffect(() => {
    registerExporter(() => stageRef.current?.toDataURL({ pixelRatio: 2 }) ?? null)
    return () => registerExporter(null)
  }, [])

  function fit(): View {
    const pad = 90
    if (!size.width || !size.height) return { scale: 1, x: 0, y: 0 }
    const scale = Math.min((size.width - pad) / room.width, (size.height - pad) / room.depth)
    return { scale, x: (size.width - room.width * scale) / 2, y: (size.height - room.depth * scale) / 2 }
  }
  useEffect(() => { setView(fit()) /* eslint-disable-next-line */ }, [size.width, size.height, room.width, room.depth])

  function zoomBy(factor: number) {
    setView((v) => {
      const ns = Math.max(0.3, Math.min(8, v.scale * factor))
      const cx = size.width / 2, cy = size.height / 2
      const wx = (cx - v.x) / v.scale, wy = (cy - v.y) / v.scale
      return { scale: ns, x: cx - wx * ns, y: cy - wy * ns }
    })
  }
  function onWheel(e: any) {
    e.evt.preventDefault()
    const p = e.target.getStage().getPointerPosition()
    setView((v) => {
      const ns = Math.max(0.3, Math.min(8, v.scale * (e.evt.deltaY > 0 ? 0.9 : 1.1)))
      const wx = (p.x - v.x) / v.scale, wy = (p.y - v.y) / v.scale
      return { scale: ns, x: p.x - wx * ns, y: p.y - wy * ns }
    })
  }

  const grid: React.ReactNode[] = []
  if (showGrid) {
    for (let gx = 0; gx <= room.width + 0.1; gx += 12) grid.push(<Line key={`gx${gx}`} points={[gx, 0, gx, room.depth]} stroke={gx % 60 === 0 ? C.gridFoot : C.grid} strokeWidth={1} strokeScaleEnabled={false} listening={false} />)
    for (let gy = 0; gy <= room.depth + 0.1; gy += 12) grid.push(<Line key={`gy${gy}`} points={[0, gy, room.width, gy]} stroke={gy % 60 === 0 ? C.gridFoot : C.grid} strokeWidth={1} strokeScaleEnabled={false} listening={false} />)
  }

  function commitDragEnd(item: Item, e: any) {
    const node = e.target
    let nx = node.x(), ny = node.y()
    const def = getElement(item.defId)
    const wall = def?.snapsToWall ? nearestWall({ ...item, x: nx, y: ny }, room, 14) : null
    if (wall) {
      const rot = rotationForWall(wall)
      const half = item.depth / 2
      if (wall === 'north') ny = half
      else if (wall === 'south') ny = room.depth - half
      else if (wall === 'west') nx = half
      else nx = room.width - half
      updateItem(item.id, { x: nx, y: ny, rotation: rot })
    } else {
      moveItem(item.id, Math.round(nx / 3) * 3, Math.round(ny / 3) * 3)
    }
  }

  const zones = plan.items.filter((i) => getElement(i.defId)?.class === 'zone')
  const features = plan.items.filter((i) => getElement(i.defId)?.class === 'feature')

  function renderItem(item: Item) {
    const def = getElement(item.defId)
    if (!def) return null
    const isSel = item.id === selectedId
    const w = item.width, h = item.depth
    const isZone = def.class === 'zone'
    const isWallFeat = def.mount === 'wall'
    const labelSize = 12 / view.scale
    const showLabel = isZone || item.width * view.scale > 42
    const fill = isZone ? def.color ?? '#cdcabf' : def.category === 'fixtures' ? C.fixture : C.feature
    const line = isZone ? def.color ?? '#9a978c' : def.category === 'fixtures' ? C.fixtureLine : C.featureLine
    const sqft = Math.round((item.width * item.depth) / 144)
    return (
      <Group
        key={item.id}
        x={item.x} y={item.y} rotation={item.rotation}
        draggable
        onDragStart={() => select(item.id)}
        onDragMove={(e: any) => { if (snap) { e.target.x(Math.round(e.target.x())); e.target.y(Math.round(e.target.y())) } }}
        onDragEnd={(e: any) => commitDragEnd(item, e)}
        onMouseDown={(e: any) => { e.cancelBubble = true; select(item.id) }}
        onTap={(e: any) => { e.cancelBubble = true; select(item.id) }}
      >
        <Rect
          x={-w / 2} y={-h / 2} width={w} height={h}
          fill={fill}
          opacity={isZone ? (isSel ? 0.34 : 0.22) : 1}
          stroke={isSel ? C.select : line}
          strokeWidth={isSel ? 2.5 : isZone ? 2 : 1.4}
          strokeScaleEnabled={false}
          cornerRadius={isZone ? 2 : 1.5}
          shadowColor={isSel ? C.select : undefined}
          shadowBlur={isSel ? 12 : 0}
          shadowOpacity={isSel ? 0.5 : 0}
        />
        {isWallFeat && <Line points={[-w / 2 + 1, h / 2, w / 2 - 1, h / 2]} stroke={C.front} strokeWidth={3} strokeScaleEnabled={false} listening={false} />}
        {showLabel && (
          <Group rotation={-item.rotation} listening={false}>
            <Text text={isZone ? `${def.label}\n${sqft} sq ft` : def.label} fontFamily="Inter" fontSize={labelSize} fontStyle={isZone ? '600' : 'normal'} align="center" verticalAlign="middle" fill={isZone ? '#2a2c30' : '#33363b'} width={Math.max(w, h) * 1.5} offsetX={(Math.max(w, h) * 1.5) / 2} offsetY={labelSize} lineHeight={1.2} />
          </Group>
        )}
      </Group>
    )
  }

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ background: C.bg }}>
      {size.width > 0 && (
        <Stage
          ref={stageRef}
          width={size.width} height={size.height}
          scaleX={view.scale} scaleY={view.scale} x={view.x} y={view.y}
          draggable
          onWheel={onWheel}
          onDragEnd={(e: any) => { if (e.target === e.target.getStage()) setView((v) => ({ ...v, x: e.target.x(), y: e.target.y() })) }}
          onMouseDown={(e: any) => { if (e.target === e.target.getStage()) select(null) }}
          onTouchStart={(e: any) => { if (e.target === e.target.getStage()) select(null) }}
        >
          <Layer>
            <Rect x={-100000} y={-100000} width={200000} height={200000} fill={C.bg} listening={false} />
            <Rect x={0} y={0} width={room.width} height={room.depth} fill={C.floor} cornerRadius={1} listening={false} />
            {grid}
            {/* basement perimeter walls */}
            <Rect x={0} y={0} width={room.width} height={room.depth} stroke={C.wall} strokeWidth={5} strokeScaleEnabled={false} listening={false} />

            {/* room dimensions */}
            <DimLine x1={0} y1={-14} x2={room.width} y2={-14} label={inchesToFeet(room.width)} dim={C.dim} textFill={C.dimText} />
            <DimLine x1={-14} y1={0} x2={-14} y2={room.depth} label={inchesToFeet(room.depth)} vertical dim={C.dim} textFill={C.dimText} />

            {zones.map(renderItem)}
            {features.map(renderItem)}

            {issues.filter((i) => i.marker && i.severity !== 'ok').map((i) => (
              <Group key={`m-${i.id}`} x={i.marker!.x} y={i.marker!.y} onMouseDown={(e: any) => { e.cancelBubble = true; if (i.itemIds?.[0]) select(i.itemIds[0]) }}>
                <Circle radius={9} fill={i.severity === 'error' ? C.error : C.warning} stroke="#fff" strokeWidth={1.5} strokeScaleEnabled={false} scaleX={1 / view.scale} scaleY={1 / view.scale} shadowColor="#000" shadowBlur={6} shadowOpacity={0.4} />
                <Text text="!" fontFamily="Inter" fontStyle="bold" fontSize={12 / view.scale} fill="#fff" offsetX={3 / view.scale} offsetY={6 / view.scale} listening={false} />
              </Group>
            ))}
          </Layer>
        </Stage>
      )}

      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-graphite/80 backdrop-blur">
        <button onClick={() => zoomBy(1.2)} className="grid h-9 w-9 place-items-center text-paper/80 hover:bg-white/10" aria-label="Zoom in">+</button>
        <button onClick={() => zoomBy(0.83)} className="grid h-9 w-9 place-items-center border-t border-white/10 text-paper/80 hover:bg-white/10" aria-label="Zoom out">−</button>
        <button onClick={() => setView(fit())} className="grid h-9 w-9 place-items-center border-t border-white/10 text-[10px] font-medium text-paper/70 hover:bg-white/10" aria-label="Fit">FIT</button>
      </div>
    </div>
  )
}

function DimLine({ x1, y1, x2, y2, label, vertical, dim, textFill }: { x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean; dim: string; textFill: string }) {
  return (
    <Group listening={false}>
      <Line points={[x1, y1, x2, y2]} stroke={dim} strokeWidth={1} strokeScaleEnabled={false} />
      <Line points={vertical ? [x1 - 4, y1, x1 + 4, y1] : [x1, y1 - 4, x1, y1 + 4]} stroke={dim} strokeWidth={1} strokeScaleEnabled={false} />
      <Line points={vertical ? [x2 - 4, y2, x2 + 4, y2] : [x2, y2 - 4, x2, y2 + 4]} stroke={dim} strokeWidth={1} strokeScaleEnabled={false} />
      <Text text={label} x={(x1 + x2) / 2} y={(y1 + y2) / 2} fontFamily="JetBrains Mono" fontSize={11} fill={textFill} rotation={vertical ? -90 : 0} offsetX={14} offsetY={vertical ? -6 : 14} />
    </Group>
  )
}
