
import { Trash2 } from "lucide-react";

export default function BOMTable({
  ingredients,
  rawMaterials,
  onUpdate,
  onRemove,
  onAdd,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex justify-between items-center p-5 border-b">
        <div>
          <h2 className="font-semibold text-gray-800">
            Bill of Materials
          </h2>
          <p className="text-sm text-gray-500">
            Define the raw materials and their formulation percentages.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Raw Material</th>
              <th className="p-4">RM Code</th>
              <th className="p-4">Percentage (%)</th>
              <th className="p-4">Cost / kg</th>
              <th className="p-4">Cost Contribution</th>
              <th className="p-4">Allergen</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {ingredients.map((ingredient) => {
              const material = rawMaterials.find(
                (rm) => rm.id === ingredient.rawMaterialId
              );

              const percentage = Number(ingredient.percentage) || 0;

              const costContribution =
                material
                  ? (percentage / 100) * material.costPerKg
                  : 0;

              return (
                <tr
                  key={ingredient.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 min-w-52">
                    <select
                      value={ingredient.rawMaterialId}
                      onChange={(e) =>
                        onUpdate(
                          ingredient.id,
                          "rawMaterialId",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-lg p-2"
                    >
                      {rawMaterials.map((rm) => (
                        <option key={rm.id} value={rm.id}>
                          {rm.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4 text-gray-600">
                    {material?.id || "-"}
                  </td>

                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={ingredient.percentage}
                      onChange={(e) =>
                        onUpdate(
                          ingredient.id,
                          "percentage",
                          e.target.value
                        )
                      }
                      className="w-24 border rounded-lg p-2"
                    />
                  </td>

                  <td className="p-4">
                    Rs. {material?.costPerKg.toFixed(2) || "0.00"}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    Rs. {costContribution.toFixed(2)}
                  </td>

                  <td className="p-4">
                    {material?.allergen ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        {material.allergenName}
                      </span>
                    ) : (
                      <span className="text-green-600 text-xs">
                        No allergen
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => onRemove(ingredient.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove ingredient"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {ingredients.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  No ingredients added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
