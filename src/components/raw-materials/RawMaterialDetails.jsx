import {
  X,
  Package,
  Truck,
  FlaskConical,
  ShieldAlert,
  Beaker,
  FileText,
  CalendarDays,
  DollarSign,
} from "lucide-react";

import RawMaterialStatusBadge from "./RawMaterialStatusBadge";

// Display fallback for missing values
const displayValue = (value, suffix = "") => {
  if (value === undefined || value === null || value === "") {
    return "Not specified";
  }

  return `${value}${suffix}`;
};

// Reusable specification section
function Section({
  title,
  description,
  icon: Icon,
  color = "orange",
  children,
}) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    teal: "bg-teal-50 text-teal-600 border-teal-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className={`rounded-lg border p-2 ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

// Reusable specification field
function DetailField({ label, value, highlight = false }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <p
        className={`mt-1 break-words text-sm ${
          highlight
            ? "font-semibold text-gray-900"
            : "font-medium text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function RawMaterialDetails({ material, onClose }) {
  if (!material) return null;

  const cost = Number(material.costPerKg ?? 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-gray-50 shadow-xl">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              {material.id}
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {material.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {material.category} · Raw Material Specifications
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">

          {/* Material Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Material Status
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Current availability of this raw material.
              </p>
            </div>

            <RawMaterialStatusBadge status={material.status} />
          </div>

          {/* 1. Basic Information */}
          <Section
            icon={Package}
            title="Basic Information"
            description="General identification and classification of the raw material."
            color="blue"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailField
                label="Material Code"
                value={displayValue(material.id)}
              />

              <DetailField
                label="Material Name"
                value={displayValue(material.name)}
                highlight
              />

              <DetailField
                label="Category"
                value={displayValue(material.category)}
              />

              <DetailField
                label="Unit"
                value={displayValue(material.unit)}
              />
            </div>
          </Section>

          {/* 2. Quality Specifications */}
          <Section
            icon={FlaskConical}
            title="Quality Specifications"
            description="Defined quality limits and active component specifications."
            color="teal"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailField
                label="Maximum Moisture"
                value={displayValue(material.moistureMax, "%")}
                highlight
              />

              <DetailField
                label="Maximum Ash"
                value={displayValue(material.ashMax, "%")}
                highlight
              />

              <DetailField
                label="Active Marker"
                value={displayValue(material.activeMarker)}
              />

              <DetailField
                label="Active Marker Value"
                value={displayValue(material.activeMarkerValue)}
                highlight
              />
            </div>
          </Section>

          {/* 3. Supplier Information */}
          <Section
            icon={Truck}
            title="Supplier Information"
            description="Supplier and procurement details for this material."
            color="amber"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailField
                label="Supplier Name"
                value={displayValue(material.supplier)}
                highlight
              />

              <DetailField
                label="Cost per KG"
                value={`PKR ${cost.toLocaleString("en-PK")}`}
                highlight
              />

              {material.createdAt && (
                <DetailField
                  label="Created Date"
                  value={displayValue(material.createdAt)}
                />
              )}
            </div>
          </Section>

          {/* 4. Allergen & Safety Information */}
          <Section
            icon={ShieldAlert}
            title="Allergen & Safety Information"
            description="Declared allergens that may affect product formulation and labelling."
            color="red"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <DetailField
                  label="Allergen Present"
                  value={
                    material.allergenPresent
                      ? "Yes"
                      : "No declared allergen"
                  }
                  highlight
                />

                {material.allergenPresent && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Allergen Alert
                  </span>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="mb-2 text-xs font-medium text-gray-500">
                  Declared Allergens
                </p>

                {material.allergens?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {material.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-700">
                    None declared
                  </p>
                )}
              </div>
            </div>
          </Section>

          {/* 5. Additive & Regulatory Information */}
          {material.category === "Additives" && (
            <Section
              icon={Beaker}
              title="Additive & Regulatory Information"
              description="Additive identification, functionality and regulatory details."
              color="orange"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailField
                  label="Additive Function"
                  value={displayValue(material.additiveFunction)}
                  highlight
                />

                <DetailField
                  label="INS Number"
                  value={displayValue(material.insNumber)}
                />

                <DetailField
                  label="E Number"
                  value={displayValue(material.eNumber)}
                />

                <DetailField
                  label="Application"
                  value={displayValue(material.application)}
                />
              </div>

              <div className="mt-5 border-t border-orange-100 pt-4">
                <p className="text-xs font-medium text-gray-500">
                  Regulatory Notes
                </p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {material.regulatoryNotes || "Not specified"}
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
                <p className="text-xs leading-5 text-orange-800">
                  Regulatory usage limits and permitted applications must be
                  verified against applicable food regulations.
                </p>
              </div>
            </Section>
          )}

          {/* 6. Additional Information */}
          <Section
            icon={FileText}
            title="Additional Information"
            description="Other notes and information about the material."
            color="gray"
          >
            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {material.description || "No additional description provided."}
            </p>
          </Section>

          {/* Procurement Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-600" />

              <h3 className="font-semibold text-gray-900">
                Procurement Summary
              </h3>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <DetailField
                label="Material Cost"
                value={`PKR ${cost.toLocaleString("en-PK")} / KG`}
                highlight
              />

              <DetailField
                label="Supplier"
                value={displayValue(material.supplier)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end border-t bg-white p-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
