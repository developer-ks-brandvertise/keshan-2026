interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatBlock({ value, label, className = "" }: StatBlockProps) {
  return (
    <div className={`border-l-2 border-copper-base/40 pl-5 ${className}`}>
      <div className="text-h2 text-copper-base">
        {value}
      </div>
      <div className="mt-1 text-body-sm text-text-secondary">{label}</div>
    </div>
  );
}
