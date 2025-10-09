"use client";

import { Fragment } from "react";
import GalleryProjects from "./GalleryProjects";
import HeroProjects from "./HeroProjects";
import LatestsProjects from "./LatestsProjects";

export default function Projects() {
  return (
    <Fragment>
      <HeroProjects />
      <GalleryProjects />
      <LatestsProjects />
    </Fragment>
  );
}
