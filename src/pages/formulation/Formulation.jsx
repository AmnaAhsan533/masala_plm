
import { useMemo, useState } from "react";

import { initialRawMaterials } from "../../data/rawMaterialsData";

import BOMTable from "../../components/formulation/BOMTable";
import FormulationSummary from "../../components/formulation/FormulationSummary";
import IngredientDeclaration from "../../components/formulation/IngredientDeclaration";
import RegulatoryAlerts from "../../components/regulatory/RegulatoryAlerts";

import { getRegulatoryAlerts } from "../../services/regulatoryEngine";
import { REGULATORY_MARKETS } from "../../data/regulatoryData";

const normalizeRawMaterial = (material) => {
  const allergens =
    material.allergens ||
    (material.allergenName ? [material.allergenName] : []);

  return {
    ...material,

    costPerKg: Number(material.costPerKg) || 0,

    potencyMarker:
      material.potencyMarker || material.activeMarker || "-",

    potencyValue:
      material.potencyValue || material.activeMarkerValue || "-",

    allergen:
      material.allergen ??
      material.allergenPresent ??
      allergens.length > 0,

    allergenName:
      material.allergenName || allergens.join(", "),

    allergens,
  };
};

const loadRawMaterials = () => {
  try {
    const saved = localStorage.getItem("masalaplm-raw-materials");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed.map(normalizeRawMaterial);
      }
    }
  } catch (error) {
    console.error("Could not load raw materials:", error);
  }

  return initialRawMaterials.map(normalizeRawMaterial);
};

