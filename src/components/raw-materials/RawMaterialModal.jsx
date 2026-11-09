
import { useEffect, useState } from "react";
import {
  X,
  Package,
  FlaskConical,
  Truck,
  ShieldAlert,
  Beaker,
  FileText,
} from "lucide-react";

// Initial form values
const emptyForm = {
  name: "",
  category: "Spices",
  unit: "KG",
  costPerKg: "",
  moistureMax: "",
  ashMax: "",
  activeMarker: "",
  activeMarkerValue: "",
  allergenPresent: false,
  allergens: [],
  supplier: "",
  description: "",
  status: "Active",

  // Additive-specific fields
  additiveFunction: "",
  insNumber: "",
  eNumber: "",
  application: "",
  regulatoryNotes: "",
};

// Available material categories
const categories = [
  "Spices",
  "Flour",
  "Seasonings",
  "Additives",
  "Other",
];

// Available allergens
const allergenOptions = [
  "Gluten",
  "Milk",
  "Soy",
  "Peanuts",
  "Tree Nuts",
  "Sesame",
];

export default function RawMaterialModal({
  isOpen,
  onClose,
  onSave,
  material,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // Load existing material when editing
  useEffect(() => {
    if (isOpen) {
      setForm(
        material
          ? {
              ...emptyForm,
              ...material,
              allergens: material.allergens || [],
            }
          : { ...emptyForm }
      );

      setError("");
    }
  }, [isOpen, material]);

  if (!isOpen) return null;

  // Update form fields
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate and submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.supplier.trim()) {
      setError("Material name and supplier are required.");
      return;
    }

    if (
      form.costPerKg === "" ||
      !Number.isFinite(Number(form.costPerKg)) ||
      Number(form.costPerKg) < 0
    ) {
      setError("Enter a valid non-negative material cost.");
      return;
    }

    if (
      form.moistureMax === "" ||
      !Number.isFinite(Number(form.moistureMax)) ||
      Number(form.moistureMax) < 0 ||
      Number(form.moistureMax) > 100
    ) {
      setError("Moisture maximum must be between 0 and 100.");
      return;
    }

    if (
      form.ashMax === "" ||
      !Number.isFinite(Number(form.ashMax)) ||
      Number(form.ashMax) < 0 ||
      Number(form.ashMax) > 100
    ) {
      setError("Ash maximum must be between 0 and 100.");
      return;
    }

    if (form.allergenPresent && form.allergens.length === 0) {
      setError("Select at least one allergen.");
      return;
    }

    if (
      form.category === "Additives" &&
      !form.additiveFunction.trim()
    ) {
      setError("Please enter the additive function.");
      return;
    }

    onSave({
      ...form,
      costPerKg: Number(form.costPerKg),
      moistureMax: Number(form.moistureMax),
      ashMax: Number(form.ashMax),
      additiveFunction: form.additiveFunction.trim(),
      insNumber: form.insNumber.trim(),
      eNumber: form.eNumber.trim(),
      application: form.application.trim(),
      regulatoryNotes: form.regulatoryNotes.trim(),
    });
  };

  // Add or remove allergens
  const toggleAllergen = (allergen) => {
    setForm((prev) => {
      const exists = prev.allergens.includes(allergen);

      return {
        ...prev,
        allergens: exists
          ? prev.allergens.filter((item) => item !== allergen)
          : [...prev.allergens, allergen],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-gray-50 shadow-xl">

        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {material ? "Edit Raw Material" : "Add Raw Material"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage material information, quality parameters and compliance specifications.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* Validation Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* 1. Basic Information */}
          <Section
            icon={Package}
            title="Basic Information"
            description="General identification and classification of the raw material."
            color="blue"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Material Name *">
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="form-input"
                  placeholder="e.g. Red Chilli Powder"
                />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="form-input"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Unit">
                <select
                  value={form.unit}
                  onChange={(e) => updateField("unit", e.target.value)}
                  className="form-input"
                >
                  <option value="KG">KG</option>
                  <option value="G">G</option>
                  <option value="L">Litre</option>
                  <option value="PCS">Pieces</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="form-input"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* 2. Quality Specifications */}
          <Section
            icon={FlaskConical}
            title="Quality Specifications"
            description="Define the acceptable quality limits and active components."
            color="teal"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Maximum Moisture (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  value={form.moistureMax}
                  onChange={(e) => updateField("moistureMax", e.target.value)}
                  className="form-input"
                  placeholder="e.g. 10"
                />
              </Field>

              <Field label="Maximum Ash (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  value={form.ashMax}
                  onChange={(e) => updateField("ashMax", e.target.value)}
                  className="form-input"
                  placeholder="e.g. 8"
                />
              </Field>

              <Field label="Active Marker">
                <input
                  value={form.activeMarker}
                  onChange={(e) => updateField("activeMarker", e.target.value)}
                  className="form-input"
                  placeholder="e.g. Curcumin, Capsaicin"
                />
              </Field>

              <Field label="Active Marker Value">
                <input
                  value={form.activeMarkerValue}
                  onChange={(e) =>
                    updateField("activeMarkerValue", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g. 3%"
                />
              </Field>
            </div>
          </Section>

          {/* 3. Supplier Information */}
          <Section
            icon={Truck}
            title="Supplier Information"
            description="Record the supplier and procurement cost of this material."
            color="amber"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Supplier Name *">
                <input
                  required
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  className="form-input"
                  placeholder="Enter supplier name"
                />
              </Field>

              <Field label="Cost per KG (PKR) *">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={form.costPerKg}
                  onChange={(e) => updateField("costPerKg", e.target.value)}
                  className="form-input"
                  placeholder="e.g. 650"
                />
              </Field>
            </div>
          </Section>

          {/* 4. Allergen & Safety Information */}
          <Section
            icon={ShieldAlert}
            title="Allergen & Safety Information"
            description="Identify allergens that must be considered during formulation and labelling."
            color="red"
          >
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.allergenPresent}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setForm((prev) => ({
                    ...prev,
                    allergenPresent: checked,
                    allergens: checked ? prev.allergens : [],
                  }));
                }}
                className="h-4 w-4 accent-orange-600"
              />

              <span className="font-medium">
                This material contains a declared allergen
              </span>
            </label>

            {form.allergenPresent && (
              <div className="mt-4">
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Select applicable allergens *
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {allergenOptions.map((allergen) => (
                    <label
                      key={allergen}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-orange-300"
                    >
                      <input
                        type="checkbox"
                        checked={form.allergens.includes(allergen)}
                        onChange={() => toggleAllergen(allergen)}
                        className="h-4 w-4 accent-orange-600"
                      />

                      {allergen}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* 5. Additive & Regulatory Information */}
          {form.category === "Additives" && (
            <Section
              icon={Beaker}
              title="Additive & Regulatory Information"
              description="Additional identification, functionality and regulatory details."
              color="orange"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Additive Function *">
                  <select
                    required
                    value={form.additiveFunction}
                    onChange={(e) =>
                      updateField("additiveFunction", e.target.value)
                    }
                    className="form-input"
                  >
                    <option value="">Select function</option>
                    <option value="Preservative">Preservative</option>
                    <option value="Curing Agent">Curing Agent</option>
                    <option value="Stabilizer">Stabilizer</option>
                    <option value="Emulsifier">Emulsifier</option>
                    <option value="Acidity Regulator">Acidity Regulator</option>
                    <option value="Colouring Agent">Colouring Agent</option>
                    <option value="Flavour Enhancer">Flavour Enhancer</option>
                    <option value="Anti-Caking Agent">Anti-Caking Agent</option>
                    <option value="Thickener">Thickener</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="INS Number">
                  <input
                    value={form.insNumber}
                    onChange={(e) => updateField("insNumber", e.target.value)}
                    className="form-input"
                    placeholder="e.g. 621"
                  />
                </Field>

                <Field label="E Number">
                  <input
                    value={form.eNumber}
                    onChange={(e) => updateField("eNumber", e.target.value)}
                    className="form-input"
                    placeholder="e.g. E621"
                  />
                </Field>

                <Field label="Application">
                  <input
                    value={form.application}
                    onChange={(e) => updateField("application", e.target.value)}
                    className="form-input"
                    placeholder="e.g. Savoury food products"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Regulatory Notes">
                    <textarea
                      rows={3}
                      value={form.regulatoryNotes}
                      onChange={(e) =>
                        updateField("regulatoryNotes", e.target.value)
                      }
                      className="form-input"
                      placeholder="Enter applicable regulatory requirements and usage restrictions..."
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-xs leading-5 text-orange-800">
                Regulatory usage limits must be verified against the applicable
                food category and current food regulations.
              </div>
            </Section>
          )}

          {/* 6. Additional Information */}
          <Section
            icon={FileText}
            title="Additional Information"
            description="Add any other useful details about this material."
            color="gray"
          >
            <Field label="Description">
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="form-input"
                placeholder="Additional material information..."
              />
            </Field>
          </Section>

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-gray-50 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
            >
              {material ? "Update Material" : "Add Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable specification section
function Section({
  icon: Icon,
  title,
  description,
  color,
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
        <div
          className={`rounded-lg border p-2 ${colorStyles[color]}`}
        >
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

// Reusable form field
function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-600">
        {label}
      </label>

      {children}
    </div>
  );
}
