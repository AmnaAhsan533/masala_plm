import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Package,
  Scale,
} from "lucide-react";

import RegulatoryAlerts from "../../components/regulatory/RegulatoryAlerts";
import { initialRawMaterials } from "../../data/rawMaterialsData";
import { REGULATORY_MARKETS } from "../../data/regulatoryData";
import { getRegulatoryAlerts } from "../../services/regulatoryEngine";
import { getAllFormulations } from "../../services/formulationStorage";

const RAW_MATERIALS_STORAGE_KEY = "masalaplm-raw-materials";

function loadRawMaterials() {
  try {
    const saved = localStorage.getItem(RAW_MATERIALS_STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not load raw materials:", error);
  }

  return initialRawMaterials;
}

function SummaryCard({ title, value, description, icon: Icon, iconStyle }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div className={`rounded-lg p-3 ${iconStyle}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function RegulatoryCompliance() {
  const [formulations] = useState(() => getAllFormulations());
  const [rawMaterials] = useState(loadRawMaterials);

  const [selectedSku, setSelectedSku] = useState(
    () => getAllFormulations()[0]?.sku || ""
  );

  const selectedFormulation = useMemo(
    () => formulations.find((item) => item.sku === selectedSku) || null,
    [formulations, selectedSku]
  );

  const [selectedMarkets, setSelectedMarkets] = useState(
    () => selectedFormulation?.selectedMarkets || [...REGULATORY_MARKETS]
  );

  // Restore the selected formulation's markets whenever the product changes.
  useEffect(() => {
    if (!selectedFormulation) {
      setSelectedMarkets([]);
      return;
    }

    setSelectedMarkets(
      selectedFormulation.selectedMarkets?.length
        ? selectedFormulation.selectedMarkets
        : [...REGULATORY_MARKETS]
    );
  }, [selectedFormulation]);

  const alerts = useMemo(() => {
    if (!selectedFormulation || !Array.isArray(selectedFormulation.ingredients)) {
      return [];
    }

    return getRegulatoryAlerts({
      ingredients: selectedFormulation.ingredients,
      rawMaterials,
      markets: selectedMarkets,
      foodCategory: selectedFormulation.foodCategory || "12.2.2",
    });
  }, [selectedFormulation, rawMaterials, selectedMarkets]);

  const reviewStatuses = [
    "not-authorized",
    "limit-exceeded",
    "needs-concentration",
    "unverified",
  ];

  const reviewCount = alerts.filter((alert) =>
    reviewStatuses.includes(alert.status)
  ).length;

  const passedCount = alerts.filter((alert) =>
    ["compliant", "permitted-gmp"].includes(alert.status)
  ).length;

  const unverifiedCount = alerts.filter(
    (alert) => alert.status === "unverified"
  ).length;

  const hasSavedFormulations = formulations.length > 0;

  const formattedDate = selectedFormulation?.updatedAt
    ? new Date(selectedFormulation.updatedAt).toLocaleString()
    : "Not available";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page heading */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Product Development / Regulatory
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Regulatory Compliance
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Review ingredient and additive requirements across your selected
              markets.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-600 shadow-sm">
            <Scale size={17} className="text-green-700" />
            Regulatory Screening
          </div>
        </div>
      </div>

      {!hasSavedFormulations ? (
        /* Empty state */
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
            <ClipboardList size={27} className="text-green-700" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            No saved formulations found
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
            Save a product formulation first. The Regulatory Dashboard uses
            its BOM and raw-material records to generate regulatory findings.
          </p>

          <Link
            to="/formulator"
            className="mt-6 inline-flex items-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-800"
          >
            Go to Formulation
          </Link>
        </div>
      ) : (
        <>
          {/* Product selector */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Package size={19} className="text-green-700" />
              <h2 className="font-semibold text-gray-800">
                Product Assessment
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="regulatory-product"
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  Select Finished Product
                </label>

                <select
                  id="regulatory-product"
                  value={selectedSku}
                  onChange={(event) => setSelectedSku(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >
                  {formulations.map((formulation) => (
                    <option key={formulation.sku} value={formulation.sku}>
                      {formulation.productName} ({formulation.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Food Category
                </p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
                  {selectedFormulation?.foodCategory || "Not specified"}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Last Saved
                </p>
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
                  {formattedDate}
                </div>
              </div>
            </div>

            {selectedFormulation && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <div className="text-sm text-gray-500">
                  Product:{" "}
                  <span className="font-medium text-gray-700">
                    {selectedFormulation.productName}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  SKU:{" "}
                  <span className="font-medium text-gray-700">
                    {selectedFormulation.sku}
                  </span>
                </div>

                <Link
                  to="/formulator"
                  className="text-sm font-medium text-green-700 hover:text-green-800"
                >
                  Open Formulation
                </Link>
              </div>
            )}
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title="Total Findings"
              value={alerts.length}
              description="Checks generated for selected markets"
              icon={ClipboardList}
              iconStyle="bg-blue-50 text-blue-700"
            />

            <SummaryCard
              title="Review Required"
              value={reviewCount}
              description="Findings requiring attention"
              icon={AlertTriangle}
              iconStyle="bg-amber-50 text-amber-700"
            />

            <SummaryCard
              title="Checks Passed"
              value={passedCount}
              description="Permitted or within configured limits"
              icon={CheckCircle2}
              iconStyle="bg-green-50 text-green-700"
            />

            <SummaryCard
              title="Unverified"
              value={unverifiedCount}
              description="Insufficient verified regulatory data"
              icon={Scale}
              iconStyle="bg-gray-100 text-gray-700"
            />
          </div>

          {/* Regulatory alerts */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-5">
              <h2 className="font-semibold text-gray-800">
                Regulatory Findings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select the markets you want to assess. Findings are generated
                from the saved formulation and configured regulatory rules.
              </p>
            </div>

            {selectedFormulation?.ingredients?.length ? (
              <RegulatoryAlerts
                alerts={alerts}
                selectedMarkets={selectedMarkets}
                onMarketChange={setSelectedMarkets}
              />
            ) : (
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                This saved formulation does not contain a valid ingredient
                list. Open the formulation and save its BOM before running
                this assessment.
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertTriangle
                size={19}
                className="mt-0.5 shrink-0 text-amber-700"
              />

              <div>
                <h3 className="text-sm font-semibold text-amber-900">
                  Regulatory review required before commercial approval
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-800">
                  These findings are based on the regulatory rules currently
                  configured in MasalaPLM. Missing or unverified rules do not
                  establish that an ingredient is either permitted or
                  prohibited. Verify the applicable legislation, food
                  category, additive identity, concentration, conditions of
                  use and current amendments before approving a product for
                  sale or export.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}