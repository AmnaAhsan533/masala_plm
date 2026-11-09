function StageStatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-50 text-green-700 border-green-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    Pending: "bg-gray-100 text-gray-500 border-gray-200",
    "Pending Approval": "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

export default StageStatusBadge;