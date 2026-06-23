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
import { BloggerIcon, BrandBadge } from "../components/Icons";

const HUB = { x: 540, y: 860 };
const BLOGGER = { x: 540, y: 1360 };
const BRANDS = [
  { x: 170, y: 380, v: 0 },
  { x: 410, y: 320, v: 1 },
  { x: 670, y: 320, v: 2 },
  { x: 910, y: 380, v: 3 },
];

// Линия, рисующаяся по прогрессу, с бегущей точкой на острие.
const FlowLine: React.FC<{
  from: { x: number; y: number };
  to: { x: number; y: number };
  progress: number;
  color: string;
}> = ({ from, to, progress, color }) => {
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  const tipX = from.x + (to.x - from.x) * progress;
  const tipY = from.y + (to.y - from.y) * progress;
  return (
    <>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
        opacity={0.85}
      />
      {progress > 0.02 && progress < 0.999 && (
        <circle cx={tipX} cy={tipY} r={7} fill={color} />
      )}
    </>
  );
};

export const Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hubPop = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // линии бренд→хаб: 14..70, со стаггером
  const brandProgress = (i: number) =>
    interpolate(frame, [14 + i * 8, 64 + i * 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // финальная стрелка хаб→блогер: 86..132
  const toBlogger = interpolate(frame, [86, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bloggerPop = spring({
    frame: frame - 120,
    fps,
    config: { damping: 13, stiffness: 130 },
  });

  return (
    <AbsoluteFill>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* линии от брендов к хабу */}
        {BRANDS.map((b, i) => (
          <FlowLine
            key={i}
            from={{ x: b.x, y: b.y + 40 }}
            to={HUB}
            progress={brandProgress(i)}
            color={COLORS.teal}
          />
        ))}
        {/* стрелка от хаба к блогеру */}
        <FlowLine
          from={{ x: HUB.x, y: HUB.y + 30 }}
          to={{ x: BLOGGER.x, y: BLOGGER.y - 70 }}
          progress={toBlogger}
          color={COLORS.gold}
        />
        {toBlogger > 0.95 && (
          <path
            d={`M${BLOGGER.x - 16} ${BLOGGER.y - 96} L${BLOGGER.x} ${
              BLOGGER.y - 70
            } L${BLOGGER.x + 16} ${BLOGGER.y - 96}`}
            stroke={COLORS.gold}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* бренды */}
      {BRANDS.map((b, i) => {
        const pop = spring({
          frame: frame - i * 4,
          fps,
          config: { damping: 13, stiffness: 150 },
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x - 56,
              top: b.y - 16,
              width: 112,
              height: 112,
              borderRadius: 26,
              background: COLORS.bgSoft,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${pop})`,
            }}
          >
            <BrandBadge size={70} color={COLORS.white} variant={b.v} />
          </div>
        );
      })}

      {/* подпись «бренды» */}
      <div
        style={{
          position: "absolute",
          top: 200,
          width: "100%",
          textAlign: "center",
          fontFamily: display,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: "0.18em",
          color: COLORS.muted,
        }}
      >
        БРЕНДЫ
      </div>

      {/* центральный хаб «мы» */}
      <div
        style={{
          position: "absolute",
          left: HUB.x - 90,
          top: HUB.y - 90,
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: `4px solid ${COLORS.teal}`,
          background: "rgba(45,212,191,0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hubPop})`,
          boxShadow: `0 0 60px ${COLORS.teal}40`,
        }}
      >
        <span
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 52,
            color: COLORS.teal,
          }}
        >
          мы
        </span>
      </div>

      {/* блогер «ты» */}
      <div
        style={{
          position: "absolute",
          left: BLOGGER.x - 90,
          top: BLOGGER.y - 70,
          width: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          transform: `scale(${bloggerPop})`,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            border: `4px solid ${COLORS.gold}`,
            background: "rgba(255,194,75,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 60px ${COLORS.gold}40`,
          }}
        >
          <BloggerIcon size={110} color={COLORS.gold} />
        </div>
        <span
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 40,
            color: COLORS.gold,
          }}
        >
          ты
        </span>
      </div>
    </AbsoluteFill>
  );
};
