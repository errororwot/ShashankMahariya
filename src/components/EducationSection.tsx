import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "",
    institution: "St. Andrews Institute of Technology & Management",
    period: "2023 – 2026 (Ongoing)",
    status: "Pursuing",
    currentStatus: "Currently in 5th Semester (2025)",
    highlights: [
      "Focused on programming, databases, and full-stack web development",
      "Actively building academic and personal software projects",
    ],
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 relative" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--muted)/0.3)_0%,transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-muted-foreground">04.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold flex items-center gap-3">
                <span>🎓</span> Education
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}</span> Academic journey
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-foreground rounded-full border-4 border-background"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
                />

                {/* Content card */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  }`}
                >
                  <div className="p-6 border border-border rounded bg-card/30 backdrop-blur-sm group hover:border-foreground/30 transition-colors">
                    {/* Period badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 font-mono text-xs bg-muted rounded">
                        {edu.period}
                      </span>
                      {edu.status === "Pursuing" && (
                        <span className="px-3 py-1 font-mono text-xs border border-foreground/30 rounded text-foreground/70">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Degree info */}
                    <h3 className="font-display text-xl font-bold mb-1 group-hover:text-foreground transition-colors">
                      {edu.degree}
                    </h3>
                    {edu.field && <p className="text-muted-foreground mb-2">{edu.field}</p>}
                    <p className="font-mono text-sm text-muted-foreground mb-4">
                      @ {edu.institution}
                    </p>

                    {/* Current Status */}
                    {(edu as any).currentStatus && (
                      <div className="mb-4 p-3 bg-muted/30 rounded border border-border">
                        <p className="font-mono text-xs text-muted-foreground mb-1">Current Status</p>
                        <p className="font-mono text-sm text-foreground">{(edu as any).currentStatus}</p>
                      </div>
                    )}

                    {/* GPA */}
                    {(edu as any).gpa && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-mono text-xs text-muted-foreground">GPA:</span>
                        <span className="font-mono text-sm text-foreground">{(edu as any).gpa}</span>
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="space-y-2">
                      {edu.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.2 + hIndex * 0.1 }}
                        >
                          <span className="text-foreground/50 mt-1">▹</span>
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;