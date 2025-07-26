import { useState } from "react";
import axios from "axios";

function FacebookPostForm({ type }) {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL;

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "text") {
        const response = await axios.post(`${apiBaseUrl}/post-text`, { caption });
        alert("Text posted! ID: ");
      } else {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("media", media);

        const endpoint = type === "photo" ? "/post-photo" : "/post-video";
        const response = await axios.post(`${apiBaseUrl}${endpoint}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert(`${type} posted!`);
      }

      setCaption("");
      setMedia(null);
    } catch (err) {
      console.error(err);
      alert("Failed to post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePost} className="space-y-4">
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
          accept={type === "video" ? "video/*" : "image/*"}
          onChange={(e) => setMedia(e.target.files[0])}
          required
        />
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Posting..." : `Post ${type}`}
      </button>
    </form>
  );
}

export default FacebookPostForm;
