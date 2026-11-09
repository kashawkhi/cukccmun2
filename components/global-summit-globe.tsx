'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const nations = [
  { name: 'USA', lat: 38, lon: -97 },
  { name: 'BRA', lat: -10, lon: -52 },
  { name: 'GBR', lat: 54, lon: -2 },
  { name: 'FRA', lat: 46, lon: 2 },
  { name: 'IND', lat: 21, lon: 78 },
  { name: 'CHN', lat: 35, lon: 103 },
  { name: 'JPN', lat: 36, lon: 138 },
  { name: 'ZAF', lat: -30, lon: 24 },
  { name: 'AUS', lat: -25, lon: 134 },
  { name: 'EGY', lat: 27, lon: 30 },
]

function latLonToVector(lat: number, lon: number, radius = 1.52) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta))
}

function LatitudeLines() {
  const lines = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const points = Array.from({ length: 65 }, (_, i) => latLonToVector(lat, i * 5.625, 1.505))
    lines.push(<Line key={`lat-${lat}`} points={points} color="#d5b36a" opacity={0.24} transparent lineWidth={0.5} />)
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const points = Array.from({ length: 65 }, (_, i) => latLonToVector(-90 + i * 2.8125, lon, 1.505))
    lines.push(<Line key={`lon-${lon}`} points={points} color="#d5b36a" opacity={0.2} transparent lineWidth={0.5} />)
  }
  return <>{lines}</>
}

function Globe() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.16 })
  return <group ref={group} rotation={[0.12, -0.7, 0]}>
    <mesh><sphereGeometry args={[1.5, 48, 32]} /><meshBasicMaterial color="#8d1718" transparent opacity={0.92} /></mesh>
    <mesh><sphereGeometry args={[1.51, 24, 16]} /><meshBasicMaterial color="#d5b36a" wireframe transparent opacity={0.25} /></mesh>
    <LatitudeLines />
    {nations.map(({ name, lat, lon }) => {
      const position = latLonToVector(lat, lon)
      return <group key={name} position={position}>
        <mesh><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#f6db8f" /></mesh>
        <mesh scale={1.9}><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#d5b36a" transparent opacity={0.18} /></mesh>
      </group>
    })}
  </group>
}

export function GlobalSummitGlobe() {
  return <div className="summit-globe" role="img" aria-label="A rotating globe highlighting major MUN nations including the USA, United Kingdom, France, India, China, Japan, Brazil, South Africa, Australia, and Egypt">
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />
      <ambientLight intensity={1} />
      <Globe />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.35} />
    </Canvas>
    <div className="globe-caption"><span className="globe-dot" /> GLOBAL NATIONS SUMMIT <small>MAJOR DELEGATIONS</small></div>
  </div>
}
