import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoaderOverlay from '../components/LoaderOverlay';
import Loader from '../components/Loader';

const API_URL = `${import.meta.env.VITE_API_URL}/api/product/achieve-courses?uid=${import.meta.env.VITE_UID}`;
const BACKEND_URL = `${import.meta.env.VITE_API_URL}/api/courses`;

const FeaturedCoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [togglingCourseId, setTogglingCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const [courseRes, featuredRes] = await Promise.all([
          axios.get(API_URL),
          axios.get(`${BACKEND_URL}/featured`)
        ]);
        setCourses(courseRes.data.courses);
        setFeaturedList(featuredRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false); // Add this
      }
    };

    fetchCourses();
  }, []);

  const handleToggle = async (course) => {
    try {
      setTogglingCourseId(course.productId);
      await axios.post(`${BACKEND_URL}/toggle-feature`, { course }, {
        withCredentials: true,
      });
      setFeaturedList(prev => {
        const exists = prev.some(c => c.productId === course.productId);
        if (exists) {
          return prev.filter(c => c.productId !== course.productId);
        } else {
          return [...prev, course];
        }
      });
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
    finally {
      setTogglingCourseId(null); // Clear after toggle
    }
  };

  return (
    <div className="w-full rounded-3xl p-8 md:p-12 relative overflow-hidden">

      {loading && <LoaderOverlay message="Loading courses..." />}

      {/* Header */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-blue-800 font-bold text-3xl md:text-4xl">Select Courses</h2>
        </div>
        <p className="text-slate-600 text-md">Select your favorite courses to feature on the Achieve website</p>
      </div>

      {/* Courses */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {courses.map(course => {
          const isFeatured = featuredList.some(c => c.productId === course.productId);
          return (
            <div
              key={course.productId}
              className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 transform hover:-translate-y-2 ${isFeatured
                ? 'border-blue-400 bg-gradient-to-br from-blue-100 to-white shadow-blue-200/50'
                : 'border-slate-200 hover:border-blue-300'
                }`}
            >
              {/* Loader Overlay */}
              {togglingCourseId === course.productId && (
                <div className="absolute inset-0 z-30 bg-white/70 flex rounded-2xl items-center justify-center backdrop-blur-sm">
                  <Loader></Loader>
                </div>
              )}

              {/* Featured Badge */}
              {isFeatured && (
                <div className="absolute top-4 right-4 z-20 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
              )}
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={course.ProductImage}
                  alt={course.productName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Course+Image'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {course.productName}
                  </h3>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={() => handleToggle(course)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isFeatured
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-300 hover:border-blue-400'
                      }`}>
                      {isFeatured && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </label>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-sky-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {course.Category}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-800">৳ {course.currency_amount}</span>
                </div>
                <div className="mt-2">
                  <a
                    href={course.Permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-blue-400 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    <span>View Course</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCoursesAdmin;

