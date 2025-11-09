import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // ✅ Changed from deskTool
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Neosour4 Ecommerce",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  basePath: "/studio",

  plugins: [structureTool(), visionTool()], // ✅ Changed to structureTool

  schema: {
    types: schemaTypes,
  },
});
