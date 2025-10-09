import React, { Fragment } from "react";

import { AuroraGlow } from "./AuroraGlow";
import ButtonOutlined from "./ButtonOutlined";

const AboutMe = () => {
  return (
    <Fragment>
      <section className="h-[100dvh] flex justify-center items-center relative">
        <div className="absolute inset-0 flex items-center justify-center -z-1">
          <AuroraGlow blobSize={600} speed={4} />
        </div>
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-orange-500">Jesús Hernández</p>
            <p className="text-[80px] font-black leading-none max-w-4xl text-black text-center">
              The Creative Mind Behind the Code
            </p>
          </div>
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutMe;
