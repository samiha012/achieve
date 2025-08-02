import { BellRing, PinIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  content: string;
  imgurl: string;
  date: string;
  branch: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("All");

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

  const branches = useMemo(() => {
    const branchSet = new Set(
      notices
        .map(notice => notice.branch)
        .filter(branch => branch !== "All")
    );
    return ["All", ...Array.from(branchSet)];
  }, [notices]);

  // Filter notices based on selected branch
  const filteredNotices = useMemo(() => {
    if (selectedBranch === "All") return notices;
    return notices.filter(notice => notice.branch === selectedBranch);
  }, [notices, selectedBranch]);

  return (
    <div className="">
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <BellRing className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Notice Board</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find related <span className="text-blue-600 font-semibold">information</span> on specific branch and courses straight from our management team
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <div className="relative inline-block">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-white shadow-sm 
          text-gray-700 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch === "All" ? "All Branches" : branch}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
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
        <div className="space-y-6 max-w-6xl mx-auto">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent"></div>
              <div className="relative p-4">
                <div className="flex flex-col md:flex-row gap-6">
                  {
                    notice.imgurl && <div className="flex-shrink-0">
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
                  }

                  <div className="flex-1 flex flex-col justify-between min-h-20">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                          {notice.title}
                        </h2>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {notice.branch}
                          </span>
                        </div>
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
  );
};

export default Notice; 