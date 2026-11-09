
import { useState } from "react";

import {
  initialQualityTests,
  initialRegulatoryChecks,
} from "../../data/qualityData";

import QualityStats from "../../components/quality/QualityStats";
import QualityTestTable from "../../components/quality/QualityTestTable";
import TestResultModal from "../../components/quality/TestResultModal";
import RegulatoryChecklist from "../../components/quality/RegulatoryChecklist";
import QualityReport from "../../components/quality/QualityReport";

export default function QualityManagement() {
  const [tests, setTests] = useState(initialQualityTests);
  const [checks, setChecks] = useState(initialRegulatoryChecks);
  const [selectedTest, setSelectedTest] = useState(null);

  // Save a test result and calculate its status.
  const handleSaveResult = (testId, result) => {
    setTests((current) =>
      current.map((test) =>
        test.id === testId
          ? { ...test, ...result }
          : test
      )
    );

    setSelectedTest(null);
  };

  // Toggle a regulatory check.
  const handleToggleCheck = (checkId) => {
    setChecks((current) =>
      current.map((check) =>
        check.id === checkId
          ? { ...check, completed: !check.completed }
          : check
      )
    );
  };

  // Update regulatory check remarks.
  const handleRemarkChange = (checkId, remarks) => {
    setChecks((current) =>
      current.map((check) =>
        check.id === checkId
          ? { ...check, remarks }
          : check
      )
    );
  };

  const handleExportReport = () => {
    const report = {
      product: "Chicken Seasoning",
      generatedAt: new Date().toLocaleString(),
      tests,
      regulatoryChecks: checks,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Chicken-Seasoning-Quality-Report.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Product Development / Stage 7
          </p>

          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            Quality & Regulatory Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage laboratory results, product quality and compliance checks.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700"
        >
          Export Quality Report
        </button>
      </div>

      {/* Product Information */}
      <div className="bg-white border rounded-xl p-5">
        <div className="flex flex-wrap justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">Finished Product</p>
            <h2 className="text-lg font-semibold text-gray-800 mt-1">
              Chicken Seasoning
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">SKU</p>
            <p className="font-semibold text-gray-800 mt-1">
              FG-001
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Workflow Stage</p>
            <p className="font-semibold text-indigo-600 mt-1">
              Stage 7 — Quality & Regulatory
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <QualityStats tests={tests} checks={checks} />

      {/* Test Results */}
      <QualityTestTable
        tests={tests}
        onEdit={setSelectedTest}
      />

      {/* Regulatory Checklist */}
      <RegulatoryChecklist
        checks={checks}
        onToggle={handleToggleCheck}
        onRemarkChange={handleRemarkChange}
      />

      {/* Consolidated Report */}
      <QualityReport
        tests={tests}
        checks={checks}
      />

      {/* Result Entry Modal */}
      {selectedTest && (
        <TestResultModal
          test={selectedTest}
          onClose={() => setSelectedTest(null)}
          onSave={handleSaveResult}
        />
      )}
    </div>
  );
}
