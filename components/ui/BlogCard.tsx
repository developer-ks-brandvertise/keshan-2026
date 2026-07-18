import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href?: string;
  image?: string;
  className?: string;
}

export default function BlogCard({
  title,
  excerpt,
  date,
  category,
  href = "#",
  image = "/images/blog-img1.jpg",
  className = "",
}: BlogCardProps) {
  const [day, month] = date.split(" ");

  return (
    <Link href={href} className={`group block h-full ${className}`}>
      <div className="relative h-full overflow-hidden border border-dark-100/10 bg-dark-950 transition-all duration-300 hover:border-copper-base/40">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-4 top-4 flex flex-col items-center justify-center bg-copper-gradient px-3 py-2 text-center text-[#0a0a0a]">
            <span className="font-heading text-lg font-medium leading-none">{day}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
          </div>
        </div>
        <div className="p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-copper-base">
            {category}
          </span>
          <h3 className="mt-2 text-h3 transition-colors group-hover:text-copper-base">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-body-sm text-text-secondary">{excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-copper-base transition-all group-hover:gap-3">
            Read More
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
