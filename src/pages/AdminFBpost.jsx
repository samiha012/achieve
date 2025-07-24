// FBPostAdminPanel.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import FacebookPost from "../components/FacebookPost";

function FBpostAdminPanel() {
  const [fbUrl, setFbUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      alert("Error fetching Facebook posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fbUrl.trim()) {
      alert("Facebook URL cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      if (editMode && editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/facebook-embeds/${editId}`,
          { url: fbUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Post updated successfully.");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/facebook-embeds`,
          { url: fbUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Post added successfully.");
      }

      setFbUrl("");
      setEditMode(false);
      setEditId(null);
      fetchPosts();
    } catch (err) {
      console.error("Submission failed:", err);
      const msg = err?.response?.data?.message || "Failed to save post.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/facebook-embeds/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully.");
      fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
      const msg = err?.response?.data?.message || "Failed to delete post.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setFbUrl(post.url);
    setEditMode(true);
    setEditId(post._id);
  };

  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{editMode ? "Edit Facebook Post" : "Add Facebook Post"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Paste Facebook post URL"
            value={fbUrl}
            onChange={(e) => setFbUrl(e.target.value)}
            className="border px-4 py-2 w-full rounded"
          />
          <div className="flex space-x-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {editMode ? "Update" : "Save"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setFbUrl("");
                  setEditId(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Saved Posts</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <li
                key={post._id}
                className="border rounded-lg p-4 bg-white shadow-md flex flex-col justify-between h-[380px]"
              >
                <div className="w-full overflow-hidden rounded-md mb-4 h-[380px]">
                   <FacebookPost url={post.url} />
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default FBpostAdminPanel;
