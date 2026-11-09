
const nutritionFields = [
  ["energyKcal", "Energy", "kcal"],
  ["protein", "Protein", "g"],
  ["carbohydrates", "Carbohydrates", "g"],
  ["totalSugars", "Total Sugars", "g"],
  ["totalFat", "Total Fat", "g"],
  ["saturatedFat", "Saturated Fat", "g"],
  ["transFat", "Trans Fat", "g"],
  ["fiber", "Dietary Fiber", "g"],
  ["sodium", "Sodium", "mg"],
];

export default function NutritionFacts({
  nutrition,
  servingSize,
  onNutritionChange,
  onServingSizeChange,
}) {
  const multiplier = Number(servingSize) / 100;

  return (
    <section className="bg-white border rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-800">
            Nutrition Facts
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter verified nutritional values per 100 g.
          </p>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Serving Size (g)
          </label>

          <input
            type="number"
            min="0.01"
            step="any"
            value={servingSize}
            onChange={(e) => onServingSizeChange(e.target.value)}
            className="w-28 border rounded-lg p-2"
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Nutrient</th>
              <th className="p-3">Per 100 g</th>
              <th className="p-3">Per Serving</th>
              <th className="p-3">Unit</th>
            </tr>
          </thead>

          <tbody>
            {nutritionFields.map(([key, name, unit]) => {
              const value = Number(nutrition[key]) || 0;
              const perServing = value * multiplier;

              return (
                <tr key={key} className="border-t">
                  <td className="p-3 font-medium">{name}</td>

                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={nutrition[key]}
                      onChange={(e) =>
                        onNutritionChange(key, e.target.value)
                      }
                      className="w-28 border rounded-lg p-2"
                    />
                  </td>

                  <td className="p-3 font-medium">
                    {Number.isFinite(perServing)
                      ? perServing.toFixed(2)
                      : "—"}
                  </td>

                  <td className="p-3 text-gray-500">{unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Per-serving figures are calculated estimates based on the
        entered per-100-g values and serving size.
      </p>
    </section>
  );
}
