

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Companion(props) {
  const { nodes, materials } = useGLTF('/models/companion.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.geometry_0.geometry} material={nodes.geometry_0.material} />
    </group>
  )
}

useGLTF.preload('/models/companion.glb')
