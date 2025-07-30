import { useState, useEffect } from "react";
import { HiPlus, HiViewList, HiTrash } from 'react-icons/hi';
import { HiBellAlert } from "react-icons/hi2";
import Loader from "../components/Loader";
import LoaderOverlay from '../components/LoaderOverlay';
import ConfirmModal from '../components/ConfirmModal';

const SIDEBAR_OPTIONS = [
  { key: "add", label: "Add Testimonial", icon: HiPlus },
  { key: "show", label: "Show All Testimonials", icon: HiViewList },
  { key: "delete", label: "Delete Testimonial", icon: HiTrash },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", text: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [sidebarOption, setSidebarOption] = useState("add");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch all testimonials
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch {
      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (editingIndex !== null) {
      // Edit
      try {
        const id = testimonials[editingIndex]._id;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update testimonial");
        const updated = await res.json();
        setTestimonials((prev) => prev.map((t, i) => (i === editingIndex ? updated : t)));
        setEditingIndex(null);
        showToast("Testimonial updated!");
      } catch {
        showToast("Failed to update testimonial", "error");
      }
    } else {
      // Add
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add testimonial");
        const added = await res.json();
        setTestimonials((prev) => [added, ...prev]);
        showToast("Testimonial added!");
      } catch {
        showToast("Failed to add testimonial", "error");
      }
    }
    setForm({ name: "", position: "", text: "" });
    setSubmitting(false);
  };

  const handleEdit = (idx) => {
    setForm({
      name: testimonials[idx].name,
      position: testimonials[idx].position,
      text: testimonials[idx].text,
    });
    setEditingIndex(idx);
    setSidebarOption("add");
  };

  const handleDeleteClick = (idx) => {
    setDeleteTarget(idx);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget !== null) {
      setShowDeleteModal(false); // Close modal immediately
      const targetIndex = deleteTarget;
      setDeleteTarget(null); // Reset target
      await handleDelete(targetIndex); // Handle deletion
    }
  };

  const handleDelete = async (idx) => {
    setDeletingIndex(idx);
    try {
      const id = testimonials[idx]._id;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      setTestimonials((prev) => prev.filter((_, i) => i !== idx));
      showToast("Testimonial deleted!");
    } catch {
      showToast("Failed to delete testimonial", "error");
    } finally {
      setDeletingIndex(null);
    }

    if (editingIndex === idx) {
      setForm({ name: "", position: "", text: "" });
      setEditingIndex(null);
    }
  };

  return (
    <div className="w-full flex justify-center items-start py-4 md:py-10">
      {/* Loading overlay for initial page load */}
      {loading && <LoaderOverlay message="Loading testimonials..." />}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this testimonial?"
      />

      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-none md:rounded-2xl overflow-hidden relative mx-2 md:mx-0">
        {toast.message && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg animate-fade-in-out text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-500'}`}>
            {toast.message}
          </div>
        )}

        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-slate-100 p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-start">
          <div className="font-bold text-xl text-blue-500 mb-4 md:mb-8 tracking-wide">Testimonials</div>

          {/* Mobile: Horizontal scrolling buttons */}
          <div className="w-full flex flex-row flex-wrap lg:flex-col lg:flex-nowrap gap-2 md:gap-3 justify-center lg:justify-start pb-2 lg:pb-0">
            {SIDEBAR_OPTIONS.map(opt => (
              <div key={opt.key} className="flex-shrink-0 lg:w-full">
                <button
                  className={`min-w-max flex items-center gap-2 lg:gap-3 py-2 lg:py-3 px-3 lg:px-4 rounded-xl text-sm lg:text-md font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400
                ${sidebarOption === opt.key ? 'bg-blue-800 text-white shadow-lg scale-[1.03]' : 'bg-white text-blue-500'}
                hover:bg-blue-500 hover:text-white hover:scale-[1.03] active:scale-100
              `}
                  onClick={() => setSidebarOption(opt.key)}
                >
                  <opt.icon className={`text-lg lg:text-2xl ${sidebarOption === opt.key ? 'text-white' : 'text-blue-400'} transition-colors`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 bg-slate-50">
          {error && <div className="text-center text-red-600 mb-4">{error}</div>}

          {/* Add/Edit Form */}
          {sidebarOption === "add" && (
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-4 md:p-8">
              <h2 className="text-blue-500 mb-4 md:mb-6 font-bold text-xl md:text-2xl">
                {editingIndex !== null ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <div onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 md:gap-5">
                  <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <input
                    name="position"
                    placeholder="Position"
                    value={form.position}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <textarea
                    name="text"
                    placeholder="Testimonial"
                    value={form.text}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader size="sm" color="white" />
                          {editingIndex !== null ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        editingIndex !== null ? "Update" : "Add"
                      )}
                    </button>
                    {editingIndex !== null && (
                      <button
                        onClick={() => { setForm({ name: "", position: "", text: "" }); setEditingIndex(null); }}
                        disabled={submitting}
                        className="flex-1 bg-slate-200 text-blue-500 border-none py-2 rounded-md font-semibold hover:bg-slate-300 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show Testimonials */}
          {sidebarOption === "show" && (
            <div>
              <h2 className="text-blue-500 mb-4 md:mb-6 font-bold text-xl md:text-2xl">All Testimonials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {testimonials.length === 0 ? (
                  <div className="text-slate-400 text-lg mx-auto col-span-full flex flex-col items-center gap-4">
                    <p>No testimonials yet.</p>
                  </div>
                ) : (
                  testimonials.map((t, idx) => (
                    <div key={t._id} className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center border border-blue-100 transition-shadow">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-lg md:text-xl text-blue-500 mb-3">
                        {getInitials(t.name)}
                      </div>
                      <div className="font-semibold text-base md:text-lg text-blue-500 mb-1 text-center">{t.name}</div>
                      <div className="text-sm md:text-base text-slate-400 mb-3 text-center">{t.position}</div>
                      <div className="text-sm md:text-base text-slate-700 mb-4 text-center line-clamp-3">&ldquo;{t.text}&rdquo;</div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <button
                          onClick={() => handleEdit(idx)}
                          disabled={deletingIndex === idx}
                          className="flex-1 bg-blue-100 text-blue-700 border-none px-4 py-1.5 rounded-md font-medium text-sm md:text-base hover:bg-blue-200 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(idx)}
                          disabled={deletingIndex === idx}
                          className="flex-1 bg-red-600 text-white border-none px-4 py-1.5 rounded-md font-medium text-sm md:text-base hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {deletingIndex === idx ? (
                            <>
                              <Loader size="sm" color="white" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Delete Testimonials */}
          {sidebarOption === "delete" && (
            <div>
              <h2 className="text-red-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">Delete Testimonial</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {testimonials.length === 0 ? (
                  <div className="text-slate-400 text-lg mx-auto col-span-full">No testimonials yet.</div>
                ) : (
                  testimonials.map((t, idx) => (
                    <div key={t._id} className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center border border-red-100">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-100 flex items-center justify-center font-bold text-lg md:text-xl text-red-700 mb-3">
                        {getInitials(t.name)}
                      </div>
                      <div className="font-semibold text-base md:text-lg text-red-700 mb-1 text-center">{t.name}</div>
                      <div className="text-sm md:text-base text-slate-400 mb-3 text-center">{t.position}</div>
                      <div className="text-sm md:text-base text-slate-700 mb-4 text-center line-clamp-3">&ldquo;{t.text}&rdquo;</div>
                      <button
                        onClick={() => handleDelete(idx)}
                        disabled={deletingIndex === idx}
                        className="w-full bg-red-600 text-white border-none px-6 py-2 rounded-md font-medium text-sm md:text-base hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {deletingIndex === idx ? (
                          <>
                            <Loader size="sm" color="white" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminTestimonials;