"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

export default function PowerPointTemplates() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "product" && category == "powerpoint"]{
            _id,
            title,
            description,
            price,
            "imageUrl": image.asset->url
          }
        `);
        console.log("Fetched products:", data); // Debug log
        setProducts(data);
      } catch (error) {
        console.error("Error fetching PowerPoint templates:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (index < products.length - 1) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleViewProduct = (e, product) => {
    e.stopPropagation();
    router.push(`/products/${product._id}`);
  };

  // ✅ Fixed calculation - accounts for the full container width
  const slideStep = 100; // Each slide is 100% of container width
  const transformStyle = {
    transform: `translateX(-${index * slideStep}%)`,
  };

  if (loading) {
    return (
      <section className="bg-white pt-25 pb-10">
        <div className="max-w-7xl mx-auto px-6 text-center py-16">
          <p className="text-gray-500">Loading PowerPoint templates...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-15 pb-15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            PowerPoint Templates
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Professional, dynamic templates designed to impress.
          </p>
        </div>

        {/* Arrows */}
        {index > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-md hover:bg-lime-600 transition z-20"
          >
            <FaChevronLeft />
          </button>
        )}
        {index < products.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-lime-500 text-white p-3 rounded-full shadow-md hover:bg-lime-600 transition z-20"
          >
            <FaChevronRight />
          </button>
        )}

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1500 ease-in-out"
            style={transformStyle}
          >
            {products.length === 0 && (
              <div className="w-full text-center text-gray-500 py-16">
                No PowerPoint Templates found — add some in Sanity Studio.
              </div>
            )}

            {products.map((product, i) => {
              const isMain = i === index;
              const nextProduct = products[i + 1];

              return (
                <div
                  key={product._id}
                  className="w-full shrink-0 px-3 transition-all duration-700 ease-in-out"
                >
                  <div className="flex gap-6 items-stretch h-[450px]">
                    {/* Main Card - 2/3 width */}
                    <div className="w-2/3 h-full">
                      <div className="relative overflow-hidden rounded-md shadow-md group bg-gray-100 h-full transition-all duration-700 ease-in-out">
                        {product.imageUrl ? (
                          <Image
                            alt={product.title}
                            src={product.imageUrl}
                            fill
                            sizes="(max-width: 768px) 100vw, 66vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">
                              No Image Available
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all"></div>

                        <div className="absolute left-0 right-0 bottom-0 text-white z-10 p-6">
                          <h3 className="text-lg font-semibold mb-2">
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
                              className="bg-white text-gray-900 font-medium px-5 py-2 text-sm rounded-full shadow-md hover:bg-lime-500 hover:text-white transition-all"
                            >
                              Shop Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Side Preview Card - 1/3 width */}
                    {nextProduct && (
                      <div className="w-1/3 h-full">
                        <div className="relative overflow-hidden rounded-md shadow-md group bg-gray-100 h-full transition-all duration-700 ease-in-out">
                          {nextProduct.imageUrl ? (
                            <Image
                              alt={nextProduct.title}
                              src={nextProduct.imageUrl}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-gray-400 text-xs">
                                No Image
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all"></div>

                          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center text-white z-10 p-3">
                            <h3 className="text-sm font-semibold truncate">
                              {nextProduct.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
