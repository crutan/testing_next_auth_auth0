/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      "4xl": ["2.5rem", 1.1],
      "3xl": ["2rem", 1.125],
      "2xl": ["1.75rem", 1.15],
      xl: ["1.5rem", 1.33],
      lg: ["1.25rem", 1.5],
      base: ["1rem", 1.5],
      sm: ["0.875rem", 1.6],
      xs: ["0.75rem", 1.4],
      "2xs": ["0.625rem", 1.2],
    },
    letterSpacing: {
      tight: "-.02em",
      normal: "0",
      wide: ".04em",
      wider: ".08em",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-gotham)", ...defaultTheme.fontFamily.sans],
        futura: ["var(--font-futura)"],
      },
      placeholderColor: ["disabled"],
      colors: {
        transparent: "transparent",
        /** Primary Colors */
        onyx: {
          0: "#FFFFFF",
          25: "#D4D9D9",
          50: "#BBBFBF",
          100: "#A1A6A6",
          200: "#878C8C",
          300: "#6E7373",
          400: "#565959",
          500: "#3D4040",
          600: "#242626",
          700: "#181919",
          800: "#0C0D0D",
          900: "#000000",
        },
        celesteal: {
          100: "#E0FFFE",
          200: "#C7FFFE",
          300: "#98EBE9",
          400: "#63C1BF",
          500: "#4B9190",
          600: "#294F4E",
          700: "#152928",
          800: "#0C1717",
          900: "#040808",
        },
        melon: {
          100: "#FCEDEA",
          200: "#FCD7D1",
          300: "#FCC1B8",
          400: "#FCAC9F",
          500: "#DE8E81",
          600: "#BF7265",
          700: "#A1594D",
          800: "#824238",
          900: "#632E26",
        },
        /** Semantic Colors */
        success: {
          100: "#F2F9F6",
          200: "#D9EEE4",
          300: "#67BC93",
          400: "#018F4B",
          500: "#01723C",
          600: "#01562D",
        },
        warning: {
          100: "#FFF7F3",
          200: "#FEE8DC",
          300: "#FC935B",
          400: "#E25B12",
          500: "#B0470E",
          600: "#7E320A",
        },
        error: {
          100: "#FBEAE9",
          200: "#F7D5D2",
          300: "#E46C63",
          400: "#C3281D",
          500: "#982016",
          600: "#6D1710",
        },
        info: {
          100: "#E8F1FC",
          200: "#BCD6F5",
          300: "#61A0E9",
          400: "#1B6BC9",
          500: "#15539C",
          600: "#0F3B70",
        },
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    // Allow styling descendant of group that matches peer pseudo class variant
    //  Source: https://github.com/tailwindlabs/tailwindcss/discussions/8777
    function groupPeer({ addVariant }) {
      let pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        "checked",
        "hover",
        "focus-visible",
        "enabled",
        "disabled",
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`]
      );

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          let result = typeof state === "function" ? state(ctx) : state;
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
        });
      }
    },
  ],
};
