import { useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import IntroSequence from "@/components/IntroSequence";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Intro Sequence - plays once on load */}
      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}

      {/* Full Page Reveal Animation */}
      <motion.div 
        className="min-h-screen bg-background text-foreground overflow-x-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: introComplete ? 1 : 0, 
          y: introComplete ? 0 : 40 
        }}
        transition={{ 
          duration: 0.9, 
          ease: [0.76, 0, 0.24, 1], // easeInOutQuart
          delay: 0.1
        }}
      >
      {/* Intro Sequence - plays once on load */}
      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Scanlines effect */}
      <div className="scanlines" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection introComplete={introComplete} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <AchievementsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
      </motion.div>
    </>
  );
};

export default Index;