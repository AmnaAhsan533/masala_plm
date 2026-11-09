
export const REGULATORY_MARKETS = [
  "Pakistan",
  "Canada",
  "USA",
  "Europe",
  "Australia & New Zealand",
  "Middle East",
];

export const DEFAULT_FOOD_CATEGORY = "12.2.2";

export const REGULATORY_SOURCES = {
  codex: {
    name: "Codex GSFA",
    url: "https://codex.fao.org/codex-texts/codex-online-databases/gsfa",
  },
  pakistan: {
    name: "Pakistan Standard PS:2022-2023 Food Additives",
    url: "https://food.chemlinked.com/database/view/7344",
  },
  canada: {
    name: "Health Canada – List of Permitted Preservatives",
    url: "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/food-additives/lists-permitted/11-preservatives.html",
  },
  usa: {
    name: "US FDA / 21 CFR 172.175",
    url: "https://www.law.cornell.edu/cfr/text/21/172.175",
  },
  europe: {
    name: "EU Regulation 1333/2008",
    url: "https://eur-lex.europa.eu/eli/reg/2008/1333/2025-04-23/eng",
  },
  australia: {
    name: "FSANZ Food Standards Code",
    url: "https://www.foodstandards.gov.au/food-standards-code",
  },
  middleEast: {
    name: "GSO 2500:2025",
    url: "https://gso-sims-preview-doc-aws.s3-eu-west-1.amazonaws.com/gso-2500-2025-ar.html",
  },
};

// Only enter rules that have been checked against a source.
// Do not treat a missing rule as proof that an additive is banned.
export const REGULATORY_RULES = [
  {
    id: "EU-551-12.2.2",
    market: "Europe",
    insNumber: "551",
    foodCategory: "12.2.2",
    status: "permitted",
    limitType: "maximum",
    maximumLevel: 30000,
    unit: "mg/kg",
    explanation:
      "Silicon dioxide / silicates are listed for seasonings at a maximum level of 30,000 mg/kg. Check the applicable combined-use conditions.",
    conditions:
      "The EU provision identifies seasonings. The listed additive group may be subject to combined-use conditions.",
    sourceName: "EU Regulation 1333/2008, Annex II",
    sourceUrl:
      "https://eur-lex.europa.eu/eli/reg/2008/1333/2024-06-02/eng",
    verificationStatus: "source-checked",
    lastVerified: "2026-11-09",
  },
  {
    id: "EU-621-12.2.2",
    market: "Europe",
    insNumber: "621",
    foodCategory: "12.2.2",
    status: "permitted",
    limitType: "gmp",
    maximumLevel: null,
    unit: null,
    explanation:
      "Glutamates (INS 620–625), including MSG (INS 621), are listed for this category under quantum satis.",
    conditions:
      "Quantum satis means use only the amount necessary in accordance with good manufacturing practice. It is not an unlimited permission.",
    sourceName: "EU Regulation 1333/2008, Annex II",
    sourceUrl:
      "https://eur-lex.europa.eu/eli/reg/2008/1333/2024-06-02/eng",
    verificationStatus: "source-checked",
    lastVerified: "2026-11-09",
  },
  {
    id: "CA-250-12.2.2",
    market: "Canada",
    insNumber: "250",
    foodCategory: "12.2.2",
    status: "not-authorized",
    limitType: "category-restriction",
    maximumLevel: null,
    unit: null,
    explanation:
      "The cited Canadian sodium nitrite permission covers specified preserved-meat curing uses. It does not authorize general use in a seasoning blend.",
    conditions:
      "The permitted curing preparations have specific conditions, including a 200 ppm combined nitrite limit in the specified meat-curing context and separate packaging from spices or seasonings in the stated circumstances.",
    sourceName: "Health Canada – List of Permitted Preservatives, S.11",
    sourceUrl:
      "https://www.canada.ca/en/health-canada/services/food-nutrition/food-safety/food-additives/lists-permitted/11-preservatives.html",
    verificationStatus: "source-checked",
    lastVerified: "2026-11-09",
  },
  {
    id: "US-250-12.2.2",
    market: "USA",
    insNumber: "250",
    foodCategory: "12.2.2",
    status: "not-authorized",
    limitType: "category-restriction",
    maximumLevel: null,
    unit: null,
    explanation:
      "21 CFR 172.175 specifies sodium nitrite uses in certain cured fish and meat-curing preparations. It does not provide a general authorization for a seasoning blend.",
    conditions:
      "Do not apply the 10 ppm or 200 ppm limits from this regulation to seasoning powder. Those limits relate to the specific foods described in the regulation.",
    sourceName: "21 CFR 172.175 – Sodium Nitrite",
    sourceUrl:
      "https://www.law.cornell.edu/cfr/text/21/172.175",
    verificationStatus: "source-checked",
    lastVerified: "2026-11-09",
  },
];

// Markets and additives without a verified rule will be displayed
// as Unverified by the regulatory engine.
