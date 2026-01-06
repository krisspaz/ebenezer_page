import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-slate-50 dark:bg-[#0b1120] overflow-hidden"
      aria-label="2026 Año del Deleite"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="/assets/images/2026-deleite.jpg?v=2026_user_final"
          alt="2026 Año del Deleite"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 w-full text-center text-xs md:text-sm text-white/60 z-20 tracking-[0.2em] uppercase font-light drop-shadow-md">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;
