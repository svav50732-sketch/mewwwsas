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
import { ChatIcon, ClockIcon, MoneyIcon, SearchIcon } from "../components/Icons";

const ITEMS = [
  { Icon: SearchIcon, label: "ищешь рекламу" },
  { Icon: ChatIcon, label: "ведёшь переговоры" },
  { Icon: MoneyIcon, label: "выбиваешь оплату" },
];

const DropCard: React.FC<{
  index: number;
  Icon: React.FC<{ size?: number; color?: string }>;
  label: string;
}> = ({ index, Icon, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 12 + index * 34;
  const t = frame - delay;

  const drop = spring({
    frame: t,
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.9 },
  });
  const y = interpolate(drop, [0, 1], [-340, 0]);

  // дрожь после приземления — затухающая синусоида
  const shake =
    t > 0 ? Math.sin(t * 0.9) * 7 * Math.max(0, 1 - t / 26) : 0;
  const rot = t > 0 ? Math.sin(t * 0.9) * 2.2 * Math.max(0, 1 - t / 26) : 0;

  return (
    <div
      style={{
        opacity: drop,
        transform: `translateY(${y}px) translateX(${shake}px) rotate(${rot}deg)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
      }}
    >
      <div
        style={{
          width: 188,
          height: 188,
          borderRadius: 34,
          background: COLORS.bgSoft,
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        <Icon size={96} color={COLORS.white} />
      </div>
      <span
        style={{
          fontFamily: display,
          fontWeight: 600,
          fontSize: 34,
          color: COLORS.muted,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  // секундная стрелка фоновых часов
  const handAngle = (frame / 150) * 360 * 2;
  const clockOpacity = interpolate(frame, [0, 20], [0, 0.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* фоновые часы */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: clockOpacity,
        }}
      >
        <ClockIcon size={1000} color={COLORS.white} handAngle={handAngle} />
      </AbsoluteFill>

      <div
        style={{
          display: "flex",
          gap: 56,
          alignItems: "flex-start",
          marginTop: -120,
        }}
      >
        {ITEMS.map((it, i) => (
          <DropCard key={i} index={i} Icon={it.Icon} label={it.label} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
