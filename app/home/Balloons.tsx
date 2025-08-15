import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { Environment, Lightformer } from "@react-three/drei";
import { useTheme } from "../ThemeProvider";

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

      // Cleanup function
      return () => clearInterval(interval);
    }
  }, [trigger]);

  useFrame(({ camera }) => {
    camera.position.set(shake[0], shake[1], shake[2]);
  });

  return null;
};

export const Balloons = ({ freeBalloons }: { freeBalloons: boolean }) => {
  const [lightIntensity, setLightIntensity] = useState(2);

  useEffect(() => {
    if (freeBalloons) {
      // Light flash
      setLightIntensity(20);
      const timeoutId = setTimeout(() => {
        setLightIntensity(2);
      }, 50);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }
  }, [freeBalloons]);

  return (
    <div className="h-full z-[-3]">
      <Canvas
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
        orthographic
        camera={{ position: [0, 0, 100], zoom: 100 }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow lower frame rates when needed
      >
        <CameraShake trigger={freeBalloons} />
        <Environment resolution={256}>
          <Lightformer
            intensity={lightIntensity}
            rotation-x={Math.PI / 2}
            position={[0, 4, -6]}
            scale={[15, 1, 1]}
          />
          <Lightformer
            intensity={lightIntensity}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[15, 1, 1]}
          />
          <Lightformer
            intensity={lightIntensity}
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[15, 1, 1]}
          />
          {/* Sides */}
          <Lightformer
            intensity={3}
            rotation-y={Math.PI / 2}
            position={[-30, 2, 0]}
            scale={[60, 2, 1]}
          />
          <Lightformer
            intensity={3}
            rotation-y={-Math.PI / 2}
            position={[30, 2, 0]}
            scale={[60, 2, 1]}
          />
          {/* Key light - reduced intensity */}
          <Lightformer
            form="ring"
            color="purple"
            intensity={20}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 5, -4]} intensity={0.3} color="pink" />
        <directionalLight position={[5, 6, -3]} intensity={0.7} color="blue" />
        <directionalLight
          position={[-10, -8, 15]}
          intensity={0.7}
          color="rgb(64, 15, 99)"
        />
        <Physics gravity={[0, -1, 0]} broadphase="SAP">
          {" "}
          {/* Use SAP broadphase for better performance */}
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders removeBallonPlane={freeBalloons} />
            <InstancedSpheres />
          </group>
        </Physics>
      </Canvas>
    </div>
  );
};

function InstancedSpheres() {
  const { isDarkMode } = useTheme();
  const { viewport } = useThree();
  const count = viewport.width > 6 ? 200 : 120;
  console.log(viewport.width);

  const [ref, api] = useSphere(() => ({
    mass: 0.25 * 100000,
    position: [
      Math.random() * viewport.width - viewport.width / 2,
      Math.random() * viewport.height - viewport.height / 2,
      Math.random() * 10 - 5,
    ],
    args: [1],
  }));
  const balloonColor = isDarkMode ? 0 : 1;
  const colorArray = useMemo(
    () => new Float32Array(count * 3).fill(balloonColor),
    [count]
  );
  useLayoutEffect(() => {
    for (let i = 0; i < count; i++)
      api.at(i).scaleOverride([0.005 * count, 0.005 * count, 0.005 * count]);
  }, []);
  return (
    <instancedMesh castShadow ref={ref} args={[, , count]} receiveShadow>
      <sphereGeometry args={[1, 64, 64]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshStandardMaterial
        toneMapped={false}
        metalness={0.3}
        roughness={0.4}
        vertexColors
      />
    </instancedMesh>
  );
}

function Borders({ removeBallonPlane }: { removeBallonPlane: boolean }) {
  const { viewport } = useThree();

  // Early return for better performance
  if (removeBallonPlane) return null;

  return (
    <>
      <Plane
        position={[0, -viewport.height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  );
}

function Plane({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  usePlane(() => ({
    position,
    rotation,
    type: "Static",
  }));
  return null;
}

function Mouse() {
  const { viewport } = useThree();
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [4] }));
  useFrame((state) =>
    api.position.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      7
    )
  );
  return null;
}
