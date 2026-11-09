import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  Boxes,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  Users,
  Settings,
  X,
  ChevronRight,
  Tags,
  CalendarClock,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "PRODUCT DEVELOPMENT",
    items: [
      {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban,
      },
      {
        name: "Formulation",
        path: "/formulator",
        icon: FlaskConical,
      },
      {
        name: "Raw Materials",
        path: "/raw-materials",
        icon: Boxes,
      },
      {
        name: "Finished Goods",
        path: "/finished-goods",
        icon: Boxes,
      },
    ],
  },
  {
    title: "QUALITY & COMPLIANCE",
    items: [
      {
        name: "Quality & Regulatory",
        path: "/quality",
        icon: ShieldCheck,
      },
      {
        name: "Approvals",
        path: "/approvals",
        icon: ClipboardCheck,
      },
      {
        name: "Specifications",
        path: "/specifications",
        icon: FileText,
      },
      {
      name: "Labelling & Nutrition",
      path: "/labelling",
      icon: Tags,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: FileText,
    }
    ],
  },
  {
  title: "Shelf Life Management",
  items:[
    {
      name: "Shelf Life",
      path: "/shelf-life",
      icon: CalendarClock,
    }
    
  ]
  
},
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-orange-600">
              Masala<span className="text-gray-900">PLM</span>
            </h1>
            <p className="mt-0.5 text-[10px] font-medium tracking-widest text-gray-400">
              PRODUCT LIFECYCLE MANAGEMENT
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-gray-400">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-orange-50 text-orange-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon size={18} />
                            {item.name}
                          </div>

                          {isActive && (
                            <ChevronRight size={15} />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-100 p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-700">
              AD
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Admin User
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
