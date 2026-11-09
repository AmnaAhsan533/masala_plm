
import { Eye, Pencil, Trash2 } from "lucide-react";
import FinishedGoodsStatusBadge from "./FinishedGoodsStatusBadge";

export default function FinishedGoodsTable({
  products,
  onView,
  onEdit,
  onDelete,
}) {
  if (!products.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="font-semibold text-gray-700">No products found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Batch Size</th>
              <th className="px-5 py-4">Yield Loss</th>
              <th className="px-5 py-4">Shelf Life</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {product.sku}
                  </p>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {product.standardBatchSize} KG
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {product.targetYieldLoss}%
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {product.shelfLifeMonths} months
                </td>

                <td className="px-5 py-4">
                  <FinishedGoodsStatusBadge status={product.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(product)}
                      title="View product"
                      className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      title="Edit product"
                      className="rounded-lg p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      title="Delete product"
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
        Showing {products.length} finished good(s)
      </div>
    </div>
  );
}
