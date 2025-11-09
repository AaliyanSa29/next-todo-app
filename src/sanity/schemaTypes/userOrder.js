// // sanity/schemaTypes/userOrder.js
// import { defineField, defineType } from "sanity";

// export default defineType({
//   name: "userOrder",
//   title: "User Orders",
//   type: "document",
//   fields: [
//     defineField({
//       name: "username",
//       title: "Customer Name",
//       type: "string",
//     }),

//     defineField({
//       name: "email",
//       title: "Email",
//       type: "string",
//     }),

//     defineField({
//       name: "instructions",
//       title: "Special Instructions",
//       type: "text",
//       rows: 3,
//     }),

//     defineField({
//       name: "productId",
//       title: "Product ID",
//       type: "string",
//     }),

//     defineField({
//       name: "productTitle",
//       title: "Product Name",
//       type: "string",
//     }),

//     defineField({
//       name: "price",
//       title: "Price (PKR)",
//       type: "number",
//     }),

//     defineField({
//       name: "image",
//       title: "Product Image URL",
//       type: "string",
//     }),

//     defineField({
//       name: "paymentStatus",
//       title: "Payment Status",
//       type: "string",
//       options: {
//         list: [
//           { title: "✅ Paid", value: "paid" },
//           { title: "⏳ Pending", value: "pending" },
//           { title: "❌ Failed", value: "failed" },
//           { title: "💰 Refunded", value: "refunded" },
//         ],
//         layout: "radio",
//       },
//       initialValue: "paid",
//     }),

//     defineField({
//       name: "deliveryStatus",
//       title: "Delivery Status",
//       type: "string",
//       options: {
//         list: [
//           { title: "⏳ Pending", value: "pending" },
//           { title: "🔄 Processing", value: "processing" },
//           { title: "📦 Shipped", value: "shipped" },
//           { title: "✅ Delivered", value: "delivered" },
//           { title: "❌ Cancelled", value: "cancelled" },
//         ],
//         layout: "dropdown",
//       },
//       initialValue: "pending",
//     }),

//     defineField({
//       name: "mongoId",
//       title: "MongoDB Reference ID",
//       type: "string",
//       description: "Link to MongoDB document",
//       readOnly: true,
//     }),

//     defineField({
//       name: "createdAt",
//       title: "Order Date",
//       type: "datetime",
//       initialValue: () => new Date().toISOString(),
//     }),
//   ],

//   // 🎨 Preview: How orders appear in the list
//   preview: {
//     select: {
//       title: "productTitle",
//       email: "email",
//       price: "price",
//       delivery: "deliveryStatus",
//       payment: "paymentStatus",
//       date: "createdAt",
//     },
//     prepare(selection) {
//       const { title, email, price, delivery, payment, date } = selection;

//       const formattedDate = new Date(date).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       // Status emojis
//       const statusEmoji = {
//         pending: "⏳",
//         processing: "🔄",
//         shipped: "📦",
//         delivered: "✅",
//         cancelled: "❌",
//       };

//       return {
//         title: `${title} - ₨${price?.toLocaleString()}`,
//         subtitle: `${email} • ${statusEmoji[delivery] || ""} ${delivery} • ${formattedDate}`,
//         media: null, // Or you could show product image
//       };
//     },
//   },

//   // 📋 Ordering: How to sort orders
//   orderings: [
//     {
//       title: "Order Date (Newest First)",
//       name: "createdAtDesc",
//       by: [{ field: "createdAt", direction: "desc" }],
//     },
//     {
//       title: "Order Date (Oldest First)",
//       name: "createdAtAsc",
//       by: [{ field: "createdAt", direction: "asc" }],
//     },
//     {
//       title: "Price (High to Low)",
//       name: "priceDesc",
//       by: [{ field: "price", direction: "desc" }],
//     },
//   ],
// });

// sanity/schemaTypes/userOrder.js
import { defineField, defineType } from "sanity";

export default defineType({
  name: "userOrder",
  title: "User Orders",
  type: "document",
  fields: [
    defineField({
      name: "username",
      title: "Customer Name",
      type: "string",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "instructions",
      title: "Special Instructions",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "productId",
      title: "Product ID",
      type: "string",
    }),

    defineField({
      name: "productTitle",
      title: "Product Name",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price (PKR)",
      type: "number",
    }),

    defineField({
      name: "image",
      title: "Product Image URL",
      type: "string",
    }),

    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "✅ Paid", value: "paid" },
          { title: "⏳ Pending", value: "pending" },
          { title: "❌ Failed", value: "failed" },
          { title: "💰 Refunded", value: "refunded" },
        ],
        layout: "radio",
      },
      initialValue: "paid",
    }),

    defineField({
      name: "deliveryStatus",
      title: "Delivery Status",
      type: "string",
      options: {
        list: [
          { title: "⏳ Pending", value: "pending" },
          { title: "🔄 Processing", value: "processing" },
          { title: "📦 Shipped", value: "shipped" },
          { title: "✅ Delivered", value: "delivered" },
          { title: "❌ Cancelled", value: "cancelled" },
        ],
        layout: "dropdown",
      },
      initialValue: "pending",
    }),

    defineField({
      name: "mongoId",
      title: "MongoDB Reference ID",
      type: "string",
      description: "Link to MongoDB document",
      readOnly: true,
    }),

    defineField({
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],

  // ✅ FIXED Preview Section (no ESLint errors)
  preview: {
    select: {
      title: "productTitle",
      email: "email",
      price: "price",
      delivery: "deliveryStatus",
      payment: "paymentStatus",
      date: "createdAt",
    },
    prepare(selection) {
      const { title, email, price, delivery, payment, date } = selection;

      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const deliveryEmoji = {
        pending: "⏳",
        processing: "🔄",
        shipped: "📦",
        delivered: "✅",
        cancelled: "❌",
      };

      const paymentEmoji = {
        paid: "✅",
        pending: "⏳",
        failed: "❌",
        refunded: "💰",
      };

      return {
        title: `${title} - ₨${price?.toLocaleString()}`,
        subtitle: `${email} • ${paymentEmoji[payment]} ${payment} • ${deliveryEmoji[delivery]} ${delivery} • ${formattedDate}`,
        media: null,
      };
    },
  },

  // 📋 Ordering
  orderings: [
    {
      title: "Order Date (Newest First)",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Order Date (Oldest First)",
      name: "createdAtAsc",
      by: [{ field: "createdAt", direction: "asc" }],
    },
    {
      title: "Price (High to Low)",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
  ],
});
