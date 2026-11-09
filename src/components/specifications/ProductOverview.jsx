
export default function ProductOverview({ specification }) {
  const fields = [
    ["Product Name", specification.productName],
    ["SKU", specification.sku],
    ["Category", specification.category],
    ["Description", specification.description],
    ["Target Yield Loss", `${specification.targetYieldLoss}%`],
    ["Shelf Life", specification.shelfLife],
    ["Storage Condition", specification.storageCondition],
    ["Packaging", specification.packaging],
    ["Effective Date", specification.effectiveDate],
  ];

  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Finished Product Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800 mt-1">
              {value || "Not specified"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
