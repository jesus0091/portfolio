import AboutMeHero from "./AboutMeHero";
import AboutText from "./AboutText";
import Footer from "../Footer";
import { Fragment } from "react";
import SkillsCarousel from "./Skills";

const AboutMe = () => {
  return (
    <Fragment>
      <AboutMeHero />
      <AboutText />
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
