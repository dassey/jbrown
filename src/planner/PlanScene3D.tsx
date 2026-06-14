/**
 * Real-time 3D of the basement plan, rendered as a clean architect's-model
 * cutaway: short partition walls so you can see into every finished room.
 * Lazy-loaded (this module + three is a separate chunk). Self-contained
 * lighting — no external HDR.
 */
import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { floorDef, getElement } from '../model/catalog'
import type { Item, Palette, Room } from '../model/types'
import { usePlanner } from '../store/store'
import { registerExporter } from './canvasExport'
import { useElementSize } from '../lib/useElementSize'

const WALL_H = 44 // model cutaway wall height (inches)
const WHITE = '#f2efe9'
const METAL = { color: '#b8bcc1', metalness: 0.8, roughness: 0.38 }
const DARK = { color: '#1d1d22', metalness: 0.3, roughness: 0.5 }

function Exporter() {
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    registerExporter(() => gl.domElement.toDataURL('image/png'))
    return () => registerExporter(null)
  }, [gl])
  return null
}

function Wall({ x, z, w, d, color, trim }: { x: number; z: number; w: number; d: number; color: string; trim: string }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, WALL_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, WALL_H, d]} />
        <meshStandardMaterial color={color} roughness={0.92} />
      </mesh>
      <mesh position={[0, WALL_H + 0.5, 0]}>
        <boxGeometry args={[w + 0.5, 1.2, d + 0.5]} />
        <meshStandardMaterial color={trim} roughness={0.6} />
      </mesh>
    </group>
  )
}

