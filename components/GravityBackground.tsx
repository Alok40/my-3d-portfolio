'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Particles() {

  const mesh = useRef<any>(null)
  const { mouse } = useThree()

  const count = 200

  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(() => {

    const array = mesh.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {

      const ix = i * 3
      const iy = i * 3 + 1

      array[ix] += (mouse.x * 5 - array[ix]) * 0.002
      array[iy] += (mouse.y * 3 - array[iy]) * 0.002
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#60a5fa"
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function GravityBackground() {

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <Particles />
      </Canvas>
    </div>
  )
}