import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePlayer } from "@/context/PlayerContext";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next"; // Although unused, kept for consistency if needed later

const EmbedPage = () => {
    const { type } = useParams();
    const { playStream, setFloating, config: currentPlayerConfig } = usePlayer();

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
    }, [type]);

    useEffect(() => {
        const getStreamConfig = (type: string | undefined) => {
            switch (type) {
                case "coban":
                    return {
                        // Use the standard playlist URL so ReactPlayer detects it as YouTube.
                        // ReactPlayer works best with "youtube.com/playlist" or "watch" URLs, not always "embed" for auto-detection.
                        url: "https://www.youtube.com/playlist?list=UUNHgmUxPdMXtOFYChK1ib1w",
                        type: "youtube" as const,
                        title: "Ebenezer Cobán",
                        description: "Servicios y transmisiones de Ebenezer Cobán.",
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
                case "juventud":
                    return {
                        // Example placeholder or specific youth channel
                        url: "https://www.youtube.com/@JuventudEbenezerCoban",
                        type: "youtube" as const,
                        title: "Juventud Ebenezer",
                        description: "Transmisiones de jóvenes.",
                        isExternal: true,
                        externalLink: "https://www.youtube.com/@JuventudEbenezerCoban"
                    };
                default:
                    return null;
            }
        };

        const config = getStreamConfig(type);

        if (config) {
            if (!config.isExternal) {
                // If it's a direct stream (Coban), play it globally
                // Only change if URL is different to avoid unnecessary reloads
                if (currentPlayerConfig?.url !== config.url) {
                    playStream(config);
                } else {
                    // If already playing, just ensure we are NOT floating
                    setFloating(false);
                }
            }
        }

        // Cleanup: When leaving this page to go elsewhere (unmounting), 
        // we might want to enable floating mode if the player is still active.
        // But specifically for this page flow, if user clicks "Back", we want floating.
        return () => {
            setFloating(true);
        };
    }, [type, playStream, setFloating, currentPlayerConfig?.url]);

    const renderConfig = () => {
        switch (type) {
            case "coban":
                return {
                    title: "Transmisión en Vivo - Ebenezer Cobán",
                    description: "Disfruta de nuestros servicios en vivo y prédicas recientes."
                };
            case "chile":
                return {
                    title: "Ebenezer Chile",
                    description: "Conéctate con la señal de nuestros hermanos en Chile."
                };
            default:
                return {
                    title: "Transmisión",
                    description: "Señal en vivo."
                };
        }
    };

    const details = renderConfig();
    const config = type === "coban"
        ? { isExternal: false, externalLink: "" }
        : { isExternal: true, externalLink: type === "chile" ? "https://www.facebook.com/groups/1089210062473843/videos/" : "#" };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-50 dark:bg-[#0b1120]">
            <div className="container mx-auto max-w-6xl">
                <Link to="/">
                    <Button variant="ghost" className="mb-6 hover:bg-slate-200 dark:hover:bg-slate-800">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Regresar
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-black aspect-video rounded-xl overflow-hidden shadow-2xl relative group">
                            {/* Placeholder while GlobalPlayer loads on top */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-slate-900 border border-slate-800">
                                <div className="text-center">
                                    <p className="mb-2">Cargando reproductor...</p>
                                    <p className="text-xs opacity-60">Si no inicia, verifique su conexión.</p>
                                </div>
                            </div>

                            {/* If config is external, show a button to open it */}
                            {config.isExternal && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                    <a
                                        href={config.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transform hover:scale-105 transition-transform"
                                    >
                                        <Button size="lg" className="bg-[#F4C95D] hover:bg-[#e0b84d] text-slate-900 font-bold">
                                            <ExternalLink className="w-5 h-5 mr-2" />
                                            Ver Transmisión en {type === 'chile' ? 'Facebook' : 'Sitio Externo'}
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {details.title}
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                {details.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Chat / Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Información
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                Estamos transmitiendo desde Templo Principal Ebenezer Cobán.
                                Si la transmisión se detiene, por favor recarga la página.
                            </p>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-center text-slate-400">
                                    ¿Problemas de reproducción? <br />
                                    <a href="#" className="underline hover:text-[#F4C95D]">Reportar problema</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbedPage;
