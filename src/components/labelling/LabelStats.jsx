
export default function LabelStats({ label }) {
  const stats = [
    {
      title: "Ingredients",
      value: label.ingredients.length,
      color: "text-indigo-600",
    },
    {
      title: "Declared Allergens",
      value: label.allergens.length,
      color: "text-red-600",
    },
    {
      title: "Serving Size",
      value: `${label.servingSize} g`,
      color: "text-blue-600",
    },
    {
      title: "Label Status",
      value: label.status,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border rounded-xl p-5"
        >
          <p className="text-sm text-gray-500">{stat.title}</p>
          <h3 className={`text-xl font-bold mt-2 ${stat.color}`}>
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
