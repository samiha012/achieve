import { useEffect, useState } from "react";
import axios from "axios";
import { loadFbSdk } from "../lib/fb-sdk-loader";
import { Scroll } from "lucide-react";

interface FacebookPost {
  _id: string;
  url: string;
  date: string;
}

function FacebookPosts() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);

  useEffect(() => {
    loadFbSdk();

    axios.get<FacebookPost[]>(`${import.meta.env.VITE_API_URL}/api/facebook-embeds`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [posts]);

  return (
    <>
       {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <Scroll className="h-6 w-6" /> 
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Latest News</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news and updates from <span className="text-blue-600 font-semibold">Achieve</span>. Follow us on Facebook for more insights and stories.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-xl shadow-md p-4 bg-white w-full min-w-0"
          >
            <div className="w-full overflow-hidden h-[350px]">
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
    </>
  );
}

export default FacebookPosts;