function Feature({ item, palette }: { item: Item; palette: Palette }) {
  const def = getElement(item.defId)
  if (!def) return null
  const w = item.width, d = item.depth, h = def.height
  const elev = def.elevation ?? 0

  switch (def.model) {
    case '3d-egress':
      return (
        <group>
          <mesh position={[0, elev + h / 2, d / 2]}><boxGeometry args={[w, h, 1]} /><meshStandardMaterial color="#cfe0ea" roughness={0.1} metalness={0.1} emissive="#6f86a0" emissiveIntensity={0.25} /></mesh>
          <mesh position={[0, elev + h / 2, d / 2 + 0.6]}><boxGeometry args={[w + 3, h + 3, 1]} /><meshStandardMaterial color={WHITE} /></mesh>
        </group>
      )
    case '3d-stairs':
      return (
        <group>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[0, 5 + i * 5, d / 2 - 8 - i * (d - 16) / 9]} castShadow receiveShadow>
              <boxGeometry args={[w, 10, (d - 16) / 9 + 2]} />
              <meshStandardMaterial color={i % 2 ? '#caa06a' : '#b98f54'} roughness={0.6} />
            </mesh>
          ))}
        </group>
      )
    case '3d-column':
      return <mesh position={[0, 96 / 2, 0]} castShadow><cylinderGeometry args={[w / 2, w / 2, 96, 16]} /><meshStandardMaterial color={WHITE} roughness={0.7} /></mesh>
    case '3d-furnace':
      return <group><mesh position={[0, h / 2, 0]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial {...METAL} /></mesh><mesh position={[0, h * 0.7, d / 2 + 0.1]}><boxGeometry args={[w - 6, 8, 1]} /><meshStandardMaterial {...DARK} /></mesh></group>
    case '3d-fireplace':
      return <group><mesh position={[0, elev + h / 2, d / 2]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#2a2a2e" roughness={0.5} /></mesh><mesh position={[0, elev + h / 2, d / 2 + 0.5]}><boxGeometry args={[w - 10, h - 16, 1]} /><meshStandardMaterial color="#e8843b" emissive="#e8843b" emissiveIntensity={0.6} /></mesh></group>
    case '3d-tv':
      return <mesh position={[0, elev + h / 2, d / 2]}><boxGeometry args={[w, h, 2]} /><meshStandardMaterial color="#111114" roughness={0.2} metalness={0.4} /></mesh>
    case '3d-toilet':
      return <group><mesh position={[0, 8, 2]} castShadow><boxGeometry args={[w, 16, d - 6]} /><meshStandardMaterial color={WHITE} roughness={0.2} /></mesh><mesh position={[0, 18, -d / 2 + 4]}><boxGeometry args={[w, 20, 6]} /><meshStandardMaterial color={WHITE} roughness={0.2} /></mesh></group>
    case '3d-vanity':
      return <group><mesh position={[0, h / 2, 0]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#5b4636" roughness={0.6} /></mesh><mesh position={[0, h + 1, 0]}><boxGeometry args={[w + 1, 2, d + 1]} /><meshStandardMaterial color="#e9e6df" roughness={0.3} /></mesh></group>
    case '3d-shower':
      return <group><mesh position={[0, 2, 0]} receiveShadow><boxGeometry args={[w, 4, d]} /><meshStandardMaterial color={WHITE} /></mesh><mesh position={[0, h / 2, 0]}><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#bcd2dc" transparent opacity={0.25} roughness={0.05} metalness={0.1} /></mesh></group>
    case '3d-tub':
      return <mesh position={[0, h / 2, 0]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color={WHITE} roughness={0.2} /></mesh>
    case '3d-bar':
      return <group><mesh position={[0, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#3a2c22" roughness={0.55} /></mesh><mesh position={[0, h + 1, 0]}><boxGeometry args={[w + 2, 2, d + 3]} /><meshStandardMaterial color="#2b2926" roughness={0.2} metalness={0.1} /></mesh></group>
    case '3d-sectional':
      return (
        <group>
          <mesh position={[0, 8, 4]} castShadow receiveShadow><boxGeometry args={[w, 14, d - 8]} /><meshStandardMaterial color="#7d756a" roughness={0.9} /></mesh>
          <mesh position={[0, 16, -d / 2 + 5]} castShadow><boxGeometry args={[w, 18, 9]} /><meshStandardMaterial color="#8a8278" roughness={0.9} /></mesh>
        </group>
      )
    case '3d-seating':
      return (
        <group>
          {[-1, 1].map((row) => (
            <mesh key={row} position={[0, 12, row * 14]} castShadow receiveShadow><boxGeometry args={[w, 22, d / 2 - 6]} /><meshStandardMaterial color="#3b3a3e" roughness={0.85} /></mesh>
          ))}
        </group>
      )
    case '3d-pool':
      return <group><mesh position={[0, 28, 0]} castShadow receiveShadow><boxGeometry args={[w, 8, d]} /><meshStandardMaterial color="#2f6b46" roughness={0.7} /></mesh><mesh position={[0, 14, 0]}><boxGeometry args={[w - 8, 20, d - 8]} /><meshStandardMaterial color="#3a2c22" roughness={0.6} /></mesh></group>
    case '3d-subpanel':
      return <mesh position={[0, elev + h / 2, d / 2]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#3b3e43" metalness={0.4} roughness={0.5} /></mesh>
    case '3d-sump':
      return <group><mesh position={[0, 1, 0]}><cylinderGeometry args={[w / 2, w / 2, 3, 18]} /><meshStandardMaterial color="#1f2024" roughness={0.6} /></mesh><mesh position={[0, 7, 0]} castShadow><boxGeometry args={[6, 12, 6]} /><meshStandardMaterial {...METAL} /></mesh></group>
    case '3d-dehumidifier':
      return <group><mesh position={[0, h / 2, 0]} castShadow receiveShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#d4d7da" roughness={0.5} /></mesh><mesh position={[0, h * 0.6, d / 2 + 0.1]}><boxGeometry args={[w - 5, h * 0.4, 1]} /><meshStandardMaterial {...DARK} /></mesh></group>
    case '3d-waterheater':
      return <mesh position={[0, h / 2, 0]} castShadow><cylinderGeometry args={[w / 2, w / 2, h, 20]} /><meshStandardMaterial {...METAL} /></mesh>
    default:
      return <mesh position={[0, h / 2, 0]} castShadow><boxGeometry args={[w, h, d]} /><meshStandardMaterial color="#b7b2a8" /></mesh>
  }
}

function Scene() {
  const plan = usePlanner((s) => s.plan)
  const { room } = plan
  const hw = room.width / 2
  const hd = room.depth / 2
  const wallColor = plan.palette.wall
  const trim = plan.palette.trim
  const floorColor = floorDef(plan.palette.floor).color
  const t = room.wallThickness

  const zones = plan.items.filter((i) => getElement(i.defId)?.class === 'zone')
  const features = plan.items.filter((i) => getElement(i.defId)?.class === 'feature')

  // interior partition segments from zone edges (skip perimeter-aligned edges)
  const partitions: React.ReactNode[] = []
  zones.forEach((z, zi) => {
    const x0 = z.x - z.width / 2, x1 = z.x + z.width / 2
    const y0 = z.y - z.depth / 2, y1 = z.y + z.depth / 2
    const near = (a: number, b: number) => Math.abs(a - b) < 4
    const edges: Array<[number, number, number, number]> = [
      [x0, y0, x1, y0], // top
      [x0, y1, x1, y1], // bottom
      [x0, y0, x0, y1], // left
      [x1, y0, x1, y1], // right
    ]
    edges.forEach((e, ei) => {
      const [ax, ay, bx, by] = e
      const horizontal = ay === by
      if (horizontal && (near(ay, 0) || near(ay, room.depth))) return
      if (!horizontal && (near(ax, 0) || near(ax, room.width))) return
      const len = horizontal ? bx - ax : by - ay
      const cx = (ax + bx) / 2 - hw
      const cz = (ay + by) / 2 - hd
      partitions.push(
        <Wall key={`p-${zi}-${ei}`} x={cx} z={cz} w={horizontal ? len : 3.5} d={horizontal ? 3.5 : len} color={wallColor} trim={trim} />,
      )
    })
  })

  return (
    <group scale={0.0254}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[room.width, room.depth]} />
        <meshStandardMaterial color={floorColor} roughness={floorDef(plan.palette.floor).roughness ?? 0.7} metalness={floorDef(plan.palette.floor).metalness ?? 0.02} />
      </mesh>

      {/* perimeter walls */}
      <Wall x={0} z={-hd} w={room.width} d={t} color={wallColor} trim={trim} />
      <Wall x={0} z={hd} w={room.width} d={t} color={wallColor} trim={trim} />
      <Wall x={-hw} z={0} w={t} d={room.depth} color={wallColor} trim={trim} />
      <Wall x={hw} z={0} w={t} d={room.depth} color={wallColor} trim={trim} />

      {partitions}

      {features.map((item) => (
        <group key={item.id} position={[item.x - hw, 0, item.y - hd]} rotation={[0, (-item.rotation * Math.PI) / 180, 0]}>
          <Feature item={item} palette={plan.palette} />
        </group>
      ))}

      <ContactShadows position={[0, 0.3, 0]} scale={Math.max(room.width, room.depth) * 1.3} far={90} blur={2.6} opacity={0.4} frames={1} resolution={1024} color="#15110c" />
    </group>
  )
}

export default function PlanScene3D() {
  const room: Room = usePlanner((s) => s.plan.room)
  const diag = Math.hypot(room.width, room.depth) * 0.0254
  const { ref, size } = useElementSize<HTMLDivElement>()
  return (
    <div ref={ref} className="h-full w-full" style={{ background: 'radial-gradient(120% 120% at 50% 6%, #2b2d31 0%, #17181b 60%, #0e0f11 100%)' }}>
      <Canvas
        style={size.width > 0 ? { width: size.width, height: size.height } : { width: '100%', height: '100%' }}
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        camera={{ fov: 36, position: [diag * 0.85, diag * 1.05, diag * 1.15], near: 0.1, far: 220 }}
        onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.12 }}
      >
        <hemisphereLight args={['#fff6e8', '#3a3a40', 0.6]} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[diag * 0.7, diag * 1.6, diag * 0.7]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={diag * 7}
          shadow-camera-left={-diag * 1.6}
          shadow-camera-right={diag * 1.6}
          shadow-camera-top={diag * 1.6}
          shadow-camera-bottom={-diag * 1.6}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-diag, diag * 0.7, -diag * 0.6]} intensity={0.45} color="#cfe0ff" />
        <Scene />
        <Exporter />
        <OrbitControls makeDefault target={[0, 0.4, 0]} enablePan minDistance={diag * 0.4} maxDistance={diag * 3} minPolarAngle={0.15} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  )
}
