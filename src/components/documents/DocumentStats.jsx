
import {
  Files,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

function DocumentStats({ documents }) {
  const stats = [
    {
      label: "Total Documents",
      value: documents.length,
      icon: Files,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Approved",
      value: documents.filter(
        (doc) => doc.status === "Approved"
      ).length,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Under Review",
      value: documents.filter(
        (doc) => doc.status === "Under Review"
      ).length,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending / Rejected",
      value: documents.filter(
        (doc) =>
          doc.status === "Pending" ||
          doc.status === "Rejected"
      ).length,
      icon: AlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {stat.label}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div className={`rounded-lg p-3 ${stat.bg}`}>
                <Icon size={22} className={stat.color} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default DocumentStats;
