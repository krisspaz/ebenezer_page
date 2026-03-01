import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import SEO from "../components/SEO";

type Category = "celular" | "monitor" | "tablet";

interface Fondo {
    id: number;
    src: string;
    alt: string;
    category: Category;
}

const fondos: Fondo[] = [
    // Celular Wallpapers
    { id: 1, src: "/fondos/celular/01.PNG", alt: "Celular Wallpaper 01", category: "celular" },
    { id: 2, src: "/fondos/celular/02.PNG", alt: "Celular Wallpaper 02", category: "celular" },
    { id: 3, src: "/fondos/celular/03.PNG", alt: "Celular Wallpaper 03", category: "celular" },
    { id: 4, src: "/fondos/celular/04.PNG", alt: "Celular Wallpaper 04", category: "celular" },
    { id: 5, src: "/fondos/celular/05.PNG", alt: "Celular Wallpaper 05", category: "celular" },
    // Monitor Wallpapers
    { id: 6, src: "/fondos/monitor/01.PNG", alt: "Monitor Wallpaper 01", category: "monitor" },
    { id: 7, src: "/fondos/monitor/02.PNG", alt: "Monitor Wallpaper 02", category: "monitor" },
    { id: 8, src: "/fondos/monitor/03.PNG", alt: "Monitor Wallpaper 03", category: "monitor" },
    { id: 9, src: "/fondos/monitor/04.PNG", alt: "Monitor Wallpaper 04", category: "monitor" },
    { id: 10, src: "/fondos/monitor/05.PNG", alt: "Monitor Wallpaper 05", category: "monitor" },
    // Tablet Wallpapers
    { id: 11, src: "/fondos/tablet/01.PNG", alt: "Tablet Wallpaper 01", category: "tablet" },
    { id: 12, src: "/fondos/tablet/02.PNG", alt: "Tablet Wallpaper 02", category: "tablet" },
    { id: 13, src: "/fondos/tablet/03.PNG", alt: "Tablet Wallpaper 03", category: "tablet" },
    { id: 14, src: "/fondos/tablet/04.PNG", alt: "Tablet Wallpaper 04", category: "tablet" },
    { id: 15, src: "/fondos/tablet/05.PNG", alt: "Tablet Wallpaper 05", category: "tablet" },
];

const categories: { key: Category; label: string; icon: JSX.Element; aspect: string; gridCols: string }[] = [
    {
        key: "celular",
        label: "Celular",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
            </svg>
        ),
        aspect: "aspect-[9/16]",
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    },
    {
        key: "monitor",
        label: "Monitor",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
        ),
        aspect: "aspect-[16/9]",
        gridCols: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    },
    {
        key: "tablet",
        label: "Tablet",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                <line x1="12" x2="12.01" y1="18" y2="18" />
            </svg>
        ),
        aspect: "aspect-[3/4]",
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    },
];

const FondosPage = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("celular");

    const filteredFondos = fondos.filter((f) => f.category === activeCategory);
    const activeCat = categories.find((c) => c.key === activeCategory)!;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-yellow-500/30">
            <SEO
                title="Fondos y Recursos | Ebenezer Cobán"
                description="Explora y descarga hermosos fondos de pantalla y recursos gráficos de Ministerios Ebenezer."
            />

            <Navbar />

            <main className="flex-grow pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
                            <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider">
                                Recursos Visuales
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
                                Fondos
                            </span> de Pantalla
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
                            Explora y descarga nuestros recursos gráficos diseñados especialmente para bendecirte y acompañarte en tu día a día.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Tabs */}
                <ScrollReveal>
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-lg shadow-slate-200/50 dark:shadow-black/20 backdrop-blur-sm">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.key;
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setActiveCategory(cat.key)}
                                        className={`
                                            relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300
                                            ${isActive
                                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md shadow-yellow-500/25"
                                                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                                            }
                                        `}
                                    >
                                        {cat.icon}
                                        {cat.label}
                                        {isActive && (
                                            <span className="ml-1 px-2 py-0.5 rounded-md bg-slate-900/15 text-[10px] font-extrabold">
                                                {filteredFondos.length}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Gallery Section - dynamic grid based on category */}
                <div className={`grid ${activeCat.gridCols} gap-8`}>
                    {filteredFondos.map((fondo, index) => (
                        <ScrollReveal key={fondo.id} delay={index * 0.05} variant="fadeUp">
                            <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                                {/* Category Tag */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-tighter border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {activeCat.label}
                                    </span>
                                </div>

                                {/* Image Container */}
                                <div className={`${activeCat.aspect} w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative`}>
                                    <img
                                        src={fondo.src}
                                        alt={fondo.alt}
                                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                    {/* Overlay Gradient on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <p className="text-white font-bold text-lg mb-4 drop-shadow-lg">{fondo.alt}</p>
                                    <a
                                        href={fondo.src}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_10px_20px_rgba(234,179,8,0.3)]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" x2="12" y1="15" y2="3" />
                                        </svg>
                                        Descargar
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}

                    {/* Decorative Card */}
                    <ScrollReveal delay={0.4} variant="fadeUp">
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800/80 text-center bg-slate-100/30 dark:bg-slate-900/20 group hover:border-yellow-500/30 transition-colors">
                            <div className="w-20 h-20 mb-6 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Más contenido en camino</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto leading-relaxed">Constantemente añadimos nuevos recursos para que bendigas tu vida.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FondosPage;
