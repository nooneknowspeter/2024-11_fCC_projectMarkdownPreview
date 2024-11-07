import "@radix-ui/themes/styles.css";
import { Canvas } from "@react-three/fiber";

const Plane = () => {
  return (
    <mesh>
      <planeGeometry args={[15, 15]} />
      <meshPhongMaterial />
    </mesh>
  );
};

const Background = () => {
  return (
    <>
      <Canvas>
        <Plane />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />
      </Canvas>
    </>
  );
};

export default Background;
