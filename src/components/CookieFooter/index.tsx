interface CookieFooterProps {
  handleAcceptCookies: (value: boolean) => void;
}

const CookieFooter: React.FC<CookieFooterProps> = ({ handleAcceptCookies }) => {
  return (
    <div className="flex flex-col items-center bg-[#1E1E27] py-4 px-6 fixed bottom-0 left-0 right-0 z-40">
      <div className="md:w-[700px] lg:w-[850px] flex flex-col md:flex-row items-center justify-between">
        <div className="md:max-w-[500px] lg:max-w-[600px]">
          <h3 className="text-[#CCE919] text-xs text-center md:text-left md:text-base font-semibold uppercase mb-2">
            We use cookies
          </h3>
          <p className="text-[7px] text-center md:text-left md:text-[11px] text-white">
            Crypto Oasis uses cookies to provide necessary website
            functionality, improve your experience and analyze our traffic. By
            using our website, you agree to our Privacy Policy and our Cookies
            Policy.
          </p>
        </div>
        <button
          onClick={() => handleAcceptCookies(true)}
          className="mt-2 px-10 py-1 md:py-2 md:px-10 bg-[#30B943] rounded-full shadow-[#30B943] hover:shadow hover:opacity-70
        transition-shadow duration-300 font-semibold text-white text-[9px] md:text-xs cursor-pointer">
          Allow
        </button>
      </div>
    </div>
  );
};

export default CookieFooter;
