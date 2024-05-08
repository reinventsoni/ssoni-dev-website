import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cx } from "./utils";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata: Metadata = {
  title: "Sanjay Soni - Developer Website",
  description: "Software Engineering and Application Development focused website of Sanjay Soni",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cx(inter.variable, manrope.variable, "font-mr bg-slate-100")}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
