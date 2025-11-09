// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { FaCreditCard, FaWallet } from "react-icons/fa";
// import Image from "next/image";

// export default function PaymentForm() {
//   // ✅ Grab order info from localStorage
//   const [orderData, setOrderData] = useState({
//     email: "",
//     phone: "",
//     instructions: "",
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem("orderDetails");
//     if (stored) setOrderData(JSON.parse(stored));
//   }, []);

//   const [method, setMethod] = useState("card");
//   const [selectedWallet, setSelectedWallet] = useState("JazzCash");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // ✅ Decode all params safely
//   const title = decodeURIComponent(searchParams.get("title") || "");
//   const price = searchParams.get("price") || "0";
//   const image = decodeURIComponent(searchParams.get("image") || "");

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate

//       const success = await fetch("/api/submitOrder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: orderData.phone || "Anonymous",
//           email: orderData.email,
//           instructions: orderData.instructions,
//           productId: searchParams.get("id"),
//           title,
//           price,
//           image,
//         }),
//       }).then((res) => res.json());

//       if (!success?.success) {
//         throw new Error(success?.error || "Failed to save order.");
//       }

//       alert("Payment successful! Order placed.");
//       router.push("/");
//     } catch (err) {
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         {/* Product Summary Section */}
//         {title && (
//           <div className="flex flex-col items-center mb-8 text-center">
//             {/* ✅ FIXED: Handle both Sanity (https) and local (/) images */}
//             <Image
//               src={
//                 image && image.startsWith("http")
//                   ? image
//                   : image || "/images/placeholder.png"
//               }
//               alt={title || "Product"}
//               width={120}
//               height={120}
//               className="object-contain mb-3 rounded-md"
//             />

//             <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//             <p className="text-lime-600 font-bold mt-1 text-lg">
//               ₨ {Number(price || 0).toLocaleString()}
//             </p>
//           </div>
//         )}

//         {/* Payment Method Tabs */}
//         <div className="flex border border-gray-200 rounded-md overflow-hidden mb-6">
//           <button
//             onClick={() => setMethod("card")}
//             className={`flex-1 flex items-center justify-center gap-2 py-2 font-medium text-sm transition ${
//               method === "card"
//                 ? "bg-blue-50 border-b-2 border-blue-600 text-blue-600"
//                 : "hover:bg-gray-50 text-gray-700"
//             }`}
//           >
//             <FaCreditCard /> Card
//           </button>
//           <button
//             onClick={() => setMethod("ewallet")}
//             className={`flex-1 flex items-center justify-center gap-2 py-2 font-medium text-sm transition ${
//               method === "ewallet"
//                 ? "bg-blue-50 border-b-2 border-blue-600 text-blue-600"
//                 : "hover:bg-gray-50 text-gray-700"
//             }`}
//           >
//             <FaWallet /> E-Wallet
//           </button>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-md p-2">
//             {error}
//           </p>
//         )}

//         {/* Card Payment Form */}
//         {method === "card" && (
//           <form className="space-y-5" onSubmit={handlePayment}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Card Number
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
//                 <input
//                   type="text"
//                   placeholder="1234 1234 1234 1234"
//                   className="w-full focus:outline-none text-gray-800 text-sm"
//                   required
//                 />
//                 <div className="flex gap-1 ml-2">
//                   <Image
//                     src="/images/VISACARD1.png"
//                     alt="Visa"
//                     width={32}
//                     height={20}
//                   />
//                   <Image
//                     src="/images/MASTERCARD1.png"
//                     alt="MasterCard"
//                     width={32}
//                     height={20}
//                     className="mr-2"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expiry
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="MM / YY"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
//                   required
//                 />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   CVC
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="CVC"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
//                   required
//                 />
//               </div>
//             </div>

//             <p className="text-xs text-gray-500 leading-5">
//               By providing your card information, you allow Neosour to charge
//               your card in accordance with their terms.
//             </p>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full ${
//                 loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//               } text-white font-medium py-3 rounded-md transition text-sm`}
//             >
//               {loading
//                 ? "Processing..."
//                 : `Pay Now ₨ ${Number(price || 0).toLocaleString()}`}
//             </button>
//           </form>
//         )}

//         {/* E-Wallet Payment Form */}
//         {method === "ewallet" && (
//           <form className="space-y-5" onSubmit={handlePayment}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select E-Wallet
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 justify-between">
//                 <select
//                   onChange={(e) => setSelectedWallet(e.target.value)}
//                   value={selectedWallet}
//                   className="w-full border-none focus:outline-none text-sm text-gray-800 bg-transparent"
//                 >
//                   <option value="JazzCash">JazzCash</option>
//                   <option value="EasyPaisa">EasyPaisa</option>
//                 </select>
//                 <div className="ml-3">
//                   {selectedWallet === "JazzCash" && (
//                     <Image
//                       src="/images/JAZZCASH.png"
//                       alt="JazzCash"
//                       width={60}
//                       height={30}
//                       className="object-contain"
//                     />
//                   )}
//                   {selectedWallet === "EasyPaisa" && (
//                     <Image
//                       src="/images/EASYPAISA.png"
//                       alt="EasyPaisa"
//                       width={70}
//                       height={40}
//                       className="object-contain"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 placeholder="03XX-XXXXXXX"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
//                 required
//               />
//             </div>

