
export const initialShelfLifeData = {
  id: "SL-001",
  productId: "FG-001",
  productName: "Chicken Seasoning",
  sku: "FG-001",
  batchNumber: "BATCH-001",

  manufacturingDate: "2026-11-09",
  proposedShelfLifeMonths: 12,

  packagingType: "Laminated Food Grade Pouch",
  storageTemperature: "25°C",
  storageHumidity: "Below 60%",
  storageInstructions: "Store in a cool, dry place away from direct sunlight.",

  checkpoints: [
    {
      id: 1,
      month: 0,
      testDate: "2026-11-09",
      status: "Pending",
      observations: "",
    },
    {
      id: 2,
      month: 3,
      testDate: "2027-02-09",
      status: "Pending",
      observations: "",
    },
    {
      id: 3,
      month: 6,
      testDate: "2027-05-09",
      status: "Pending",
      observations: "",
    },
    {
      id: 4,
      month: 9,
      testDate: "2027-08-09",
      status: "Pending",
      observations: "",
    },
    {
      id: 5,
      month: 12,
      testDate: "2027-11-09",
      status: "Pending",
      observations: "",
    },
  ],
};
