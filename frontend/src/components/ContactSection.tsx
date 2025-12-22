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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/6vbQac81vJtJoRAQ9";

const WAZE_URL =
  "https://ul.waze.com/ul?place=ChIJUbAS6jJBioURQ55mttRvVc8&ll=15.46686120%2C-90.37364490&navigate=yes";

const WHATSAPP_URL =
  "https://wa.me/50250404444?text=Hola%20quiero%20más%20información";

const CALL_URL = "tel:+50250404444";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#1e293b] dark:to-[#0f172a] text-slate-800 dark:text-white py-12 md:py-16 transition-colors duration-300"
    >
      <div className="container relative z-10 mx-auto px-4">

        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-white">
            {t('contact.title')}
          </h2>
          <div className="mx-auto my-4 md:my-5 h-1.5 w-20 md:w-24 rounded-full bg-[#d4a33d] dark:bg-[#F4C95D]" />
          <p className="mx-auto max-w-2xl text-base md:text-lg font-light text-slate-600 dark:text-gray-400 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* GRID */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 items-start">

          {/* INFORMACIÓN */}
          <div className="space-y-5 md:space-y-6">

            {/* UBICACIÓN */}
            <div className="rounded-2xl border border-[#d4a33d]/20 dark:border-[#F4C95D]/10 bg-white/80 dark:bg-[#0F172A]/80 p-6 md:p-7 shadow-lg hover:border-[#d4a33d]/40 dark:hover:border-[#F4C95D]/30 transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a33d]/15 dark:bg-[#F4C95D]/15 md:h-14 md:w-14">
                  <MapPin className="h-6 w-6 text-[#d4a33d] dark:text-[#F4C95D]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                    {t('contact.location.title')}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                    {t('contact.location.address')}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-200 dark:bg-white/10 text-xs md:text-sm text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition"
                      onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")}
                    >
                      {t('contact.location.googleMaps')}
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-200 dark:bg-white/10 text-xs md:text-sm text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition"
                      onClick={() => window.open(WAZE_URL, "_blank")}
                    >
                      {t('contact.location.waze')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* TELÉFONO */}
            <div className="rounded-2xl border border-teal-500/20 dark:border-[#14b8a6]/10 bg-white/80 dark:bg-[#0F172A]/80 p-6 md:p-7 shadow-lg hover:border-teal-500/40 dark:hover:border-[#14b8a6]/30 transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/15 dark:bg-[#14b8a6]/15 md:h-14 md:w-14">
                  <Phone className="h-6 w-6 text-teal-600 dark:text-[#14b8a6]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{t('contact.phone.title')}</h3>

                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-300">{t('contact.phone.subtitle')}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white text-xs md:text-sm hover:bg-slate-300 dark:hover:bg-white/20 transition"
                      onClick={() => window.open(CALL_URL)}
                    >
                      {t('contact.phone.call')}
                    </Button>

                    <Button
                      size="sm"
                      className="rounded-xl border border-[#d4a33d]/70 dark:border-[#F4C95D]/70 text-[#d4a33d] dark:text-[#F4C95D] text-xs md:text-sm hover:bg-[#d4a33d]/10 dark:hover:bg-[#F4C95D]/10 transition"
                      onClick={() => window.open(WHATSAPP_URL, "_blank")}
                    >
                      {t('contact.phone.whatsapp')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* HORARIOS */}
            <div className="rounded-2xl border border-[#d4a33d]/20 dark:border-[#F4C95D]/10 bg-white/80 dark:bg-[#0F172A]/80 p-6 md:p-7 shadow-lg hover:border-[#d4a33d]/40 dark:hover:border-[#F4C95D]/30 transition-all duration-300">
              <div className="flex gap-4 md:gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a33d]/15 dark:bg-[#F4C95D]/15 md:h-14 md:w-14">
                  <Clock className="h-6 w-6 text-[#d4a33d] dark:text-[#F4C95D]" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-lg md:text-xl font-bold text-slate-800 dark:text-white">{t('contact.schedule.title')}</h3>

                  <p className="text-sm md:text-base text-slate-600 dark:text-gray-200 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-white">{t('contact.schedule.tuesday')}:</span> 7:00 PM – 9:00 PM<br />
                    <span className="font-semibold text-slate-800 dark:text-white">{t('contact.schedule.friday')}:</span> 7:00 PM – 9:00 PM<br />
                    <span className="font-semibold text-slate-800 dark:text-white">{t('contact.schedule.sunday1')}:</span> 8:00 AM – 10:00 AM<br />
                    <span className="font-semibold text-slate-800 dark:text-white">{t('contact.schedule.sunday2')}:</span> 10:30 AM – 12:30 PM
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* FORMULARIO PREMIUM */}
          <div className="rounded-3xl border border-[#d4a33d]/20 dark:border-[#F4C95D]/10 bg-white/90 dark:bg-[#0F172A]/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="mb-2 text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              {t('contact.form.title')}
            </h3>
            <p className="mb-5 text-sm md:text-base text-slate-600 dark:text-gray-300">
              {t('contact.form.subtitle')}
            </p>

            <form
              className="space-y-5 md:space-y-6"
              action="mailto:iglesiaebenezercoban@gmail.com"
              method="POST"
            >
              <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm text-slate-600 dark:text-gray-300">{t('contact.form.nameLabel')}</label>
                  <Input
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    className="h-11 bg-slate-100 dark:bg-[#1e293b] border-slate-300 dark:border-[#14b8a6]/30 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 rounded-xl focus:border-teal-500 dark:focus:border-[#14b8a6]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm text-slate-600 dark:text-gray-300">{t('contact.form.phoneLabel')}</label>
                  <Input
                    required
                    type="tel"
                    placeholder={t('contact.form.phonePlaceholder')}
                    className="h-11 bg-slate-100 dark:bg-[#1e293b] border-slate-300 dark:border-[#14b8a6]/30 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 rounded-xl focus:border-teal-500 dark:focus:border-[#14b8a6]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm text-slate-600 dark:text-gray-300">{t('contact.form.messageLabel')}</label>
                <Textarea
                  required
                  rows={4}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="resize-none bg-slate-100 dark:bg-[#1e293b] border-slate-300 dark:border-[#14b8a6]/30 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 rounded-xl focus:border-teal-500 dark:focus:border-[#14b8a6]"
                />
              </div>

              <Button
                type="submit"
                className="mt-1 h-12 w-full rounded-xl bg-[#F4C95D] text-[#0f172a] text-sm md:text-base font-bold shadow-md hover:bg-[#e6b84d] transition-colors"
              >
                <Send className="mr-2 h-4 w-4" />
                {t('contact.form.submit')}
              </Button>
            </form>

            <div className="mt-6 border-t border-slate-200 dark:border-white/10 pt-5 flex items-center justify-center gap-6">
              <a href="https://www.facebook.com/ebenezercoban?locale=es_LA" target="_blank" className="text-slate-400 dark:text-gray-400 hover:text-teal-600 dark:hover:text-[#14b8a6] transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ebenezercoban_/" target="_blank" className="text-slate-400 dark:text-gray-400 hover:text-[#d4a33d] dark:hover:text-[#F4C95D] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@iglesiaebenezercoban" target="_blank" className="text-slate-400 dark:text-gray-400 hover:text-[#d4a33d] dark:hover:text-[#F4C95D] transition-colors">
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
        rel="noopener noreferrer"
        className="
          fixed bottom-4 left-4 z-50
          bg-[#25D366] hover:bg-[#20bd5a] text-white
          p-4 rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-300 hover:scale-110
          animate-in fade-in zoom-in slide-in-from-bottom-4
        "
        aria-label={t('contact.whatsappFab')}
      ><MessageCircle className="h-6 w-6" />
      </a>

    </section >
  );
};

export default ContactSection;
