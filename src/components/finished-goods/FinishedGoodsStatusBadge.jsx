
export default function FinishedGoodsStatusBadge({ status }) {
  const styles = {
    Draft: "bg-gray-100 text-gray-700",
    Active: "bg-green-100 text-green-700",
    Discontinued: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
