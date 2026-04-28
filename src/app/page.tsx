import AboutMeSkillsBarChart from "@/components/AboutMe/AboutMeSkillsBarChart";
import AboutText from "@/components/AboutMe/AboutText";
import Footer from "@/components/Footer";
import HomePage from "@/components/HomePage";
import LatestsProjects from "@/components/Projects/LatestsProjects";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomePage />
        <AboutText />
        <AboutMeSkillsBarChart />
        <LatestsProjects />
      </main>
      <Footer />
    </>
  );
}
