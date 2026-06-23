import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const base = (size: number): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

// 🔍 Поиск рекламы
export const SearchIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#fff",
  strokeWidth = 3.2,
}) => (
  <svg {...base(size)}>
    <circle
      cx="21"
      cy="21"
      r="13"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <line
      x1="31"
      y1="31"
      x2="42"
      y2="42"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// 💬 Переговоры / переписка
export const ChatIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#fff",
  strokeWidth = 3.2,
}) => (
  <svg {...base(size)}>
    <path
      d="M8 12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H20l-9 8v-8h-1a4 4 0 0 1-4-4V12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <circle cx="17" cy="20" r="2" fill={color} />
    <circle cx="24" cy="20" r="2" fill={color} />
    <circle cx="31" cy="20" r="2" fill={color} />
  </svg>
);

// 💸 Деньги / оплата
export const MoneyIcon: React.FC<IconProps> = ({
  size = 48,
  color = "#fff",
  strokeWidth = 3.2,
}) => (
  <svg {...base(size)}>
    <rect
      x="6"
      y="13"
      width="36"
      height="22"
      rx="4"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth={strokeWidth} />
    <line
      x1="13"
      y1="18"
      x2="13"
      y2="30"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <line
      x1="35"
      y1="18"
      x2="35"
      y2="30"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

// ⏱ Часы (фон сцены «Проблема»)
export const ClockIcon: React.FC<IconProps & { handAngle?: number }> = ({
  size = 48,
  color = "#fff",
  strokeWidth = 3,
  handAngle = 0,
}) => (
  <svg {...base(size)}>
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth={strokeWidth} />
    {/* минутная стрелка (статична) */}
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="13"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* секундная стрелка (вращается) */}
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="11"
      stroke={color}
      strokeWidth={strokeWidth - 0.8}
      strokeLinecap="round"
      transform={`rotate(${handAngle} 24 24)`}
    />
    <circle cx="24" cy="24" r="2" fill={color} />
  </svg>
);

// ✓ Галочка (рисуется через strokeDashoffset снаружи)
export const CheckIcon: React.FC<IconProps & { progress?: number }> = ({
  size = 48,
  color = "#fff",
  strokeWidth = 4,
  progress = 1,
}) => {
  const len = 26; // приблизительная длина пути галочки
  return (
    <svg {...base(size)}>
      <path
        d="M12 25l8 8 16-18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - progress)}
      />
    </svg>
  );
};

// Бейдж бренда (абстрактный логотип) — для сцены «Решение»
export const BrandBadge: React.FC<{
  size?: number;
  color?: string;
  variant?: number;
}> = ({ size = 80, color = "#F5F5F0", variant = 0 }) => {
  const shapes = [
    <circle key="c" cx="40" cy="40" r="18" stroke={color} strokeWidth="4" />,
    <rect
      key="r"
      x="24"
      y="24"
      width="32"
      height="32"
      rx="8"
      stroke={color}
      strokeWidth="4"
    />,
    <path
      key="t"
      d="M40 22 58 56 22 56 Z"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
    />,
    <path
      key="h"
      d="M40 24 56 33v18l-16 9-16-9V33Z"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
    />,
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes[variant % shapes.length]}
    </svg>
  );
};

// Фигурка блогера (получатель)
export const BloggerIcon: React.FC<IconProps> = ({
  size = 96,
  color = "#fff",
  strokeWidth = 4,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="48" cy="34" r="14" stroke={color} strokeWidth={strokeWidth} />
    <path
      d="M22 76c0-14 12-22 26-22s26 8 26 22"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);
