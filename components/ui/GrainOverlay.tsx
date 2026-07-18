export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23f5f1ec' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
}
