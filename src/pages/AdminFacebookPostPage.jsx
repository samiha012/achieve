import { useState } from "react";
import FacebookPostForm from "./AdminFacebookPostForm";

function FacebookPostPage() {
  const [postType, setPostType] = useState("text");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">📣 Post to Facebook Page</h1>

        {/* Selector */}
        <div className="flex gap-4 mb-6">
          {["text", "photo", "video"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded ${
                postType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setPostType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        {postType === "text" ? (
          <FacebookPostForm type="text" />
        ) : (
          <FacebookPostForm type={postType} />
        )}
      </div>
    </div>
  );
}

export default FacebookPostPage;
