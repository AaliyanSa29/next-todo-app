"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const router = useRouter();
  function GoToHome() {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }
  function GoToAbout() {
    if (window.location.pathname === "/about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/about");
    }
  }
  function GoToContact() {
    if (window.location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/contact");
    }
  }

  function GoToShop() {
    if (window.location.pathname === "/products") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/products");
    }
  }
  return (
    <footer className="bg-gray-800 text-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col items-center justify-center space-y-6">
        {/* Logo + Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Logo */}

          {/* Navigation Links */}
          <nav className="flex items-center gap-8 text-white text-sm font-medium">
            <a
              onClick={GoToHome}
              className="hover:text-lime-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              onClick={GoToShop}
              className="hover:text-lime-600 transition-colors cursor-pointer"
            >
              Shop
            </a>
            <a
              onClick={GoToAbout}
              className="hover:text-lime-600 transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              onClick={GoToContact}
              className="hover:text-lime-600 transition-colors cursor-pointer"
            >
              Contact
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-white text-lg mt-4 md:mt-0">
            <FaFacebookF className="hover:text-lime-600 transition cursor-pointer" />
            <FaInstagram className="hover:text-lime-600 transition cursor-pointer" />
            <FaWhatsapp className="hover:text-lime-600 transition cursor-pointer" />
          </div>
        </div>
        <hr className="w-full border-gray-700 my-4" />

        {/* Divider */}

        {/* Copyright */}
        <p className="text-sm text-whtie text-center mt-5">
          Copyright © 2025{" "}
          <span className="font-medium text-white">Neosour</span>. All Rights
          Reserved.
        </p>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-lime-600 hover:bg-lime-700 text-white p-3 rounded-md shadow-md transition"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
