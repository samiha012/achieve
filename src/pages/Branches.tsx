
import React from 'react';
import { ArrowLeft, MapPin, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface Branch {
  text: string;
  address: string;
  coach: string;
  tagline: string;
  instruction: string;
  photo: string;
  id: string;
  email?: string;
  phone?: string;
}

interface BranchResponse {
  status: number;
  branchList: Branch[];
}

const fetchBranches = async (): Promise<BranchResponse> => {
  const response = await fetch('https://crm.apars.shop/branch/find/available-branches?productId=406');
  if (!response.ok) {
    throw new Error('Failed to fetch branches');
  }
  return response.json();
};

const Branches = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading branches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading branches. Please try again later.</p>
        </div>
      </div>
    );
  }

  const branchList = data?.branchList || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="outline" className="border-white hover:bg-white hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-700">Our Branches</h1>
            <p className="text-xl text-gray-600">
              Find the nearest Etreeks center to kickstart your academic journey
            </p>
          </div>
        </div>
      </div>

      {/* Branches Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branchList.map((branch) => (
              <Card key={branch.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="rounded-xl p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left side - Image */}
                    <div className="relative">
                      <img
                        src={branch.photo}
                        alt={branch.text}
                        className="h-50 p-10 w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                    </div>
                    
                    {/* Right side - Details */}
                    <div className="p-4 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{branch.text}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{branch.address}</p>
                        </div>
                        
                        {/* {branch.coach && (
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500">Coach</p>
                              <p className="font-medium text-gray-900">{branch.coach}</p>
                            </div>
                          </div>
                        )} */}

                        {branch.email && (
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-orange-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium text-gray-900">{branch.email}</p>
                            </div>
                          </div>
                        )}

                        {branch.phone && (
                          <div className="flex items-center space-x-3">
                            <Phone className="h-5 w-5 text-purple-600 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium text-gray-900">{branch.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Contact Branch
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branches;