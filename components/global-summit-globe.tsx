'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const nations = [
  { code: 'USA', flag: 'flag-usa', lat: 38, lon: -97 },
  { code: 'BRA', flag: 'flag-bra', lat: -10, lon: -52 },
  { code: 'GBR', flag: 'flag-gbr', lat: 54, lon: -2 },
  { code: 'FRA', flag: 'flag-fra', lat: 46, lon: 2 },
  { code: 'IND', flag: 'flag-ind', lat: 21, lon: 78 },
  { code: 'CHN', flag: 'flag-chn', lat: 35, lon: 103 },
  { code: 'JPN', flag: 'flag-jpn', lat: 36, lon: 138 },
  { code: 'ZAF', flag: 'flag-zaf', lat: -30, lon: 24 },
  { code: 'AUS', flag: 'flag-aus', lat: -25, lon: 134 },
  { code: 'EGY', flag: 'flag-egy', lat: 27, lon: 30 },
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
  const mapTexture = useLoader(THREE.TextureLoader, '/earth-map.png')

  useFrame(({ camera, gl }, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.16
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

  return <div className="summit-globe" role="img" aria-label="A rotating globe highlighting major MUN nations including the USA, United Kingdom, France, India, China, Japan, Brazil, South Africa, Australia, and Egypt">
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />
      <ambientLight intensity={1} />
      <Globe labels={labelRefs.current} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.35} />
    </Canvas>
    <div className="globe-label-overlay" aria-hidden="true">
      {nations.map(({ code, flag }, index) => <span ref={(label) => { labelRefs.current[index] = label }} className="nation-label" key={code}><span className={`nation-flag ${flag}`} /><b>{code}</b></span>)}
    </div>
    <div className="globe-caption"><span className="globe-dot" /> GLOBAL NATIONS SUMMIT <small>MAJOR DELEGATIONS</small></div>
  </div>
}
