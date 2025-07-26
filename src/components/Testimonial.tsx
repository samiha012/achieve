import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseURL}/api/testimonials/`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  
  const skeletonArray = Array(3).fill(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600">Don't just take our word for it</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(loading ? skeletonArray : testimonials).map((testimonial, index) => (
            <div
              key={testimonial?._id || index}
              className="p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="flex text-yellow-400 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 italic">
                  {loading ? <Skeleton width={250} count={3} /> : `"${testimonial.text}"`}
                </p>

                <div>
                  <div className="font-semibold text-gray-900">
                    {loading ? <Skeleton width={120} /> : testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {loading ? <Skeleton width={100} /> : testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
