
export default function IngredientLabel({ ingredients }) {
  const sortedIngredients = [...ingredients]
    .filter((item) => Number(item.percentage) > 0)
    .sort(
      (a, b) =>
        Number(b.percentage) - Number(a.percentage)
    );

  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Ingredient Declaration
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Automatically ordered by formulation percentage.
      </p>

      <div className="bg-gray-50 border rounded-lg p-4 mt-4">
        <p className="text-sm text-gray-700 leading-7">
          {sortedIngredients.length
            ? sortedIngredients
                .map((item) => item.name)
                .join(", ")
            : "No ingredients added."}
        </p>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        {sortedIngredients.length} ingredients included
      </div>
    </section>
  );
}
