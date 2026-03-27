import AboutMe from "@/components/AboutMe/AboutMe";
import BackgroundTransition from "@/components/BackgroundTransition";
import Footer from "@/components/Footer";
import GalleryProjects from "@/components/Projects/GalleryProjects";
import HomePage from "@/components/HomePage";
import LatestsProjects from "@/components/Projects/LatestsProjects";
import Navbar from "@/components/Navbar";
import Quote from "@/components/Projects/Quote";

export default function LandingPage() {
  return (
    <>
      <BackgroundTransition />
      <Navbar />
      <HomePage />
      <GalleryProjects />
      <LatestsProjects />
      <Quote />
      <AboutMe />
      <Footer />
    </>
  );
}
