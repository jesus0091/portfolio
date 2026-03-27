import type { MetadataRoute } from "next";

const CANONICAL = "https://jesushernandez.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
