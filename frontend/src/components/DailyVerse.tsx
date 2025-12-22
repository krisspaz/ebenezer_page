import { useEffect, useState } from "react";
import { Share2, Facebook, Twitter, MessageCircle, Copy, Sparkles } from "lucide-react";
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

    const shareToTwitter = () => {
        if (!verse) return;
        const text = `"${verse.text.substring(0, 200)}..." - ${verse.reference}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "width=600,height=400");
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
        <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-[#1e293b] dark:to-[#0f172a] relative overflow-hidden transition-colors duration-300">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a33d]/5 dark:bg-[#F4C95D]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 dark:bg-[#14b8a6]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#d4a33d]/20 dark:bg-[#F4C95D]/20 px-4 py-2 rounded-full mb-4 border border-[#d4a33d]/30 dark:border-[#F4C95D]/30">
                            <Sparkles className="w-5 h-5 text-[#d4a33d] dark:text-[#F4C95D]" />
                            <span className="text-[#d4a33d] dark:text-[#F4C95D] font-semibold text-sm uppercase tracking-wide">
                                {t('dailyVerse.title')}
                            </span>
                        </div>
                    </motion.div>

                    {/* Verse Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl p-8 md:p-12 border border-[#d4a33d]/20 dark:border-[#F4C95D]/20"
                    >
                        {/* Verse Text */}
                        <blockquote className="mb-8">
                            <p className="text-2xl md:text-3xl font-serif text-slate-700 dark:text-gray-100 leading-relaxed text-center italic">
                                "{verse.text}"
                            </p>
                        </blockquote>

                        {/* Reference */}
                        <div className="text-center mb-8">
                            <p className="text-lg font-bold text-[#d4a33d] dark:text-[#F4C95D]">
                                — {verse.reference}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                                {verse.translation}
                            </p>
                        </div>

                        {/* Sharing Buttons */}
                        <div className="border-t border-slate-200 dark:border-[#1e293b] pt-6">
                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <Button
                                    onClick={shareToFacebook}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-slate-300 dark:border-[#1e293b] hover:bg-slate-100 dark:hover:bg-[#1e293b] hover:text-slate-800 dark:hover:text-white"
                                >
                                    <Facebook className="w-4 h-4 text-teal-600 dark:text-[#14b8a6]" />
                                    <span className="hidden sm:inline">Facebook</span>
                                </Button>

                                <Button
                                    onClick={shareToTwitter}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-slate-300 dark:border-[#1e293b] hover:bg-slate-100 dark:hover:bg-[#1e293b] hover:text-slate-800 dark:hover:text-white"
                                >
                                    <Twitter className="w-4 h-4 text-teal-600 dark:text-[#14b8a6]" />
                                    <span className="hidden sm:inline">Twitter</span>
                                </Button>

                                <Button
                                    onClick={shareToWhatsApp}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-slate-300 dark:border-[#1e293b] hover:bg-slate-100 dark:hover:bg-[#1e293b] hover:text-slate-800 dark:hover:text-white"
                                >
                                    <MessageCircle className="w-4 h-4 text-[#d4a33d] dark:text-[#F4C95D]" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                </Button>

                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-slate-300 dark:border-[#1e293b] hover:bg-slate-100 dark:hover:bg-[#1e293b] hover:text-slate-800 dark:hover:text-white"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span className="hidden sm:inline">{t('dailyVerse.copy')}</span>
                                </Button>
                            </div>

                            {/* Progress Indicator */}
                            <div className="text-center mt-6">
                                <p className="text-xs text-slate-500 dark:text-gray-500">
                                    Versículo {progress.current} de {progress.total} · Cambia mañana
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DailyVerse;
