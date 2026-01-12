import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Unlimited menu items",
  "Custom QR code",
  "Upload your logo",
  "Unlimited updates",
  "Mobile-friendly design",
  "Cancel anytime"
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, affordable pricing.
          </h2>
          <p className="text-lg text-muted-foreground">
            One plan. Everything included. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-background rounded-2xl border-2 border-primary shadow-xl overflow-hidden">
            <div className="p-8 text-center border-b border-border">
              <div className="text-sm font-medium text-primary mb-2">Monthly</div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold text-foreground">$19</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Billed monthly. No contracts.
              </p>
              <p className="text-sm text-muted-foreground">
                Perfect for restaurants of any size
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-6 text-sm text-gray-500 italic text-center">
                Less than the cost of printing menus once.
              </p>
              <Button variant="hero" size="lg" className="w-full">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                14-day free trial • No credit card required • Cancel Anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
