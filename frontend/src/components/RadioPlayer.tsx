import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const STREAM_URL = "https://radio.fiberstreams.com:2000/stream/8710";

const RadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Cortar descarga de datos
        audioRef.current.load();
        setPlaying(false);
      } else {
        setLoading(true);
        audioRef.current.src = STREAM_URL;
        audioRef.current.load(); // Asegurar carga limpia
        await audioRef.current.play();
        setPlaying(true);
        setLoading(false);
      }
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };

  return (
    <div
      className="
      w-full max-w-4xl mx-auto
      mt-6   /* ← SEPARACIÓN EXTRA */
      mb-6   /* ← OPCIONAL, SEPARA DE LO QUE SIGUE */
      bg-gradient-to-br from-[#1e2a3a] to-[#0f1a27]
      rounded-xl px-5 py-3
      shadow-lg border border-white/10
      flex items-center justify-between gap-4
      "
    >
      <audio ref={audioRef} preload="none" />

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        disabled={loading}
        className="text-white hover:text-accent transition"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        ) : playing ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>

      {/* Title */}
      <div className="flex-1 text-sm font-medium text-white/90 truncate">
        Rhema Stereo — <span className="text-accent">En vivo</span>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-40">
        <Volume2 className="w-4 h-4 text-white/70" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="
            w-full h-1 rounded-lg appearance-none cursor-pointer
            bg-white/20
            accent-accent
          "
        />
      </div>

      {/* LIVE badge */}
      {playing && (
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-white/70">LIVE</span>
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;
