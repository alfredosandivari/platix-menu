import { motion } from "framer-motion";
import { 
  Image, 
  Tag, 
  Palette, 
  Globe, 
  Smartphone, 
  Layers 
} from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Product images",
    description: "Show appetizing photos of your dishes.",
  },
  {
    icon: Tag,
    title: "Name, price & description",
    description: "All the details your customers need.",
  },
  {
    icon: Layers,
    title: "Categories",
    description: "Organize items into sections like drinks, mains, desserts.",
  },
  {
    icon: Palette,
    title: "Your logo & colors",
    description: "Match your restaurant's brand identity.",
  },
  {
    icon: Globe,
    title: "Custom domain",
    description: "Use your own URL like menu.yourrestaurant.com",
  },
  {
    icon: Smartphone,
    title: "Mobile-first design",
    description: "Looks great on any phone or tablet.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need.
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple features that make a big difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 text-accent-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
