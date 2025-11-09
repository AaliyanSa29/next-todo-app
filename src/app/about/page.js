"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaMousePointer,
  FaClipboardList,
  FaCreditCard,
  FaBoxOpen,
  FaEnvelope,
  FaEye,
} from "react-icons/fa";
import Footer from "../components/Homepage/Footer";
import { useRef } from "react";

export default function AboutUs() {
  const router = useRouter();
  const processRef = useRef(null); // 👈 Reference to the Work Process section

  // Navigate to other pages
  function goToPage(path) {
    router.push(path);
  }

  function GoToAccount() {
    router.push("/account");
  }

  // Smooth scroll to Work Process
  function scrollToProcess() {
    processRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen font-sans text-gray-900 relative scroll-smooth">
      {/* Transparent Header */}
      <header className="fixed top-0 left-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">
          {/* Logo */}
          <div
            className="absolute -top-3 left-8 cursor-pointer"
            onClick={() => goToPage("/")}
          >
            <Image
              src="/images/NEOSOUR-white-1.png"
              alt="Neosour Logo"
              width={130}
              height={40}
              priority
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="absolute top-8 right-10 flex items-center gap-10 text-white text-sm font-light tracking-wide">
            <button
              onClick={() => goToPage("/")}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => goToPage("/products")}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              Shop
            </button>

            <button
              onClick={() => goToPage("/contact")}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              Contact
            </button>

            {/* Social + Icons */}
            <div className="flex items-center gap-4 text-white text-[15px]">
              <FaFacebookF className="hover:text-lime-400 transition cursor-pointer" />
              <FaInstagram className="hover:text-lime-400 transition cursor-pointer" />
              <FaUser
                onClick={GoToAccount}
                className="hover:text-lime-400 transition cursor-pointer"
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background3.jpg"
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
            Find More Details
          </p>
          <h1 className="max-w-2xl text-4xl md:text-6xl font-semibold leading-tight mb-8 drop-shadow-lg">
            About Our Work Process
          </h1>
          <button
            onClick={scrollToProcess}
            className="hover:bg-white border border-white stroke-white hover:text-black text-white font-medium px-8 py-3 shadow-md transition-all text-xs uppercase tracking-[0.25em]"
          >
            Click Here
          </button>
        </div>
      </section>

      {/* Our Work Process Section */}
      <section
        ref={processRef} // 👈 this enables scroll target
        className="bg-white py-24 border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Work Process
            </h2>
            <p className="text-gray-600 mt-2 text-base">
              Here’s how we make your creative journey smooth and effortless
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <FaEye className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customer Visits Our Page
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Customers explore our vast collection of creative templates and
                designs.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FaMousePointer className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                They Select a Template
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Choose from our wide range of professionally designed templates
                that match your brand.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FaClipboardList className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                They Provide Instructions
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Share customization details or text to make the design uniquely
                yours.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FaCreditCard className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                They Make Payment
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Secure and seamless payment through our trusted checkout system.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FaBoxOpen className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product is Shipped
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                Our team finalizes your order and ensures fast delivery to your
                inbox or address.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <FaEnvelope className="text-black text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Customer Checks Email
              </h3>
              <p className="text-gray-600 text-sm max-w-xs">
                You receive your product and can contact us instantly if you
                need revisions or support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
