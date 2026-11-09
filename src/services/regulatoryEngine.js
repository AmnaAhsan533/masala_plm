
import { REGULATORY_RULES } from "../data/regulatoryData";

const normalizeINS = (value) => {
  if (!value) return "";

  return String(value)
    .toUpperCase()
    .replace(/^INS\s*/i, "")
    .replace(/^E\s*/i, "")
    .trim();
};

const isAdditive = (material) => {
  return (
    material?.category?.toLowerCase() === "additives" ||
    Boolean(material?.insNumber) ||
    Boolean(material?.eNumber) ||
    Boolean(material?.additiveFunction)
  );
};

export function getRegulatoryAlerts({
  ingredients,
  rawMaterials,
  markets,
  foodCategory = "12.2.2",
}) {
  const alerts = [];

  ingredients.forEach((ingredient) => {
    const material = rawMaterials.find(
      (item) => item.id === ingredient.rawMaterialId
    );

    if (!material || !isAdditive(material)) return;

    const insNumber = normalizeINS(
      material.insNumber || material.activeMarkerValue
    );

    if (!insNumber) {
      markets.forEach((market) => {
        alerts.push({
          id: `${ingredient.id}-${market}-missing-ins`,
          ingredientId: ingredient.id,
          ingredientName: material.name,
          insNumber: "Not available",
          market,
          status: "unverified",
          title: "Additive identification missing",
          message:
            "An INS number is required to check this additive reliably.",
          sourceName: null,
          sourceUrl: null,
        });
      });

      return;
    }

    markets.forEach((market) => {
      const rule = REGULATORY_RULES.find(
        (item) =>
          item.market === market &&
          normalizeINS(item.insNumber) === insNumber &&
          item.foodCategory === foodCategory
      );

      if (!rule) {
        alerts.push({
          id: `${ingredient.id}-${market}-${insNumber}`,
          ingredientId: ingredient.id,
          ingredientName: material.name,
          insNumber,
          market,
          status: "unverified",
          title: "Regulatory information not verified",
          message:
            `No verified rule is currently loaded for INS ${insNumber} ` +
            `in ${market} for food category ${foodCategory}. ` +
            "Do not assume that the additive is permitted.",
          sourceName: null,
          sourceUrl: null,
        });

        return;
      }

      if (rule.status === "not-authorized") {
        alerts.push({
          id: `${ingredient.id}-${market}-${insNumber}`,
          ingredientId: ingredient.id,
          ingredientName: material.name,
          insNumber,
          market,
          status: "not-authorized",
          title: "Not authorized for this food category",
          message: rule.explanation,
          conditions: rule.conditions,
          sourceName: rule.sourceName,
          sourceUrl: rule.sourceUrl,
        });

        return;
      }

      if (rule.limitType === "gmp") {
        alerts.push({
          id: `${ingredient.id}-${market}-${insNumber}`,
          ingredientId: ingredient.id,
          ingredientName: material.name,
          insNumber,
          market,
          status: "permitted-gmp",
          title: "Permitted under GMP conditions",
          message: rule.explanation,
          conditions: rule.conditions,
          sourceName: rule.sourceName,
          sourceUrl: rule.sourceUrl,
        });

        return;
      }

      if (rule.limitType === "maximum") {
        const additiveConcentration =
          material.additiveConcentrationPercent;

        if (
          additiveConcentration === null ||
          additiveConcentration === undefined ||
          additiveConcentration === "" ||
          !Number.isFinite(Number(additiveConcentration))
        ) {
          alerts.push({
            id: `${ingredient.id}-${market}-${insNumber}`,
            ingredientId: ingredient.id,
            ingredientName: material.name,
            insNumber,
            market,
            status: "needs-concentration",
            title: "Additive concentration is missing",
            message:
              "Enter the additive concentration from the supplier specification or CoA before the maximum-level check can be calculated.",
            conditions: rule.conditions,
            maximumLevel: rule.maximumLevel,
            unit: rule.unit,
            sourceName: rule.sourceName,
            sourceUrl: rule.sourceUrl,
          });

          return;
        }

        const ingredientPercentage =
          Number(ingredient.percentage) || 0;

        const actualLevel =
          (ingredientPercentage / 100) *
          (Number(additiveConcentration) / 100) *
          1000000;

        const exceedsLimit = actualLevel > rule.maximumLevel;

        alerts.push({
          id: `${ingredient.id}-${market}-${insNumber}`,
          ingredientId: ingredient.id,
          ingredientName: material.name,
          insNumber,
          market,
          status: exceedsLimit ? "limit-exceeded" : "compliant",
          title: exceedsLimit
            ? "Maximum permitted level exceeded"
            : "Within the listed maximum level",
          message: exceedsLimit
            ? `Calculated level is ${actualLevel.toFixed(2)} ${rule.unit}; the listed maximum is ${rule.maximumLevel} ${rule.unit}.`
            : `Calculated level is ${actualLevel.toFixed(2)} ${rule.unit}; the listed maximum is ${rule.maximumLevel} ${rule.unit}.`,
          actualLevel,
          maximumLevel: rule.maximumLevel,
          unit: rule.unit,
          conditions: rule.conditions,
          sourceName: rule.sourceName,
          sourceUrl: rule.sourceUrl,
        });
      }
    });
  });

  return alerts;
}
