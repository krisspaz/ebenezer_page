import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-[#0a0a0a] overflow-hidden flex items-center justify-center"
      aria-label="Logo Ebenezer 4K"
    >
      {/* Decorative Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-black to-slate-900 opacity-60"></div>
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Image Layer */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12"
      >
        <img 
          src="/4k-res-logo.jpg" 
          alt="Iglesia de Cristo Ebenezer" 
          className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]"
        />
      </motion.div>

      {/* Protective Gradients: Dark at top and bottom for readability if needed later */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none"></div>

      {/* Bottom Copyright/Footer Info */}
      <div className="absolute bottom-8 w-full text-center text-[10px] text-white/40 z-20 tracking-[0.3em] uppercase font-light pointer-events-none">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;


