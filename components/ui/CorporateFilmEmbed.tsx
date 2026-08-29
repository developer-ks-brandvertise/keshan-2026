import { corporateFilmVideoId } from "@/lib/data";

type CorporateFilmEmbedProps = {
  title: string;
  label?: string;
  variant?: "default" | "hero";
  className?: string;
};

export function CorporateFilmEmbed({
  title,
  label,
  variant = "default",
  className = "",
}: CorporateFilmEmbedProps) {
  if (variant === "hero") {
    return (
      <div className={`w-full ${className}`}>
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 3.5rem) 0, 100% 3.5rem, 100% 100%, 0 100%)",
          }}
        >
          <div className="relative aspect-[4/3] w-full bg-dark-950 sm:aspect-[16/10]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${corporateFilmVideoId}?rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden border border-copper-base/25 bg-dark-950 shadow-[0_28px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      {label ? (
        <div className="flex items-center gap-2.5 border-b border-copper-base/25 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
            {label}
          </p>
        </div>
      ) : null}

      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${corporateFilmVideoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
