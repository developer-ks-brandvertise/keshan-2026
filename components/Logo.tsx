import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 ${className}`}
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
