import { SkillCategory, Project, Experience, Article } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Mobile",
    skills: ["Flutter", "Swift", "React Native", "iOS", "Kotlin"]
  },
  {
    category: "Frontend",
    skills: ["Vue.js", "React", "HTML5", "Tailwind CSS", "Nuxt.js", "TypeScript", "CSS3/Sass"]
  },
  {
    category: "Backend",
    skills: ["Laravel", "SQL", "PostgreSQL", "GraphQL", "PHP", "Node.js", "Redis"]
  },
  {
    category: "Architecture",
    skills: [
      "Clean Architecture",
      "System Design",
      "TDD",
      "Docker",
      "Microservices",
      "Design Patterns",
      "CI/CD"
    ]
  }
];

export const projects: Project[] = [
  {
    id: "quantumfin",
    number: 1,
    title: "QuantumFin - Global Fintech Platform",
    description: "Highly scalable digital wallet and cross-border routing service focusing on low-fee transaction pipelines.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "Firebase", type: "tech" }
    ],
    businessValue: "Streamlined cross-border payments, achieving 40% reduction in transaction fees and 3x faster settlements.",
    features: [
      "Real-time Currency Conversion",
      "Secure Biometric Authentication",
      "AI-Powered Insights",
      "Multi-currency Wallets"
    ],
    mockType: "fintech"
  },
  {
    id: "echoconnect",
    number: 2,
    title: "EchoConnect - Secure Real-time Chat",
    description: "Enterprise-grade real-time chat infrastructure designed for privacy-first secure collaboration.",
    tags: [
      { name: "Node.js", type: "tech" },
      { name: "WebSockets", type: "tech" }
    ],
    businessValue: "Supports thousands of concurrent active enterprise connections with sub-second latency.",
    features: [
      "End-to-end Encrypted Messaging",
      "Distributed Pub/Sub WebSockets",
      "Pristine Audit Logging",
      "High Reliability Routing"
    ],
    mockType: "chat"
  },
  {
    id: "apextrade",
    number: 3,
    title: "ApexTrade - Stock Exchange Interface",
    description: "Low-latency trading statistics dashboard with live matching engine diagnostics reporting.",
    tags: [
      { name: "React", type: "tech" },
      { name: "Go", type: "tech" },
      { name: "PostgreSQL", type: "tech" }
    ],
    businessValue: "Real-time stock candlestick visualizations and automated low-overhead execution.",
    features: [
      "Microsecond Match Precision",
      "Massive Concurrent Telemetry",
      "Dynamic Candle Charting",
      "Interactive Order Logs"
    ],
    mockType: "trade"
  }
];

export const experiences: Experience[] = [
  {
    id: "exp1",
    title: "Senior Mobile Developer",
    company: "Apex Solutions",
    duration: "2018-Present",
    achievements: [
      "Led development of iOS and Android apps with 500k+ global users, establishing clean monolithic and federated pipelines.",
      "Optimized native and cross-platform runtime configurations, reducing application crash rates by 40%.",
      "Implemented automated CI/CD deployment pipelines to streamline App Store and Google Play testing builds."
    ]
  },
  {
    id: "exp2",
    title: "Full-stack Software Architect",
    company: "Angkor Tech Systems",
    duration: "2015-2018",
    achievements: [
      "Designed and deployed responsive full-stack dashboards using PHP Laravel, React, and PostgreSQL clusters.",
      "Supervised database refactoring efforts that improved read throughput by 65% with Redis replication layers.",
      "Mentored junior engineering members on standard Clean Architecture frameworks and system design paradigms."
    ]
  },
  {
    id: "exp3",
    title: "Mobile Lead Specialist",
    company: "Silicon Village Labs",
    duration: "2013-2015",
    achievements: [
      "Pioneered enterprise client mobile application features with native iOS (Objective-C/Swift) and early hybrid layouts.",
      "Configured secure local SQLite encryption stores to meet stringent biometric security standards.",
      "Assisted product coordinators in managing agile lifecycles and delivering customer-facing utilities."
    ]
  }
];