//             <p className="text-xs text-gray-500 leading-5">
//               You’ll be redirected to your selected e-wallet app to complete the
//               payment securely.
//             </p>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full ${
//                 loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//               } text-white font-medium py-3 rounded-md transition text-sm`}
//             >
//               {loading
//                 ? "Processing..."
//                 : `Pay Now ₨ ${Number(price || 0).toLocaleString()}`}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCreditCard, FaWallet } from "react-icons/fa";
import Image from "next/image";

export default function PaymentForm() {
  const [orderData, setOrderData] = useState({
    email: "",
    phone: "",
    instructions: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("orderDetails");
    if (stored) {
      setOrderData(JSON.parse(stored));
    }
  }, []);

  const [method, setMethod] = useState("card");
  const [selectedWallet, setSelectedWallet] = useState("JazzCash");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const title = decodeURIComponent(searchParams.get("title") || "");
  const price = searchParams.get("price") || "0";
  const image = decodeURIComponent(searchParams.get("image") || "");
  const productId = searchParams.get("id") || "";

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate payment processing (2 seconds)
      console.log("🔄 Processing fake payment...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("✅ Fake payment successful!");

      // Now submit the order to backend
      console.log("📤 Submitting order to backend...");
      const response = await fetch("/api/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: orderData.phone || "Anonymous",
          email: orderData.email,
          instructions: orderData.instructions || "",
          productId: productId,
          title: title,
          price: price,
          image: image,
        }),
      });

      const result = await response.json();
      console.log("📥 Backend response:", result);

      if (!result.success) {
        throw new Error(result.error || "Failed to save order.");
      }

      // Clear localStorage
      localStorage.removeItem("orderDetails");

      // Show success message
      alert(
        `✅ Payment successful! Order ID: ${result.orderId}\n\nYour order has been placed successfully!`
      );

      // Redirect to homepage
      router.push("/");
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {/* Product Summary */}
        {title && (
          <div className="flex flex-col items-center mb-8 text-center">
            <Image
              src={
                image && image.startsWith("http")
                  ? image
                  : image || "/images/placeholder.png"
              }
              alt={title || "Product"}
              width={120}
              height={120}
              className="object-contain mb-3 rounded-md"
            />
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-lime-600 font-bold mt-1 text-lg">
              ₨ {Number(price || 0).toLocaleString()}
            </p>
          </div>
        )}

        {/* Payment Method Tabs */}
        <div className="flex border border-gray-200 rounded-md overflow-hidden mb-6">
          <button
            onClick={() => setMethod("card")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 font-medium text-sm transition ${
              method === "card"
                ? "bg-blue-50 border-b-2 border-blue-600 text-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <FaCreditCard /> Card
          </button>
          <button
            onClick={() => setMethod("ewallet")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 font-medium text-sm transition ${
              method === "ewallet"
                ? "bg-blue-50 border-b-2 border-blue-600 text-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <FaWallet /> E-Wallet
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </p>
        )}

        {/* Card Payment Form */}
        {method === "card" && (
          <form className="space-y-5" onSubmit={handlePayment}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full focus:outline-none text-gray-800 text-sm"
                  required
                />
                <div className="flex gap-1 ml-2">
                  <Image
                    src="/images/VISACARD1.png"
                    alt="Visa"
                    width={32}
                    height={20}
                  />
                  <Image
                    src="/images/MASTERCARD1.png"
                    alt="MasterCard"
                    width={32}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                  required
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-5">
              By providing your card information, you allow Neosour to charge
              your card in accordance with their terms.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-3 rounded-md transition text-sm`}
            >
              {loading
                ? "Processing Payment..."
                : `Pay Now ₨ ${Number(price || 0).toLocaleString()}`}
            </button>
          </form>
        )}

        {/* E-Wallet Payment Form */}
        {method === "ewallet" && (
          <form className="space-y-5" onSubmit={handlePayment}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select E-Wallet
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 justify-between">
                <select
                  onChange={(e) => setSelectedWallet(e.target.value)}
                  value={selectedWallet}
                  className="w-full border-none focus:outline-none text-sm text-gray-800 bg-transparent"
                >
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                </select>
                <div className="ml-3">
                  {selectedWallet === "JazzCash" && (
                    <Image
                      src="/images/JAZZCASH.png"
                      alt="JazzCash"
                      width={60}
                      height={30}
                      className="object-contain"
                    />
                  )}
                  {selectedWallet === "EasyPaisa" && (
                    <Image
                      src="/images/EASYPAISA.png"
                      alt="EasyPaisa"
                      width={70}
                      height={40}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="03XX-XXXXXXX"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                required
              />
            </div>

            <p className="text-xs text-gray-500 leading-5">
              Youll be redirected to your selected e-wallet app to complete the
              payment securely.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium py-3 rounded-md transition text-sm`}
            >
              {loading
                ? "Processing Payment..."
                : `Pay Now ₨ ${Number(price || 0).toLocaleString()}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
