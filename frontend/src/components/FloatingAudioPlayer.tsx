import { useState, useRef, useEffect } from "react";
import { Play, Pause, Radio, X, Youtube, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

const STREAM_URL = "https://radio.fiberstreams.com:2000/stream/8710";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@iglesiaebenezercoban";
const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxx"; // Will be updated when we get the correct ID

const FloatingAudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'menu' | 'radio' | 'youtube'>('menu');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [latestVideoId, setLatestVideoId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fetch latest YouTube video
    useEffect(() => {
        const fetchLatestVideo = async () => {
            try {
                // Try to get latest video from RSS feed
                const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=UCNHgmUxPdMXtOFYChK1ib1w`;
                const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
                const response = await fetch(API_URL);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    // Extract video ID from link
                    const link = data.items[0].link;
                    const videoId = link.split('v=')[1]?.split('&')[0];
                    if (videoId) {
                        setLatestVideoId(videoId);
                    }
                }
            } catch (error) {
                console.error("Error fetching latest video:", error);
                // Fallback - user can still watch through channel
            }
        };
        fetchLatestVideo();
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error(e));
        }
        setIsPlaying(!isPlaying);
    };

    const selectRadio = () => {
        setActiveTab('radio');
        if (!isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.error(e));
            setIsPlaying(true);
        }
    };

    const selectYouTube = () => {
        setActiveTab('youtube');
        // Pause radio when switching to YouTube
        if (isPlaying && audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const goBack = () => {
        setActiveTab('menu');
        setIsFullscreen(false);
    };

    const closePlayer = () => {
        setIsExpanded(false);
        setActiveTab('menu');
        setIsFullscreen(false);
        // Radio keeps playing even when closing the panel
        // User can pause explicitly with the pause button
    };

    // YouTube embed URL - uses channel's live stream or latest video
    const youtubeEmbedUrl = latestVideoId
        ? `https://www.youtube.com/embed/${latestVideoId}?autoplay=1&rel=0`
        : `https://www.youtube.com/embed/live_stream?channel=UCNHgmUxPdMXtOFYChK1ib1w&autoplay=1`;

    return (
        <div className={`fixed z-50 transition-all duration-300 ${isFullscreen
            ? 'inset-4 md:inset-8'
            : 'bottom-24 right-6'
            }`}>
            <audio ref={audioRef} src={STREAM_URL} preload="none" />

            {/* Expanded Content */}
            {isExpanded && (
                <div className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#F4C95D]/20 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${isFullscreen ? 'w-full h-full' : 'w-[320px] md:w-[400px]'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            {activeTab !== 'menu' && (
                                <button
                                    onClick={goBack}
                                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            <span className="font-semibold text-sm text-slate-700 dark:text-white">
                                {activeTab === 'menu' && 'Medios'}
                                {activeTab === 'radio' && '📻 Radio en Vivo'}
                                {activeTab === 'youtube' && '📺 YouTube'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {activeTab === 'youtube' && (
                                <button
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors"
                                >
                                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                            )}
                            <button
                                onClick={closePlayer}
                                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-600 dark:text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`${isFullscreen ? 'h-[calc(100%-52px)]' : ''}`}>
                        {/* Menu View */}
                        {activeTab === 'menu' && (
                            <div className="p-4 space-y-3">
                                {/* Radio Option */}
                                <button
                                    onClick={selectRadio}
                                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200
                                        ${isPlaying
                                            ? 'bg-[#F4C95D] text-[#0f172a]'
                                            : 'bg-slate-100 dark:bg-[#0f172a] text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-[#0f172a]/80'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                        ${isPlaying
                                            ? 'bg-[#0f172a]/20'
                                            : 'bg-[#d4a33d]/20 dark:bg-[#F4C95D]/20'
                                        }`}>
                                        {isPlaying ? (
                                            <div className="flex gap-0.5 h-5 items-end">
                                                <div className="w-1 bg-current animate-[bounce_1s_infinite] h-2"></div>
                                                <div className="w-1 bg-current animate-[bounce_1.2s_infinite] h-5"></div>
                                                <div className="w-1 bg-current animate-[bounce_0.8s_infinite] h-3"></div>
                                            </div>
                                        ) : (
                                            <Radio className="w-6 h-6 text-[#d4a33d] dark:text-[#F4C95D]" />
                                        )}
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-bold text-base">Radio en Vivo</p>
                                        <p className={`text-sm ${isPlaying ? 'text-[#0f172a]/70' : 'text-slate-500 dark:text-gray-400'}`}>
                                            {isPlaying ? '🔴 Reproduciendo ahora' : 'Escuchar transmisión'}
                                        </p>
                                    </div>
                                    {isPlaying && (
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    )}
                                </button>

                                {/* YouTube Option */}
                                <button
                                    onClick={selectYouTube}
                                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-[#0f172a] text-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                        <Youtube className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-bold text-base">YouTube en Vivo</p>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">Ver servicios y videos</p>
                                    </div>
                                    <Play className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        )}

                        {/* Radio View */}
                        {activeTab === 'radio' && (
                            <div className="p-6 text-center">
                                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying
                                    ? 'bg-[#F4C95D] ring-4 ring-[#F4C95D]/30 animate-pulse'
                                    : 'bg-slate-200 dark:bg-[#0f172a]'
                                    }`}>
                                    {isPlaying ? (
                                        <div className="flex gap-1 h-8 items-end">
                                            <div className="w-1.5 bg-[#0f172a] animate-[bounce_1s_infinite] h-3"></div>
                                            <div className="w-1.5 bg-[#0f172a] animate-[bounce_1.2s_infinite] h-8"></div>
                                            <div className="w-1.5 bg-[#0f172a] animate-[bounce_0.8s_infinite] h-5"></div>
                                            <div className="w-1.5 bg-[#0f172a] animate-[bounce_1.1s_infinite] h-6"></div>
                                        </div>
                                    ) : (
                                        <Radio className="w-10 h-10 text-[#d4a33d] dark:text-[#F4C95D]" />
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                                    Radio Ebenezer Cobán
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                                    {isPlaying ? 'Transmitiendo en vivo' : 'Presiona para reproducir'}
                                </p>
                                <Button
                                    onClick={togglePlay}
                                    className={`w-full h-12 rounded-xl font-bold text-base transition-all ${isPlaying
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-[#F4C95D] hover:bg-[#e6b84d] text-[#0f172a]'
                                        }`}
                                >
                                    {isPlaying ? (
                                        <>
                                            <Pause className="w-5 h-5 mr-2" />
                                            Pausar
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 mr-2" />
                                            Reproducir
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* YouTube View */}
                        {activeTab === 'youtube' && (
                            <div className={`${isFullscreen ? 'h-full' : 'aspect-video'}`}>
                                <iframe
                                    src={youtubeEmbedUrl}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="YouTube Video"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Toggle Button - Only show when not fullscreen */}
            {!isFullscreen && (
                <div className={`flex items-center gap-2 ${isExpanded ? 'mt-3' : ''}`}>
                    {/* Quick Pause Button - Only when playing and not expanded */}
                    {isPlaying && !isExpanded && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                            }}
                            className="w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-red-500 hover:bg-red-600 text-white"
                            aria-label="Pausar radio"
                        >
                            <Pause className="w-5 h-5" />
                        </Button>
                    )}

                    {/* Main Button */}
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isPlaying
                            ? 'bg-[#F4C95D] text-[#0f172a] ring-4 ring-[#F4C95D]/30'
                            : isExpanded
                                ? 'bg-slate-200 dark:bg-[#0f172a] text-slate-600 dark:text-gray-400 border-2 border-slate-300 dark:border-gray-600'
                                : 'bg-white dark:bg-[#1e293b] text-[#d4a33d] dark:text-[#F4C95D] border-2 border-[#d4a33d] dark:border-[#F4C95D]'
                            }`}
                        aria-label={isExpanded ? "Cerrar menú" : "Abrir menú de medios"}
                    >
                        {isPlaying ? (
                            <div className="flex gap-1 h-4 items-end">
                                <div className="w-1 bg-black animate-[bounce_1s_infinite] h-2"></div>
                                <div className="w-1 bg-black animate-[bounce_1.2s_infinite] h-4"></div>
                                <div className="w-1 bg-black animate-[bounce_0.8s_infinite] h-3"></div>
                            </div>
                        ) : isExpanded ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Radio className="w-6 h-6" />
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FloatingAudioPlayer;
