import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { Environment, Lightformer } from "@react-three/drei";
import { useTheme } from "../ThemeProvider";

const data = Array.from({ length: 200 }, () => ({ color: "white", scale: 0.25 + Math.random() }))

const CameraShake = ({ trigger }: { trigger: boolean }) => {
  const [shake, setShake] = useState<[number, number, number]>([0, 0, 100]);

  useEffect(() => {
    if (trigger) {
      let i = 0;
      const interval = setInterval(() => {
        setShake([
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5, 
          100,
        ]);
        i++;
        if (i > 4) {
          clearInterval(interval);
          setShake([0, 0, 100]);
        }
      }, 70);
    }
  }, [trigger]);

  useFrame(({ camera }) => {
    camera.position.set(shake[0], shake[1], shake[2]);
  });

  return null;
};

export const Balloons = ({freeBalloons}: {freeBalloons: boolean}) => {
  const [ lightIntensity, setLightIntensity ] = useState(2);

  useEffect(() =>{
    if(freeBalloons) {
      // Light flash
      setLightIntensity(20);
      setTimeout(()=>{
        setLightIntensity(2);
      }, 50);
    }
  }, [freeBalloons]);

  return (
  <div className="h-full z-[-3]">
    <Canvas 
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }} 
        orthographic 
        camera={{ position: [0, 0, 100], zoom: 100 }} 
        >  
        <CameraShake trigger={freeBalloons} />
        <Environment resolution={512}>
            {/* Ceiling */}
            <Lightformer intensity={lightIntensity} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
            <Lightformer intensity={lightIntensity} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
            <Lightformer intensity={lightIntensity} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={lightIntensity} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
            <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
            <Lightformer intensity={lightIntensity} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
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
                <Borders removeBallonPlane={freeBalloons}/>
                <InstancedSpheres />
            </group>
        </Physics>
        
    </Canvas>
  </div>
)}

function InstancedSpheres() {
  const { isDarkMode } = useTheme();
  const { viewport } = useThree()
  const count = viewport.width >6 ? 200 : 120;
  console.log(viewport.width)

  const [ref, api] = useSphere((index) => ({
    mass: 0.25 * 100000,
    position: [
        Math.random() * viewport.width - viewport.width / 2, 
        Math.random() * viewport.height - viewport.height / 2, 
        Math.random() * 10 - 5,  
    ],
    args: [1],
  }))
  const balloonColor = isDarkMode ? 0 : 1;
  const colorArray = useMemo(() => new Float32Array(count * 3).fill(balloonColor), [count])
  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) api.at(i).scaleOverride([0.005*count, 0.005*count, 0.005*count])
  }, [])
  return (
    <instancedMesh castShadow ref={ref} args={[,, count]} receiveShadow>
      <sphereGeometry args={[1, 64, 64]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshStandardMaterial toneMapped={false} metalness={0.3} roughness={0.4} vertexColors  />
    </instancedMesh>
  )
}

function Borders({removeBallonPlane}: {removeBallonPlane: boolean}) {
  console.log(removeBallonPlane,"freeballons")
  const { viewport } = useThree()
  return (
    <>
      {!removeBallonPlane && <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />}
      {!removeBallonPlane && <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />}
      {!removeBallonPlane && <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />}
      {!removeBallonPlane && <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />}
      {!removeBallonPlane && <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />}
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
