// ── Формат ────────────────────────────────────────────────
// Вертикальное видео 9:16 под Reels / Shorts / TikTok.
// Чтобы сделать горизонтальное 16:9 — поставь WIDTH=1920, HEIGHT=1080.
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// ── Палитра (семантика, а не декор) ───────────────────────
export const COLORS = {
  bg: "#0B0B0C", // глубокий чёрный фон
  bgSoft: "#141416", // панели/карточки
  white: "#F5F5F0", // мягкий белый текст
  muted: "#76767C", // второстепенный текст
  red: "#FF3B30", // ПРОБЛЕМА — зачёркивание, негатив
  teal: "#2DD4BF", // НАША СИСТЕМА — чистые линии, связи
  gold: "#FFC24B", // ЦЕННОСТЬ — деньги, ставка, CTA
};

// ── Тайминги сцен (кадры при 30 fps) ──────────────────────
//  Hook      0:00–0:03   →   0–90
//  Problem   0:03–0:08   →  90–240
//  Solution  0:08–0:14   → 240–420
//  Benefits  0:14–0:22   → 420–660
//  CTA       0:22–0:27   → 660–810
export const SCENES = {
  hook: { start: 0, duration: 90 },
  problem: { start: 90, duration: 150 },
  solution: { start: 240, duration: 180 },
  benefits: { start: 420, duration: 240 },
  cta: { start: 660, duration: 150 },
};

export const TOTAL = 810; // 27 секунд
