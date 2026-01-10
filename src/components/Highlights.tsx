import { Wine, Utensils, Calendar, Sparkles, Music, Car } from "lucide-react";

const highlights = [
  {
    icon: Wine,
    title: "Mixología de Autor",
    description: "Cocteles únicos creados por nuestro equipo de bartenders expertos.",
  },
  {
    icon: Utensils,
    title: "Cocina Fusión",
    description: "Platos contemporáneos que combinan tradición e innovación.",
  },
  {
    icon: Sparkles,
    title: "Ambiente Premium",
    description: "Diseño exclusivo con iluminación y decoración cuidadosamente seleccionada.",
  },
];

export function Highlights() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Experiencia Alto Croacia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre todo lo que hace de Alto Croacia un destino único
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="backdrop-glass rounded-2xl p-8 border border-border hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
