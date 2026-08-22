export type MarketSymbol = {
  id: string;
  label: string;
  symbol: string;
  note: string;
  currency: "USD" | "INR";
};

export const copperChartSymbols: MarketSymbol[] = [
  {
    id: "lme",
    label: "LME",
    symbol: "LME:CA1!",
    note: "LME Copper 3M · USD / MT",
    currency: "USD",
  },
  {
    id: "mcx",
    label: "MCX",
    symbol: "MCX:COPPER1!",
    note: "MCX Copper · INR / kg",
    currency: "INR",
  },
  {
    id: "comex",
    label: "COMEX",
    symbol: "COMEX:HG1!",
    note: "COMEX High Grade · USD / lb",
    currency: "USD",
  },
];

export const liveQuoteSymbols: MarketSymbol[] = [
  {
    id: "lme-quote",
    label: "LME Copper",
    symbol: "LME:CA1!",
    note: "USD",
    currency: "USD",
  },
  {
    id: "mcx-quote",
    label: "MCX Copper",
    symbol: "MCX:COPPER1!",
    note: "INR",
    currency: "INR",
  },
  {
    id: "usdinr",
    label: "USD / INR",
    symbol: "FX_IDC:USDINR",
    note: "FX",
    currency: "INR",
  },
];

export function tradingViewChartSrc(symbol: string) {
  const params = new URLSearchParams({
    symbol,
    interval: "D",
    timezone: "Asia/Kolkata",
    theme: "dark",
    style: "1",
    locale: "en",
    toolbarbg: "0a0a0a",
    hideideas: "1",
    hide_legend: "0",
    hide_side_toolbar: "1",
    allow_symbol_change: "0",
    saveimage: "0",
    withdateranges: "1",
    hidetoptoolbar: "0",
  });
  return `https://www.tradingview.com/widgetembed/?${params.toString()}`;
}

export function tradingViewMiniSrc(symbol: string) {
  const config = {
    symbol,
    width: "100%",
    height: "148",
    locale: "en",
    dateRange: "1M",
    colorTheme: "dark",
    isTransparent: true,
    autosize: true,
    largeChartUrl: "",
  };
  return `https://www.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#${encodeURIComponent(JSON.stringify(config))}`;
}
