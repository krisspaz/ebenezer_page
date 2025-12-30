import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, PartyPopper } from "lucide-react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const NewYearCountdown = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date("2026-01-01T00:00:00");
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
        >
            <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#F4C95D] to-[#d4a33d] rounded-xl flex items-center justify-center shadow-lg shadow-[#F4C95D]/20">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a]">
                        {value.toString().padStart(2, "0")}
                    </span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-[#F4C95D] to-[#d4a33d] rounded-xl blur opacity-30 -z-10" />
            </div>
            <span className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-medium uppercase tracking-wider">
                {label}
            </span>
        </motion.div>
    );

    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#F4C95D]/10 dark:bg-[#F4C95D]/20 px-4 py-2 rounded-full mb-4">
                            <PartyPopper className="w-5 h-5 text-[#F4C95D]" />
                            <span className="text-sm font-semibold text-[#d4a33d] dark:text-[#F4C95D]">
                                ¡PROCLAMA PROFETICA!
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-800 dark:text-white mb-4">
                            Culto de <span className="text-[#F4C95D]">PROCLAMA PROFETICA</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-[#d4a33d] dark:bg-[#F4C95D] mx-auto rounded-full mb-4" />
                        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Video Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                                <div className="aspect-video">
                                    <iframe
                                        src="https://www.youtube.com/embed/7NjF2EKCqts?autoplay=0&rel=0"
                                        title="PROCLAMA PROFETICA"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                                {/* Decorative glow */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#F4C95D]/20 to-teal-500/20 rounded-2xl blur-xl -z-10" />
                            </div>
                        </motion.div>

                        {/* Countdown Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center lg:text-left"
                        >
                            <div className="bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-[#F4C95D]/10 shadow-xl">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                                    <Clock className="w-6 h-6 text-[#F4C95D]" />
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                        Cuenta Regresiva
                                    </h3>
                                </div>

                                {/* Countdown Timer */}
                                <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                                    <TimeBox value={timeLeft.days} label="Días" />
                                    <TimeBox value={timeLeft.hours} label="Horas" />
                                    <TimeBox value={timeLeft.minutes} label="Min" />
                                    <TimeBox value={timeLeft.seconds} label="Seg" />
                                </div>

                                {/* Event Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400">
                                        <Calendar className="w-5 h-5 text-[#F4C95D] flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">31 de Diciembre, 2025</p>
                                            <p className="text-sm">Miércoles</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400">
                                        <Clock className="w-5 h-5 text-teal-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-slate-800 dark:text-white">10:00 PM - 12:30 AM</p>
                                            <p className="text-sm">Templo Principal</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <motion.a
                                    href="#contacto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F4C95D] to-[#d4a33d] text-[#0f172a] font-bold py-3 px-6 rounded-xl shadow-lg shadow-[#F4C95D]/20 hover:shadow-[#F4C95D]/40 transition-all duration-300"
                                >
                                    <PartyPopper className="w-5 h-5" />
                                    ¡Te Esperamos!
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewYearCountdown;
