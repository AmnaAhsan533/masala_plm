
export default function RegulatoryChecklist({
  checks,
  onToggle,
  onRemarkChange,
}) {
  const completed = checks.filter(
    (check) => check.completed
  ).length;

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h2 className="font-semibold text-gray-800">
            Regulatory Compliance Checklist
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track required reviews before product approval.
          </p>
        </div>

        <span className="text-sm font-medium text-indigo-600">
          {completed}/{checks.length} completed
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mt-4 mb-5">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{
            width: `${
              checks.length
                ? (completed / checks.length) * 100
                : 0
            }%`,
          }}
        />
      </div>

      <div className="space-y-4">
        {checks.map((check) => (
          <div
            key={check.id}
            className="border rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={check.completed}
                onChange={() => onToggle(check.id)}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />

              <div className="flex-1">
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="text-sm font-medium text-gray-800">
                    {check.name}
                  </p>

                  <span className="text-xs text-gray-500">
                    {check.category}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {check.required ? "Required check" : "Optional check"}
                </p>

                <input
                  value={check.remarks}
                  onChange={(e) =>
                    onRemarkChange(check.id, e.target.value)
                  }
                  placeholder="Add review remarks..."
                  className="w-full mt-3 border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
