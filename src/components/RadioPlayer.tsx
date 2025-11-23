import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Radio } from "lucide-react";

// Try multiple possible stream URLs
const STREAM_URLS = [
  "https://stream.zeno.fm/f3c0en7rf9duv",
  "https://stream.zeno.fm/rhema-stereo-91-7",
  "https://rhemastereo.fm/radio/8000/radio.mp3",
  "https://streaming.emisoras.com.gt:8000/rhemastereo",
];

const RadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Try next stream URL if current one fails
  const tryNextStream = () => {
    if (currentStreamIndex < STREAM_URLS.length - 1) {
      setCurrentStreamIndex(prev => prev + 1);
      setError(null);
    } else {
      setError("No se pudo conectar con la emisora");
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setError(null);
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        tryNextStream();
      });
      setPlaying(true);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // Handle audio errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      console.error("Stream error, trying next URL...");
      if (playing) {
        tryNextStream();
      }
    };

    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, [playing, currentStreamIndex]);

  return (
    <div className="max-w-5xl mx-auto mt-12 animate-fade-in-up">
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-6 shadow-sm border border-primary/10 backdrop-blur-sm">
        <audio ref={audioRef} src={STREAM_URLS[currentStreamIndex]} preload="none" crossOrigin="anonymous" />

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {/* Radio Icon */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary">Rhema Stereo</p>
              <p className="text-xs text-muted-foreground">{error || "91.7 FM - En vivo"}</p>
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            {playing ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Volume2 className="w-5 h-5 text-primary flex-shrink-0" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={changeVolume}
              className="flex-1 h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Control de volumen"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--primary) / 0.2) ${volume * 100}%, hsl(var(--primary) / 0.2) 100%)`
              }}
            />
            <span className="text-sm font-medium text-primary min-w-[3ch]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