export const articles: Article[] = [
  {
    id: "art1",
    title: "Navigating Flutter in Southeast Asia",
    excerpt: "Insights and strategic development practices for adopting Flutter inside high-density regional technology markets...",
    readTime: "3 min read",
    icon: "globe",
    category: "Mobile Design"
  },
  {
    id: "art2",
    title: "React Native Best Practices for Scalability",
    excerpt: "How to structure and modularize massive cross-platform applications to endure continuous enterprise team expansion...",
    readTime: "5 min read",
    icon: "code",
    category: "Architecture"
  },
  {
    id: "art3",
    title: "Building Resilient Backends with Node.js",
    excerpt: "Core architectural blueprints, cluster scaling parameters, and secure database pool setups for failsafe backend runtimes...",
    readTime: "3 min read",
    icon: "database",
    category: "Backend Scaling"
  }
];

// Content maps for the actual blog post detail view
export const articleContents: Record<string, { title: string; subtitle: string; content: string }> = {
  art1: {
    title: "Navigating Flutter in Southeast Asia",
    subtitle: "Strategic guidelines for adopting high-performance cross-platform software in local tech ecosystems.",
    content: `## The Southeast Asian Paradigm

In fast-paced, high-density mobile markets like Cambodia, Vietnam, and Thailand, memory limits and low bandwidth constraints are prime concerns during structural application drafting. Flutter has achieved major success because of direct GPU compilation and robust graphics representation, avoiding high JavaScript bridge overhead.

### Key Performance Strategies
- **Asset Aggressive Compression:** Restrict initial app load size under 45MB to increase local App Store conversions.
- **Local SQLite Caching:** Guarantee poor network functionality by cache syncing through reliable local databases (such as Hive or Isar).
- **Asynchronous Image Loaders:** Optimize network image assets using customized fade animations to lower browser CPU spikes.

### Conclusion
By adopting structured modular Flutter packages early, regional startups can deploy simultaneous iOS & Android applications with pristine visuals while cuting budget burdens in half.`
  },
  art2: {
    title: "React Native Best Practices for Scalability",
    subtitle: "Architectural blueprints for structuring large-scale codebases for collaborative team environments.",
    content: `## Designing for Shared Success

When a developer team expands beyond 5 mobile developers, monolithic structures with single component configurations quickly degrade. We must establish a strictly partitioned feature vertical structure to maximize code safety.

### Recommended Directory Structure
- \`src/features/auth\`: Fully encapsulated state, UI components, and API helpers for authentication.
- \`src/features/payments\`: Independent transaction gateways and settlement cards.
- \`src/shared/components\`: Low-dependency reusable design systems (e.g. customized Glass cards, headers, status indicators).

### Essential Best Practices
- **Never update state directly in component boundaries:** Always route deep business telemetry to dedicated providers or persistent handlers.
- **Use standard TypeScript interfaces:** Prevent production regression crashes using strict type bindings.
- **Automate automated linters:** Integrate pre-commit husky hooks running type assertions before push operations.`
  },
  art3: {
    title: "Building Resilient Backends with Node.js",
    subtitle: "Ensuring high-availability web service architectures under heavy server loads.",
    content: `## Crafting the Bulletproof Server

A node process is single-threaded. This design makes it fast for I/O operations but vulnerable to uncaught exceptions and computation bottlenecks. Implementing clustered microservices behind an active router is the absolute standard for enterprise scale.

### Core Architectural Blueprints
1. **Cluster Clustering Routing:** Bootstrap native cluster modules to utilize multiple CPU cores under heavy request rates.
2. **Exponential Database Fallbacks:** Guard query requests with strict pool connection parameters, implementing exponential backoff routines for recovery.
3. **Pulsing Health Heartbeats:** Expose automated system check lines (e.g., \`/api/health\`) connected directly with container orchestrators to manage instant restarts.

### Quick Server Guard Snippet
\`\`\`ts
import express from "express";
const app = express();

app.get("/api/health", async (req, res) => {
  const dbCheck = await checkDatabaseConnection();
  if (!dbCheck) {
    return res.status(503).json({ status: "Database Unavailable" });
  }
  res.json({ status: "OK", timestamp: new Date() });
});
\`\`\`

By deploying healthy, non-blocking check routes, you ensure constant service availability with zero downtime.`
  }
};
