import { useState } from "react";
import { ImageDithering } from "./ImageDithering";
import { Navbar } from "./Navbar";
import { Title } from "./Title";
import { TechStack } from "./TechStack";
import { Projects } from "./Projects";

function App() {
  return (
    <>
      <Navbar />
      <Title />
      <div className="flex w-full">
        <ImageDithering imageRef="/images/pagoda.png" scale={0.9} />
      </div>
      <div className="mt-10">
        <TechStack />
      </div>
      <Projects />
    </>
  );
}

export default App;
