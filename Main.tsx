import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { COLORS, SCENES } from "./constants";
import { Background } from "./Background";
import { Subtitles } from "./Subtitles";
import { Hook } from "./Hook";
import { Problem } from "./Problem";
import { Solution } from "./Solution";
import { Benefits } from "./Benefits";
import { CTA } from "./CTA";

// Обёртка сцены: фон нужного акцента + мягкое появление.
const Scene: React.FC<{
  accent: string;
  children: React.ReactNode;
}> = ({ accent, children }) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <Background accent={accent} />
      {children}
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence from={SCENES.hook.start} durationInFrames={SCENES.hook.duration}>
        <Scene accent={COLORS.red}>
          <Hook />
        </Scene>
      </Sequence>

      <Sequence
        from={SCENES.problem.start}
        durationInFrames={SCENES.problem.duration}
      >
        <Scene accent={COLORS.red}>
          <Problem />
        </Scene>
      </Sequence>

      <Sequence
        from={SCENES.solution.start}
        durationInFrames={SCENES.solution.duration}
      >
        <Scene accent={COLORS.teal}>
          <Solution />
        </Scene>
      </Sequence>

      <Sequence
        from={SCENES.benefits.start}
        durationInFrames={SCENES.benefits.duration}
      >
        <Scene accent={COLORS.gold}>
          <Benefits />
        </Scene>
      </Sequence>

      <Sequence from={SCENES.cta.start} durationInFrames={SCENES.cta.duration}>
        <Scene accent={COLORS.gold}>
          <CTA />
        </Scene>
      </Sequence>

      {/* Субтитры поверх всех сцен */}
      <Subtitles />

      {/*
        ОЗВУЧКА:
        1) Положи свой аудиофайл в папку  public/voice.mp3
        2) Добавь импорты вверху файла:
             import { Audio, staticFile } from "remotion";
        3) Раскомментируй строку ниже:

        <Audio src={staticFile("voice.mp3")} />

        Подгони тайминги субтитров под голос в src/components/Subtitles.tsx
      */}
    </AbsoluteFill>
  );
};
