import AboutMeSkillsBarChart from "@/components/AboutMe/AboutMeSkillsBarChart";
import AboutText from "@/components/AboutMe/AboutText";
import BackgroundTransition from "@/components/BackgroundTransition";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import GalleryProjects from "@/components/Projects/GalleryProjects";
import HomePage from "@/components/HomePage";
import LatestsProjects from "@/components/Projects/LatestsProjects";
import Navbar from "@/components/Navbar";
import WSMAQuote from "@/components/WSMAQuote";

export default function LandingPage() {
  return (
    <>
      <Cursor />
      <BackgroundTransition />
      <Navbar />
      <main id="main-content">
        <HomePage />
        <div className="bg-[var(--background)]">
          <GalleryProjects />
        </div>
        <div className="bg-[var(--background)]">
          <AboutText />
        </div>
        <div className="bg-[var(--background)]">
          <AboutMeSkillsBarChart />
        </div>
        <div>
          <WSMAQuote />
        </div>
        <div className="min-h-[100dvh] bg-[var(--background)]">
          <LatestsProjects />
        </div>
      </main>
      <Footer />
    </>
  );
}
