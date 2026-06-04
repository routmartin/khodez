import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  Database,
  Download,
  Dribbble,
  Github,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Smartphone,
  Sun,
  Twitter,
} from "lucide-vue-next";
import { HeroVisuals } from "./components/HeroVisuals";
import { ProjectMockups } from "./components/ProjectMockups";
import { AIChatBot } from "./components/AIChatBot";
import { MagneticLink } from "./components/MagneticLink";
import {
  skillCategories,
  projects,
  experiences,
  articles,
  articleContents,
} from "./data";
import type { Project } from "./types";

export default defineComponent({
  name: "App",
  setup() {
    const activeSection = ref("hero");
    const theme = ref(
      typeof window !== "undefined"
        ? localStorage.getItem("portfolio-theme") || "dark"
        : "dark",
    );
    const copiedEmail = ref(false);
    const copiedPhone = ref(false);
    const selectedArticleId = ref<string | null>(null);
    const selectedProjectId = ref<string | null>(null);
    const selectedExperienceDialogId = ref<string | null>(null);
    const selectedExpId = ref("exp1");
    const activeExpertiseIndex = ref(0);
    const scrollPercent = ref(0);
    const typedRoles = [
      "Hello, my name is Rout Martin.",
    ];
    const typedRole = ref(typedRoles[0]);
    const observedSectionIds = [
      "hero",
      "experience",
      "expertise",
      "work",
      "contact",
    ] as const;
    let revealObserver: IntersectionObserver | undefined;
    let sectionObserver: IntersectionObserver | undefined;
    let typingTimeout: number | undefined;

    watch(
      theme,
      (nextTheme) => {
        const root = document.documentElement;
        root.classList.toggle("light", nextTheme === "light");
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio-theme", nextTheme);
        }
      },
      { immediate: true },
    );

    watch(selectedArticleId, () => {
      scrollPercent.value = 0;
    });

    onMounted(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const revealTargets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]"),
      );

      if (prefersReducedMotion) {
        revealTargets.forEach((element) => {
          element.classList.add("is-revealed");
        });
      } else {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add("is-revealed");
              revealObserver?.unobserve(entry.target);
            });
          },
          {
            threshold: 0.16,
            rootMargin: "0px 0px -12% 0px",
          },
        );

        revealTargets.forEach((element) => {
          revealObserver?.observe(element);
        });
      }

      if (!prefersReducedMotion) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        typedRole.value = "";

        const runTypingLoop = () => {
          const currentRole = typedRoles[roleIndex];

          if (isDeleting) {
            charIndex -= 1;
            typedRole.value = currentRole.slice(0, Math.max(charIndex, 0));
          } else {
            charIndex += 1;
            typedRole.value = currentRole.slice(0, charIndex);
          }

          if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingTimeout = window.setTimeout(runTypingLoop, 1500);
            return;
          }

          if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % typedRoles.length;
            typingTimeout = window.setTimeout(runTypingLoop, 420);
            return;
          }

          typingTimeout = window.setTimeout(
            runTypingLoop,
            isDeleting ? 42 : 78,
          );
        };

        typingTimeout = window.setTimeout(runTypingLoop, 360);
      }

      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (left, right) => right.intersectionRatio - left.intersectionRatio,
            );

          if (visibleEntries.length === 0) {
            return;
          }

          activeSection.value = visibleEntries[0].target.id;
        },
        {
          threshold: [0.2, 0.35, 0.5, 0.7],
          rootMargin: "-20% 0px -45% 0px",
        },
      );

      observedSectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          sectionObserver?.observe(section);
        }
      });
    });

    onBeforeUnmount(() => {
      revealObserver?.disconnect();
      sectionObserver?.disconnect();
      if (typingTimeout) {
        window.clearTimeout(typingTimeout);
      }
    });

    const toggleTheme = () => {
      theme.value = theme.value === "dark" ? "light" : "dark";
    };

    const setActiveExpertise = (index: number) => {
      const itemCount = 4;
      activeExpertiseIndex.value = (index + itemCount) % itemCount;
    };

    const getExpertiseSliderOffset = (index: number, itemCount: number) => {
      let offset = index - activeExpertiseIndex.value;
      const half = Math.floor(itemCount / 2);

      if (offset > half) {
        offset -= itemCount;
      }

      if (offset < -half) {
        offset += itemCount;
      }

      return offset;
    };

    const handleCopyEmail = () => {
      navigator.clipboard.writeText("ounroutcambodia@gmail.com");
      copiedEmail.value = true;
      window.setTimeout(() => {
        copiedEmail.value = false;
      }, 2000);
    };

    const handleCopyPhone = () => {
      navigator.clipboard.writeText("+855 95 530 65");
      copiedPhone.value = true;
      window.setTimeout(() => {
        copiedPhone.value = false;
      }, 2000);
    };

    const activeArticle = computed(
      () =>
        articles.find((article) => article.id === selectedArticleId.value) ||
        null,
    );
    const activeArticleText = computed(() =>
      selectedArticleId.value ? articleContents[selectedArticleId.value] : null,
    );
    const activeProject = computed(
      () =>
        projects.find((project) => project.id === selectedProjectId.value) ||
        null,
    );
    const usedInChipAccents = [
      "56 189 248",
      "52 211 153",
      "129 140 248",
      "217 70 239",
      "251 191 36",
      "45 212 191",
      "34 211 238",
    ];
    const getUsedInChipStyle = (value: string, seed = 0) => {
      let hash = 0;
      const target = `${value}-${seed}`;
      for (let idx = 0; idx < target.length; idx += 1) {
        hash = (hash << 5) - hash + target.charCodeAt(idx);
        hash |= 0;
      }
      return {
        "--chip-accent": usedInChipAccents[Math.abs(hash) % usedInChipAccents.length],
      } as Record<string, string>;
    };

    return () => {
      const article = activeArticle.value;
      const articleText = activeArticleText.value;
      const experienceDialog =
        experiences.find(
          (item) => item.id === selectedExperienceDialogId.value,
        ) || null;
      const featuredProject = projects[0];
      const secondaryProjects = projects.slice(1);
      const projectDialog = activeProject.value;
      const expertiseCards = [
        {
          label: "Mobile",
          title: "Mobile App Development",
          description:
            "Flutter and Dart mobile development for banking, payments, e-commerce, POS, chat, and exchange products across iOS and Android.",
          theme: "sky",
          badgeClass: "border-sky-400/20 bg-sky-400/10 text-sky-300",
          iconClass: "bg-sky-500/10 border-sky-500/20 text-sky-400",
          icon: <Smartphone class="w-6 h-6" />,
        },
        {
          label: "Web",
          title: "Laravel & Vue Web Apps",
          description:
            "Laravel, PHP, Vue, and TypeScript work for admin panels, dashboards, API-driven interfaces, forms, data tables, and client-facing business workflows.",
          theme: "emerald",
          badgeClass: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
          iconClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          icon: <Database class="w-6 h-6" />,
        },
        {
          label: "Payments",
          title: "Payment Integrations",
          description:
            "Hands-on experience with Bakong, KHQR, local bank payments, payment PIN, biometric authentication, secure storage, and transaction state handling.",
          theme: "violet",
          badgeClass: "border-purple-400/20 bg-purple-400/10 text-purple-300",
          iconClass: "bg-purple-500/10 border-purple-500/20 text-purple-400",
          icon: <Database class="w-6 h-6" />,
        },
        {
          label: "Leadership",
          title: "Technical Leadership",
          description:
            "Leading mobile architecture, release readiness, localization quality, socket behavior, QA handoff, and production issue resolution for financial apps.",
          theme: "indigo",
          badgeClass: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
          iconClass: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
          icon: <Cpu class="w-6 h-6" />,
        },
      ];
      const navLinkClass = (sectionId: string) =>
        `nav-link px-4 py-1.5 rounded-full transition-all duration-300 ${
          activeSection.value === sectionId
            ? "nav-link--active bg-white/10 text-white font-semibold"
            : "text-white/60 hover:text-white"
        }`;

      return (
        <div class="min-h-screen bg-brand-bg text-gray-200 selection:bg-indigo-500/30 relative overflow-hidden">
          {/* BACKGROUND GRAPHICS: Floating subtle radial background gradients to give "liquid space" depth */}
          <div class="motion-float-slow absolute top-10 left-1/4 w-[400px] h-[400px] theme-blob theme-blob-one filter blur-[100px] rounded-full pointer-events-none"></div>
          <div class="motion-float-slow motion-delay-2 absolute top-[40%] right-10 w-[500px] h-[500px] theme-blob theme-blob-two filter blur-[120px] rounded-full pointer-events-none"></div>
          <div class="motion-float-slow motion-delay-3 absolute bottom-20 left-10 w-[450px] h-[450px] theme-blob theme-blob-three filter blur-[110px] rounded-full pointer-events-none"></div>

          {/* 1. STICKY GLASS NAVIGATION BAR */}
          <nav
            id="floating-navbar"
            class="sticky top-4 z-40 max-w-5xl mx-auto px-4 mt-4 select-none"
          >
            <div class="glass-container nav-shell rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-xl">
              {/* Logo brand */}
              <a
                href="#hero"
                onClick={() => {
                  activeSection.value = "hero";
                }}
                class="flex items-center gap-2 group"
              >
                <span class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20">
                  R
                </span>
              </a>

              {/* Nav Items */}
              <div class="hidden md:flex items-center gap-1.5 font-mono text-xs">
                <a
                  href="#experience"
                  onClick={() => {
                    activeSection.value = "experience";
                  }}
                  class={navLinkClass("experience")}
                >
                  Experience
                </a>
                <a
                  href="#expertise"
                  onClick={() => {
                    activeSection.value = "expertise";
                  }}
                  class={navLinkClass("expertise")}
                >
                  Skills
                </a>
                <a
                  href="#work"
                  onClick={() => {
                    activeSection.value = "work";
                  }}
                  class={navLinkClass("work")}
                >
                  Work
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    activeSection.value = "contact";
                  }}
                  class={navLinkClass("contact")}
                >
                  Contact
                </a>
              </div>

              {/* Actions (Theme Toggle & CV Download) */}
              <div class="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  class="motion-soft-lift p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer flex items-center justify-center w-8 h-8 focus:outline-none"
                  title={
                    theme.value === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"
                  }
                >
                  {theme.value === "dark" ? (
                    <Sun class="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon class="w-4 h-4" />
                  )}
                </button>

                <a
                  href="https://ai.studio/build"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="motion-shimmer motion-soft-lift flex items-center gap-1.5 px-4.5 py-1.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/25 text-white font-mono text-xs font-medium transition-all cursor-pointer"
                >
                  <Download class="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </nav>

          {/* 2. CORE MASTER PAGE LAYOUT CONTAINER */}
         <main class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-24 relative select-text">
            {/* HERO TITLE & VISUAL SECTION */}
            <section
              id="hero"
              class="section-anchor flex flex-col items-center gap-8 md:gap-10 text-center relative"
            >
              <div
                class="max-w-3xl flex flex-col items-center gap-5 reveal-on-scroll reveal-delay-1"
                data-reveal
              >
             

                {/* Typography Heading paired with Outfit font */}
                <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Mobile Team Lead & Full Stack Web <br class="hidden sm:inline" />
                  <span class="bg-gradient-to-r from-blue-400 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    with Laravel & Vue
                  </span>
                </h1>
  <div
                  class="typing-role min-h-[32px] inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-1.5 font-mono text-sm sm:text-base text-cyan-300 select-none"
                  aria-label={`Current focus: ${typedRole.value || typedRoles[0]}`}
                >
                  
                  <span class="min-w-[20ch] sm:min-w-[28ch] text-left font-semibold text-cyan-200">
                    {typedRole.value || typedRoles[0]}
                  </span>
                  <span class="typing-cursor" aria-hidden="true"></span>
                </div>
                {/* Subheading text with wide margins for air */}
                <p class="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
                  I build production Flutter mobile apps and full stack web
                  systems for digital banking, payments, KYC, card services,
                  e-commerce, POS, and exchange platforms.
                </p>

                   {/* Soft display tag */}
      

                {/* Action Buttons rows */}
                <div class="flex flex-wrap items-center justify-center gap-3.5 mt-2 select-none">
                  <a
                    href="#featured"
                    class="motion-soft-lift  px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:scale-103 active:scale-97 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>View Projects</span>
                    <ArrowRight class="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    class="motion-soft-lift px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 text-white font-medium transition-all active:scale-97 cursor-pointer"
                  >
                    Contact Me
                  </a>
                  <button
                    onClick={() => {
                      alert(
                        "Rout Martin CV / Portfolio Brief Download triggered! (Local reference demo)",
                      );
                    }}
                    class="motion-soft-lift px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download class="w-4 h-4" />
                    <span>Download CV</span>
                  </button>
                </div>
              </div>

              {/* Render Interactive Live Developer Dashboard */}
              <div
                class="w-full mt-4 reveal-on-scroll reveal-delay-2"
                data-reveal
              >
                <HeroVisuals />
              </div>
            </section>
            {/* 5. ROAD JOURNEY TIMELINE SEGMENT */}
            <section
              id="experience"
              class="section-anchor py-16 text-left reveal-on-scroll reveal-delay-1"
              data-reveal
            >
              <h3 class="font-display text-2xl font-bold text-white mb-8 border-b border-white/5 pb-2.5">
                Professional Journey
              </h3>

              <div class="space-y-6">
                <div class="glass-container rounded-[28px] p-6 sm:p-8 journey-map-shell relative">
                  <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-7">
                    <div>
                      <p class="text-sm font-mono tracking-wide text-indigo-300 uppercase">
                        Career Link Map
                      </p>
                      <h4 class="font-display text-xl font-semibold text-white mt-1">
                        A practical career path across fintech, mobile apps,
                        commerce, POS, and business systems.
                      </h4>
                    </div>
                 
                  </div>

                  <div class="journey-map-grid select-none">
                    {experiences.map((exp, index) => {
                      const isActive = selectedExpId.value === exp.id;
                      const isLast = index === experiences.length - 1;

                      return (
                        <button
                          key={exp.id}
                          onClick={() => {
                            selectedExpId.value = exp.id;
                            selectedExperienceDialogId.value = exp.id;
                          }}
                          onMouseenter={() => {
                            selectedExpId.value = exp.id;
                          }}
                          type="button"
                          class={`journey-node ${isActive ? "is-active" : ""} ${index % 2 === 1 ? "journey-node--lower" : ""}`}
                        >
                          <span class="journey-node__card glass-container">
                            <span class="journey-node__step">0{index + 1}</span>
                            <span class="journey-node__eyebrow">
                              {exp.duration}
                            </span>
                            <span class="journey-node__title-row">
                              <span class="journey-node__title">
                                {exp.title}
                              </span>
                              <ChevronRight class="journey-node__arrow" />
                            </span>
                            <span class="journey-node__company">
                              {exp.company}
                            </span>
                          </span>

                          <span class="journey-node__popover" aria-hidden="true">
                            <span class="journey-node__popover-label">
                              {exp.company}
                            </span>
                          
                            <span class="journey-node__popover-action">
                              Click to view detail
                            </span>
                          </span>

                          <span class="journey-node__rail" aria-hidden="true">
                            <span class="journey-node__dot-wrap">
                              <span class="journey-node__dot-core"></span>
                            </span>
                            <span
                              class={`journey-node__line ${isLast ? "journey-node__line--hidden" : ""}`}
                            ></span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {experienceDialog ? (
              <div
                class="fixed inset-0 z-[220] flex items-center justify-center p-4 select-text"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="experience-dialog-title"
              >
                <div
                  class="absolute inset-0 bg-black/70 backdrop-blur-md"
                  onClick={() => {
                    selectedExperienceDialogId.value = null;
                  }}
                ></div>

                <div class="glass-container relative z-10 flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-brand-surface/98 shadow-2xl">
                  <div class="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-blue-500"></div>

                  <div class="flex items-start justify-between gap-4 border-b border-white/5 bg-black/10 p-6 sm:p-7">
                    <div class="text-left">
                      <p class="text-base font-mono font-bold uppercase tracking-wide text-cyan-300">
                        {experienceDialog.company}
                      </p>
                      <h3
                        id="experience-dialog-title"
                        class="mt-1 font-display text-3xl font-bold leading-tight text-white"
                      >
                        {experienceDialog.title}
                      </h3>
                      <p class="mt-2 text-base font-mono uppercase tracking-wide text-white/45">
                        {experienceDialog.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        selectedExperienceDialogId.value = null;
                      }}
                      class="shrink-0 rounded-lg border border-white/5 bg-white/5 px-4 py-2.5 font-mono text-base text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div class="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-6 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
                    <div class="space-y-4 text-left">
                      {experienceDialog.summary ? (
                        <div class="rounded-lg border border-white/5 bg-white/5 p-5">
                          <p class="text-base font-mono uppercase tracking-wide text-indigo-300">
                            Role Summary
                          </p>
                          <p class="mt-2 text-base leading-relaxed text-gray-300">
                            {experienceDialog.summary}
                          </p>
                        </div>
                      ) : null}

                      {experienceDialog.focus?.length ? (
                        <div class="rounded-lg border border-white/5 bg-white/5 p-5">
                          <p class="text-base font-mono uppercase tracking-wide text-cyan-300">
                            Focus Areas
                          </p>
                          <div class="mt-3 flex flex-wrap gap-2">
                            {experienceDialog.focus.map((item) => (
                              <span
                                key={item}
                                class="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 px-3 py-1.5 text-base font-mono text-cyan-200"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {experienceDialog.projects?.length ? (
                        <div class="rounded-lg border border-white/5 bg-white/5 p-5">
                          <p class="text-base font-mono uppercase tracking-wide text-blue-300">
                            Built / Shipped
                          </p>
                          <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {experienceDialog.projects.map((projectName) => (
                              <div
                                key={projectName}
                                class="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-base text-gray-300"
                              >
                                {projectName}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div class="space-y-4 text-left">
                      <div class="rounded-lg border border-white/5 bg-white/5 p-5">
                        <p class="text-base font-mono uppercase tracking-wide text-indigo-300">
                          Career Highlights
                        </p>
                        <ul class="mt-3 space-y-3 text-base leading-relaxed text-gray-300">
                          {experienceDialog.achievements.map((ach) => (
                            <li key={ach} class="flex gap-2.5">
                              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300"></span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {experienceDialog.techStack?.length ? (
                        <div class="rounded-lg border border-white/5 bg-black/10 p-5">
                          <p class="text-base font-mono uppercase tracking-wide text-white/45">
                            Tools / Stack
                          </p>
                          <div class="mt-3 flex flex-wrap gap-2">
                            {experienceDialog.techStack.map((tech) => (
                              <span
                                key={tech}
                                class="rounded-2xl border border-white/5 bg-white/5 px-3 py-1.5 text-base font-mono text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* 3. CORE EXPERTISE & BENTO CHIPS SECTION */}
            <section
              id="expertise"
              class="section-anchor py-12 border-t border-white/5 select-text"
            >

              {/* Core expertise cards */}
              <div
                class="wallet-stack-expertise select-none reveal-on-scroll reveal-delay-1"
                data-reveal
              >
        
                <div class="wallet-stack-stage" aria-live="polite">
                  {expertiseCards.map((card, index) => {
                    const sliderOffset = getExpertiseSliderOffset(
                      index,
                      expertiseCards.length,
                    );
                    const offsetClass =
                      sliderOffset < 0
                        ? `wallet-slider-card--neg${Math.abs(sliderOffset)}`
                        : `wallet-slider-card--${sliderOffset}`;

                    return (
                      <button
                        key={card.label}
                        type="button"
                        onClick={() => setActiveExpertise(index)}
                        class={`wallet-stack-card wallet-expertise-card--${card.theme} ${offsetClass} glass-container text-left ${
                          sliderOffset === 0 ? "is-active" : ""
                        }`}
                        aria-label={`View ${card.title}`}
                      >
                        <div class="wallet-stack-card__content">
                          <div class="flex items-start justify-between gap-4">
                            <div
                              class={`wallet-stack-card__icon ${card.iconClass}`}
                            >
                              {card.icon}
                            </div>
                            <span
                              class={`rounded-2xl border px-2.5 py-1 text-sm font-mono ${card.badgeClass}`}
                            >
                              {card.label}
                            </span>
                          </div>
                          <div>
                            <h3 class="font-display text-2xl font-bold text-white sm:text-3xl">
                              {card.title}
                            </h3>
                            <p class="mt-4 text-base leading-relaxed text-gray-300">
                              {card.description}
                            </p>
                          </div>
                          <div class="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-xs uppercase tracking-wide text-white/40">
                            <span>
                              {String(index + 1).padStart(2, "0")} /{" "}
                              {String(expertiseCards.length).padStart(2, "0")}
                            </span>
                            <span>Click to rotate</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    class="wallet-slider-arrow wallet-slider-arrow--prev"
                    onClick={() =>
                      setActiveExpertise(activeExpertiseIndex.value - 1)
                    }
                    aria-label="Previous expertise"
                  >
                    <ChevronLeft class="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    class="wallet-slider-arrow wallet-slider-arrow--next"
                    onClick={() =>
                      setActiveExpertise(activeExpertiseIndex.value + 1)
                    }
                    aria-label="Next expertise"
                  >
                    <ChevronRight class="h-6 w-6" />
                  </button>
                  <div class="wallet-stack-dots">
                    {expertiseCards.map((card, index) => (
                      <button
                        key={card.label}
                        type="button"
                        onClick={() => setActiveExpertise(index)}
                        class={`wallet-stack-dot ${
                          activeExpertiseIndex.value === index ? "is-active" : ""
                        }`}
                        aria-label={`Show ${card.label}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skill matrix block */}
              <div
                class="mt-16 text-left reveal-on-scroll reveal-delay-2"
                data-reveal
              >
                <div class="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p class="text-sm font-mono uppercase tracking-wide text-indigo-300">
                      Skill Matrix
                    </p>
                    <h4
                      id="skills-subgroup"
                      class="mt-1 font-display text-2xl font-bold text-white"
                    >
                      Practical skills by product area
                    </h4>
                  </div>
                 
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {skillCategories.map((sc, idx) => (
                    <div
                      key={idx}
                      class="glass-container glass-container-hover flex min-h-[300px] flex-col justify-between rounded-2xl p-6 sm:p-7"
                    >
                      <div>
                        <div
                          class={`mb-5 h-1.5 w-14 rounded-full ${
                            idx === 0
                              ? "bg-sky-400"
                              : idx === 1
                                ? "bg-emerald-400"
                                : idx === 2
                                  ? "bg-violet-400"
                                  : "bg-amber-400"
                          }`}
                        ></div>
                        <h5 class="font-display text-lg font-bold text-white">
                          {sc.category}
                        </h5>
                        {sc.description ? (
                          <p class="mt-3 text-sm leading-relaxed text-gray-400">
                            {sc.description}
                          </p>
                        ) : null}
                      </div>

                      <div class="mt-5">
                        <p class="mb-2 text-sm font-mono uppercase tracking-wide text-white/40">
                          Core tools
                        </p>
                        <div class="flex flex-wrap gap-2">
                          {sc.skills.map((s) => (
                            <span
                              key={s}
                              class="rounded-2xl border border-white/5 bg-white/5 px-2.5 py-1.5 text-sm font-mono text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {sc.usedIn?.length ? (
                        <div class="mt-5 border-t border-white/5 pt-4">
                          <p class="mb-2 text-sm font-mono uppercase tracking-wide text-white/40">
                            Used in
                          </p>
                            <div class="flex flex-wrap gap-2">
                            {sc.usedIn.map((item, itemIdx) => (
                              <span
                                key={item}
                                class="liquid-chip inline-flex items-center rounded-full border border-current px-3 py-1 text-sm font-mono"
                                style={getUsedInChipStyle(item, idx + itemIdx)}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. FEATURED PROJECTS GALLERY SECTION */}
            <section
              id="work"
              class="section-anchor py-12 border-t border-white/5"
            >
              <div
                class="text-center max-w-3xl mx-auto mb-16 select-none reveal-on-scroll"
                id="featured"
                data-reveal
              >
                <span class="text-sm font-mono tracking-wide text-[#3b82f6] uppercase font-bold">
                  Mobile Team Lead & Full Stack Web Portfolio
                </span>
                <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                  Featured Projects Gallery
                </h2>
              </div>

              <div class="space-y-8 text-left">
                {featuredProject ? (
                  <div
                    role="button"
                    tabindex="0"
                    onClick={() => {
                      selectedProjectId.value = featuredProject.id;
                    }}
                    class="glass-container project-motion-card rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-center gap-6 hover:border-blue-500/20 focus-visible:border-blue-400/60 transition-all duration-300 shadow-xl relative overflow-hidden cursor-pointer reveal-on-scroll reveal-delay-1"
                    data-reveal
                  >
                    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 filter blur-3xl rounded-full"></div>

                    <div class="w-full lg:w-[38%] flex h-[300px] justify-center bg-black/20 rounded-lg p-4 border border-white/5 overflow-hidden">
                      <ProjectMockups type={featuredProject.mockType} />
                    </div>

                    <div class="w-full lg:w-[62%] flex flex-col gap-4 justify-center">
                      <div>
                        <span class="text-sm font-mono font-bold tracking-wide uppercase text-blue-400">
                          Featured Project / {featuredProject.company}
                        </span>
                        <h3 class="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                          {featuredProject.title}
                        </h3>
                        <div class="flex flex-wrap items-center gap-2 mt-3 select-none">
                          {featuredProject.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag.name}
                              class={`text-sm inline-flex items-center gap-1.5 rounded-2xl px-3 py-1.5 font-mono ${
                                tag.type === "platform"
                                  ? "bg-[#ffca28]/15 border border-[#ffca28]/25 text-[#ffca28]"
                                  : "bg-[#42a5f5]/15 border border-[#42a5f5]/25 text-[#42a5f5]"
                              }`}
                            >
                              <span>{tag.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <p class="max-w-2xl text-sm text-gray-400 leading-relaxed font-sans">
                        {featuredProject.role}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div
                  class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6.5 reveal-on-scroll reveal-delay-2"
                  data-reveal
                >
                  {secondaryProjects.map((project: Project, projectIdx) => (
                    <div
                      key={project.id}
                      role="button"
                      tabindex="0"
                      onClick={() => {
                        selectedProjectId.value = project.id;
                      }}
                      class="glass-container project-motion-card rounded-2xl p-4 flex min-h-[410px] flex-col justify-between hover:border-indigo-500/25 focus-visible:border-indigo-400/60 transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer"
                      style={{ transitionDelay: `${projectIdx * 0.04}s` }}
                    >
                      <div class="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 filter blur-2xl rounded-full"></div>

                      <div>
                        <div class="bg-black/25 rounded-lg p-3 border border-white/5 mb-5 flex h-[238px] items-center justify-center overflow-hidden">
                          <ProjectMockups type={project.mockType} />
                        </div>

                        <div>
                          <span class="text-sm font-mono font-bold tracking-wide uppercase text-indigo-400">
                            Project {project.number}
                          </span>
                          <h3 class="font-display text-lg font-bold text-white mt-0.5 leading-snug">
                            {project.title}
                          </h3>
                          {project.role ? (
                            <p class="mt-2 text-sm font-mono uppercase tracking-wide text-white/40">
                              {project.role}
                            </p>
                          ) : null}

                          <div class="flex flex-wrap items-center gap-2 mt-3 select-none">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag.name}
                                class={`text-sm border px-2.5 py-1 rounded-2xl font-mono ${
                                  tag.type === "platform"
                                    ? "bg-amber-400/10 border-amber-400/20 text-amber-300"
                                    : "bg-white/5 border-white/5 text-gray-300"
                                }`}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p class="mt-4 text-sm font-mono uppercase tracking-wide text-white/35">
                        {project.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {projectDialog ? (
              <div
                class="fixed inset-0 z-[220] flex items-center justify-center p-4 select-text"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="project-dialog-title"
              >
                <div
                  class="absolute inset-0 bg-black/70 backdrop-blur-md"
                  onClick={() => {
                    selectedProjectId.value = null;
                  }}
                ></div>

                <div class="glass-container relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-brand-surface/98 shadow-2xl">
                  <div class="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

                  <div class="flex items-start justify-between gap-4 border-b border-white/5 bg-black/10 p-6 sm:p-7">
                    <div class="text-left">
                      <p class="text-base font-mono font-bold uppercase tracking-wide text-blue-300">
                        {projectDialog.company}
                      </p>
                      <h3
                        id="project-dialog-title"
                        class="mt-1 font-display text-3xl font-bold leading-tight text-white"
                      >
                        {projectDialog.title}
                      </h3>
                      {projectDialog.role ? (
                        <p class="mt-2 text-base font-mono uppercase tracking-wide text-white/45">
                          {projectDialog.role}
                        </p>
                      ) : null}
                    </div>
                    <button
                      onClick={() => {
                        selectedProjectId.value = null;
                      }}
                      class="shrink-0 rounded-lg border border-white/5 bg-white/5 px-4 py-2.5 font-mono text-base text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div class="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
                    <div class="rounded-lg border border-white/5 bg-black/20 p-5">
                      <div class="flex min-h-[340px] items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black/20 p-4">
                        <ProjectMockups type={projectDialog.mockType} />
                      </div>
                      <div class="mt-4 flex flex-wrap gap-2">
                        {projectDialog.tags.map((tag) => (
                          <span
                            key={tag.name}
                            class={`rounded-2xl border px-3 py-1.5 text-base font-mono ${
                              tag.type === "platform"
                                ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                                : "border-white/5 bg-white/5 text-gray-300"
                            }`}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div class="space-y-4 text-left">
                      {projectDialog.scope ? (
                        <p class="text-base font-mono uppercase tracking-wide text-cyan-300">
                          {projectDialog.scope}
                        </p>
                      ) : null}

                      <p class="text-base leading-relaxed text-gray-300">
                        {projectDialog.description}
                      </p>

                      <div class="rounded-lg border border-white/5 bg-white/5 p-4">
                        <p class="text-base font-mono uppercase tracking-wide text-indigo-300">
                          Built Value
                        </p>
                        <p class="mt-2 text-base leading-relaxed text-gray-300">
                          {projectDialog.businessValue}
                        </p>
                      </div>

                      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div class="rounded-lg border border-white/5 bg-white/5 p-4">
                          <p class="text-base font-mono uppercase tracking-wide text-cyan-300">
                            Features
                          </p>
                          <ul class="mt-2 space-y-2 text-base text-gray-300">
                            {projectDialog.features.map((feature) => (
                              <li key={feature} class="flex gap-2">
                                <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300"></span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {projectDialog.technicalHighlights?.length ? (
                          <div class="rounded-lg border border-white/5 bg-white/5 p-4">
                            <p class="text-base font-mono uppercase tracking-wide text-blue-300">
                              Technical
                            </p>
                            <ul class="mt-2 space-y-2 text-base text-gray-300">
                              {projectDialog.technicalHighlights.map((highlight) => (
                                <li key={highlight} class="flex gap-2">
                                  <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-300"></span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* 6. KNOWLEDGE SHARING FOR CAMBODIAN DEVS SECTION */}
            <section class="py-12 border-t border-white/5 text-left">
              <div
                class="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4.5 mb-10 select-none reveal-on-scroll"
                data-reveal
              >
                <div>
                  <span class="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase font-bold">
                    Tech Insights
                  </span>
                  <h3 class="font-display text-2xl font-bold text-white mt-0.5">
                    Knowledge Sharing (for Cambodian Devs)
                  </h3>
                </div>
                <span class="text-xs font-mono text-white/40">
                  Free tutorials & open tutorials
                </span>
              </div>

              <div
                class="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll reveal-delay-1"
                data-reveal
              >
                {articles.map((art, artIdx) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      selectedArticleId.value = art.id;
                    }}
                    class="glass-container rounded-2xl p-5 hover:border-purple-500/20 hover:bg-white/8 transition-all duration-300 shadow-md flex flex-col justify-between cursor-pointer group min-h-[190px] text-left select-none"
                    style={{ transitionDelay: `${artIdx * 0.05}s` }}
                  >
                    <div>
                      <div class="flex justify-between items-center mb-3">
                        <span class="text-[9px] font-mono tracking-wide text-purple-400 bg-purple-950/40 p-1 px-2 rounded-2xl uppercase">
                          {art.category}
                        </span>
                        <BookOpen class="w-4 h-4 text-white/30 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <h4 class="text-sm font-bold text-white group-hover:text-purple-300 font-display transition-colors mb-2">
                        {art.title}
                      </h4>
                      <p class="text-[11.5px] text-gray-400 leading-relaxed font-sans">
                        {art.excerpt}
                      </p>
                    </div>
                    <div class="flex justify-between items-center mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-white/30">
                      <span>{art.readTime}</span>
                      <span class="flex items-center gap-1 group-hover:text-white transition-colors">
                        Read Article{" "}
                        <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. DYNAMIC ARTICLE ARTICLE DIALOG / MODAL (PORTAL) */}
            {selectedArticleId.value && article && articleText && (
              <div class="fixed inset-0 z-50 flex items-center justify-center p-4 select-text">
                <div
                  class="absolute inset-0 bg-black/60 backdrop-blur-md"
                  onClick={() => {
                    selectedArticleId.value = null;
                  }}
                ></div>
                <div class="glass-container rounded-3xl w-full max-w-2xl bg-brand-surface/98 shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden">
                  <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-purple-500 to-indigo-800"></div>

                  {/* Modal Header */}
                  <div class="p-6 border-b border-white/5 flex justify-between items-start select-none bg-black/10">
                    <div class="text-left">
                      <span class="text-[10px] font-mono tracking-wide text-purple-400 uppercase bg-purple-950/40 p-1 px-2.5 rounded-2xl">
                        {article.category}
                      </span>
                      <h3 class="font-display text-xl sm:text-2xl font-bold text-white mt-3.5 leading-snug">
                        {articleText.title}
                      </h3>
                      <p class="text-xs text-gray-400 font-sans mt-1.5">
                        {articleText.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        selectedArticleId.value = null;
                      }}
                      class="p-1 px-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white font-mono text-xs cursor-pointer"
                    >
                      ESC
                    </button>
                  </div>

                  {/* Dynamic scroll progress indicator */}
                  <div class="absolute top-[4px] left-0 right-0 h-[3px] bg-white/5 overflow-hidden z-10">
                    <div
                      class="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-75 ease-out"
                      style={{ width: `${scrollPercent.value}%` }}
                    />
                  </div>

                  {/* Modal Core Text Scroll */}
                  <div
                    onScroll={(e) => {
                      const target = e.currentTarget as HTMLDivElement;
                      const totalHeight =
                        target.scrollHeight - target.clientHeight;
                      if (totalHeight > 0) {
                        const pct = (target.scrollTop / totalHeight) * 100;
                        scrollPercent.value = pct;
                      } else {
                        scrollPercent.value = 0;
                      }
                    }}
                    class="flex-1 overflow-y-auto p-6 text-left leading-relaxed font-sans text-xs sm:text-sm text-gray-300"
                  >
                    {/* Simulated lightweight markdown parser rendering */}
                    <div class="space-y-4">
                      {articleText.content.split("\n\n").map((para, pidx) => {
                        if (para.startsWith("## ")) {
                          return (
                            <h4
                              key={pidx}
                              class="font-display font-bold text-base sm:text-lg text-white pt-2 border-b border-white/5 pb-1"
                            >
                              {para.replace("## ", "")}
                            </h4>
                          );
                        }
                        if (para.startsWith("### ")) {
                          return (
                            <h5
                              key={pidx}
                              class="font-display font-semibold text-sm sm:text-base text-purple-300 pt-1"
                            >
                              {para.replace("### ", "")}
                            </h5>
                          );
                        }
                        if (para.startsWith("- ")) {
                          return (
                            <ul
                              key={pidx}
                              class="list-disc pl-5 space-y-1 text-gray-400"
                            >
                              {para.split("\n").map((line, lidx) => (
                                <li key={lidx}>{line.replace("- ", "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (para.startsWith("1. ") || para.startsWith("2. ")) {
                          return (
                            <ol
                              key={pidx}
                              class="list-decimal pl-5 space-y-1 text-gray-400"
                            >
                              {para.split("\n").map((line, lidx) => (
                                <li key={lidx}>{line.substring(3)}</li>
                              ))}
                            </ol>
                          );
                        }
                        if (para.startsWith("`")) {
                          return (
                            <pre
                              key={pidx}
                              class="bg-black/40 border border-white/5 rounded-xl p-4 overflow-x-auto text-left text-[11px] font-mono text-[#93c5fd]"
                            >
                              <code>{para.replace(/```ts\n|```/g, "")}</code>
                            </pre>
                          );
                        }
                        return <p key={pidx}>{para}</p>;
                      })}
                    </div>
                  </div>

                  {/* Modal footer status */}
                  <div class="p-4 border-t border-white/5 flex justify-between items-center select-none bg-black/10 text-[10px] font-mono text-white/30">
                    <span>Article Timeframe: {article.readTime}</span>
                    <button
                      onClick={() => {
                        selectedArticleId.value = null;
                      }}
                      class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-semibold cursor-pointer"
                    >
                      Close Reader
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 8. CONTACT INFO CARD AND CONNECTIVITY CHANNELS */}
            <section
              id="contact"
              class="section-anchor py-16 border-t border-white/5 mt-8"
            >
              <div
                class="max-w-5xl mx-auto glass-container rounded-[36px] p-6 sm:p-10 lg:p-12 relative overflow-hidden select-text reveal-on-scroll"
                data-reveal
              >
                {/* Status indicators inside layout */}
                <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div class="absolute -top-12 right-0 w-52 h-52 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
                <div class="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

                <div class="max-w-2xl mx-auto relative z-10 flex flex-col gap-4 sm:gap-6 text-left">
                  <div class="rounded-[28px] border border-white/5 bg-white/4 px-4 py-5 sm:px-7 sm:py-7">
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 select-none">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Open for new work</span>
                    </div>

                    <h3 class="mt-4 font-display text-2xl sm:text-3xl font-bold text-white leading-tight max-w-xl">
                      Start with a short project brief.
                    </h3>
                    <p class="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
                      Send the product context, current blocker, and expected timeline. I will reply with whether I can help and the best next step.
                    </p>

                    <div class="mt-5 flex flex-col gap-2.5 text-sm text-gray-400">
                      <div class="rounded-2xl border border-white/5 bg-white/3 px-4 py-3">
                        <span class="text-white font-medium">Best fit:</span> fintech apps, release support, payment flows, and delivery recovery.
                      </div>
                      <div class="rounded-2xl border border-white/5 bg-white/3 px-4 py-3">
                        <span class="text-white font-medium">What to send:</span> summary, current stack, blockers, and target date.
                      </div>
                      <div class="rounded-2xl border border-white/5 bg-white/3 px-4 py-3">
                        <span class="text-white font-medium">Response:</span> usually within 24 hours for direct project inquiries.
                      </div>
                    </div>
                  </div>

                  <div class="rounded-[28px] border border-white/5 bg-white/4 px-4 py-5 sm:px-7 sm:py-7">
                    <div class="flex flex-col gap-1 mb-5 select-none">
                      <p class="text-[10px] font-mono uppercase tracking-[0.24em] text-indigo-300">
                        Direct Contact
                      </p>
                      <p class="text-white font-display text-xl sm:text-2xl font-bold">
                        Reach me directly
                      </p>
                    </div>

                    <div class="flex flex-col gap-3.5">
                      <div class="rounded-[22px] border border-white/5 bg-white/3 p-4 sm:p-5">
                        <div class="flex items-center gap-3">
                          <div class="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                            <Mail class="w-5 h-5" />
                          </div>
                          <div class="min-w-0">
                            <p class="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">
                              Primary Email
                            </p>
                            <p class="text-white font-semibold text-sm sm:text-base break-all mt-1">
                              ounroutcambodia@gmail.com
                            </p>
                          </div>
                        </div>

                        <p class="mt-3 text-sm text-gray-400 leading-relaxed">
                          Best for project inquiries, consulting, and product delivery support.
                        </p>

                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-2.5">
                          <a
                            href="mailto:ounroutcambodia@gmail.com"
                            class="inline-flex justify-center items-center px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all active:scale-97"
                          >
                            Send an Email
                          </a>
                          <button
                            onClick={handleCopyEmail}
                            class="inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 hover:text-white cursor-pointer select-none"
                            title="Copy email"
                          >
                            {copiedEmail.value ? (
                              <Check class="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy class="w-4 h-4" />
                            )}
                            <span class="text-sm font-medium">Copy email</span>
                          </button>
                        </div>
                      </div>

                      <div class="rounded-[22px] border border-white/5 bg-white/3 p-4 sm:p-5">
                        <div class="flex items-center gap-3">
                          <div class="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                            <Phone class="w-5 h-5" />
                          </div>
                          <div class="min-w-0">
                            <p class="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">
                              Phone Contact
                            </p>
                            <p class="text-white font-semibold text-sm sm:text-base break-all mt-1">
                              +855 95 530 65
                            </p>
                          </div>
                        </div>

                        <p class="mt-3 text-sm text-gray-400 leading-relaxed">
                          Best for quick coordination, follow-up, and confirming delivery scope.
                        </p>

                        <div class="mt-4 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-2.5">
                          <a
                            href="tel:+8559553065"
                            class="inline-flex justify-center items-center px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all active:scale-97"
                          >
                            Call Me
                          </a>
                          <button
                            onClick={handleCopyPhone}
                            class="inline-flex justify-center items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 hover:text-white cursor-pointer select-none"
                            title="Copy phone number"
                          >
                            {copiedPhone.value ? (
                              <Check class="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy class="w-4 h-4" />
                            )}
                            <span class="text-sm font-medium">Copy number</span>
                          </button>
                        </div>
                      </div>

                      <div class="rounded-[22px] border border-white/5 bg-black/15 px-4 py-4 sm:px-5">
                        <p class="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-300">
                          Availability
                        </p>
                        <div class="mt-3 flex flex-col gap-2 text-sm text-gray-400 leading-relaxed">
                          <p><span class="text-white font-medium">Timezone:</span> Phnom Penh, GMT+7</p>
                          <p><span class="text-white font-medium">Focus:</span> Flutter, payments, Laravel, Vue, and production delivery.</p>
                          <p><span class="text-white font-medium">Response:</span> usually within 24 hours.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </section>
          </main>

          {/* 9. DECORATIVE & INFORMATIVE FOOTER */}
          <footer class="border-t border-white/5 py-12 mt-12 bg-black/25 select-none relative z-10">
            <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-white/40">
              <div class="flex items-center gap-3">
                <span class="font-display font-extrabold text-white text-sm tracking-tight">
                  Rout Martin
                </span>
                <span class="text-white/20">|</span>
                <span>© 2026 Rout Martin. All rights reserved.</span>
              </div>

              <div class="flex items-center gap-4">
                <MagneticLink
                  href="https://linkedin.com"
                  class="w-8 h-8 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
                >
                  <Linkedin class="w-3.5 h-3.5" />
                </MagneticLink>
                <MagneticLink
                  href="https://github.com"
                  class="w-8 h-8 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
                >
                  <Github class="w-3.5 h-3.5" />
                </MagneticLink>
                <MagneticLink
                  href="https://twitter.com"
                  class="w-8 h-8 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
                >
                  <Twitter class="w-3.5 h-3.5" />
                </MagneticLink>
                <MagneticLink
                  href="https://dribbble.com"
                  class="w-8 h-8 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
                >
                  <Dribbble class="w-3.5 h-3.5" />
                </MagneticLink>
              </div>
            </div>
          </footer>

          {/* Integrate Digital twin chatbot launcher */}
          <AIChatBot />
        </div>
      );
    };
  },
});
