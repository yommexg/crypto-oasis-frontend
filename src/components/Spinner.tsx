import React from "react";
import logo from "../assets/logo.png";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-spin">
        <div className="w-16 md:w-32">
          <img
            src={logo}
            className="w-full h-full"
            alt="Loading Spinner"
          />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
