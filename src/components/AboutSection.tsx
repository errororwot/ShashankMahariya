import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
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
              <span className="font-mono text-muted-foreground">01.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">About Me</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Text Content */}
            <motion.div
              className="md:col-span-3 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                I'm a curious and driven developer who enjoys turning ideas into real, working web experiences. 
                My journey into coding started with building simple websites, and over time it grew into exploring 
                full-stack development, problem-solving, and system logic.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I enjoy working at the point where design meets functionality — creating interfaces that look clean 
                and feel easy to use, while keeping the backend logic structured and efficient. I focus on writing 
                readable code, learning best practices, and improving my skills consistently with every project.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Currently, I'm sharpening my skills through academic projects, personal builds, and experimentation 
                with new tools and technologies. I'm especially interested in web development, automation, and 
                intelligent systems.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, I like exploring new tech concepts, improving existing projects, and learning 
                how real-world systems are designed and scaled.
              </p>

              {/* Tech Stack Preview */}
              <div className="pt-6">
                <p className="font-mono text-sm text-muted-foreground mb-4">
                  <span className="text-foreground/70">{">"}</span> Current technologies:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {["JavaScript & TypeScript", "HTML, CSS, React", "Node.js", "Python", "SQL (MySQL / PostgreSQL)", "Git & GitHub"].map((tech, index) => (
                    <motion.div
                      key={tech}
                      className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-foreground/50">▹</span>
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Profile Visual */}
            <motion.div
              className="md:col-span-2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative aspect-square">
                {/* Decorative frame */}
                <div className="absolute inset-4 border border-border rounded" />
                
                {/* Profile Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-card rounded overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--foreground)/0.03)_25%,hsl(var(--foreground)/0.03)_50%,transparent_50%,transparent_75%,hsl(var(--foreground)/0.03)_75%)] bg-[size:10px_10px]" />
                  
                  {/* Profile Image */}
                  <img 
                    src="/profileimage.jpg" 
                    alt="Shashank Mahariya" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Subtle overlay for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>

                {/* Hover effect border */}
                <motion.div
                  className="absolute -inset-2 border border-foreground/20 rounded opacity-0"
                  whileHover={{ opacity: 1, inset: -8 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Hands-on Development", value: "{ }" },
                  { label: "Academic & Personal Projects", value: "20+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 border border-border rounded bg-card/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="font-display text-2xl font-bold">{stat.value}</div>
                    <div className="font-mono text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;