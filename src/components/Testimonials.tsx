import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Cliente frecuente",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    content:
      "La mejor experiencia gastronómica de la ciudad. Los cocteles de autor son excepcionales y el ambiente es perfecto para una noche especial.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Empresario",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    content:
      "Hemos celebrado varios eventos corporativos en Alto Croacia. El servicio es impecable y la comida siempre supera nuestras expectativas.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Food Blogger",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    content:
      "Un lugar que combina perfectamente cocina de calidad con mixología creativa. La terraza es simplemente espectacular. ¡Altamente recomendado!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiencias reales de quienes nos visitaron
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="backdrop-glass rounded-2xl p-8 border border-border hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full mr-4 bg-secondary"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-base font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
