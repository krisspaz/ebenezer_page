import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const EventsSection = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const events = [
    {
      id: 1,
      title: "Servicio de Oración",
      date: "Lunes", // Fixed: User confirmed Oración is Monday
      time: "8:00 AM - 9:30 AM",
      location: "Templo Principal",
      image: "/assets/images/oracion_service.jpg",
      category: t('events.categories.prayer'),
      color: "bg-teal-500",
      description: "Un tiempo especial de intercesión por las familias, la iglesia y nuestra nación."
    },
    {
      id: 2,
      title: "Servicio de Discipulado",
      date: "Martes", // Confirmed Tuesday (Doctrina)
      time: "7:00 PM - 9:00 PM",
      location: "Templo Principal",
      image: "/assets/images/discipulado_service.jpg",
      category: t('events.categories.service'),
      color: "bg-[#F4C95D]",
      description: "Profundizamos en el estudio de la Biblia en base a nuestra cobertura. Este es un tiempo para aprender doctrina y crecer en el conocimiento de Cristo bajo la enseñanza pastoral."
    },
    {
      id: 3,
      title: "Servicio de Familia",
      date: "Viernes", // Confirmed Friday
      time: "7:00 PM - 9:00 PM",
      location: "Templo Principal",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      category: t('events.categories.youth'),
      color: "bg-purple-500",
      description: "Un servicio lleno de gozo, diseñado para ti y tu familia. Disfrutamos de alabanzas poderosas y una palabra práctica que edifica el hogar y restaura relaciones."
    },
    {
      id: 4,
      title: "Servicios Dominicales",
      date: "Domingos",
      time: "8:00 AM y 10:30 AM",
      location: "Templo Principal",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2070&auto=format&fit=crop",
      category: t('events.categories.service'),
      color: "bg-[#F4C95D]",
      description: "Nuestra fiesta principal de la semana. Celebramos la resurrección de Cristo con adoración unida y la predicación del Evangelio. Contamos con dos horarios para servirte mejor: 8:00 AM (Primer servicio) y 10:30 AM (Segundo servicio)."
    },
  ];

  return (
    <section id="eventos" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4C95D]/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4C95D]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 tracking-tight">
              {t('events.title')}
            </h2>
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-12 h-1 bg-[#F4C95D] rounded-full" />
              <div className="w-2 h-1 bg-[#F4C95D]/30 rounded-full" />
            </div>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-light">
              {t('events.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-48 md:h-64 rounded-[1.8rem] overflow-hidden bg-white dark:bg-[#1e293b] border border-slate-100 dark:border-white/5 shadow-lg flex flex-col md:flex-row animate-pulse">
                <div className="w-full md:w-2/5 h-48 md:h-full bg-slate-200 dark:bg-slate-700/50" />
                <div className="flex-1 p-6 space-y-4">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded-lg w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/30 rounded w-1/2" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/30 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/30 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            events.map((event, index) => (
              <Dialog key={event.id}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative cursor-pointer"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F4C95D]/20 to-teal-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />

                    <div className="relative h-full bg-white dark:bg-[#1e293b] rounded-[1.8rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row h-full">

                        {/* Image Section */}
                        <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                          <div className="absolute inset-0 bg-[#0f172a]/20 group-hover:bg-[#0f172a]/0 transition-colors duration-500 z-10" />
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${event.color}`}>
                              {event.category}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-6 flex flex-col justify-center relative">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 font-heading group-hover:text-[#d4a33d] dark:group-hover:text-[#F4C95D] transition-colors">
                            {event.title}
                          </h3>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-4 h-4 text-[#d4a33d] dark:text-[#F4C95D] mt-1 shrink-0" />
                              <span className="text-sm text-slate-600 dark:text-gray-300 font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <Clock className="w-4 h-4 text-teal-600 dark:text-[#14b8a6] mt-1 shrink-0" />
                              <span className="text-sm text-slate-600 dark:text-gray-300">{event.time}</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="w-4 h-4 text-slate-400 dark:text-gray-500 mt-1 shrink-0" />
                              <span className="text-sm text-slate-600 dark:text-gray-300">{event.location}</span>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-[#d4a33d] dark:text-[#F4C95D] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 duration-300">
                              Ver Detalles
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-full hover:bg-[#F4C95D]/10 hover:text-[#d4a33d] dark:hover:text-[#F4C95D]"
                            >
                              <ArrowRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                      {event.title}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                      Detalles del servicio
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 space-y-4">
                    <div className="aspect-video w-full overflow-hidden rounded-xl">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#d4a33d]" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-500" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                      {event.description}
                    </p>

                    <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 italic bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
                      <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <p>Te recomendamos llegar 15 minutos antes para encontrar buen lugar y parquear con tranquilidad.</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
