import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmbedPage = () => {
    const { type } = useParams<{ type: string }>();

    const getStreamConfig = (type: string | undefined) => {
        switch (type) {
            case "coban":
                return {
                    title: "Ebenezer Cobán - En Vivo",
                    description: "Transmisión oficial desde Cobán, Alta Verapaz.",
                    // YouTube Live Stream by Channel ID
                    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCNHgmUxPdMXtOFYChK1ib1w&autoplay=1",
                    isFacebook: false
                };
            case "chile":
                return {
                    title: "Ebenezer Chile",
                    description: "Transmisiones desde Ebenezer Chile.",
                    // Facebook Groups don't support "latest live" embeds easily. 
                    // We'll provide a direct clean interface or a best-effort iframe if possible, 
                    // but usually requires a specific video ID. 
                    // For now, we link to the videos tab as a fallback or try to embed the page if allowed.
                    embedUrl: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgroups%2F1089210062473843&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId",
                    isFacebook: true,
                    externalLink: "https://www.facebook.com/groups/1089210062473843/videos/"
                };
            default:
                return null;
        }
    };

    const config = getStreamConfig(type);

    if (!config) {
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

                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {config.title}
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                {config.description}
                            </p>
                        </div>

                        <div className="aspect-video w-full bg-black relative">
                            {config.isFacebook ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900">
                                    <p className="text-white mb-6 max-w-lg">
                                        Las transmisiones de Facebook Live de grupos privados o cerrados no permiten incrustación automática directa por políticas de privacidad de Facebook.
                                    </p>
                                    <a
                                        href={config.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-lg bg-[#1877F2] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#166fe5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2] transition-all"
                                    >
                                        Ver Transmisión en Facebook
                                    </a>
                                </div>
                            ) : (
                                <iframe
                                    src={config.embedUrl}
                                    title={config.title}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            )}
                        </div>

                        {!config.isFacebook && (
                            <div className="bg-slate-50 dark:bg-[#0f172a] p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                                Si la transmisión no inicia automáticamente, por favor presiona play.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmbedPage;
