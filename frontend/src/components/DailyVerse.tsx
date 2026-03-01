import { useEffect, useState } from "react";
import { Share2, Facebook, MessageCircle, Copy, Sparkles, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { fetchDailyVerse, getVerseProgress } from "../services/dailyVerse";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const DailyVerse = () => {
    const { t } = useTranslation();
    const [verse, setVerse] = useState<{ reference: string; text: string; translation: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const progress = getVerseProgress();

    useEffect(() => {
        const loadVerse = async () => {
            try {
                const data = await fetchDailyVerse();
                setVerse(data);
            } catch (error) {
                console.error("Error loading verse:", error);
            } finally {
                setLoading(false);
            }
        };

        loadVerse();
    }, []);

    const shareToFacebook = () => {
        if (!verse) return;
        const text = `"${verse.text}" - ${verse.reference}`;
        const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "width=600,height=400");
    };

    const shareToX = () => {
        if (!verse) return;
        const text = `"${verse.text.substring(0, 200)}..." - ${verse.reference}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "width=600,height=400");
    };

    const shareToInstagram = async () => {
        if (!verse) return;
        const text = `📖 ${verse.reference}\n\n"${verse.text}"\n\n#versiculodeldia #biblia #fe`;
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Texto copiado. Pégalo en Instagram 📸");
            window.open("https://www.instagram.com/", "_blank");
        } catch {
            toast.error("Error al copiar");
        }
    };

    const shareToWhatsApp = () => {
        if (!verse) return;
        const text = `📖 *${t('dailyVerse.title')}*\n\n"${verse.text}"\n\n— ${verse.reference} (${verse.translation})`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const copyToClipboard = async () => {
        if (!verse) return;
        const text = `"${verse.text}"\n\n— ${verse.reference} (${verse.translation})`;

        try {
            await navigator.clipboard.writeText(text);
            toast.success(t('dailyVerse.copied'));
        } catch (error) {
            toast.error(t('common.error'));
        }
    };

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#1e293b] dark:to-[#0f172a] transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-slate-200 dark:bg-[#1e293b] rounded w-48 mx-auto mb-6"></div>
                            <div className="h-32 bg-slate-200 dark:bg-[#1e293b] rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!verse) return null;

    return (
        <section className="py-16 relative overflow-hidden transition-colors duration-300">
            {/* Background with parallax-like feel */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-[#0b1120]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507692049790-de58293a4697?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-10 mix-blend-overlay" />

            {/* Ambient Gradients - Reduced size */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F4C95D]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F4C95D]/20 border border-[#F4C95D]/30 px-4 py-2 rounded-full mb-4 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-[#d4a33d] dark:text-[#F4C95D]" />
                            <span className="text-[#d4a33d] dark:text-[#F4C95D] font-bold text-xs uppercase tracking-widest">
                                {t('dailyVerse.title')}
                            </span>
                        </div>
                    </motion.div>

                    {/* Verse Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#F4C95D]/30 via-teal-500/30 to-[#F4C95D]/30 rounded-[2rem] blur-sm opacity-30 dark:opacity-50" />

                        <div className="relative bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl p-6 md:p-10 rounded-[1.8rem] border border-white/50 dark:border-white/10 shadow-xl">

                            {/* Quote Icon */}
                            <div className="absolute top-6 left-6 text-[#F4C95D]/20 font-serif text-6xl leading-none select-none">
                                "
                            </div>

                            {/* Verse Text */}
                            <blockquote className="relative z-10 mb-6 text-center px-4">
                                <p className="text-xl md:text-2xl font-serif text-slate-800 dark:text-white leading-relaxed font-medium">
                                    {verse.text}
                                </p>
                            </blockquote>

                            {/* Divider */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#F4C95D] to-transparent" />
                            </div>

                            {/* Reference */}
                            <div className="text-center mb-8">
                                <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-1 font-heading tracking-wide">
                                    {verse.reference}
                                </p>
                                <p className="text-xs font-medium text-[#d4a33d] dark:text-[#F4C95D] uppercase tracking-widest">
                                    {verse.translation}
                                </p>
                            </div>

                            {/* Sharing Actions - Compact */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-slate-100 dark:border-white/5 pt-6">
                                <p className="text-xs text-slate-400 dark:text-gray-500 mb-1 sm:mb-0 sm:mr-2 font-medium uppercase tracking-wider">Compartir:</p>
                                <div className="flex flex-wrap justify-center gap-1">
                                    <Button
                                        onClick={shareToFacebook}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 gap-1.5 hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors text-xs"
                                    >
                                        <Facebook className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Facebook</span>
                                    </Button>

                                    <Button
                                        onClick={shareToInstagram}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 gap-1.5 hover:bg-[#E4405F]/10 hover:text-[#E4405F] transition-colors text-xs"
                                    >
                                        <Instagram className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Instagram</span>
                                    </Button>

                                    <Button
                                        onClick={shareToWhatsApp}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 gap-1.5 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors text-xs"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">WhatsApp</span>
                                    </Button>

                                    <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

                                    <Button
                                        onClick={copyToClipboard}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-3 gap-1.5 hover:bg-[#F4C95D]/10 hover:text-[#d4a33d] dark:hover:text-[#F4C95D] transition-colors text-xs"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">{t('dailyVerse.copy')}</span>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Progress Text */}
                    <div className="text-center mt-6">
                        <p className="text-[10px] font-medium text-slate-400 dark:text-gray-600 uppercase tracking-widest opacity-60">
                            Versículo del día · {progress.current} / {progress.total}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DailyVerse;
