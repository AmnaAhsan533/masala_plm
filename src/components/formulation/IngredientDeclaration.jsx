
export default function IngredientDeclaration({
  ingredients,
  rawMaterials,
}) {
  const sortedIngredients = [...ingredients]
    .filter((item) => Number(item.percentage) > 0)
    .sort(
      (a, b) =>
        Number(b.percentage) - Number(a.percentage)
    );

  const declaration = sortedIngredients
    .map((item) => {
      const material = rawMaterials.find(
        (rm) => rm.id === item.rawMaterialId
      );

      return material?.name;
    })
    .filter(Boolean);

  const allergens = [
    ...new Set(
      ingredients
        .map((item) =>
          rawMaterials.find(
            (rm) => rm.id === item.rawMaterialId
          )
        )
        .filter((rm) => rm?.allergen)
        .map((rm) => rm.allergenName)
    ),
  ];

  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Ingredient Declaration
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Automatically sorted by formulation percentage.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <p className="text-sm text-gray-700 leading-7">
          {declaration.length
            ? declaration.join(", ")
            : "Add ingredients to generate a declaration."}
        </p>
      </div>

      <div className="mt-5">
        <h3 className="font-medium text-gray-800 text-sm">
          Allergen Summary
        </h3>

        {allergens.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs"
              >
                Contains {allergen}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-green-600 mt-2">
            No declared allergens in the selected raw materials.
          </p>
        )}
      </div>

      {allergens.length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3">
          <p className="text-sm text-red-700 font-medium">
            Allergen declaration required
          </p>
          <p className="text-xs text-red-600 mt-1">
            Verify the final label against applicable regulatory
            and cross-contact requirements.
          </p>
        </div>
      )}
    </div>
  );
}
