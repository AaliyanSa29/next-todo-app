"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Footer from "../components/Homepage/Footer";
import { useRef } from "react";

export default function ContactUs() {
  const router = useRouter();
  const contactRef = useRef(null);

  function goToPage(path) {
    router.push(path);
  }

  function GoToAccount() {
    router.push("/account");
  }

  function scrollToContact() {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <main className="min-h-screen font-sans text-gray-900 relative scroll-smooth">
      {/* Transparent Header */}
      <header className="fixed top-0 left-0 z-30 w-full bg-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">
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
              onClick={() => goToPage("/about")}
              className="hover:text-lime-400 transition-colors cursor-pointer"
            >
              About
            </button>

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
            src="/images/background4.jpg"
            alt="Contact Background"
            fill
            priority
            quality={100}
            className="object-cover object-center brightness-[0.9] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-200 mb-4">
            Get In Touch
          </p>
          <h1 className="max-w-2xl text-4xl md:text-6xl font-semibold leading-tight mb-6 drop-shadow-lg">
            Contact Our Team
          </h1>
          <p className="max-w-xl text-gray-200 text-sm md:text-base leading-relaxed mb-8">
            Have questions about our services or your order? Don’t hesitate to
            contact us — we’d love to hear from you.
          </p>
          <button
            onClick={scrollToContact}
            className="hover:bg-white border border-white stroke-white hover:text-black text-white font-medium px-8 py-3 shadow-md transition-all text-xs uppercase tracking-[0.25em]"
          >
            Click Here
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="bg-gray-50 py-24 border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="flex flex-col space-y-1 mt-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Send us a Message
            </h2>

            <div className="space-y-6 text-gray-700 mt-10">
              <div className="flex items-start gap-4">
                <div className="bg-gray-800 text-white p-3 rounded-full">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600 text-sm">555-1234-678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-800 text-white p-3 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600 text-sm">mail@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-800 text-white p-3 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600 text-sm">
                    2972 Westheimer Rd, Santa Ana, Illinois 85486
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 resize-none"
                  placeholder="Let us know how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-center text-sm bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-10 rounded-full transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
