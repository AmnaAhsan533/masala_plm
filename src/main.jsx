
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import AppRoutes from "./routes/AppRoutes";
import { ProjectProvider } from "./context/ProjectContext";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectProvider>
        <AppRoutes />
      </ProjectProvider>
    </AuthProvider>
  </BrowserRouter>
);
