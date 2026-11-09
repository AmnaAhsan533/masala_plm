import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:ml-64">

        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default MainLayout;
