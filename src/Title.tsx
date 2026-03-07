import TypeWriter from "./UseTypeWriter";
import { useState } from "react";

export function Title() {
  const [secondText, showSecondText] = useState(false);

  return (
    <div className="flex items-center justify-center mt-20 mb-10 text-center flex-col gap-10">
      <TypeWriter
        text="Hi! I'm Aung Myat but call me Austin"
        textSize={"text-5xl"}
        speed={100}
        onComplete={() => showSecondText(true)}
      ></TypeWriter>
      {secondText && (
        <TypeWriter
          text="I like building solutions to real world problems"
          textSize={"text-2xl"}
          speed={100}
        ></TypeWriter>
      )}
    </div>
  );
}
