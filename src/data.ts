import { SkillCategory, Project, Experience, Article } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Mobile Engineering",
    description:
      "Production Flutter development for secure, multilingual apps across finance, commerce, POS, chat, and exchange products.",
    skills: [
      "Flutter",
      "Dart",
      "Bloc/Cubit",
      "GetX",
      "Provider",
      "GoRouter",
      "iOS",
      "Android",
    ],
    usedIn: ["DV Pay", "HTP", "Point Food", "Exchange Apps"],
  },
  {
    category: "Backend Skills",
    description:
      "Laravel and API-focused backend work for admin panels, dashboards, authentication, integrations, forms, and business workflows.",
    skills: [
      "Laravel",
      "PHP",
      "REST APIs",
      "SQL",
      "Authentication",
      "API Integration",
      "Admin Panels",
      "Data Tables",
    ],
    usedIn: ["Admin Workflows", "Business Systems", "Laravel + Vue"],
  },
  {
    category: "Frontend UI",
    description:
      "Vue and TypeScript interfaces with responsive layouts, reusable components, dashboard screens, and client-facing product flows.",
    skills: [
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Responsive UI",
      "Component Design",
      "Dashboard UI",
      "Form Validation",
    ],
    usedIn: ["KOFI", "KONFULON", "Dashboard UI"],
  },
  {
    category: "Fintech & Delivery",
    description:
      "Payment integrations, secure transaction flows, real-time communication, notifications, and mobile release readiness.",
    skills: [
      "KHQR",
      "Bakong",
      "ABA PayWay",
      "Acleda XPay",
      "WebSocket",
      "Firebase Messaging",
      "Pushy",
      "Secure Storage",
      "SIT/UAT",
    ],
    usedIn: ["DV Pay", "HTP", "KOFI", "KONFULON"],
  },
];

