
import { useEffect, useMemo, useState } from "react";
import { Plus, Package } from "lucide-react";

import { initialFinishedGoods } from "../../data/finishedGoodsData";

import FinishedGoodsStats from "../../components/finished-goods/FinishedGoodsStats";
import FinishedGoodsFilters from "../../components/finished-goods/FinishedGoodsFilters";
import FinishedGoodsTable from "../../components/finished-goods/FinishedGoodsTable";
import FinishedGoodsModal from "../../components/finished-goods/FinishedGoodsModal";
import FinishedGoodsDetails from "../../components/finished-goods/FinishedGoodsDetails";

const STORAGE_KEY = "masalaplm-finished-goods";

export default function FinishedGoods() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFinishedGoods;
    } catch {
      return initialFinishedGoods;
    }
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const categories = useMemo(
    () => [...new Set(products.map((item) => item.category))].sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const searchValue = search.toLowerCase();

      const searchMatch =
        item.name.toLowerCase().includes(searchValue) ||
        item.sku.toLowerCase().includes(searchValue) ||
        item.id.toLowerCase().includes(searchValue);

      const categoryMatch =
        category === "All" || item.category === category;

      const statusMatch =
        status === "All" || item.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [products, search, category, status]);

  const openAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (formData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newCode = generateProductCode(products);

      const newProduct = {
        ...formData,
        id: newCode,
        sku: newCode,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    const confirmed = window.confirm(
      `Delete ${product.name} (${product.sku})?`
    );

    if (!confirmed) return;

    setProducts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Master Data</span>
            <span>/</span>
            <span>Finished Goods</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Finished Goods Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage finished products, manufacturing details,
            packaging and shelf-life information.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Plus size={18} />
          Add Finished Good
        </button>
      </div>

      {/* Statistics */}
      <FinishedGoodsStats products={products} />

      {/* Registry */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-orange-600" />
          <h2 className="font-semibold text-gray-900">
            Finished Goods Registry
          </h2>
        </div>

        <FinishedGoodsFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          categories={categories}
        />

        <FinishedGoodsTable
          products={filteredProducts}
          onView={setViewingProduct}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Add/Edit Modal */}
      <FinishedGoodsModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        product={editingProduct}
      />

      {/* Details Modal */}
      <FinishedGoodsDetails
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
      />
    </div>
  );
}

function generateProductCode(products) {
  const highestNumber = products.reduce((max, item) => {
    const number = Number(item.id.replace("FG-", ""));
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 0);

  return `FG-${String(highestNumber + 1).padStart(3, "0")}`;
}
