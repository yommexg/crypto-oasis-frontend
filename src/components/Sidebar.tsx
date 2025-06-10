import { GoHomeFill } from "react-icons/go";
import { GrAppsRounded } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

import icon from "../assets/icon.png";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const pages = [
  { name: "Dashboard", icon: <GoHomeFill />, path: "/" },
  { name: "Profile", icon: <MdPerson />, path: "/profile" },
  { name: "Games", icon: <GrAppsRounded />, path: "/host-games" },
  { name: "Settings", icon: <IoSettings />, path: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full px-4 pt-6 md:pt-24 pb-6 bg-[#1B1C23] w-4/5  md:w-20 relative">
      <div>
        <div className="w-24 md:hidden mb-10">
          <img
            src={icon}
            className="w-full h-full"
          />
        </div>

        <button
          className="absolute top-4 right-4 md:hidden text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Close Sidebar">
          <FiX size={24} />
        </button>

        <div className="flex flex-col gap-6">
          {pages.slice(0, 3).map((item, index) => (
            <NavLink
              key={item.name + index}
              to={item.path}
              className={({ isActive }) =>
                `relative text-xl cursor-pointer p-2 flex md:justify-center items-center
              ${isActive ? "text-white" : "text-[#C4C4C4]"}`
              }
              onClick={() => setIsOpen(false)}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-[-16px] top-0 bottom-0 w-[3px] bg-[#CCE919] rounded-r-lg" />
                  )}
                  <div className="flex items-center gap-4 group md:relative">
                    <div className="rounded-lg bg-[#464956] p-2">
                      {item.icon}
                    </div>
                    <span className="hidden md:block absolute left-full ml-2 w-max opacity-0 group-hover:opacity-100 transition bg-gray-800 text-xs px-2 py-1 rounded shadow-lg z-10">
                      {item.name}
                    </span>
                    <p className="text-sm md:hidden">{item.name}</p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <NavLink
        to={pages[3].path}
        className={({ isActive }) =>
          `relative text-xl cursor-pointer p-2 rounded-lg bg-[#464956] flex justify-center items-center group md:relative
          ${isActive ? "text-white" : "text-[#C4C4C4]"}`
        }
        onClick={() => setIsOpen(false)}>
        {({ isActive }) => (
          <>
            {isActive && (
              <div className="absolute left-[-16px] top-0 bottom-0 w-[3px] bg-[#CCE919] rounded-r-lg" />
            )}
            <div className="flex items-center gap-3">
              {pages[3].icon}
              <p className="text-sm md:hidden">{pages[3].name}</p>
              <span className="hidden md:block absolute left-full ml-2 w-max opacity-0 group-hover:opacity-100 transition bg-gray-800 text-xs px-2 py-1 rounded shadow-lg z-10">
                {pages[3].name}
              </span>
            </div>
          </>
        )}
      </NavLink>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed top-0 bottom-0 left-0 z-20">
        {sidebarContent}
      </nav>

      {/* Mobile overlay and animated sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 bottom-0 left-0 z-40 right-0 md:hidden">
              {sidebarContent}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
