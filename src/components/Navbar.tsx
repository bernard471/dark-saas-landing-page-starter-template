'use client';

import logoImage from "../assets/images/Screenshot__198_-removebg-preview.png";
import Image from "next/image";
import MenuIcon from "../assets/icons/menu.svg";    
import CloseIcon from "../assets/icons/x.svg";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null); // Reference for the sidebar

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Effect to manage body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'unset'; // Restore scrolling
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-black">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          <div className="relative">
            <div className="absolute w-full top-2 bottom-0 bg-transparent blur-md"></div>
            <Image src={logoImage} alt="logo" className="h-12 w-[100px] relative"/>
          </div>
          <div 
            className="border border-white border-opacity-30 h-10 w-10 inline-flex items-center justify-center rounded-lg sm:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
          </div>
          <nav className={`hidden sm:flex items-center gap-6`}>
            <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition">
              Home
            </a>
            <Link 
                href="/#features" 
                scroll={true}
                className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition"
              >
                Features
              </Link>
            <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition">
              About
            </a>
            <Link href="/signup">
              <button className="bg-white text-black px-4 py-2 rounded-lg">Get Started</button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Sidebar Navigation for Mobile */}
      <div 
        ref={sidebarRef} 
        className={`fixed top-0 left-0 h-full w-64 bg-black transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:hidden z-50`}
      >
        <div className="flex items-center justify-center p-4">
          <Image src={logoImage} alt="logo" className="h-12 w-[100px]" />
        </div>
        <nav className="flex flex-col items-start p-4">
          <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] w-full px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition">
            Home
          </a>
          <Link 
              href="/#features" 
              className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] w-full px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition"
            >
              Features
            </Link>
          <a href="#" className="text-opacity-60 text-white hover:text-opacity-100 hover:bg-[linear-gradient(170deg,#051040_0%,#892655_100%)] w-full px-2 py-1 rounded-lg border-2 border-white border-opacity-30 transition">
            About
          </a>
          <Link href="/signup">
            <button className="bg-white text-black px-4 py-2 rounded-lg mt-4 w-full">Get Started</button>
          </Link>
        </nav>
      </div>
    </div>   
  );
};
