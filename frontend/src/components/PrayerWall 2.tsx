import { useState, useEffect } from "react";
import { MessageSquare, Heart, Share2, Send, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Prayer {
    id: number;
    author: string;
    text: string;
    likes: number;
    shares: number;
    prayers: number;
    time: string;
    timestamp: number;
    liked?: boolean;
    prayed?: boolean;
}

const STORAGE_KEY = 'ebenezer_prayer_requests';

// Default prayers to show if none exist
const defaultPrayers: Prayer[] = [
    {
        id: 1,
        author: "María G.",
        text: "Pido oración por la salud de mi madre, que Dios obre sanidad completa.",
        likes: 12,
        shares: 3,
        prayers: 25,
        time: "Hace 2 horas",
        timestamp: Date.now() - 7200000,
        liked: false,
        prayed: false
    },
    {
        id: 2,
        author: "Juan C.",
        text: "Por una oportunidad laboral, confío en que Dios abrirá puertas.",
        likes: 8,
        shares: 1,
        prayers: 15,
        time: "Hace 4 horas",
        timestamp: Date.now() - 14400000,
        liked: false,
        prayed: false
    }
];

// Helper to get relative time
const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Ahora mismo";
    if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Hace ${days} día${days > 1 ? 's' : ''}`;
};

const PrayerWall = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [newPrayer, setNewPrayer] = useState({ name: "", text: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [prayers, setPrayers] = useState<Prayer[]>([]);

    // Load prayers from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Prayer[];
                const updated = parsed.map(p => ({
                    ...p,
                    time: getRelativeTime(p.timestamp)
                }));
                setPrayers(updated);
            } catch {
                setPrayers(defaultPrayers);
            }
        } else {
            setPrayers(defaultPrayers);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrayers));
        }
    }, []);

    // Save prayers to localStorage whenever they change
    useEffect(() => {
        if (prayers.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
        }
    }, [prayers]);

    // Update relative times every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setPrayers(current =>
                current.map(p => ({
                    ...p,
                    time: getRelativeTime(p.timestamp)
                }))
            );
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleLike = (id: number) => {
        setPrayers(prayers.map(prayer => {
            if (prayer.id === id) {
                return {
                    ...prayer,
                    likes: prayer.liked ? prayer.likes - 1 : prayer.likes + 1,
                    liked: !prayer.liked
                };
            }
            return prayer;
        }));
    };

    const handlePray = (id: number, author: string) => {
        setPrayers(prayers.map(prayer => {
            if (prayer.id === id) {
                if (!prayer.prayed) {
                    toast.success(`🙏 Orando por ${author}`, {
                        description: "Gracias por orar por esta petición"
                    });
                }
                return {
                    ...prayer,
                    prayers: prayer.prayed ? prayer.prayers - 1 : prayer.prayers + 1,
                    prayed: !prayer.prayed
                };
            }
            return prayer;
        }));
    };

    const handleShare = async (prayer: Prayer) => {
        const text = `🙏 Petición de oración: "${prayer.text}" - ${prayer.author}\n\nOremos juntos por esta petición.`;
        if (navigator.share) {
            try {
                await navigator.share({ text });
                setPrayers(prayers.map(p =>
                    p.id === prayer.id ? { ...p, shares: p.shares + 1 } : p
                ));
            } catch {
                // User cancelled share
            }
        } else {
            await navigator.clipboard.writeText(text);
            toast.success("Petición copiada al portapapeles");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPrayer.name.trim() || !newPrayer.text.trim()) {
            toast.error("Por favor completa todos los campos");
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const newPrayerEntry: Prayer = {
                id: Date.now(),
                author: newPrayer.name.trim(),
                text: newPrayer.text.trim(),
                likes: 0,
                shares: 0,
                prayers: 0,
                time: "Ahora mismo",
                timestamp: Date.now(),
                liked: false,
                prayed: false
            };

            setPrayers([newPrayerEntry, ...prayers]);
            setNewPrayer({ name: "", text: "" });
            setShowModal(false);
            setIsSubmitting(false);
            toast.success("¡Petición publicada! Estamos orando contigo 🙏");
        }, 800);
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#0f172a] dark:to-[#1e293b] relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                        {t('prayer.title', 'Muro de Oración')}
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        {t('prayer.subtitle', 'Oramos unos por otros. "La oración eficaz del justo puede mucho."')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add Prayer Card - First */}
                    <div
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-br from-white to-slate-50 dark:from-[#1e293b] dark:to-[#0f172a] border border-teal-500/30 dark:border-[#14b8a6]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-teal-500/60 dark:hover:border-[#14b8a6]/60 transition-all duration-300 hover:shadow-lg min-h-[200px]"
                    >
                        <div className="w-14 h-14 rounded-full bg-teal-500/20 dark:bg-[#14b8a6]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Send className="w-6 h-6 text-teal-600 dark:text-[#14b8a6]" />
                        </div>
                        <h3 className="text-slate-800 dark:text-white font-bold text-lg">{t('prayer.postRequest', 'Publicar Petición')}</h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">{t('prayer.shareLoad', 'Comparte tu carga con nosotros')}</p>
                        <Button variant="outline" className="border-teal-500 dark:border-[#14b8a6] text-teal-600 dark:text-[#14b8a6] hover:bg-teal-500 dark:hover:bg-[#14b8a6] hover:text-white dark:hover:text-[#0f172a] font-bold mt-2">
                            {t('prayer.postRequest', 'Publicar')}
                        </Button>
                    </div>

                    {/* Prayer Cards */}
                    {prayers.map((prayer) => (
                        <div key={prayer.id} className="bg-white/80 dark:bg-[#1e293b]/80 border border-slate-200 dark:border-[#F4C95D]/10 rounded-2xl p-6 backdrop-blur-sm hover:border-[#d4a33d]/30 dark:hover:border-[#F4C95D]/30 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-slate-800 dark:text-white">{prayer.author}</span>
                                <span className="text-xs text-slate-500 dark:text-gray-500">{prayer.time}</span>
                            </div>
                            <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">"{prayer.text}"</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-gray-500">
                                <button
                                    onClick={() => handleLike(prayer.id)}
                                    className={`flex items-center gap-2 transition-colors ${prayer.liked ? 'text-red-500' : 'hover:text-[#d4a33d] dark:hover:text-[#F4C95D]'}`}
                                >
                                    <Heart className={`w-4 h-4 ${prayer.liked ? 'fill-current' : ''}`} /> {prayer.likes}
                                </button>
                                <button
                                    onClick={() => handlePray(prayer.id, prayer.author)}
                                    className={`flex items-center gap-2 transition-colors ${prayer.prayed ? 'text-teal-600 dark:text-[#14b8a6]' : 'hover:text-teal-600 dark:hover:text-[#14b8a6]'}`}
                                >
                                    <MessageSquare className={`w-4 h-4 ${prayer.prayed ? 'fill-current' : ''}`} />
                                    {prayer.prayers > 0 && <span>{prayer.prayers}</span>}
                                    {t('prayer.prayForYou', 'Orar')}
                                </button>
                                <button
                                    onClick={() => handleShare(prayer)}
                                    className="flex items-center gap-2 hover:text-slate-800 dark:hover:text-white transition-colors ml-auto"
                                >
                                    <Share2 className="w-4 h-4" /> {prayer.shares > 0 && prayer.shares}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for new prayer request */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />

                    <div className="relative bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-14 h-14 rounded-full bg-teal-500/20 dark:bg-[#14b8a6]/20 flex items-center justify-center mx-auto mb-4">
                                <Send className="w-6 h-6 text-teal-600 dark:text-[#14b8a6]" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Publicar Petición de Oración</h3>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Comparte tu carga, estamos contigo</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Tu nombre
                                </label>
                                <Input
                                    placeholder="Ej: María G."
                                    value={newPrayer.name}
                                    onChange={(e) => setNewPrayer({ ...newPrayer, name: e.target.value })}
                                    className="bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Tu petición de oración
                                </label>
                                <Textarea
                                    placeholder="Escribe tu petición aquí..."
                                    value={newPrayer.text}
                                    onChange={(e) => setNewPrayer({ ...newPrayer, text: e.target.value })}
                                    className="bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-white/10 text-slate-800 dark:text-white min-h-[120px] resize-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 border-slate-300 dark:border-white/10 text-slate-600 dark:text-gray-400"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-teal-500 dark:bg-[#14b8a6] hover:bg-teal-600 dark:hover:bg-[#0d9488] text-white font-bold"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Publicando...
                                        </span>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Publicar
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <p className="text-xs text-center text-slate-400 dark:text-gray-500 mt-4">
                            🙏 Tu petición será guardada y visible para la comunidad
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PrayerWall;
