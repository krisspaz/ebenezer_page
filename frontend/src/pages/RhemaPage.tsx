import Navbar from "../components/Navbar";
import { RhemaSection } from "../components/RhemaSection";
import Footer from "../components/Footer";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import BackToTop from "../components/ui/BackToTop";
import SEO from "../components/SEO";

const RhemaPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-yellow-500/30">
            <SEO
                title="Revista Rhema - Ediciones Digitales | Ebenezer Cobán"
                description="Colección digital de la Revista Rhema. Palabra revelada para la edificación del cuerpo de Cristo."
                url="/rhema"
            />
            <Navbar />
            <main id="main-content" className="pt-20">
                <RhemaSection isHome={false} />
            </main>
            <Footer />
            <FloatingAudioPlayer />
            <BackToTop />
        </div>
    );
};

export default RhemaPage;
