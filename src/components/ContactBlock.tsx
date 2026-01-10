import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactBlock() {
  return (
    <section id="contact" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Ubicación y Contacto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visítanos o contáctanos para cualquier consulta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="backdrop-glass rounded-2xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Dirección</h3>
                  <p className="text-muted-foreground">
                    Alto Croacia
                    <br />
                    Antofagasta, Chile
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-glass rounded-2xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Teléfono</h3>
                  <a
                    href="tel:+56975311111"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    +569 7531 1111
                  </a>
                </div>
              </div>
            </div>

            <div className="backdrop-glass rounded-2xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                  <a
                    href="mailto:reservas@altocroacia.cl"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    reservas@altocroacia.cl
                  </a>
                </div>
              </div>
            </div>

            <div className="backdrop-glass rounded-2xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Horarios</h3>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>Lunes a Miércoles: 18:00 - 02:00</p>
                    <p>Jueves a Sábado: 18:00 - 04:00</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a
                href="https://wa.me/56975311111?text=Hola%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Map */}
          <div className="backdrop-glass rounded-2xl overflow-hidden border border-border h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988!2d-70.4126564!3d-23.6779144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96afd5c6487d403f%3A0x3f20c6a42b00297f!2sAlto%20Croacia!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Alto Croacia"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
