import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import FacebookPost from "../components/FacebookPost";
import Loader from "../components/Loader";
import LoaderOverlay from '../components/LoaderOverlay';
import ConfirmModal from '../components/ConfirmModal';

function FBpostAdminPanel() {
  const [fbUrl, setFbUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch {
      setError("Failed to load Facebook posts");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fbUrl.trim()) {
      showToast("Facebook URL cannot be empty.", "error");
      return;
    }

    setSubmitting(true);

    try {
      if (editingIndex !== null) {
        // Edit
        const id = posts[editingIndex]._id;
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-embeds/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ url: fbUrl }),
        });
        if (!res.ok) throw new Error("Failed to update post");
        const updated = await res.json();
        setPosts((prev) => prev.map((p, i) => (i === editingIndex ? updated : p)));
        setEditingIndex(null);
        showToast("Post updated successfully!");
      } else {
        // Add
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ url: fbUrl }),
        });
        if (!res.ok) throw new Error("Failed to add post");
        const added = await res.json();
        setPosts((prev) => [added, ...prev]);
        showToast("Post added successfully!");
      }

      setFbUrl("");
    } catch (err) {
      const msg = err?.message || `Failed to ${editingIndex !== null ? "update" : "add"} post.`;
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
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
      const id = posts[idx]._id;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facebook-embeds/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((_, i) => i !== idx));
      showToast("Post deleted successfully!");
    } catch (err) {
      const msg = err?.message || "Failed to delete post.";
      showToast(msg, "error");
    } finally {
      setDeletingIndex(null);
    }

    if (editingIndex === idx) {
      setFbUrl("");
      setEditingIndex(null);
    }
  };

  const handleEdit = (idx) => {
    setFbUrl(posts[idx].url);
    setEditingIndex(idx);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFbUrl("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Loading overlay for initial page load */}
      {loading && <LoaderOverlay message="Loading Facebook posts..." />}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this Facebook post?"
      />

      {toast.message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg transition-all duration-300 text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {error && <div className="text-center text-red-600 mb-4 p-4 bg-red-50 rounded">{error}</div>}

        <h1 className="text-2xl font-bold mb-4">
          {editingIndex !== null ? "Edit Facebook Post" : "Add Facebook Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Paste Facebook post URL"
            value={fbUrl}
            onChange={(e) => setFbUrl(e.target.value)}
            disabled={submitting}
            className="border px-4 py-2 w-full rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader size="sm" color="white" />
                  {editingIndex !== null ? "Updating..." : "Adding..."}
                </>
              ) : (
                editingIndex !== null ? "Update" : "Save"
              )}
            </button>
            {editingIndex !== null && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Saved Posts</h2>
          {posts.length === 0 && !loading ? (
            <div className="text-slate-400 text-lg text-center py-8">
              <p>No Facebook posts yet.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <li
                  key={post._id}
                  className="border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between transition-shadow hover:shadow-lg"
                >
                  <div className="w-full overflow-hidden rounded-md mb-4 flex-1">
                    <FacebookPost url={post.url} />
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleEdit(index)}
                      disabled={deletingIndex === index}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(index)}
                      disabled={deletingIndex === index}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {deletingIndex === index ? (
                        <>
                          <Loader size="sm" color="white" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default FBpostAdminPanel;