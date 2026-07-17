import BackgroundShader from "./components/BackgroundShader";
import NoiseSVG from "./components/NoiseSVG";
import CursorSpotlight from "./components/CursorSpotlight";
import ScrollProgress from "./components/ScrollProgress";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import TechStackSection from "./components/TechStackSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CommandPalette from "./components/CommandPalette";
import ResumeViewer from "./components/ResumeViewer";

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <BackgroundShader />
      <NoiseSVG />
      <CursorSpotlight />
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10 flex flex-col pb-32 space-y-32 md:space-y-40">
        <HeroSection />
        <AboutSection />
        <div className="section-divider" />
        <ExperienceSection />
        <div className="section-divider" />
        <TechStackSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating elements */}
      <ScrollToTop />

      {/* Interactive overlays */}
      <CommandPalette />
      <ResumeViewer />
    </>
  );
}
