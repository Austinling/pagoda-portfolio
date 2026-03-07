import { useEffect, useState } from "react";

const useTypeWriter = (
  text: string,
  speed: number,
  onComplete?: () => void,
) => {
  const [actualText, setActualText] = useState("");

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setActualText(text.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return actualText;
};

const TypeWriter = ({
  text,
  textSize,
  speed,
  onComplete,
}: {
  text: string;
  textSize: string;
  speed: number;
  onComplete?: () => void;
}) => {
  const displayText = useTypeWriter(text, speed, onComplete);

  return (
    <h1 className={`text-white ${textSize} bitcount-single-bits`}>
      {displayText}
    </h1>
  );
};

export default TypeWriter;
