import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

const achievements = [
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. (Forage)",
    date: "2024",
    type: "Simulation",
    description: "Project setup, REST API integration, Kafka integration",
    link: null,
  },
  {
    title: "2nd Position (Silver Medal)",
    issuer: "St. Andrews Institute of Technology & Management",
    date: "2024",
    type: "Hackathon",
    description: "Recognized for innovation, problem solving, and teamwork",
    link: null,
  },
  {
    title: "SATHACK'25 Participation",
    issuer: "Thapar Institute of Engineering & Technology",
    date: "2025",
    type: "Hackathon",
    description: "Team-based problem solving under time constraints",
    link: null,
  },
  {
    title: "TechJam 2.0 Hackathon",
    issuer: "Microsoft Sovereign Office, Noida",
    date: "2024",
    type: "Hackathon",
    description: "Team Pseudocoders - Rapid prototyping and technical solutions",
    link: null,
  },
  {
    title: "IBM SkillsBuild Program (4 Weeks)",
    issuer: "Agentic AI: From Learner to Builder",
    date: "2024",
    type: "Certification",
    description: "AI fundamentals, Agentic AI concepts, AI agent workflows",
    link: null,
  },
  {
    title: "Generative AI Mastermind Certificate",
    issuer: "Outskill",
    date: "2024",
    type: "Certification",
    description: "Generative AI concepts, Prompt Engineering, AI-driven creativity",
    link: null,
  },
  {
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "2024",
    type: "Workshop",
    description: "Practical use of AI for analysis, coding, and productivity",
    link: null,
  },
  {
    title: "3rd Position – Problem Solving",
    issuer: "St. Andrews Institute of Technology & Management",
    date: "2024",
    type: "Achievement",
    description: "Competitive problem-solving performance",
    link: null,
  },
  {
    title: "Inovizz Project Competition",
    issuer: "St. Andrews Institute of Technology & Management",
    date: "2024",
    type: "Competition",
    description: "Presented technical project solutions",
    link: null,
  },
  {
    title: "Software Engineering",
    issuer: "Infosys",
    date: "2024",
    type: "Certification",
    description: "Software Engineering fundamentals",
    link: null,
  },
  {
    title: "Programming using C++",
    issuer: "Infosys",
    date: "2024",
    type: "Certification",
    description: "C++ programming concepts",
    link: null,
  },
  {
    title: "Web Design",
    issuer: "Infosys",
    date: "2024",
    type: "Certification",
    description: "Web design principles",
    link: null,
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "Simplilearn",
    date: "2023",
    type: "Certification",
    description: "Basics of Data Structures & Algorithms",
    link: null,
  },
  {
    title: "Web Development Training (Node.js)",
    issuer: "Simplilearn",
    date: "2023",
    type: "Certification",
    description: "Node.js fundamentals",
    link: null,
  },
  {
    title: "30-Hour Backend Training",
    issuer: "St. Andrews Institute with NS3EDU",
    date: "2023",
    type: "Training",
    description: "Backend fundamentals, API integration, JavaScript concepts",
    link: null,
  },
  {
    title: "40-Hour Web Development Training",
    issuer: "St. Andrews Institute with Kreativan Technologies",
    date: "2023",
    type: "Training",
    description: "HTML, CSS, JavaScript, Responsive web development",
    link: null,
  },
  {
    title: "HTML & CSS Certification",
    issuer: "St. Andrews Institute × Coding Blocks",
    date: "2023",
    type: "Certification",
    description: "Frontend fundamentals, Responsive layouts",
    link: null,
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-32 relative" ref={ref}>
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
              <span className="font-mono text-muted-foreground">06.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold flex items-center gap-3">
                <span>🏆</span> Achievements & Certifications
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}"</span> Recognition, learning & hands-on experience
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="group p-6 border border-border rounded bg-card/30 backdrop-blur-sm hover:border-foreground/30 hover:bg-card/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 border border-border rounded bg-muted/50">
                    <Award size={20} className="text-muted-foreground" />
                  </div>
                  {achievement.link && (
                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                      data-cursor="link"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>

                {/* Type badge */}
                <span className="inline-block px-2 py-0.5 font-mono text-xs border border-border rounded mb-3">
                  {achievement.type}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
                  {achievement.title}
                </h3>

                {/* Details */}
                <p className="font-mono text-sm text-muted-foreground mb-1">
                  {achievement.issuer}
                </p>
                {(achievement as any).description && (
                  <p className="font-mono text-xs text-muted-foreground/70 mb-2 line-clamp-2">
                    {(achievement as any).description}
                  </p>
                )}
                <p className="font-mono text-xs text-muted-foreground/70">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;