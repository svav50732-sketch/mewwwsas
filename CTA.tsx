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

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  // пульсация кнопки
  const pulse = 1 + Math.sin(frame * 0.18) * 0.035;
  const glow = 0.5 + Math.sin(frame * 0.18) * 0.5;

  // подпрыгивающая стрелка вниз
  const arrowDelay = 26;
  const arrowIn = spring({
    frame: frame - arrowDelay,
    fps,
    config: { damping: 12 },
  });
  const bounce = Math.sin((frame - arrowDelay) * 0.16) * 12;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: -120,
        gap: 64,
      }}
    >
      {/* кнопка */}
      <div
        style={{
          transform: `scale(${enter * pulse})`,
          opacity: enter,
          padding: "40px 80px",
          borderRadius: 28,
          background: COLORS.gold,
          color: "#1A1206",
          fontFamily: display,
          fontWeight: 800,
          fontSize: 60,
          letterSpacing: "-0.01em",
          boxShadow: `0 0 ${40 + glow * 50}px ${COLORS.gold}${"66"}`,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        Оставить заявку
      </div>

      {/* стрелка вниз к ссылке */}
      <div
        style={{
          opacity: arrowIn,
          transform: `translateY(${bounce}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path
            d="M20 26 L35 41 L50 26"
            stroke={COLORS.gold}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 42 L35 57 L50 42"
            stroke={COLORS.gold}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
        <span
          style={{
            fontFamily: display,
            fontWeight: 600,
            fontSize: 34,
            color: COLORS.muted,
          }}
        >
          ссылка в описании
        </span>
      </div>
    </AbsoluteFill>
  );
};
