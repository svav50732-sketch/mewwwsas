import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { display } from "../fonts";

// Слова с глобальным индексом для шахматного появления.
const LINES: string[][] = [
  ["Бренды", "не", "пишут", "тебе"],
  ["не", "потому,", "что", "у", "тебя"],
];

const STRIKE = ["мало", "подписчиков"];

const Word: React.FC<{
  children: React.ReactNode;
  index: number;
  color?: string;
}> = ({ children, index, color = COLORS.white }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - index * 4,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.7 },
  });
  const y = interpolate(enter, [0, 1], [60, 0]);
  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${y}px)`,
        opacity: enter,
        color,
      }}
    >
      {children}
    </span>
  );
};

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // индекс для непрерывного стаггера по всем словам
  let counter = 0;
  const firstCount = LINES[0].length + LINES[1].length;

  // прогресс рисования красной линии
  const strikeIn = interpolate(frame, [60, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
      }}
    >
      <div
        style={{
          fontFamily: display,
          fontWeight: 800,
          fontSize: 92,
          lineHeight: 1.12,
          textAlign: "center",
          letterSpacing: "-0.02em",
        }}
      >
        {LINES.map((line, li) => (
          <div key={li} style={{ display: "block" }}>
            {line.map((w) => {
              const idx = counter++;
              return (
                <React.Fragment key={idx}>
                  <Word index={idx}>{w}</Word>{" "}
                </React.Fragment>
              );
            })}
          </div>
        ))}

        {/* строка, которую зачёркиваем */}
        <div style={{ display: "block", position: "relative", marginTop: 6 }}>
          <span style={{ position: "relative", display: "inline-block" }}>
            {STRIKE.map((w, i) => {
              const idx = firstCount + i;
              return (
                <React.Fragment key={idx}>
                  <Word index={idx} color={COLORS.white}>
                    {w}
                  </Word>
                  {i < STRIKE.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
            {/* красная линия зачёркивания */}
            <div
              style={{
                position: "absolute",
                top: "52%",
                left: -6,
                height: 10,
                borderRadius: 6,
                background: COLORS.red,
                width: `calc((100% + 12px) * ${strikeIn})`,
                boxShadow: `0 0 22px ${COLORS.red}99`,
              }}
            />
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
