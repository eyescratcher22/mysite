import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Computer(props) {
  const { nodes, materials } = useGLTF('/models/computer.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[-18.311, 63.678, 97.343]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={67.441}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane002_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={[10.595, 39.038, 10.595]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane024_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[-1.776, 18.234, 123.195]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[0, 64.934, 4.183]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={61.074}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[0, 145.329, 4.183]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[74.829, 59.237, 56.129]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[37.746, 45.384, -66.311]}
          rotation={[-Math.PI, 0, 0]}
          scale={[5.485, 1.893, 2.603]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cable_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[36.541, 90.469, -58.925]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cable001_Computer_midtech_0.geometry}
          material={materials.Computer_midtech}
          position={[33.228, 84.948, -58.925]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/computer.glb')