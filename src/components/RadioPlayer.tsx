import { Radio } from "lucide-react";

const RadioPlayer = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 animate-fade-in-up">
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-6 shadow-sm border border-primary/10 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3 justify-center">
            <div className="p-2 rounded-full bg-primary/10">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">Rhema Stereo</p>
              <p className="text-xs text-muted-foreground">91.7 FM - En vivo</p>
            </div>
          </div>

          {/* Zeno.FM Player Embed */}
          <div className="w-full rounded-lg overflow-hidden bg-white/50">
            <iframe
              src="https://zeno.fm/player/rhema-stereo-91-7"
              width="100%"
              height="250"
              frameBorder="0"
              scrolling="no"
              allow="autoplay"
              title="Rhema Stereo 91.7 FM"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;

