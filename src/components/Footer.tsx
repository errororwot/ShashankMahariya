import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = 2025;

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display text-xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-muted-foreground">{"<"}</span>
            ERROR
            <span className="text-muted-foreground">{"/>"}</span>
          </motion.a>

          {/* Terminal style credit */}
          <div className="font-mono text-sm text-muted-foreground text-center">
            <p className="mb-1">Built with care by <span className="text-foreground">Shashank Mahariya</span></p>
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs text-muted-foreground/50">
            © {currentYear}. All rights reserved.
          </p>

          {/* Back to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 px-4 py-2 border border-border rounded font-mono text-xs text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="button"
          >
            ↑ Back to top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;