
export const initialLabelData = {
  id: "LBL-001",
  productId: "FG-001",
  productName: "Chicken Seasoning",
  brandName: "MasalaPLM Foods",
  sku: "FG-001",
  netWeight: 100,
  servingSize: 5,
  servingsPerPack: 20,

  ingredients: [
    { name: "Red Chilli Powder", percentage: 25 },
    { name: "Coriander Powder", percentage: 20 },
    { name: "Cumin Powder", percentage: 15 },
    { name: "Salt", percentage: 15 },
    { name: "Turmeric Powder", percentage: 10 },
    { name: "Wheat Flour", percentage: 10 },
    { name: "Garlic Powder", percentage: 5 },
  ],

  allergens: ["Gluten"],

  nutrition: {
    energyKcal: 320,
    protein: 12,
    carbohydrates: 48,
    totalSugars: 5,
    totalFat: 8,
    saturatedFat: 1.5,
    transFat: 0,
    fiber: 10,
    sodium: 5200,
  },

  labelInformation: {
    storageInstructions: "Store in a cool, dry place.",
    usageInstructions: "Use according to recipe requirements.",
    manufacturer: "MasalaPLM Foods",
    countryOfOrigin: "Pakistan",
    batchNumber: "To be printed on pack",
    manufacturingDate: "To be printed on pack",
    expiryDate: "To be printed on pack",
  },

  status: "Draft",

  history: [
    {
      version: "1.0",
      date: "2026-11-09",
      action: "Initial label created",
      author: "R&D Team",
    },
  ],
};
