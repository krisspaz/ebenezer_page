import Navbar from "../components/Navbar";
import MinistriesSection from "../components/MinistriesSection";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import BackToTop from "../components/ui/BackToTop";

const MinistriesPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-yellow-500/30">
            <Navbar />
            <main id="main-content" className="pt-20">
                <MinistriesSection isHome={false} />
            </main>
            <Footer />
            <FloatingAudioPlayer />
            <BackToTop />
        </div>
    );
};

export default MinistriesPage;
