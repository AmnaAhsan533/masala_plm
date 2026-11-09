
export default function SpecificationHistory({ history }) {
  return (
    <section className="bg-white border rounded-xl p-5">
      <h2 className="font-semibold text-gray-800">
        Revision History
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Record of specification changes and status updates.
      </p>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Version</th>
              <th className="p-3">Date</th>
              <th className="p-3">Author</th>
              <th className="p-3">Action</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {[...history].reverse().map((entry, index) => (
              <tr key={`${entry.version}-${index}`} className="border-t">
                <td className="p-3 font-medium">{entry.version}</td>
                <td className="p-3">{entry.date}</td>
                <td className="p-3">{entry.author}</td>
                <td className="p-3">{entry.action}</td>
                <td className="p-3">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
