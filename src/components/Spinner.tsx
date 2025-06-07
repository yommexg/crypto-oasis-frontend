import React from "react";
import ologo from "../assets/o-logo.png";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-pulse">
        <div className="w-10 md:w-20">
          <img
            src={ologo}
            className="w-full h-full"
            alt="Loading Spinner"
          />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
