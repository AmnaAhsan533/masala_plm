
import { useState } from "react";

import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

function ApprovalPanel({
  stage,
  approval,
  onApprove,
  onReject,
  disabled = false,
}) {
  const [approver, setApprover] = useState("Department Head");
  const [remarks, setRemarks] = useState("");

  const status = approval?.status || "Pending";

  const isApproved = status === "Approved";
  const isRejected = status === "Rejected";

  const handleAction = (action) => {
    if (!remarks.trim()) {
      alert("Please enter approval remarks.");
      return;
    }

    if (action === "Approved") {
      onApprove(approver, remarks);
    } else {
      onReject(approver, remarks);
    }

    setRemarks("");
  };

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-5">

      <div className="flex items-start gap-3">

        <div className="rounded-lg bg-orange-100 p-2">
          <ShieldCheck size={22} className="text-orange-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">
            {stage.approvalName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Review and approve this development stage.
          </p>
        </div>

      </div>

      {/* Status */}
      <div className="mt-5 flex items-center gap-2">

        {isApproved ? (
          <>
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Approved
            </span>
          </>
        ) : isRejected ? (
          <>
            <XCircle size={18} className="text-red-600" />
            <span className="text-sm font-semibold text-red-700">
              Rejected
            </span>
          </>
        ) : (
          <>
            <Clock size={18} className="text-orange-600" />
            <span className="text-sm font-semibold text-orange-700">
              Pending Approval
            </span>
          </>
        )}

      </div>

      {/* Previous remarks */}
      {approval?.remarks && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-3">

          <p className="text-xs font-semibold text-gray-500">
            Previous Remarks
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {approval.remarks}
          </p>

          <p className="mt-2 text-xs text-gray-400">
            By {approval.approver || "Department Head"}
          </p>

        </div>
      )}

      {/* Approval Form */}
      {!isApproved && !disabled && (

        <div className="mt-5 space-y-4">

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Approver
            </label>

            <select
              value={approver}
              onChange={(e) => setApprover(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option>Department Head</option>
              <option>R&D Head</option>
              <option>Quality Head</option>
              <option>Management</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Remarks / Feedback
            </label>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter approval comments or reason for rejection..."
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => handleAction("Approved")}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Approve
            </button>

            <button
              onClick={() => handleAction("Rejected")}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Reject
            </button>

          </div>

        </div>

      )}

      {disabled && !isApproved && (
        <p className="mt-3 text-xs text-gray-400">
          Approval actions are unavailable for this stage.
        </p>
      )}

    </div>
  );
}

export default ApprovalPanel;
