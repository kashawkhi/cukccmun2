'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const nations = [
  { code: 'DEU', flag: '🇩🇪', lat: 51, lon: 10 },
  { code: 'FRA', flag: '🇫🇷', lat: 46, lon: 2 },
  { code: 'ITA', flag: '🇮🇹', lat: 42, lon: 12 },
  { code: 'ESP', flag: '🇪🇸', lat: 40, lon: -4 },
  { code: 'NLD', flag: '🇳🇱', lat: 52, lon: 5 },
  { code: 'BEL', flag: '🇧🇪', lat: 51, lon: 4.5 },
  { code: 'POL', flag: '🇵🇱', lat: 52, lon: 19 },
  { code: 'SWE', flag: '🇸🇪', lat: 60, lon: 18 },
  { code: 'AUT', flag: '🇦🇹', lat: 47.5, lon: 14.5 },
  { code: 'GRC', flag: '🇬🇷', lat: 39, lon: 22 },
  { code: 'CHE', flag: '🇨🇭', lat: 46.8, lon: 8.2 },
  { code: 'GBR', flag: '🇬🇧', lat: 54, lon: -2 },
  { code: 'UKR', flag: '🇺🇦', lat: 49, lon: 32 },
  { code: 'RUS', flag: '🇷🇺', lat: 61, lon: 105 },
  { code: 'TUR', flag: '🇹🇷', lat: 39, lon: 35 },
  { code: 'USA', flag: '🇺🇸', lat: 39, lon: -98 },
  { code: 'CAN', flag: '🇨🇦', lat: 56, lon: -106 },
  { code: 'MEX', flag: '🇲🇽', lat: 23, lon: -102 },
  { code: 'CUB', flag: '🇨🇺', lat: 22, lon: -79 },
  { code: 'HTI', flag: '🇭🇹', lat: 19, lon: -72 },
  { code: 'BRA', flag: '🇧🇷', lat: -10, lon: -52 },
  { code: 'ARG', flag: '🇦🇷', lat: -34, lon: -64 },
  { code: 'COL', flag: '🇨🇴', lat: 4, lon: -72 },
  { code: 'CHL', flag: '🇨🇱', lat: -30, lon: -71 },
  { code: 'PER', flag: '🇵🇪', lat: -10, lon: -76 },
  { code: 'VEN', flag: '🇻🇪', lat: 8, lon: -66 },
  { code: 'CHN', flag: '🇨🇳', lat: 35, lon: 103 },
  { code: 'IND', flag: '🇮🇳', lat: 21, lon: 78 },
  { code: 'JPN', flag: '🇯🇵', lat: 36, lon: 138 },
  { code: 'KOR', flag: '🇰🇷', lat: 36, lon: 128 },
  { code: 'IDN', flag: '🇮🇩', lat: -2, lon: 118 },
  { code: 'PAK', flag: '🇵🇰', lat: 30, lon: 70 },
  { code: 'BGD', flag: '🇧🇩', lat: 24, lon: 90 },
  { code: 'VNM', flag: '🇻🇳', lat: 16, lon: 108 },
  { code: 'PHL', flag: '🇵🇭', lat: 13, lon: 122 },
  { code: 'IRN', flag: '🇮🇷', lat: 32, lon: 53 },
  { code: 'SAU', flag: '🇸🇦', lat: 24, lon: 45 },
  { code: 'QAT', flag: '🇶🇦', lat: 25.3, lon: 51.2 },
  { code: 'ISR', flag: '🇮🇱', lat: 31.5, lon: 34.8 },
  { code: 'ETH', flag: '🇪🇹', lat: 9, lon: 40 },
  { code: 'NGA', flag: '🇳🇬', lat: 9, lon: 8 },
  { code: 'EGY', flag: '🇪🇬', lat: 27, lon: 30 },
  { code: 'ZAF', flag: '🇿🇦', lat: -29, lon: 24 },
  { code: 'KEN', flag: '🇰🇪', lat: 0, lon: 38 },
  { code: 'GHA', flag: '🇬🇭', lat: 7.9, lon: -1 },
  { code: 'COD', flag: '🇨🇩', lat: -3, lon: 23 },
  { code: 'RWA', flag: '🇷🇼', lat: -2, lon: 30 },
  { code: 'MAR', flag: '🇲🇦', lat: 31, lon: -7 },
  { code: 'SEN', flag: '🇸🇳', lat: 14, lon: -14 },
  { code: 'AUS', flag: '🇦🇺', lat: -25, lon: 134 },
  { code: 'NZL', flag: '🇳🇿', lat: -41, lon: 174 },
  { code: 'PNG', flag: '🇵🇬', lat: -6, lon: 147 },
  { code: 'FJI', flag: '🇫🇯', lat: -18, lon: 179 },
  { code: 'PSE', flag: '🇵🇸', lat: 31.9, lon: 35.2 },
]

