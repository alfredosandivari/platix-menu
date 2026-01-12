import { motion } from "framer-motion";
import { FileEdit, QrCode, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    number: "1",
    title: "Create your menu",
    description: "Add your products, prices, and categories in our simple editor.",
  },
  {
    icon: QrCode,
    number: "2",
    title: "Share your QR code",
    description: "Print it, put it on tables, or share it anywhere online.",
  },
  {
    icon: RefreshCw,
    number: "3",
    title: "Update anytime",
    description: "Change prices, hide items, or update your menu instantly. No reprinting needed.",
  },
];

const HowItWorksSection = () => {
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
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three simple steps.
          </h2>
          <p className="text-lg text-muted-foreground">
            Get your digital menu running in under 10 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-6 shadow-orange">
                <step.icon className="w-8 h-8 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary text-primary font-bold text-sm flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
