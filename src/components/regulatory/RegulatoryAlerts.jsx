
const STATUS_STYLES = {
  "not-authorized": "bg-red-100 text-red-800 border-red-200",
  "limit-exceeded": "bg-red-100 text-red-800 border-red-200",
  "needs-concentration": "bg-orange-100 text-orange-800 border-orange-200",
  unverified: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "permitted-gmp": "bg-blue-100 text-blue-800 border-blue-200",
  compliant: "bg-green-100 text-green-800 border-green-200",
};

const STATUS_LABELS = {
  "not-authorized": "Not authorized for category",
  "limit-exceeded": "Maximum limit exceeded",
  "needs-concentration": "Concentration required",
  unverified: "Unverified",
  "permitted-gmp": "Permitted under GMP",
  compliant: "Within maximum limit",
};

const MARKET_OPTIONS = [
  "Pakistan",
  "Canada",
  "USA",
  "Europe",
  "Australia & New Zealand",
  "Middle East",
];

export default function RegulatoryAlerts({
  alerts,
  selectedMarkets,
  onMarketChange,
}) {
  const issues = alerts.filter((alert) =>
    [
      "not-authorized",
      "limit-exceeded",
      "needs-concentration",
      "unverified",
    ].includes(alert.status)
  );

  const compliant = alerts.filter(
    (alert) =>
      alert.status === "compliant" ||
      alert.status === "permitted-gmp"
  );

  const toggleMarket = (market) => {
    if (selectedMarkets.includes(market)) {
      onMarketChange(
        selectedMarkets.filter((item) => item !== market)
      );
    } else {
      onMarketChange([...selectedMarkets, market]);
    }
  };

  return (
    <section className="bg-white border rounded-xl p-5 space-y-5">
      <div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="font-semibold text-gray-800 text-lg">
            Regulatory Compliance
          </h2>

          <span className="text-xs text-gray-500">
            Ingredient-level market checks
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Select the markets in which this finished product will be sold.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MARKET_OPTIONS.map((market) => (
          <label
            key={market}
            className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={selectedMarkets.includes(market)}
              onChange={() => toggleMarket(market)}
              className="h-4 w-4"
            />

            <span className="text-sm text-gray-700">
              {market}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Issues / reviews</p>
          <p className="text-2xl font-semibold text-red-600">
            {issues.length}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Permitted checks</p>
          <p className="text-2xl font-semibold text-green-600">
            {compliant.length}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Markets selected</p>
          <p className="text-2xl font-semibold text-gray-800">
            {selectedMarkets.length}
          </p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="border border-dashed rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500">
            No additive ingredients found in the current formulation,
            or no markets have been selected.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">
            Regulatory findings
          </h3>

          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${
                STATUS_STYLES[alert.status] ||
                "bg-gray-50 text-gray-700 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div>
                  <p className="font-semibold">
                    {alert.ingredientName}
                  </p>

                  <p className="text-xs mt-1 opacity-80">
                    INS {alert.insNumber} · {alert.market}
                  </p>
                </div>

                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/70">
                  {STATUS_LABELS[alert.status]}
                </span>
              </div>

              <p className="text-sm mt-3">
                {alert.message}
              </p>

              {alert.conditions && (
                <div className="mt-3 text-sm">
                  <p className="font-semibold">Conditions / notes</p>
                  <p className="mt-1">{alert.conditions}</p>
                </div>
              )}

              {alert.maximumLevel !== undefined && (
                <div className="mt-3 text-sm">
                  <p>
                    <strong>Maximum level:</strong>{" "}
                    {alert.maximumLevel.toLocaleString()} {alert.unit}
                  </p>
                </div>
              )}

              {alert.sourceName && alert.sourceUrl && (
                <a
                  href={alert.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm underline font-medium"
                >
                  View source: {alert.sourceName}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Unverified means that a sufficiently checked rule is not loaded.
        It does not mean the ingredient is banned or permitted.
        Regulatory findings must be reviewed against the current law
        before commercial approval.
      </p>
    </section>
  );
}
