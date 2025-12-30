import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import SEO from "../components/SEO";
import ScrollReveal from "../components/ui/ScrollReveal";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-yellow-500/30">
            <SEO
                title="Sobre Nosotros | Iglesia de Cristo Ebenezer Cobán"
                description="Conoce nuestra historia, visión, misión y valores. Somos una congregación dedicada a expandir la Palabra de Dios."
            />
            <Navbar />
            <main className="pt-20"> {/* Add padding top for fixed navbar */}
                <ScrollReveal variant="fadeUp">
                    <AboutSection />
                </ScrollReveal>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
