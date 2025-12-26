import { useState, useEffect } from "react";
import { MessageSquare, Heart, Share2, Send, X, Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
    isAnonymous?: boolean;
}

const STORAGE_KEY = 'ebenezer_prayer_requests';

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
        prayed: false,
        isAnonymous: false
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
        prayed: false,
        isAnonymous: false
    }
];

const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "Ahora mismo";
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    return `Hace ${days} d`;
};

const PrayerCard = ({ prayer, onLike, onPray, onShare }: { prayer: Prayer; onLike: (id: number) => void; onPray: (id: number, author: string) => void; onShare: (p: Prayer) => void }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl rounded-[1.5rem] p-6 border border-white/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${prayer.isAnonymous ? 'bg-slate-200 text-slate-500' : 'bg-[#F4C95D]/20 text-[#d4a33d]'}`}>
                        {prayer.isAnonymous ? '?' : prayer.author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                            {prayer.isAnonymous ? "Anónimo" : prayer.author}
                        </h4>
                        <span className="text-xs text-slate-400 dark:text-gray-500">{prayer.time}</span>
                    </div>
                </div>
            </div>

            <p className="text-slate-700 dark:text-gray-200 mb-6 font-serif text-lg leading-relaxed">
                "{prayer.text}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex gap-4">
                    <button
                        onClick={() => onLike(prayer.id)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${prayer.liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
                    >
                        <Heart className={`w-4 h-4 ${prayer.liked ? 'fill-current' : ''}`} />
                        <span>{prayer.likes}</span>
                    </button>

                    <button
                        onClick={() => onPray(prayer.id, prayer.isAnonymous ? "esta petición" : prayer.author)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${prayer.prayed ? 'text-teal-500' : 'text-slate-400 hover:text-teal-500'}`}
                    >
                        <Sparkles className={`w-4 h-4 ${prayer.prayed ? 'fill-current' : ''}`} />
                        <span>{prayer.prayers}</span>
                    </button>
                </div>

                <button
                    onClick={() => onShare(prayer)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

const PrayerWall = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [newPrayer, setNewPrayer] = useState({ name: "", text: "", isAnonymous: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [prayers, setPrayers] = useState<Prayer[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Prayer[];
                setPrayers(parsed.map(p => ({ ...p, time: getRelativeTime(p.timestamp) })));
            } catch {
                setPrayers(defaultPrayers);
            }
        } else {
            setPrayers(defaultPrayers);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPrayers));
        }
    }, []);

    useEffect(() => {
        if (prayers.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers));
    }, [prayers]);

    const handleLike = (id: number) => {
        setPrayers(prayers.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
    };

    const handlePray = (id: number, author: string) => {
        setPrayers(prayers.map(p => {
            if (p.id === id) {
                if (!p.prayed) toast.success(`🙏 Orando por ${author}`);
                return { ...p, prayers: p.prayed ? p.prayers - 1 : p.prayers + 1, prayed: !p.prayed };
            }
            return p;
        }));
    };

    const handleShare = async (prayer: Prayer) => {
        const authorName = prayer.isAnonymous ? "Anónimo" : prayer.author;
        const text = `🙏 Petición de Oración:\n\n"${prayer.text}"\n- ${authorName}`;

        if (navigator.share) {
            try { await navigator.share({ text }); } catch { /* cancelled */ }
        } else {
            await navigator.clipboard.writeText(text);
            toast.success("Copiado al portapapeles");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((!newPrayer.isAnonymous && !newPrayer.name.trim()) || !newPrayer.text.trim()) {
            return toast.error("Por favor completa los campos requeridos");
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const prayer: Prayer = {
                id: Date.now(),
                author: newPrayer.isAnonymous ? "Anónimo" : newPrayer.name.trim(),
                text: newPrayer.text.trim(),
                likes: 0,
                shares: 0,
                prayers: 0,
                time: "Ahora mismo",
                timestamp: Date.now(),
                liked: false,
                prayed: false,
                isAnonymous: newPrayer.isAnonymous
            };

            setPrayers([prayer, ...prayers]);
            setNewPrayer({ name: "", text: "", isAnonymous: false });
            setShowModal(false);
            setIsSubmitting(false);
            toast.success("¡Tu petición ha sido publicada! 🙏");
        }, 600);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F4C95D]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="text-center md:text-left max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-800 dark:text-white mb-4">
                            {t('prayer.title', 'Muro de Oración')}
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-lg">
                            {t('prayer.subtitle', 'Un espacio para llevar las cargas los unos de los otros.')}
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => setShowModal(true)}
                            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-teal-600/20"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Publicar Petición
                        </Button>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {prayers.map((prayer) => (
                            <PrayerCard
                                key={prayer.id}
                                prayer={prayer}
                                onLike={handleLike}
                                onPray={handlePray}
                                onShare={handleShare}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white dark:bg-[#1e293b] rounded-[2rem] w-full max-w-lg p-8 shadow-2xl overflow-hidden"
                        >
                            {/* Modal Gradient Line */}
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#F4C95D] to-teal-500" />

                            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8">
                                <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-2">
                                    Nueva Petición
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm">
                                    Comparte tu carga para que podamos orar contigo.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                                            Tu Nombre
                                        </label>
                                        <div className="ml-auto flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id="anonymous"
                                                checked={newPrayer.isAnonymous}
                                                onChange={(e) => setNewPrayer({ ...newPrayer, isAnonymous: e.target.checked })}
                                                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                            />
                                            <label htmlFor="anonymous" className="text-xs text-slate-500 cursor-pointer select-none">
                                                Publicar como anónimo
                                            </label>
                                        </div>
                                    </div>

                                    {!newPrayer.isAnonymous && (
                                        <Input
                                            placeholder="Ej. Juan Pérez"
                                            value={newPrayer.name}
                                            onChange={(e) => setNewPrayer({ ...newPrayer, name: e.target.value })}
                                            className="bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-slate-800"
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                                        Tu Petición
                                    </label>
                                    <Textarea
                                        placeholder="Escribe tu petición aquí con confianza..."
                                        value={newPrayer.text}
                                        onChange={(e) => setNewPrayer({ ...newPrayer, text: e.target.value })}
                                        className="min-h-[120px] bg-slate-50 dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 resize-none text-base"
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button type="button" variant="ghost" onClick={() => setShowModal(false)} className="flex-1">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-600/20">
                                        {isSubmitting ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Publicar Petición'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PrayerWall;
