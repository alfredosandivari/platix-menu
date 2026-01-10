import { Instagram, Facebook, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img
              src="https://res.cloudinary.com/daw2izgzu/image/upload/v1763339533/logo_bnyxu0.jpg"
              alt="Alto Croacia"
              className="h-12 w-auto rounded-lg mb-4"
              loading="lazy"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Bar & Restaurant de alta gama. Coctelería de autor, cocina contemporánea y una
              experiencia gastronómica única en la ciudad.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <a
                  href="/#menu-preview"
                  className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  Menú
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-muted-foreground hover:text-primary text-sm transition-smooth"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+56975311111" className="hover:text-primary transition-smooth">
                  +569 7531 1111
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservas@altocroacia.cl"
                  className="hover:text-primary transition-smooth"
                >
                  reservas@altocroacia.cl
                </a>
              </li>
              <li className="pt-2">
                <p className="font-medium text-foreground mb-1">Horarios:</p>
                <p>L-Mi: 18:00 - 02:00</p>
                <p>J-S: 18:00 - 04:00</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Alto Croacia. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/alto.croacia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-smooth group"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              </a>
              <a
                href="https://facebook.com/alto.croacia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-smooth group"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-smooth group"
                aria-label="Google Maps"
              >
                <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              </a>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-smooth">
              Política de Privacidad
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-smooth">
              Términos y Condiciones
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-smooth">
              Defensa del Consumidor
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
