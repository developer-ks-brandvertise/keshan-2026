import { Play } from "lucide-react";
import { corporateFilmVideoId } from "@/lib/data";

type CorporateFilmEmbedProps = {
  title: string;
  label?: string;
  className?: string;
};

export function CorporateFilmEmbed({
  title,
  label,
  className = "",
}: CorporateFilmEmbedProps) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden border border-copper-base/25 bg-dark-950 shadow-[0_28px_80px_rgba(0,0,0,0.35)] ${className}`}
    >
      {label ? (
        <div className="flex items-center gap-2.5 border-b border-copper-base/25 px-4 py-3">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-copper-base/40 bg-copper-base/10">
            <Play className="h-3 w-3 fill-copper-base text-copper-base" />
          </span>
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
