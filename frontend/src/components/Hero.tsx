import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calendar, Volume2, VolumeX } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const Hero = () => {
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setHasInteracted(true);
  };

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-slate-900 overflow-hidden"
      aria-label="2026 Año del Deleite - Retiro de Verano"
    >

      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100%] min-h-[100%] w-[177.77vh] h-[56.25vw] opacity-80 scale-105"
          src={`https://www.youtube.com/embed/iyjlHvwZgEo?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=iyjlHvwZgEo&playsinline=1`}
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      {/* Protective Gradients: Dark at top and bottom for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>

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

              <div className="w-full md:w-auto">
                <CountdownTimer targetDate="2026-03-30T00:00:00" />
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

        {/* Audio Interaction Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={toggleMute}
          className="absolute bottom-10 right-10 z-30 flex items-center gap-3 bg-black/60 hover:bg-yellow-500/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all duration-300 group shadow-2xl"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-5 h-5 text-white/80 group-hover:text-white" />
              <span className="text-white/60 group-hover:text-white text-[10px] font-bold uppercase tracking-widest hidden lg:block">Escuchar</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest hidden lg:block">Audio Activado</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Bottom Copyright/Footer Info */}
      <div className="absolute bottom-8 w-full text-center text-[10px] text-white/40 z-20 tracking-[0.3em] uppercase font-light pointer-events-none">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;
