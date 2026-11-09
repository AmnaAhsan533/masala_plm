
export default function LabelInformation({ label, onChange }) {
  const fields = [
    ["brandName", "Brand Name"],
    ["productName", "Product Name"],
    ["sku", "Product SKU"],
    ["netWeight", "Net Weight (g)"],
  ];

  const instructions = [
    ["storageInstructions", "Storage Instructions"],
    ["usageInstructions", "Usage Instructions"],
    ["manufacturer", "Manufacturer"],
    ["countryOfOrigin", "Country of Origin"],
    ["batchNumber", "Batch Number"],
    ["manufacturingDate", "Manufacturing Date"],
    ["expiryDate", "Expiry Date"],
  ];

  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Product Label Information
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Enter the information required for the product packaging.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {fields.map(([key, title]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {title}
            </label>

            <input
              type={key === "netWeight" ? "number" : "text"}
              min={key === "netWeight" ? "0.01" : undefined}
              value={label[key]}
              onChange={(e) =>
                onChange(key, e.target.value)
              }
              className="w-full border rounded-lg p-2.5"
            />
          </div>
        ))}
      </div>

      <h3 className="font-medium text-gray-800 mt-6 mb-3">
        Additional Label Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions.map(([key, title]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {title}
            </label>

            <input
              value={label.labelInformation[key] || ""}
              onChange={(e) =>
                onChange(key, e.target.value, true)
              }
              className="w-full border rounded-lg p-2.5"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
