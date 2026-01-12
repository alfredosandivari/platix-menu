import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import platixLogo from "@/assets/platix-logo.png";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-6 pb-20 md:pt-8 md:pb-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-background pointer-events-none" />
      
      <div className="container relative">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-16 md:mb-24"
        >
          <img 
            src={platixLogo} 
            alt="Platix" 
            className="h-8 md:h-10 w-auto"
          />
        </motion.header>

        {/* Hero Content */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              For restaurants, cafés & bars
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
          >
            Stop printing menus
            <br />
            <span className="text-primary">Go digital in minutes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Create your menu, share it with a QR code, and update prices anytime — no tech skills needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
            asChild
            variant="outline"
            size="lg"
          >
            <a
              href="https://demo.platix.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Demo
            </a>
          </Button>

            <span className="text-sm text-muted-foreground">
              No credit card required - Cancel anytime
            </span>
          </motion.div>
        </div>

        {/* Hero Visual - Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 md:mt-24 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Phone mockup */}
              <div className="w-64 bg-background rounded-3xl shadow-2xl p-2 border border-gray-200">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <div className="h-6 bg-gray-900 flex items-center justify-center">
                    <div className="w-20 h-4 bg-gray-800 rounded-full" />
                  </div>
                  <div className="bg-background p-4 min-h-[380px]">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">P</span>
                      </div>
                      <div className="text-sm font-semibold text-foreground">Café Delicious</div>
                    </div>
                    <div className="space-y-3">
                      {["Espresso", "Cappuccino", "Croissant"].map((item, i) => (
                        <div key={item} className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
                          <div className="w-10 h-10 bg-gray-200 rounded-md" />
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground">{item}</div>
                            <div className="text-xs text-muted-foreground">Fresh & tasty</div>
                          </div>
                          <div className="text-xs font-semibold text-primary">
                            ${(2.5 + i * 1.5).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code mockup */}
              <div className="text-center">
                <div className="w-36 h-36 bg-background rounded-xl shadow-lg border border-gray-200 p-4 mb-3">
                  <div className="w-full h-full bg-gray-900 rounded-lg grid grid-cols-6 gap-0.5 p-2">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm ${Math.random() > 0.4 ? 'bg-background' : 'bg-gray-900'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Scan to see menu</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
