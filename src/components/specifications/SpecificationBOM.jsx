
export default function SpecificationBOM({ formulation }) {
  const totalPercentage = formulation.reduce(
    (total, item) => total + Number(item.percentage || 0),
    0
  );

  const baseCost = formulation.reduce(
    (total, item) =>
      total +
      (Number(item.percentage || 0) / 100) *
        Number(item.costPerKg || 0),
    0
  );

  const valid = Math.abs(totalPercentage - 100) < 0.000001;

  const sorted = [...formulation].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <section className="bg-white border rounded-xl overflow-hidden">
      <div className="p-5 border-b flex flex-col sm:flex-row sm:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-800">
            Formulation & Bill of Materials
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Ingredient composition in descending order.
          </p>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">Total Formulation</p>
          <p className={`font-bold text-lg ${
            valid ? "text-green-600" : "text-red-600"
          }`}>
            {totalPercentage.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">RM Code</th>
              <th className="p-4">Ingredient</th>
              <th className="p-4">Percentage</th>
              <th className="p-4">Cost / kg</th>
              <th className="p-4">Cost Contribution</th>
              <th className="p-4">Allergen</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.id}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.percentage}%</td>
                <td className="p-4">
                  Rs. {item.costPerKg.toFixed(2)}
                </td>
                <td className="p-4">
                  Rs. {(
                    (item.percentage / 100) * item.costPerKg
                  ).toFixed(2)}
                </td>
                <td className="p-4">
                  {item.allergen ? (
                    <span className="text-red-600">
                      {item.allergenName}
                    </span>
                  ) : (
                    <span className="text-green-600">None declared</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td colSpan="2" className="p-4">Total</td>
              <td className="p-4">{totalPercentage.toFixed(2)}%</td>
              <td className="p-4">—</td>
              <td className="p-4">Rs. {baseCost.toFixed(2)}</td>
              <td className="p-4">—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {!valid && (
        <p className="p-4 text-sm text-red-600">
          Formulation must total exactly 100% before specification approval.
        </p>
      )}
    </section>
  );
}
