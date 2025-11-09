"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaYoutube, FaUser } from "react-icons/fa";

export default function Header() {
  const router = useRouter();

  function GoToAccount() {
    router.push("/account");
  }

  function GoToShop() {
    router.push("/products");
  }

  function GoToAbout() {
    router.push("/about");
  }

  function GoToContact() {
    router.push("/contact");
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-0">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/NEOSOUR-white-2-cropped.png"
            alt="Neosour Logo"
            width={150}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium text-white">
          <a href="/" className="hover:text-lime-600 transition-colors">
            Home
          </a>
          <a onClick={GoToShop} className="hover:text-lime-600  cursor-pointer">
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

        {/* Social + Actions */}
        <div className="flex items-center gap-5 text-white text-lg">
          <FaFacebookF className="hover:text-lime-600 transition cursor-pointer" />
          <FaInstagram className="hover:text-lime-600 transition cursor-pointer" />

          {/* User Icon */}
          <div className="relative">
            <FaUser
              onClick={GoToAccount}
              className="hover:text-lime-600 transition cursor-pointer"
            />
            <span className="absolute -top-2 -right-2 bg-lime-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
