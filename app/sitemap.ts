import type { MetadataRoute } from "next";
import { getPostSlugs, getProjectSlugs } from "@/sanity/sanity.query";

const SITE_URL = "https://massdev.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, posts] = await Promise.all([
    getProjectSlugs(),
    getPostSlugs(),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog_post`, changeFrequency: "weekly", priority: 0.6 },
    ...projectSlugs.map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map(({ slug, updatedAt }) => ({
      url: `${SITE_URL}/blog_post/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
