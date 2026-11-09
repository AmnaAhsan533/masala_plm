
import { useState } from "react";
import { X, UploadCloud, FileText } from "lucide-react";

import { workflowStages } from "../../data/workflowStages";

const categories = [
  "Project Documents",
  "Research",
  "Product Development",
  "Technical",
  "R&D",
  "Quality",
  "Regulatory",
  "Packaging",
  "Other",
];

function DocumentUploadModal({
  onClose,
  onUpload,
  project,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Technical");
  const [stage, setStage] = useState(
    String(project?.currentStage || 1)
  );
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !name.trim()) {
      alert("Please enter a document name and select a file.");
      return;
    }

    onUpload({
      name: name.trim(),
      category,
      stage: Number(stage),
      description,
      file,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Upload Document
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Add a document to this product development project.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Document Name *
            </label>

            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Raw Material Specification"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category *
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Related Workflow Stage *
            </label>

            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
            >
              {workflowStages.map((item) => (
                <option key={item.id} value={item.id}>
                  Stage {item.id} - {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short document description..."
              className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-orange-500"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select File *
            </label>

            <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-orange-400 hover:bg-orange-50/30">

              {file ? (
                <>
                  <FileText
                    size={30}
                    className="text-orange-600"
                  />

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <UploadCloud
                    size={30}
                    className="text-gray-400"
                  />

                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Click to upload a file
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PDF, DOC, DOCX, XLS, XLSX, PNG, JPG
                  </p>
                </>
              )}

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              Upload Document
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default DocumentUploadModal;
