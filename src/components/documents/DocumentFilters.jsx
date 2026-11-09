
import { Search, Filter } from "lucide-react";

function DocumentFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:flex-row">

      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-orange-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
        >
          <option value="All">All Categories</option>
          <option value="Project Documents">Project Documents</option>
          <option value="Research">Research</option>
          <option value="Product Development">Product Development</option>
          <option value="Technical">Technical</option>
          <option value="R&D">R&D</option>
          <option value="Quality">Quality</option>
          <option value="Regulatory">Regulatory</option>
          <option value="Packaging">Packaging</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
        >
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

    </div>
  );
}

export default DocumentFilters;
