"use client";
import { useRouter } from "next/navigation"; // 👈 import router properly
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaUser } from "react-icons/fa";
import { FaTools, FaRegClock, FaHeadset, FaLock } from "react-icons/fa";
// import PopularProducts from "./components/Homepage/PopularProducts";
// import Footer from "./components/Homepage/Footer";
import PopularProducts from "@/app/components/Homepage/PopularProducts";
import Footer from "@/app/components/Homepage/Footer";

export default function Homepage() {
  const router = useRouter(); // 👈 initialize router here

  function GoToItems() {
    router.push("/products"); // ✅ works now
  }

  function GoToAbout() {
    router.push("/about");
  }

  function facebook() {
    router.push("www.facebook.com");
  }

  function GoToAccount() {
    router.push("/account");
  }

  function instagram() {
    router.push("www.instagram.com");
  }

  return (
    <main className="min-h-screen font-sans text-gray-900 relative">
      {/* Transparent Header */}
      <header className="fixed top-0 left-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">
          {/* Logo - Top Left */}
          <div className="absolute -top-3 left-8">
            <Image
              src="/images/NEOSOUR-white-1.png"
              alt="Neosour Logo"
              width={130}
              height={40}
              priority
              className="object-contain"
            />
          </div>

          {/* Navigation - Top Right */}
          <nav className="absolute top-8 right-10 flex items-center gap-10 text-white text-sm font-light tracking-wide">
            <button
              onClick={GoToAbout}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <a
              onClick={GoToItems}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              Shop
            </a>
            <a
              onClick={() => router.push("/contact")}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              Contact
            </a>
            {/* Social + Actions */}
            <div className="flex items-center gap-4 text-white text-[15px]">
              <FaFacebookF
                onClick={facebook}
                className="hover:text-lime-400 transition cursor-pointer"
              />
              <FaInstagram
                onClick={instagram}
                className="hover:text-lime-400 transition cursor-pointer"
              />
              {/* <FaYoutube
                onClick={youtube}
                className="hover:text-lime-400 transition cursor-pointer"
              /> */}
              <FaUser
                className="hover:text-lime-400 transition"
                onClick={GoToAccount}
              />
              {/* <FaShoppingCart className="hover:text-lime-400 transition" /> */}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Full Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/background2.jpg"
            alt="Neosour Background"
            fill
            priority
            quality={100}
            className="object-cover object-center brightness-[0.95] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-200 mb-4">
            Welcome to Neosour
          </p>
          <h1 className="max-w-2xl text-4xl md:text-6xl font-semibold leading-tight mb-8 drop-shadow-lg">
            Where Creativity Finds Its Template
          </h1>
          <button
            onClick={GoToItems}
            className="hover:bg-white border border-white stroke-white hover:text-black text-white font-medium px-8 py-3 shadow-md transition-all text-xs uppercase tracking-[0.25em]"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-lime-100 rounded-full p-6 mb-5 flex items-center justify-center">
                <FaTools className="text-lime-700 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customisations
              </h3>
              <p className="text-gray-600 text-sm">
                Tailored designs that match your unique brand style.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-lime-100 rounded-full p-6 mb-5 flex items-center justify-center">
                <FaRegClock className="text-lime-700 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery Within 24 Hours
              </h3>
              <p className="text-gray-600 text-sm">
                Quick, professional turnaround for your creative projects.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-lime-100 rounded-full p-6 mb-5 flex items-center justify-center">
                <FaHeadset className="text-lime-700 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customer Support
              </h3>
              <p className="text-gray-600 text-sm">
                Our support team is always ready to assist you 24/7.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-lime-100 rounded-full p-6 mb-5 flex items-center justify-center">
                <FaLock className="text-lime-700 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-gray-600 text-sm">
                Your transactions are encrypted and fully protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PopularProducts />
      <Footer />
    </main>
  );
}
