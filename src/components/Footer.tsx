import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-glow transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-primary font-heading font-bold text-2xl">E</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white tracking-wide leading-none">IGLESIA DE CRISTO</h3>
                <p className="text-accent text-sm font-bold tracking-widest mt-1">EBENEZER COBÁN</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed font-light max-w-sm">
              Una comunidad de fe dedicada a compartir el amor de Cristo y servir a nuestra ciudad con excelencia, pasión y compromiso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-8 text-white tracking-wide flex items-center">
              <span className="w-8 h-0.5 bg-accent mr-3"></span>
              ENLACES RÁPIDOS
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Sobre Nosotros", href: "#nosotros" },
                { label: "Eventos", href: "#eventos" },
                { label: "Transmisión en Vivo", href: "#transmision" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-8 text-white tracking-wide flex items-center">
              <span className="w-8 h-0.5 bg-accent mr-3"></span>
              CONTACTO
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  <MapPin className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors mt-2">Cobán, Alta Verapaz, Guatemala</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  <Phone className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors mt-2">+502 5040 4444</span>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  <Mail className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors mt-2">contacto@ebenezercoban.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-4">
            {[
              { icon: Facebook, href: "https://www.facebook.com/ebenezercoban?locale=es_LA", label: "Facebook" },
              { icon: Instagram, href: "https://www.instagram.com/ebenezercoban_/", label: "Instagram" },
              { icon: Youtube, href: "https://www.youtube.com/@iglesiaebenezercoban", label: "YouTube" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary hover:scale-110 transition-all duration-300 text-white"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-white/50 text-sm font-light">
            © {currentYear} Iglesia de Cristo Ebenezer Cobán. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
