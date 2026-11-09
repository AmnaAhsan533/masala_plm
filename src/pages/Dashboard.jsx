import {
  FolderKanban,
  FlaskConical,
  ClipboardCheck,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    icon: FolderKanban,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Active Formulations",
    value: "08",
    icon: FlaskConical,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Pending Approvals",
    value: "05",
    icon: ClipboardCheck,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Specifications",
    value: "16",
    icon: FileText,
    color: "bg-green-50 text-green-600",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to MasalaPLM
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage product development, formulations and approvals
          from one centralized platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {item.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main placeholder */}
      <div className="rounded-xl border border-gray-200 bg-white p-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Product Development Overview
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Your product development projects and workflow
          progress will appear here.
        </p>
      </div>

    </div>
  );
}

export default Dashboard;
