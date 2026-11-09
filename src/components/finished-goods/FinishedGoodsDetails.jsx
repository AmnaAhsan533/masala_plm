
import {
  X,
  Package,
  Factory,
  CalendarClock,
  FileText,
} from "lucide-react";

import FinishedGoodsStatusBadge from "./FinishedGoodsStatusBadge";

export default function FinishedGoodsDetails({ product, onClose }) {
  if (!product) return null;

  const sections = [
    {
      title: "Product Information",
      icon: Package,
      fields: [
        ["Product ID", product.id],
        ["SKU", product.sku],
        ["Product Name", product.name],
        ["Category", product.category],
        ["Product Type", product.productType],
        ["Status", product.status],
      ],
    },
    {
      title: "Manufacturing Information",
      icon: Factory,
      fields: [
        ["Standard Batch Size", `${product.standardBatchSize} KG`],
        ["Target Yield Loss", `${product.targetYieldLoss}%`],
      ],
    },
    {
      title: "Packaging & Shelf Life",
      icon: CalendarClock,
      fields: [
        ["Shelf Life", `${product.shelfLifeMonths} months`],
        ["Packaging", product.packagingType],
        ["Net Weight", `${product.netWeight} ${product.unit}`],
      ],
    },
    {
      title: "Additional Information",
      icon: FileText,
      fields: [
        ["Created Date", product.createdAt || "Not specified"],
        ["Description", product.description || "No description"],
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-5">
          <div>
            <p className="text-xs font-medium text-orange-600">
              {product.sku}
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span className="text-sm text-gray-500">
              Product Status
            </span>
            <FinishedGoodsStatusBadge status={product.status} />
          </div>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Icon size={18} className="text-orange-600" />
                  <h3 className="font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {section.fields.map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="mt-1 break-words text-sm font-medium text-gray-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="flex justify-end border-t p-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
