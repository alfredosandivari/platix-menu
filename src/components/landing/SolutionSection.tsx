import { motion } from "framer-motion";
import { Check } from "lucide-react";

const solutions = [
  "One digital menu for all your items",
  "Accessible from any smartphone",
  "QR code ready to print or share",
  "Hide items when they’re unavailable",
  "Easy editor — no training needed",
  "Works in minutes, not days",
];

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              The solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platix makes it simple.
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to run a modern menu — nothing you don't.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-orange-50/50 rounded-2xl p-8 md:p-12"
          >
            <div className="grid gap-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg text-foreground font-medium">
                    {solution}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
