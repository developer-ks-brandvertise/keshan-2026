import Image from "next/image";
import { Link } from "@/i18n/routing";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Keshan Industries"
    >
      <Image
        src="/images/Keshan-Industries-Logo-Latest.png"
        alt="Keshan Industries"
        width={280}
        height={72}
        className={`h-full w-auto ${light ? "brightness-110" : ""}`}
        priority
      />
    </Link>
  );
}
