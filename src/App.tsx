import { useState } from "react";
import { ImageDithering } from "./ImageDithering";
import { Navbar } from "./Navbar";
import { Title } from "./Title";

function App() {
  return (
    <>
      <Navbar />
      <Title />
      <div className="flex w-full">
        <ImageDithering />
      </div>
    </>
  );
}

export default App;
