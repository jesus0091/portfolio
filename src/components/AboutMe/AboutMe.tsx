import AboutMeHero from "./AboutMeHero";
import AboutText from "./AboutText";
import Footer from "../Footer";
import { Fragment } from "react";

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
