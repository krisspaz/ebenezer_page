import {
  MapPin,
  Phone,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/6vbQac81vJtJoRAQ9";

const WAZE_URL =
  "https://ul.waze.com/ul?place=ChIJUbAS6jJBioURQ55mttRvVc8&ll=15.46686120%2C-90.37364490&navigate=yes";

const WHATSAPP_URL =
  "https://wa.me/50250404444?text=Hola%20quiero%20más%20información";

const CALL_URL = "tel:+50250404444";

const ContactSection = () => {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-white text-white py-12 md:py-16"
    >
      <div className="container relative z-10 mx-auto px-4">

        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A]">
            CONTÁCTANOS
          </h2>
          <div className="mx-auto my-4 md:my-5 h-1.5 w-20 md:w-24 rounded-full bg-[#F4C95D]" />
          <p className="mx-auto max-w-2xl text-base md:text-lg font-light text-gray-600 leading-relaxed">
            Estamos aquí para servirte. Si necesitas información, oración o deseas asistir a una actividad, estamos para ayudarte.
          </p>
        </div>

        {/* GRID */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 items-start">

          {/* INFORMACIÓN */}
          <div className="space-y-5 md:space-y-6">

            {/* UBICACIÓN */}
            <div className="rounded-2xl border border-black/10 bg-[#0F172A] p-6 md:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C95D]/15 md:h-14 md:w-14">
                  <MapPin className="h-6 w-6 text-[#F4C95D]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Ubicación
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    1a Avenida 5-48, Zona 2<br />
                    Cobán, Alta Verapaz, Guatemala
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-white/10 text-xs md:text-sm text-white hover:bg-white/20 transition"
                      onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
                    >
                      Google Maps
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-white/10 text-xs md:text-sm text-white hover:bg-white/20 transition"
                      onClick={() => window.open(WAZE_URL, "_blank")}
                    >
                      Waze
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* TELÉFONO */}
            <div className="rounded-2xl border border-black/10 bg-[#0F172A] p-6 md:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/15 md:h-14 md:w-14">
                  <Phone className="h-6 w-6 text-blue-200" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-white">Teléfono y WhatsApp</h3>

                  <p className="text-sm md:text-base text-gray-300">Contáctanos directamente.</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-white/10 text-white text-xs md:text-sm hover:bg-white/20 transition"
                      onClick={() => window.open(CALL_URL)}
                    >
                      Llamar
                    </Button>

                    <Button
                      size="sm"
                      className="rounded-xl border border-[#F4C95D]/70 text-[#F4C95D] text-xs md:text-sm hover:bg-[#F4C95D]/10 transition"
                      onClick={() => window.open(WHATSAPP_URL, "_blank")}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* HORARIOS */}
            <div className="rounded-2xl border border-black/10 bg-[#0F172A] p-6 md:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.12)] transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C95D]/15 md:h-14 md:w-14">
                  <Clock className="h-6 w-6 text-[#F4C95D]" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg md:text-xl font-bold text-white">Horarios de Servicio</h3>

                  <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                    <span className="font-semibold text-white">Martes:</span> 7:00 PM – 9:00 PM<br />
                    <span className="font-semibold text-white">Viernes:</span> 7:00 PM – 9:00 PM<br />
                    <span className="font-semibold text-white">Domingo – Primer servicio:</span> 8:00 AM – 10:00 AM<br />
                    <span className="font-semibold text-white">Domingo – Segundo servicio:</span> 10:30 AM – 12:30 PM
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* FORMULARIO PREMIUM */}
          <div className="rounded-3xl border border-black/10 bg-[#0F172A] p-6 md:p-8 shadow-[0_6px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
            <h3 className="mb-2 text-2xl md:text-3xl font-bold text-white tracking-tight">
              Envíanos un Mensaje
            </h3>
            <p className="mb-5 text-sm md:text-base text-gray-300">
              Llena el formulario y te responderemos lo antes posible.
            </p>

            <form
              className="space-y-5 md:space-y-6"
              action="mailto:iglesiaebenezercoban@gmail.com"
              method="POST"
            >
              <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm text-gray-300">Nombre</label>
                  <Input
                    required
                    placeholder="Tu nombre"
                    className="h-11 bg-white/10 border-white/20 text-sm text-white placeholder:text-gray-400 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm text-gray-300">Teléfono</label>
                  <Input
                    required
                    type="tel"
                    placeholder="Número de contacto"
                    className="h-11 bg-white/10 border-white/20 text-sm text-white placeholder:text-gray-400 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm text-gray-300">Mensaje</label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Escribe tu mensaje…"
                  className="resize-none bg-white/10 border-white/20 text-sm text-white placeholder:text-gray-400 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="mt-1 h-12 w-full rounded-xl bg-[#F4C95D] text-black text-sm md:text-base font-bold shadow-md hover:bg-[#e6b650]"
              >
                <Send className="mr-2 h-4 w-4" />
                ENVIAR
              </Button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5 flex items-center justify-center gap-6">
              <a href="https://www.facebook.com/ebenezercoban?locale=es_LA" target="_blank" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ebenezercoban_/" target="_blank" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@iglesiaebenezercoban" target="_blank" className="text-gray-300 hover:text-white">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* BOTÓN WHATSAPP PREMIUM */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        className="
          fixed bottom-4 right-4 z-50
          flex h-12 w-12 items-center justify-center
          rounded-full bg-[#F4C95D] text-black shadow-xl
          transition-transform duration-200 hover:scale-110
          md:bottom-6 md:right-6
        "
      >
        <MessageCircle className="h-6 w-6" />
      </a>

    </section>
  );
};

export default ContactSection;
