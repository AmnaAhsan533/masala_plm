
import { X, FileText, CalendarDays, UserRound } from "lucide-react";

import DocumentStatusBadge from "./DocumentStatusBadge";
import DocumentVersionHistory from "./DocumentVersionHistory";

function DocumentDetailsModal({ document, onClose }) {
  if (!document) return null;

  const details = [
    ["Document Name", document.name],
    ["File Name", document.fileName],
    ["Category", document.category],
    ["Related Project", document.projectName],
    ["Workflow Stage", `Stage ${document.stage}`],
    ["Version", `v${document.version}`],
    ["File Size", document.fileSize],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-50 p-2">
              <FileText size={22} className="text-orange-600" />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Document Details
              </h2>

              <p className="text-xs text-gray-400">
                Document information and history
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="space-y-6 p-5">

          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {document.name}
            </h3>

            <DocumentStatusBadge status={document.status} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {details.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg bg-gray-50 p-3"
              >
                <p className="text-xs text-gray-400">
                  {label}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {value || "Not specified"}
                </p>
              </div>
            ))}

          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Description
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {document.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs text-gray-500">

            <span className="flex items-center gap-2">
              <UserRound size={15} />
              {document.uploadedBy}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={15} />
              {document.uploadedAt}
            </span>

          </div>

          <div className="border-t pt-5">

            <h3 className="mb-3 font-semibold text-gray-900">
              Version History
            </h3>

            <DocumentVersionHistory
              versions={document.versions}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default DocumentDetailsModal;
