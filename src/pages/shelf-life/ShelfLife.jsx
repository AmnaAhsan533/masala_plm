import { useMemo, useState } from "react";
import {
  CalendarClock,
  Package,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Printer,
  Download,
  Save,
} from "lucide-react";

import { initialShelfLifeData } from "../../data/shelfLifeData";

function addMonths(dateString, months) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  const originalDay = date.getDate();

  date.setDate(1);
  date.setMonth(date.getMonth() + Number(months));

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  date.setDate(Math.min(originalDay, lastDay));

  return date.toISOString().split("T")[0];
}

function formatDate(dateString) {
  if (!dateString) return "—";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700",
    Validated: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Passed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, description, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <Icon size={20} className="text-orange-600" />
      </div>

      <h3 className="mt-3 text-2xl font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default function ShelfLife() {
  const [study, setStudy] = useState(initialShelfLifeData);

  const updateField = (field, value) => {
    setStudy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCheckpoint = (id, field, value) => {
    setStudy((prev) => ({
      ...prev,
      checkpoints: prev.checkpoints.map((checkpoint) =>
        checkpoint.id === id
          ? { ...checkpoint, [field]: value }
          : checkpoint
      ),
    }));
  };

  const validationStatus = useMemo(() => {
    const checkpoints = study.checkpoints;

    if (checkpoints.some((item) => item.status === "Failed")) {
      return "Failed";
    }

    if (
      checkpoints.length > 0 &&
      checkpoints.every((item) => item.status === "Passed")
    ) {
      return "Validated";
    }

    return "Pending";
  }, [study.checkpoints]);

  const expiryDate = addMonths(
    study.manufacturingDate,
    study.proposedShelfLifeMonths
  );

  const completedCheckpoints = study.checkpoints.filter(
    (item) => item.status === "Passed" || item.status === "Failed"
  ).length;

  const passedCheckpoints = study.checkpoints.filter(
    (item) => item.status === "Passed"
  ).length;

  const handleExport = () => {
    const report = {
      ...study,
      proposedExpiryDate: expiryDate,
      validationStatus,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `shelf-life-${study.batchNumber}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Product Development</span>
            <span>/</span>
            <span>Shelf Life Management</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Shelf Life Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage proposed shelf life, storage conditions and
            validation checkpoints.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Printer size={16} />
            Print
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Package className="text-orange-600" size={20} />
          <h2 className="font-semibold text-gray-900">
            Product & Batch Information
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Product Name
            </label>
            <input
              value={study.productName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              SKU
            </label>
            <input
              value={study.sku}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Batch Number
            </label>
            <input
              value={study.batchNumber}
              onChange={(e) =>
                updateField("batchNumber", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Manufacturing Date
            </label>
            <input
              type="date"
              value={study.manufacturingDate}
              onChange={(e) =>
                updateField("manufacturingDate", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Proposed Shelf Life (Months)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={study.proposedShelfLifeMonths}
              onChange={(e) =>
                updateField(
                  "proposedShelfLifeMonths",
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Proposed Expiry Date
            </label>
            <input
              value={formatDate(expiryDate)}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Proposed Shelf Life"
          value={`${study.proposedShelfLifeMonths || 0} Months`}
          description="Configured shelf-life duration"
          icon={CalendarClock}
        />

        <StatCard
          title="Total Checkpoints"
          value={study.checkpoints.length}
          description="Scheduled validation points"
          icon={Clock}
        />

        <StatCard
          title="Completed Checkpoints"
          value={`${completedCheckpoints}/${study.checkpoints.length}`}
          description={`${passedCheckpoints} passed`}
          icon={ShieldCheck}
        />

        <StatCard
          title="Validation Status"
          value={validationStatus}
          description="Based on checkpoint results"
          icon={AlertTriangle}
        />
      </div>

      {/* Storage Conditions */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-5 font-semibold text-gray-900">
          Packaging & Storage Conditions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Packaging Type
            </label>
            <input
              value={study.packagingType}
              onChange={(e) =>
                updateField("packagingType", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Storage Temperature
            </label>
            <input
              value={study.storageTemperature}
              onChange={(e) =>
                updateField("storageTemperature", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Storage Humidity
            </label>
            <input
              value={study.storageHumidity}
              onChange={(e) =>
                updateField("storageHumidity", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Storage Instructions
            </label>
            <textarea
              rows={2}
              value={study.storageInstructions}
              onChange={(e) =>
                updateField("storageInstructions", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Validation Checkpoints */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-gray-900">
            Shelf Life Validation Checkpoints
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Record observations at each scheduled testing point.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3">Checkpoint</th>
                <th className="px-4 py-3">Scheduled Date</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Observations</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {study.checkpoints.map((checkpoint) => (
                <tr key={checkpoint.id}>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {checkpoint.month === 0
                      ? "Initial (0 Month)"
                      : `${checkpoint.month} Months`}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {formatDate(checkpoint.testDate)}
                  </td>

                  <td className="px-4 py-4">
                    <select
                      value={checkpoint.status}
                      onChange={(e) =>
                        updateCheckpoint(
                          checkpoint.id,
                          "status",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Passed">Passed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <input
                      value={checkpoint.observations}
                      onChange={(e) =>
                        updateCheckpoint(
                          checkpoint.id,
                          "observations",
                          e.target.value
                        )
                      }
                      placeholder="Enter observations..."
                      className="w-full min-w-[220px] rounded-lg border border-gray-300 px-3 py-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900">
              Shelf Life Assessment
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Overall status is calculated from the recorded checkpoints.
            </p>
          </div>

          <StatusBadge status={validationStatus} />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-500">Checkpoint progress</span>
            <span className="font-medium text-gray-900">
              {completedCheckpoints}/{study.checkpoints.length}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-orange-500 transition-all"
              style={{
                width: `${
                  study.checkpoints.length
                    ? (completedCheckpoints /
                        study.checkpoints.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Important:</strong> The expiry date is a proposed
          date based on the configured shelf-life duration. It
          must not be treated as validated until appropriate
          stability testing has been completed and reviewed by
          qualified personnel.
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => window.alert("Shelf-life details are saved in the current session.")}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
