
export default function LabelPreview({ label }) {
  const sortedIngredients = [...label.ingredients]
    .filter((item) => Number(item.percentage) > 0)
    .sort((a, b) => b.percentage - a.percentage);

  const multiplier = Number(label.servingSize) / 100;

  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Product Label Preview
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Illustrative front and back label layout.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">

        {/* Front Label */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm border-2 border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-indigo-700 text-white text-center p-5">
              <p className="text-xs tracking-widest">
                {label.brandName}
              </p>

              <h3 className="text-2xl font-bold mt-4">
                {label.productName}
              </h3>

              <p className="text-sm mt-2">
                Seasoning Blend
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="border border-gray-300 rounded-lg p-5">
                <p className="text-3xl">✦</p>
                <p className="text-sm font-semibold mt-2">
                  FLAVOURFUL SEASONING
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Product artwork placeholder
                </p>
              </div>

              <p className="font-semibold mt-5">
                Net Weight: {label.netWeight} g
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Country of Origin:{" "}
                {label.labelInformation.countryOfOrigin}
              </p>
            </div>
          </div>
        </div>

        {/* Back Label */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm border-2 border-gray-800 rounded-xl p-5">
            <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-2">
              Product Information
            </h3>

            <p className="text-xs mt-3">
              <strong>Ingredients:</strong>{" "}
              {sortedIngredients.map((item) => item.name).join(", ")}
            </p>

            {label.allergens.length > 0 && (
              <p className="text-xs font-bold text-red-700 mt-3">
                Contains: {label.allergens.join(", ")}
              </p>
            )}

            <div className="border-t border-b border-gray-800 py-3 my-4">
              <h4 className="font-bold text-sm">
                Nutrition Information
              </h4>

              <p className="text-xs mt-1">
                Serving Size: {label.servingSize} g
              </p>

              <p className="text-xs">
                Energy:{" "}
                {(label.nutrition.energyKcal * multiplier).toFixed(2)} kcal
                per serving
              </p>

              <p className="text-xs">
                Protein:{" "}
                {(label.nutrition.protein * multiplier).toFixed(2)} g
              </p>

              <p className="text-xs">
                Carbohydrates:{" "}
                {(label.nutrition.carbohydrates * multiplier).toFixed(2)} g
              </p>

              <p className="text-xs">
                Total Fat:{" "}
                {(label.nutrition.totalFat * multiplier).toFixed(2)} g
              </p>

              <p className="text-xs">
                Sodium:{" "}
                {(label.nutrition.sodium * multiplier).toFixed(2)} mg
              </p>
            </div>

            <p className="text-xs">
              <strong>Storage:</strong>{" "}
              {label.labelInformation.storageInstructions}
            </p>

            <p className="text-xs mt-2">
              <strong>Usage:</strong>{" "}
              {label.labelInformation.usageInstructions}
            </p>

            <div className="border-t mt-4 pt-3 text-xs space-y-1">
              <p>
                <strong>Manufacturer:</strong>{" "}
                {label.labelInformation.manufacturer}
              </p>
              <p>
                <strong>Batch:</strong>{" "}
                {label.labelInformation.batchNumber}
              </p>
              <p>
                <strong>Mfg Date:</strong>{" "}
                {label.labelInformation.manufacturingDate}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {label.labelInformation.expiryDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
