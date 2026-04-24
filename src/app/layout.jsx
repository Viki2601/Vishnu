import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import SmoothScroll from "@/common/Smoothscroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  description: "UI Developer specializing in modern web experiences — React, Next.js, MERN stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`} style={{ fontFamily: "var(--font-inter), var(--font-geist-sans), sans-serif" }}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}