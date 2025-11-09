import js from "@eslint/js";
import next from "eslint-config-next";

const config = [
  {
    ignores: ["node_modules", ".next", "dist"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },

  js.configs.recommended,

  // Next.js config (spread because it's an array)
  ...next,

  {
    rules: {},
  },
];

export default config;
