import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Gallery } from "@/components/Gallery";
import { MenuPreview } from "@/components/MenuPreview";
import { Testimonials } from "@/components/Testimonials";
import { ReservationCTA } from "@/components/ReservationCTA";
import { ContactBlock } from "@/components/ContactBlock";
import { Footer } from "@/components/Footer";
import { AnimatedTestimonials } from "@/components/AnimatedTestimonials";
import { SecondaryGallery } from "@/components/SecondaryGallery";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Alto Croacia - Bar & Restaurant | Coctelería de Autor y Cocina Contemporánea";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <AnimatedTestimonials
          testimonials={[
            {
              name: "Carta Gorumet",
              designation: "Comida internacional 5 estrellas",
              src: "/images/sushi.png",
              quote: "Sushi del día, vibrante y delicado. Una explosión de color y sabor en cada bocado.",
            },
            {
              name: "Tragos de Autor",
              designation: "La barra más extensa de sudamerica",
              src: "/images/tragosdeautor.png",
              quote: "Cocteles de autor llenos de color, equilibrio y creatividad. Cada sorbo una experiencia.",
            },
            {
              name: "El mejor ambiente",
              designation: "Una terraza elegante y con la mejor vista",
              src: "/images/people.png",
              quote: "Ambiente vibrante y acogedor, perfecto para compartir, disfrutar y vivir momentos memorables.",
            },
          ]}
        />
        <Highlights />
        <Gallery />
        <MenuPreview />
        <SecondaryGallery />
        <ReservationCTA />
        <ContactBlock />
      </main>
      <Footer />
    </div>
  );
}
