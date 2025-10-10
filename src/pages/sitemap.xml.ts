// Sitemap generation for SEO
import { sampleAlternatives, sampleCategories } from "../types/data.ts";

const site = "https://openalternatives.github.io";

// Generate sitemap entries
const staticPages = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/categories", priority: 0.9, changefreq: "weekly" },
  { url: "/search", priority: 0.8, changefreq: "daily" },
  { url: "/about", priority: 0.7, changefreq: "monthly" },
  { url: "/submit", priority: 0.6, changefreq: "monthly" },
];

const categoryPages = sampleCategories.map((category) => ({
  url: `/categories/${category.slug}`,
  priority: 0.8,
  changefreq: "weekly",
}));

const alternativePages = sampleAlternatives.map((alternative) => ({
  url: `/alternatives/${alternative.id}`,
  priority: 0.7,
  changefreq: "weekly",
}));

const allPages = [...staticPages, ...categoryPages, ...alternativePages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

export { sitemap };
