"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function BusinessFlyers() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const itemsPerView = 3;

  // 🧠 Fetch from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data =
          await client.fetch(`*[_type == "product" && category == "businessFlyer"]{
          _id,
          title,
          description,
          price,
          image
        }`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (index + itemsPerView < products.length) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleViewProduct = (e, product) => {
    e.stopPropagation();
    router.push(`/products/${product._id}`);
  };

  if (loading) {
    return (
      <section className="bg-white pt-25 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center py-16">
          <p className="text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-25 pb-10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Business Flyers
          </h2>
          <p className="text-gray-600 text-lg">
            Superb and excellent quality flyers for your business promotions
          </p>
        </div>

        {/* Navigation Arrows */}
        {index > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-lg hover:bg-lime-600 transition z-20"
          >
            <FaChevronLeft />
          </button>
        )}
        {index + itemsPerView < products.length && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-lg hover:bg-lime-600 transition z-20"
          >
            <FaChevronRight />
          </button>
        )}

        {/* Product Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${index} * (100% / ${itemsPerView})))`,
            }}
          >
            {products.map((product) => (
              <div key={product._id} className="w-1/3 shrink-0">
                <div className="px-4">
                  <div className="relative overflow-hidden rounded-xl shadow-md group bg-gray-100 aspect-[4/5] hover:shadow-xl transition-all">
                    <div className="absolute inset-0">
                      <Image
                        alt={product.title}
                        src={
                          product.image
                            ? urlFor(product.image).url()
                            : "/images/fallback.jpg"
                        }
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all"></div>
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                      <h3 className="text-xl font-semibold mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-200 mb-3">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-lime-300 font-bold">
                          ₨ {product.price?.toLocaleString()}
                        </p>
                        <button
                          onClick={(e) => handleViewProduct(e, product)}
                          className="bg-white text-gray-900 font-medium px-5 py-2 text-sm rounded-full shadow-md hover:bg-lime-500 hover:text-white transition"
                        >
                          View Flyer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Fallback message */}
            {products.length === 0 && (
              <div className="w-full text-center text-gray-500 py-16">
                No BusinessFlyers templates found — add some in Sanity Studio.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
