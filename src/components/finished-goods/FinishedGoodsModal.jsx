
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  category: "Seasoning",
  productType: "Powder",
  targetYieldLoss: "5",
  standardBatchSize: "100",
  shelfLifeMonths: "12",
  packagingType: "Laminated Food Grade Pouch",
  netWeight: "100",
  unit: "g",
  description: "",
  status: "Draft",
};

const categories = [
  "Seasoning",
  "Masala Blend",
  "Sauce",
  "Marinade",
  "Other",
];

export default function FinishedGoodsModal({
  isOpen,
  onClose,
  onSave,
  product,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setForm(
        product
          ? { ...emptyForm, ...product }
          : emptyForm
      );
      setError("");
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    const yieldLoss = Number(form.targetYieldLoss);
    const batchSize = Number(form.standardBatchSize);
    const shelfLife = Number(form.shelfLifeMonths);
    const netWeight = Number(form.netWeight);

    if (
      form.targetYieldLoss === "" ||
      !Number.isFinite(yieldLoss) ||
      yieldLoss < 0 ||
      yieldLoss >= 100
    ) {
      setError("Yield loss must be at least 0 and less than 100.");
      return;
    }

    if (
      form.standardBatchSize === "" ||
      !Number.isFinite(batchSize) ||
      batchSize <= 0
    ) {
      setError("Enter a valid batch size.");
      return;
    }

    if (
      form.shelfLifeMonths === "" ||
      !Number.isInteger(shelfLife) ||
      shelfLife <= 0
    ) {
      setError("Shelf life must be a positive whole number of months.");
      return;
    }

    if (
      form.netWeight === "" ||
      !Number.isFinite(netWeight) ||
      netWeight <= 0
    ) {
      setError("Enter a valid net weight.");
      return;
    }

    if (!form.packagingType.trim()) {
      setError("Packaging type is required.");
      return;
    }

    onSave({
      ...form,
      targetYieldLoss: yieldLoss,
      standardBatchSize: batchSize,
      shelfLifeMonths: shelfLife,
      netWeight,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {product ? "Edit Finished Good" : "Add Finished Good"}
            </h2>
            <p className="text-sm text-gray-500">
              Enter product and manufacturing information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
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
              Product Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product Name *">
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="form-input"
                  placeholder="e.g. Chicken Seasoning"
                />
              </Field>

              <Field label="Product Category">
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

              <Field label="Product Type">
                <select
                  value={form.productType}
                  onChange={(e) => updateField("productType", e.target.value)}
                  className="form-input"
                >
                  <option>Powder</option>
                  <option>Liquid</option>
                  <option>Paste</option>
                  <option>Granules</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="form-input"
                >
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Discontinued</option>
                </select>
              </Field>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Manufacturing Details
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Target Yield Loss (%)">
                <input
                  type="number"
                  min="0"
                  max="99.99"
                  step="0.01"
                  value={form.targetYieldLoss}
                  onChange={(e) =>
                    updateField("targetYieldLoss", e.target.value)
                  }
                  className="form-input"
                />
              </Field>

              <Field label="Standard Batch Size (KG)">
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.standardBatchSize}
                  onChange={(e) =>
                    updateField("standardBatchSize", e.target.value)
                  }
                  className="form-input"
                />
              </Field>

              <Field label="Proposed Shelf Life (Months)">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.shelfLifeMonths}
                  onChange={(e) =>
                    updateField("shelfLifeMonths", e.target.value)
                  }
                  className="form-input"
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Packaging Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Packaging Type">
                <input
                  value={form.packagingType}
                  onChange={(e) =>
                    updateField("packagingType", e.target.value)
                  }
                  className="form-input"
                  placeholder="e.g. Food Grade Pouch"
                />
              </Field>

              <Field label="Net Weight">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.netWeight}
                    onChange={(e) =>
                      updateField("netWeight", e.target.value)
                    }
                    className="form-input"
                  />

                  <select
                    value={form.unit}
                    onChange={(e) => updateField("unit", e.target.value)}
                    className="form-input max-w-24"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </Field>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-gray-800">
              Product Description
            </h3>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="form-input"
              placeholder="Describe the finished product..."
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
              {product ? "Update Product" : "Add Product"}
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
