import platixLogo from "@/assets/platix-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img 
            src={platixLogo} 
            alt="Platix" 
            className="h-7 w-auto opacity-70"
          />
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Platix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
