import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Wine, Music, Sparkles } from "lucide-react";
import heroTerraceNight from "@/assets/hero-terrace-night.jpg";
import heroCocktails from "@/assets/hero-cocktails.jpg";
import heroInteriorBar from "@/assets/hero-interior-bar.jpg";
import heroCuisine from "@/assets/hero-cuisine.jpg";

const heroImages = [
  heroCocktails,
  heroCuisine,
  heroTerraceNight,
  heroInteriorBar,
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images with Fade */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Alto Croacia ambiente ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-fade-in">

            {/* Title */}
            <h1
              className="font-logo text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.25em] uppercase"
            >
              ALTO CROACIA
            </h1>
            <h2 
              className="text-2xl my-8"
            >
              Bar & Restaurant
            </h2>
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl text-white">
              Coctelería de autor, cocina contemporánea y una terraza vibrante en el corazón de la ciudad.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-smooth"
              >
                <a
                  href="https://wa.me/56975311111?text=Hola%20quiero%20reservar%20en%20Alto%20Croacia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Reservar Mesa
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-2xl border-2 border-foreground/20 backdrop-blur text-foreground hover:bg-foreground/10 text-base px-8 py-6"
              >
                <Link to="/menu">Ver Menú</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
