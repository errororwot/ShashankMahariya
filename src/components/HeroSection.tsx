import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Hero3DScene from "./Hero3DScene";
import EncryptedIdentityDrift from "./EncryptedIdentityDrift";

interface HeroSectionProps {
  introComplete?: boolean;
}

const HeroSection = ({ introComplete = true }: HeroSectionProps) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Full-Stack Developer & Creative Technologist";

  useEffect(() => {
    // Only start typing animation after intro is complete
    if (!introComplete) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [introComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const reduceMotion = useReducedMotion();

  const reveal = (opts: { delay?: number; y?: number } = {}) => {
    if (reduceMotion) return { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } };
    
    // Cinematic entrance animation after intro + page reveal completes
    const baseDelay = introComplete ? 0.3 : 2.5;
    const totalDelay = baseDelay + (opts.delay ?? 0);
    
    return {
      initial: { opacity: 0, y: opts.y ?? 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { 
        duration: 0.9, 
        delay: totalDelay, 
        ease: [0.19, 1.0, 0.22, 1.0] // Custom easeOut
      },
    };
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Scene Background */}
      <Hero3DScene introComplete={introComplete} />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:100px_100px] opacity-10 pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal header */}
          <motion.div className="mb-8" {...reveal({ delay: 0 })}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded font-mono text-sm text-muted-foreground">
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="ml-2">~/portfolio</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div className="mb-6" {...reveal({ delay: 0.2, y: 30 })}>
            <p className="font-mono text-muted-foreground mb-4">
              <span className="text-foreground/70">{">"}"</span> Hello, I am
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight glow-text">
              <div className="flex flex-col gap-1">
                <EncryptedIdentityDrift 
                  text="SHASHANK"
                  introComplete={introComplete}
                />
                <EncryptedIdentityDrift 
                  text="MAHARIYA"
                  introComplete={introComplete}
                />
              </div>
            </h1>
          </motion.div>

          {/* Typing animation */}
          <motion.div className="mb-12" {...reveal({ delay: 0.4 })}>
            <p className="font-mono text-xl sm:text-2xl text-muted-foreground">
              <span className="text-foreground/70">{">"}</span>{" "}
              {displayText}
              <span
                className={`inline-block w-3 h-6 bg-foreground ml-1 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4" {...reveal({ delay: 0.6, y: 30 })}>
            <motion.button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-foreground text-background font-mono text-sm font-medium hover:bg-foreground/90 transition-colors relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="button"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <motion.div
                className="absolute inset-0 bg-muted-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="px-8 py-4 border border-foreground/30 font-mono text-sm font-medium hover:border-foreground hover:bg-foreground/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="button"
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2" {...reveal({ delay: 1 })}>
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground"
              animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
              transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: [0.2, 0.9, 0.3, 1] }}
            >
              <span className="font-mono text-xs">SCROLL</span>
              <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;