
import { useState } from "react";

import { productSpecification } from "../../data/specificationData";

import SpecificationHeader from "../../components/specifications/SpecificationHeader";
import ProductOverview from "../../components/specifications/ProductOverview";
import SpecificationBOM from "../../components/specifications/SpecificationBOM";
import SpecificationQuality from "../../components/specifications/SpecificationQuality";
import SpecificationAllergens from "../../components/specifications/SpecificationAllergens";
import SpecificationHistory from "../../components/specifications/SpecificationHistory";

export default function Specifications() {
  const [specification, setSpecification] = useState(
    productSpecification
  );

  const totalPercentage = specification.formulation.reduce(
    (total, item) => total + Number(item.percentage || 0),
    0
  );

  const isFormulationValid =
    Math.abs(totalPercentage - 100) < 0.000001;

  const handleStatusChange = (newStatus) => {
    if (
      newStatus === "Approved" &&
      !isFormulationValid
    ) {
      alert(
        "Cannot approve specification. Formulation must total 100%."
      );
      return;
    }

    if (newStatus === "Approved" && !specification.approvedBy) {
      // Demo approval identity. Replace with the authenticated user later.
      const approvedBy = "Quality Manager";

      setSpecification((current) => ({
        ...current,
        status: newStatus,
        approvedBy,
        history: [
          ...current.history,
          {
            version: current.version,
            date: new Date().toISOString().slice(0, 10),
            author: approvedBy,
            action: "Specification approved",
            status: newStatus,
          },
        ],
      }));

      return;
    }

    setSpecification((current) => ({
      ...current,
      status: newStatus,
      approvedBy:
        newStatus === "Approved"
          ? current.approvedBy
          : "",
      history: [
        ...current.history,
        {
          version: current.version,
          date: new Date().toISOString().slice(0, 10),
          author: "R&D Team",
          action: `Status changed to ${newStatus}`,
          status: newStatus,
        },
      ],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      {/* Specification Header */}
      <SpecificationHeader
        specification={specification}
        onPrint={handlePrint}
        onStatusChange={handleStatusChange}
      />

      {/* Product Overview */}
      <ProductOverview specification={specification} />

      {/* Formulation and BOM */}
      <SpecificationBOM
        formulation={specification.formulation}
      />

      {/* Quality Specifications */}
      <SpecificationQuality
        parameters={specification.qualityParameters}
      />

      {/* Ingredients and Allergens */}
      <SpecificationAllergens
        formulation={specification.formulation}
      />

      {/* Approval Information */}
      <section className="bg-white border rounded-xl p-5">
        <h2 className="font-semibold text-gray-800">
          Specification Approval
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500">Created By</p>
            <p className="text-sm font-medium mt-1">
              {specification.createdBy}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Approved By</p>
            <p className="text-sm font-medium mt-1">
              {specification.approvedBy || "Not yet approved"}
            </p>
          </div>
        </div>
      </section>

      {/* Revision History */}
      <SpecificationHistory
        history={specification.history}
      />

      {/* Print Footer */}
      <div className="text-xs text-gray-500 text-center py-3">
        MasalaPLM · Specification ID: {specification.id}
        · Version: {specification.version}
      </div>
    </div>
  );
}
