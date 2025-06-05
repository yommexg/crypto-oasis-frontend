import React from "react";

type TermsOfServiceProps = {
  onAccept: () => void;
};

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 text-xs md:text-base flex items-center justify-center z-50">
      <div className="bg-[#0e0e13] text-white p-6 rounded-md w-full max-w-2xl max-h-[90vh] mx-4 overflow-y-auto shadow-lg border border-gray-700">
        <h2 className="text-xl md:text-4xl font-bold mb-4 text-center">
          Privacy Policy
        </h2>

        <div className="space-y-4 text-xs md:text-base leading-6 text-[#A6A6A6]">
          <p>
            <strong>Crypto Oasis</strong> is a multigaming platform for NFT
            communities to come together, compete, and have fun.
          </p>

          <h3 className="text-base md:text-2xl font-semibold mt-4 text-white">
            General Information
          </h3>

          <p>
            This document ("Privacy Policy") describes how Challengermode AB, a
            Swedish limited liability company with company registration no.
            556989-7498 having its registered address at Södermalmsallén 36, 118
            28 Stockholm, Sweden ("Challengermode", "we", "us", or "our"), can
            collect, use, and process Your personal data. Challengermode is the
            data controller regarding the processing of Your personal data as
            described in this Privacy Policy.
          </p>

          <p>
            This Privacy Policy applies when You use the Platform. Please notice
            that upon using the Platform, You may be directed to websites or
            services provided by third parties where Your personal data is
            processed by such third parties and governed by their respective
            privacy policies.
          </p>

          <p>
            All definitions in this Privacy Policy shall be interpreted in
            accordance with applicable data protection laws which refer to the
            General Data Protection Regulation (Regulation no. 2016/679) and the
            Directive on Privacy and Electronic Communications (Directive
            2002/58/EC), as well as the national implementations and related
            national legislation. Definitions specified in the Terms of Use
            shall also apply to this Privacy Policy.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onAccept}
            className="bg-[#30B943] text-white px-6 py-2 rounded hover:opacity-70 transition">
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
