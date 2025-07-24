import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import { Suspense } from "react";

const HeroExperience = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

 
  if (isTabletOrMobile) return null;

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <OrbitControls
        autoRotate={true}
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <group
          scale={1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;



