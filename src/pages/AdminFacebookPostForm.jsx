import { useState, useRef } from "react";
import axios from "axios";
import Loader from "../components/Loader";


function FacebookPostForm({ type }) {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const fileInputRef = useRef(null);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "text") {
        const response = await axios.post(`${apiBaseUrl}/api/posts/post-text`, { caption }, {
          withCredentials: true,
        });
        showToast('Text posted to Facebook Page!');
      } else {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("media", media);

        const endpoint = type === "photo" ? "/api/posts/post-photo" : "/api/posts/post-video";
        const response = await axios.post(
          `${apiBaseUrl}${endpoint}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        showToast(`${type} posted on Facebook page!`);
      }

      setCaption("");
      setMedia(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      showToast("Failed to post.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePost} className="space-y-4">
      {toast.message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg transition-all duration-300 text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}
      <textarea
        placeholder="Caption..."
        className="w-full border p-2 rounded"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />

      {type !== "text" && (
        <input
          type="file"
          ref={fileInputRef}
          accept={type === "video" ? "video/*" : "image/*"}
          onChange={(e) => setMedia(e.target.files[0])}
          required
        />
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? <>  <Loader size="sm" color="white" /> Posting ... </> : `Post ${type}`}
      </button>
    </form>
  );
}

export default FacebookPostForm;