export const projects: Project[] = [
  {
    id: "dvpay",
    number: 1,
    title: "DV Pay - Mobile Banking App",
    company: "AIBODIA TECHNOLOGY CO., LTD",
    role: "Mobile Team Lead / Frontend Developer",
    scope: "Digital banking, payments, KYC, merchant services, and transfers",
    description:
      "A Flutter mobile banking app built for everyday financial workflows, including authentication, account management, QR payments, Bakong and local bank transfers, KYC, merchant services, favorites, and transaction confirmation.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "Bloc/Cubit", type: "tech" },
      { name: "Dio", type: "tech" },
      { name: "Bakong", type: "platform" },
    ],
    businessValue:
      "Lead the V2 mobile experience redesign and improved the reliability of key payment flows, including QR validation, balance refresh, failed-transaction handling, and release preparation.",
    features: [
      "Dual-currency KHQR",
      "Bakong Account Linking",
      "Biometric Auth & Payment PIN",
      "Retry/Polling Payment Flow",
    ],
    technicalHighlights: [
      "Implemented secure storage, KYC eligibility checks, and protected transfer confirmation behavior",
      "Improved socket handling, offline states, API request flow, and failed-transaction recovery",
      "Supported Khmer, English, Chinese, Vietnamese, and Thai localization",
    ],
    mockType: "fintech",
  },
  {
    id: "htp",
    number: 2,
    title: "HTP - Mobile Financial App",
    company: "AIBODIA TECHNOLOGY CO., LTD",
    role: "Mobile Team Lead / Frontend Developer",
    scope:
      "Card services, top-up payments, QR transfers, KYC, and notifications",
    description:
      "A Flutter financial services app focused on card services, top-up payments, QR transfers, KYC, favorites, profile management, notifications, and transaction workflows.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "Bloc/Cubit", type: "tech" },
      { name: "WebSocket", type: "tech" },
      { name: "Pushy", type: "platform" },
    ],
    businessValue:
      "Improved production stability by refining socket events, notification behavior, force logout handling, payment states, and release preparation.",
    features: [
      "Card Request & Limits",
      "Top-up Payment Countdown",
      "Favorite Transfer Flow",
      "GoRouter Migration",
    ],
    technicalHighlights: [
      "Improved card fee handling, provider synchronization, top-up history, and transaction records",
      "Integrated Pushy notifications and improved unread badges, maintenance messages, and root socket behavior",
      "Prepared Shorebird support, App Store export settings, AAB/APK scripts, and app versioning",
    ],
    mockType: "htp",
  },
  {
    id: "chat-audio-call",
    number: 3,
    title: "Chat App & Audio Call Package",
    company: "DR Tech Co., Ltd",
    role: "Senior Flutter Developer",
    scope:
      "Secure chat, tablet/mobile UI, and customer service audio call package",
    description:
      "A Flutter chat experience and reusable audio call package supporting text, media, file sharing, voice messages, and customer service calls.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "Azure ACS", type: "platform" },
      { name: "Sockets", type: "tech" },
    ],
    businessValue:
      "Delivered mobile and tablet messaging experiences and packaged Azure Communication Services audio calling for internal support workflows.",
    features: [
      "Text/Media/File Chat",
      "Voice Messages",
      "Audio Calls",
      "Reusable Package",
    ],
    technicalHighlights: [
      "Built Flutter mobile and tablet screens from UX/UI requirements",
      "Integrated platform-specific audio behavior into an internal service app",
      "Improved responsiveness, caching, and overall mobile performance",
    ],
    mockType: "chat",
  },
  {
    id: "stock-coin-exchange",
    number: 4,
    title: "Stock & Coin Exchange Apps",
    company: "DR Tech Co., Ltd",
    role: "Senior Flutter Developer",
    scope:
      "Real-time market data, trading flows, transaction status, and history",
    description:
      "Flutter stock and coin exchange apps with real-time prices, market listings, buy/sell workflows, invoices, issue reports, and transaction history.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "BLoC", type: "tech" },
      { name: "Dio", type: "tech" },
      { name: "Live Activity", type: "platform" },
    ],
    businessValue:
      "Built market-facing workflows for real-time socket updates, trade execution, transaction records, and native iOS status visibility.",
    features: [
      "Real-time Price Listing",
      "Buy/Sell Workflows",
      "Issue Reports",
      "iOS Live Activity",
    ],
    technicalHighlights: [
      "Created GetX/MVC and BLoC/API Manager architecture patterns",
      "Handled socket updates for live financial data",
      "Implemented invoice lists, stock history, and transaction history flows",
    ],
    mockType: "trade",
  },
  {
    id: "kofi-konfulon",
    number: 5,
    title: "KOFI & KONFULON E-commerce Apps",
    company: "IG International Group",
    role: "Flutter Developer / Vue Developer",
    scope:
      "E-commerce, inventory, checkout, promotions, and local payment integrations",
    description:
      "Flutter and Vue commerce products covering product listings, checkout, favorites, promotions, inventory workflows, payment gateways, and production delivery.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "Vue", type: "tech" },
      { name: "GetX", type: "tech" },
      { name: "ABA PayWay", type: "platform" },
    ],
    businessValue:
      "Turned client requirements into production e-commerce features and integrated local payment services including Acleda XPay and ABA PayWay.",
    features: [
      "Product Listing",
      "Checkout & Favorites",
      "Promotions",
      "Bank Payment Gateway",
    ],
    technicalHighlights: [
      "Built GetX/MVC and Provider/MVVM app architectures",
      "Integrated internal and third-party APIs",
      "Managed staging and production deployment workflows",
    ],
    mockType: "commerce",
  },
  {
    id: "pos-food",
    number: 6,
    title: "POS, Restaurant & Food Delivery Apps",
    company: "SoftPoint AutoID",
    role: "Flutter Developer",
    scope:
      "Restaurant operations, POS workflows, food court, and delivery apps",
    description:
      "Mobile apps for restaurant, food court, and delivery operations, including Point Restaurant App, Point Food, and an internal Food Court application.",
    tags: [
      { name: "Flutter", type: "tech" },
      { name: "POS", type: "platform" },
      { name: "Restaurant", type: "platform" },
    ],
    businessValue:
      "Delivered practical mobile workflows for restaurant operations, order handling, testing, deployment, and internal food-service processes.",
    features: [
      "Point Restaurant App",
      "Point Food",
      "Food Court App",
      "POS Workflows",
    ],
    technicalHighlights: [
      "Developed, tested, and deployed customer-facing and internal mobile apps",
      "Mapped operational POS requirements into usable screens and workflows",
      "Supported QA, release packaging, and business workflow iteration",
    ],
    mockType: "pos",
  },
  {
    id: "business-systems",
    number: 7,
    title: "MOI, Document Management & HR Training Systems",
    company: "Digitalsky Multimedia / OneTV",
    role: "Software Developer",
    scope: "Business systems, mobile apps, HR training, and document workflows",
    description:
      "Business and media operation systems including MOI New Cambodia, Skyone document management, and an online training system for HR.",
    tags: [
      { name: "Mobile", type: "tech" },
      { name: "Business Systems", type: "platform" },
      { name: "Workflow", type: "tech" },
    ],
    businessValue:
      "Supported requirement analysis, workflow planning, product maintenance, and feature delivery based on business needs and user feedback.",
    features: [
      "MOI New Cambodia",
      "Document Management",
      "Online Training",
      "System Maintenance",
    ],
    technicalHighlights: [
      "Contributed to requirement analysis and workflow planning",
      "Maintained existing systems and added new features",
      "Built internal tools for HR and document operations",
    ],
    mockType: "systems",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp1",
    title: "Mobile Team Lead / Frontend Developer",
    company: "AIBODIA TECHNOLOGY CO., LTD",
    duration: "Recent",
    summary:
      "Led production Flutter fintech apps across digital banking, card services, payments, KYC, localization, real-time communication, and iOS/Android release delivery.",
    focus: [
      "Digital banking",
      "Payments",
      "KYC",
      "Card services",
      "Release readiness",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Bloc/Cubit",
      "Dio",
      "WebSocket",
      "Hive",
      "Secure Storage",
      "Firebase Messaging",
      "Pushy",
      "Shorebird",
    ],
    projects: ["DV Pay Mobile Banking App", "HTP Mobile Financial App"],
    achievements: [
      "Owned major mobile modules across QR payments, Bakong transfers, local bank transfers, top-ups, merchant services, favorites, notifications, profile, and transactions.",
      "Built security-sensitive flows for biometric authentication, payment PIN, password validation, secure storage, KYC checks, and transfer confirmation.",
      "Improved reliability through socket refactoring, offline handling, API flow cleanup, failed-payment recovery, localization fixes, SIT/UAT builds, and production release preparation.",
    ],
  },
  {
    id: "exp2",
    title: "Senior Flutter Developer",
    company: "DR Tech Co., Ltd",
    duration: "Previous",
    summary:
      "Built Flutter apps for chat, customer service audio calls, stock exchange, and coin exchange platforms, with real-time data and native integrations.",
    focus: [
      "Chat",
      "Audio calls",
      "Exchange apps",
      "Real-time sockets",
      "Native iOS status",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "GetX",
      "MVC",
      "BLoC",
      "Dio",
      "Sockets",
      "Azure Communication Services",
      "iOS Live Activity",
    ],
    projects: [
      "Chat App",
      "Customer Service Audio Call Package",
      "Stock Exchange App",
      "Coin Exchange App",
    ],
    achievements: [
      "Implemented chat features for text, media, file sharing, voice messages, and audio calls.",
      "Built a reusable Flutter audio call package with Azure Communication Services for an internal customer service app.",
      "Designed exchange app architecture and delivered real-time pricing, buy/sell flows, history, invoices, issue reports, transaction records, sockets, and iOS Live Activity.",
    ],
  },
  {
    id: "exp3",
    title: "Flutter Developer / Vue Developer",
    company: "IG International Group",
    duration: "Previous",
    summary:
      "Delivered e-commerce and inventory products with Flutter and Vue, including local bank payment integrations and client-facing feature delivery.",
    focus: [
      "E-commerce",
      "Inventory",
      "Payment gateways",
      "Client requirements",
      "Deployment",
    ],
    techStack: [
      "Flutter",
      "Vue",
      "GetX",
      "MVC",
      "Provider",
      "MVVM",
      "REST APIs",
      "Acleda XPay",
      "ABA PayWay",
    ],
    projects: [
      "KOFI E-commerce App",
      "KONFULON E-commerce App",
      "Inventory Management Products",
    ],
    achievements: [
      "Built KOFI and KONFULON mobile/tablet experiences for product listings, checkout, favorites, promotions, and payment flows.",
      "Integrated internal APIs, third-party APIs, and local payment services including Acleda XPay and ABA PayWay.",
      "Implemented GetX/MVC and Provider/MVVM architectures, managed staging/production deployments, and worked directly with clients to ship requirements.",
    ],
  },
  {
    id: "exp4",
    title: "Flutter Developer",
    company: "SoftPoint AutoID",
    duration: "Previous",
    summary:
      "Developed POS-related mobile apps for restaurant, food court, and delivery operations, including testing and deployment support.",
    focus: [
      "POS",
      "Restaurant apps",
      "Food delivery",
      "Internal tools",
      "Deployment",
    ],
    techStack: [
      "Flutter",
      "Mobile UI",
      "POS Workflows",
      "QA",
      "Release Packaging",
    ],
    projects: ["Point Restaurant App", "Point Food", "Internal Food Court App"],
    achievements: [
      "Developed, tested, and deployed Point Restaurant App, Point Food, and an internal Food Court app.",
      "Supported restaurant and food-service workflows, mobile delivery, QA, and release packaging.",
      "Translated POS requirements into practical mobile screens for internal teams and customer-facing workflows.",
    ],
  },
  {
    id: "exp5",
    title: "Software Developer",
    company: "Digitalsky Multimedia / OneTV",
    duration: "Earlier",
    summary:
      "Built and maintained business systems for media and internal operations, including mobile apps, document management, and HR training workflows.",
    focus: [
      "Business systems",
      "Document workflows",
      "HR training",
      "Product maintenance",
      "Requirement analysis",
    ],
    techStack: [
      "Mobile Apps",
      "Business Workflows",
      "Document Management",
      "Training Systems",
      "Maintenance",
    ],
    projects: [
      "MOI New Cambodia",
      "Skyone Document Management System",
      "Online Training App/System for HR",
    ],
    achievements: [
      "Developed MOI New Cambodia, a Skyone document management system, and an online training system for HR.",
      "Supported requirement analysis, workflow planning, product maintenance, and feature delivery based on business needs and feedback.",
      "Maintained existing systems and added features for internal business and media operations.",
    ],
  },
];

