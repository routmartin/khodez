import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  ArrowRight,
  BookOpen,
  Check,
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
import { skillCategories, projects, experiences, articles, articleContents } from "./data";
import type { Experience } from "./types";

export default defineComponent({
  name: "App",
  setup() {
    const activeSection = ref("work");
    const theme = ref(typeof window !== "undefined" ? localStorage.getItem("portfolio-theme") || "dark" : "dark");
    const copiedEmail = ref(false);
    const copiedPhone = ref(false);
    const selectedArticleId = ref<string | null>(null);
    const selectedExpId = ref("exp1");
    const scrollPercent = ref(0);
    const observedSectionIds = ["work", "expertise", "experience", "contact"] as const;
    let revealObserver: IntersectionObserver | undefined;
    let sectionObserver: IntersectionObserver | undefined;

    watch(
      theme,
      (nextTheme) => {
        const root = document.documentElement;
        root.classList.toggle("light", nextTheme === "light");
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolio-theme", nextTheme);
        }
      },
      { immediate: true }
    );

    watch(selectedArticleId, () => {
      scrollPercent.value = 0;
    });

    onMounted(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

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
          }
        );

        revealTargets.forEach((element) => {
          revealObserver?.observe(element);
        });
      }

      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

          if (visibleEntries.length === 0) {
            return;
          }

          activeSection.value = visibleEntries[0].target.id;
        },
        {
          threshold: [0.2, 0.35, 0.5, 0.7],
          rootMargin: "-20% 0px -45% 0px",
        }
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
    });

    const toggleTheme = () => {
      theme.value = theme.value === "dark" ? "light" : "dark";
    };

    const handleCopyEmail = () => {
      navigator.clipboard.writeText("contact@senior-dev.com");
      copiedEmail.value = true;
      window.setTimeout(() => {
        copiedEmail.value = false;
      }, 2000);
    };

    const handleCopyPhone = () => {
      navigator.clipboard.writeText("+855 12 345 678");
      copiedPhone.value = true;
      window.setTimeout(() => {
        copiedPhone.value = false;
      }, 2000);
    };

    const selectedExperience = computed<Experience>(
      () => experiences.find((experience) => experience.id === selectedExpId.value) || experiences[0]
    );
    const activeArticle = computed(() => articles.find((article) => article.id === selectedArticleId.value) || null);
    const activeArticleText = computed(() => (selectedArticleId.value ? articleContents[selectedArticleId.value] : null));

    return () => {
      const article = activeArticle.value;
      const articleText = activeArticleText.value;
      const experience = selectedExperience.value;

      return (
    <div class="min-h-screen bg-brand-bg text-gray-200 select-all selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* BACKGROUND GRAPHICS: Floating subtle radial background gradients to give "liquid space" depth */}
      <div class="absolute top-10 left-1/4 w-[400px] h-[400px] theme-blob theme-blob-one filter blur-[100px] rounded-full pointer-events-none"></div>
      <div class="absolute top-[40%] right-10 w-[500px] h-[500px] theme-blob theme-blob-two filter blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-20 left-10 w-[450px] h-[450px] theme-blob theme-blob-three filter blur-[110px] rounded-full pointer-events-none"></div>

      {/* 1. STICKY GLASS NAVIGATION BAR */}
      <nav 
        id="floating-navbar" 
        class="sticky top-4 z-40 max-w-5xl mx-auto px-4 mt-4 select-none"
      >
        <div class="glass-container rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-xl">
          {/* Logo brand */}
          <a href="#" class="flex items-center gap-2 group">
            <span class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20">A</span>
            <span class="font-display font-bold text-white text-base tracking-tight group-hover:text-blue-400 transition-colors">A. Chen</span>
          </a>

          {/* Nav Items */}
          <div class="hidden md:flex items-center gap-1.5 font-mono text-xs">
            <a
              href="#work"
              onClick={() => {
                activeSection.value = "work";
              }}
              class={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeSection.value === "work" ? "bg-white/10 text-white font-semibold" : "text-white/60 hover:text-white"
              }`}
            >
              Work
            </a>
            <a
              href="#expertise"
              onClick={() => {
                activeSection.value = "expertise";
              }}
              class={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeSection.value === "expertise" ? "bg-white/10 text-white font-semibold" : "text-white/60 hover:text-white"
              }`}
            >
              About & Skills
            </a>
            <a
              href="#experience"
              onClick={() => {
                activeSection.value = "experience";
              }}
              class={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeSection.value === "experience" ? "bg-white/10 text-white font-semibold" : "text-white/60 hover:text-white"
              }`}
            >
              Timeline
            </a>
            <a
              href="#contact"
              onClick={() => {
                activeSection.value = "contact";
              }}
              class={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                activeSection.value === "contact" ? "bg-white/10 text-white font-semibold" : "text-white/60 hover:text-white"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Actions (Theme Toggle & CV Download) */}
          <div class="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              class="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer flex items-center justify-center w-8 h-8 focus:outline-none"
              title={theme.value === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme.value === "dark" ? <Sun class="w-4 h-4 text-amber-400" /> : <Moon class="w-4 h-4" />}
            </button>

            <a
              href="https://ai.studio/build"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/25 text-white font-mono text-xs font-medium transition-all cursor-pointer"
            >
              <Download class="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* 2. CORE MASTER PAGE LAYOUT CONTAINER */}
      <main class="max-w-6xl mx-auto px-6 pt-16 pb-24 relative select-text">
        
        {/* HERO TITLE & VISUAL SECTION */}
        <section id="hero" class="section-anchor py-12 md:py-20 flex flex-col items-center gap-12 text-center relative">
          
          <div class="max-w-3xl flex flex-col items-center gap-6 reveal-on-scroll reveal-delay-1" data-reveal>
            {/* Soft display tag */}
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-cyan-400 select-none">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Open to Consulting & Remote Engineering</span>
            </div>

            {/* Typography Heading paired with Outfit font */}
            <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Senior Full-stack Developer <br class="hidden sm:inline" />
              <span class="bg-gradient-to-r from-blue-400 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                & Mobile App Specialist
              </span>
            </h1>

            {/* Subheading text with wide margins for air */}
            <p class="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed font-sans">
              Architecting high-performance, scalable solutions for web and mobile platforms. 
              Expertise in React, Node.js, Swift, and cloud infrastructure with a keen eye for clean architectural patterns.
            </p>

            {/* Action Buttons rows */}
            <div class="flex flex-wrap items-center justify-center gap-4.5 mt-2 select-none">
              <a
                href="#featured"
                class="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:scale-103 active:scale-97 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight class="w-4 h-4" />
              </a>
              <a
                href="#contact"
                class="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 text-white font-medium transition-all active:scale-97 cursor-pointer"
              >
                Contact Me
              </a>
              <button
                onClick={() => {
                  alert("Alex Chen CV / Portfolio Brief Download triggered! (Local reference demo)");
                }}
                class="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download class="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </div>
          </div>

          {/* Render Interactive Live Developer Dashboard */}
          <div class="w-full mt-6 reveal-on-scroll reveal-delay-2" data-reveal>
            <HeroVisuals />
          </div>
        </section>

        {/* 3. CORE EXPERTISE & BENTO CHIPS SECTION */}
        <section id="expertise" class="section-anchor py-24 border-t border-white/5 select-text">
          <div class="text-center max-w-3xl mx-auto mb-16 select-none reveal-on-scroll" data-reveal>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Core Expertise & Skills
            </h2>
            <p class="text-gray-400 mt-3 text-sm sm:text-base font-sans">
              Developing premium digital experiences with bulletproof logic, scalable integrations, and fast load speeds.
            </p>
          </div>

          {/* Three Column Bento cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6.5 select-none reveal-on-scroll reveal-delay-1" data-reveal>
            {/* Card 1: Mobile */}
            <div class="glass-container glass-container-hover rounded-[24px] p-7 text-left flex flex-col justify-between min-h-[290px]">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6 shadow-sm">
                  <Smartphone class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-white font-display mb-3">Mobile App Development</h3>
                <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  Specialized in building performant, cross-platform and native mobile applications using modern frameworks. Delivering seamless user experiences for iOS and Android.
                </p>
              </div>
              <span class="text-[10px] font-mono font-medium text-sky-400 tracking-wider mt-4">NATIVE & FLUTTER SPECIALIST</span>
            </div>

            {/* Card 2: Full-stack */}
            <div class="glass-container glass-container-hover rounded-[24px] p-7 text-left flex flex-col justify-between min-h-[290px]">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6 shadow-sm">
                  <Database class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-white font-display mb-3">Full-stack Development</h3>
                <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  End-to-end development capabilities, from robust backend systems and databases to dynamic, responsive frontend interfaces. Expert in scaling distributed cloud solutions.
                </p>
              </div>
              <span class="text-[10px] font-mono font-medium text-purple-400 tracking-wider mt-4">NODE.JS, PHP & SQL EXPERT</span>
            </div>

            {/* Card 3: Tech Leadership */}
            <div class="glass-container glass-container-hover rounded-[24px] p-7 text-left flex flex-col justify-between min-h-[290px]">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 shadow-sm">
                  <Cpu class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-white font-display mb-3">Technical Leadership</h3>
                <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  Driving engineering excellence through strategic planning, mentorship, and architectural decision-making. Fostering collaborative, agile, and high-performing developer teams.
                </p>
              </div>
              <span class="text-[10px] font-mono font-medium text-indigo-400 tracking-wider mt-4">CLEAN ARCHITECTURE ADVOCATE</span>
            </div>
          </div>

          {/* Sub Skill Pill categories block */}
          <div class="mt-16 bg-white/2 rounded-2xl p-6 sm:p-8 border border-white/5 text-left reveal-on-scroll reveal-delay-2" data-reveal>
            <h4 id="skills-subgroup" class="text-sm font-bold uppercase tracking-wider font-mono text-white/50 mb-8 border-b border-white/5 pb-3">Skills Inventory</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((sc, idx) => (
                <div key={idx} class="flex flex-col gap-4">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <h5 class="font-display font-bold text-white text-sm">{sc.category}</h5>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    {sc.skills.map((s, sidx) => (
                      <span
                        key={sidx}
                        class="text-xs font-mono bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/5 transition-all select-none"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FEATURED PROJECTS GALLERY SECTION */}
        <section id="work" class="section-anchor py-24 border-t border-white/5">
          <div class="text-center max-w-3xl mx-auto mb-16 select-none reveal-on-scroll" id="featured" data-reveal>
            <span class="text-[10px] font-mono tracking-widest text-[#3b82f6] uppercase font-bold">Senior Full-Stack & Mobile Developer Portfolio</span>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Featured Projects Gallery
            </h2>
          </div>

          <div class="space-y-8 text-left">
            {/* PROJECT 1: QuantumFin - (Huge widescreen featured bento display) */}
            <div class="glass-container rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8.5 hover:border-blue-500/20 transition-all duration-300 shadow-xl relative overflow-hidden group reveal-on-scroll reveal-delay-1" data-reveal>
              {/* Subtle background flair */}
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 filter blur-3xl rounded-full"></div>
              
              {/* Visual Demo on Left */}
              <div class="w-full lg:w-[40%] flex justify-center bg-black/20 rounded-2xl p-6 border border-white/5">
                <ProjectMockups type="fintech" />
              </div>

              {/* Data Specifications on Right */}
              <div class="w-full lg:w-[60%] flex flex-col gap-5.5 justify-center">
                <div>
                  <span class="text-[9px] font-mono font-bold tracking-widest uppercase text-blue-400">Project 1</span>
                  <h3 class="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">{projects[0].title}</h3>
                  <div class="flex items-center gap-2 mt-2 select-none">
                    <span class="text-xs inline-flex items-center gap-1.5 bg-[#42a5f5]/15 border border-[#42a5f5]/25 text-[#42a5f5] rounded-full px-3 py-1 font-mono">
                      <span>Flutter</span>
                    </span>
                    <span class="text-xs inline-flex items-center gap-1.5 bg-[#ffca28]/15 border border-[#ffca28]/25 text-[#ffca28] rounded-full px-3 py-1 font-mono">
                      <span>Firebase</span>
                    </span>
                  </div>
                </div>

                <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                  {projects[0].description}
                </p>

                <div class="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5">
                  <div class="text-xs font-sans text-left">
                    <strong class="text-indigo-300 font-mono tracking-wide uppercase text-[10px]">Business Value:</strong>{" "}
                    <span class="text-gray-300">{projects[0].businessValue}</span>
                  </div>
                  <div class="border-t border-white/5 my-1.5"></div>
                  <div class="text-xs font-sans text-left">
                    <strong class="text-cyan-300 font-mono tracking-wide uppercase text-[10px]">Key Features:</strong>{" "}
                    <div class="grid grid-cols-2 gap-1.5 mt-2 font-mono text-[10px] text-gray-400">
                      {projects[0].features.map((f, fidx) => (
                        <div key={fidx} class="flex items-center gap-1.5">
                           <span class="w-1 h-1 rounded-full bg-cyan-400"></span>
                           <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 2 & 3: Double bento column on desktop */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6.5 reveal-on-scroll reveal-delay-2" data-reveal>
              {/* Project 2 Card */}
              <div class="glass-container rounded-3xl p-6.5 flex flex-col justify-between hover:border-indigo-500/25 transition-all duration-300 shadow-lg relative group overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 filter blur-2xl rounded-full"></div>
                
                <div>
                  {/* Mock representation */}
                  <div class="bg-black/25 rounded-2xl p-4.5 border border-white/5 mb-6.5 flex justify-center">
                    <ProjectMockups type="chat" />
                  </div>

                  <div>
                    <span class="text-[9px] font-mono font-bold tracking-widest uppercase text-indigo-400">Project 2</span>
                    <h3 class="font-display text-lg font-bold text-white mt-0.5">{projects[1].title}</h3>
                    
                    <div class="flex items-center gap-2 mt-2 select-none">
                      <span class="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded font-mono">Node.js</span>
                      <span class="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded font-mono">WebSockets</span>
                    </div>

                    <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans mt-3">
                      {projects[1].description}
                    </p>
                  </div>
                </div>

                <div class="bg-white/5 border border-white/5 rounded-xl p-3.5 mt-5 text-[11.5px] text-gray-300 text-left">
                  <strong class="text-indigo-300 font-mono block text-[9px] uppercase tracking-wider mb-0.5">Integration Outcomes:</strong>
                  {projects[1].businessValue}
                </div>
              </div>

              {/* Project 3 Card */}
              <div class="glass-container rounded-3xl p-6.5 flex flex-col justify-between hover:border-emerald-500/25 transition-all duration-300 shadow-lg relative group overflow-hidden">
                <div class="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 filter blur-2xl rounded-full"></div>

                <div>
                  {/* Mock representation */}
                  <div class="bg-black/25 rounded-2xl p-4.5 border border-white/5 mb-6.5 flex justify-center">
                    <ProjectMockups type="trade" />
                  </div>

                  <div>
                    <span class="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-400">Project 3</span>
                    <h3 class="font-display text-lg font-bold text-white mt-0.5">{projects[2].title}</h3>
                    
                    <div class="flex items-center gap-2 mt-2 select-none">
                      <span class="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded font-mono">React</span>
                      <span class="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded font-mono font-sans ...">Go</span>
                      <span class="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded font-mono">PostgreSQL</span>
                    </div>

                    <p class="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans mt-3">
                      {projects[2].description}
                    </p>
                  </div>
                </div>

                <div class="bg-white/5 border border-white/5 rounded-xl p-3.5 mt-5 text-[11.5px] text-gray-300 text-left">
                  <strong class="text-emerald-300 font-mono block text-[9px] uppercase tracking-wider mb-0.5">Integration Outcomes:</strong>
                  {projects[2].businessValue}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE, KNOWLEDGE SHARING, AND CONTACT HEADER */}
        <div id="experience" class="section-anchor py-12 flex justify-center select-none reveal-on-scroll" data-reveal>
          <div class="glass-container rounded-3xl p-4 px-8 inline-flex items-center justify-center font-display font-extrabold text-white text-xl sm:text-2xl tracking-tight shadow-md select-none border-indigo-500/20">
            Experience & Contact
          </div>
        </div>

        {/* 5. ROAD JOURNEY TIMELINE SEGMENT */}
        <section class="py-16 text-left reveal-on-scroll reveal-delay-1" data-reveal>
          <h3 class="font-display text-2xl font-bold text-white mb-8 border-b border-white/5 pb-2.5">Professional Journey</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Year Selector Node Menu on Left */}
            <div class="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 font-mono text-xs select-none">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    selectedExpId.value = exp.id;
                  }}
                  class={`px-4 py-3 rounded-xl border text-left flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer shrink-0 min-w-[170px] ${
                    selectedExpId.value === exp.id
                      ? "bg-indigo-600/15 border-indigo-500 text-white font-bold"
                      : "bg-white/3 border-white/5 text-white/50 hover:text-white"
                  }`}
                >
                  <div class="flex items-center gap-2">
                    <span class={`w-2 h-2 rounded-full ${selectedExpId.value === exp.id ? "bg-indigo-400" : "bg-white/20"}`}></span>
                    <span>{exp.duration}</span>
                  </div>
                  <ChevronRight class={`w-3.5 h-3.5 transition-transform ${selectedExpId.value === exp.id ? "translate-x-1" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            {/* Display Active Experience Data on Right */}
            <div class="lg:col-span-2 glass-container rounded-[24px] p-6.5 sm:p-8 min-h-[260px] flex flex-col justify-between relative group">
              <div class="absolute top-0 right-0 w-24 h-[4px] bg-gradient-to-r from-indigo-500 to-indigo-800"></div>

              <div>
                <div class="flex flex-wrap items-baseline justify-between gap-2.5">
                  <h4 class="text-lg font-bold text-white font-display uppercase tracking-wide">
                    {experience.title}
                  </h4>
                  <span class="text-xs font-mono text-indigo-300 font-semibold uppercase">
                    {experience.company}
                  </span>
                </div>
                
                <p class="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">ACTIVE TIMEFRAME: {experience.duration}</p>

                <ul class="mt-6 space-y-3 font-sans text-xs sm:text-sm text-gray-400 leading-relaxed list-none text-left">
                  {experience.achievements.map((ach, idx) => (
                    <li key={idx} class="flex gap-2.5 items-start">
                      <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. KNOWLEDGE SHARING FOR CAMBODIAN DEVS SECTION */}
        <section class="py-16 border-t border-white/5 text-left">
          <div class="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4.5 mb-10 select-none reveal-on-scroll" data-reveal>
            <div>
              <span class="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase font-bold">Tech Insights</span>
              <h3 class="font-display text-2xl font-bold text-white mt-0.5">Knowledge Sharing (for Cambodian Devs)</h3>
            </div>
            <span class="text-xs font-mono text-white/40">Free tutorials & open tutorials</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll reveal-delay-1" data-reveal>
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
                    <span class="text-[9px] font-mono tracking-wide text-purple-400 bg-purple-950/40 p-1 px-2 rounded-full uppercase">
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
                    Read Article <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
            <div 
              class="glass-container rounded-3xl w-full max-w-2xl bg-brand-surface/98 shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden"
            >
              <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-purple-500 to-indigo-800"></div>

              {/* Modal Header */}
              <div class="p-6 border-b border-white/5 flex justify-between items-start select-none bg-black/10">
                <div class="text-left">
                  <span class="text-[10px] font-mono tracking-wide text-purple-400 uppercase bg-purple-950/40 p-1 px-2.5 rounded-full">{article.category}</span>
                  <h3 class="font-display text-xl sm:text-2xl font-bold text-white mt-3.5 leading-snug">{articleText.title}</h3>
                  <p class="text-xs text-gray-400 font-sans mt-1.5">{articleText.subtitle}</p>
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
                  const totalHeight = target.scrollHeight - target.clientHeight;
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
                        <h4 key={pidx} class="font-display font-bold text-base sm:text-lg text-white pt-2 border-b border-white/5 pb-1">
                          {para.replace("## ", "")}
                        </h4>
                      );
                    }
                    if (para.startsWith("### ")) {
                      return (
                        <h5 key={pidx} class="font-display font-semibold text-sm sm:text-base text-purple-300 pt-1">
                          {para.replace("### ", "")}
                        </h5>
                      );
                    }
                    if (para.startsWith("- ")) {
                      return (
                        <ul key={pidx} class="list-disc pl-5 space-y-1 text-gray-400">
                          {para.split("\n").map((line, lidx) => (
                            <li key={lidx}>{line.replace("- ", "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith("1. ") || para.startsWith("2. ")) {
                      return (
                        <ol key={pidx} class="list-decimal pl-5 space-y-1 text-gray-400">
                          {para.split("\n").map((line, lidx) => (
                            <li key={lidx}>{line.substring(3)}</li>
                          ))}
                        </ol>
                      );
                    }
                    if (para.startsWith("`")) {
                      return (
                        <pre key={pidx} class="bg-black/40 border border-white/5 rounded-xl p-4 overflow-x-auto text-left text-[11px] font-mono text-[#93c5fd]">
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
        <section id="contact" class="section-anchor py-16 border-t border-white/5 text-center mt-8">
          <div class="max-w-2xl mx-auto glass-container rounded-[32px] p-8 sm:p-10 relative overflow-hidden select-text reveal-on-scroll" data-reveal>
            {/* Status indicators inside layout */}
            <div class="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-500 to-teal-500"></div>

            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-400 mb-6 select-none">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Currently Available for New Opportunities</span>
            </div>

            <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 select-none">
              Let's craft the next breakthrough together
            </h3>
            <p class="text-gray-400 text-sm font-sans mb-8 select-none">
              Have an urgent app requirement, scaling architectural bottleneck, or consulting prospect? Get in touch directly!
            </p>

            {/* Email copying widget */}
            <div class="flex flex-col gap-4 max-w-md mx-auto">
              
              {/* Card option: Email */}
              <div class="flex items-center justify-between gap-3 bg-white/3 border border-white/5 rounded-2xl p-3.5 pl-4 px-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Mail class="w-4.5 h-4.5" />
                  </div>
                  <div class="text-left font-mono">
                    <span class="text-[8px] uppercase tracking-wider text-white/30 block leading-none">Primary Email</span>
                    <span class="text-xs sm:text-sm text-white select-all font-semibold break-all">contact@senior-dev.com</span>
                  </div>
                </div>
                <button
                    onClick={handleCopyEmail}
                  class="p-2 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white/60 hover:text-white cursor-pointer select-none shrink-0"
                >
                  {copiedEmail.value ? <Check class="w-4 h-4 text-green-400" /> : <Copy class="w-4 h-4" />}
                </button>
              </div>

              {/* Card option: Phone */}
              <div class="flex items-center justify-between gap-3 bg-white/3 border border-white/5 rounded-2xl p-3.5 pl-4 px-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Phone class="w-4.5 h-4.5" />
                  </div>
                  <div class="text-left font-mono">
                    <span class="text-[8px] uppercase tracking-wider text-white/30 block leading-none">Phone Contact</span>
                    <span class="text-xs sm:text-sm text-white select-all font-semibold break-all">+855 12 345 678</span>
                  </div>
                </div>
                <button
                    onClick={handleCopyPhone}
                  class="p-2 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white/60 hover:text-white cursor-pointer select-none shrink-0"
                >
                  {copiedPhone.value ? <Check class="w-4 h-4 text-green-400" /> : <Copy class="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Micro Social icons connectors */}
            <div class="flex items-center justify-center gap-5.5 mt-[34px] border-t border-white/5 pt-6 select-none">
              <MagneticLink
                href="https://linkedin.com"
                class="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
              >
                <Linkedin class="w-4.5 h-4.5" />
              </MagneticLink>
              <MagneticLink
                href="https://github.com"
                class="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
              >
                <Github class="w-4.5 h-4.5" />
              </MagneticLink>
              <MagneticLink
                href="https://twitter.com"
                class="w-10 h-10 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-indigo-500/20 hover:bg-indigo-600/10 transition-all duration-300"
              >
                <Twitter class="w-4.5 h-4.5" />
              </MagneticLink>
            </div>
          </div>
        </section>

      </main>

      {/* 9. DECORATIVE & INFORMATIVE FOOTER */}
      <footer class="border-t border-white/5 py-12 mt-12 bg-black/25 select-none relative z-10">
        <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-white/40">
          
          <div class="flex items-center gap-3">
            <span class="font-display font-extrabold text-white text-sm tracking-tight">A. Chen</span>
            <span class="text-white/20">|</span>
            <span>© 2026 DevCraft Systems Co. All rights reserved.</span>
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
