import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

// Az Urbanist betűtípus beállítása
const font = Urbanist({ subsets: ["latin"] });

// A gyökér elrendezési (layout) komponens, amely definiálja az alkalmazás gyökér HTML struktúráját és globális stílusait
export const metadata: Metadata = {
  title: "Budapest Vinyl",
  description: "Budapest Vinyl",
};

// A RootLayout komponens definiálása
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className}`}
        style={{ backgroundColor: "#99B080" }}
      >
        {/* Modális ablakokat kezelő providerek */}
        <ModalProvider />
        <ToastProvider />

        {/* Navigációs sáv */}
        <Navbar />

        {/* Gyerek komponensek megjelenítése */}
        {children}

        {/* Aljzat (lábléc) */}
        <Footer />
      </body>
    </html>
  );
}
