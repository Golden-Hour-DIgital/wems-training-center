import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://wemstrainingcenter.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Fetch published class slugs if Supabase is configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const supabase = createAdminClient();
      const { data: classes } = await supabase
        .from("classes")
        .select("slug, updated_at")
        .eq("is_published", true);

      const classUrls: MetadataRoute.Sitemap = (classes || []).map((cls) => ({
        url: `${baseUrl}/classes/${cls.slug}`,
        lastModified: new Date(cls.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

      return [...staticRoutes, ...classUrls];
    } catch {
      // Fall through to return static routes only
    }
  }

  return staticRoutes;
}
