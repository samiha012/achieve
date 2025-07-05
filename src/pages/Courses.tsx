import React, { useState, useMemo, useEffect } from 'react';
import { ArrowBigLeft, Book, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simple GET request - no need for UID in frontend
    fetch(`${import.meta.env.VITE_API_URL}/api/proxy/courses`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        // Data is already filtered for offline courses on the backend
        setCoursesData(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = coursesData.map((c) => c.Category).filter(Boolean);
    return ['All', ...Array.from(new Set(cats))];
  }, [coursesData]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch = course.productFullName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || course.Category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, coursesData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <BookOpenCheck className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Courses</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find the course that's <span className="text-blue-600 font-semibold">right for you</span> so that you feel confiident in sitting for admission tests or academic exams.
            </p>
          </div>
        </div>
      </div>
      {/* Main layout */}
      <div className="flex min-h-[70vh]">
        {/* Sidebar */}
        <aside
          className="w-80 bg-white/90 p-8 border-r border-gray-100 flex flex-col gap-8 shadow-md"
        >
          <div>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base shadow-sm"
            />
          </div>
          <div>
            <label className="font-semibold mb-2 block text-gray-700 text-lg">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-base shadow-sm bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8 flex flex-col gap-6">
          {loading ? (
            <div className="text-gray-500 text-center mt-32 text-xl animate-pulse">Loading courses...</div>
          ) : error ? (
            <div className="text-red-500 text-center mt-32 text-xl">Error: {error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-gray-400 text-center mt-32 text-xl">
              No courses found.
            </div>
          ) : (
            <div className="flex flex-col gap-8 items-center w-full">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row bg-white/90 border border-blue-100 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 overflow-hidden"
                  style={{ minHeight: 150 }}
                >
                  {/* Left: Image */}
                  <div className="relative w-full sm:w-80 aspect-video sm:aspect-auto sm:h-full flex-shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none bg-gray-100">
                    <img
                      src={course.ProductImage}
                      alt={course.productFullName}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 px-6 py-4 min-w-0">
                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-blue-700 transition-colors">
                      {course.productFullName}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                        {course.Category}
                      </span>
                    </div>

                    <div className="text-blue-600 font-bold text-lg tracking-tight mb-3">
                      {course.currency_amount} BDT
                    </div>

                    <a
                      href={course.Permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-medium text-sm shadow-sm transition-all"
                    >
                      View Course
                    </a>
                  </div>
                </div>


              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Courses; 