function latLonToVector(lat: number, lon: number, radius = 1.52) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta))
}

function Globe({ labels }: { labels: Array<HTMLSpanElement | null> }) {
  const group = useRef<THREE.Group>(null)
  const localLabelPositions = useMemo(() => nations.map(({ lat, lon }) => latLonToVector(lat, lon, 1.68)), [])
  const worldLabelPositions = useMemo(() => nations.map(() => new THREE.Vector3()), [])
  const cameraPosition = useMemo(() => new THREE.Vector3(), [])
  const labelUpdateTime = useRef(0)
  const mapTexture = useLoader(THREE.TextureLoader, '/earth-map.png')

  useFrame(({ camera, gl }, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.16
    labelUpdateTime.current += delta
    if (labelUpdateTime.current < 1 / 30) return
    labelUpdateTime.current = 0
    group.current.updateMatrixWorld(true)
    camera.getWorldPosition(cameraPosition)
    const width = gl.domElement.clientWidth
    const height = gl.domElement.clientHeight

    nations.forEach((_, index) => {
      const label = labels[index]
      if (!label) return
      const position = worldLabelPositions[index].copy(localLabelPositions[index])
      group.current?.localToWorld(position)
      const inFront = position.dot(cameraPosition) > 0
      position.project(camera)
      const x = (position.x * 0.5 + 0.5) * width
      const y = (-position.y * 0.5 + 0.5) * height
      const inView = inFront && Math.abs(position.x) <= 1 && Math.abs(position.y) <= 1
      label.style.visibility = inView ? 'visible' : 'hidden'
      label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    })
  })

  return <group ref={group} rotation={[0.12, -0.7, 0]}>
    <mesh><sphereGeometry args={[1.5, 64, 40]} /><meshBasicMaterial map={mapTexture} color="#e6c778" /></mesh>
    {nations.map(({ code, lat, lon }) => {
      const position = latLonToVector(lat, lon)
      return <group key={code} position={position}>
        <mesh><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#f6db8f" /></mesh>
        <mesh scale={1.9}><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#d5b36a" transparent opacity={0.18} /></mesh>
      </group>
    })}
  </group>
}

export function GlobalSummitGlobe() {
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([])

  return <div className="summit-globe" role="img" aria-label="A rotating globe showing flag-and-code markers for 54 countries, visible only on the viewer-facing side">
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />
      <ambientLight intensity={1} />
      <Globe labels={labelRefs.current} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.35} />
    </Canvas>
    <div className="globe-label-overlay" aria-hidden="true">
      {nations.map(({ code, flag }, index) => <span ref={(label) => { labelRefs.current[index] = label }} className="nation-label" key={code}><span className="nation-flag-emoji">{flag}</span><b>{code}</b></span>)}
    </div>
    <div className="globe-caption"><span className="globe-dot" /> GLOBAL NATIONS SUMMIT <small>MAJOR DELEGATIONS</small></div>
  </div>
}
