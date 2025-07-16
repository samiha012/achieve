import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Megaphone } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center h-10">
             <img src="https://i.postimg.cc/FKF7XF9W/441544705-122103148808330502-3624163372952513294-n-1.jpg" alt="" className="h-full max-h-full w-auto object-contain" />     
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
            <Link to="/branches" className="text-gray-700 hover:text-blue-600 transition-colors">Branches</Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">Visit Courses</Link>
            {/* <Link to="/facebook-posts" className="text-gray-700 hover:text-blue-600 transition-colors">Latest News</Link> */}
            <Link to="/notice" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"><Megaphone className="h-6 w-6 text-blue-600" /> <span className="font-semibold">Notice</span></Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Features</Link>
              <Link to="/branches" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Branches</Link>
              {/* <Link to="/facebook-posts" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Latest News</Link> */}
              <Link to="/notice" className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"><Megaphone className="h-6 w-6 text-blue-600" /> <span className="font-semibold">Notice</span></Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link to="/courses" target='_blank'> Courses</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 