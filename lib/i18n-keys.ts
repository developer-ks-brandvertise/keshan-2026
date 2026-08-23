export const industryKeys = [
  "electrical",
  "switchgear",
  "renewable",
  "ev",
  "cables",
  "construction",
  "electronics",
  "automotive",
  "thermal",
  "defence",
  "rail",
  "telecom",
  "hardware",
] as const;

export const articleKeys = [
  "copper-highs",
  "brass-vs-copper",
  "iacs",
  "copper-grade",
  "lme-cathodes",
  "ev-charging",
  "switchgear-copper",
  "building-copper",
] as const;

export const processKeys = ["01", "02", "03", "04", "05", "06", "07"] as const;

export const qualityPillarKeys = [
  "purity",
  "certified",
  "testing",
  "standards",
] as const;

export const valueKeys = [
  "quality",
  "integrity",
  "reliability",
  "responsible",
  "improvement",
] as const;

export const aboutStatKeys = [
  "years",
  "countries",
  "capacity",
  "quality",
] as const;

export const milestoneYears = [
  "2016",
  "2021",
  "2022",
  "2023",
  "2025",
  "2026",
] as const;

export const locationKeys = ["headOffice", "unit1", "unit2"] as const;

export const regionKeys = [
  "southAsia",
  "middleEast",
  "southeastAsia",
  "china",
  "africa",
  "europe",
] as const;

export const teamKeys = ["vikash", "yash", "suren"] as const;

export const teamKeyByName: Record<string, (typeof teamKeys)[number]> = {
  "Vikash Kumar Keshan": "vikash",
  "Yash Keshan": "yash",
  "Suren Reddy": "suren",
};

export const productIndustryMapSlugs = {
  copper: [
    "copper-ingots",
    "copper-busbars",
    "copper-strips",
    "copper-sheets-plates",
    "copper-upcast-rod",
    "bare-copper-wire",
    "copper-rod",
    "copper-hex-square-round-rods",
    "enamel-copper-wire",
    "paper-insulated-copper-conductors-strips",
    "copper-foils",
    "copper-bar-1kg-5kg",
  ],
  brass: [
    "brass-ingots",
    "brass-sheets-plates",
    "brass-strips",
    "brass-circles",
  ],
} as const;
