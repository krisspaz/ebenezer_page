import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-[#0a0a0a] overflow-hidden"
      aria-label="2026 Año del Deleite - Retiro de Verano"
    >
      {/* Decorative Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-black to-slate-900 opacity-60"></div>
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Protective Gradients: Dark at top and bottom for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-none"></div>

      {/* Top Content Overlay (Title Shifted Up) */}
      <div className="absolute top-10 md:top-24 left-0 w-full z-20 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-8xl font-black tracking-[0.05em] text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            RETIRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200">VERANO</span>
          </h1>
        </motion.div>
      </div>

      {/* Bottom Content Overlay (Cinematic Credits/Metadata) */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full"
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-14 mb-8">
              <div className="flex items-center gap-3 text-white/90 font-medium text-base md:text-lg tracking-wide drop-shadow-md">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                <span className="font-light">Marzo 30 — Abril 04, 2026</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 opacity-70">
              <p className="text-white text-[9px] md:text-xs font-bold uppercase tracking-[1em]">
                Ciudad de Guatemala
              </p>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Copyright/Footer Info */}
      <div className="absolute bottom-8 w-full text-center text-[10px] text-white/40 z-20 tracking-[0.3em] uppercase font-light pointer-events-none">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;

