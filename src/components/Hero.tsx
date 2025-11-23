import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroChurch from "@/assets/maxresdefault.jpg";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="inicio"
      className="relative w-full h-[calc(100vh-4rem)] mt-16 bg-black overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center animate-fade-in transform scale-105 transition-transform duration-[10000ms]"
          />

          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center px-6 z-10 flex flex-col items-center w-full">
            <div className="animate-fade-in-up max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white 
                             drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)] tracking-wide mb-6">
                {slide.title}
              </h1>

              <p className="text-lg md:text-2xl text-gray-100/95 font-light mb-12 max-w-[700px] mx-auto
                            drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)] leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg 
                             px-10 py-6 rounded-full shadow-xl hover:scale-105 transition-transform"
                  onClick={() => {
                    document
                      .querySelector("#eventos")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Ver eventos
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 
                             hover:bg-yellow-500 hover:text-white font-semibold text-lg 
                             px-10 py-6 rounded-full transition-all duration-200 backdrop-blur-sm shadow-md"
                  onClick={() => {
                    document
                      .querySelector("#nosotros")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Conócenos
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 
                   hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-110"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 
                   hover:bg-white/20 text-white p-4 rounded-full transition-all backdrop-blur-md border border-white/10 hover:scale-110"
      >
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-8 w-full text-center text-xs md:text-sm text-white/40 z-20 tracking-[0.2em] uppercase font-light">
        © 2025 Iglesia de Cristo Ebenezer Cobán
      </div>
    </section>
  );
};

export default Hero;
