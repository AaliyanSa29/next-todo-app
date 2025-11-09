import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price (PKR)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    // ✅ Category selector drives where it displays on site
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Business Flyers", value: "businessFlyer" },
          { title: "Cards & Design", value: "cardsAndDesign" },
          { title: "PowerPoint Templates", value: "powerpoint" },
        ],
        layout: "radio", // optional: can change to 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
