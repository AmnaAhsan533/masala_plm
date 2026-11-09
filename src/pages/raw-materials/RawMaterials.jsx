
import { useEffect, useMemo, useState } from "react";
import { Plus, Package } from "lucide-react";

import { initialRawMaterials } from "../../data/rawMaterialsData";

import RawMaterialStats from "../../components/raw-materials/RawMaterialStats";
import RawMaterialFilters from "../../components/raw-materials/RawMaterialFilters";
import RawMaterialTable from "../../components/raw-materials/RawMaterialTable";
import RawMaterialModal from "../../components/raw-materials/RawMaterialModal";
import RawMaterialDetails from "../../components/raw-materials/RawMaterialDetails";

const STORAGE_KEY = "masalaplm-raw-materials";

export default function RawMaterials() {
  const [materials, setMaterials] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialRawMaterials;
    } catch {
      return initialRawMaterials;
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [viewingMaterial, setViewingMaterial] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
  }, [materials]);

  const categories = useMemo(
    () => [...new Set(materials.map((item) => item.category))].sort(),
    [materials]
  );

  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || item.category === category;

      const statusMatch =
        status === "All" || item.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [materials, search, category, status]);

  const openAddModal = () => {
    setEditingMaterial(null);
    setModalOpen(true);
  };

  const openEditModal = (material) => {
    setEditingMaterial(material);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMaterial(null);
  };

  const handleSave = (formData) => {
    if (editingMaterial) {
      setMaterials((prev) =>
        prev.map((item) =>
          item.id === editingMaterial.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newMaterial = {
        ...formData,
        id: generateMaterialCode(materials),
        createdAt: new Date().toISOString().split("T")[0],
      };

      setMaterials((prev) => [...prev, newMaterial]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const material = materials.find((item) => item.id === id);

    if (!material) return;

    const confirmed = window.confirm(
      `Delete ${material.name} (${material.id})?`
    );

    if (!confirmed) return;

    setMaterials((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Master Data</span>
            <span>/</span>
            <span>Raw Materials</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Raw Material Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage ingredient records, costs, quality specifications and allergens.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Plus size={18} />
          Add Raw Material
        </button>
      </div>

      {/* Stats */}
      <RawMaterialStats materials={materials} />

      {/* Registry */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-orange-600" />
          <h2 className="font-semibold text-gray-900">
            Raw Material Registry
          </h2>
        </div>

        <RawMaterialFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          categories={categories}
        />

        <RawMaterialTable
          materials={filteredMaterials}
          onView={setViewingMaterial}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Add/Edit Modal */}
      <RawMaterialModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        material={editingMaterial}
      />

      {/* Details Modal */}
      <RawMaterialDetails
        material={viewingMaterial}
        onClose={() => setViewingMaterial(null)}
      />
    </div>
  );
}

function generateMaterialCode(materials) {
  const highestNumber = materials.reduce((max, item) => {
    const number = Number(item.id.replace("RM-", ""));
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 0);

  return `RM-${String(highestNumber + 1).padStart(3, "0")}`;
}
