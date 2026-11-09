
import { X, Package, Truck, FlaskConical, ShieldAlert } from "lucide-react";
import RawMaterialStatusBadge from "./RawMaterialStatusBadge";

export default function RawMaterialDetails({ material, onClose }) {
  if (!material) return null;

  const sections = [
    {
      title: "Basic Information",
      icon: Package,
      fields: [
        ["Material Code", material.id],
        ["Material Name", material.name],
        ["Category", material.category],
        ["Unit", material.unit],
        ["Cost per KG", `Rs. ${Number(material.costPerKg).toLocaleString()}`],
        ["Status", material.status],
      ],
    },
    {
      title: "Quality Specifications",
      icon: FlaskConical,
      fields: [
        ["Maximum Moisture", `${material.moistureMax}%`],
        ["Maximum Ash", `${material.ashMax}%`],
        ["Active Marker", material.activeMarker || "Not specified"],
        ["Marker Value", material.activeMarkerValue || "Not specified"],
      ],
    },
    {
      title: "Supplier Information",
      icon: Truck,
      fields: [
        ["Supplier", material.supplier || "Not specified"],
        ["Created Date", material.createdAt || "Not specified"],
      ],
    },
    {
      title: "Allergen Information",
      icon: ShieldAlert,
      fields: [
        [
          "Allergen Present",
          material.allergenPresent ? "Yes" : "No declared allergen",
        ],
        [
          "Declared Allergens",
          material.allergens?.join(", ") || "None declared",
        ],
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-5">
          <div>
            <p className="text-xs font-medium text-orange-600">
              {material.id}
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              {material.name}
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
            <span className="text-sm text-gray-500">Material Status</span>
            <RawMaterialStatusBadge status={material.status} />
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
                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-2 font-semibold text-gray-900">
              Description
            </h3>
            <p className="text-sm text-gray-600">
              {material.description || "No description provided."}
            </p>
          </section>
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
