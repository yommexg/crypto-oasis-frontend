import React from "react";
import ologo from "../../assets/o-logo.png";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="animate-spin">
        <div className="w-8 md:w-14">
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
