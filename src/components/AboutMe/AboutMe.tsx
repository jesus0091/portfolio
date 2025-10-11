import AboutMeHero from "./AboutMeHero";
import AboutMeSkills2 from "./AboutMeSkills";
import AboutText from "./AboutText";
import Footer from "../Footer";
import { Fragment } from "react";
import WhatsSetsMeApart from "./WhatsSetsMeApart";

const AboutMe = () => {
  return (
    <Fragment>
      <AboutMeHero />
      <AboutText />
      {/* <WhatsSetsMeApart /> */}
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
