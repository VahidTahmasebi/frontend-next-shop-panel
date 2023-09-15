import "./globals.css";
import vazirFont from "@/constants/localFonts";

import { Toaster } from "react-hot-toast";

import Providers from "./providers";

import Header from "./Header";

export const metadata = {
  title: "Shop Panel",
  description: "Next Shop Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
