import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const Geo = () => {
  const cubeRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      // Use a sine wave to animate the cube side to side
      cubeRef.current.position.x = Math.sin(clock.getElapsedTime()) * 1; // Adjust multiplier for range
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, 1, 0]}>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

const Background = (props: { className: string }) => {
  return (
    <>
      {/* bg color */}
      <div className={`${props.className} flex flex-col h-screen`}>
        <Canvas className="h-screen m-0 absolute">
          <Geo />
          <ambientLight intensity={0.5} />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
};

export default Background;
