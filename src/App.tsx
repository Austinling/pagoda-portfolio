import { useState } from "react";
import { ImageDithering } from "./ImageDithering";
import { Navbar } from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <ImageDithering />
      </div>
    </>
  );
}

export default App;
