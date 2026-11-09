
const StatCard = ({ label, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className={`text-2xl font-bold mt-2 ${color}`}>
      {value}
    </h3>
  </div>
);

export default function QualityStats({ tests, checks }) {
  const passed = tests.filter(
    (test) => test.status === "Passed"
  ).length;

  const failed = tests.filter(
    (test) => test.status === "Failed"
  ).length;

  const pending = tests.filter(
    (test) => test.status === "Pending"
  ).length;

  const completedChecks = checks.filter(
    (check) => check.completed
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      <StatCard label="Total Tests" value={tests.length} color="text-gray-800" />
      <StatCard label="Passed" value={passed} color="text-green-600" />
      <StatCard label="Failed" value={failed} color="text-red-600" />
      <StatCard label="Pending" value={pending} color="text-yellow-600" />
      <StatCard
        label="Regulatory Checks"
        value={`${completedChecks}/${checks.length}`}
        color="text-indigo-600"
      />
    </div>
  );
}
