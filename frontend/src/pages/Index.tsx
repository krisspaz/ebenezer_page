import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MinistriesSection from "../components/MinistriesSection";
import AboutSection from "../components/AboutSection";
import EventsSection from "../components/EventsSection";
import LiveStreamSection from "../components/LiveStreamSection";
import PrayerWall from "../components/PrayerWall";
import DailyVerse from "../components/DailyVerse";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import BackToTop from "../components/ui/BackToTop";

import { RhemaSection } from "../components/RhemaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-yellow-500/30">
      <Navbar />
      <main id="main-content">
        <Hero />
        <ScrollReveal variant="fadeUp"><DailyVerse /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><MinistriesSection /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><AboutSection /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><RhemaSection isHome={true} /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><EventsSection /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><LiveStreamSection /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><PrayerWall /></ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.1}><ContactSection /></ScrollReveal>
      </main>
      <Footer />
      <FloatingAudioPlayer />
      <BackToTop />
    </div>
  );
};

export default Index;
