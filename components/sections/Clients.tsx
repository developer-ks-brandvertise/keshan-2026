import Image from "next/image";
import { clients } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const logoFiles = [
  "/images/client-img1.png",
  "/images/client-img2.png",
  "/images/client-img3-1.png",
  "/images/client-img4.png",
  "/images/client-img5.png",
  "/images/client-img6.png",
];

export default function Clients() {
  const allLogos = [...logoFiles, ...logoFiles];

  return (
    <section className="border-y border-dark-100/10 bg-dark-950 py-16 lg:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-gutter">
        <SectionHeading
          eyebrow="Our Partners"
          title={clients.headline}
          subtitle={clients.caption}
          align="center"
          className="mb-10"
        />
      </div>

      <div className="group relative">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {allLogos.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="flex h-24 w-48 flex-shrink-0 items-center justify-center border-y border-r border-dark-100/10 bg-dark-950 transition-colors hover:bg-dark-900"
            >
              <Image
                src={src}
                alt="Client logo"
                width={120}
                height={40}
                className="opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
