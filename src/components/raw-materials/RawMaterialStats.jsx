
import {
  Package,
  CheckCircle,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

export default function RawMaterialStats({ materials }) {
  const total = materials.length;

  const active = materials.filter(
    (item) => item.status === "Active"
  ).length;

  const inactive = materials.filter(
    (item) => item.status === "Inactive"
  ).length;

  const allergens = materials.filter(
    (item) => item.allergenPresent
  ).length;

  const averageCost = total
    ? materials.reduce(
        (sum, item) => sum + Number(item.costPerKg || 0),
        0
      ) / total
    : 0;

  const stats = [
    {
      title: "Total Materials",
      value: total,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Materials",
      value: active,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Allergen Materials",
      value: allergens,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Average Cost / KG",
      value: `Rs. ${averageCost.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {stat.title}
              </p>

              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-gray-900">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
