import React from "react";
import { Loader2 } from "lucide-react";

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full text-gray-700">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Spinner;
