
export default function SpecificationAllergens({ formulation }) {
  const sorted = [...formulation]
    .filter((item) => Number(item.percentage) > 0)
    .sort((a, b) => b.percentage - a.percentage);

  const allergens = [
    ...new Set(
      formulation
        .filter((item) => item.allergen && item.allergenName)
        .map((item) => item.allergenName)
    ),
  ];

  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Ingredient & Allergen Declaration
      </h2>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">
          Ingredient Declaration
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          <p className="text-sm leading-7 text-gray-700">
            {sorted.length
              ? sorted.map((item) => item.name).join(", ")
              : "No ingredients specified."}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-gray-700">
          Declared Allergens
        </p>

        {allergens.length ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs"
              >
                Contains {allergen}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-green-600 mt-2">
            No declared allergens in the current formulation.
          </p>
        )}

        <p className="text-xs text-gray-500 mt-3">
          Confirm allergen declarations, cross-contact risks and
          applicable label requirements before release.
        </p>
      </div>
    </section>
  );
}
