import { Link } from "react-router-dom";
import { FaInstagram } from 'react-icons/fa';
import { FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* About Section */}
          <div className="md:w-2/5">
            <h3 className="font-bold text-lg text-gray-800 border-b border-gray-200 pb-2 mb-4">
             Achieve
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-gray-500">
                Your partner in academic excellence. Find the right course and support to achieve your educational goals.
              </p>
            </div>
          </div>

          {/* Right side wrapper for links and social */}
          <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-md text-gray-800 pb-2 mb-2">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                <li><Link to="/features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                <li><Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link></li>
                <li><Link to="/branches" className="hover:text-blue-600 transition-colors">Branches</Link></li>
              </ul>
            </div>

            {/* Other Platforms */}
            <div>
              <h3 className="font-bold text-md text-gray-800 pb-2 mb-2">
                Other platforms
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="https://asgshop.com.bd" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">ASG Shop</a></li>
                <li><a href="https://aparsclassroom.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Apars Classroom</a></li>
                <li><a href="https://aparsclassroom.com/shop" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Online Academic Courses</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-md text-gray-800 pb-2 mb-2">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/ACSAchieveCentre" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <FiFacebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/aparsclassroom" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="https://youtube.com/aparsclassroom" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors">
                  <FiYoutube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center md:flex md:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Achieve. All rights reserved.
          </p>
          <div className="flex gap-4 justify-center md:justify-start mt-2 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


