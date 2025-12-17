import { useEffect, useState, useRef, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

interface EncryptedIdentityDriftProps {
  text: string;
  className?: string;
  introComplete?: boolean;
}

const HACKER_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const INITIAL_ENCRYPTED_HOLD = 400; // ms - brief hold before revealing
const REVEAL_DURATION = 1800; // ms - total reveal duration (cinematic)
const DRIFT_INTERVAL = 1400; // ms - consistent drift timing
const GLYPH_HOLD_MIN = 120; // ms
const GLYPH_HOLD_MAX = 160; // ms

const getRandomGlyph = () => {
  return HACKER_GLYPHS[Math.floor(Math.random() * HACKER_GLYPHS.length)];
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const EncryptedIdentityDrift = ({
  text,
  className = "",
  introComplete = true,
}: EncryptedIdentityDriftProps) => {
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const reduceMotion = useReducedMotion();
  const driftIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isLowPowerRef = useRef(false);
  const isPageVisibleRef = useRef(true);

  // Memoize the text array to prevent unnecessary re-renders
  const textArray = useMemo(() => text.split(""), [text]);

  // Check for low-power mode or mobile
  useEffect(() => {
    const checkLowPower = () => {
      // Check if device prefers reduced motion or is mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLowPower = reduceMotion || isMobile;
      isLowPowerRef.current = isLowPower;
    };

    checkLowPower();
  }, [reduceMotion]);

  // Add page visibility detection to pause drift when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
      
      // If page becomes hidden, clear any pending drift
      if (document.hidden && driftIntervalRef.current) {
        clearTimeout(driftIntervalRef.current);
        driftIntervalRef.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // PHASE 1: Encrypted Reveal (ONE TIME) - Slower, more premium timing
  useEffect(() => {
    if (!introComplete || reduceMotion) {
      // If reduced motion, just show the text immediately
      setDisplayChars(textArray);
      setIsRevealed(true);
      return;
    }

    // Start with fully encrypted text
    const initialEncrypted = textArray.map((char) =>
      char === " " ? " " : getRandomGlyph()
    );
    setDisplayChars(initialEncrypted);

    // Hold the encrypted state for INITIAL_ENCRYPTED_HOLD duration
    const holdTimeout = setTimeout(() => {
      // Gradually decode each character
      const startTime = Date.now();
      const revealInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / REVEAL_DURATION, 1);

        if (progress >= 1) {
          setDisplayChars(textArray);
          setIsRevealed(true);
          clearInterval(revealInterval);
          return;
        }

        // Decode characters progressively with cinematic timing
        const newChars = textArray.map((char, index) => {
          if (char === " ") return " ";

          // Calculate when this character should be revealed
          const baseRevealPoint = index / textArray.length;
          // Add slight stagger for more natural feel
          const randomOffset = (Math.random() - 0.5) * 0.1;
          const revealPoint = Math.max(0, Math.min(1, baseRevealPoint + randomOffset));

          if (progress >= revealPoint) {
            return char;
          } else {
            // Still encrypted - show random glyph
            return getRandomGlyph();
          }
        });

        setDisplayChars(newChars);
      }, 45); // Update every 45ms for smooth cinematic reveal

      return () => clearInterval(revealInterval);
    }, INITIAL_ENCRYPTED_HOLD);

    return () => clearTimeout(holdTimeout);
  }, [introComplete, textArray, reduceMotion]);

  // PHASE 2: Continuous Identity Drift (LOOP) - Subtle, premium, continuous
  useEffect(() => {
    if (!isRevealed || reduceMotion || isLowPowerRef.current) {
      return;
    }

    const startDrift = () => {
      // Only run if page is visible
      if (!isPageVisibleRef.current) {
        // Retry when page becomes visible again
        driftIntervalRef.current = setTimeout(startDrift, 1000);
        return;
      }

      // Select 2 random letter positions (not spaces)
      const letterIndices = textArray
        .map((char, index) => (char !== " " ? index : -1))
        .filter((index) => index !== -1);

      if (letterIndices.length < 2) return;

      // Randomly pick 2 different indices
      const shuffled = [...letterIndices].sort(() => Math.random() - 0.5);
      const index1 = shuffled[0];
      const index2 = shuffled[1];

      // Replace with glyphs
      setDisplayChars((prev) => {
        const newChars = [...prev];
        newChars[index1] = getRandomGlyph();
        newChars[index2] = getRandomGlyph();
        return newChars;
      });

      // Hold for random duration, then restore
      const holdDuration = getRandomInt(GLYPH_HOLD_MIN, GLYPH_HOLD_MAX);
      setTimeout(() => {
        setDisplayChars((prev) => {
          const newChars = [...prev];
          newChars[index1] = textArray[index1];
          newChars[index2] = textArray[index2];
          return newChars;
        });
      }, holdDuration);

      // Schedule next drift with consistent timing
      driftIntervalRef.current = setTimeout(startDrift, DRIFT_INTERVAL);
    };

    // Start the drift loop after a brief delay
    driftIntervalRef.current = setTimeout(startDrift, DRIFT_INTERVAL);

    return () => {
      if (driftIntervalRef.current) {
        clearTimeout(driftIntervalRef.current);
      }
    };
  }, [isRevealed, textArray, reduceMotion]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        willChange: "contents",
      }}
      aria-label={text}
    >
      {displayChars.map((char, index) => (
        <span
          key={`${index}-${char}`}
          style={{
            display: "inline-block",
            minWidth: char === " " ? "0.5em" : undefined,
            opacity: char === textArray[index] ? 1 : 0.65,
            transition: "opacity 0.08s ease-in-out",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default EncryptedIdentityDrift;
