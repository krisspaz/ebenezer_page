import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import SEO from "../components/SEO";
import ReactPlayer from 'react-player';

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
                            Señal en vivo - Transmisión Directa
                        </p>
                    </div>

                    {/* TV Player Container */}
                    <div className="w-full bg-black shadow-2xl md:rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-video">
                        <ReactPlayer
                            url='https://5e85d90130e77.streamlock.net:443/6006/ngrp:6006_all/playlist.m3u8'
                            className='react-player'
                            width='100%'
                            height='100%'
                            controls={true}
                            playing={true}
                            start={1} // Start play immediately
                            config={{
                                file: {
                                    forceHLS: true,
                                }
                            }}
                        />
                    </div>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                        <p>Si la transmisión se detiene, por favor recarga la página o presiona play nuevamente.</p>
                    </div>
                </div>
            </main>

            <FloatingAudioPlayer />
            <Footer />
        </div>
    );
};

export default RhemaTVPage;
