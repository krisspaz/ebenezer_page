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
        const text = `🙏 Petición: "${prayer.text}" - ${prayer.author}`;
        if (navigator.share) {
            try { await navigator.share({ text }); } catch { /* cancelled */ }
        } else {
            await navigator.clipboard.writeText(text);
            toast.success("Copiado al portapapeles");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPrayer.name.trim() || !newPrayer.text.trim()) return toast.error("Completa todos los campos");
        setIsSubmitting(true);
        setTimeout(() => {
            setPrayers([{ id: Date.now(), author: newPrayer.name.trim(), text: newPrayer.text.trim(), likes: 0, shares: 0, prayers: 0, time: "Ahora mismo", timestamp: Date.now(), liked: false, prayed: false }, ...prayers]);
            setNewPrayer({ name: "", text: "" });
            setShowModal(false);
            setIsSubmitting(false);
            toast.success("¡Petición publicada! 🙏");
        }, 500);
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#0f172a] dark:to-[#1e293b]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">{t('prayer.title', 'Muro de Oración')}</h2>
                    <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">{t('prayer.subtitle', 'Oramos unos por otros.')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div onClick={() => setShowModal(true)} className="bg-white dark:bg-[#1e293b] border border-teal-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:border-teal-500/60 transition-all min-h-[200px]">
                        <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center"><Send className="w-6 h-6 text-teal-600 dark:text-[#14b8a6]" /></div>
                        <h3 className="text-slate-800 dark:text-white font-bold text-lg">Publicar Petición</h3>
                        <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white font-bold">Publicar</Button>
                    </div>
                    {prayers.map((prayer) => (
                        <div key={prayer.id} className="bg-white/80 dark:bg-[#1e293b]/80 border border-slate-200 dark:border-[#F4C95D]/10 rounded-2xl p-6">
                            <div className="flex justify-between mb-4"><span className="font-bold text-slate-800 dark:text-white">{prayer.author}</span><span className="text-xs text-slate-500">{prayer.time}</span></div>
                            <p className="text-slate-600 dark:text-gray-300 mb-6">"{prayer.text}"</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <button onClick={() => handleLike(prayer.id)} className={`flex items-center gap-2 ${prayer.liked ? 'text-red-500' : ''}`}><Heart className={`w-4 h-4 ${prayer.liked ? 'fill-current' : ''}`} /> {prayer.likes}</button>
                                <button onClick={() => handlePray(prayer.id, prayer.author)} className={`flex items-center gap-2 ${prayer.prayed ? 'text-teal-600' : ''}`}><MessageSquare className="w-4 h-4" /> {prayer.prayers > 0 && prayer.prayers} Orar</button>
                                <button onClick={() => handleShare(prayer)} className="flex items-center gap-2 ml-auto"><Share2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white dark:bg-[#1e293b] rounded-2xl w-full max-w-md p-6">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2"><X className="w-5 h-5" /></button>
                        <div className="text-center mb-6">
                            <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4"><Send className="w-6 h-6 text-teal-600" /></div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Publicar Petición</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Tu nombre" value={newPrayer.name} onChange={(e) => setNewPrayer({ ...newPrayer, name: e.target.value })} required />
                            <Textarea placeholder="Tu petición..." value={newPrayer.text} onChange={(e) => setNewPrayer({ ...newPrayer, text: e.target.value })} className="min-h-[100px]" required />
                            <div className="flex gap-3">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancelar</Button>
                                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">{isSubmitting ? 'Publicando...' : 'Publicar'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PrayerWall;
