import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./constants";
import { body } from "./fonts";

// Дорожка субтитров под озвучку. Тайминги — в кадрах (30 fps).
// Хук (0–90) намеренно ПУСТОЙ: там крупный анимированный текст
// сам работает как титр, дублировать его субтитром снизу не нужно.
//
// ⚙️  Подгони [from, to] под свою озвучку, когда запишешь голос.
type Cue = { from: number; to: number; text: string };

const TRACK: Cue[] = [
  // Проблема 90–240
  { from: 90, to: 140, text: "А потому что ты сам ищешь рекламу," },
  { from: 140, to: 196, text: "сам ведёшь переговоры, сам выбиваешь оплату…" },
  { from: 196, to: 240, text: "и теряешь на этом и деньги, и время." },
  // Решение 240–420
  { from: 240, to: 312, text: "Мы — агентство инфлюенс-маркетинга." },
  { from: 312, to: 366, text: "Бренды приходят к нам," },
  { from: 366, to: 420, text: "а мы приводим их к тебе." },
  // Выгода 420–660
  { from: 420, to: 482, text: "Ты просто снимаешь контент." },
  { from: 482, to: 544, text: "Мы берём на себя поиск рекламодателей," },
  { from: 544, to: 596, text: "договоры, оплату —" },
  { from: 596, to: 660, text: "и поднимаем твою ставку." },
  // CTA 660–810
  { from: 660, to: 722, text: "Оставь заявку —" },
  { from: 722, to: 810, text: "и получи первые предложения уже на этой неделе." },
];

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = TRACK.find((c) => frame >= c.from && frame < c.to);
  if (!cue) return null;

  const fade = interpolate(
    frame,
    [cue.from, cue.from + 5, cue.to - 5, cue.to],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 230,
        paddingInline: 90,
      }}
    >
      <div
        style={{
          opacity: fade,
          maxWidth: 860,
          textAlign: "center",
          fontFamily: body,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.28,
          color: COLORS.white,
          background: "rgba(11,11,12,0.55)",
          backdropFilter: "blur(2px)",
          padding: "16px 28px",
          borderRadius: 18,
          textShadow: "0 2px 14px rgba(0,0,0,0.6)",
        }}
      >
        {cue.text}
      </div>
    </AbsoluteFill>
  );
};
