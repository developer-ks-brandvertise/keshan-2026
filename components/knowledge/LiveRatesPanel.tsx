import { liveQuoteSymbols, tradingViewMiniSrc } from "@/lib/market-symbols";

export function LiveRatesPanel() {
  return (
    <aside className="border border-copper-base/25 bg-dark-950">
      <div className="flex items-center justify-between border-b border-copper-base/20 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-base">
          Live rates
        </p>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400">
          LME · MCX · FX
        </span>
      </div>
      <ul className="divide-y divide-dark-100/10">
        {liveQuoteSymbols.map((item) => (
          <li key={item.id} className="px-2 py-2">
            <p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              {item.label} · {item.note}
            </p>
            <iframe
              title={`${item.label} quote`}
              src={tradingViewMiniSrc(item.symbol)}
              className="h-[148px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </li>
        ))}
      </ul>
      <p className="px-4 py-3 text-[10px] leading-relaxed text-text-muted">
        Indicative exchange quotes for buyers. Not an offer to sell.
      </p>
    </aside>
  );
}
