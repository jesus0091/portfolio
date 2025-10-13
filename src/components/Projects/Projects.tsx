"use client";

import Footer from "../Footer";
import GalleryProjects from "./GalleryProjects";
import HeroProjects from "./HeroProjects";
import LatestsProjects from "./LatestsProjects";
import Quote from "./Quote";

export default function Projects() {
  return (
    <div className="w-full">
      <HeroProjects />
      <GalleryProjects />
      <Quote />
      <LatestsProjects />
      <Footer />
    </div>
  );
}
