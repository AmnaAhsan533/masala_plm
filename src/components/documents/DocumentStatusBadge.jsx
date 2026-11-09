
function DocumentStatusBadge({ status }) {
  const styles = {
    Approved: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

export default DocumentStatusBadge;
