"use client";
import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PopularProducts() {
  const products = [
    {
      id: 1,
      image: "/images/product1.jpg",
      title: "20% Off On Tank Tops",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      button: "Shop Now",
    },
    {
      id: 2,
      image: "/images/product2.jpg",
      title: "Latest Eyewear For You",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      button: "Shop Now",
    },
    {
      id: 3,
      image: "/images/product3.jpg",
      title: "Let's Lorem Suit Up!",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      button: "Check Out",
    },
    {
      id: 4,
      image: "/images/product4.jpg",
      title: "Stylish Business Cards",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      button: "Buy Now",
    },
    {
      id: 5,
      image: "/images/product5.jpg",
      title: "Elegant Brochure Templates",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      button: "View More",
    },
  ];

  const [index, setIndex] = useState(0);
  const itemsPerView = 3;

  const handleNext = () => {
    if (index + itemsPerView < products.length) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="bg-white pt-12 pb-20 relative">
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
        </div>

        {/* Arrows */}
        {index > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-md hover:bg-lime-600 transition z-20"
          >
            <FaChevronLeft />
          </button>
        )}
        {index + itemsPerView < products.length && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-md hover:bg-lime-600 transition z-20"
          >
            <FaChevronRight />
          </button>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / itemsPerView)}%)`,
              width: `${(products.length / itemsPerView) * 100}%`,
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-1/3 shrink-0 px-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-[460px] group">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      alt={product.title}
                      src={product.image}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
                  </div>

                  {/* Text Overlay */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-5">{product.desc}</p>
                    <button className="bg-white text-gray-900 font-medium px-5 py-2 text-sm rounded-md shadow-md hover:bg-lime-500 hover:text-white transition-all w-fit">
                      {product.button}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
