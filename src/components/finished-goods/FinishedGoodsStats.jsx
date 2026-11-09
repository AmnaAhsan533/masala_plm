
import {
  Package,
  CheckCircle,
  FileEdit,
  Ban,
} from "lucide-react";

export default function FinishedGoodsStats({ products }) {
  const total = products.length;

  const active = products.filter(
    (item) => item.status === "Active"
  ).length;

  const draft = products.filter(
    (item) => item.status === "Draft"
  ).length;

  const discontinued = products.filter(
    (item) => item.status === "Discontinued"
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: total,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Products",
      value: active,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Draft Products",
      value: draft,
      icon: FileEdit,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Discontinued",
      value: discontinued,
      icon: Ban,
      color: "text-red-600",
      bg: "bg-red-50",
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
