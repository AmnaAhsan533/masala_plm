
import {
  FileText,
  Download,
  Eye,
} from "lucide-react";

import DocumentStatusBadge from "./DocumentStatusBadge";

function DocumentTable({ documents, onView }) {

  const handleDownload = (document) => {
    if (!document.file) {
      alert("This is a sample document. No actual file is attached.");
      return;
    }

    const url = URL.createObjectURL(document.file);

    const link = window.document.createElement("a");
    link.href = url;
    link.download = document.fileName;

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-50">

            <tr className="text-xs uppercase tracking-wide text-gray-500">

              <th className="px-5 py-4 font-semibold">
                Document
              </th>

              <th className="px-5 py-4 font-semibold">
                Category
              </th>

              <th className="px-5 py-4 font-semibold">
                Stage
              </th>

              <th className="px-5 py-4 font-semibold">
                Version
              </th>

              <th className="px-5 py-4 font-semibold">
                Uploaded
              </th>

              <th className="px-5 py-4 font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {documents.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No documents found.
                </td>
              </tr>

            ) : (

              documents.map((doc) => (

                <tr
                  key={doc.id}
                  className="transition hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-orange-50 p-2">
                        <FileText
                          size={19}
                          className="text-orange-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-56 truncate text-sm font-semibold text-gray-800">
                          {doc.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {doc.fileName}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {doc.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    Stage {doc.stage}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    v{doc.version}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {doc.uploadedAt}
                  </td>

                  <td className="px-5 py-4">
                    <DocumentStatusBadge status={doc.status} />
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        onClick={() => onView(doc)}
                        title="View details"
                        className="rounded-lg p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(doc)}
                        title="Download"
                        className="rounded-lg p-2 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Download size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DocumentTable;
