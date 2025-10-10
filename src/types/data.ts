// Data types for the Open Alternatives website

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProprietarySoftware {
  id: string;
  name: string;
  description: string;
  website: string;
  logo?: string;
  categoryId: string;
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpenSourceAlternative {
  id: string;
  name: string;
  description: string;
  website: string;
  repository?: string;
  logo?: string;
  screenshots: string[];
  proprietarySoftwareId: string;
  categoryId: string;

  // Technical details
  license: string;
  platforms: Platform[];
  languages: string[];
  lastUpdated: Date;

  // Features and comparison
  features: Feature[];
  pros: string[];
  cons: string[];

  // Community metrics
  stars?: number;
  forks?: number;
  contributors?: number;

  // User engagement
  rating: number;
  reviewCount: number;
  bookmarkCount: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  name: string;
  icon: string;
  supported: boolean;
}

export interface Feature {
  name: string;
  description: string;
  available: boolean;
  notes?: string;
}

export interface Review {
  id: string;
  alternativeId: string;
  userId: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bookmarks: string[];
  reviews: string[];
  submissions: string[];
  createdAt: Date;
}

export interface SearchFilters {
  category?: string;
  license?: string;
  platform?: string;
  rating?: number;
  sortBy?: "popularity" | "rating" | "newest" | "name";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  alternatives: OpenSourceAlternative[];
  total: number;
  page: number;
  limit: number;
  filters: SearchFilters;
}

// Sample data structure for initial implementation
export const sampleCategories: Category[] = [
  {
    id: "office-suites",
    name: "Office Suites",
    description: "Word processors, spreadsheets, and presentation software",
    icon: "FileText",
    slug: "office-suites",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "media-players",
    name: "Media Players",
    description: "Audio and video playback software",
    icon: "Play",
    slug: "media-players",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description: "Image editing and design tools",
    icon: "Palette",
    slug: "graphic-design",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "development",
    name: "Development Tools",
    description: "IDEs, text editors, and development utilities",
    icon: "Code",
    slug: "development",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email clients, messaging, and video conferencing",
    icon: "MessageCircle",
    slug: "communication",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const sampleProprietarySoftware: ProprietarySoftware[] = [
  {
    id: "microsoft-office",
    name: "Microsoft Office",
    description: "Microsoft's productivity suite including Word, Excel, PowerPoint",
    website: "https://office.microsoft.com",
    categoryId: "office-suites",
    popularity: 95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Music streaming service with premium features",
    website: "https://spotify.com",
    categoryId: "media-players",
    popularity: 90,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    description: "Professional image editing and graphic design software",
    website: "https://adobe.com/products/photoshop",
    categoryId: "graphic-design",
    popularity: 88,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "sublime-text",
    name: "Sublime Text",
    description: "Sophisticated text editor for code, markup and prose",
    website: "https://sublimetext.com",
    categoryId: "development",
    popularity: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const sampleAlternatives: OpenSourceAlternative[] = [
  {
    id: "libreoffice",
    name: "LibreOffice",
    description: "Free and open source office suite with Writer, Calc, Impress, and more",
    website: "https://libreoffice.org",
    repository: "https://github.com/LibreOffice/core",
    categoryId: "office-suites",
    proprietarySoftwareId: "microsoft-office",
    screenshots: [],
    license: "MPL-2.0",
    platforms: [
      { name: "Windows", icon: "Monitor", supported: true },
      { name: "macOS", icon: "Apple", supported: true },
      { name: "Linux", icon: "Tux", supported: true },
    ],
    languages: ["C++", "Java", "Python"],
    lastUpdated: new Date(),
    features: [
      {
        name: "Word Processing",
        description: "Full-featured word processor",
        available: true,
      },
      {
        name: "Spreadsheets",
        description: "Advanced spreadsheet application",
        available: true,
      },
      {
        name: "Presentations",
        description: "Presentation creation tool",
        available: true,
      },
      {
        name: "Database",
        description: "Database management system",
        available: true,
      },
    ],
    pros: [
      "Completely free and open source",
      "Cross-platform compatibility",
      "Regular updates and community support",
      "Extensive format support",
    ],
    cons: [
      "Interface may feel dated compared to modern alternatives",
      "Some advanced features may be missing",
      "Large file size",
    ],
    stars: 1500,
    forks: 300,
    contributors: 200,
    rating: 4.2,
    reviewCount: 1250,
    bookmarkCount: 890,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "audacious",
    name: "Audacious",
    description: "Lightweight audio player with extensive format support",
    website: "https://audacious-media-player.org",
    repository: "https://github.com/audacious-media-player/audacious",
    categoryId: "media-players",
    proprietarySoftwareId: "spotify",
    screenshots: [],
    license: "BSD-2-Clause",
    platforms: [
      { name: "Windows", icon: "Monitor", supported: true },
      { name: "macOS", icon: "Apple", supported: true },
      { name: "Linux", icon: "Tux", supported: true },
    ],
    languages: ["C++", "C"],
    lastUpdated: new Date(),
    features: [
      {
        name: "Audio Playback",
        description: "High-quality audio playback",
        available: true,
      },
      {
        name: "Playlist Support",
        description: "Create and manage playlists",
        available: true,
      },
      {
        name: "Plugin System",
        description: "Extensible with plugins",
        available: true,
      },
      {
        name: "Streaming",
        description: "Internet radio streaming",
        available: true,
      },
    ],
    pros: [
      "Lightweight and fast",
      "Excellent audio quality",
      "Highly customizable",
      "Low resource usage",
    ],
    cons: [
      "No built-in music library",
      "Limited streaming services integration",
      "Basic interface",
    ],
    stars: 800,
    forks: 150,
    contributors: 50,
    rating: 4.0,
    reviewCount: 320,
    bookmarkCount: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    description: "Free, open source code editor with excellent extensions and debugging support",
    website: "https://code.visualstudio.com",
    repository: "https://github.com/microsoft/vscode",
    categoryId: "development",
    proprietarySoftwareId: "sublime-text",
    screenshots: [],
    license: "MIT",
    platforms: [
      { name: "Windows", icon: "Monitor", supported: true },
      { name: "macOS", icon: "Apple", supported: true },
      { name: "Linux", icon: "Tux", supported: true },
      { name: "Web", icon: "Globe", supported: true },
    ],
    languages: ["TypeScript", "JavaScript", "C++"],
    lastUpdated: new Date(),
    features: [
      {
        name: "IntelliSense",
        description: "Smart code completion and suggestions",
        available: true,
      },
      {
        name: "Debugging",
        description: "Built-in debugger with breakpoints",
        available: true,
      },
      {
        name: "Extensions",
        description: "Rich extension ecosystem",
        available: true,
      },
      {
        name: "Git Integration",
        description: "Built-in Git support",
        available: true,
      },
    ],
    pros: [
      "Free and open source",
      "Excellent extension ecosystem",
      "Great debugging tools",
      "Cross-platform support",
      "Regular updates",
    ],
    cons: [
      "Can be resource intensive",
      "Large download size",
      "Microsoft-owned (though open source)",
    ],
    stars: 150000,
    forks: 26000,
    contributors: 1000,
    rating: 4.8,
    reviewCount: 5000,
    bookmarkCount: 12000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "vim",
    name: "Vim",
    description: "Highly configurable text editor built for efficient text editing",
    website: "https://vim.org",
    repository: "https://github.com/vim/vim",
    categoryId: "development",
    proprietarySoftwareId: "sublime-text",
    screenshots: [],
    license: "Vim License",
    platforms: [
      { name: "Windows", icon: "Monitor", supported: true },
      { name: "macOS", icon: "Apple", supported: true },
      { name: "Linux", icon: "Tux", supported: true },
    ],
    languages: ["C", "Vim script"],
    lastUpdated: new Date(),
    features: [
      {
        name: "Modal Editing",
        description: "Different modes for different editing tasks",
        available: true,
      },
      {
        name: "Extensibility",
        description: "Highly customizable with plugins",
        available: true,
      },
      {
        name: "Keyboard Shortcuts",
        description: "Efficient keyboard-driven editing",
        available: true,
      },
      {
        name: "Syntax Highlighting",
        description: "Support for many programming languages",
        available: true,
      },
    ],
    pros: [
      "Extremely fast and lightweight",
      "Powerful keyboard shortcuts",
      "Highly customizable",
      "Available everywhere",
      "Large plugin ecosystem",
    ],
    cons: [
      "Steep learning curve",
      "Not beginner-friendly",
      "Modal editing can be confusing",
      "Outdated interface",
    ],
    stars: 30000,
    forks: 5000,
    contributors: 200,
    rating: 4.3,
    reviewCount: 2000,
    bookmarkCount: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "emacs",
    name: "GNU Emacs",
    description: "Extensible, customizable text editor with Lisp-based extension language",
    website: "https://gnu.org/software/emacs",
    repository: "https://git.savannah.gnu.org/cgit/emacs.git",
    categoryId: "development",
    proprietarySoftwareId: "sublime-text",
    screenshots: [],
    license: "GPL-3.0",
    platforms: [
      { name: "Windows", icon: "Monitor", supported: true },
      { name: "macOS", icon: "Apple", supported: true },
      { name: "Linux", icon: "Tux", supported: true },
    ],
    languages: ["C", "Emacs Lisp"],
    lastUpdated: new Date(),
    features: [
      {
        name: "Lisp Extensions",
        description: "Extensible with Emacs Lisp",
        available: true,
      },
      {
        name: "Org Mode",
        description: "Powerful note-taking and organization",
        available: true,
      },
      {
        name: "Magit",
        description: "Excellent Git interface",
        available: true,
      },
      {
        name: "Multiple Buffers",
        description: "Work with multiple files simultaneously",
        available: true,
      },
    ],
    pros: [
      "Highly extensible",
      "Powerful Org mode",
      "Excellent Git integration",
      "Cross-platform",
      "Free software",
    ],
    cons: [
      "Complex for beginners",
      "Lisp learning curve",
      "Can be slow with many extensions",
      "Memory usage can be high",
    ],
    stars: 2000,
    forks: 500,
    contributors: 100,
    rating: 4.1,
    reviewCount: 800,
    bookmarkCount: 1500,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
