import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/50 skew-x-12 transform origin-top-right pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
            <span className="text-accent">CONTÁCTANOS</span>
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Estamos aquí para servirte. No dudes en ponerte en contacto con nosotros para cualquier consulta o petición de oración.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-elegant transition-all duration-300 border border-border/50 group">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <MapPin className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Ubicación
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Cobán, Alta Verapaz, Guatemala
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-elegant transition-all duration-300 border border-border/50 group">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                  <Phone className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Teléfono / WhatsApp
                  </h3>
                  <p className="text-muted-foreground text-base">
                    +502 5040 4444
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-elegant transition-all duration-300 border border-border/50 group">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-wine/10 flex items-center justify-center flex-shrink-0 group-hover:bg-wine transition-colors duration-300">
                  <Mail className="w-7 h-7 text-wine group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Email
                  </h3>
                  <p className="text-muted-foreground text-base">
                    contacto@ebenezercoban.org
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-elegant transition-all duration-300 border border-border/50 group">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Clock className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    Horarios de Servicio
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    <span className="font-semibold text-foreground">Lunes:</span> Oración 8:00 AM - 10:00 AM<br />
                    <span className="font-semibold text-foreground">Martes:</span> 7:00 PM - 9:00 PM<br />
                    <span className="font-semibold text-foreground">Viernes:</span> 7:00 PM - 9:00 PM<br />
                    <span className="font-semibold text-foreground">Domingos:</span> 8:00 AM - 10:00 AM y 10:30 AM - 12:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-elegant border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none"></div>

            <h3 className="font-heading text-3xl font-bold text-primary mb-8">
              Envíanos un Mensaje
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Nombre</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full h-12 text-base bg-secondary/30 border-border/50 focus:border-accent focus:ring-accent/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Teléfono</label>
                  <Input
                    type="tel"
                    placeholder="Tu número de teléfono"
                    className="w-full h-12 text-base bg-secondary/30 border-border/50 focus:border-accent focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Correo Electrónico</label>
                <Input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full h-12 text-base bg-secondary/30 border-border/50 focus:border-accent focus:ring-accent/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Mensaje</label>
                <Textarea
                  placeholder="¿En qué podemos ayudarte?"
                  rows={5}
                  className="w-full text-base bg-secondary/30 border-border/50 focus:border-accent focus:ring-accent/20 transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 h-14 text-lg rounded-xl"
              >
                <Send className="mr-2 w-5 h-5" />
                ENVIAR MENSAJE
              </Button>
            </form>

            {/* Social Links in Form Area */}
            <div className="mt-8 pt-8 border-t border-border/50 flex justify-center gap-6">
              <a href="https://www.facebook.com/ebenezercoban?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1877F2] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/ebenezercoban_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E4405F] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@iglesiaebenezercoban" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#FF0000] transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="bg-white p-4 rounded-3xl shadow-elegant border border-border/50">
            <div className="aspect-[21/9] bg-muted rounded-2xl overflow-hidden relative group">
              {/* Placeholder for map - in a real app this would be an iframe */}
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 group-hover:bg-secondary/30 transition-colors">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <MapPin className="w-10 h-10 text-accent animate-bounce" />
                  </div>
                  <p className="text-primary font-heading text-2xl font-bold mb-2">
                    Nuestra Ubicación
                  </p>
                  <p className="text-muted-foreground text-lg">
                    Cobán, Alta Verapaz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
