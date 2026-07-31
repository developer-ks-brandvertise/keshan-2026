export type FaqEntry = {
  id: string;
  keywords: string[];
  answer: string;
};

export const chatbotFaq: FaqEntry[] = [
  {
    id: "products",
    keywords: [
      "product",
      "products",
      "copper",
      "brass",
      "ingot",
      "busbar",
      "strip",
      "sheet",
      "rod",
      "wire",
      "anode",
      "cathode",
      "nugget",
      "制造",
      "产品",
      "cobre",
      "latón",
      "منتج",
      "نحاس",
    ],
    answer:
      "Keshan manufactures copper and brass forms including ingots, busbars, strips, sheets & plates, continuous cast rod (CCR), wires & rods, nuggets, 1 kg bars, anodes, cathodes, and brass circles. Browse the full range on the Products page.",
  },
  {
    id: "certs",
    keywords: [
      "cert",
      "certificate",
      "iso",
      "quality",
      "9001",
      "14001",
      "认证",
      "证书",
      "certificación",
      "شهادة",
    ],
    answer:
      "Keshan is ISO 9001:2015 and ISO 14001:2015 certified. Every production batch is tested for conductivity, composition, and dimensions — certificates are traceable. See Media & Certificates for credential documents.",
  },
  {
    id: "quote",
    keywords: [
      "quote",
      "price",
      "pricing",
      "inquiry",
      "enquiry",
      "rfq",
      "order",
      "报价",
      "询价",
      "cotización",
      "سعر",
      "عرض",
    ],
    answer:
      "Request a quote via the Contact page with your specification, quantity, and delivery terms. Our team typically responds within 24 business hours. You can also email sales.killp@keshanindustries.com or export@keshanindustries.com.",
  },
  {
    id: "export",
    keywords: [
      "export",
      "country",
      "countries",
      "global",
      "international",
      "ship",
      "shipping",
      "出口",
      "国家",
      "exportación",
      "تصدير",
      "دول",
    ],
    answer:
      "Keshan supplies manufacturers and infrastructure customers in 30+ countries. We support export documentation and international standards (IS, ASTM, EN, JIS, and more).",
  },
  {
    id: "leadtime",
    keywords: [
      "lead",
      "time",
      "delivery",
      "dispatch",
      "when",
      "交期",
      "交货",
      "plazo",
      "entrega",
      "مدة",
      "توريد",
    ],
    answer:
      "Lead times depend on product form, grade, and quantity. Share your requirement through Contact or email and we will confirm availability and lead time within 24 business hours.",
  },
  {
    id: "location",
    keywords: [
      "where",
      "location",
      "address",
      "hyderabad",
      "india",
      "plant",
      "factory",
      "地址",
      "印度",
      "ubicación",
      "موقع",
      "حيدرآباد",
    ],
    answer:
      "Keshan Industries is based in Hyderabad, Telangana, India — with modern melting, rolling, and in-house testing infrastructure.",
  },
  {
    id: "purity",
    keywords: [
      "purity",
      "grade",
      "etp",
      "conductivity",
      "99.9",
      "纯度",
      "纯度",
      "pureza",
      "نقاء",
    ],
    answer:
      "Electrolytic copper grades are typically 99.9%+ purity, with Cu-ETP and related grades available. Products are manufactured to international conductivity and composition standards.",
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

export function matchFaq(question: string): FaqEntry | null {
  const q = normalize(question);
  if (!q) return null;

  let best: FaqEntry | null = null;
  let bestScore = 0;

  for (const entry of chatbotFaq) {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      if (q.includes(k)) score += k.length > 4 ? 3 : 2;
      else if (k.length > 3 && q.split(" ").some((w) => w.startsWith(k.slice(0, 4))))
        score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}
