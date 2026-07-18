interface CopperWaveProps {
  /** Flip so the wave sits at the top of the next section */
  flip?: boolean;
  className?: string;
  from?: "dark-900" | "dark-950" | "transparent";
  /** Unique id suffix when multiple waves appear on one page */
  id?: string;
}

export function CopperWave({
  flip = false,
  className = "",
  from = "transparent",
  id = "default",
}: CopperWaveProps) {
  const fillMap = {
    "dark-900": "#0a0a0a",
    "dark-950": "#080808",
    transparent: "transparent",
  };
  const gradId = `copperWaveGrad-${id}`;

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-14 lg:h-16"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5c3a1a" stopOpacity="0.1" />
            <stop offset="20%" stopColor="#8a5a2b" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#b87333" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#ffe2b0" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#d4a574" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#b87333" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8a5a2b" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {from !== "transparent" && (
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill={fillMap[from]}
          />
        )}
        <path
          d="M0,48 C180,72 360,12 540,40 C720,68 900,16 1080,44 C1260,72 1350,28 1440,40 L1440,80 L0,80 Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M0,56 C200,78 400,30 600,50 C800,70 1000,24 1200,48 C1320,62 1380,40 1440,48"
          fill="none"
          stroke="#ffe2b0"
          strokeWidth="1.25"
          strokeOpacity="0.45"
        />
      </svg>
    </div>
  );
}
