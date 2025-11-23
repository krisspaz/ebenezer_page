import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import LiveStreamSection from "@/components/LiveStreamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <EventsSection />
      <LiveStreamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
