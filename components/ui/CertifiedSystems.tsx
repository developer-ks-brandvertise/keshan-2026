import { QualityLogoGrid } from "@/components/ui/QualityLogoGrid";

type CertifiedSystemsProps = {
  className?: string;
};

export function CertifiedSystems({ className = "" }: CertifiedSystemsProps) {
  return (
    <div className={`relative ${className}`}>
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-base">
        Certified systems
      </p>
      <h3 className="text-center text-lg text-text-primary">
        ISO Compliant, Traceable, Batch-Tested
      </h3>
      <p className="mx-auto mt-2 max-w-md text-center text-[12px] text-text-secondary">
        Full process documentation and test certificates with every dispatch.
      </p>
      <div className="relative mt-8 w-full">
        <QualityLogoGrid size="large" />
      </div>
    </div>
  );
}
