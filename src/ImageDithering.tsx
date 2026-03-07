import { useState, useEffect, useRef } from "react";
import useImage from "use-image";
import { Circle, Layer, Stage, Group } from "react-konva";
import Konva from "konva";

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

function getNewColor(factor: number, rgbValue: number): number {
  return Math.round((factor * rgbValue) / 255) * (255 / factor);
}

function getImageIndex(img: ImageData, x: number, y: number): number {
  return (x + y * img.width) * 4;
}

function getColorAtIndex(imageData: ImageData, pixelIndex: number): Color {
  const pixels = imageData.data;

  return {
    r: pixels[pixelIndex],
    g: pixels[pixelIndex + 1],
    b: pixels[pixelIndex + 2],
    a: pixels[pixelIndex + 3],
  };
}

function setColorAtIndex(
  imageData: ImageData,
  pixelIndex: number,
  colorObject: Color,
): void {
  const pixels = imageData.data;

  pixels[pixelIndex] = colorObject.r;
  pixels[pixelIndex + 1] = colorObject.g;
  pixels[pixelIndex + 2] = colorObject.b;
  pixels[pixelIndex + 3] = colorObject.a;
}

function addError(
  imageData: ImageData,
  factor: number,
  pixelIndex: number,
  errR: number,
  errG: number,
  errB: number,
) {
  const pixels = imageData.data;

  const finalColor = {
    r: pixels[pixelIndex] + errR * factor,
    g: pixels[pixelIndex + 1] + errG * factor,
    b: pixels[pixelIndex + 2] + errB * factor,
    a: pixels[pixelIndex + 3],
  };

  setColorAtIndex(imageData, pixelIndex, finalColor);
}

function doAllErrors(
  imageData: ImageData,
  x: number,
  y: number,
  errR: number,
  errG: number,
  errB: number,
) {
  const addRealError = (newX: number, newY: number, scale: number) => {
    if (
      newX >= 0 &&
      newX < imageData.width &&
      newY >= 0 &&
      newY < imageData.height
    ) {
      addError(
        imageData,
        scale,
        getImageIndex(imageData, newX, newY),
        errR,
        errG,
        errB,
      );
    }
  };

  addRealError(x + 1, y, 7 / 16);
  addRealError(x - 1, y + 1, 3 / 16);
  addRealError(x, y + 1, 5 / 16);
  addRealError(x + 1, y + 1, 1 / 16);
}

function makeDithered(imageData: ImageData, factor: number) {
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let imageIndex = getImageIndex(imageData, x, y);

      let colorObject: Color = getColorAtIndex(imageData, imageIndex);

      let oldR = colorObject.r;
      let oldG = colorObject.g;
      let oldB = colorObject.b;
      let newR = getNewColor(factor, oldR);
      let newG = getNewColor(factor, oldG);
      let newB = getNewColor(factor, oldB);

      setColorAtIndex(imageData, imageIndex, {
        r: newR,
        g: newG,
        b: newB,
        a: colorObject.a,
      });

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      doAllErrors(imageData, x, y, errR, errG, errB);
    }
  }
}

export function ImageDithering() {
  const [pagodaImage, status] = useImage("/pagoda.png", "anonymous");

  const [dots, setDots] = useState<
    {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      color: string;
    }[]
  >([]);

  const groupRef = useRef<Konva.Group>(null);

  useEffect(() => {
    if (status == "loaded" && pagodaImage) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = pagodaImage.width;
        canvas.height = pagodaImage.height;

        ctx.drawImage(pagodaImage, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        makeDithered(imageData, 4);

        let points = [];
        const skipPoints = 3;

        for (let y = 0; y < imageData.height; y += skipPoints) {
          for (let x = 0; x < imageData.width; x += skipPoints) {
            const color = getColorAtIndex(
              imageData,
              getImageIndex(imageData, x, y),
            );

            if (
              color.r > 10 ||
              color.g > 10 ||
              (color.b > 10 && color.a > 128)
            ) {
              points.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                targetX: x,
                targetY: y,
                color: `rgb(${color.r},${color.g},${color.b})`,
              });
            }
          }
        }

        setDots(points);
      }
    }
  }, [status, pagodaImage]);

  useEffect(() => {
    const animation = new Konva.Animation((frame) => {
      if (!groupRef.current || dots.length === 0) return;

      const children = groupRef.current?.getChildren();

      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        const point = dots[i];

        const dx = point.targetX - node.x();
        const dy = point.targetY - node.y();

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          node.x(node.x() + dx * 0.05);
          node.y(node.y() + dy * 0.05);
        } else {
        }
      }
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [dots]);

  const imageWidth = pagodaImage?.width || 1000;
  const imageHeight = pagodaImage?.height || 1000;

  const finalX = (window.innerWidth * 0.9) / imageWidth;
  const finalY = (window.innerHeight * 0.9) / imageHeight;

  const finalScale = Math.min(finalX, finalY);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group
          ref={groupRef}
          scaleX={finalScale}
          scaleY={finalScale}
          x={(window.innerWidth - imageWidth * finalScale) / 2}
          y={0}
        >
          {dots.map((dot, i) => (
            <Circle key={i} x={dot.x} y={dot.y} radius={1} fill={dot.color} />
          ))}
        </Group>
      </Layer>
    </Stage>
  );
}
