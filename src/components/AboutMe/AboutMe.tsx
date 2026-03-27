import AboutMeHero from "./AboutMeHero";
import AboutMeSkills from "./AboutMeSkillsBarChart";
import AboutText from "./AboutText";
import { Fragment } from "react";
import WhatsSetsMeApart from "./WhatsSetsMeApart";

const AboutMe = () => {
  return (
    <Fragment>
      <AboutMeHero />
      <AboutText />
      <WhatsSetsMeApart />
      <AboutMeSkills />
    </Fragment>
  );
};

export default AboutMe;