export default function Formulation() {
  const [rawMaterials] = useState(loadRawMaterials);

  const [productName, setProductName] = useState(
    "Chicken Seasoning"
  );

  const [sku, setSku] = useState("FG-001");

  const [yieldLoss, setYieldLoss] = useState(5);

  const [foodCategory, setFoodCategory] = useState("12.2.2");

  const [selectedMarkets, setSelectedMarkets] = useState(
    [...REGULATORY_MARKETS]
  );

  const [ingredients, setIngredients] = useState([
    { id: 1, rawMaterialId: "RM-001", percentage: "25" },
    { id: 2, rawMaterialId: "RM-002", percentage: "20" },
    { id: 3, rawMaterialId: "RM-003", percentage: "15" },
    { id: 4, rawMaterialId: "RM-004", percentage: "10" },
    { id: 5, rawMaterialId: "RM-005", percentage: "10" },
    { id: 6, rawMaterialId: "RM-006", percentage: "15" },
    { id: 7, rawMaterialId: "RM-007", percentage: "5" },
  ]);

  const totalPercentage = useMemo(() => {
    return ingredients.reduce(
      (total, item) =>
        total + (Number(item.percentage) || 0),
      0
    );
  }, [ingredients]);

  const baseCost = useMemo(() => {
    return ingredients.reduce((total, item) => {
      const material = rawMaterials.find(
        (rm) => rm.id === item.rawMaterialId
      );

      if (!material) return total;

      const percentage = Number(item.percentage) || 0;

      return (
        total +
        (percentage / 100) * material.costPerKg
      );
    }, 0);
  }, [ingredients, rawMaterials]);

  const adjustedCost = useMemo(() => {
    if (yieldLoss < 0 || yieldLoss >= 100) return 0;

    return baseCost / (1 - yieldLoss / 100);
  }, [baseCost, yieldLoss]);

  const isValid =
    Math.abs(totalPercentage - 100) < 0.000001;

  const regulatoryAlerts = useMemo(() => {
    return getRegulatoryAlerts({
      ingredients,
      rawMaterials,
      markets: selectedMarkets,
      foodCategory,
    });
  }, [
    ingredients,
    rawMaterials,
    selectedMarkets,
    foodCategory,
  ]);

  const blockingStatuses = [
    "not-authorized",
    "limit-exceeded",
    "needs-concentration",
    "unverified",
  ];

  const blockingAlerts = regulatoryAlerts.filter((alert) =>
    blockingStatuses.includes(alert.status)
  );

  const updateIngredient = (id, field, value) => {
    setIngredients((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addIngredient = () => {
    const unusedMaterial = rawMaterials.find(
      (rm) =>
        rm.status !== "Inactive" &&
        !ingredients.some(
          (item) => item.rawMaterialId === rm.id
        )
    );

    if (!unusedMaterial) {
      alert("All available raw materials have been added.");
      return;
    }

    setIngredients((current) => [
      ...current,
      {
        id: Date.now(),
        rawMaterialId: unusedMaterial.id,
        percentage: "0",
      },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const handleSave = () => {
    if (!productName.trim() || !sku.trim()) {
      alert("Please enter the product name and SKU.");
      return;
    }

    if (ingredients.length === 0) {
      alert("Add at least one ingredient.");
      return;
    }

    if (!isValid) {
      alert("Total formulation percentage must equal 100%.");
      return;
    }

    if (yieldLoss < 0 || yieldLoss >= 100) {
      alert("Yield loss must be at least 0% and less than 100%.");
      return;
    }

    if (selectedMarkets.length === 0) {
      alert("Select at least one target market.");
      return;
    }

    if (blockingAlerts.length > 0) {
      alert(
        `Regulatory validation requires attention.\n\n` +
        `${blockingAlerts.length} regulatory issue(s) or unverified check(s) found.\n\n` +
        "Resolve these checks before approving this formulation."
      );

      return;
    }

    alert(
      `Formulation for ${productName} passed the currently loaded regulatory checks!\n\n` +
      `Cost per kg: Rs. ${adjustedCost.toFixed(2)}\n\n` +
      "This is not a substitute for final regulatory approval."
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Product Development / Stage 6
          </p>

          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            Recipe Formulation & BOM
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage recipes, costing, ingredient declarations
            and export-market regulatory compliance.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700"
        >
          Validate & Save
        </button>
      </div>

      {/* Product Information */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-800 mb-4">
          Finished Good Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Product Name
            </label>

            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Finished Good SKU
            </label>

            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter SKU"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Target Yield Loss (%)
            </label>

            <input
              type="number"
              min="0"
              max="99.99"
              step="0.1"
              value={yieldLoss}
              onChange={(e) =>
                setYieldLoss(Number(e.target.value))
              }
              className="w-full border rounded-lg p-2.5"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Regulatory Food Category
            </label>

            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="w-full border rounded-lg p-2.5"
            >
              <option value="12.2.2">
                12.2.2 - Seasonings and Condiments
              </option>
              <option value="12.2.1">
                12.2.1 - Herbs and Spices
              </option>
            </select>

            <p className="text-xs text-gray-500 mt-1">
              Confirm this classification for each target market.
            </p>
          </div>
        </div>
      </div>

      {/* Costing Summary */}
      <FormulationSummary
        totalPercentage={totalPercentage}
        baseCost={baseCost}
        yieldLoss={yieldLoss}
        adjustedCost={adjustedCost}
      />

      {/* BOM Table */}
      <BOMTable
        ingredients={ingredients}
        rawMaterials={rawMaterials}
        onUpdate={updateIngredient}
        onRemove={removeIngredient}
        onAdd={addIngredient}
      />

      {/* Regulatory Checks */}
      <RegulatoryAlerts
        alerts={regulatoryAlerts}
        selectedMarkets={selectedMarkets}
        onMarketChange={setSelectedMarkets}
      />

      {/* Ingredient Declaration */}
      <IngredientDeclaration
        ingredients={ingredients}
        rawMaterials={rawMaterials}
      />

      {/* Raw Material Reference */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-800">
          Raw Material Reference
        </h2>

        <p className="text-sm text-gray-500 mt-1 mb-4">
          Reference data used for formulation and costing.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">RM Code</th>
                <th className="p-3">Material</th>
                <th className="p-3">Moisture Max</th>
                <th className="p-3">Potency Marker</th>
                <th className="p-3">Potency Value</th>
                <th className="p-3">Cost / kg</th>
              </tr>
            </thead>

            <tbody>
              {rawMaterials.map((rm) => (
                <tr key={rm.id} className="border-t">
                  <td className="p-3">{rm.id}</td>
                  <td className="p-3 font-medium">{rm.name}</td>
                  <td className="p-3">{rm.moistureMax}%</td>
                  <td className="p-3">{rm.potencyMarker}</td>
                  <td className="p-3">{rm.potencyValue}</td>
                  <td className="p-3">
                    Rs. {rm.costPerKg.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
