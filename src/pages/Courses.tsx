import React, { useState, useMemo, useEffect } from 'react';
import { ArrowBigLeft, Book, BookOpenCheck, Search, Plus, Check } from 'lucide-react';
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

    fetch('/.netlify/functions/proxy/product/achieve-courses')
      //fetch(`${import.meta.env.VITE_CRM_URL}/product/achieve-courses?uid=${import.meta.env.VITE_UID}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then((data) => {
        const activeCourses = (data.courses || []).filter(course => course.status !== 'Disable');
        setCoursesData(activeCourses);
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
        {/* Sidebar (desktop only) */}
        <aside
          className="w-80 bg-white/90 pt-6 pb-8 px-8 border-r border-gray-100 flex-col gap-4 shadow-md hidden md:flex"
        >
          {/* Filter header */}
          <div className="mb-2">
            <span className="font-semibold text-gray-700 text-lg">Filter courses</span>
            <hr className="mt-2 mb-2 border-gray-200" />
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full border transition text-sm font-medium
                    ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}
                  `}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Plus className="h-4 w-4 mr-1" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8 flex flex-col gap-6">
          {/* Search bar inside main content */}
          <div className="mb-6">
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm px-2 py-1 w-full">
              <Search className="h-5 w-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-base"
              />
            </div>
          </div>
          {loading ? (
            <div className="text-gray-500 text-center mt-32 text-xl animate-pulse">Loading courses...</div>
          ) : error ? (
            <div className="text-red-500 text-center mt-32 text-xl">Error: {error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-gray-400 text-center mt-32 text-xl">
              No courses found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-col bg-white/90 border border-blue-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
                  style={{ minHeight: 150 }}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-video bg-gray-100">
                    <img
                      src={course.ProductImage}
                      alt={course.productFullName}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 px-6 py-4 min-w-0 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2 mb-2 transition-colors">
                      {course.productFullName}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full text-xs font-medium">
                        {course.Category}
                      </span>
                      <span className="bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full text-xs font-medium">
                        {course.SubCategory}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-green-500 font-bold text-lg tracking-tight">
                        {course.currency_amount} BDT
                      </span>
                      <a
                        href={course.Permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-medium text-sm shadow-sm transition-all"
                      >
                        View Course
                      </a>
                    </div>
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