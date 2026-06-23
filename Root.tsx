import React from "react";
import { Composition } from "remotion";
import { Main } from "./Main";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
