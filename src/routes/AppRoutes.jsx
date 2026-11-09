
import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import ProjectsList from "../pages/projects/ProjectList";
import ProjectDetails from "../pages/projects/ProjectDetails";
import CreateProject from "../pages/projects/CreateProject";
import Documents from "../pages/documents/Documents";
import Formulator from "../pages/formulation/Formulation";
import QualityManagement from "../pages/quality/QualityManagement";
// import RawMaterials from "../pages/formulation/RawMaterials";
// import FinishedGoods from "../pages/formulation/FinishedGoods";
// import ApprovalsInbox from "../pages/approvals/ApprovalsInbox";
import Specifications from "../pages/specifications/Specifications";
import Labelling from "../pages/labelling/Labelling";
import ShelfLife from "../pages/shelf-life/ShelfLife";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <div className="text-sm text-gray-600">
              This page is not available yet.
            </div>
          }
        />

        <Route path="/projects" element={<ProjectsList />} />

        <Route path="/projects/new" element={<CreateProject />} />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />
        <Route path="/documents" element={<Documents />} />

        <Route path="/formulator" element={<Formulator />} />
        <Route path="/quality" element={<QualityManagement />} />

        <Route
          path="/specifications"
          element={<Specifications />}
        />

        <Route path="/labelling" element={<Labelling />} />

        <Route path="/shelf-life" element={<ShelfLife />} />
        {/* 

        <Route path="/raw-materials" element={<RawMaterials />} />

        <Route path="/finished-goods" element={<FinishedGoods />} />

        <Route path="/quality" element={<div>Quality & Regulatory</div>} />

        <Route path="/approvals" element={<ApprovalsInbox />} />

         */}

      </Route>
    </Routes>
  );
}

export default AppRoutes;
