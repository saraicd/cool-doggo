import {Canvas} from "@react-three/fiber";
import Cube from"./Cube";


export default function ThreeD(){

    return <>
        <Canvas camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 20] }} >
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <Cube/>
        </Canvas>
    </>;
}