import AboutMeHero from "./AboutMeHero";
import AboutMeSkills2 from "./AboutMeSkills";
import AboutText from "./AboutText";
import Footer from "../Footer";
import { Fragment } from "react";

const AboutMe = () => {
  return (
    <Fragment>
      <AboutMeHero />
      <AboutText />
      <AboutMeSkills2 />
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
