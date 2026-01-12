import { motion } from "framer-motion";
import { Printer, FileQuestion, Clock, MessageSquare } from "lucide-react";

const problems = [
  {
    icon: Printer,
    title: "Reprinting menus",
    description: "Every price change means new prints, wasted paper, and wasted money.",
  },
  {
    icon: FileQuestion,
    title: "Outdated PDFs",
    description: "Customers find old menus online with wrong prices and items.",
  },
  {
    icon: MessageSquare,
    title: "Messy WhatsApp menus",
    description: "Sending menu photos through chat looks unprofessional.",
  },
  {
    icon: Clock,
    title: "Time wasted",
    description: "Staff spends time explaining menu changes instead of serving.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sound familiar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            These are the daily headaches restaurant owners face with traditional menus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
