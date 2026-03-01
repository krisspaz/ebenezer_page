import { useState, useEffect } from 'react';
import { Search, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { fetchRhemaMagazines, Magazine } from '@/services/rhema';

interface RhemaSectionProps {
    isHome?: boolean;
}

// Magazine Card Component with proper error handling
const MagazineCard = ({ mag, colorClass }: { mag: Magazine; colorClass: string }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <a
            href={mag.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <Card className="overflow-hidden border-0 bg-transparent shadow-none group-hover:-translate-y-2 transition-transform duration-300">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10">
                    {!imageError ? (
                        <img
                            src={mag.image}
                            alt={mag.title}
                            referrerPolicy="no-referrer"
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center p-6 text-center`}>
                            <div className="w-20 h-20 mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <span className="text-white/80 text-xs uppercase tracking-widest mb-2 font-medium">Revista Rhema</span>
                            <span className="text-white font-bold text-xl leading-tight">{mag.title}</span>
                            <div className="mt-4 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Leer Ahora
                        </span>
                    </div>
                </div>
                <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {mag.title}
                    </h3>
                </CardContent>
            </Card>
        </a>
    );
};

export const RhemaSection = ({ isHome = false }: RhemaSectionProps) => {
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [loading, setLoading] = useState(true);
    // Error state is less critical now as service returns fallback, but we keep it for potential future UI feedback
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Effect to load magazines on component mount.
     * Includes a simulated delay to showcase the Skeleton loading state (UX improvement),
     * providing a smoother visual transition for the user.
     */
    useEffect(() => {
        const loadMagazines = async () => {
            setLoading(true);
            try {
                const data = await fetchRhemaMagazines();
                setMagazines(data);
                if (data.length === 0) setError(true);
            } catch (err) {
                console.error("Error loading magazines:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadMagazines();
    }, []);

    // Extract year from title (e.g., "DICIEMBRE 2024" -> 2024)
    const extractYear = (title: string): string => {
        const match = title.match(/\b(20\d{2})\b/);
        return match ? match[1] : 'Otros';
    };

    // Group magazines by year
    const groupByYear = (mags: Magazine[]): Record<string, Magazine[]> => {
        return mags.reduce((acc, mag) => {
            const year = extractYear(mag.title);
            if (!acc[year]) acc[year] = [];
            acc[year].push(mag);
            return acc;
        }, {} as Record<string, Magazine[]>);
    };

    const filteredMagazines = magazines.filter(mag =>
        mag.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get grouped magazines for full page view
    const groupedMagazines = groupByYear(filteredMagazines);
    const sortedYears = Object.keys(groupedMagazines).sort((a, b) => {
        if (a === 'Otros') return 1;
        if (b === 'Otros') return -1;
        return parseInt(b) - parseInt(a);
    });

    // Show only first 4 if home, otherwise use grouped view
    const displayedMagazines = isHome ? magazines.slice(0, 4) : filteredMagazines;

    return (
        <section id="rhema" className="py-24 bg-slate-50 dark:bg-[#0b1120] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Edificación</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Revista Rhema
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Descubre nuestras ediciones mensuales llenas de palabra, enseñanza y profecía para tu vida.
                    </p>
                </div>

                {/* Search Bar */}
                {!isHome && (
                    <div className="max-w-md mx-auto mb-12 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Buscar revista por mes o año..."
                                className="pl-10 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Content - Home View (simple grid) */}
                {isHome && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))
                        ) : (
                            displayedMagazines.map((mag, index) => {
                                const gradientColors = [
                                    'from-blue-600 via-indigo-600 to-purple-700',
                                    'from-amber-500 via-orange-500 to-red-600',
                                    'from-emerald-500 via-teal-500 to-cyan-600',
                                    'from-rose-500 via-pink-500 to-purple-600',
                                ];
                                const colorClass = gradientColors[index % gradientColors.length];
                                return (
                                    <MagazineCard
                                        key={index}
                                        mag={mag}
                                        colorClass={colorClass}
                                    />
                                );
                            })
                        )}
                    </div>
                )}

                {/* Content - Full Page View (grouped by year) */}
                {!isHome && (
                    <div className="space-y-12">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="space-y-4">
                                        <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        ) : sortedYears.length > 0 ? (
                            sortedYears.map((year) => (
                                <div key={year}>
                                    {/* Year Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                                            {year}
                                        </h3>
                                        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
                                        <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                            {groupedMagazines[year].length} ediciones
                                        </span>
                                    </div>

                                    {/* Year Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                        {groupedMagazines[year].map((mag, index) => {
                                            const gradientColors = [
                                                'from-blue-600 via-indigo-600 to-purple-700',
                                                'from-amber-500 via-orange-500 to-red-600',
                                                'from-emerald-500 via-teal-500 to-cyan-600',
                                                'from-rose-500 via-pink-500 to-purple-600',
                                                'from-violet-600 via-purple-600 to-indigo-700',
                                                'from-cyan-500 via-blue-500 to-indigo-600',
                                            ];
                                            const colorClass = gradientColors[index % gradientColors.length];
                                            return (
                                                <MagazineCard
                                                    key={`${year}-${index}`}
                                                    mag={mag}
                                                    colorClass={colorClass}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                    <AlertCircle className="w-6 h-6 text-slate-400" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    No se encontraron revistas que coincidan con tu búsqueda.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {error && !loading && (
                    <p className="text-xs text-center text-slate-400 mt-8">
                        * Mostrando últimas ediciones disponibles.
                    </p>
                )}
            </div>
        </section>
    );
};
