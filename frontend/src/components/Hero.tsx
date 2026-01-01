import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Volume2, VolumeX } from "lucide-react";
import proclama2026 from "../assets/4k-res-logo.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [isMuted, setIsMuted] = useState(true);
  const [countdownComplete, setCountdownComplete] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to midnight January 1st, 2026
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-01-01T00:00:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setCountdownComplete(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setCountdownComplete(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Mute/Unmute without reloading iframe
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    }
  }, [isMuted]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center border border-[#F4C95D]/30">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4C95D]">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs text-white/80 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  // When countdown is complete - show only the image
  if (countdownComplete) {
    return (
      <section
        id="inicio"
        className="relative w-full h-[calc(100vh-4rem)] mt-16 overflow-hidden"
        style={{ backgroundColor: '#5c6b94' }}
        aria-label="Proclama Profética 2026"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            src={proclama2026}
            alt="Proclama Profética 2026"
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        {/* Copyright */}
        <div className="absolute bottom-8 w-full text-center text-xs md:text-sm text-white/60 z-20 tracking-[0.2em] uppercase font-light">
          {t('common.copyright')}
        </div>
      </section>
    );
  }

  // Before countdown ends - show video with countdown
  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-black overflow-hidden"
      aria-label="Sección de bienvenida"
    >
      {/* YouTube Video Background */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/7NjF2EKCqts?autoplay=1&mute=1&loop=1&playlist=7NjF2EKCqts&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1&enablejsapi=1"
          title="PROCLAMA PROFETICA"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute"
          style={{
            top: '53%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            width: '178vh',
            height: '100vh',
            minWidth: '100vw',
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Sound Toggle Button - Re-added as requested */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/20 hover:border-[#F4C95D]/50"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)]">
            PROCLAMA  <span className="text-[#F4C95D]"> PROFÉTICA</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">
            31 de Diciembre • Ciudad de Guatemala
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mb-10">
            <TimeBox value={timeLeft.days} label="Días" />
            <TimeBox value={timeLeft.hours} label="Horas" />
            <TimeBox value={timeLeft.minutes} label="Min" />
            <TimeBox value={timeLeft.seconds} label="Seg" />
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#F4C95D] hover:bg-[#e6b84d] text-[#0f172a] font-bold py-4 px-8 rounded-full shadow-xl shadow-[#F4C95D]/30 transition-all duration-300 text-lg"
          >
            ¡Te Esperamos!
          </motion.a>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 w-full text-center text-xs md:text-sm text-white/40 z-20 tracking-[0.2em] uppercase font-light">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;
