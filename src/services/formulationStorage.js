
const STORAGE_KEY = "masalaplm-formulations";

// Retrieve all saved formulations.
export const getAllFormulations = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return [];
    }

    return Object.values(parsed);
  } catch (error) {
    console.error("Could not load formulations:", error);
    return [];
  }
};

// Retrieve a formulation using its finished-good SKU.
export const getFormulationBySku = (sku) => {
  if (!sku) return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return null;

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    return parsed[sku] || null;
  } catch (error) {
    console.error("Could not retrieve formulation:", error);
    return null;
  }
};

// Save or update a formulation using its SKU.
export const saveFormulation = (formulation) => {
  if (!formulation?.sku) {
    throw new Error("A finished-good SKU is required.");
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  let formulations = {};

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        formulations = parsed;
      }
    } catch (error) {
      console.error("Could not parse existing formulations:", error);
    }
  }

  formulations[formulation.sku] = {
    ...formulation,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(formulations)
  );

  return formulations[formulation.sku];
};

// Delete a formulation by SKU.
export const deleteFormulation = (sku) => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  const formulations = JSON.parse(saved);

  if (!formulations || !formulations[sku]) return;

  delete formulations[sku];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(formulations)
  );
};
