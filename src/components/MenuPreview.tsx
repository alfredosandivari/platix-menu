import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import menuData from "@/data/menu.json";
import { ArrowRight } from "lucide-react";

export function MenuPreview() {
  const popularItems = menuData.items.filter((item) => item.popular).slice(0, 6);

  return (
    <section id="menu-preview" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Destacados del Menú
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de nuestros platos y cocteles más populares
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularItems.map((item, index) => (
            <div
              key={item.id}
              className="backdrop-glass rounded-2xl overflow-hidden border border-border hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
                      {item.name}
                    </h3>
                    <div className="flex gap-1.5 mb-2">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2 rounded-full">
                    ${(item.price / 100).toFixed(0)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            asChild
            className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <Link to="/menu">
              Ver Menú Completo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
