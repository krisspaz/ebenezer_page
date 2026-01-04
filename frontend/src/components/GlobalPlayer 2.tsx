import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { createPortal } from "react-dom";
import HLSPlayer from "./HLSPlayer";
import { usePlayer } from "@/context/PlayerContext";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const GlobalPlayer = () => {
    const { isPlaying, isFloating, config, closePlayer, setFloating } = usePlayer();
    const location = useLocation();

    // State to track if the mount point exists in the DOM
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Check for the mount point whenever location or floating state changes
        const checkMountPoint = () => {
            const node = document.getElementById("video-mount-point");
            setMountNode(node);
        };

        // Check immediately
        checkMountPoint();

        // Also set up a mutation observer just in case the page loads slightly slower than this component updates
        const observer = new MutationObserver(checkMountPoint);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [location.pathname, isFloating]);

    // Debugging
    console.log("GlobalPlayer State:", { isPlaying, isFloating, mountNode: !!mountNode });

    if (!isPlaying || !config) return null;
    if (config.isExternal) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Player = ReactPlayer as any;

    const commonProps = {
        key: config.url,
        className: "react-player",
        width: "100%",
        height: "100%",
        playing: true,
        controls: true,
        pip: true,
        muted: false,
        playsinline: true,
    };

    // Determine render target and styles
    // If not floating AND we have a mount node, we play INLINE.
    // Otherwise, we play FLOATING (fixed z-index).
    const isInline = !isFloating && mountNode;
    const targetNode = isInline ? mountNode : document.body;

    // Styles
    // Inline: Fill the container relative
    // Floating: Fixed bottom right
    const containerClasses = isInline
        ? "w-full h-full relative"
        : "fixed bottom-4 right-4 w-80 aspect-video z-50 shadow-2xl rounded-xl overflow-hidden border border-slate-700 animate-in fade-in slide-in-from-bottom-5 bg-black";

    const content = (
        <div className={containerClasses}>
            {/* Controls Bar */}
            <div className={`absolute top-0 left-0 right-0 p-2 z-10 flex justify-end gap-2 bg-gradient-to-b from-black/60 to-transparent ${isInline ? "opacity-0 hover:opacity-100 transition-opacity" : ""}`}>
                {isInline && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 mr-auto"
                        onClick={() => setFloating(true)}
                        title="Minimizar reproductor"
                    >
                        <Minimize2 className="w-5 h-5" />
                    </Button>
                )}

                {!isInline && (
                    <Link to={config.type === 'youtube' ? "/transmision/coban" : "/rhema-tv"} onClick={() => setFloating(false)}>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 w-6 h-6" title="Expandir">
                            <Maximize2 className="w-4 h-4" />
                        </Button>
                    </Link>
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/20 hover:text-red-400 ${!isInline ? "w-6 h-6" : ""}`}
                    onClick={closePlayer}
                    title="Cerrar"
                >
                    <X className={!isInline ? "w-4 h-4" : "w-6 h-6"} />
                </Button>
            </div>

            <div className={`relative w-full h-full ${!isInline ? "aspect-video" : ""}`}>
                {config.type === 'youtube' && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed?listType=playlist&list=UUNHgmUxPdMXtOFYChK1ib1w&autoplay=1&playsinline=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                )}

                {config.type === 'hls' && (
                    <HLSPlayer
                        url={config.url}
                        className="w-full h-full"
                    />
                )}

                {config.type === 'facebook' && (
                    <Player
                        {...commonProps}
                        url={config.url}
                    />
                )}
            </div>
        </div>
    );

    // Use Portal to render into the correct node
    if (!targetNode) return null;
    return createPortal(content, targetNode);
};

export default GlobalPlayer;
