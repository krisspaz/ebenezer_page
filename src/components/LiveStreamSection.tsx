import {
  Youtube,
  Facebook,
  Radio,
  Play,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { fetchLatestVideos, YouTubeVideo } from "@/services/youtube";

// ===============================
// HORARIOS INTELIGENTES
// ===============================
const SERVICE_TIMES = [
  { day: 2, start: "19:00" }, // Martes
  { day: 5, start: "19:00" }, // Viernes
  { day: 0, start: "08:00" }, // Domingo
  { day: 0, start: "10:30" }, // Domingo 2
];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

const getNextService = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let next = null;
  let minDiff = Infinity;

  SERVICE_TIMES.forEach((s) => {
    const start = toMinutes(s.start);

    let diffDays = s.day - currentDay;
    if (diffDays < 0) diffDays += 7;

    let diff = diffDays * 1440 + (start - currentMinutes);

    if (diffDays === 0 && currentMinutes >= start) diff += 7 * 1440;

    if (diff < minDiff) {
      minDiff = diff;
      next = s;
    }
  });

  const labels = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const name = labels[next.day];

  const [h, m] = next.start.split(":");
  const hour = Number(h);
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";

  return `${name}, ${hour12}:${m} ${ampm}`;
};

// ===============================
// DETECTAR EN VIVO
// ===============================
const CHANNEL_ID = "UCNHgmUxPdMXtOFYChK1ib1w";

const checkLiveStatus = async () => {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    const response = await fetch(proxy);
    const data = await response.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");

    const entry = xml.querySelector("entry");
    if (!entry) return { isLive: false };

    const broadcast = entry.querySelector("yt\\:liveBroadcastContent")?.textContent;
    const videoId = entry.querySelector("yt\\:videoId, videoId")?.textContent;

    if (broadcast === "live" && videoId) {
      return {
        isLive: true,
        videoId,
        title: entry.querySelector("title")?.textContent,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    }

    return { isLive: false };
  } catch {
    return { isLive: false };
  }
};

// ===============================
// COMPONENTE PRINCIPAL
// ===============================
const LiveStreamSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState<any>({ isLive: false });

  useEffect(() => {
    checkLiveStatus().then(setLive);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLatestVideos();
        setVideos(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="transmision" className="py-12 bg-background relative">
      <div className="container mx-auto px-4">

        {/* TITULO */}
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
            TRANSMISIÓN <span className="text-accent">EN VIVO</span>
          </h2>
          <div className="w-24 h-1.5 bg-accent mx-auto my-6 rounded-full"></div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Únete a nuestros servicios desde cualquier lugar.
          </p>
        </div>

        {/* BLOQUE PRINCIPAL MINIMALISTA */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#1e2a3a] to-[#0f1a27] rounded-3xl p-10 text-center shadow-xl border border-white/10">

            {!live.isLive ? (
              <>
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/10 p-4 rounded-full backdrop-blur border border-white/20">
                    <Radio className="w-10 h-10 text-accent" />
                  </div>
                </div>

                <h3 className="text-3xl font-heading text-white mb-2">Próxima Transmisión</h3>
                <p className="text-white/80 text-xl mb-8">{getNextService()}</p>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => window.open("https://www.youtube.com/@iglesiaebenezercoban", "_blank")}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Youtube className="w-5 h-5 mr-2" /> YouTube
                  </Button>

                  <Button
                    onClick={() => window.open("https://www.facebook.com/ebenezercoban", "_blank")}
                    className="bg-[#1877F2] hover:bg-[#0f66d9] text-white"
                  >
                    <Facebook className="w-5 h-5 mr-2" /> Facebook
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center bg-red-600 px-5 py-2 rounded-full text-white mb-6">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                  EN VIVO AHORA
                </div>

                <h3 className="text-white text-2xl font-bold mb-6">{live.title}</h3>

                <div
                  onClick={() => window.open(live.url, "_blank")}
                  className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer mb-4"
                >
                  <img src={live.thumbnail} className="w-full" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/40">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CARRUSEL */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between mb-6">
            <h3 className="text-primary text-3xl font-heading font-bold">Transmisiones Anteriores</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prev}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon" onClick={next}>
                <ChevronRight />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex -ml-4">
                {videos.map((vid) => (
                  <div key={vid.id} className="pl-4 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33%]">
                    <div
                      className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-border/50"
                      onClick={() => window.open(vid.url, "_blank")}
                    >
                      <div className="relative aspect-video overflow-hidden rounded-t-xl">
                        <img src={vid.thumbnail} className="w-full h-full object-cover" />
                      </div>

                      <div className="p-4">
                        <p className="text-accent text-sm font-bold">{vid.date}</p>
                        <h4 className="font-heading text-primary text-lg line-clamp-2">
                          {vid.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default LiveStreamSection;
