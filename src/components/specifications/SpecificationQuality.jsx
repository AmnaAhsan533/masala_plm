
export default function SpecificationQuality({ parameters }) {
  return (
    <section className="bg-white border rounded-xl overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="font-semibold text-gray-800">
          Quality Specifications
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Defined quality limits and recommended test methods.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Parameter</th>
              <th className="p-4">Minimum</th>
              <th className="p-4">Maximum</th>
              <th className="p-4">Unit</th>
              <th className="p-4">Test Method</th>
            </tr>
          </thead>

          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.id} className="border-t">
                <td className="p-4 font-medium">
                  {parameter.parameter}
                </td>
                <td className="p-4">{parameter.min}</td>
                <td className="p-4">{parameter.max}</td>
                <td className="p-4">{parameter.unit || "—"}</td>
                <td className="p-4">{parameter.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
