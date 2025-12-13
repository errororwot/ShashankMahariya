import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [phase, setPhase] = useState<"boot" | "flash" | "shutter" | "complete">("boot");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState<string[]>(["", "", "", "", ""]);

  const bootLines = [
    "> Initializing Operating System...",
    "> Loading modules...",
    "> Verifying system integrity...",
    "> Establishing secure tunnels...",
    "> Access Granted.",
  ];

  // Phase 1: Character-by-character typing
  useEffect(() => {
    if (phase !== "boot") return;

    const currentLine = bootLines[currentLineIndex];
    const currentTyped = typedText[currentLineIndex];

    if (currentTyped.length < currentLine.length) {
      // Type next character
      const timer = setTimeout(() => {
        const newTypedText = [...typedText];
        newTypedText[currentLineIndex] = currentLine.slice(0, currentTyped.length + 1);
        setTypedText(newTypedText);
      }, 22); // 22ms per character for faster typing

      return () => clearTimeout(timer);
    } else if (currentLineIndex < bootLines.length - 1) {
      // Current line complete, move to next line after brief pause
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // All lines complete, wait then flash
      const timer = setTimeout(() => setPhase("flash"), 300);
      return () => clearTimeout(timer);
    }
  }, [phase, currentLineIndex, typedText]);

  // Phase 2: Flash transition
  useEffect(() => {
    if (phase === "flash") {
      const flashTimer = setTimeout(() => {
        setPhase("shutter");
      }, 180); // 0.18s flash duration
      return () => clearTimeout(flashTimer);
    }
  }, [phase]);

  // Phase 3: Shutter reveal
  useEffect(() => {
    if (phase === "shutter") {
      const shutterTimer = setTimeout(() => {
        setPhase("complete");
        onComplete();
      }, 900); // 0.9s shutter animation
      return () => clearTimeout(shutterTimer);
    }
  }, [phase, onComplete]);

  if (phase === "complete") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Phase 1: Boot Terminal */}
        {phase === "boot" && (
          <motion.div
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Terminal noise overlay */}
            <div className="intro-noise absolute inset-0 opacity-[0.03] pointer-events-none" />
            
            {/* Scanlines */}
            <div className="intro-scanlines absolute inset-0 pointer-events-none" />

            {/* Terminal content */}
            <div className="relative z-10 max-w-3xl w-full px-6">
              <div className="space-y-3">
                {bootLines.slice(0, currentLineIndex + 1).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="font-mono text-lg sm:text-xl text-white/90 flex items-start"
                  >
                    <span className="glitch-text inline-block" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                      {typedText[index]}
                    </span>
                    {index === currentLineIndex && typedText[index].length < line.length && (
                      <motion.span
                        className="inline-block w-2 h-5 bg-white ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      />
                    )}
                    {index === currentLineIndex && typedText[index].length === line.length && (
                      <motion.span
                        className="inline-block w-2 h-5 bg-white/80 ml-1"
                        animate={{ opacity: [1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Flash Transition */}
        {phase === "flash" && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.18, times: [0, 0.3, 1] }}
          >
            {/* Flash noise */}
            <div className="intro-flash-noise absolute inset-0 opacity-20" />
          </motion.div>
        )}

        {/* Phase 3: Digital Shutter Reveal */}
        {phase === "shutter" && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ 
              duration: 0.9, 
              ease: [0.76, 0, 0.24, 1] // easeInOutQuart
            }}
          >
            {/* Grid pattern on shutter */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Bottom glow as it slides up */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroSequence;
