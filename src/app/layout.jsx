import vazirFont from "@/constants/localFonts";

export const metadata = {
  title: "Shop Panel",
  description: "Next Shop Panel",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={`${vazirFont.variable} font-sans`}>{children}</body>
    </html>
  );
}
