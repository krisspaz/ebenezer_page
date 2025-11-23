import { Youtube, Facebook, Radio, Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { fetchLatestVideos, YouTubeVideo } from "@/services/youtube";

const LiveStreamSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchLatestVideos();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="transmision" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
            TRANSMISIÓN <span className="text-accent">EN VIVO</span>
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Únete a nuestros servicios en línea desde cualquier lugar y sé parte de nuestra adoración.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-3xl shadow-elegant overflow-hidden border border-border/50 group">
            <div className="aspect-video bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-3xl"></div>

              <div className="text-center text-white p-8 relative z-10">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-accent/50 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20">
                    <Radio className="w-12 h-12 text-accent" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="font-heading text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Próxima Transmisión
                </h3>
                <p className="text-xl md:text-2xl mb-10 font-light text-white/90">
                  Domingo, 10:00 AM
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg hover:shadow-red-600/25 hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full text-lg"
                    onClick={() => window.open("https://www.youtube.com/@iglesiaebenezercoban", "_blank")}
                  >
                    <Youtube className="mr-2 w-6 h-6" />
                    VER EN YOUTUBE
                  </Button>
                  <Button
                    size="lg"
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-bold shadow-lg hover:shadow-[#1877F2]/25 hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full text-lg"
                    onClick={() => window.open("https://www.facebook.com/ebenezercoban?locale=es_LA", "_blank")}
                  >
                    <Facebook className="mr-2 w-6 h-6" />
                    VER EN FACEBOOK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Past Transmissions Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary">
              Transmisiones Anteriores
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 hover:bg-primary hover:text-white transition-colors"
                onClick={scrollPrev}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 hover:bg-primary hover:text-white transition-colors"
                onClick={scrollNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0">
                    <div
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-300 border border-border/50 h-full cursor-pointer"
                      onClick={() => window.open(video.url, "_blank")}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-accent font-bold mb-2">{video.date}</p>
                        <h4 className="font-heading text-lg font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-lg font-light">
              ¿Tienes problemas para conectarte? <a href="#contacto" className="text-accent hover:underline font-medium">Contáctanos</a> y te ayudaremos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;
