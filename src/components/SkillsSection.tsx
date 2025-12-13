import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "JavaScript / TypeScript", level: 85, category: "Languages", description: "Core language for frontend & backend development" },
  { name: "React / Next.js", level: 82, category: "Frontend", description: "Component-based UI, hooks, routing, responsive design" },
  { name: "Node.js / Express", level: 78, category: "Backend", description: "REST APIs, authentication logic, server-side workflows" },
  { name: "Python", level: 75, category: "Languages", description: "Automation, scripting, AI/assistant projects" },
  { name: "PostgreSQL / MongoDB", level: 72, category: "Databases", description: "CRUD operations, schemas, queries, data handling" },
  { name: "AWS / Cloud Basics", level: 65, category: "Cloud", description: "Deployment concepts, hosting, cloud fundamentals" },
  { name: "Git / GitHub", level: 85, category: "Tools", description: "Version control, collaboration, project management" },
  { name: "Docker", level: 60, category: "DevOps", description: "Basic containerization & development setup" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--muted)/0.3)_0%,transparent_50%)]" />

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
              <span className="font-mono text-muted-foreground">02.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Skills & Expertise</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}"</span> Technologies I actively work with
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground/50">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/70 mt-0.5 hidden sm:block">
                        {skill.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                      {skill.category}
                    </span>
                    <span className="font-mono text-sm text-foreground">{skill.level}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground rounded-full relative"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  >
                    {/* Glow effect */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full blur-md opacity-50" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div
            className="mt-16 pt-8 border-t border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="font-mono text-sm text-muted-foreground mb-6">
              <span className="text-foreground/70">{">"}"</span> Also Familiar With
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mb-4">
              Hands-on exposure / learning stage
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Tailwind CSS",
                "Prisma ORM",
                "Linux (basic to intermediate)",
                "CI/CD basics",
                "Nginx (intro-level)",
                "GraphQL (conceptual + small usage)",
                "Redis (basic caching understanding)",
                "Jest (basic testing)",
                "Figma (UI reference & handoff)",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 font-mono text-xs border border-border rounded hover:border-foreground/50 hover:bg-foreground/5 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;