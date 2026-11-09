
export default function QualityReport({ tests, checks }) {
  const passed = tests.filter(
    (test) => test.status === "Passed"
  ).length;

  const failed = tests.filter(
    (test) => test.status === "Failed"
  ).length;

  const pending = tests.filter(
    (test) => test.status === "Pending"
  ).length;

  const incompleteRequired = checks.filter(
    (check) => check.required && !check.completed
  );

  const allTestsPassed =
    tests.length > 0 && failed === 0 && pending === 0;

  const complianceComplete =
    incompleteRequired.length === 0;

  const readyForReview =
    allTestsPassed && complianceComplete;

  return (
    <div className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Quality & Compliance Report
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Overall readiness summary for this product.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Tests Passed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {passed}/{tests.length}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Tests Failed</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {failed}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">
            Required Checks Incomplete
          </p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {incompleteRequired.length}
          </p>
        </div>
      </div>

      <div className="mt-5 border rounded-lg p-4">
        <p className="text-sm font-semibold text-gray-800">
          Overall Assessment
        </p>

        <p
          className={`mt-2 text-sm font-medium ${
            readyForReview
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {readyForReview
            ? "All recorded tests passed and required checks are complete. Ready for quality review."
            : "Not ready for quality approval. Resolve failed or pending tests and complete required checks."}
        </p>

        {incompleteRequired.length > 0 && (
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
            {incompleteRequired.map((check) => (
              <li key={check.id}>{check.name}</li>
            ))}
          </ul>
        )}

        {pending > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {pending} test(s) still need results.
          </p>
        )}
      </div>
    </div>
  );
}
