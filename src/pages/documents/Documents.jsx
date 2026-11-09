
import { useMemo, useState } from "react";
import { Upload, Files } from "lucide-react";

import { mockDocuments } from "../../data/mockDocuments";

import DocumentStats from "../../components/documents/DocumentStats";
import DocumentFilters from "../../components/documents/DocumentFilters";
import DocumentTable from "../../components/documents/DocumentTable";
import DocumentUploadModal from "../../components/documents/DocumentUploadModal";
import DocumentDetailsModal from "../../components/documents/DocumentDetailsModal";

function Documents() {
  const [documents, setDocuments] = useState(mockDocuments);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.fileName.toLowerCase().includes(search.toLowerCase()) ||
        doc.projectName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || doc.category === category;

      const matchesStatus =
        status === "All" || doc.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [documents, search, category, status]);

  // Upload document
  const handleUpload = (formData) => {
    const newDocument = {
      id: `DOC-${String(documents.length + 1).padStart(3, "0")}`,

      name: formData.name,
      fileName: formData.file.name,
      category: formData.category,

      projectId: "PRJ-001",
      projectName: "Chicken Seasoning",

      stage: formData.stage,

      uploadedBy: "Admin",
      uploadedAt: new Date().toISOString().slice(0, 10),

      version: "1.0",
      status: "Pending",

      description: formData.description,

      fileSize: `${(formData.file.size / 1024 / 1024).toFixed(2)} MB`,

      file: formData.file,

      versions: [
        {
          version: "1.0",
          uploadedBy: "Admin",
          uploadedAt: new Date().toISOString().slice(0, 10),
          status: "Pending",
        },
      ],
    };

    setDocuments((prev) => [newDocument, ...prev]);
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="flex items-center gap-2">
            <Files className="text-orange-600" size={24} />

            <h1 className="text-2xl font-bold text-gray-900">
              Document Management
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Manage project documents, technical files and approval records.
          </p>

        </div>

        <button
          onClick={() => setShowUpload(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Upload size={17} />
          Upload Document
        </button>

      </div>

      {/* Statistics */}
      <DocumentStats documents={documents} />

      {/* Filters */}
      <DocumentFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
      />

      {/* Document Table */}
      <div className="space-y-3">

        <div className="flex items-center justify-between">

          <h2 className="font-semibold text-gray-900">
            Project Documents
          </h2>

          <span className="text-xs text-gray-400">
            Showing {filteredDocuments.length} of {documents.length} documents
          </span>

        </div>

        <DocumentTable
          documents={filteredDocuments}
          onView={setSelectedDocument}
        />

      </div>

      {/* Upload Modal */}
      {showUpload && (
        <DocumentUploadModal
          project={{
            currentStage: 6,
          }}
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}

      {/* Details Modal */}
      {selectedDocument && (
        <DocumentDetailsModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}

    </div>
  );
}

export default Documents;
