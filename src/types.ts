export interface SkillCategory {
  category: string;
  description?: string;
  skills: string[];
  usedIn?: string[];
}

export interface Project {
  id: string;
  number: number;
  title: string;
  company?: string;
  role?: string;
  scope?: string;
  description: string;
  tags: { name: string; type: "tech" | "platform" }[];
  businessValue: string;
  features: string[];
  technicalHighlights?: string[];
  storeLinks?: {
    appStore?: string;
    googlePlay?: string;
  };
  mockType: "fintech" | "htp" | "chat" | "trade" | "commerce" | "pos" | "systems";
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  summary?: string;
  focus?: string[];
  techStack?: string[];
  projects?: string[];
  achievements: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  icon: string;
  category: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
