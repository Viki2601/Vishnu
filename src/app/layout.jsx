import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LayoutClient from "./LayoutClient";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Vishnu Muthukumar — UI Developer",
  keywords: [
    "Vishnu",
    "Vishnu Muthukumar",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "React",
    "JavaScript",
    "Frontend Developer",
    "Software Engineer",
    "Web Design",
    "Web Development",
    "UI/UX",
    "Full Stack Developer",
    "MERN Stack",
    "UI Developer",
  ],
  authors: [{ name: "Vishnu Muthukumar", url: "https://vishnumuthukumar.com" }],
  creator: "Vishnu Muthukumar",
  description:
    "UI Developer specializing in modern web experiences — React, Next.js, MERN stack.",
};

export default function RootLayout({ children }) {
  const fontClasses = `${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`;
  
  return (
    <html lang="en">
      <LayoutClient fonts={fontClasses}>
        {children}
      </LayoutClient>
      <Analytics />
    </html>
  );
}