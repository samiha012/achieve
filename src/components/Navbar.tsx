import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Megaphone, Shield, Users, Settings, BookOpen, Facebook, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isSuperAdmin } = useAuth();

  // Check if user is admin (user exists means they're authenticated admin)
  const isAdmin = isAuthenticated && user;

  // Regular user navigation links
  const regularLinks = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/branches", label: "Branches" },
    { to: "/courses", label: "Visit Courses" },
    { to: "/notice", label: "Notice", icon: Megaphone }
  ];

  // Admin navigation links based on your actual admin routes
  const adminLinks = [
    { to: "/admin/courses", label: "Courses", icon: BookOpen },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/admin/notice", label: "Notice", icon: Megaphone },
    { to: "/admin/fbpost", label: "FB Posts", icon: Facebook },
     ...(isSuperAdmin ? [{ to: "/admin", label: "Manage Admins", icon: Users }] : []),
    // { to: "/admin/fb", label: "Facebook", icon: Facebook }
  ];

  // Choose which links to display based on admin status
  const navigationLinks = isAdmin ? adminLinks : regularLinks;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center h-10">
            <img src="https://i.postimg.cc/FKF7XF9W/441544705-122103148808330502-3624163372952513294-n-1.jpg" alt="" className="h-full max-h-full w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 transition-colors ${isAdmin
                  ? 'text-gray-700 hover:text-purple-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {link.icon && (
                  <link.icon className={`h-4 w-4 ${isAdmin ? 'text-purple-600' : 'text-blue-600'}`} />
                )}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Admin indicator badge */}
            {isAdmin && (
              <>
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  {isSuperAdmin ? 'Super Admin' : 'Admin'}
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-800"
                >
                  Logout
                </Button>
              </>
            )}
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
              {/* Admin indicator for mobile */}
              {isAdmin && (
                <div className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium mx-2 mb-2">
                  <Shield className="h-4 w-4" />
                  {isSuperAdmin ? 'Super Admin' : 'Admin'}
                </div>
              )}

              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2 transition-colors ${isAdmin
                    ? 'text-gray-700 hover:text-red-600'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && (
                    <link.icon className={`h-4 w-4 ${isAdmin ? 'text-red-600' : 'text-blue-600'}`} />
                  )}
                  <span>
                    {link.label}
                  </span>
                </Link>
              ))}

              {/* Show courses button for regular users in mobile */}
              {!isAdmin && (
                <div className="px-3 py-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link to="/courses" target='_blank' onClick={() => setIsMobileMenuOpen(false)}>
                      Courses
                    </Link>
                  </Button>
                </div>
              )}
              {isAdmin && (
                <div className="px-3 py-2">
                  <Button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-800"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;