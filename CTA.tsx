import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants";

// Глубокий чёрный фон с мягкой радиальной виньеткой —
// тёплый центр, тёмные края, без «грязного» градиента.
export const Background: React.FC<{ accent?: string }> = ({
  accent = "transparent",
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 70% at 50% 38%, ${accent}14 0%, transparent 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(110% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
