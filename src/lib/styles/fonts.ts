import localFont from "next/font/local";

export const futuraPassata = localFont({
  src: "../../../public/fonts/futura/FuturaPassata.woff",
  display: "swap",
  variable: "--font-futura",
  weight: "400",
});

export const gotham = localFont({
  src: [
    {
      path: "../../../public/fonts/gotham/GothamSSm-Book_Web.woff2",
      weight: "400",
    },
    {
      path: "../../../public/fonts/gotham/GothamSSm-Medium_Web.woff2",
      weight: "500",
    },
    {
      path: "../../../public/fonts/gotham/GothamSSm-Bold_Web.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-gotham",
});
