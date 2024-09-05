import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "gallery/Logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { isMentor, isStudent, isAdmin } from "pages/authentication/util";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const adminDashboard = () => {
    navigate("/admin");
  };

  const aboutUsClick = () => {
    navigate("/about");
  };

  const mentorDashboard = () => {
    navigate("/mentor/dashboard");
  };

  const studentDashboard = () => {
    navigate("/student");
  };

  const loginClick = () => {
    navigate("/login");
  };

  const coursesClick = () => {
    navigate("/courses");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        // Only apply sticky behavior on mobile
        setIsSticky(window.scrollY > 0);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-sans">
      <header
        className={`flex px-4 py-2 justify-between items-center bg-white font-sans shadow-md max-sm:h-[78px] lg:h-28 ${
          isSticky ? "md:relative fixed top-0 left-0 right-0 z-50" : ""
        }`}
      >
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="relative w-5 h-5"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black top-2"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full h-0.5 bg-black top-4"
                />
              </motion.div>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-8 bg-white">
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  className="flex flex-col space-y-6 mt-24 p-4"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                >
                  {[
                    { name: "Home", route: "/" },
                    { name: "Dashboard", route: "/admin" },
                    { name: "Login", route: "/login" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.name}
                      className="text-xl font-sans font-regular cursor-pointer"
                      onClick={() => {
                        navigate(item.route);
                        setIsOpen(false); // Close the mobile menu after navigation
                      }}
                      variants={menuItemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 flex justify-center md:justify-start items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-auto w-auto max-h-[190px] md:max-h-[110px] lg:max-h-[235px] object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block text-black mr-6">
          <ul className="flex space-x-8 text-black text-sm">
            {!(isAdmin() || isMentor() || isStudent()) && (
              <li
                className="cursor-pointer font-sans text-lg"
                onClick={loginClick}
              >
                Login
              </li>
            )}
          </ul>
        </nav>

        {/* Conditional Button */}
        {isAdmin() ? (
          <Button
            className="bg-[#004EFF] text-white hover:bg-blue-900 hover:text-white px-3 md:px-4 py-1 md:py-2 font-bold font-sans text-xs md:text-sm"
            onClick={adminDashboard}
          >
            Admin Dashboard
          </Button>
        ) : isMentor() ? (
          <Button
            className="bg-[#004EFF] text-white hover:bg-blue-900 hover:text-white px-3 md:px-4 py-1 md:py-2 font-bold font-sans text-xs md:text-sm"
            onClick={mentorDashboard}
          >
            Mentor Dashboard
          </Button>
        ) : isStudent() ? (
          <Button
            className="bg-[#004EFF] text-white hover:bg-blue-900 hover:text-white px-3 md:px-4 py-1 md:py-2 font-bold font-sans text-xs md:text-sm"
            onClick={studentDashboard}
          >
            Student Dashboard
          </Button>
        ) : (
          <Button
            className="bg-[#004EFF] text-white hover:bg-blue-900 hover:text-white px-3 md:px-4 py-1 md:py-2 font-bold font-sans text-xs md:text-sm"
            onClick={() => navigate("/contact")}
          >
            Get Info
          </Button>
        )}
      </header>
    </div>
  );
}

export default Navbar;
