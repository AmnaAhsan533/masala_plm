
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import { useProjects } from "../../context/ProjectContext";

const departments = [
  "Marketing",
  "R&D",
  "Regulatory",
  "Quality",
  "Packaging",
  "Procurement",
  "Production",
];

function CreateProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productType: "New Product",
    projectLead: "",
    priority: "Medium",
    targetLaunchDate: "",
    description: "",
    departments: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (department) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter((d) => d !== department)
        : [...prev.departments, department],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!formData.category) {
      setError("Please select a product category.");
      return;
    }

    if (!formData.projectLead.trim()) {
      setError("Please enter a project lead.");
      return;
    }

    if (formData.departments.length === 0) {
      setError("Please select at least one department.");
      return;
    }

    const newProject = addProject(formData);

    navigate(`/projects/${newProject.id}`);
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  const labelClass =
    "text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div>
        <Link
          to="/projects"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          Create New Project
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Enter the initial information for your product development project.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Basic Information */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Project Information
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Basic details about the product being developed.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className={labelClass}>
                Product Name *
              </label>

              <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="e.g. Premium Chicken Seasoning"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Product Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Category</option>
                <option value="Spice Blend">Spice Blend</option>
                <option value="Seasoning">Seasoning</option>
                <option value="Single Spice">Single Spice</option>
                <option value="Processed Food">Processed Food</option>
                <option value="Sauce">Sauce</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Project Type
              </label>

              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className={inputClass}
              >
                <option>New Product</option>
                <option>Product Improvement</option>
                <option>Cost Optimization</option>
                <option>Customer Specific Development</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Project Lead *
              </label>

              <input
                name="projectLead"
                value={formData.projectLead}
                onChange={handleChange}
                placeholder="Enter project lead name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Target Launch Date
              </label>

              <input
                type="date"
                name="targetLaunchDate"
                value={formData.targetLaunchDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

          </div>

          <div className="mt-5">
            <label className={labelClass}>
              Project Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the purpose and objectives of this product development project..."
              className={inputClass}
            />
          </div>
        </section>

        {/* Departments */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Departments Involved
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Select all departments that will participate in this project.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <label
                key={department}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-orange-50"
              >
                <input
                  type="checkbox"
                  checked={formData.departments.includes(department)}
                  onChange={() => handleDepartmentChange(department)}
                  className="h-4 w-4 accent-orange-600"
                />

                <span className="text-sm text-gray-700">
                  {department}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link
            to="/projects"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Save size={17} />
            Create Project
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateProject;
