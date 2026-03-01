import Navbar from "../components/Navbar";
import MinistriesSection from "../components/MinistriesSection";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import BackToTop from "../components/ui/BackToTop";
import SEO from "../components/SEO";

const MinistriesPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-yellow-500/30">
            <SEO
                title="Nuestros Ministerios | Iglesia Ebenezer Cobán"
                description="Conoce las áreas de servicio y ministerios de Iglesia Ebenezer Cobán. Únete y sirve al Señor con tus dones."
                url="/ministerios"
            />
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
