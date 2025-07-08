import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, LocateFixed, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Branch {
  text: string;
  address: string;
  name: string;
  gmap: string;
  coach: string;
  tagline: string;
  instruction: string;
  photo: string;
  id: string;
  map?: string;
  email?: string;
  phone?: string;
}

const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const formData = new URLSearchParams();

      const start = (page - 1) * pageSize;

      formData.append('draw', '1');
      formData.append('start', start.toString());
      formData.append('length', pageSize.toString());

      const columnNames = [
        'name', 'photo', 'address', 'phone', 'email',
        'coach', 'tagline', 'instruction', 'gmap', 'updated', 'created', 'status'
      ];

      columnNames.forEach((col, index) => {
        formData.append(`columns[${index}][data]`, col);
        formData.append(`columns[${index}][name]`, '');
        formData.append(`columns[${index}][searchable]`, 'true');
        formData.append(`columns[${index}][orderable]`, 'true');
        formData.append(`columns[${index}][search][value]`, '');
        formData.append(`columns[${index}][search][regex]`, 'false');
      });

      formData.append('order[0][column]', '9');
      formData.append('order[0][dir]', 'desc');
      formData.append('search[value]', '');
      formData.append('search[regex]', 'false');

      const response = await fetch(
        `${import.meta.env.VITE_CRM_URL}/branch/all?uid=${import.meta.env.VITE_UID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();

      setBranches(data.data || []);
      setTotal(data.recordsTotal || 0);
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button
                variant="outline"
                className="border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Our Branches</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Find the nearest <span className="text-blue-600 font-semibold">Achieve</span> center to kickstart your academic or admission journey.
            </p>
          </div>
        </div>
      </div>

      {/* Error / Loading */}
      {loading && <div className="text-center py-10 text-lg text-gray-500">Loading...</div>}
      {error && <div className="text-center py-10 text-red-500">Error: {error}</div>}

      {/* Branches Grid */}
      {!loading && !error && (
        <>
          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {branches.map((branch) => (
                  <Card
                    key={branch.id}
                    className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden rounded-xl"
                  >
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-[160px_1fr] gap-0">
                        <div className="relative h-72 w-full md:h-auto rounded-xl overflow-hidden bg-white">
                          <div className="p-6 h-full w-full">
                            <img
                              src={branch.photo}
                              alt={branch.text}
                              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                              }}
                            />
                          </div>
                        </div>

                        <div className="p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{branch.name}</h3>

                            <p className="text-gray-700 mb-1">{branch.text}</p>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                                <p className="text-gray-700 leading-snug">{branch.address}</p>
                              </div>
                              {branch.gmap && (
                                <div className="flex items-start space-x-2">
                                  <LocateFixed className="h-4 w-4 text-green-600 mt-0.5" />
                                  <p className="text-gray-500">
                                    <Link to={branch.gmap}>Click to see map location</Link>
                                  </p>
                                </div>
                              )}
                              {branch.phone && (
                                <div className="flex items-start space-x-2">
                                  <Phone className="h-4 w-4 text-orange-600 mt-0.5" />
                                  <p className="text-gray-800 break-all">{branch.phone}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>

                  {[...Array(totalPages)].map((_, i) => (
                    // <Button
                    //   key={i + 1}
                    //   variant={page === i + 1 ? 'default' : 'outline'}
                    //   onClick={() => setPage(i + 1)}
                    // >
                    //   {i + 1}
                    // </Button>
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? 'outline' : 'ghost'}
                      className={page === i + 1 ? 'border-blue-600 text-blue-600' : 'text-gray-600'}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Branches;