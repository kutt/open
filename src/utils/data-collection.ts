// Data collection utilities for gathering information from external sources

export interface DataSource {
  name: string;
  url: string;
  description: string;
  type: "api" | "scraping" | "manual";
  rateLimit?: number; // requests per minute
}

export interface CollectedAlternative {
  name: string;
  description: string;
  website: string;
  repository?: string;
  license: string;
  platforms: string[];
  category: string;
  proprietaryAlternative: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating?: number;
  reviewCount?: number;
  stars?: number;
  forks?: number;
  lastUpdated: Date;
  source: string;
}

export const dataSources: DataSource[] = [
  {
    name: "OpenAlternative.co",
    url: "https://openalternative.co",
    description: "Curated list of open source alternatives",
    type: "scraping",
    rateLimit: 10,
  },
  {
    name: "AlternativeTo",
    url: "https://alternativeto.net",
    description: "Comprehensive database of software alternatives",
    type: "scraping",
    rateLimit: 5,
  },
  {
    name: "OSSAlternatives",
    url: "https://ossalternatives.to",
    description: "Open source alternatives database",
    type: "scraping",
    rateLimit: 10,
  },
  {
    name: "OpenAltly",
    url: "https://www.openaltly.com",
    description: "Curated open source alternatives",
    type: "scraping",
    rateLimit: 10,
  },
  {
    name: "GitHub Awesome Lists",
    url: "https://github.com/topics/awesome-alternatives",
    description: "Community-maintained awesome lists",
    type: "api",
    rateLimit: 30,
  },
];

// Sample data collection functions (would be implemented with actual scraping/API calls)
export class DataCollector {
  async collectFromOpenAlternative(): Promise<CollectedAlternative[]> {
    // This would implement actual web scraping
    // For now, return sample data
    return [
      {
        name: "LibreOffice",
        description: "Free and open source office suite",
        website: "https://libreoffice.org",
        repository: "https://github.com/LibreOffice/core",
        license: "MPL-2.0",
        platforms: ["Windows", "macOS", "Linux"],
        category: "office-suites",
        proprietaryAlternative: "Microsoft Office",
        features: ["Word Processing", "Spreadsheets", "Presentations", "Database"],
        pros: ["Free", "Cross-platform", "Regular updates"],
        cons: ["Interface feels dated", "Large file size"],
        rating: 4.2,
        reviewCount: 1250,
        stars: 1500,
        forks: 300,
        lastUpdated: new Date(),
        source: "openalternative.co",
      },
    ];
  }

  async collectFromAlternativeTo(): Promise<CollectedAlternative[]> {
    // This would implement actual web scraping
    return [];
  }

  async collectFromOSSAlternatives(): Promise<CollectedAlternative[]> {
    // This would implement actual web scraping
    return [];
  }

  async collectFromOpenAltly(): Promise<CollectedAlternative[]> {
    // This would implement actual web scraping
    return [];
  }

  async collectFromGitHub(): Promise<CollectedAlternative[]> {
    // This would implement GitHub API calls
    return [];
  }

  async collectAll(): Promise<CollectedAlternative[]> {
    const allAlternatives: CollectedAlternative[] = [];

    try {
      const openAltData = await this.collectFromOpenAlternative();
      allAlternatives.push(...openAltData);
    } catch (_error) {}

    try {
      const altToData = await this.collectFromAlternativeTo();
      allAlternatives.push(...altToData);
    } catch (_error) {}

    try {
      const ossData = await this.collectFromOSSAlternatives();
      allAlternatives.push(...ossData);
    } catch (_error) {}

    try {
      const openAltlyData = await this.collectFromOpenAltly();
      allAlternatives.push(...openAltlyData);
    } catch (_error) {}

    try {
      const githubData = await this.collectFromGitHub();
      allAlternatives.push(...githubData);
    } catch (_error) {}

    return this.deduplicateAlternatives(allAlternatives);
  }

  private deduplicateAlternatives(alternatives: CollectedAlternative[]): CollectedAlternative[] {
    const seen = new Set<string>();
    return alternatives.filter((alt) => {
      const key = alt.name.toLowerCase().trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}

// Data validation utilities
export function validateAlternative(alt: CollectedAlternative): boolean {
  return !!(
    alt.name &&
    alt.description &&
    alt.website &&
    alt.license &&
    alt.platforms.length > 0 &&
    alt.category &&
    alt.proprietaryAlternative
  );
}

export function sanitizeAlternative(alt: CollectedAlternative): CollectedAlternative {
  return {
    ...alt,
    name: alt.name.trim(),
    description: alt.description.trim(),
    website: alt.website.trim(),
    repository: alt.repository?.trim(),
    license: alt.license.trim(),
    platforms: alt.platforms.map((p) => p.trim()),
    category: alt.category.trim(),
    proprietaryAlternative: alt.proprietaryAlternative.trim(),
    features: alt.features.map((f) => f.trim()),
    pros: alt.pros.map((p) => p.trim()),
    cons: alt.cons.map((c) => c.trim()),
  };
}

// Data transformation utilities
export function transformToInternalFormat(
  collected: CollectedAlternative[]
): Record<string, unknown>[] {
  return collected.map((alt) => ({
    id: generateId(alt.name),
    name: alt.name,
    description: alt.description,
    website: alt.website,
    repository: alt.repository,
    categoryId: mapCategory(alt.category),
    proprietarySoftwareId: generateId(alt.proprietaryAlternative),
    license: alt.license,
    platforms: alt.platforms.map((name) => ({
      name,
      icon: getPlatformIcon(name),
      supported: true,
    })),
    features: alt.features.map((name) => ({
      name,
      description: "",
      available: true,
    })),
    pros: alt.pros,
    cons: alt.cons,
    rating: alt.rating || 0,
    reviewCount: alt.reviewCount || 0,
    bookmarkCount: 0,
    stars: alt.stars,
    forks: alt.forks,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

function mapCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    office: "office-suites",
    productivity: "office-suites",
    media: "media-players",
    audio: "media-players",
    video: "media-players",
    graphics: "graphic-design",
    design: "graphic-design",
    development: "development",
    programming: "development",
    communication: "communication",
    messaging: "communication",
  };

  return categoryMap[category.toLowerCase()] || "other";
}

function getPlatformIcon(platform: string): string {
  const iconMap: Record<string, string> = {
    Windows: "Monitor",
    macOS: "Apple",
    Linux: "Tux",
    Web: "Globe",
    Android: "Smartphone",
    iOS: "Smartphone",
  };

  return iconMap[platform] || "Monitor";
}
