
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  FolderKanban,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import { useProjects } from "../../context/ProjectContext";

import ProjectStatusBadge from "../../components/projects/ProjectStatusBadge";
import ProjectProgress from "../../components/projects/ProjectProgress";

function ProjectsList() {
  const { projects } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Search and filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.productName.toLowerCase().includes(search.toLowerCase()) ||
        project.id.toLowerCase().includes(search.toLowerCase()) ||
        project.projectLead.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  // Statistics
  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "In Progress",
      value: projects.filter(p => p.status === "In Progress").length,
      icon: Clock,
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: "Completed",
      value: projects.filter(p => p.status === "Completed").length,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Development Projects
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track your product development lifecycle.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
        >
          <Plus size={18} />
          Create Project
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="font-semibold text-gray-900">
              All Projects
            </h2>
            <p className="text-xs text-gray-400">
              {filteredProjects.length} projects found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full text-sm outline-none sm:w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Project Lead</th>
                <th className="px-6 py-4">Current Stage</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {project.productName}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {project.id} · {project.category}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {project.projectLead}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    Stage {project.currentStage} of 11
                  </td>

                  <td className="px-6 py-4">
                    <ProjectProgress progress={project.progress} />
                  </td>

                  <td className="px-6 py-4">
                    <ProjectStatusBadge status={project.status} />
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
                    >
                      View
                      <ArrowUpRight size={15} />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <p className="font-medium text-gray-700">
                      No projects found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default ProjectsList;
