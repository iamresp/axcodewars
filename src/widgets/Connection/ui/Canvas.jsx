import React, { useCallback, Suspense } from 'react'
import { motion, MotionCanvas } from 'framer-motion-3d'
import { useGLTF, useTexture, Shadow, meshBounds } from '@react-three/drei'
import { useCursor } from 'shared/hooks/useCursor'
import { transition } from 'shared/constants/transition'

function Switch ({ isOn, setOn, connect }) {
  const { nodes, materials } = useGLTF('/switch.glb')
  const texture = useTexture('/cross.jpg')

  const onClick = useCallback(() => {
    setOn(!isOn)
    connect()
  }, [isOn, connect])

  const lightVariants = {
    on: { color: '#FFE8DE' },
    off: { color: 'white' }
  }

  return (
  // eslint-disable-next-line react/no-unknown-property
    <group scale={[1.25, 1.25, 1.25]} dispose={null}>
      <motion.mesh receiveShadow castShadow geometry={nodes.Cube.geometry}>
        <motion.primitive
          variants={lightVariants}
          roughness={0.5}
          metalness={0.8}
          object={materials.track}
          attach='material'
          transition={{ ...transition, damping: 100 }}
        />
      </motion.mesh>
      <motion.group
        position-y={0.85}
        variants={{
          on: { z: -1.2 },
          off: { z: 1.2 }
        }}
      >
        <motion.mesh
          receiveShadow
          castShadow
          raycast={meshBounds}
          variants={{
            on: { rotateX: 0 },
            off: { rotateX: Math.PI * 1.3 }
          }}
          onClick={onClick}
          {...useCursor()}
        >
          {/* eslint-disable-next-line react/no-unknown-property */}
          <sphereGeometry args={[0.8, 64, 64]} />
          <motion.meshStandardMaterial roughness={0.5} map={texture} />
        </motion.mesh>
        <motion.pointLight
          intensity={100}
          distance={1.4}
          variants={lightVariants}
        />
        <Shadow
          renderOrder={-1000}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 1, 1]}
        />
      </motion.group>
    </group>
  )
}

export function Scene ({ isOn, setOn, connect }) {
  return (
    <MotionCanvas
      orthographic
      shadows
      dpr={[1, 2]}
      camera={{ zoom: 60, position: [-5, 5, 5], fov: 90 }}
    >
      <motion.group initial={false} animate={isOn ? 'on' : 'off'}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.1} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <directionalLight position={[-20, 20, 20]} intensity={1} />
        <motion.directionalLight
          position={[-20, -20, -20]}
          intensity={0.5}
          variants={colorVariants}
        />
        <motion.pointLight
          position={[0, 0, 5]}
          distance={5}
          intensity={5}
          variants={colorVariants}
        />
        <motion.spotLight
          variants={colorVariants}
          position={[10, 20, 20]}
          angle={0.1}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00001}
          castShadow
        />
        <Suspense fallback={null}>
          <Switch isOn={isOn} setOn={setOn} connect={connect} />
        </Suspense>
      </motion.group>
    </MotionCanvas>
  )
}

const colorVariants = {
  on: { color: '#7fffd4' },
  off: { color: '#7fffd4' }
}