export const articles: Article[] = [
  {
    id: "art1",
    title: "Stabilizing Flutter Fintech Payment Flows",
    excerpt:
      "Practical patterns for QR validation, retry and polling states, failed transaction handling, and secure confirmation UX.",
    readTime: "4 min read",
    icon: "globe",
    category: "Fintech Mobile",
  },
  {
    id: "art2",
    title: "Building Maintainable Flutter Architecture",
    excerpt:
      "How Bloc/Cubit, Dio, reusable widgets, local caching, and modular routes keep large Flutter apps maintainable.",
    readTime: "5 min read",
    icon: "code",
    category: "Architecture",
  },
  {
    id: "art3",
    title: "Mobile Release Readiness for iOS and Android",
    excerpt:
      "A release-focused checklist for SIT/UAT builds, Flutter upgrades, Gradle updates, App Store exports, and production fixes.",
    readTime: "3 min read",
    icon: "database",
    category: "Delivery",
  },
];

export const articleContents: Record<
  string,
  { title: string; subtitle: string; content: string }
> = {
  art1: {
    title: "Stabilizing Flutter Fintech Payment Flows",
    subtitle:
      "Practical mobile lessons from QR, Bakong, KYC, and transfer workflows.",
    content: `## Payment Flows Need State Discipline

Fintech screens rarely fail because of one big issue. They fail when small state gaps stack together: an old balance, a duplicate tap, a missing failed state, a network timeout, or a confirmation screen that does not protect the transaction clearly enough.

### Patterns That Matter
- **Explicit transaction states:** Keep pending, retrying, success, failed, expired, and cancelled states separate.
- **Protected confirmation behavior:** Treat transfer confirmation, payment PIN, and biometric checks as security boundaries.
- **Network-aware UX:** Handle no-internet, socket reconnects, stale balances, and API retries without hiding the real payment status.
- **Localized validation:** Khmer and multilingual validation should be clear, consistent, and screen-safe.

### Conclusion
Good fintech mobile work is less about flashy screens and more about making every payment state honest, recoverable, and easy for users to trust.`,
  },
  art2: {
    title: "Building Maintainable Flutter Architecture",
    subtitle:
      "Architecture habits that keep production Flutter apps stable as feature scope grows.",
    content: `## Keep Feature Boundaries Clear

Large Flutter applications stay manageable when each module owns its state, API flow, validation, and UI responsibilities. This is especially important for banking, card, KYC, transfer, profile, and notification modules.

### Practical Building Blocks
- **Bloc/Cubit for predictable state:** Keep screen events, loading states, and error handling readable.
- **Dio repositories:** Centralize request behavior, auth headers, retries, and error mapping.
- **Generated serializers:** Reduce fragile manual parsing across transaction and profile models.
- **Reusable widgets:** Build consistent bottom sheets, dialogs, empty states, form controls, and confirmation panels.
- **Local caching:** Use Hive or secure storage where offline behavior and protected data matter.

### Essential Best Practices
- **Separate navigation from business state:** Route cleanup and GoRouter migrations are easier when state is not hidden inside navigation code.
- **Keep localization generated:** Missing keys and inconsistent translations become production bugs in multilingual apps.
- **Prepare release scripts early:** AAB/APK, iOS export, versioning, and environment setup should be repeatable.`,
  },
  art3: {
    title: "Mobile Release Readiness for iOS and Android",
    subtitle:
      "What needs attention before SIT, UAT, App Store, Google Play, and production fixes.",
    content: `## Release Readiness Is Engineering Work

Mobile release work is more than building an APK or archiving an IPA. A stable release needs environment checks, SDK compatibility, native configuration, version discipline, and clear QA handoff.

### Checklist Areas
1. **Build configuration:** Confirm Flutter SDK, Android Gradle, bundle identifiers, signing, and App Store export settings.
2. **Runtime integrations:** Recheck Firebase Messaging, Pushy, deep links, WebSocket sessions, and force-logout behavior.
3. **Payment safety:** Verify payment countdowns, retry/polling flows, success/failure pages, and duplicate submission protection.
4. **Localization:** Check Khmer, English, Chinese, Vietnamese, Thai, and missing-key behavior where supported.

Production confidence comes from making these checks boring and repeatable before every SIT, UAT, and release build.`,
  },
};
