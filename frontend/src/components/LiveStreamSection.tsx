import { useState, useEffect } from "react";
import { Play, Calendar, Clock, Youtube, Facebook, Radio } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

const LiveStreamSection = () => {
    const { t } = useTranslation();
    const [isLive, setIsLive] = useState(false);
    const [nextService, setNextService] = useState("");
    const [recentVideos, setRecentVideos] = useState<any[]>([]);
    const [loadingVideos, setLoadingVideos] = useState(true);

    // Live Status Logic
    useEffect(() => {
        const checkLiveStatus = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const isSunday = day === 0 && ((hour >= 8 && hour < 13));
            const isTuesday = day === 2 && ((hour >= 19 && hour < 21));
            const isFriday = day === 5 && ((hour >= 19 && hour < 21));
            setIsLive(isSunday || isTuesday || isFriday);
        };
        checkLiveStatus();
        const interval = setInterval(checkLiveStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    // Next Service Logic
    useEffect(() => {
        const getNextService = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            if (day === 0 && hour >= 13) return `${t('livestream.days.tuesday')} 7:00 PM`;
            if (day === 1) return `${t('livestream.days.tuesday')} 7:00 PM`;
            if (day === 2 && hour < 19) return `${t('livestream.days.tuesday')} 7:00 PM`;
            if (day === 2 && hour >= 21) return `${t('livestream.days.friday')} 7:00 PM`;
            if (day === 3 || day === 4) return `${t('livestream.days.friday')} 7:00 PM`;
            if (day === 5 && hour < 19) return `${t('livestream.days.friday')} 7:00 PM`;
            if (day === 5 && hour >= 21) return `${t('livestream.days.sunday')} 8:00 AM`;
            if (day === 6) return `${t('livestream.days.sunday')} 8:00 AM`;
            if (day === 0 && hour < 8) return `${t('livestream.days.sunday')} 8:00 AM`;
            return t('livestream.startingSoon');
        };
        setNextService(getNextService());
    }, [t]);

    // Fetch Videos
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const CHANNEL_ID = "UCNHgmUxPdMXtOFYChK1ib1w";
                const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
                const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
                const response = await fetch(API_URL);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    setRecentVideos(data.items.slice(0, 3));
                } else {
                    throw new Error("No videos found");
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
                setRecentVideos([
                    { title: "Servicio Dominical de Adoración", link: "https://www.youtube.com/@iglesiaebenezercoban", pubDate: "2024-05-19", thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop" },
                    { title: "Enseñanza Bíblica Martes", link: "https://www.youtube.com/@iglesiaebenezercoban", pubDate: "2024-05-21", thumbnail: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2561&auto=format&fit=crop" },
                    { title: "Viernes de Milagros", link: "https://www.youtube.com/@iglesiaebenezercoban", pubDate: "2024-05-24", thumbnail: "https://images.unsplash.com/photo-1507692049790-de58293a469d?q=80&w=2670&auto=format&fit=crop" }
                ]);
            } finally {
                setLoadingVideos(false);
            }
        };
        fetchVideos();
    }, []);

    return (
        <section id="transmision" className="relative py-24 bg-slate-50 dark:bg-[#0b1120] overflow-hidden transition-colors duration-300">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-teal-500/5 dark:bg-[#14b8a6]/5 rounded-full blur-[100px] animate-pulse-slow delay-700" />
                <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-slate-200/50 dark:bg-[#1e293b]/50 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <Badge variant="outline" className={`px-4 py-1 text-sm border-slate-300 dark:border-white/10 ${isLive ? 'bg-[#F4C95D]/20 text-[#d4a33d] dark:text-[#F4C95D] border-[#d4a33d]/30 dark:border-[#F4C95D]/30' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'}`}>
                        {isLive ? `🔴 ${t('livestream.liveNow')}` : t('livestream.defaultTitle')}
                    </Badge>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-slate-800 dark:text-white tracking-tight">
                        {t('livestream.title')} <span className="text-[#d4a33d] dark:text-[#F4C95D]">{t('livestream.titleHighlight')}</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
                        {t('livestream.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content (Player) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="group relative aspect-video rounded-3xl overflow-hidden bg-slate-900 dark:bg-black shadow-2xl border border-slate-200 dark:border-white/10 transition-all hover:border-slate-300 dark:hover:border-white/20">
                            {/* Player Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                                {isLive ? (
                                    <div className="text-center animate-pulse">
                                        <div className="w-20 h-20 bg-[#F4C95D]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Radio className="w-10 h-10 text-[#F4C95D]" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{t('livestream.serviceInProgress')}</h3>
                                        <p className="text-gray-300 text-lg">{t('livestream.weAreLive')}</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Calendar className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{t('livestream.nextService')}</h3>
                                        <p className="text-teal-400 dark:text-[#14b8a6] text-2xl font-bold">
                                            {nextService}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons Overlay */}
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col md:flex-row items-center justify-center gap-6 backdrop-blur-md p-6">
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                                    onClick={() => window.open("https://www.youtube.com/@iglesiaebenezercoban", "_blank")}
                                >
                                    <Youtube className="mr-3 h-6 w-6" /> YouTube
                                </Button>
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                                    onClick={() => window.open("https://www.facebook.com/ebenezercoban", "_blank")}
                                >
                                    <Facebook className="mr-3 h-6 w-6" /> Facebook
                                </Button>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="flex items-center justify-between p-6 bg-white/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${isLive ? 'bg-[#F4C95D]/20 text-[#d4a33d] dark:text-[#F4C95D]' : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-gray-400'}`}>
                                    {isLive ? <Radio className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                                        {isLive ? "Estado Actual" : "Próximo Evento"}
                                    </p>
                                    <p className="text-slate-800 dark:text-white font-medium">
                                        {isLive ? t('livestream.serviceInProgress') : nextService}
                                    </p>
                                </div>
                            </div>
                            {!isLive && (
                                <div className="hidden md:block text-right">
                                    <p className="text-sm text-slate-500 dark:text-gray-400">{t('livestream.startingSoon')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (Recent Videos) */}
                    <div className="lg:col-span-4 flex flex-col h-full">
                        <div className="bg-white/80 dark:bg-[#1e293b]/80 rounded-3xl border border-slate-200 dark:border-[#F4C95D]/10 p-6 backdrop-blur-md flex-1">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                                <Youtube className="h-6 w-6 text-[#d4a33d] dark:text-[#F4C95D]" />
                                {t('livestream.pastsServices')}
                            </h3>

                            <div className="space-y-4">
                                {recentVideos.map((video, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex gap-4 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/5"
                                        onClick={() => window.open(video.link, "_blank")}
                                    >
                                        <div className="relative w-32 h-20 bg-slate-200 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                                            <img
                                                src={video.thumbnail.replace("hqdefault", "mqdefault")}
                                                alt="Miniatura"
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop" }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                                                <Play className="w-8 h-8 text-white drop-shadow-lg" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-sm font-semibold text-slate-700 dark:text-gray-200 line-clamp-2 group-hover:text-[#d4a33d] dark:group-hover:text-[#F4C95D] transition-colors leading-snug">
                                                {video.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-500 mt-2 font-medium">
                                                {new Date(video.pubDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {recentVideos.length === 0 && !loadingVideos && (
                                    <div className="text-center py-8 text-slate-500 dark:text-gray-500">
                                        <p>{t('livestream.noVideos')}</p>
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                className="w-full mt-6 border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
                                onClick={() => window.open("https://www.youtube.com/@iglesiaebenezercoban", "_blank")}
                            >
                                {t('common.readMore')} &rarr;
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveStreamSection;
