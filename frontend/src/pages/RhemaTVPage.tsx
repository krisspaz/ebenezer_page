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

            <main className="flex-grow pt-24 pb-12 px-0 md:px-6 flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white drop-shadow-sm">
                            Rhema <span className="text-[#F4C95D]">TV</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
                            Señal en vivo desde Ciudad de Guatemala
                        </p>
                    </div>

                    {/* TV Player Container */}
                    <div className="w-full bg-black shadow-2xl md:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                        {/* We use a taller aspect ratio to accommodate the external site headers if they exist */}
                        <div className="w-full h-[85vh] md:h-[800px]">
                            <iframe
                                src="https://www.rtv.live/"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Rhema TV En Vivo"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <FloatingAudioPlayer />
            <Footer />
        </div>
    );
};

export default RhemaTVPage;
