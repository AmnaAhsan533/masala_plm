
export default function AllergenWarning({ allergens }) {
  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Allergen Declaration
      </h2>

      {allergens.length > 0 ? (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-red-800">
            Contains:
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm"
              >
                {allergen}
              </span>
            ))}
          </div>

          <p className="text-xs text-red-700 mt-3">
            Verify this declaration against the complete raw material
            allergen records and cross-contact assessment.
          </p>
        </div>
      ) : (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">
            No declared allergens in the supplied formulation data.
          </p>
        </div>
      )}
    </section>
  );
}
