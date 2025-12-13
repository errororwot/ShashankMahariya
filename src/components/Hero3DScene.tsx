import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import FloatingShapes from "./FloatingShapes";
import { motion } from "framer-motion";

interface Hero3DSceneProps {
  introComplete?: boolean;
}

const Hero3DScene = ({ introComplete = true }: Hero3DSceneProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: introComplete ? 1 : 0 }}
      transition={{ 
        duration: 1.4, 
        delay: introComplete ? 0.4 : 0,
        ease: [0.19, 1.0, 0.22, 1.0]
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <FloatingShapes mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};

export default Hero3DScene;
