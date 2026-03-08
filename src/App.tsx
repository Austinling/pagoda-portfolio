import { useState } from "react";
import { ImageDithering } from "./ImageDithering";
import { Navbar } from "./Navbar";
import { Title } from "./Title";
import { TechStack } from "./TechStack";
import { Projects } from "./Projects";
import { AboutMe } from "./AboutMe";

function App() {
  return (
    <>
      <div id="start" className="absolute top-0"></div>
      <Navbar />
      <div className="flex w-full">
        <ImageDithering imageRef="/images/pagoda.png" scale={0.82} />
      </div>
      <div className="flex flex-col gap-20">
        <AboutMe />
        <TechStack />
        <Projects />
      </div>
    </>
  );
}

export default App;
