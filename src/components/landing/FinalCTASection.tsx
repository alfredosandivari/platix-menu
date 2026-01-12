import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import platixIcon from "@/assets/platix-icon.png";

const FinalCTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <img 
            src={platixIcon} 
            alt="Platix" 
            className="w-16 h-16 mx-auto mb-8 opacity-90"
          />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stop printing menus.
            <br />
            <span className="text-primary">Go digital today.</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-10">
            Join smart restaurant owners who already made the switch.
          </p>
          
          <Button variant="hero" size="lg">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-sm text-gray-400 mt-6">
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
