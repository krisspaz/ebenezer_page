import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";

const EmbedPage = () => {
    const { type } = useParams<{ type: string }>();
    const { playStream, setFloating, config: currentPlayerConfig } = usePlayer();
    // Use a ref to prevent infinite loops or double calls if dependencies change oddly
    const hasInitialized = useRef(false);

    useEffect(() => {
        const getStreamConfig = (type: string | undefined) => {
            switch (type) {
                case "coban":
                    return {
                        // Use the channel ID specific live endpoint.
                        // If "channel=" doesn't work well for "always live", we might need "user=" if it was a user, 
                        // but for a channel ID, this is the standard way.
                        // Alternatively: https://www.youtube.com/embed?listType=user_uploads&list=IglesiaEbenezerCoban 
                        // But for LIVE specifically: 
                        url: "https://www.youtube.com/embed/live_stream?channel=UCNHgmUxPdMXtOFYChK1ib1w&autoplay=1",
                        type: "youtube" as const,
                        title: "Ebenezer Cobán - En Vivo",
                        description: "Transmisión oficial desde Cobán, Alta Verapaz.",
                        isExternal: false
                    };
                case "chile":
                    return {
                        url: "https://www.facebook.com/groups/1089210062473843/videos/",
                        type: "facebook" as const,
                        title: "Ebenezer Chile",
                        description: "Transmisiones desde Ebenezer Chile.",
                        isExternal: true,
                        externalLink: "https://www.facebook.com/groups/1089210062473843/videos/"
                    };
                default:
                    return null;
            }
        };

        const config = getStreamConfig(type);

        if (config) {
            if (!config.isExternal) {
                // Ensure we don't restart if already playing the same thing
                if (currentPlayerConfig?.url !== config.url) {
                    playStream(config);
                } else {
                    // If already playing, just ensure we are NOT floating
                    setFloating(false);
                }
            }
        }

        // Cleanup: When leaving this page, enable floating mode
        return () => {
            setFloating(true);
        };
    }, [type, playStream, setFloating, currentPlayerConfig?.url]);

    const getRenderConfig = (type: string | undefined) => {
        switch (type) {
            case "coban":
                return {
                    title: "Ebenezer Cobán - En Vivo",
                    description: "Transmisión oficial desde Cobán, Alta Verapaz.",
                    isFacebook: false
                };
            case "chile":
                return {
                    title: "Ebenezer Chile",
                    description: "Transmisiones desde Ebenezer Chile.",
                    isFacebook: true,
                    externalLink: "https://www.facebook.com/groups/1089210062473843/videos/"
                };
            default: return null;
        }
    }

    const renderConfig = getRenderConfig(type);

    if (!renderConfig) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Transmisión no encontrada</h1>
                        <Link to="/">
                            <Button>Volver al Inicio</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] flex flex-col font-inter">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
                <div className="w-full max-w-5xl">
                    <div className="mb-6 flex items-center gap-4">
                        <Link to="/">
                            <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-transparent p-0 flex items-center gap-2">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Volver</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 min-h-[400px] flex flex-col">
                        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 flex-1">
                            {renderConfig.isFacebook ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                        {renderConfig.title}
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                                        Las transmisiones de Facebook Live de grupos privados deben verse directamente en Facebook.
                                    </p>
                                    <a
                                        href={renderConfig.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-lg bg-[#1877F2] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#166fe5] transition-all"
                                    >
                                        Ver en Facebook
                                    </a>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                        {renderConfig.title}
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {renderConfig.description}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-8 animate-pulse">
                                        Cargando reproductor...
                                    </p>
                                    {/* Small hint if player doesn't start */}
                                    <p className="text-[10px] text-slate-500 mt-2 max-w-md">
                                        Si ves la pantalla negra por mucho tiempo, es posible que no haya transmisión en vivo activa en YouTube en este momento.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmbedPage;
