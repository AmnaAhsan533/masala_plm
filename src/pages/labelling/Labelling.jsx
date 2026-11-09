
import { useState } from "react";

import { initialLabelData } from "../../data/labelData";

import LabelStats from "../../components/labelling/LabelStats";
import LabelInformation from "../../components/labelling/LabelInformation";
import IngredientLabel from "../../components/labelling/IngredientLabel";
import NutritionFacts from "../../components/labelling/NutritionFacts";
import AllergenWarning from "../../components/labelling/AllergenWarning";
import LabelPreview from "../../components/labelling/LabelPreview";
import LabelStatusBadge from "../../components/labelling/LabelStatusBadge";

export default function Labelling() {
  const [label, setLabel] = useState(initialLabelData);

  // Update basic product label information.
  const updateLabelField = (field, value, nested = false) => {
    setLabel((current) => {
      if (nested) {
        return {
          ...current,
          labelInformation: {
            ...current.labelInformation,
            [field]: value,
          },
        };
      }

      return {
        ...current,
        [field]: value,
      };
    });
  };

  // Update nutrition values.
  const updateNutrition = (field, value) => {
    setLabel((current) => ({
      ...current,
      nutrition: {
        ...current.nutrition,
        [field]: value,
      },
    }));
  };

  const updateServingSize = (value) => {
    setLabel((current) => ({
      ...current,
      servingSize: value,
    }));
  };

  // Check required information before submitting for review.
  const validateLabel = () => {
    const requiredFields = [
      label.productName,
      label.brandName,
      label.sku,
      label.netWeight,
      label.servingSize,
      label.labelInformation.manufacturer,
      label.labelInformation.countryOfOrigin,
      label.labelInformation.storageInstructions,
      label.labelInformation.batchNumber,
      label.labelInformation.manufacturingDate,
      label.labelInformation.expiryDate,
    ];

    if (requiredFields.some((value) => String(value).trim() === "")) {
      alert("Please complete all required label information.");
      return false;
    }

    if (
      !Number.isFinite(Number(label.netWeight)) ||
      Number(label.netWeight) <= 0 ||
      !Number.isFinite(Number(label.servingSize)) ||
      Number(label.servingSize) <= 0
    ) {
      alert("Net weight and serving size must be greater than zero.");
      return false;
    }

    if (label.ingredients.length === 0) {
      alert("Ingredient declaration cannot be empty.");
      return false;
    }

    const total = label.ingredients.reduce(
      (sum, item) => sum + Number(item.percentage || 0),
      0
    );

    if (Math.abs(total - 100) > 0.000001) {
      alert("Ingredient percentages must total 100%.");
      return false;
    }

    if (
      Object.values(label.nutrition).some(
        (value) =>
          value === "" ||
          !Number.isFinite(Number(value)) ||
          Number(value) < 0
      )
    ) {
      alert("Nutrition values must be valid non-negative numbers.");
      return false;
    }

    return true;
  };

  // Change label status and append a revision history entry.
  const handleStatusChange = (status) => {
    if (status === "Under Review" || status === "Approved") {
      if (!validateLabel()) return;
    }

    setLabel((current) => ({
      ...current,
      status,
      history: [
        ...current.history,
        {
          version: current.history.length + 1 + ".0",
          date: new Date().toISOString().slice(0, 10),
          action: `Label status changed to ${status}`,
          author: "R&D Team",
        },
      ],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Product Development / Stage 9
          </p>

          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            Labelling & Nutrition Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Prepare product label information and nutrition declarations.
          </p>

          <div className="mt-3">
            <LabelStatusBadge status={label.status} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handlePrint}
            className="border bg-white px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50"
          >
            Print Label
          </button>

          <select
            value={label.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border bg-white rounded-lg px-3 py-2 text-sm"
          >
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Product Overview */}
      <div className="bg-white border rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Label ID</p>
            <p className="font-semibold mt-1">{label.id}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Product</p>
            <p className="font-semibold mt-1">{label.productName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">SKU</p>
            <p className="font-semibold mt-1">{label.sku}</p>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <LabelStats label={label} />

      {/* Product Information */}
      <LabelInformation
        label={label}
        onChange={updateLabelField}
      />

      {/* Ingredient Declaration */}
      <IngredientLabel ingredients={label.ingredients} />

      {/* Nutrition */}
      <NutritionFacts
        nutrition={label.nutrition}
        servingSize={label.servingSize}
        onNutritionChange={updateNutrition}
        onServingSizeChange={updateServingSize}
      />

      {/* Allergens */}
      <AllergenWarning allergens={label.allergens} />

      {/* Label Preview */}
      <LabelPreview label={label} />

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-3">
        MasalaPLM · Label ID: {label.id}
      </div>
    </div>
  );
}
