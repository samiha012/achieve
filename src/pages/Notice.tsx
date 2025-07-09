import React, { useEffect, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  content: string;
  imgurl: string;
  date: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notices`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notices");
        return res.json();
      })
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3">
        Notices
      </h1>
      {loading ? (
        <div className="text-center text-gray-500 text-xl mt-20">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl mt-20">{error}</div>
      ) : (
        <div className="mx-4 md:mx-24 space-y-8">
          {notices.map((notice) => (
            <div key={notice._id} className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-xl shadow p-6 border border-gray-100">
              <img
                src={notice.imgurl}
                alt={notice.title}
                className="w-48 h-40 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{notice.title}</h2>
                  <p className="text-gray-700 mb-3">{notice.content}</p>
                </div>
                <div className="text-sm text-gray-500 mt-2">{new Date(notice.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notice; 