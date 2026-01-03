import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { usePlayer } from "@/context/PlayerContext";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const GlobalPlayer = () => {
    const { isPlaying, isFloating, config, closePlayer, setFloating } = usePlayer();
    const location = useLocation();

    // Debugging: Log current state
    console.log("GlobalPlayer State:", { isPlaying, isFloating, config });

    if (!isPlaying || !config) return null;

    if (config.isExternal) return null; // External streams handled by links

    // Force cast ReactPlayer to any to avoid TS issues with library types
    const Player = ReactPlayer as any;

    // Layout Styles
    const floatingStyles = "fixed bottom-4 right-4 w-80 aspect-video z-50 shadow-2xl rounded-xl overflow-hidden border border-slate-700 animate-in fade-in slide-in-from-bottom-5 bg-black";
    const fullPageStyles = "fixed inset-0 z-40 bg-black flex flex-col pt-[72px] items-center justify-center";

    return (
        <div className={isFloating ? floatingStyles : fullPageStyles}>

            {/* Controls Bar */}
            <div className={`absolute top-0 left-0 right-0 p-2 z-10 flex justify-end gap-2 bg-gradient-to-b from-black/60 to-transparent ${!isFloating ? "px-8 pt-4" : ""}`}>
                {!isFloating && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 mr-auto"
                        onClick={() => setFloating(true)}
                    >
                        <Minimize2 className="w-5 h-5" />
                    </Button>
                )}

                {isFloating && (
                    <Link to={config.type === 'youtube' ? "/transmision/coban" : "/rhema-tv"} onClick={() => setFloating(false)}>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-6 h-6">
                            <Maximize2 className="w-4 h-4" />
                        </Button>
                    </Link>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/20 hover:text-red-400 ${isFloating ? "w-6 h-6" : ""}`}
                    onClick={closePlayer}
                >
                    <X className={isFloating ? "w-4 h-4" : "w-6 h-6"} />
                </Button>
            </div>

            <div className={`relative w-full h-full ${!isFloating ? "max-w-6xl max-h-[80vh] aspect-video" : ""}`}>
                <Player
                    key={config.url} // Force remount on URL change
                    url={config.url}
                    className="react-player"
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={true}
                    pip={true}
                    muted={false}
                    playsinline={true}
                    config={{
                        file: {
                            forceHLS: config.type === 'hls',
                            hlsOptions: config.type === 'hls' ? {
                                xhrSetup: function (xhr: any, url: string) {
                                    xhr.withCredentials = false;
                                },
                            } : undefined
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default GlobalPlayer;
