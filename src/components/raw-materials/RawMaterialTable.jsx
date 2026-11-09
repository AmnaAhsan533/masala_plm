
import {
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
  Beaker,
  FlaskConical,
  Package,
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
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <Package size={36} className="mx-auto text-gray-300" />

        <p className="mt-3 font-semibold text-gray-700">
          No raw materials found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filters, or add a new raw material.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">

          {/* Header */}
          <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-5 py-4">Material</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Cost / KG</th>
              <th className="px-5 py-4">Key Specification</th>
              <th className="px-5 py-4">Supplier</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {materials.map((material) => {
              const isAdditive = material.category === "Additives";

              return (
                <tr
                  key={material.id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Material */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {material.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {material.id}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        isAdditive
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {material.category}
                    </span>
                  </td>

                  {/* Cost */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      PKR {Number(material.costPerKg ?? 0).toLocaleString("en-PK")}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Per KG
                    </p>
                  </td>

                  {/* Key Specification */}
                  <td className="px-5 py-4">
                    {isAdditive ? (
                      <div>
                        <div className="flex items-center gap-1.5 font-medium text-orange-700">
                          <Beaker size={15} />
                          {material.additiveFunction || "Not specified"}
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          INS: {material.insNumber || "Not specified"}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-1.5 font-medium text-teal-700">
                          <FlaskConical size={15} />
                          {material.activeMarker || "Not specified"}
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          Value: {material.activeMarkerValue || "—"}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Supplier */}
                  <td className="px-5 py-4 text-gray-600">
                    {material.supplier || "—"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <RawMaterialStatusBadge status={material.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">

                      <button
                        type="button"
                        onClick={() => onView(material)}
                        title="View specifications"
                        aria-label={`View ${material.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(material)}
                        title="Edit material"
                        aria-label={`Edit ${material.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(material.id)}
                        title="Delete material"
                        aria-label={`Delete ${material.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-gray-50 px-5 py-3">
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{materials.length}</span> raw material(s)
        </p>

        <p className="text-xs text-gray-400">
          Select the eye icon to view complete specifications.
        </p>
      </div>
    </div>
  );
}
