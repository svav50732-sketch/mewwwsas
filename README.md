# Рекламный ролик (Remotion, плоская версия)

Все файлы лежат в одной папке — так загрузка на GitHub не теряет структуру.

Запуск локально:
  npm install
  npm run dev      # превью
  npm run render   # → out/video.mp4

Точка входа — index.ts (а не src/index.ts), поэтому команды рендера
указывают на index.ts напрямую.

Озвучка: создай папку public, положи туда voice.mp3, в Main.tsx добавь
  import { Audio, staticFile } from "remotion";
и раскомментируй <Audio src={staticFile("voice.mp3")} />.
Тайминги субтитров — в Subtitles.tsx (массив TRACK, значения в кадрах).
