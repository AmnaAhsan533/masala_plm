import { useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

const pageTitles = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/projects/new": "Create Project",
  "/formulator": "Recipe Formulation",
  "/raw-materials": "Raw Materials",
  "/finished-goods": "Finished Goods",
  "/quality": "Quality & Regulatory",
  "/approvals": "Approvals",
  "/specifications": "Specifications",
  "/settings": "Settings",
};

function Header({ onMenuClick }) {
  const location = useLocation();

  const currentTitle =
    pageTitles[location.pathname] || "Project Workspace";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentTitle}
          </h2>

          <p className="hidden text-xs text-gray-400 sm:block">
            MasalaPLM / {currentTitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400 lg:w-52"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
            AD
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>
            <p className="text-xs text-gray-400">
              Management
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-gray-400 sm:block"
          />
        </button>

      </div>
    </header>
  );
}

export default Header;
