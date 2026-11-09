import SpecificationStatusBadge from "./SpecificationStatusBadge";

export default function SpecificationHeader({
  specification,
  onPrint,
  onStatusChange,
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Product Development / Stage 8
          </p>

          <h1 className="text-2xl font-bold text-gray-800 mt-1">
            Product Specifications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Centralized technical specification and product information.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-sm text-gray-600">
              Specification ID: <strong>{specification.id}</strong>
            </span>

            <span className="text-sm text-gray-600">
              Version: <strong>{specification.version}</strong>
            </span>

            <SpecificationStatusBadge status={specification.status} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onPrint}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Print Specification
          </button>

          <select
            value={specification.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Obsolete">Obsolete</option>
          </select>
        </div>
      </div>
    </div>
  );
}
