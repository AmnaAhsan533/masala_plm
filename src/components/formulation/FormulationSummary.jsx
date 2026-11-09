
export default function FormulationSummary({
  totalPercentage,
  baseCost,
  yieldLoss,
  adjustedCost,
}) {
  const isValid = Math.abs(totalPercentage - 100) < 0.000001;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">Total Formulation</p>
        <h3 className="text-2xl font-bold mt-2">
          {totalPercentage.toFixed(2)}%
        </h3>

        <p
          className={`text-xs mt-2 ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid
            ? "Formulation is valid"
            : `Must equal 100% (difference: ${(100 - totalPercentage).toFixed(2)}%)`}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">
          Base Ingredient Cost
        </p>
        <h3 className="text-2xl font-bold mt-2">
          Rs. {baseCost.toFixed(2)}
        </h3>
        <p className="text-xs text-gray-500 mt-2">
          Cost per kg before yield loss
        </p>
      </div>

      <div className="bg-white border rounded-xl p-5">
        <p className="text-sm text-gray-500">Target Yield Loss</p>
        <h3 className="text-2xl font-bold mt-2">
          {yieldLoss}%
        </h3>
        <p className="text-xs text-gray-500 mt-2">
          Expected production loss
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <p className="text-sm text-indigo-700">
          Yield-Adjusted Cost
        </p>
        <h3 className="text-2xl font-bold text-indigo-800 mt-2">
          Rs. {adjustedCost.toFixed(2)}
        </h3>
        <p className="text-xs text-indigo-600 mt-2">
          Estimated cost per kg of finished product
        </p>
      </div>

    </div>
  );
}
