"use client";

import Footer from "../Footer";
import { Fragment } from "react";
import GalleryProjects from "./GalleryProjects";
import HeroProjects from "./HeroProjects";
import LatestsProjects from "./LatestsProjects";
import Quote from "./Quote";

export default function Projects() {
  return (
    <Fragment>
      <HeroProjects />
      <GalleryProjects />
      <Quote />
      <LatestsProjects />
      <Footer />
    </Fragment>
  );
}
