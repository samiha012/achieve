// import { useEffect, useState } from "react";
// import axios from "axios";
// import { loadFbSdk } from "../lib/fb-sdk-loader";

// interface FacebookPost {
//   _id: string;
//   url: string;
//   date: string;
// }

// function FacebookPosts() {
//   const [posts, setPosts] = useState<FacebookPost[]>([]);

//   useEffect(() => {
//     loadFbSdk();

//     axios.get<FacebookPost[]>(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`).then((res) => {
//       setPosts(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     if (window.FB) {
//       window.FB.XFBML.parse();
//     }
//   }, [posts]);

//   return (
//     <>
//       <h1 className="text-2xl font-bold mb-4 text-center my-10">See Recent News</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//         {posts.map((post) => (
//           <div
//             key={post._id}
//             className="rounded-xl shadow-md p-4 bg-white w-full min-w-0"
//           >
//             <div className="w-full overflow-hidden">
//               <div
//                 className="fb-post w-full"
//                 data-href={post.url}
//                 data-width="auto"
//                 data-show-text="true"
//                 data-adapt-container-width="true"
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default FacebookPosts;

import { useEffect, useState } from "react";
import axios from "axios";
import { loadFbSdk } from "../lib/fb-sdk-loader";

interface FacebookPost {
  _id: string;
  url: string;
  date: string;
}

interface AdminProps {
  isAdmin?: boolean;
}

function FacebookPosts({ isAdmin = false }: AdminProps) {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FacebookPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ url: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFbSdk();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<FacebookPost[]>(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAdd = async () => {
    if (!formData.url.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/facebook-embeds`,
        { url: formData.url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setFormData({ url: '' });
      setIsAdding(false);
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedPost || !formData.url.trim()) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/facebook-embeds/${selectedPost._id}`,
        { url: formData.url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSelectedPost(null);
      setIsEditing(false);
      setFormData({ url: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error editing post:', error);
      alert('Failed to edit post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/facebook-embeds/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (post: FacebookPost) => {
    setSelectedPost(post);
    setFormData({ url: post.url });
    setIsEditing(true);
    setIsAdding(false);
  };

  const openAddDialog = () => {
    setFormData({ url: '' });
    setIsAdding(true);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const closeDialogs = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedPost(null);
    setFormData({ url: '' });
  };

  return (
    <div className="relative">
      {/* Admin Toggle Button */}
      {isAdmin && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          {showSidebar ? 'Hide Admin' : 'Show Admin'}
        </button>
      )}

      {/* Admin Sidebar */}
      {isAdmin && showSidebar && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-40 overflow-y-auto border-l border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <button
              onClick={openAddDialog}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors mb-6"
            >
              + Add New Post
            </button>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">All Posts</h3>
              {posts.map((post) => (
                <div key={post._id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="mb-3">
                    <div className="w-full h-32 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="fb-post scale-50 origin-top-left"
                        data-href={post.url}
                        data-width="300"
                        data-show-text="false"
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 break-all">{post.url}</p>
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditDialog(post)}
                      className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm hover:bg-red-700 transition-colors"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isAdding ? 'Add New Post' : 'Edit Post'}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook Post URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ url: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.facebook.com/..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={isAdding ? handleAdd : handleEdit}
                disabled={loading || !formData.url.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (isAdding ? 'Add Post' : 'Save Changes')}
              </button>
              <button
                onClick={closeDialogs}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${showSidebar ? 'mr-80' : ''}`}>
        <h1 className="text-2xl font-bold mb-4 text-center my-10">See Recent News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
          {posts.map((post) => (
            <div
              key={post._id}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 bg-white w-full min-w-0 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <div
                  className="fb-post w-full"
                  data-href={post.url}
                  data-width="auto"
                  data-show-text="true"
                  data-adapt-container-width="true"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacebookPosts;

