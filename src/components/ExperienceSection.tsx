import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    id: 1,
    title: "Fresher | Student Developer",
    company: "Self-Driven & Academic Projects",
    period: "2023 – Present",
    type: "Learning",
    description: [
      "Built multiple academic and personal projects focusing on web development and automation",
      "Worked on frontend, backend, and database integration in full-stack projects",
      "Developed problem-solving skills through hands-on coding and debugging",
      "Continuously improving code quality, structure, and best practices",
    ],
  },
  {
    id: 2,
    title: "Project-Based Experience",
    company: "Hands-on learning through real implementations",
    period: "2023 – Present",
    type: "Academic",
    description: [
      "Full-stack web applications using HTML, CSS, JavaScript, Node.js, and SQL",
      "Python-based automation and AI assistant projects",
      "Version control and collaboration using Git & GitHub",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-muted-foreground">05.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Experience</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}"</span> What I've worked on so far
            </p>
          </motion.div>

          {/* Experience Tabs */}
          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Tab list */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 font-mono text-sm text-left whitespace-nowrap transition-all relative ${
                    activeTab === index
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ x: 4 }}
                  data-cursor="button"
                >
                  {exp.company}
                  {activeTab === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 md:h-full md:w-0.5 md:right-auto md:bottom-auto md:top-0 bg-foreground"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-[300px]">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={activeTab === index ? "block" : "hidden"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: activeTab === index ? 1 : 0, x: activeTab === index ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display text-xl font-bold">{exp.title}</h3>
                    <span className="px-2 py-0.5 font-mono text-xs border border-border rounded">
                      {exp.type}
                    </span>
                  </div>

                  <p className="font-mono text-sm text-muted-foreground mb-2">
                    @ {exp.company}
                  </p>

                  <p className="font-mono text-sm text-muted-foreground mb-6">{exp.period}</p>

                  <ul className="space-y-3">
                    {exp.description.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                      >
                        <span className="text-foreground/50 mt-1">▹</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Status */}
          <motion.div
            className="mt-16 p-6 border border-border rounded bg-card/30"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
              <span className="font-mono text-sm text-muted-foreground">Current Status</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Fresher BCA graduate (2026) actively seeking opportunities to start a professional career as a developer.
              <br />
              <span className="text-foreground">Open to internships, entry-level roles, and collaborative projects</span> where I can learn, contribute, and grow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;