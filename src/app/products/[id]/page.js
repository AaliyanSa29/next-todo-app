"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Homepage/Header";
import Footer from "@/app/components/Homepage/Footer";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          title,
          description,
          price,
          image,
          category
        }`;
        const res = await client.fetch(query, { id });
        setProduct(res);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300 text-lg">
        Product not found.
      </div>
    );
  }

  const { title, description, image, price } = product;

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    if (!email || !message) {
      alert("Please fill in required fields.");
      return;
    }

    // Save to localStorage to use on checkout
    localStorage.setItem(
      "orderDetails",
      JSON.stringify({
        email,
        phone,
        instructions: message,
      })
    );

    const query = new URLSearchParams({
      id: product._id,
      title: encodeURIComponent(title),
      price: price?.toString() || "0",
      image: encodeURIComponent(urlFor(image).url()),
    });

    router.push(`/checkout?${query.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />

      <main className="flex-grow mt-24">
        {/* Product Section */}
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 py-16">
          {/* Product Display */}
          <div className="relative flex items-center justify-center bg-gray-200 rounded-xl shadow-md border border-gray-300 overflow-hidden w-[450px] h-[400px] p-6">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={image ? urlFor(image).url() : "/images/fallback.jpg"}
                alt={title}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 550px"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 space-y-6 lg:pl-12 md:pl-12 sm:pl-0">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-gray-600">{description}</p>

            <p className="text-3xl font-semibold text-lime-600">
              ₨ {price?.toLocaleString()}
            </p>

            <blockquote className="italic text-gray-500 border-l-4 border-lime-400 pl-4">
              “We love what we do & create partnerships with our clients to
              ensure their designs and prints leave lasting impressions.”
            </blockquote>
          </div>
        </section>

        {/* Inquiry Section */}
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 px-6">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-700">
                Send us a Message
              </h2>

              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-700">+92 329 9293046</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-700">info@paragonvertex.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-full">
                  <FiMapPin className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-700">
                    2972 Westheimer Rd, Santa Ana, Illinois 85486
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500 resize-none"
                    placeholder="Let us know how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-full transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
