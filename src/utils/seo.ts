// SEO utilities for generating meta tags and structured data

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateMetaTags(seoData: SEOData) {
  const {
    title,
    description,
    keywords,
    ogImage = "/og-image.jpg",
    canonical,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    tags,
  } = seoData;

  return {
    title,
    description,
    keywords: keywords || "open source, alternatives, free software",
    ogImage,
    canonical,
    type,
    publishedTime,
    modifiedTime,
    author,
    tags,
  };
}

export function generateStructuredData(seoData: SEOData, additionalData?: Record<string, unknown>) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": seoData.type === "article" ? "Article" : "WebPage",
    headline: seoData.title,
    description: seoData.description,
    url: seoData.canonical,
    author: {
      "@type": "Organization",
      name: seoData.author || "Open Alternatives",
    },
    publisher: {
      "@type": "Organization",
      name: "Open Alternatives",
      logo: {
        "@type": "ImageObject",
        url: "https://openalternatives.github.io/logo.png",
      },
    },
  };

  if (seoData.type === "article") {
    return {
      ...baseData,
      datePublished: seoData.publishedTime,
      dateModified: seoData.modifiedTime,
      keywords: seoData.tags?.join(", "),
    };
  }

  if (additionalData?.alternative) {
    const alternative = additionalData.alternative as Record<string, unknown>;
    return {
      ...baseData,
      "@type": "SoftwareApplication",
      name: alternative.name,
      description: alternative.description,
      url: alternative.website,
      applicationCategory: alternative.category,
      operatingSystem: (alternative.platforms as Array<{ name: string }>)
        ?.map((p) => p.name)
        .join(", "),
      license: alternative.license,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: alternative.rating,
        reviewCount: alternative.reviewCount,
      },
    };
  }

  return baseData;
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
