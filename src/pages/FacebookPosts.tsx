// // components/FacebookPosts.tsx
// import React, { useEffect, useState } from 'react';

// interface Post {
//   message?: string;
//   full_picture?: string;
//   permalink_url: string;
//   created_time: string;
// }

// export const FacebookPosts: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/recent-posts`)
//       .then((res) => res.json())
//       .then((data) => setPosts(data.data));
//   }, []);

//   return (
//     <div className="facebook-posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {posts.map((post, index) => (
//         <div
//           key={index}
//           className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-200"
//         >
//           {post.full_picture && (
//             <img
//               src={post.full_picture}
//               alt="Post"
//               className="w-full h-60 object-cover"
//             />
//           )}
//           <div className="p-4 flex flex-col gap-2">
//             {post.message && <p className="text-gray-800 text-sm line-clamp-4">{post.message}</p>}
//             <a
//               href={post.permalink_url}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-500 text-sm font-semibold hover:underline"
//             >
//               View on Facebook
//             </a>
//             <span className="text-xs text-gray-400">
//               {new Date(post.created_time).toLocaleString()}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };


// export default FacebookPosts;
