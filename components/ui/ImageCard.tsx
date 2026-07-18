import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ImageCardProps {
  title: string;
  description?: string;
  href?: string;
  image?: string;
  label?: string;
  index?: number;
  className?: string;
}

export default function ImageCard({
  title,
  description,
  href = "#",
  image = "/images/bg-header01.jpg",
  label,
  index,
  className = "",
}: ImageCardProps) {
  const content = (
    <div
      className={`group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
      <div className="absolute inset-0 bg-copper-base/0 transition-colors duration-500 group-hover:bg-copper-base/10" />

      <div className="relative z-10 p-6 lg:p-8">
        {(label || index !== undefined) && (
          <div className="mb-3 flex items-center justify-between">
            {label && (
              <span className="text-xs font-semibold uppercase tracking-wider text-copper-base">
                {label}
              </span>
            )}
            {index !== undefined && (
              <span className="font-heading text-3xl font-medium text-text-primary/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        )}
        <h3 className="text-h3 transition-colors group-hover:text-copper-base">
          {title}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">{description}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-primary transition-all group-hover:gap-3 group-hover:text-copper-base">
          Find out more
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );

  if (href === "#") return <div className="block h-full">{content}</div>;
  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
