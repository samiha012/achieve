import React, { useEffect, useState, useRef } from 'react';
import { HiPlus, HiViewList, HiTrash } from 'react-icons/hi';
import Loader from "../components/Loader";
import LoaderOverlay from '../components/LoaderOverlay';
import ConfirmModal from '../components/ConfirmModal';

const SIDEBAR_OPTIONS = [
  { key: "add", label: "Add Notice", icon: HiPlus },
  { key: "show", label: "Show All Notices", icon: HiViewList },
  { key: "delete", label: "Delete Notice", icon: HiTrash },
];

const NoticeAdmin = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    imgurl: '',
    branch: 'All'
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [sidebarOption, setSidebarOption] = useState('add');
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_CRM_URL}/branch/all-branches`);
      const data = await res.json();
      setBranches(data.branchList);
    } catch (error) {
      setError('Failed to fetch branches');
    }
  };

  // Fetch all notices
  useEffect(() => {
    fetchNotices();
    fetchBranches();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notices`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch notices');
      const data = await res.json();
      setNotices(data);
    } catch {
      setError('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const API_KEY = import.meta.env.VITE_IMG_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imgurl = form.imgurl;
      if (imageFile) {
        imgurl = await uploadToImgbb(imageFile);
      }
      const payload = { ...form, imgurl };

      if (editingIndex !== null) {
        // Edit
        const id = notices[editingIndex]._id;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notices/edit/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update notice');
        const updated = await res.json();
        setNotices((prev) => prev.map((n, i) => (i === editingIndex ? updated : n)));
        setEditingIndex(null);
        showToast('Notice updated!');
      } else {
        // Add
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notices/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to add notice');
        const added = await res.json();
        setNotices((prev) => [added, ...prev]);
        showToast('Notice added!');
      }

      // Clear form
      setForm({ title: '', content: '', imgurl: '',  branch: 'All' });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      showToast(`Failed to ${editingIndex !== null ? 'update' : 'add'} notice`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (idx) => {
    setForm({
      title: notices[idx].title,
      content: notices[idx].content,
      imgurl: notices[idx].imgurl || '',
      branch: notices[idx].branch || 'All'
    });
    setEditingIndex(idx);
    setSidebarOption('add');
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
      const id = notices[idx]._id;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notices/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete notice');
      setNotices((prev) => prev.filter((_, i) => i !== idx));
      showToast('Notice deleted!');
    } catch {
      showToast('Failed to delete notice', 'error');
    } finally {
      setDeletingIndex(null);
    }

    if (editingIndex === idx) {
      setForm({ title: '', content: '', imgurl: '' });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setEditingIndex(null);
    }
  };

  return (
    <div className="w-full flex justify-center items-start py-4 md:py-10">
      {/* Loading overlay for initial page load */}
      {loading && <LoaderOverlay message="Loading notices..." />}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this Notice?"
      />

      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-none md:rounded-2xl overflow-hidden relative mx-2 md:mx-0">
        {toast.message && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg transition-all duration-300 text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-500'}`}>
            {toast.message}
          </div>
        )}

        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-slate-100 p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-start">
          <div className="font-bold text-xl text-blue-700 mb-4 md:mb-8 tracking-wide">Notices</div>

          {/* Mobile: Horizontal scrolling buttons */}
          <div className="w-full flex flex-row flex-wrap lg:flex-col lg:flex-nowrap gap-2 md:gap-3 justify-center lg:justify-start pb-2 lg:pb-0">
            {SIDEBAR_OPTIONS.map(opt => (
              <div key={opt.key} className="flex-shrink-0 lg:w-full">
                <button
                  className={`min-w-max flex items-center gap-2 lg:gap-3 py-2 lg:py-3 px-3 lg:px-4 rounded-xl text-sm lg:text-md font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400
                ${sidebarOption === opt.key ? 'bg-blue-800 text-white shadow-lg scale-[1.03]' : 'bg-white text-blue-700'}
                hover:bg-blue-700 hover:text-white hover:scale-[1.03] active:scale-100
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
          {sidebarOption === 'add' && (
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-4 md:p-8">
              <h2 className="text-blue-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">
                {editingIndex !== null ? 'Edit Notice' : 'Add Notice'}
              </h2>
              <div onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 md:gap-5">
                  <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <select
                    name="branch"
                    value={form.branch}
                    onChange={handleChange}
                    disabled={submitting}
                    className="p-3 rounded-md border border-slate-300 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="All">All Branches</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.text}>
                        {branch.text}
                      </option>
                    ))}
                  </select>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    disabled={submitting}
                    ref={fileInputRef}
                    className="p-3 rounded-md border border-slate-300 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader size="sm" color="white" />
                          {editingIndex !== null ? 'Updating...' : 'Adding...'}
                        </>
                      ) : (
                        editingIndex !== null ? 'Update Notice' : 'Add Notice'
                      )}
                    </button>
                    {editingIndex !== null && (
                      <button
                        onClick={() => {
                          setForm({ title: '', content: '', imgurl: '' });
                          setImageFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                          setEditingIndex(null);
                        }}
                        disabled={submitting}
                        className="flex-1 bg-slate-200 text-blue-700 border-none py-2 rounded-md font-semibold hover:bg-slate-300 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show Notices */}
          {sidebarOption === 'show' && (
            <div>
              <h2 className="text-blue-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">All Notices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {notices.length === 0 ? (
                  <div className="text-slate-400 text-lg mx-auto col-span-full flex flex-col items-center gap-4">
                    <p>No notices yet.</p>
                  </div>
                ) : (
                  notices.map((notice, idx) => (
                    <div key={notice._id} className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center border border-blue-100 transition-shadow hover:shadow-md">
                      {notice.imgurl && (
                        <img
                          src={notice.imgurl}
                          alt={notice.title}
                          className="w-full max-w-[140px] md:max-w-[180px] h-24 md:h-28 object-cover rounded mb-3"
                        />
                      )}
                      <h3 className="font-semibold text-base md:text-lg text-blue-700 mb-1 text-center w-full truncate">{notice.title}</h3>
                      <p className="text-sm md:text-base text-slate-700 mb-4 text-center line-clamp-3">{notice.content}</p>
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <button
                          onClick={() => handleEdit(idx)}
                          disabled={deletingIndex === idx}
                          className="flex-1 bg-yellow-100 text-yellow-700 border-none px-4 py-1.5 rounded-md font-medium text-sm md:text-base hover:bg-yellow-200 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                            'Delete'
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Delete Notices */}
          {sidebarOption === 'delete' && (
            <div>
              <h2 className="text-red-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">Delete Notice</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {notices.length === 0 ? (
                  <div className="text-slate-400 text-lg mx-auto col-span-full">No notices yet.</div>
                ) : (
                  notices.map((notice, idx) => (
                    <div key={notice._id} className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col items-center border border-red-100">
                      {notice.imgurl && (
                        <img
                          src={notice.imgurl}
                          alt={notice.title}
                          className="w-full max-w-[140px] md:max-w-[180px] h-24 md:h-28 object-cover rounded mb-3"
                        />
                      )}
                      <h3 className="font-semibold text-base md:text-lg text-red-700 mb-1 text-center w-full truncate">{notice.title}</h3>
                      <p className="text-sm md:text-base text-slate-700 mb-4 text-center line-clamp-3">{notice.content}</p>
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
                          'Delete'
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
};

export default NoticeAdmin;