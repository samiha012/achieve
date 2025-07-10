import { PinIcon } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM12 12l8-8m0 0l-8 8m8-8v8m0-8H4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Notices & Announcements
          </h1>
          <p className="text-lg text-gray-600">Stay updated with the latest news and important information</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-xl text-gray-600">Loading notices...</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 text-red-500 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-xl text-red-600 text-center">{error}</div>
          </div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
                <div className="relative p-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={notice.imgurl}
                          alt={notice.title}
                          className="w-28 h-20 object-contain rounded-xl border-2 border-gray-100 shadow-md group-hover:border-blue-200 transition-colors duration-300"
                        />
                        <div className="absolute -top-2 -right-2 p-1 bg-blue-500 rounded-full shadow-sm">
                          <PinIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-h-20">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                            {notice.title}
                          </h2>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            NEW
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {notice.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(notice.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice; 