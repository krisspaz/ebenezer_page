import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next"; // Added import
import heroChurch from "../assets/maxresdefault.jpg"; // Keep import if needed elsewhere, but overriding for slides
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=3800&auto=format&fit=crop"; // Super High Res

const slides = [
  {
    image: heroChurch,
    title: "Bienvenido a Casa",
    subtitle: "En Él encontramos paz y nueva vida.",
  },
  {
    image: heroChurch,
    title: "Nuestra Fe en Él",
    subtitle: "Jesús es fiel para sostenernos.",
  },
  {
    image: heroChurch,
    title: "La Palabra de Dios",
    subtitle: "Luz que guía y transforma el corazón.",
  },
];

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  // Define slides inside component to access t()
  const slides = [
    {
      image: heroChurch,
      title: t('hero.welcome'),
      subtitle: t('hero.subtitle'),
    },
    {
      image: heroChurch,
      title: "Nuestra Fe en Él", // TODO: Add keys for these
      subtitle: "Jesús es fiel para sostenernos.",
    },
    {
      image: heroChurch,
      title: "La Palabra de Dios",
      subtitle: "Luz que guía y transforma el corazón.",
    },
  ];

  // Auto-advance slides (pause on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Carrusel de bienvenida"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.img
            style={{ y }}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fetchPriority={currentSlide === 0 ? "high" : "auto"}
            className="w-full h-[110%] object-cover object-center"
          />
          {/* Overlay gradient for text readability - darker in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 dark:from-black/95 dark:via-black/60 dark:to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center px-6 z-10 flex flex-col items-center w-full">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white 
                             drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)] tracking-wide mb-6">
                {slides[currentSlide].title}
              </h2>

              <p className="text-lg md:text-2xl text-gray-100/95 font-light mb-12 max-w-[700px] mx-auto
                            drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)] leading-relaxed">
                Una iglesia de puertas abiertas, donde el amor de Dios transforma vidas.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#F4C95D] hover:bg-[#dgb34d] text-black font-bold text-lg 
                             px-10 py-6 rounded-full shadow-xl hover:scale-105 transition-transform cursor-pointer border-none"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document
                        .querySelector("#eventos")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    aria-label="Ver próximos eventos"
                  >
                    {t('nav.events')}
                  </motion.button>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 
                             hover:bg-yellow-500 hover:text-white font-semibold text-lg 
                             px-10 py-6 rounded-full transition-all duration-200 backdrop-blur-sm shadow-md cursor-pointer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document
                        .querySelector("#nosotros")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    aria-label="Conocer más sobre nosotros"
                  >
                    {t('hero.newHere')}
                  </motion.button>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 
                   hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 
                   hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-110"
        aria-label="Siguiente slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Carousel Dots Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3" role="tablist" aria-label="Navegación de slides">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative transition-all duration-300 ${currentSlide === index ? "w-12" : "w-3"
              }`}
            aria-label={`Ir a slide ${index + 1}`}
            aria-selected={currentSlide === index}
            role="tab"
          >
            <div
              className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index
                ? "bg-yellow-500 shadow-glow"
                : "bg-white/30 group-hover:bg-white/50"
                }`}
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 w-full text-center text-xs md:text-sm text-white/40 z-20 tracking-[0.2em] uppercase font-light">
        © 2025 Iglesia de Cristo Ebenezer Cobán
      </div>
    </section>
  );
};

export default Hero;
