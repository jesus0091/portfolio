import AboutMeSkillsBarChart from "@/components/AboutMe/AboutMeSkillsBarChart";
import AboutText from "@/components/AboutMe/AboutText";
import Footer from "@/components/Footer";
import GalleryProjects from "@/components/Projects/GalleryProjects";
import HomePage from "@/components/HomePage";
import LatestsProjects from "@/components/Projects/LatestsProjects";
import Navbar from "@/components/Navbar";
import WSMAQuote from "@/components/WSMAQuote";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomePage />
        <GalleryProjects />
        <AboutText />
        <AboutMeSkillsBarChart />
        <WSMAQuote />
        <LatestsProjects />
      </main>
      <Footer />
    </>
  );
}
