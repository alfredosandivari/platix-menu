import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

export function ReservationCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/tragosdeautor.png"
          alt="Reserva tu mesa"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
          Tu Mesa Te Espera
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Reserva ahora y disfruta de una experiencia gastronómica única en Alto Croacia
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 shadow-xl"
          >
            <a
              href="https://wa.me/56975311111?text=Hola%20quiero%20reservar%20en%20Alto%20Croacia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Reservar por WhatsApp
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-2xl border-2 border-foreground/20 backdrop-blur text-foreground hover:bg-foreground/10 text-base px-8 py-6"
          >
            <a href="tel:+56975311111">
              <Phone className="h-5 w-5 mr-2" />
              Llamar Ahora
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
