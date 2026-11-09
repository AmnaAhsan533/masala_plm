
import {
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import RawMaterialStatusBadge from "./RawMaterialStatusBadge";

export default function RawMaterialTable({
  materials,
  onView,
  onEdit,
  onDelete,
}) {
  if (materials.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="font-medium text-gray-700">
          No raw materials found
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4">Material</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Cost / KG</th>
              <th className="px-5 py-4">Moisture Max</th>
              <th className="px-5 py-4">Allergen</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {materials.map((material) => (
              <tr
                key={material.id}
                className="hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">
                    {material.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {material.id}
                  </p>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {material.category}
                </td>

                <td className="px-5 py-4 font-medium text-gray-900">
                  Rs. {Number(material.costPerKg).toLocaleString()}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {material.moistureMax}%
                </td>

                <td className="px-5 py-4">
                  {material.allergenPresent ? (
                    <span className="inline-flex items-center gap-1 text-amber-700">
                      <AlertTriangle size={15} />
                      {material.allergens.join(", ") || "Yes"}
                    </span>
                  ) : (
                    <span className="text-gray-500">None declared</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <RawMaterialStatusBadge status={material.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(material)}
                      title="View details"
                      className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => onEdit(material)}
                      title="Edit material"
                      className="rounded-lg p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => onDelete(material.id)}
                      title="Delete material"
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t px-5 py-3 text-xs text-gray-500">
        Showing {materials.length} raw material(s)
      </div>
    </div>
  );
}
