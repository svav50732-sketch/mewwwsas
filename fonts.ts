import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Montserrat — крупные заголовки, акценты.
export const display = loadMontserrat("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["cyrillic", "latin"],
}).fontFamily;

// Inter — субтитры и подписи.
export const body = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
}).fontFamily;
