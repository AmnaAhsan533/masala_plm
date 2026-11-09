
export default function LabelStatusBadge({ status }) {
  const styles = {
    Draft: "bg-gray-100 text-gray-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
