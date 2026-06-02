export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  number: number;
  title: string;
  description: string;
  tags: { name: string; type: "tech" | "platform" }[];
  businessValue: string;
  features: string[];
  mockType: "fintech" | "chat" | "trade";
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
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
