import AboutMeHero from "./AboutMeHero";
import AboutMeSkills from "./AboutMeSkillss";
import AboutText from "./AboutText";
import Footer from "../Footer";
import { Fragment } from "react";
import WhatsSetsMeApart from "./WhatsSetsMeApart";

const AboutMe = () => {
  return (
    <Fragment>
      <AboutMeHero />
      <AboutText />
      <WhatsSetsMeApart />
      <AboutMeSkills />
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
