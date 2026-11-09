
import QualityStatusBadge from "./QualityStatusBadge";

export default function QualityTestTable({ tests, onEdit }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-gray-800">
          Quality Test Results
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Compare actual test values with approved specification limits.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Test ID</th>
              <th className="p-4">Parameter</th>
              <th className="p-4">Specification</th>
              <th className="p-4">Actual Result</th>
              <th className="p-4">Test Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tests.map((test) => (
              <tr key={test.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{test.id}</td>
                <td className="p-4">{test.parameter}</td>
                <td className="p-4">
                  {test.minLimit} – {test.maxLimit} {test.unit}
                </td>
                <td className="p-4">
                  {test.actualValue !== null
                    ? `${test.actualValue} ${test.unit}`
                    : "Not recorded"}
                </td>
                <td className="p-4">{test.method}</td>
                <td className="p-4">
                  <QualityStatusBadge status={test.status} />
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onEdit(test)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    {test.status === "Pending" ? "Enter Result" : "Edit"}
                  </button>
                </td>
              </tr>
            ))}

            {tests.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No quality tests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
