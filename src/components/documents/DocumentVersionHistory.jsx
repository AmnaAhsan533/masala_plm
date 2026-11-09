
function DocumentVersionHistory({ versions = [] }) {
  if (!versions.length) {
    return (
      <p className="py-4 text-sm text-gray-400">
        No previous versions available.
      </p>
    );
  }

  return (
    <div className="space-y-3">

      {versions.map((version, index) => (
        <div
          key={`${version.version}-${index}`}
          className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
        >
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Version {version.version}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Uploaded by {version.uploadedBy}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {version.uploadedAt}
            </p>
          </div>

          <span className={`rounded-full px-2.5 py-1 text-xs ${
            version.status === "Approved"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {version.status}
          </span>
        </div>
      ))}

    </div>
  );
}

export default DocumentVersionHistory;
