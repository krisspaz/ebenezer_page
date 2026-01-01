import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import SEO from "../components/SEO";

const RhemaTVPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-white flex flex-col">
            <SEO
                title="Rhema TV | Ebenezer Cobán"
                description="Señal en vivo de Rhema TV. Disfruta de nuestra programación y servicios en directo."
                url="/rhema-tv"
            />
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 md:px-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white drop-shadow-sm">
                            Rhema <span className="text-[#F4C95D]">TV</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Disfruta de nuestra señal en vivo las 24 horas del día.
                        </p>
                    </div>

                    {/* TV Player Container */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black">
                        <iframe
                            src="https://www.rtv.live/"
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Rhema TV En Vivo"
                        />
                    </div>

                    {/* Info Note */}
                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>Si la transmisión no inicia automáticamente, por favor presiona play.</p>
                    </div>
                </div>
            </main>

            <FloatingAudioPlayer />
            <Footer />
        </div>
    );
};

export default RhemaTVPage;
