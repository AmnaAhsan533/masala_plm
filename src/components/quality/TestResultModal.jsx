
import { useEffect, useState } from "react";

export default function TestResultModal({
  test,
  onClose,
  onSave,
}) {
  const [actualValue, setActualValue] = useState("");
  const [testedBy, setTestedBy] = useState("");
  const [testedAt, setTestedAt] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (!test) return;

    setActualValue(
      test.actualValue === null ? "" : String(test.actualValue)
    );
    setTestedBy(test.testedBy || "");
    setTestedAt(test.testedAt || "");
    setRemarks(test.remarks || "");
  }, [test]);

  if (!test) return null;

  const numericValue = Number(actualValue);
  const hasValue =
    actualValue.trim() !== "" && Number.isFinite(numericValue);

  const calculatedStatus = !hasValue
    ? "Pending"
    : numericValue >= test.minLimit &&
      numericValue <= test.maxLimit
      ? "Passed"
      : "Failed";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasValue || !testedBy.trim() || !testedAt) {
      alert("Please enter a valid result, tester name and test date.");
      return;
    }

    onSave(test.id, {
      actualValue: numericValue,
      testedBy: testedBy.trim(),
      testedAt,
      remarks,
      status: calculatedStatus,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Enter Test Result
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {test.parameter} · {test.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <p className="text-gray-500">Allowed specification range</p>
            <p className="font-semibold text-gray-800 mt-1">
              {test.minLimit} – {test.maxLimit} {test.unit}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Actual Result ({test.unit || "value"})
            </label>
            <input
              type="number"
              step="any"
              value={actualValue}
              onChange={(e) => setActualValue(e.target.value)}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter measured value"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tested By
            </label>
            <input
              value={testedBy}
              onChange={(e) => setTestedBy(e.target.value)}
              className="w-full border rounded-lg p-2.5"
              placeholder="Enter tester name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Test Date
            </label>
            <input
              type="date"
              value={testedAt}
              onChange={(e) => setTestedAt(e.target.value)}
              className="w-full border rounded-lg p-2.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              className="w-full border rounded-lg p-2.5"
              placeholder="Add observations..."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Calculated Status
            </span>
            <span
              className={`text-sm font-semibold ${
                calculatedStatus === "Passed"
                  ? "text-green-600"
                  : calculatedStatus === "Failed"
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              {calculatedStatus}
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              Save Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
