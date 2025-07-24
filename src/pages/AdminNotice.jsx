import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { HiPlus, HiViewList, HiTrash } from 'react-icons/hi';

const SIDEBAR_OPTIONS = [
  { key: "add", label: "Add Notice", icon: HiPlus },
  { key: "show", label: "Show All Notices", icon: HiViewList },
  { key: "delete", label: "Delete Notice", icon: HiTrash },
];

const NoticeAdmin = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', imgurl: '' });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOption, setSidebarOption] = useState('add');
  const fileInputRef = useRef(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notices`);
      setNotices(res.data);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const API_KEY = import.meta.env.VITE_IMG_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;
    const res = await axios.post(url, formData);
    return res.data.data.url;
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

      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/notices/edit/${editId}`, payload, {
           withCredentials: true,
        });
        setToast({ message: 'Notice updated!', type: 'success' });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/notices/add`, payload, {
            withCredentials: true,
        });
        setToast({ message: 'Notice added!', type: 'success' });
      }
      setForm({ title: '', content: '', imgurl: '' });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setEditId(null);
      fetchNotices();
      setTimeout(() => setToast({ message: '', type: 'success' }), 2000);
    } catch (err) {
      console.error('Submit failed', err);
      setToast({ message: err?.response?.data?.message || 'Failed to submit notice', type: 'error' });
      setTimeout(() => setToast({ message: '', type: 'success' }), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this notice?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notices/delete/${id}`, {
          withCredentials: true,
      });
      fetchNotices();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEdit = (notice) => {
    setForm({ title: notice.title, content: notice.content, imgurl: notice.imgurl });
    setEditId(notice._id);
    setSidebarOption('add');
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col md:flex-row justify-center items-start py-4 md:py-10">
      {toast.message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg animate-fade-in-out text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden relative">
        <aside className="w-full md:w-72 bg-slate-100 p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
          <div className="font-bold text-lg md:text-xl text-blue-700 mb-4 md:mb-8 tracking-wide w-full text-center md:text-left block">Notices</div>
          <div className="w-full flex flex-row flex-wrap md:flex-col md:flex-nowrap gap-2 md:gap-3 justify-center md:justify-start pb-2 md:pb-0">
            {SIDEBAR_OPTIONS.map(opt => (
              <div key={opt.key} className="flex-shrink-0 md:w-full">
                <button
                  className={`min-w-max flex items-center gap-2 md:gap-3 py-2 md:py-3 px-2 md:px-4 rounded-xl text-sm md:text-md font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400
          ${sidebarOption === opt.key ? 'bg-blue-800 text-white shadow-lg scale-[1.03]' : 'bg-white text-blue-700'}
          hover:bg-blue-700 hover:text-white hover:scale-[1.03] active:scale-100
        `}
                  onClick={() => setSidebarOption(opt.key)}
                >
                  <opt.icon className={`text-xl md:text-2xl ${sidebarOption === opt.key ? 'text-white' : 'text-blue-400'} transition-colors`} />
                  <span className="truncate">{opt.label}</span>
                </button>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-10 bg-slate-50 min-h-[400px]">
          {sidebarOption === 'add' && (
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-4 md:p-8">
              <h2 className="text-blue-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">{editId ? 'Edit Notice' : 'Add Notice'}</h2>
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                  disabled={submitting}
                />
                <textarea
                  placeholder="Content"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                  disabled={submitting}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border p-2 rounded"
                  disabled={submitting}
                  ref={fileInputRef}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300 w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Adding Notice...' : editId ? 'Update' : 'Add Notice'}
                </button>
              </form>
            </div>
          )}
          {sidebarOption === 'show' && (
            <div>
              <h2 className="text-blue-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">All Notices</h2>
              {notices.length === 0 ? (
                <div className="text-slate-400 text-lg mx-auto">No notices yet.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {notices.map((notice) => (
                    <div key={notice._id} className="border rounded-xl bg-white shadow p-3 md:p-4 flex flex-col items-center">
                      {notice.imgurl && (
                        <img src={notice.imgurl} alt={notice.title} className="w-full max-w-[140px] md:max-w-[180px] h-24 md:h-28 object-cover rounded mb-2 md:mb-3" />
                      )}
                      <h3 className="text-base md:text-lg font-semibold text-blue-700 mb-1 text-center w-full truncate">{notice.title}</h3>
                      <p className="text-slate-700 text-xs md:text-sm text-center w-full line-clamp-3 mb-2">{notice.content}</p>
                      <button onClick={() => handleEdit(notice)} className="bg-yellow-500 text-white px-3 py-1 rounded mt-auto w-full">Edit</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {sidebarOption === 'delete' && (
            <div>
              <h2 className="text-red-700 mb-4 md:mb-6 font-bold text-xl md:text-2xl">Delete Notice</h2>
              {notices.length === 0 ? (
                <div className="text-slate-400 text-lg mx-auto">No notices yet.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {notices.map((notice) => (
                    <div key={notice._id} className="border rounded-xl bg-white shadow p-3 md:p-4 flex flex-col items-center">
                      {notice.imgurl && (
                        <img src={notice.imgurl} alt={notice.title} className="w-full max-w-[140px] md:max-w-[180px] h-24 md:h-28 object-cover rounded mb-2 md:mb-3" />
                      )}
                      <h3 className="text-base md:text-lg font-semibold text-red-700 mb-1 text-center w-full truncate">{notice.title}</h3>
                      <p className="text-slate-700 text-xs md:text-sm text-center w-full line-clamp-3 mb-2">{notice.content}</p>
                      <button onClick={() => handleDelete(notice._id)} className="bg-red-600 text-white px-3 py-1 rounded mt-auto w-full">Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NoticeAdmin;
