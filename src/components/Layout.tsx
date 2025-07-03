import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">{/* Padding for fixed navbar */}
        {children}
      </div>
    </div>
  );
};

export default Layout; 