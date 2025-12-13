import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 0,
    title: "Rider Saathi – Smart Ride Companion Platform",
    description:
      "A smart ride-companion platform designed to help riders and travelers find trusted travel partners, plan shared journeys, and travel more safely and affordably. Rider Saathi focuses on connecting people heading in the same direction, reducing solo travel risks, lowering costs, and building a sense of community among riders through a simple and user-friendly interface.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Database", "Ride Sharing Concept"],
    github: "#",
    featured: true,
  },
  {
    id: 10,
    title: "Krishi Sahayak – AI-Powered Farmer Support Platform",
    description:
      "An agriculture-focused support platform designed to assist farmers with timely information, smart recommendations, and digital guidance. Krishi Sahayak simplifies farming decisions by providing crop-related insights, basic advisory support, and easy access to helpful resources. Built for scalability to add features like weather alerts, market insights, and multilingual support.",
    tech: ["HTML", "CSS", "JavaScript", "AI Concepts", "AgriTech", "Farmer Support"],
    github: "#",
    featured: true,
  },
  {
    id: 1,
    title: "ERICA – AI Voice Assistant",
    description:
      "A desktop-based AI assistant designed to perform voice-controlled tasks, automation, and real-time responses with a user-friendly GUI. Features voice input/output with microphone toggle, executes system commands, web searches, and automation tasks with modular architecture for easy feature expansion.",
    tech: ["Python", "PyQt5", "Speech APIs", "Automation Libraries"],
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Multi-Game Web Platform",
    description:
      "A single-page web platform where users can register, select multiple games, and have their scores stored separately for each game. Includes user registration system, multiple games in one interface, score tracking stored in database, and simple clean UI.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description:
      "A responsive developer portfolio showcasing skills, projects, and contact information with a modern dark-themed design. Features clean UI with dark aesthetic, smooth navigation & animations, and structured project and skills sections.",
    tech: ["HTML", "CSS", "JavaScript", "Tailwind / Custom CSS"],
    github: "#",
    featured: true,
  },
  {
    id: 7,
    title: "Discord Server & Bot Setup",
    description:
      "Designed and managed a Discord server with custom roles and moderation concepts; currently working on advanced bot features.",
    tech: ["Discord", "Bot Logic", "Automation Concepts"],
    github: "#",
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  if (project.featured) {
    return (
      <motion.div
        ref={ref}
        className="relative group"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="project"
      >
        <div className="relative p-8 border border-border rounded bg-card/30 backdrop-blur-sm overflow-hidden">
          {/* Background glow on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent"
            initial={{ y: "-100%" }}
            animate={{ y: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            {/* Project header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="font-mono text-xs text-muted-foreground mb-2 block flex items-center gap-2">
                  <span>🌟</span> Featured Project
                </span>
                <h3 className="font-display text-2xl font-bold group-hover:text-foreground transition-colors">
                  {project.title}
                </h3>
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="link"
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="link"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 font-mono text-xs text-muted-foreground border border-border rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-foreground/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-foreground/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-foreground/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-foreground/30" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="relative group p-6 border border-border rounded bg-card/30 hover:bg-card/50 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
      data-cursor="project"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="font-mono text-2xl text-muted-foreground/50">{"{ }"}</div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              data-cursor="link"
            >
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              data-cursor="link"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="font-mono text-xs text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-muted-foreground">03.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Projects</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}"</span> Some things I've actually built & worked on
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="font-display text-xl font-bold mb-8 text-center">Personal Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;