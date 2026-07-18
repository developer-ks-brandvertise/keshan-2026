export interface Product {
  slug: string;
  category: "copper" | "brass";
  name: string;
  headline: string;
  description: string;
  applications: string[];
  specs: string[];
  cta: string;
  metaTitle: string;
  metaDescription: string;
}

export const products: Product[] = [
  {
    slug: "copper-ingots",
    category: "copper",
    name: "Copper Ingots",
    headline: "The Foundation of Every Copper Application.",
    description:
      "As one of India’s largest exporters of copper ingots, Keshan produces ingots from high-grade electrolytic copper, melted and cast to precise dimensional and compositional standards. Available in a range of weights and grades, they serve as the primary feedstock for downstream copper processing — from rolling and drawing to alloying.",
    applications: [
      "Wire rod and strip rolling mills",
      "Copper alloy and brass manufacturers",
      "Foundry and casting operations",
      "Export and re-melt customers",
    ],
    specs: [
      "Purity: 99.9% minimum (Cu-ETP grade available)",
      "Available grades: Cu-ETP, Cu-OF, Cu-FRHC",
      "Weight: Standard 10–25 kg per ingot (custom dimensions available)",
      "Standards: IS 191, ASTM B115, EN 1978",
    ],
    cta: "Request a Quote for Copper Ingots",
    metaTitle: "Copper Ingots Manufacturer & Exporter | Keshan Industries | High Purity Cu-ETP",
    metaDescription:
      "One of India's largest exporters of copper ingots. High-purity Cu-ETP and Cu-OF for rolling mills, foundries, and alloy manufacturers. IS, ASTM & EN compliant. Request a quote.",
  },
  {
    slug: "copper-busbars",
    category: "copper",
    name: "Copper Busbars",
    headline: "The Conductor at the Heart of Every Switchboard.",
    description:
      "Keshan copper busbars are manufactured to tight dimensional tolerances for use in switchgear, panel boards, busduct systems, transformers, and high-current distribution equipment — offering high-conductivity performance, precise cross-sections, and a clean surface finish for reliable contact performance in every installation.",
    applications: [
      "LV and MV switchgear and control gear",
      "Busduct and busbar trunking systems",
      "Power transformers and distribution transformers",
      "Industrial panel boards and MCC panels",
      "Battery energy storage systems (BESS)",
      "EV charging stations and power electronics",
    ],
    specs: [
      "Conductivity: Minimum 58 MS/m (100% IACS)",
      "Purity: 99.9% minimum Cu-ETP",
      "Dimensions: Custom width × thickness to specification",
      "Temper: Half-hard (H02), Full-hard (H04), or Soft (O61)",
      "Standards: IS 613, IEC 60317, EN 13601, ASTM B187",
      "Surface: Bright, electro-tinned, or silver-plated on request",
    ],
    cta: "Request a Quote for Copper Busbars",
    metaTitle: "Copper Busbars Manufacturer India | Keshan Industries | IS 613 Compliant",
    metaDescription:
      "High-conductivity copper busbars for switchgear, panels, busducts, and transformers. IS 613, IEC 60317, ASTM B187 compliant. Custom dimensions. Request a quote from Keshan Industries.",
  },
  {
    slug: "copper-strips",
    category: "copper",
    name: "Copper Strips",
    headline: "The Strip Your Transformer Winding Depends On.",
    description:
      "Keshan copper strips are produced on modern slitting lines from high-purity copper coil, delivering consistent width tolerance, smooth edges, and uniform thickness across every metre — application-ready for transformer winding, motor coil manufacturing, and precision stamping.",
    applications: [
      "Transformer winding (distribution and power transformers)",
      "Motor coil and armature winding",
      "Electrical contact and terminal manufacturing",
      "Heat exchanger fins and heating elements",
      "Electronic components and PCB fabrication",
    ],
    specs: [
      "Purity: 99.9% min Cu-ETP",
      "Width: 5mm to 400mm (custom slit to order)",
      "Thickness: 0.1mm to 10mm",
      "Temper: Soft annealed (O61), Half-hard (H02), Hard (H04)",
      "Standards: IS 613, EN 1652, ASTM B152",
    ],
    cta: "Request a Quote for Copper Strips",
    metaTitle: "Copper Strips Manufacturer | Keshan Industries | Transformer & Motor Grade",
    metaDescription:
      "Precision copper strips for transformer winding, motor coils, and electronic components. Custom width and thickness. IS 613, ASTM B152, EN 1652. Request a quote.",
  },
  {
    slug: "copper-sheets-plates",
    category: "copper",
    name: "Copper Sheets & Plates",
    headline: "Flat, True, and Application-Ready.",
    description:
      "Keshan copper sheets and plates are produced to precise thickness and flatness tolerances, with a clean mill finish or polished surface as required — suited to applications from architectural cladding and heat transfer equipment to electrical shielding and precision fabrication.",
    applications: [
      "Architectural cladding, roofing, and decorative applications",
      "Heat exchangers and thermal management systems",
      "Electrical shielding and EMI enclosures",
      "Chemical process equipment and distillation",
      "Custom fabricated electrical components",
    ],
    specs: [
      "Thickness: 0.5mm to 25mm",
      "Width: Up to 1,250mm standard; custom dimensions on request",
      "Temper: Soft / Half-hard / Hard",
      "Surface: Mill finish, bright polished, or brushed",
      "Standards: IS 1545, ASTM B152, EN 1652",
    ],
    cta: "Request a Quote for Copper Sheets & Plates",
    metaTitle: "Copper Sheets & Plates Manufacturer | Keshan Industries | India",
    metaDescription:
      "Precision copper sheets and plates for cladding, heat exchangers, and electrical fabrication. Custom thickness, width, and finish. Request a quote from Keshan Industries.",
  },
  {
    slug: "continuous-cast-rod",
    category: "copper",
    name: "Continuous Cast Rod (CCR)",
    headline: "The CCR That Draws Clean. Every Coil. Every Time.",
    description:
      "Keshan Continuous Cast Rod (CCR) is produced via the Upcast or Contirod process from high-purity electrolytic copper, delivering superior surface quality, consistent grain structure, and excellent drawability — the preferred input material for wire and cable manufacturers.",
    applications: [
      "Enamelled winding wire (magnet wire) production",
      "Electrical cables and conductors",
      "Fine wire drawing for electronics",
      "Flexible conductors and braided cables",
    ],
    specs: [
      "Diameter: 8mm standard (custom dimensions available)",
      "Purity: 99.99% Cu-OF or Cu-ETP",
      "Coil weight: Up to 5,000 kg",
      "Surface: Scale-free, bright finish",
      "Standards: EN 1977, ASTM B49",
    ],
    cta: "Request a Quote for Continuous Cast Rod",
    metaTitle: "Continuous Cast Rod (CCR) Manufacturer | Keshan Industries | Wire Rod Grade",
    metaDescription:
      "High-purity continuous cast copper rod for wire and cable manufacturers. Upcast/Contirod process, 8mm standard, EN 1977 & ASTM B49. Request a quote.",
  },
  {
    slug: "copper-wires-rods",
    category: "copper",
    name: "Copper Wires & Rods",
    headline: "Drawn to Spec. Wound to Your World.",
    description:
      "Keshan copper wires and rods are produced from continuously cast rod through precision drawing dies, delivering consistent diameter, smooth surface finish, and high-conductivity performance. Available across a range of diameters, tempers, and coil configurations for electrical, construction, and telecommunications applications.",
    applications: [
      "Power cables and flexible cords",
      "Building and construction wiring",
      "Overhead conductors and earthing systems",
      "Winding wires and motor windings",
      "Telecommunications and data cables",
    ],
    specs: [
      "Diameter: 0.1mm (fine wire) to 10mm (rod)",
      "Conductivity: Min 58 MS/m (100% IACS)",
      "Temper: Soft annealed (O61), Hard drawn (H04)",
      "Standards: IS 8130, IS 1897, IEC 60228, ASTM B3, EN 13602",
    ],
    cta: "Request a Quote for Copper Wires & Rods",
    metaTitle: "Copper Wires & Rods Manufacturer | Keshan Industries | India",
    metaDescription:
      "Precision copper wires and rods for electrical, construction, and telecommunications applications. Custom diameter and temper. Request a quote.",
  },
  {
    slug: "copper-nuggets",
    category: "copper",
    name: "Copper Nuggets",
    headline: "Consistent Chemistry. Clean Charge. Every Batch.",
    description:
      "Keshan copper nuggets are produced from high-purity copper and are batch-tested for use as a charge material in foundries, alloy manufacturers, and brass producers. Their compact form ensures easy handling and consistent charging in induction and reverberatory furnaces.",
    applications: [
      "Brass and copper alloy manufacturing",
      "Foundry charge material",
      "Electroplating anodes and bath additions",
      "Chemical copper applications",
    ],
    specs: [
      "Purity: 99.5% to 99.9%",
      "Size: 20–80mm typical",
      "Packaging: Bulk bags or wooden pallets",
    ],
    cta: "Request a Quote for Copper Nuggets",
    metaTitle: "Copper Nuggets Supplier | Keshan Industries | Foundry Charge Material",
    metaDescription:
      "High-purity copper nuggets for foundries, alloy manufacturers, and brass producers. Batch-tested, consistent chemistry. Request a quote.",
  },
  {
    slug: "copper-1kg-bars",
    category: "copper",
    name: "Copper 1 KG Bars",
    headline: "Stamped for Purity. Traceable to the Pour.",
    description:
      "Keshan copper 1 KG bars are cast to precise weight and purity standards for use in jewellery manufacturing, electroplating, laboratory applications, and artisanal copper work. Each bar carries a purity stamp and is traceable to its production batch.",
    applications: [
      "Jewellery and decorative arts",
      "Electroplating and surface treatment baths",
      "Laboratory reference material",
      "Artisanal copper casting and craft applications",
    ],
    specs: [
      "Weight: 1 KG ± 5g per bar",
      "Purity: 99.9% minimum",
      "Packaging: Shrink-wrapped, boxed",
    ],
    cta: "Request a Quote for Copper 1 KG Bars",
    metaTitle: "Copper 1 KG Bars Manufacturer | Keshan Industries | 99.9% Pure",
    metaDescription:
      "High-purity copper 1 KG bars for jewellery, electroplating, and laboratory use. Precise weight, stamped purity, traceable batch. Request a quote.",
  },
  {
    slug: "copper-anodes",
    category: "copper",
    name: "Copper Anodes",
    headline: "The Starting Point for Every Electrodeposited Copper Surface.",
    description:
      "Keshan copper anodes are manufactured from high-purity oxygen-free copper, cast to precise dimensional specifications for use in electroplating, electrolytic refining, and printed circuit board manufacturing. A controlled microstructure and high purity ensure smooth, consistent dissolution during the plating process.",
    applications: [
      "Electroplating of copper onto ferrous and non-ferrous substrates",
      "PCB copper electrodeposition",
      "Electrolytic copper refining baths",
      "Electroforming and electrotyping",
    ],
    specs: [
      "Purity: 99.9% to 99.99% Cu-OF",
      "Phosphorus content: 0.04–0.065% for phosphorised grade",
      "Form: Plate anodes, ball anodes, nugget anodes",
      "Standards: ASTM B115, EN 1978",
    ],
    cta: "Request a Quote for Copper Anodes",
    metaTitle: "Copper Anodes Manufacturer | Keshan Industries | Electroplating Grade",
    metaDescription:
      "High-purity oxygen-free copper anodes for electroplating, PCB manufacturing, and electrolytic refining. ASTM B115 & EN 1978 compliant. Request a quote.",
  },
  {
    slug: "copper-cathodes",
    category: "copper",
    name: "Copper Cathodes",
    headline: "The Purest Form of Copper. The Benchmark Grade.",
    description:
      "Keshan copper cathodes represent the highest level of copper purity available — the primary traded form of refined copper on the London Metal Exchange and the feedstock for all downstream copper manufacturing. Our cathodes meet Grade A LME standards and serve as input material for our own production lines as well as supply to other manufacturers.",
    applications: [
      "Downstream copper processing (wire drawing, rolling)",
      "Copper alloy and brass manufacturing",
      "Export and commodity trading",
      "Electroplating bath replenishment",
    ],
    specs: [
      "Grade: LME Grade A (BS EN 1978)",
      "Purity: 99.99% minimum",
      "Dimensions: 914 × 914 × 12mm standard (LME spec)",
      "Packaging: Strapped bundles per LME warehouse standard",
    ],
    cta: "Request a Quote for Copper Cathodes",
    metaTitle: "Copper Cathodes Supplier | Keshan Industries | LME Grade A",
    metaDescription:
      "LME Grade A copper cathodes with 99.99% purity. Feedstock for downstream copper manufacturing and commodity trading. Request a quote.",
  },
  {
    slug: "brass-ingots",
    category: "brass",
    name: "Brass Ingots",
    headline: "Precisely Alloyed. Ready to Cast.",
    description:
      "Keshan brass ingots are produced from controlled compositions of copper and zinc — with alloying additions as required — delivering consistent melt chemistry for brass foundries, die casters, and alloy manufacturers. Ingots are screened for trace elements and cast to standard shapes for easy furnace charging.",
    applications: [
      "Brass foundries and gravity die casting",
      "Pressure die casting for hardware and fittings",
      "Sanitary fittings, valves, and taps",
      "Decorative components and architectural hardware",
    ],
    specs: [
      "Grades: CuZn37 (MS63), CuZn40 (MS60), CuZn30, and custom alloys",
      "Trace elements: Controlled to standard and customer specification",
      "Weight: 5–15 kg per ingot standard",
      "Standards: IS 292, ASTM B30, EN 1982",
    ],
    cta: "Request a Quote for Brass Ingots",
    metaTitle: "Brass Ingots Manufacturer | Keshan Industries | CuZn37 & CuZn40",
    metaDescription:
      "Precision-alloyed brass ingots for foundries, die casters, and hardware manufacturers. CuZn37, CuZn40, custom alloys. IS 292, ASTM B30, EN 1982. Request a quote.",
  },
  {
    slug: "brass-sheets-plates",
    category: "brass",
    name: "Brass Sheets & Plates",
    headline: "Flat, Bright, and Built for Fabrication.",
    description:
      "Keshan brass sheets and plates are produced with tight thickness tolerances, consistent alloy composition, and a smooth surface finish — the preferred choice for architects, decorative fabricators, and component manufacturers who need brass that performs and looks the part.",
    applications: [
      "Architectural cladding, facades, and decorative panels",
      "Musical instruments and acoustic components",
      "Electrical components and connector blanks",
      "Engraving plates and name plates",
      "Chemical process vessels and liners",
    ],
    specs: [
      "Alloy: CuZn37 (MS63) standard; others available",
      "Thickness: 0.5mm to 12mm",
      "Width: Up to 1,250mm",
      "Temper: Soft / Half-hard / Hard",
      "Standards: IS 1385, ASTM B36, EN 1652",
    ],
    cta: "Request a Quote for Brass Sheets & Plates",
    metaTitle: "Brass Sheets & Plates Manufacturer | Keshan Industries | India",
    metaDescription:
      "Brass sheets and plates for architecture, instruments, and electrical components. Custom thickness, width, and temper. Request a quote.",
  },
  {
    slug: "brass-strips",
    category: "brass",
    name: "Brass Strips",
    headline: "Precision Slit. Press-Ready. Stamp-Ready.",
    description:
      "Keshan brass strips are slit to precise widths from high-quality brass coil, delivering consistent width tolerance and edge quality for stamping, pressing, and deep drawing operations. Uniform mechanical properties across the coil make them suited to high-volume parts manufacturing.",
    applications: [
      "Electrical contacts and connectors",
      "Terminals, clips, and springs",
      "Zipper and fastener manufacturing",
      "Radiator fins and heat exchanger components",
      "Decorative trim and furniture hardware",
    ],
    specs: [
      "Alloy: CuZn37, CuZn30, CuZn28, and others",
      "Width: 5mm to 400mm",
      "Thickness: 0.1mm to 5mm",
      "Standards: IS 1385, ASTM B36, EN 1652",
    ],
    cta: "Request a Quote for Brass Strips",
    metaTitle: "Brass Strips Manufacturer | Keshan Industries | Precision Slit",
    metaDescription:
      "Precision-slit brass strips for stamping, pressing, and deep drawing. CuZn37, CuZn30, custom alloys. Request a quote from Keshan Industries.",
  },
  {
    slug: "brass-circles",
    category: "brass",
    name: "Brass Circles",
    headline: "Blanked to Your Diameter. Press-Ready. Burr-Free.",
    description:
      "Keshan brass circles are blanked from precision brass sheet to custom dimensions — diameter and thickness — ready for deep drawing, spinning, and press forming operations. Widely used in cookware manufacturing, sanitaryware fittings, and decorative pressed components.",
    applications: [
      "Cookware — pots, pans, and vessels",
      "Sanitaryware — taps, valves, and fittings",
      "Decorative pressed components",
      "Automotive and industrial housings",
    ],
    specs: [
      "Diameter: 50mm to 1,000mm",
      "Thickness: 0.4mm to 4mm",
      "Alloy: CuZn37, CuZn30",
      "Edge: Clean shear edge, burr-free",
    ],
    cta: "Request a Quote for Brass Circles",
    metaTitle: "Brass Circles Manufacturer | Keshan Industries | Cookware & Sanitaryware",
    metaDescription:
      "Brass circles blanked to custom diameter and thickness for cookware, sanitaryware, and decorative components. Burr-free, press-ready. Request a quote.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: "copper" | "brass"): Product[] {
  return products.filter((p) => p.category === category);
}
