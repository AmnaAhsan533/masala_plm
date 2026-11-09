const statusStyles = {
  Draft: "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-50 text-blue-700",
  "On Hold": "bg-yellow-50 text-yellow-700",
  Completed: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

function ProjectStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || statusStyles.Draft
      }`}
    >
      {status}
    </span>
  );
}

export default ProjectStatusBadge;