import { Calendar, Volume2, VolumeX, Play } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PromotionalVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setHasInteracted(true);
  };

  return (
    <section className="relative w-full bg-[#050505] py-20 md:py-32 overflow-hidden">
      {/* Cinematic Background: Mesh Gradients & Particle-like glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Próximamente
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            RETIRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">VERANO</span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-zinc-400 font-medium text-lg md:text-2xl tracking-tight">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              <span>Marzo 30 — Abril 04, 2026</span>
            </div>

            <div className="w-full max-w-4xl">
              <CountdownTimer targetDate="2026-03-30T00:00:00" />
            </div>

            <p className="mt-4 text-zinc-500 text-sm md:text-base font-bold uppercase tracking-[0.5em] border-b border-white/10 pb-2">
              Ciudad de Guatemala
            </p>
          </div>
        </motion.div>

        {/* Video Container with Cinematic Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-5xl mx-auto relative group"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/20 via-yellow-400/20 to-yellow-600/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-2xl border border-white/5">
            <iframe
              className="absolute top-0 left-0 w-full h-full scale-[1.01]"
              src={`https://www.youtube.com/embed/iyjlHvwZgEo?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&playsinline=1&controls=1&showinfo=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            {/* Mute/Interactive Overlay */}
            <AnimatePresence>
              {!hasInteracted && isMuted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group/overlay"
                  onClick={toggleMute}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-full border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                  >
                    <VolumeX className="w-12 h-12 text-white animate-pulse" />
                    <span className="text-white font-bold text-sm tracking-widest uppercase">Toca para escuchar</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio Toggle Toggle (After interaction) */}
            {hasInteracted && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-6 right-6 z-20 bg-black/60 hover:bg-black/80 p-3 rounded-full border border-white/10 backdrop-blur-sm transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-yellow-500" />}
              </button>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-600/5 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionalVideo;
