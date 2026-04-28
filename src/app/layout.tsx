import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const CANONICAL = "https://jesushernandez.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL),
  title: {
    default: "Jesus Hernandez | Front-End Developer & UX/UI Designer",
    template: "%s | Jesus Hernandez",
  },
  description:
    "Portfolio of Jesus Hernandez, Front-End Developer & UX/UI Designer specialized in React, Next.js, and crafting polished digital experiences.",
  keywords: [
    "Front-End Developer",
    "Frontend Engineer",
    "UX/UI Designer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Design",
    "Web Development",
  ],
  authors: [{ name: "Jesus Hernandez", url: CANONICAL }],
  creator: "Jesus Hernandez",
  publisher: "Jesus Hernandez",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jesus Hernandez Portfolio",
    url: CANONICAL,
    title: "Jesus Hernandez | Front-End Developer & UX/UI Designer",
    description:
      "Explore the portfolio of Jesus Hernandez: front-end engineering, UX/UI design, and crafted digital experiences.",
    images: [
      {
        url: "/images/share.png",
        width: 1200,
        height: 630,
        alt: "Portfolio | Jesus Hernandez | Front-End Developer & UX/UI Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesus Hernandez | Front-End Developer & UX/UI Designer",
    description:
      "Front-end development and UX/UI design portfolio by Jesus Hernandez.",
    images: ["/images/share.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/images/facebrand.png", type: "image/png", sizes: "184x184" },
    ],
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jesus Hernandez",
    url: CANONICAL,
    jobTitle: "Front-End Developer & UX/UI Designer",
    sameAs: [
      "https://www.linkedin.com/in/jesushernandez91/",
      "https://github.com/jesus0091",
      "https://www.behance.net/devjesushernandez",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jesus Hernandez Portfolio",
    url: CANONICAL,
  };

  return (
    <html
      lang="en"
      data-color-scheme="light"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scrollbar-hide`}
    >
      <head>
        <meta id="theme-color" name="theme-color" content="#f4f1ea" />

        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      </head>

      <body className="antialiased w-full">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
