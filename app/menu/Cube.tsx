import {  useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useGLTF, OrbitControls } from "@react-three/drei";

export default function Cube(){
    const cubeRef = useRef<Mesh>(null);
    const { scene } = useGLTF("/rubiks_cube.glb");
    console.log("scene",scene);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.y += 0.01;
        }
    })

    return <>
        {/* <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} /> */}
        <OrbitControls/>
        <primitive object={scene} scale={50} position={[0, -1, 0]} ref={cubeRef} />
        
    </>;
}