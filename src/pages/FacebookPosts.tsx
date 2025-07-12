import { useEffect, useState } from "react";
import axios from "axios";
import { loadFbSdk } from "../lib/fb-sdk-loader";

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
      <h1 className="text-2xl font-bold mb-4 text-center my-10">See Recent News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-xl shadow-md p-4 bg-white w-full min-w-0"
          >
            <div className="w-full overflow-hidden">
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


