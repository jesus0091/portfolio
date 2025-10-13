// app/layout.tsx
import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jesus Hernández - Frontend Developer & UX/UI Designer",
    template: "%s | Jesus Hernández",
  },
  description:
    "Portafolio de Jesus Hernández, Frontend Developer & UX/UI Designer especializado en React, Next.js y diseño de experiencias digitales.",
  keywords: [
    "Frontend Developer",
    "UX/UI Designer",
    "React",
    "Next.js",
    "Portfolio",
    "Diseño Web",
    "Desarrollo Web",
  ],
  authors: [{ name: "Jesus Hernández", url: "https://jesus.dev" }],
  creator: "Jesus Hernández",
  publisher: "Jesus Hernández",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jesushernandez.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jesus.dev",
    siteName: "Jesus Hernández Portfolio",
    title: "Jesus Hernández - Frontend Developer & UX/UI Designer",
    description:
      "Explora el portafolio de Jesus Hernández: proyectos de desarrollo frontend, diseño UX/UI y experiencias digitales creativas.",
    images: [
      {
        url: "/og-image.jpg", // 👈 crea esta imagen en /public/
        width: 1200,
        height: 630,
        alt: "Portafolio de Jesus Hernández - Frontend Developer & UX/UI Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Hernández - Frontend Developer & UX/UI Designer",
    description:
      "Portafolio de desarrollo frontend y diseño UX/UI de Jesus Hernández.",
    images: ["/og-image.jpg"],
    creator: "Jesus Hernandez", // 👈 cámbialo por tu @ real
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

// 👇 Bloque que evita zoom en la página
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} font-sans scrollbar-hide`}>
      <body className="antialiased bg-background text-foreground w-full">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
