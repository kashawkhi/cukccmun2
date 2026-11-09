'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const nations = [
  { name: 'United States', code: 'USA', lat: 38, lon: -97 },
  { name: 'Brazil', code: 'BRA', lat: -10, lon: -52 },
  { name: 'United Kingdom', code: 'GBR', lat: 54, lon: -2 },
  { name: 'France', code: 'FRA', lat: 46, lon: 2 },
  { name: 'India', code: 'IND', lat: 21, lon: 78 },
  { name: 'China', code: 'CHN', lat: 35, lon: 103 },
  { name: 'Japan', code: 'JPN', lat: 36, lon: 138 },
  { name: 'South Africa', code: 'ZAF', lat: -30, lon: 24 },
  { name: 'Australia', code: 'AUS', lat: -25, lon: 134 },
  { name: 'Egypt', code: 'EGY', lat: 27, lon: 30 },
]

function latLonToVector(lat: number, lon: number, radius = 1.52) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.cos(theta))
}

function Globe() {
  const group = useRef<THREE.Group>(null)
  const mapTexture = useLoader(THREE.TextureLoader, '/earth-map.png')
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.16 })
  return <group ref={group} rotation={[0.12, -0.7, 0]}>
    <mesh><sphereGeometry args={[1.5, 64, 40]} /><meshBasicMaterial map={mapTexture} color="#e6c778" /></mesh>
    {nations.map(({ name, code, lat, lon }) => {
      const position = latLonToVector(lat, lon)
      return <group key={code} position={position}>
        <mesh><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#f6db8f" /></mesh>
        <mesh scale={1.9}><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#d5b36a" transparent opacity={0.18} /></mesh>
        <Html distanceFactor={5} position={[0, 0.14, 0]} center>
          <span className="nation-label"><b>{code}</b>{name}</span>
        </Html>
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
