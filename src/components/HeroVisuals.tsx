import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { Activity, Battery, Bell, Database, Server, Terminal, Wifi } from "lucide-vue-next";

export const HeroVisuals = defineComponent({
  name: "HeroVisuals",
  setup() {
    const cpu = ref(12);
    const latency = ref(35);
    const memory = ref(1.42);
    const time = ref("");

    const wavePath = computed(
      () =>
        `M 0,30 Q 15,${10 + Math.sin(cpu.value / 4) * 8} 30,${24 + Math.cos(latency.value / 10) * 6} T 60,${15 + Math.sin(cpu.value / 2) * 5} T 90,${20 + Math.cos(cpu.value / 8) * 4} T 100,30`
    );

    const updateTime = () => {
      const now = new Date();
      time.value = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    let metricsInterval: number | undefined;
    let clockInterval: number | undefined;

    onMounted(() => {
      metricsInterval = window.setInterval(() => {
        const cpuChange = (Math.random() - 0.5) * 4;
        const latencyChange = Math.round((Math.random() - 0.5) * 6);
        const memoryChange = (Math.random() - 0.5) * 0.05;

        cpu.value = Math.max(5, Math.min(35, parseFloat((cpu.value + cpuChange).toFixed(1))));
        latency.value = Math.max(15, Math.min(65, latency.value + latencyChange));
        memory.value = Math.max(1.1, Math.min(1.8, parseFloat((memory.value + memoryChange).toFixed(2))));
      }, 2500);

      updateTime();
      clockInterval = window.setInterval(updateTime, 60000);
    });

    onBeforeUnmount(() => {
      if (metricsInterval) {
        window.clearInterval(metricsInterval);
      }
      if (clockInterval) {
        window.clearInterval(clockInterval);
      }
    });

    return () => (
      <div class="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-8 md:flex-row">
      {/* 1. Styled Terminal with GraphQL Query (Center-left foreground element) */}
      <div class="glass-container group relative w-full overflow-hidden rounded-2xl p-5 shadow-2xl transition-all duration-500 hover:border-brand-accent/40 md:w-[45%]">
        <div class="absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-teal-500 via-indigo-500 to-brand-tertiary opacity-70"></div>
        
        {/* Terminal Header */}
        <div class="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <span class="inline-block h-3 w-3 rounded-full bg-red-500/80"></span>
            <span class="inline-block h-3 w-3 rounded-full bg-yellow-500/80"></span>
            <span class="inline-block h-3 w-3 rounded-full bg-green-500/80"></span>
            <span class="ml-2 font-mono text-xs text-white/50">GraphQL API Query</span>
          </div>
          <div class="flex items-center font-mono text-xs text-white/40">
            <Terminal class="mr-1 h-3.5 w-3.5" />
            <span>localhost:3000</span>
          </div>
        </div>

        {/* Live GraphQL Snippet */}
        <div class="overflow-x-auto py-2 text-left font-mono text-xs leading-relaxed">
          <span class="text-pink-400">query</span>{" "}
          <span class="text-cyan-400">GetUser</span>(
          <span class="text-yellow-400">$id</span>:{" "}
          <span class="text-teal-400">ID!</span>) {"{"}
          <div class="pl-4">
            <span class="text-purple-300">user</span>(id: <span class="text-yellow-400">$id</span>) {"{"}
            <div class="pl-4 text-white/80">
              <div>id</div>
              <div>name</div>
              <div>role</div>
              <div class="text-purple-300">
                latestActivity {"{"}
                <div class="pl-4 text-white/80">
                  <div>type</div>
                  <div>timestamp</div>
                </div>
                {"}"}
              </div>
            </div>
            {"}"}
          </div>
          {"}"}
        </div>

        {/* Quick query stats indicators */}
        <div class="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px] text-white/40">
          <div>Status: <span class="text-green-400 font-bold">200 OK</span></div>
          <div>Size: <span class="text-indigo-300">186 B</span></div>
        </div>
      </div>

      {/* 2. Interactive Phone Mockup */}
      <div class="theme-device-shell group isolate relative flex h-[550px] w-full flex-col overflow-hidden rounded-[40px] border-[6px] sm:w-[280px]">
        {/* Dynamic decorative backdrop radial gradient inside the phone */}
        <div class="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-1/2 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-indigo-500/15"></div>
        
        {/* Notch & Status Bar */}
        <div class="z-10 flex h-10 items-center justify-between px-6 pt-4 select-none">
          <span class="font-mono text-[11px] font-medium text-white/80">{time.value || "09:41"}</span>
          <div class="theme-device-notch absolute left-1/2 top-2 flex h-4 w-20 -translate-x-1/2 items-center justify-center rounded-full">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></span>
          </div>
          <div class="flex items-center gap-1.5 text-white/80">
            <Wifi class="h-3.5 w-3.5" />
            <span class="px-0.5 font-mono text-[9px]">5G</span>
            <Battery class="ml-0.5 h-4 w-4" />
          </div>
        </div>

        {/* Mobile Header Widget */}
        <div class="flex items-center justify-between border-b border-white/5 px-6 pb-2 pt-3">
          <div>
            <h5 class="font-mono text-[10px] uppercase leading-none text-white/40">Gateway Applet</h5>
            <h4 class="mt-1 text-xs font-semibold text-white">A. Chen Digital Twin</h4>
          </div>
          <button class="relative rounded-full bg-white/5 p-1.5 text-white/80 transition-colors hover:bg-white/10">
            <Bell class="h-3.5 w-3.5" />
            <span class="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-400"></span>
          </button>
        </div>

        {/* Device Dashboard Content */}
        <div class="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-4">
          {/* Quick Metrics Bar */}
          <div class="grid grid-cols-3 gap-1.5">
            <div class="relative rounded-xl border border-white/5 bg-white/5 p-2.5 text-center">
              <span class="block font-mono text-[8px] uppercase tracking-wider text-pink-400">CPU</span>
              <span class="mt-1 block font-mono text-xs font-bold text-white">{cpu.value}%</span>
            </div>
            <div class="relative rounded-xl border border-white/5 bg-white/5 p-2.5 text-center">
              <span class="block font-mono text-[8px] uppercase tracking-wider text-cyan-400">Memory</span>
              <span class="mt-1 block font-mono text-xs font-bold text-white">{memory.value}GB</span>
            </div>
            <div class="relative rounded-xl border border-white/5 bg-white/5 p-2.5 text-center">
              <span class="block font-mono text-[8px] uppercase tracking-wider text-indigo-400">Latency</span>
              <span class="mt-1 block font-mono text-xs font-bold text-green-400">{latency.value}ms</span>
            </div>
          </div>

          {/* Running Animated Canvas SVG Sparkline */}
          <div class="relative rounded-2xl border border-white/5 bg-white/5 p-3">
            <div class="mb-1.5 flex items-center justify-between">
              <span class="flex items-center gap-1 font-mono text-[9px] text-white/50">
                <Activity class="h-3 w-3 animate-pulse text-cyan-400" />
                Live Response Wave
              </span>
              <span class="rounded-full bg-green-950/40 px-1.5 py-0.5 font-mono text-[8px] text-green-400">ACTIVE</span>
            </div>
            {/* Visual Wave */}
            <div class="relative flex h-24 w-full items-end overflow-hidden">
              <svg class="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {/* Background area gradient beneath line */}
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0" />
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" stroke-width="0.25" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" stroke-width="0.25" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.05)" stroke-width="0.25" />

                <path
                  d={`${wavePath.value} L 100,40 L 0,40 Z`}
                  fill="url(#waveGrad)"
                  class="transition-all duration-1000 ease-in-out"
                />
                
                <path
                  d={wavePath.value}
                  fill="none"
                  stroke="#0ea5e9"
                  stroke-width="1.5"
                  class="transition-all duration-1000 ease-in-out"
                />
              </svg>
            </div>
            <div class="mt-1 flex justify-between font-mono text-[8px] text-white/30">
              <span>-60 sec</span>
              <span>Now</span>
            </div>
          </div>

          {/* Device Navigation Dock / Features Buttons */}
          <div class="rounded-2xl border border-white/5 bg-white/5 p-2">
            <h4 class="mb-2 px-1 text-left font-mono text-[9px] uppercase text-white/40">Specialized Stack</h4>
            <div class="grid grid-cols-2 gap-1 font-mono text-[9px]">
              <div class="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-1 px-1.5 text-white/80">
                <span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                <span>iOS / Android</span>
              </div>
              <div class="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-1 px-1.5 text-white/80">
                <span class="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                <span>Node & Go</span>
              </div>
              <div class="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-1 px-1.5 text-white/80">
                <span class="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
                <span>GraphQL DB</span>
              </div>
              <div class="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 p-1 px-1.5 text-white/80">
                <span class="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                <span>Full-Stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Device Bottom Bar / Navigation Icons */}
        <div class="theme-device-footer relative z-10 flex h-14 items-center justify-around border-t border-white/5 px-2 select-none">
          <button class="p-2 text-blue-400 transition-colors">
            <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
          <button class="p-2 text-white/40 transition-colors hover:text-white/80">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
          </button>
          <button class="p-2 text-white/30 transition-colors hover:text-white/80">
            <div class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed border-white/40 text-[10px] font-bold">+</div>
          </button>
          <button class="p-2 text-white/40 transition-colors hover:text-white/80">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-2 text-white/40 transition-colors hover:text-white/80">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
          <div class="absolute bottom-1 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20"></div>
        </div>
      </div>

      {/* 3. Floating Infrastructure Status Cards (Right side element) */}
      <div class="relative z-10 flex w-full flex-col gap-3.5 text-left select-none md:w-[30%]">
        {/* Status Card 1: API Gateway */}
        <div class="glass-container group flex items-center gap-3.5 rounded-2xl p-3.5 shadow-lg transition-all duration-300 hover:border-emerald-500/30">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all group-hover:bg-emerald-500/20">
            <Server class="h-5 w-5" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-mono text-[10px] uppercase tracking-wider text-emerald-400">API Gateway</span>
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            </div>
            <h5 class="text-xs font-semibold text-white/90">Online (99.99% Uptime)</h5>
            <p class="mt-0.5 text-[10px] text-white/40">High availability rate limiting & TLS edge</p>
          </div>
        </div>

        {/* Status Card 2: Database Cluster */}
        <div class="glass-container group flex items-center gap-3.5 rounded-2xl p-3.5 shadow-lg transition-all duration-300 hover:border-sky-500/30">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-all group-hover:bg-sky-500/20">
            <Database class="h-5 w-5" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-mono text-[10px] uppercase tracking-wider text-sky-400">Database Cluster</span>
              <span class="h-2 w-2 animate-pulse rounded-full bg-sky-400"></span>
            </div>
            <h5 class="text-xs font-semibold text-white/90">Database Healthy</h5>
            <p class="mt-0.5 text-[10px] text-white/40">Primary-replica PostgreSQL auto failover</p>
          </div>
        </div>

        {/* Status Card 3: Cache Service */}
        <div class="glass-container group flex items-center gap-3.5 rounded-2xl p-3.5 shadow-lg transition-all duration-300 hover:border-purple-500/30">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-all group-hover:bg-purple-500/20">
            <Activity class="h-5 w-5" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-mono text-[10px] uppercase tracking-wider text-purple-400">Cache Service</span>
              <span class="h-2 w-2 animate-pulse rounded-full bg-purple-400"></span>
            </div>
            <h5 class="text-xs font-semibold text-white/90">Memory Cache Active</h5>
            <p class="mt-0.5 text-[10px] text-white/40">Multi-node Redis read/write clusters</p>
          </div>
        </div>
      </div>
      </div>
    );
  },
});
