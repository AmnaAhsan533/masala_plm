import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import AppRoutes from "./routes/AppRoutes";
import { ProjectProvider } from "./context/ProjectContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProjectProvider>
      <AppRoutes />
    </ProjectProvider>
  </BrowserRouter>
);