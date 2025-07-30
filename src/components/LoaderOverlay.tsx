import React from 'react';
import Loader from './Loader';

const LoaderOverlay = ({message = "Loading ..."}) => {
  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader size="lg" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoaderOverlay;