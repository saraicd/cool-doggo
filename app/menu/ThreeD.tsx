import { useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import { Environment, Float, Lightformer, OrbitControls } from "@react-three/drei"
import * as THREE from 'three';

const data = Array.from({ length: 200 }, () => ({ color: "white", scale: 0.25 + Math.random() }))

function Striplight(props: any) {
    return (
      <mesh {...props}>
        <boxGeometry />
        <meshBasicMaterial color="white" />
      </mesh>
    )
  }

export const ThreeD = () => (
  <div className="h-full">
    <Canvas 
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }} 
        orthographic 
        camera={{ position: [0, 0, 100], zoom: 100 }} 
        >  
        <Environment resolution={512}>
            {/* Ceiling */}
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
            <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
            {/* Sides */}
            <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
            <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
            {/* Key */}
            <Lightformer form="ring" color="purple" intensity={30} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </Environment>
        <ambientLight intensity={1} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="pink" castShadow shadow-mapSize={[512, 512]} />
        <directionalLight position={[0, 5, -4]}  intensity={.5} color="pink" />
        <directionalLight position={[5, 6, -3]}  intensity={1} color="blue" />
        <directionalLight position={[-10, -8, 15]} intensity={1} color="rgb(64, 15, 99)" />
        <Physics gravity={[0, -1, 0]}>
            <group position={[0, 0, -10]}>
                <Mouse />
                <Borders />
                <InstancedSpheres />
            </group>
        </Physics>
        
    </Canvas>
  </div>
)

function InstancedSpheres({ count = 100 }) {
  const { viewport } = useThree()

  const [ref, api] = useSphere((index) => ({
    mass: data[index].scale * 100,
    position: [
        Math.random() * viewport.width - viewport.width / 2,  // Random x-position within the viewport
        Math.random() * viewport.height - viewport.height / 2, // Random y-position within the viewport
        Math.random() * 10 - 5,  // Random z-position (depth)
    ],
    args: [1],
  }))
  const colorArray = useMemo(() => new Float32Array(count * 3).fill(1), [count])
  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) api.at(i).scaleOverride([data[i].scale, data[i].scale, data[i].scale])
  }, [])
  return (
    <instancedMesh castShadow ref={ref} args={[,, count]} receiveShadow>
      <sphereGeometry args={[1, 64, 64]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshStandardMaterial toneMapped={false} metalness={0.3} roughness={0.4}   />
    </instancedMesh>
  )
}

function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

function Plane({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
    usePlane(() => ({
      position,
      rotation,
      type: "Static",
    }));
    return null;
}

function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [4] }))
  useFrame((state) => api.position.set((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 7));
  return null;
}
