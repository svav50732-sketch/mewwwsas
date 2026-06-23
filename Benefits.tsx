import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./constants";
import { display } from "./fonts";
import { CheckIcon } from "./Icons";

const ROWS = [
  { text: "Поток рекламодателей", accent: COLORS.teal },
  { text: "Договоры и оплата под защитой", accent: COLORS.teal },
  { text: "Ставка выше, чем в одиночку", accent: COLORS.gold }, // ключевая выгода
];

const Row: React.FC<{
  index: number;
  text: string;
  accent: string;
}> = ({ index, text, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 18 + index * 52;
  const t = frame - delay;

  const enter = spring({
    frame: t,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  const x = interpolate(enter, [0, 1], [-80, 0]);
  const checkProgress = interpolate(t, [10, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const highlight = accent === COLORS.gold;

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${x}px)`,
        display: "flex",
        alignItems: "center",
        gap: 30,
        width: 860,
        padding: "30px 36px",
        borderRadius: 26,
        background: highlight ? "rgba(255,194,75,0.10)" : COLORS.bgSoft,
        border: `1px solid ${
          highlight ? "rgba(255,194,75,0.45)" : "rgba(255,255,255,0.07)"
        }`,
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          flexShrink: 0,
          borderRadius: "50%",
          border: `3px solid ${accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${accent}1A`,
        }}
      >
        <CheckIcon size={42} color={accent} progress={checkProgress} />
      </div>
      <span
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 46,
          color: COLORS.white,
          lineHeight: 1.15,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Benefits: React.FC = () => {
  const frame = useCurrentFrame();
  const eyebrow = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 26,
        marginTop: -110,
      }}
    >
      <div
        style={{
          opacity: eyebrow,
          fontFamily: display,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: "0.2em",
          color: COLORS.muted,
          marginBottom: 8,
        }}
      >
        ТЫ ПОЛУЧАЕШЬ
      </div>
      {ROWS.map((r, i) => (
        <Row key={i} index={i} text={r.text} accent={r.accent} />
      ))}
    </AbsoluteFill>
  );
};
