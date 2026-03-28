import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    icon: "/favicon.ico",
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
      className={`${inter.variable} font-sans scrollbar-hide bg-background text-foreground`}
    >
      <head>
        <meta id="theme-color" name="theme-color" content="#e4e4e4" />

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
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
      </head>

      <body className="antialiased w-full bg-background text-foreground">
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
