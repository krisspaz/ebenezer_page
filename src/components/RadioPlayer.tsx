import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Radio as RadioIcon } from "lucide-react";

const STREAM_URL = "https://radio.fiberstreams.com:2000/stream/8710";

const RadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        setLoading(true);
        await audioRef.current.play();
        setPlaying(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al reproducir:", error);
      setLoading(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 animate-fade-in-up">
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-3xl p-8 shadow-elegant overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        {/* Content */}
        <div className="relative z-10">
          <audio ref={audioRef} src={STREAM_URL} preload="none" />

          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className={`absolute inset-0 bg-accent/50 rounded-full ${playing ? 'animate-ping' : ''}`} />
              <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                <RadioIcon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold tracking-tight">Rhema Stereo</h3>
              <p className="text-white/80 text-sm">91.7 FM - En vivo</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              disabled={loading}
              className="group relative bg-white hover:bg-white/90 text-primary p-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={playing ? "Pausar" : "Reproducir"}
            >
              {loading ? (
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              ) : playing ? (
                <Pause className="w-8 h-8" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            <Volume2 className="w-5 h-5 text-white flex-shrink-0" />
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
            <span className="text-white text-sm font-medium min-w-[3ch] text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Now Playing Indicator */}
          {playing && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="flex gap-1">
                  <span className="w-1 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-white text-sm font-medium">Transmitiendo en vivo</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
