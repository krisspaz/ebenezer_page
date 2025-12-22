import { useRef } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const TiltCard = ({ event }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { t } = useTranslation();

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full bg-white dark:bg-[#1e293b] rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-[#F4C95D]/10 group cursor-pointer hover:border-[#d4a33d]/30 dark:hover:border-[#F4C95D]/30 transition-all duration-300"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative h-48 overflow-hidden"
      >
        <div className="absolute top-4 left-4 bg-[#F4C95D] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
          {event.category}
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
          {/* Gradient overlay for text contrast */}
        </div>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="p-6"
      >
        <h3 className="text-xl font-heading font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">
          {event.title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-slate-600 dark:text-gray-300 text-sm">
            <Calendar className="w-4 h-4 mr-3 text-[#d4a33d] dark:text-[#F4C95D]" />
            {event.date}
          </div>
          <div className="flex items-center text-slate-600 dark:text-gray-300 text-sm">
            <Clock className="w-4 h-4 mr-3 text-teal-600 dark:text-[#14b8a6]" />
            {event.time}
          </div>
          <div className="flex items-center text-slate-600 dark:text-gray-300 text-sm">
            <MapPin className="w-4 h-4 mr-3 text-[#d4a33d] dark:text-[#F4C95D]" />
            {event.location}
          </div>
        </div>

        <Button className="w-full bg-[#F4C95D] hover:bg-[#e6b84d] text-[#0f172a] font-bold transition-colors">
          {t('events.moreInfo')}
        </Button>
      </div>
    </motion.div>
  );
};

const EventsSection = () => {
  const { t } = useTranslation();

  const events = [
    {
      id: 1,
      title: "Servicio de Oración",
      date: "Lunes",
      time: "8:00 AM - 10:00 AM",
      location: "Templo Principal",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2069&auto=format&fit=crop",
      category: t('events.categories.prayer'),
    },
    {
      id: 2,
      title: "Servicio de Doctrina",
      date: "Martes",
      time: "7:00 PM - 9:00 PM",
      location: "Templo Principal",
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
      category: t('events.categories.service'),
    },
    {
      id: 3,
      title: "Servicio de Familia",
      date: "Viernes",
      time: "7:00 PM - 9:00 PM",
      location: "Salón de Jóvenes",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      category: t('events.categories.youth'),
    },
    {
      id: 4,
      title: "Servicios Dominicales",
      date: "Domingos",
      time: "8:00 AM y 10:30 AM",
      location: "Templo Principal",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2070&auto=format&fit=crop",
      category: t('events.categories.service'),
    },
  ];

  return (
    <section id="eventos" className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#0f172a] dark:to-[#1e293b] overflow-hidden preserve-3d transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-800 dark:text-white mb-4">
            {t('events.title')}
          </h2>
          <div className="w-24 h-1.5 bg-[#d4a33d] dark:bg-[#F4C95D] mx-auto rounded-full" />
          <p className="mt-6 text-slate-600 dark:text-gray-400 text-lg">
            {t('events.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 1, y: 0 }} // Force visible
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <TiltCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
