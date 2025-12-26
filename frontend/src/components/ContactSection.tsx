import {
  MapPin,
  Phone,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Mail
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/6vbQac81vJtJoRAQ9";
const WAZE_URL = "https://ul.waze.com/ul?place=ChIJUbAS6jJBioURQ55mttRvVc8&ll=15.46686120%2C-90.37364490&navigate=yes";
const WHATSAPP_URL = "https://wa.me/50250404444?text=Hola%20quiero%20más%20información";
const CALL_URL = "tel:+50250404444";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contacto" className="relative py-20 overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">

      {/* Background Decor Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4C95D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-800 dark:text-white mb-6">
              {t('contact.title')}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#F4C95D] to-[#d4a33d] mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600 dark:text-gray-400 font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid gap-6">

              {/* Location Card */}
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 hover:border-[#F4C95D]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F4C95D]/10 rounded-xl group-hover:bg-[#F4C95D]/20 transition-colors">
                    <MapPin className="w-6 h-6 text-[#d4a33d] dark:text-[#F4C95D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{t('contact.location.title')}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 whitespace-pre-line">
                      {t('contact.location.address')}
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={() => window.open(GOOGLE_MAPS_URL, "_blank")} className="text-xs">
                        Google Maps
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(WAZE_URL, "_blank")} className="text-xs">
                        Waze
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone & Email Card */}
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 hover:border-[#F4C95D]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500/10 rounded-xl group-hover:bg-teal-500/20 transition-colors">
                    <Phone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{t('contact.phone.title')}</h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-4">
                      {t('contact.phone.subtitle')}
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={() => window.open(CALL_URL)} className="text-xs">
                        {t('contact.phone.call')}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(WHATSAPP_URL, "_blank")} className="text-xs border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Card */}
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 hover:border-[#F4C95D]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                    <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{t('contact.schedule.title')}</h3>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800 dark:text-white">{t('contact.schedule.tuesday')}:</span>
                        <span>7:00 PM – 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800 dark:text-white">{t('contact.schedule.friday')}:</span>
                        <span>7:00 PM – 9:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800 dark:text-white">{t('contact.schedule.sunday1')}:</span>
                        <span>8:00 AM – 10:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800 dark:text-white">{t('contact.schedule.sunday2')}:</span>
                        <span>10:30 AM – 12:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start gap-6 pt-4">
              <a href="https://www.facebook.com/ebenezercoban?locale=es_LA" target="_blank" className="p-3 bg-white dark:bg-[#1e293b] rounded-full shadow-md hover:scale-110 transition-transform text-blue-600 dark:text-blue-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/ebenezercoban_/" target="_blank" className="p-3 bg-white dark:bg-[#1e293b] rounded-full shadow-md hover:scale-110 transition-transform text-pink-600 dark:text-pink-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@iglesiaebenezercoban" target="_blank" className="p-3 bg-white dark:bg-[#1e293b] rounded-full shadow-md hover:scale-110 transition-transform text-red-600 dark:text-red-500">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4C95D]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                {t('contact.form.title')}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8">
                {t('contact.form.subtitle')}
              </p>

              <form action="mailto:iglesiaebenezercoban@gmail.com" method="POST" className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    {t('contact.form.nameLabel')}
                  </label>
                  <Input
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                    className="h-12 bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-slate-700 focus:border-[#F4C95D] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    {t('contact.form.phoneLabel')}
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder={t('contact.form.phonePlaceholder')}
                    className="h-12 bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-slate-700 focus:border-[#F4C95D] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    {t('contact.form.messageLabel')}
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="resize-none bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-slate-700 focus:border-[#F4C95D] rounded-xl"
                  />
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-[#F4C95D] to-[#d4a33d] hover:brightness-110 text-slate-900 font-bold rounded-xl shadow-lg shadow-[#F4C95D]/20 transition-all">
                  <Send className="w-4 h-4 mr-2" />
                  {t('contact.form.submit')}
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:shadow-[#25D366]/40 transition-shadow"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>

    </section>
  );
};

export default ContactSection;
