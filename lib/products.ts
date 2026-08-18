export interface Product {
  slug: string;
  category: "copper" | "brass";
  name: string;
  headline: string;
  description: string;
  applications: string[];
  specs: string[];
  /** When set, Technical table renders one row per group instead of a single product row */
  specGroups?: { label: string; items: string[] }[];
  cta: string;
  metaTitle: string;
  metaDescription: string;
  /** Public path to a GLB/GLTF model shown on the product page */
  modelSrc?: string;
  /** Optional page-specific note block */
  note?: string;
}

export const products: Product[] = [
  {
    slug: "copper-ingots",
    category: "copper",
    name: "Copper Ingots",
    headline: "The Foundation of Every Copper Application.",
    description:
      "As one of India’s largest exporters of copper ingots, Keshan produces ingots from high-grade electrolytic copper, melted and cast to precise dimensional and compositional standards. Available as pure copper and alloy grades across a range of weights, they serve as the primary feedstock for downstream copper processing — from rolling and drawing to alloying.",
    applications: [
      "Wire rod and strip rolling mills",
      "Copper alloy and brass manufacturers",
      "Foundry and casting operations",
      "Export and re-melt customers",
    ],
    specs: [],
    specGroups: [
      {
        label: "Pure Copper Ingots",
        items: [
          "Small Ingot: 250 mm × 225 mm × 50 mm, weight 22–25 kgs",
          "Medium Ingot: 380 mm × 330 mm × 50 mm, weight 50–60 kgs",
          "Large Ingots: 1500 mm × 100 mm × 100 mm, weight 200–255 kgs",
          "Purity: 99.9% minimum",
          "Standards: IS 191, ASTM B115, EN 1978",
        ],
      },
      {
        label: "Alloy Ingots",
        items: [
          "Copper-based alloy compositions tailored to customer melt chemistry",
          "Typical grades for brass, bronze, and specialty copper alloys",
          "Small / Medium formats for foundry and remelt charging",
          "Screened for controlled trace elements and consistent pour chemistry",
          "Standards aligned to IS, ASTM, and EN alloy specifications on request",
        ],
      },
    ],
    cta: "Request a Quote for Copper Ingots",
    metaTitle: "Copper Ingots Manufacturer & Exporter | Keshan Industries | High Purity",
    metaDescription:
      "One of India's largest exporters of copper ingots. Pure copper and alloy ingots for rolling mills, foundries, and alloy manufacturers. IS, ASTM & EN compliant. Request a quote.",
    modelSrc: "/3d-assets/copper_stone.glb",
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
      "Cross section: up to 3000 mm",
      "Width: up to 300 mm",
      "Thickness: up to 50 mm",
      "Shape: Rectangular, square, round-edge, and custom corner radius",
      "Hardness: Soft or Half-hard copper busbars",
      "Packing: Pancake coils or Straight lengths of custom sizes",
      "Material: OFC / ETP with minimum 99.90% Cu",
      "Conductivity: Minimum 100% IACS (soft), minimum 97% (hard)",
      "Tin coating: minimum 8 microns; silver coating: minimum 0.5 microns",
      "Standards: IS, BS, DIN, EN, ASTM and customer standards",
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
      "Size: 0 to 36 SWG",
      "Purity: 99.9% min Cu-ETP",
      "Width: 5 mm to 400 mm (custom slit to order)",
      "Thickness: 0.1 mm to 10 mm",
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
    name: "Copper Sheet, Plates & Circles",
    headline: "Flat, True, and Application-Ready.",
    description:
      "Keshan copper sheets, plates, and circles are produced to precise thickness and flatness tolerances, with a clean mill finish or polished surface as required — suited to applications from architectural cladding and heat transfer equipment to electrical shielding, cookware blanks, and precision fabrication.",
    applications: [
      "Architectural cladding, roofing, and decorative applications",
      "Heat exchangers and thermal management systems",
      "Electrical shielding and EMI enclosures",
      "Circle blanks for spinning, pressing, and deep drawing",
      "Chemical process equipment and custom fabrication",
    ],
    specs: [
      "Width: 101.6 mm × 101.6 mm to 1219.2 × 1219.2 mm",
      "Thickness: 0.3 mm to 16 mm",
      "Circle Sheet: Dia up to 1220 mm, Thickness: 0.3–8 mm",
      "Temper: Soft / Half-hard / Hard",
      "Surface: Mill finish, bright polished, or brushed",
      "Standards: IS 1545, ASTM B152, EN 1652",
    ],
    cta: "Request a Quote for Copper Sheet, Plates & Circles",
    metaTitle: "Copper Sheet, Plates & Circles Manufacturer | Keshan Industries | India",
    metaDescription:
      "Precision copper sheets, plates, and circles for cladding, heat exchangers, and fabrication. Custom thickness, width, diameter, and finish. Request a quote from Keshan Industries.",
  },
  {
    slug: "copper-upcast-rod",
    category: "copper",
    name: "Copper Upcast Rod",
    headline: "The Rod That Draws Clean. Every Coil. Every Time.",
    description:
      "Keshan Copper Upcast Rod is produced via the Upcast continuous casting process from high-purity electrolytic copper, delivering superior surface quality, consistent grain structure, and excellent drawability — the preferred input material for wire and cable manufacturers.",
    applications: [
      "Enamelled winding wire (magnet wire) production",
      "Electrical cables and conductors",
      "Fine wire drawing for electronics",
      "Flexible conductors and braided cables",
    ],
    specs: [
      "Dia: 4 mm, 8 mm, 12.5 mm",
      "Purity: 99.99% Cu-OF or Cu-ETP",
      "Coil weight: Up to 5,000 kg",
      "Process: Upcast continuous casting",
      "Surface: Scale-free, bright finish",
      "Standards: EN 1977, ASTM B49",
    ],
    cta: "Request a Quote for Copper Upcast Rod",
    metaTitle: "Copper Upcast Rod Manufacturer | Keshan Industries | Wire Rod Grade",
    metaDescription:
      "High-purity copper upcast rod for wire and cable manufacturers. Upcast process, 8mm standard, EN 1977 & ASTM B49. Request a quote.",
  },
  {
    slug: "bare-copper-wire",
    category: "copper",
    name: "Bare Copper Wire",
    headline: "Drawn to Spec. Conductivity Without Compromise.",
    description:
      "Keshan bare copper wire is drawn from continuously cast rod through precision dies, delivering consistent diameter, smooth surface finish, and high-conductivity performance for power cables, building wire, earthing, and telecommunications.",
    applications: [
      "Power cables and flexible cords",
      "Building and construction wiring",
      "Overhead conductors and earthing systems",
      "Telecommunications and data cables",
    ],
    specs: [
      "Size: 0 to 36 SWG",
      "Diameter: 0.1 mm (fine wire) to 10 mm",
      "Conductivity: Min 58 MS/m (100% IACS)",
      "Temper: Soft annealed (O61), Hard drawn (H04)",
      "Standards: IS 8130, IEC 60228, ASTM B3, EN 13602",
    ],
    cta: "Request a Quote for Bare Copper Wire",
    metaTitle: "Bare Copper Wire Manufacturer | Keshan Industries | India",
    metaDescription:
      "High-conductivity bare copper wire for electrical, construction, and telecom applications. Custom diameter and temper. Request a quote.",
    modelSrc: "/3d-assets/copper_wire_coil.glb",
  },
  {
    slug: "copper-rod",
    category: "copper",
    name: "Copper Rod",
    headline: "Solid Section. Reliable Conductivity.",
    description:
      "Keshan copper rod is produced for electrical and industrial applications that demand consistent diameter, high conductivity, and clean surface quality — from earthing and bus connections to machining stock and fabrication.",
    applications: [
      "Earthing and grounding systems",
      "Electrical connectors and terminals",
      "Machining and fabrication stock",
      "Industrial current-carrying components",
    ],
    specs: [
      "Diameter: typically 6 mm to 90 mm (custom on request)",
      "Purity: 99.9% minimum",
      "Conductivity: Min 58 MS/m (100% IACS)",
      "Temper: Soft / Half-hard / Hard",
      "Standards: IS 1897, ASTM B187, EN 13601",
    ],
    cta: "Request a Quote for Copper Rod",
    metaTitle: "Copper Rod Manufacturer | Keshan Industries | India",
    metaDescription:
      "Precision copper rod for earthing, connectors, and industrial fabrication. High conductivity, custom diameters. Request a quote.",
  },
  {
    slug: "copper-hex-square-round-rods",
    category: "copper",
    name: "Copper Hex, Square, Round Rods",
    headline: "Shaped Stock. Ready for Precision Machining.",
    description:
      "Keshan supplies copper rods in hexagonal, square, and round sections for machining, forging, and component manufacturing — with controlled chemistry, consistent cross-section, and finish suited to CNC and conventional machine shops.",
    applications: [
      "CNC and conventional machining stock",
      "Electrical hardware and fasteners",
      "Valve, fitting, and connector blanks",
      "Industrial and decorative fabricated parts",
    ],
    specs: [
      "Shapes: Hexagonal, Square, Round",
      "Size range: custom across common metric sections",
      "Purity: 99.9% minimum",
      "Temper: Soft / Half-hard / Hard",
      "Standards: IS / ASTM / EN on request",
    ],
    cta: "Request a Quote for Copper Hex, Square & Round Rods",
    metaTitle: "Copper Hex, Square & Round Rods | Keshan Industries",
    metaDescription:
      "Copper hex, square, and round rods for machining and electrical hardware. Consistent section and chemistry. Request a quote.",
  },
  {
    slug: "enamel-copper-wire",
    category: "copper",
    name: "Enamel Copper Wire",
    headline: "Magnet Wire Built for Windings That Last.",
    description:
      "Keshan enamel copper wire (magnet wire) is produced from high-purity copper with uniform enamel insulation for motors, transformers, generators, and coil windings — delivering dielectric integrity, thermal class performance, and consistent drawability.",
    applications: [
      "Motor and generator windings",
      "Transformer and inductor coils",
      "Solenoids and electromagnetic devices",
      "Automotive and appliance motors",
    ],
    specs: [
      "Sizes: 0.55 mm to 3.65 mm (24 SWG to 9 SWG)",
      "Insulation thickness: Grade 1, Grade 2, Grade 3",
      "Insulation thermal class: polyesterimide 180°C, polyesterimide-imide overcoat 200°C",
      "Standards: IEC 60317-16, IS 13730-16",
    ],
    cta: "Request a Quote for Enamel Copper Wire",
    metaTitle: "Enamel Copper Wire Manufacturer | Keshan Industries | Magnet Wire",
    metaDescription:
      "Enamel copper magnet wire for motors, transformers, and coils. Uniform insulation, high conductivity. Request a quote.",
  },
  {
    slug: "copper-blister",
    category: "copper",
    name: "Copper Blister",
    headline: "Intermediate Copper. Ready for the Next Refine.",
    description:
      "Keshan copper blister is supplied as an intermediate refined copper form for further pyro-metallurgical or electrolytic refining, alloying, and remelt operations — with controlled impurity levels suited to downstream processing.",
    applications: [
      "Electrolytic refining feedstock",
      "Secondary copper refining",
      "Alloy and brass manufacturing charge",
      "Export remelt customers",
    ],
    specs: [
      "Form: Blister copper cakes / plates as available",
      "Copper content: typically 98%+ (lot-certified)",
      "Impurity profile: screened and batch-documented",
      "Packaging: strapped bundles or as agreed",
    ],
    cta: "Request a Quote for Copper Blister",
    metaTitle: "Copper Blister Supplier | Keshan Industries",
    metaDescription:
      "Copper blister for refining, remelt, and alloy manufacturing. Lot-certified chemistry. Request a quote from Keshan Industries.",
  },
  {
    slug: "paper-insulated-copper-conductors-strips",
    category: "copper",
    name: "Paper Insulated Copper Conductors Strips",
    headline: "Insulated Strip for High-Reliability Windings.",
    description:
      "Keshan paper-insulated copper conductor (PICC) strips combine high-conductivity copper strip with kraft or specialized paper insulation for transformer and reactor windings — delivering dielectric strength, oil compatibility, and dimensional consistency.",
    applications: [
      "Power and distribution transformer windings",
      "Reactor and choke coils",
      "Oil-immersed electrical equipment",
      "Specialty high-voltage winding applications",
    ],
    specs: [
      "Copper strips: width 3 mm – 16 mm, thickness 1.2 mm – 6 mm",
      "Copper wires: diameter 1.2 mm – 2.5 mm",
      "Insulation: Thermokraft IEC 554-2 / VDE 0311 / Nomex T-410 / Cindus (as required)",
      "Edge: Burr-controlled for winding integrity",
      "Standards: DIN EN 13601, DIN 46434, DIN 46452, IS-8572:1993",
    ],
    cta: "Request a Quote for Paper Insulated Copper Conductor Strips",
    metaTitle: "Paper Insulated Copper Conductor Strips | Keshan Industries",
    metaDescription:
      "PICC strips for transformer and reactor windings. High-conductivity copper with paper insulation. Request a quote.",
  },
  {
    slug: "copper-foils",
    category: "copper",
    name: "Copper Foils",
    headline: "Thin Gauge. Uniform Thickness. Clean Surface.",
    description:
      "Keshan copper foils are rolled and slit to thin gauges for electronics, shielding, flexible circuits, and precision laminates — with tight thickness tolerance, clean edges, and surface finish suited to downstream lamination and etching.",
    applications: [
      "PCB and flexible circuit manufacturing",
      "EMI / RFI shielding",
      "Battery and energy storage components",
      "Decorative and architectural laminates",
    ],
    specs: [
      "Width: 15–150 mm (custom slit available)",
      "Thickness: 0.1 mm to 1 mm",
      "Purity: 99.9% minimum",
      "Temper: Soft annealed / as specified",
      "Standards: ASTM B152, EN 1652, IS equivalents",
    ],
    cta: "Request a Quote for Copper Foils",
    metaTitle: "Copper Foils Manufacturer | Keshan Industries",
    metaDescription:
      "Precision copper foils for electronics, shielding, and laminates. Tight thickness control. Request a quote.",
  },
  {
    slug: "phosphorous-copper-bar",
    category: "copper",
    name: "Phosphorous Copper Bar",
    headline: "Deoxidised Copper. Controlled Phosphorus. Clean Melts.",
    description:
      "Keshan phosphorous copper bars are formulated with controlled phosphorus content for deoxidation and alloying additions in foundries and melt shops — delivering consistent P levels and reliable melt behaviour batch after batch.",
    applications: [
      "Copper and brass melt deoxidation",
      "Alloy manufacturing charge additions",
      "Foundry phosphorus master alloy use",
      "Electroplating and specialty melts",
    ],
    specs: [
      "Form: Bars / sticks for furnace charging",
      "Phosphorus content: typically 8–15% P (grades on request)",
      "Balance: High-purity copper",
      "Packaging: Bundled / boxed for foundry handling",
    ],
    cta: "Request a Quote for Phosphorous Copper Bar",
    metaTitle: "Phosphorous Copper Bar | Keshan Industries | Deoxidiser Grade",
    metaDescription:
      "Phosphorous copper bars for melt deoxidation and alloy additions. Controlled P content. Request a quote.",
  },
  {
    slug: "phosphorous-copper-nuggets",
    category: "copper",
    name: "Phosphorous Copper Nuggets",
    headline: "Consistent Chemistry. Clean Charge. Every Batch.",
    description:
      "Keshan phosphorous copper nuggets are produced with controlled phosphorus levels for foundry and alloy charge applications. Their compact form ensures easy handling and consistent charging in induction and reverberatory furnaces.",
    applications: [
      "Brass and copper alloy manufacturing",
      "Foundry charge and deoxidation additions",
      "Electroplating bath chemistry adjustments",
      "Chemical copper applications",
    ],
    specs: [
      "Purity / Cu base: high-purity copper with controlled P",
      "Phosphorus content: graded to customer melt requirements",
      "Size: 20–80 mm typical",
      "Packaging: Bulk bags or wooden pallets",
    ],
    cta: "Request a Quote for Phosphorous Copper Nuggets",
    metaTitle: "Phosphorous Copper Nuggets | Keshan Industries | Foundry Charge",
    metaDescription:
      "Phosphorous copper nuggets for foundries and alloy manufacturers. Batch-tested chemistry. Request a quote.",
  },
  {
    slug: "copper-bar-1kg-5kg",
    category: "copper",
    name: "Copper Bar 1kg & 5kg",
    headline: "Stamped for Purity. Sized for Flexible Charging.",
    description:
      "Keshan copper bars in 1kg and 5kg formats are cast to precise weight and purity standards for foundries, electroplating, laboratory use, and small-to-medium remelt charging. Each bar is batch-traceable for dependable chemistry and clean handling.",
    applications: [
      "Foundries and remelt charging",
      "Automotive and industrial component remelt stock",
      "Electroplating and surface treatment baths",
      "Laboratory and small-scale manufacturing",
    ],
    specs: [
      "Weight options: 1 KG bars and 5 KG bars",
      "Purity: 99.9% minimum",
      "Form: Cast bars / biscuits for easy charging",
      "Packaging: Shrink-wrapped, boxed, or palletised",
    ],
    cta: "Request a Quote for Copper Bar 1kg & 5kg",
    metaTitle: "Copper Bar 1kg & 5kg | Keshan Industries | 99.9% Pure",
    metaDescription:
      "High-purity copper bars in 1kg and 5kg formats for foundry, remelt, and electroplating applications. Request a quote.",
    modelSrc: "/3d-assets/copper_bar.glb",
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
    slug: "copper-scrap",
    category: "copper",
    name: "Copper Scrap",
    headline: "Sorted. Graded. Ready for the Furnace.",
    description:
      "Keshan copper scrap is sourced from verified suppliers, then inspected, sorted, and graded for remelt and recycling streams. We support circular manufacturing with transparent grade classification and lot-level quality checks before processing.",
    applications: [
      "Secondary copper remelt",
      "Foundry charge material",
      "Brass and alloy manufacturing",
      "Recycling and circular supply chains",
    ],
    specs: [
      "Grades: Birch / Cliff / Candy / equivalent ISRI classes as available",
      "Form: Wire, sheet, tube, mixed — sorted by lot",
      "Contamination: screened and documented",
      "Packaging: Baled, bundled, or loose as agreed",
      "Annual copper and brass recycling capability: approximately 36,000 MT",
    ],
    cta: "Request a Quote for Copper Scrap",
    metaTitle: "Copper Scrap Supplier | Keshan Industries",
    metaDescription:
      "Sorted and graded copper scrap for remelt, foundries, and recycling. Transparent grades. Request a quote.",
  },
  {
    slug: "brass-ingots",
    category: "brass",
    name: "Brass Ingots",
    headline: "Precisely Alloyed. Ready to Cast.",
    description:
      "Keshan brass ingots are manufactured using high-purity copper and zinc with precisely controlled alloying additions to ensure consistent chemical composition and metallurgical quality. Each batch is spectrometrically analysed for composition and trace element control to match customer and international standards.",
    applications: [
      "Brass foundries and gravity die casting",
      "Pressure die casting for hardware and engineering components",
      "Sanitary fittings, valves, faucets, and plumbing accessories",
      "Electrical and electronic components",
      "Decorative and architectural hardware",
      "Automotive and industrial engineering applications",
    ],
    specs: [
      "Small Ingot: 250 mm × 225 mm × 50 mm, weight 22 kgs",
      "Medium Ingot: 380 mm × 330 mm × 50 mm, weight 50 kgs",
      "Grades: CuZn37 (MS63), CuZn40 (MS60), CuZn30, leaded and aluminium brass grades",
      "Element ranges: Cu 55-65, Sn up to 1.0%, Pb 0-1.5%, Zn balance, Ni/Al/Fe as specified",
      "Standards: IS 292, ASTM B30, EN 1982, JIS (custom grades available)",
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
      "Width: 101.6 mm × 101.6 mm to 1219.2 × 1219.2 mm",
      "Thickness: 0.3 mm to 16 mm",
      "Alloy: CuZn37 (MS63) standard; others available",
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
      "Width: 101.6 mm × 101.6 mm to 1219.2 × 1219.2 mm",
      "Thickness: 0.3 mm to 16 mm",
      "Diameter: 50 mm to 1,000 mm",
      "Alloy: CuZn37, CuZn30",
      "Edge: Clean shear edge, burr-free",
    ],
    cta: "Request a Quote for Brass Circles",
    metaTitle: "Brass Circles Manufacturer | Keshan Industries | Cookware & Sanitaryware",
    metaDescription:
      "Brass circles blanked to custom diameter and thickness for cookware, sanitaryware, and decorative components. Burr-free, press-ready. Request a quote.",
  },
  {
    slug: "brass-scrap",
    category: "brass",
    name: "Brass Scrap",
    headline: "Sorted Brass. Graded for Remelt.",
    description:
      "Keshan brass scrap is sorted and graded for foundries, remelters, and recycling partners, supplying consistent Cu/Zn feedstock with transparent grade classification for efficient melting and alloying.",
    applications: [
      "Brass foundry remelt",
      "Secondary alloy manufacturing",
      "Recycling and circular supply chains",
      "Hardware and sanitaryware melt shops",
    ],
    specs: [
      "Grades: Honey / mixed yellow / ISRI-equivalent classes as available",
      "Form: Turnings, solids, mixed — sorted by lot",
      "Contamination: screened and documented",
      "Packaging: Baled, bundled, or loose as agreed",
      "Annual copper and brass recycling capability: approximately 36,000 MT",
    ],
    cta: "Request a Quote for Brass Scrap",
    metaTitle: "Brass Scrap Supplier | Keshan Industries",
    metaDescription:
      "Sorted and graded brass scrap for foundries and remelt. Transparent grades. Request a quote from Keshan Industries.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: "copper" | "brass"): Product[] {
  return products.filter((p) => p.category === category);
}

export const productIndustriesMap: Record<
  string,
  { industries: string[]; note?: string }
> = {
  "copper-ingots": {
    industries: ["Electronics & PCB", "Construction", "Automotive & Industrial"],
  },
  "copper-busbars": {
    industries: ["Electrical & Power", "Switchgear & Panels", "Renewable Energy", "Rail"],
  },
  "copper-strips": {
    industries: ["Switchgear & Panels", "Electronics & PCB", "Rail"],
  },
  "copper-sheets-plates": {
    industries: ["Construction", "Defense & Aerospace", "Heat Exchangers"],
  },
  "copper-upcast-rod": {
    industries: ["Cable", "Electrical & Power"],
  },
  "bare-copper-wire": {
    industries: ["Cable", "Electrical & Power", "Telecommunications"],
  },
  "copper-rod": {
    industries: ["Cable", "Automotive & Industrial"],
  },
  "copper-hex-square-round-rods": {
    industries: ["Switchgear & Panels", "Automotive & Industrial", "Defense & Aerospace"],
  },
  "enamel-copper-wire": {
    industries: ["EV Charging", "Electrical & Power", "Automotive (motor windings)"],
  },
  "copper-blister": {
    industries: [],
    note: "Internal feedstock only (refining input); not a customer-facing industries-served item.",
  },
  "paper-insulated-copper-conductors-strips": {
    industries: ["Rail", "Power Transmission / Electrical & Power"],
  },
  "copper-foils": {
    industries: ["Electronics & PCB", "Telecommunications"],
  },
  "phosphorous-copper-bar": {
    industries: [],
    note: "Alloying input for foundries; not an end-industry facing product.",
  },
  "phosphorous-copper-nuggets": {
    industries: [],
    note: "Alloying/foundry input product; not an end-industry facing product.",
  },
  "copper-bar-1kg-5kg": {
    industries: ["Foundries", "Automotive & Industrial", "Small-scale Manufacturing"],
  },
  "copper-scrap": {
    industries: ["Foundries", "Secondary Refiners", "Alloy Manufacturers"],
  },
  "brass-ingots": {
    industries: ["Foundries & Die-Casting", "Plumbing & Sanitaryware", "Automotive & Industrial"],
  },
  "brass-sheets-plates": {
    industries: ["Architectural & Decorative Hardware", "Construction"],
  },
  "brass-strips": {
    industries: [
      "Electrical & Electronics",
      "Switchgear & Electrical Accessories",
      "Telecommunications",
    ],
  },
  "brass-circles": {
    industries: ["Plumbing & Sanitaryware", "Foundries & Die-Casting"],
  },
  "brass-scrap": {
    industries: [],
    note: "Internal feedstock/raw material for recycling and remelt, not an industries-served item.",
  },
};

export type ScrapGradeItem = {
  grade: string;
  title: string;
  description: string;
  image: string;
};

export const scrapGrades: Record<string, ScrapGradeItem[]> = {
  "copper-scrap": [
    {
      grade: "Barley",
      title: "Copper Scrap Barley (as per ISRI)",
      image: "/images/inner-img2.jpg",
      description:
        "COPPER WIRE. Consists of No. 1 bare, uncoated, unalloyed copper wire (Bare Bright). Wire gauge is subject to buyer-seller agreement. Includes green copper wire and hydraulically compacted material.",
    },
    {
      grade: "Berry",
      title: "Copper Scrap Berry (as per ISRI)",
      image: "/images/project-img1.jpg",
      description:
        "COPPER WIRE. Consists of clean, untinned, uncoated, unalloyed copper wire and cable, free of brittle burnt wire and free of copper tubing. Includes hydraulically briquetted copper.",
    },
    {
      grade: "Birch",
      title: "Copper Scrap Birch (as per ISRI)",
      image: "/images/project-img2.jpg",
      description:
        "COPPER WIRE. Miscellaneous unalloyed copper wire with nominal 96% copper (minimum 94%) by electrolytic assay. Free of excessively leaded/tinned/soldered wire, brass/bronze wire, excess oil, iron, non-metallics, burnt wire, insulation, hair wire, brittle burnt wire, and ash.",
    },
    {
      grade: "Cliff",
      title: "Copper Scrap Cliff (as per ISRI)",
      image: "/images/service1.jpg",
      description:
        "COPPER SOLIDS AND TUBING. Miscellaneous unalloyed copper scrap with nominal 96% copper (minimum 94%) by electrolytic assay. Free of excessively leaded/tinned/soldered scrap, brasses/bronzes, excess oil, iron, non-metallics, non-copper tube connections, insulation, burnt wire, and ash.",
    },
    {
      grade: "Birch/Cliff",
      title: "Copper Scrap Birch/Cliff (as per ISRI)",
      image: "/images/service2.jpg",
      description:
        "A combination of copper wire and copper solids as defined in Birch and Cliff grades.",
    },
    {
      grade: "Candy",
      title: "Copper Scrap Candy (as per ISRI)",
      image: "/images/service3.jpg",
      description:
        "NO. 2 HEAVY COPPER SOLIDS AND TUBING. Consists of clean, unalloyed, uncoated copper clippings, punchings, bus bars, commutator segments, and clean copper tubing. Includes hydraulically briquetted copper.",
    },
    {
      grade: "Berry/Candy",
      title: "Copper Scrap Berry/Candy (as per ISRI)",
      image: "/images/service5.jpg",
      description:
        "A combination of copper wire and heavy copper as defined in Berry and Candy grades.",
    },
    {
      grade: "Clove",
      title: "Copper Scrap Clove (as per ISRI)",
      image: "/images/service-img2.jpg",
      description:
        "COPPER WIRE NODULES. No. 1 bare, uncoated, unalloyed copper wire nodules, chopped/shredded. Free of tin, lead, zinc, aluminum, iron, insulation, and foreign contamination. Minimum copper 99%. Gauge smaller than No.16 B&S wire.",
    },
    {
      grade: "Cobra",
      title: "Copper Scrap Cobra (as per ISRI)",
      image: "/images/service-img4.jpg",
      description:
        "COPPER WIRE NODULES. No. 2 unalloyed copper wire nodules, chopped/shredded, minimum 97% copper. Metal impurities not to exceed 0.50% aluminum and 1% each of other metals or insulation.",
    },
    {
      grade: "Cocoa",
      title: "Copper Scrap Cocoa (as per ISRI)",
      image: "/images/img-machining1.jpg",
      description:
        "COPPER WIRE NODULES. Unalloyed copper wire nodules, chopped/shredded, minimum 99% copper. Free of excessive insulation and other non-metallics.",
    },
    {
      grade: "Dream",
      title: "Copper Scrap Dream (as per ISRI)",
      image: "/images/img-factory1.jpg",
      description:
        "LIGHT COPPER. Miscellaneous unalloyed copper scrap with nominal 92% copper (minimum 88%) by electrolytic assay. Includes sheet copper, gutters, downspouts, kettles, and similar scrap. Excludes burnt wire, copper clad, plating racks, grindings, radiators, shells, screening, excessively leaded/tinned/soldered scrap, brass/bronze, excess oil/iron/non-metallics, and ash.",
    },
  ],
  "brass-scrap": [
    {
      grade: "Honey",
      title: "Brass Scrap Honey (as per ISRI)",
      image: "/images/service3.jpg",
      description:
        "YELLOW BRASS SCRAP. Mixed yellow brass solids including castings, rolled brass, rod brass, tubing and miscellaneous yellow brasses (including plated brass). Free of manganese-bronze, aluminum bronze, unsweated radiators/parts, iron, and excessively dirty or corroded material.",
    },
    {
      grade: "Label",
      title: "Brass Scrap Label (as per ISRI)",
      image: "/images/cmrcn-img1.jpg",
      description:
        "NEW BRASS CLIPPINGS. Cuttings of new unleaded yellow brass sheet/plate, clean and free from foreign substances, and not containing over 10% clean brass punchings under 1/4 inch. Free of Muntz metal and naval brass.",
    },
    {
      grade: "Pallu",
      title: "Brass Scrap Pallu (as per ISRI)",
      image: "/images/cmrcn-img2.jpg",
      description:
        "ALUMINUM BRASS CONDENSER TUBES. Clean sound condenser tubing, plated or unplated, free of nickel alloy and corroded material.",
    },
    {
      grade: "Night",
      title: "Brass Scrap Night (as per ISRI)",
      image: "/images/service-img4.jpg",
      description:
        "YELLOW BRASS ROD TURNINGS. Strictly rod turnings, free of aluminum, manganese, composition, Tobin and Muntz metal turnings; not containing over 3% free iron, oil or moisture; free of grindings and babbitts; with limited tin and alloyed iron.",
    },
    {
      grade: "Nomad",
      title: "Brass Scrap Nomad (as per ISRI)",
      image: "/images/service-img2.jpg",
      description:
        "YELLOW BRASS TURNINGS. Yellow brass turnings, free of aluminum, manganese, and composition turnings; not containing over 3% free iron, oil or moisture; free of grindings and babbitts.",
    },
  ],
};
