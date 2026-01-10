import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Galería", href: "/#gallery" },
  { name: "Menú", href: "/#menu-preview" },
  { name: "Contacto", href: "/#contact" },
];

export function Navbar() {
  const [activeNav, setActiveNav] = useState<string>("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-glass border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <img
              src="https://res.cloudinary.com/daw2izgzu/image/upload/v1763339533/logo_bnyxu0.jpg"
              alt="Alto Croacia"
              className="h-12 w-auto rounded-lg"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isSectionLink = item.href.startsWith("/#");

              if (isSectionLink) {
                const isActive = activeNav === item.href;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                      isActive
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = item.href.split("#")[1];
                      const target = document.getElementById(targetId);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                      setActiveNav(item.href);
                    }}
                  >
                    {item.name}
                  </a>
                );
              }

              // Inicio (o cualquier ruta sin #)
              const isActive = activeNav === item.href;

              return (
                <button
                  key={item.name}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-smooth ${
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setActiveNav(item.href);
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-2xl border-border hover:bg-secondary"
            >
              <Link to="/menu">Ver Menú</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a
                href="https://wa.me/56975311111?text=Hola%20quiero%20reservar%20en%20Alto%20Croacia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4 mr-2" />
                Reservar
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-foreground hover:bg-secondary transition-smooth"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-glass border-t border-border animate-fade-in">
          <div className="px-4 py-6 space-y-3">
          {navigation.map((item) => {
            const isSectionLink = item.href.startsWith("/#");

            if (isSectionLink) {
              const isActive = activeNav === item.href;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-smooth ${
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.href.split("#")[1];
                    const target = document.getElementById(targetId);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    setActiveNav(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              );
            }

            // Inicio en mobile
            const isActive = activeNav === item.href;

            return (
              <button
                key={item.name}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-smooth ${
                  isActive
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveNav(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
              </button>
            );
          })}
            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full rounded-2xl border-border hover:bg-secondary"
                asChild
              >
                <Link to="/menu">Ver Menú</Link>
              </Button>
              <Button
                className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a
                  href="https://wa.me/56975311111?text=Hola%20quiero%20reservar%20en%20Alto%20Croacia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Reservar Mesa
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
