
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
};

const categories = [
  "Spices",
  "Flour",
  "Seasonings",
  "Additives",
  "Other",
];

export default function RawMaterialModal({
  isOpen,
  onClose,
  onSave,
  material,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(material ? {
        ...emptyForm,
        ...material,
        allergens: material.allergens || [],
      } : emptyForm);

      setError("");
    }
  }, [isOpen, material]);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
      setError("Select or enter at least one allergen.");
      return;
    }

    onSave({
      ...form,
      costPerKg: Number(form.costPerKg),
      moistureMax: Number(form.moistureMax),
      ashMax: Number(form.ashMax),
      allergenPresent: form.allergenPresent,
    });
  };

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
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {material ? "Edit Raw Material" : "Add Raw Material"}
            </h2>
            <p className="text-sm text-gray-500">
              Enter material master data and specifications.
            </p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Basic Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Material Name *">
                <input
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
                    <option key={item}>{item}</option>
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

              <Field label="Cost per KG (PKR) *">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.costPerKg}
                  onChange={(e) => updateField("costPerKg", e.target.value)}
                  className="form-input"
                  placeholder="650"
                />
              </Field>

              <Field label="Supplier *">
                <input
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  className="form-input"
                  placeholder="Supplier name"
                />
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
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Quality Specifications
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Maximum Moisture (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.moistureMax}
                  onChange={(e) => updateField("moistureMax", e.target.value)}
                  className="form-input"
                />
              </Field>

              <Field label="Maximum Ash (%)">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form.ashMax}
                  onChange={(e) => updateField("ashMax", e.target.value)}
                  className="form-input"
                />
              </Field>

              <Field label="Active Marker">
                <input
                  value={form.activeMarker}
                  onChange={(e) => updateField("activeMarker", e.target.value)}
                  className="form-input"
                  placeholder="e.g. Curcumin"
                />
              </Field>

              <Field label="Active Marker Value">
                <input
                  value={form.activeMarkerValue}
                  onChange={(e) => updateField("activeMarkerValue", e.target.value)}
                  className="form-input"
                  placeholder="e.g. 3%"
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Allergen Information
            </h3>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.allergenPresent}
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateField("allergenPresent", checked);

                  if (!checked) {
                    updateField("allergens", []);
                  }
                }}
              />
              This material contains a declared allergen
            </label>

            {form.allergenPresent && (
              <div className="mt-3 flex flex-wrap gap-4">
                {["Gluten", "Milk", "Soy", "Peanuts", "Tree Nuts", "Sesame"].map(
                  (allergen) => (
                    <label key={allergen} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.allergens.includes(allergen)}
                        onChange={() => toggleAllergen(allergen)}
                      />
                      {allergen}
                    </label>
                  )
                )}
              </div>
            )}
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Description
            </h3>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="form-input"
              placeholder="Additional material information..."
            />
          </section>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-medium text-white hover:bg-orange-700"
            >
              {material ? "Update Material" : "Add Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
