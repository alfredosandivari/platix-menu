import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Owner, The Corner Café",
    content: "We stopped printing menus months ago. Platix saves us time and money every week.",
  },
  {
    name: "James Chen",
    role: "Manager, Sakura Sushi Bar",
    content: "Our customers love scanning the QR code. It feels modern and professional.",
  },
  {
    name: "Elena Rodriguez",
    role: "Owner, Casa Bella",
    content: "I updated our prices in 2 minutes. No designer, no printer, no waiting.",
  },
];

const TrustSection = () => {
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
            Trusted by businesses
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perfect for cafés, restaurants & bars.
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of food businesses already using Platix.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary rounded-xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary/20 mb-3" />
              
              <p className="text-foreground mb-6">
                "{testimonial.content}"
              </p>
              
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
