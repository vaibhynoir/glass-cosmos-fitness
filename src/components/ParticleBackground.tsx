import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
};
