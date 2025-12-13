import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Eye } from "lucide-react";

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-32 relative" ref={ref}>
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
              <span className="font-mono text-muted-foreground">07.</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Resume</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground/70">{">"}</span> Get my detailed resume
            </p>
          </motion.div>

          {/* Resume Card */}
          <motion.div
            className="relative p-8 md:p-12 border border-border rounded bg-card/30 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-foreground/5 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              {/* Document icon */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="inline-flex p-4 border border-border rounded bg-muted/50">
                  <div className="font-mono text-4xl text-muted-foreground">📄</div>
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold mb-4">
                Shashank Mahariya – Resume.pdf
              </h3>
              <p className="text-muted-foreground mb-2">
                Aspiring Software Developer with hands-on experience in full-stack web development, AI tools, and problem-solving projects.
              </p>
              <p className="font-mono text-sm text-muted-foreground mb-8">
                Last updated: 2025 • PDF
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/resume/shashank_mahariya_resume.pdf"
                  download="shashank_mahariya_resume.pdf"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-sm font-medium hover:bg-foreground/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="button"
                >
                  <Download size={18} />
                  <span>DOWNLOAD RESUME</span>
                </motion.a>

                <motion.a
                  href="/resume/shashank_mahariya_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-foreground/30 font-mono text-sm font-medium hover:border-foreground hover:bg-foreground/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="button"
                >
                  <Eye size={18} />
                  <span>PREVIEW</span>
                </motion.a>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-foreground/20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-foreground/20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-foreground/20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-foreground/20" />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { label: "Pages", value: "1–2" },
              { label: "Projects", value: "10+" },
              { label: "Skills", value: "20+" },
              { label: "Availability", value: "Open" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="p-4 border border-border rounded bg-card/30 text-center"
              >
                <div className="font-display text-xl font-bold">{stat.value}</div>
                <div className="font-mono text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;