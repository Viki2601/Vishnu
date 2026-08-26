import { Playfair_Display, DM_Sans, DM_Mono, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LayoutClient from "./LayoutClient";

const siteUrl = "https://vishnu-lake.vercel.app";

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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vishnu — Front-End Developer",
  keywords: [
    "Vishnu",
    "Front-End Developer",
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
  authors: [{ name: "Vishnu", url: "https://vishnu-lake.vercel.app/" }],
  creator: "Vishnu",
  alternates: {canonical: "/",},
  openGraph: {
    type: "website",
    url: "/",
    title: "Vishnu — Front-End Developer",
    description: "Front-End Developer specializing in modern web experiences — React, Next.js, MERN stack.",
    siteName: "Vishnu Muthukumar",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Vishnu — Front-End Developer",
    description: "Front-End Developer specializing in modern web experiences — React, Next.js, MERN stack.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  description: "Front-End Developer specializing in modern web experiences — React, Next.js, MERN stack.",
};

export default function RootLayout({ children }) {
  const fontClasses = `${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${montserrat.variable} ${raleway.variable} antialiased`;
  
  return (
    <html lang="en">
      <LayoutClient fonts={fontClasses}>
        {children}
      </LayoutClient>
      <Analytics />
    </html>
  );
}