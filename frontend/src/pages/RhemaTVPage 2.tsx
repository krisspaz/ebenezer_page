import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import SEO from "../components/SEO";
import { usePlayer } from "@/context/PlayerContext";

const rhemaConfig = {
    // Updated URL or fallback logic needed. 
    // For now, keeping the streamlock URL but acknowledging it might fail.
    url: 'https://5e85d90130e77.streamlock.net:443/6006/ngrp:6006_all/playlist.m3u8',
    type: 'hls' as const,
    title: 'Rhema TV',
    description: 'Señal en vivo - Transmisión Directa',
    isExternal: false
};

const RhemaTVPage = () => {
    const { playStream, setFloating, config: currentPlayerConfig } = usePlayer();

    useEffect(() => {
        // Only trigger play if not already playing this exact URL
        if (currentPlayerConfig?.url !== rhemaConfig.url) {
            playStream(rhemaConfig);
        }

        // Force full view when on this page
        setFloating(false);

        // When leaving, allow floating
        return () => {
            setFloating(true);
        };
    }, [playStream, setFloating, currentPlayerConfig?.url]); // Run whenever relevant state changes

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-white flex flex-col">
            <SEO
                title="Rhema TV | Ebenezer Cobán"
                description="Señal en vivo de Rhema TV. Disfruta de nuestra programación y servicios en directo."
                url="/rhema-tv"
            />
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-0 md:px-6 flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white drop-shadow-sm">
                            Rhema <span className="text-[#F4C95D]">TV</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
                            Señal en vivo - Transmisión Directa
                        </p>
                    </div>

                    {/* TV Player Placeholder Area */}
                    {/* The GlobalPlayer will overlay this area when isFloating is false. 
                        We keep this container to reserve space in the layout and provide a background/loading state.
                    */}
                    <div id="video-mount-point" className="w-full bg-black shadow-2xl md:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-video flex items-center justify-center">
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                            <p className="text-slate-400 animate-pulse">Cargando señal...</p>
                            <p className="text-xs text-slate-600 mt-2">Si el video no aparece, por favor recarga la página.</p>
                        </div>
                    </div>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>Si la transmisión se detiene, por favor recarga la página o presiona play nuevamente.</p>
                    </div>
                </div>
            </main>

            {/* We might want to disable the old persistent audio player if video is playing, 
                but keeping it for now in case user wants radio. 
                However, having two floating players could be weird. */}
            <FloatingAudioPlayer />
            <Footer />
        </div>
    );
};

export default RhemaTVPage;
