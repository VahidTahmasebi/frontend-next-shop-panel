import "../../globals.css";
import vazirFont from "@/constants/localFonts";

import { Toaster } from "react-hot-toast";

import Providers from "@/pages/Providers";
import SideBar from "./SideBar";

export const metadata = {
  title: "Shop Panel",
  description: "Next Shop Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <div className="h-screen grid grid-cols-4 bg-white">
            <div className="col-span-1 p-4 bg-gray-100 overflow-y-auto">
              <SideBar />
            </div>
          </div>
          <div className="col-span-3 p-4 overflow-y-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
