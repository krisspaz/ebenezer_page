import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isMounted) return null; // Avoid hydration mismatch

    // Check if target is reached
    if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
    ) {
        return (
            <div className="text-yellow-400 font-bold text-xl py-4 animate-pulse">
                ¡El retiro ha comenzado!
            </div>
        );
    }

    const timeBlocks = [
        { label: "DÍAS", value: timeLeft.days },
        { label: "HORAS", value: timeLeft.hours },
        { label: "MINUTOS", value: timeLeft.minutes },
        { label: "SEGUNDOS", value: timeLeft.seconds },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-8 mb-4">
            {timeBlocks.map((block, index) => (
                <div key={block.label} className="flex flex-col items-center group">
                    <div className="relative mb-2">
                        <span className="text-3xl md:text-5xl font-extralight text-white font-mono tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {block.value.toString().padStart(2, "0")}
                        </span>

                        {/* Subtle decorative underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.1, duration: 1 }}
                            className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mt-1"
                        />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 tracking-[0.4em] uppercase transition-colors group-hover:text-yellow-500">
                        {block.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
