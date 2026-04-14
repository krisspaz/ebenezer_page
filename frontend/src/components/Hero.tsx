import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-[#0a0a0a] overflow-hidden"
      aria-label="Logo Ebenezer 4K"
    >
      {/* Top and Bottom Protective Gradients for UI elements */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none"></div>

      {/* Main Image Background - Fills everything */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/4k-res-logo.jpg" 
          alt="Iglesia de Cristo Ebenezer" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Overlays */}
      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none"></div>
      
      {/* Ambient background glows for extra depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none z-15"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-15"></div>

      {/* Bottom Copyright/Footer Info */}
      <div className="absolute bottom-8 w-full text-center text-[10px] text-white/60 z-30 tracking-[0.3em] uppercase font-bold drop-shadow-lg pointer-events-none">
        {t('common.copyright')}
      </div>
    </section>
  );
};

export default Hero;



