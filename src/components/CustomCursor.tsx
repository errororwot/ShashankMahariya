import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "link" | "button" | "project">("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Softer spring for a smooth, premium feel
  const springConfig = { damping: 22, stiffness: 140 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("a") || target.closest("[data-cursor='link']")) {
        setCursorVariant("link");
        setIsHovering(true);
      } else if (target.closest("button") || target.closest("[data-cursor='button']")) {
        setCursorVariant("button");
        setIsHovering(true);
      } else if (target.closest("[data-cursor='project']")) {
        setCursorVariant("project");
        setIsHovering(true);
      } else {
        setCursorVariant("default");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const getCursorSize = () => {
    if (cursorVariant === "project") return 80;
    if (cursorVariant === "link") return 60;
    if (cursorVariant === "button") return 50;
    return 16;
  };

  const getCursorOpacity = () => {
    if (isHovering) return 0.2;
    return 1;
  };

  // Hide custom cursor on touch devices or when user prefers reduced motion
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  if (isTouchDevice || shouldReduceMotion) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-foreground mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 8 : 12,
          height: isClicking ? 8 : 12,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.22, ease: [0.2, 0.9, 0.3, 1] }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-foreground/50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: getCursorOpacity(),
          borderWidth: isHovering ? 1 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.2, 0.9, 0.3, 1] }}
      />

      {/* Project cursor text */}
      {cursorVariant === "project" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
            width: 80,
            height: 80,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-xs font-mono text-foreground mix-blend-difference">VIEW</span>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;