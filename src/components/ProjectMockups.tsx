import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from "vue";
import { BarChart2, CheckCircle2, CreditCard, Lock, Send } from "lucide-vue-next";

const FintechMockup = defineComponent({
  name: "FintechMockup",
  setup() {
    const balance = ref(48250.75);
    let intervalId: number | undefined;

    onMounted(() => {
      intervalId = window.setInterval(() => {
        balance.value += (Math.random() - 0.45) * 5;
      }, 4000);
    });

    onBeforeUnmount(() => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    });

    return () => (
      <div class="theme-mockup-shell-alt relative mx-auto flex h-[340px] w-[240px] shrink-0 flex-col justify-between overflow-hidden rounded-[32px] border-4 border-white/5 p-4 select-none">
        <div class="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-teal-500 to-sky-500"></div>
        <div class="flex items-center justify-between border-b border-white/5 pb-2">
          <span class="font-mono text-[9px] font-semibold tracking-wider text-cyan-400">QUANTUM.FIN</span>
          <span class="font-mono text-[8px] text-white/40">v2.1.0</span>
        </div>
        <div class="relative mt-2 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-900 p-3 text-left shadow-lg">
          <div class="absolute bottom-2 right-2 font-mono text-3xl font-black italic text-white/10">VISA</div>
          <div class="flex items-start justify-between">
            <CreditCard class="h-6 w-6 text-indigo-200" />
            <span class="font-mono text-[7px] tracking-widest text-indigo-300">PREMIUM CHEN</span>
          </div>
          <div class="mt-4">
            <span class="block text-[7px] uppercase tracking-wider text-indigo-300">Primary Account</span>
            <span class="font-mono text-sm font-semibold tracking-wider text-white">•••• •••• •••• 5678</span>
          </div>
        </div>
        <div class="mt-3 text-left">
          <span class="font-mono text-[8px] uppercase text-white/40">Total Net Worth</span>
          <div class="mt-0.5 flex items-baseline gap-1">
            <span class="font-mono text-lg font-bold tracking-tight text-white">
              ${balance.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span class="font-mono text-[8px] font-medium text-green-400">+12.4%</span>
          </div>
        </div>
        <div class="mt-3 flex flex-1 flex-col justify-center gap-1.5 rounded-xl border border-white/5 bg-white/5 p-2.5 text-left">
          <span class="font-mono text-[8px] uppercase text-white/30">Immediate Settlement Queue</span>
          <div class="flex items-center justify-between rounded-lg bg-white/5 p-1 px-1.5 text-[9px]">
            <div class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
              <span class="font-medium text-white/80">USD to KHR Routing</span>
            </div>
            <span class="font-mono text-green-400">+$2,450.00</span>
          </div>
          <div class="flex items-center justify-between rounded-lg bg-white/5 p-1 px-1.5 text-[9px]">
            <div class="flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              <span class="font-medium text-white/80">Biometric Verification</span>
            </div>
            <span class="font-semibold text-cyan-400">PASSED</span>
          </div>
        </div>
      </div>
    );
  },
});

const ChatMockup = defineComponent({
  name: "ChatMockup",
  setup() {
    const dots = ref("• • •");
    let intervalId: number | undefined;

    onMounted(() => {
      const sequence = ["•", "• •", "• • •", ""];
      let index = 0;
      intervalId = window.setInterval(() => {
        dots.value = sequence[index % sequence.length];
        index += 1;
      }, 1200);
    });

    onBeforeUnmount(() => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    });

    return () => (
      <div class="theme-mockup-shell relative mx-auto flex h-[220px] w-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-4 text-left select-none">
        <div class="flex items-center justify-between border-b border-white/5 pb-2">
          <div class="flex items-center gap-1.5">
            <div class="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#3b82f6]/20">
              <Lock class="h-3 w-3 text-[#3b82f6]" />
            </div>
            <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#3b82f6]">AES-256 E2EE Enabled</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
            <span class="font-mono text-[8px] text-white/40">1.2k connected</span>
          </div>
        </div>
        <div class="my-3 flex flex-1 flex-col justify-end gap-2 pr-1 font-sans">
          <div class="relative max-w-[80%] self-start rounded-[12px] border border-white/5 bg-white/5 p-2 text-left">
            <span class="absolute -top-3.5 left-1 font-mono text-[8px] text-white/40">Peer #4102</span>
            <p class="text-[10px] leading-snug text-white/80">Client socket dispatch initiated. Testing load threshold.</p>
          </div>
          <div class="relative max-w-[80%] self-end rounded-[12px] border border-indigo-500/20 bg-indigo-500/15 p-2 text-left">
            <span class="absolute -top-3.5 right-1 font-mono text-[8px] text-indigo-400">Server Node</span>
            <p class="text-[10px] leading-snug text-indigo-200">ACK received. Concurrency stable under 3.5ms delay.</p>
          </div>
          <div class="ml-1 mt-1 flex items-center gap-1 self-start font-mono text-[9px] text-white/30">
            <span>Active Tunnel Routing</span>
            <span class="min-w-[20px] font-bold text-cyan-400">{dots.value}</span>
          </div>
        </div>
        <div class="mt-1 flex items-center gap-1.5 border-t border-white/5 pt-2">
          <div class="flex h-7 flex-1 items-center rounded-full border border-white/5 bg-white/5 px-3 text-[9px] text-white/40">
            Secure Payload Tunneling ...
          </div>
          <button class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 transition-colors hover:bg-indigo-500">
            <Send class="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      </div>
    );
  },
});

const TradeMockup = defineComponent({
  name: "TradeMockup",
  setup() {
    return () => (
      <div class="theme-mockup-shell relative mx-auto flex h-[220px] w-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-4 text-left select-none">
        <div class="flex items-center justify-between border-b border-white/5 pb-2">
          <div class="flex items-center gap-1">
            <BarChart2 class="h-4 w-4 text-emerald-400" />
            <span class="font-mono text-[9px] font-bold tracking-wider text-white/80">APX_MATCH_ENGINE</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-[9px]">
            <span class="text-white/40">Index:</span>
            <span class="font-semibold text-emerald-400">$1,489.20</span>
          </div>
        </div>
        <div class="relative my-3 flex flex-1 items-center justify-between gap-2.5 px-2">
          <div class="pointer-events-none absolute inset-0 flex flex-col justify-between py-1 opacity-20">
            <div class="h-[1px] w-full border-b border-white/10"></div>
            <div class="h-[1px] w-full border-b border-white/10"></div>
            <div class="h-[1px] w-full border-b border-white/10"></div>
            <div class="h-[1px] w-full border-b border-white/10"></div>
          </div>
          <div class="flex h-24 flex-1 flex-col items-center justify-center">
            <div class="relative flex h-20 w-[1px] items-center justify-center bg-red-500">
              <div class="absolute h-10 w-2 rounded bg-red-600"></div>
            </div>
            <span class="mt-1 font-mono text-[6px] text-white/30">09:41</span>
          </div>
          <div class="flex h-24 flex-1 flex-col items-center justify-center">
            <div class="relative flex h-20 w-[1px] items-center justify-center bg-emerald-500">
              <div class="absolute h-14 w-2 rounded bg-emerald-500"></div>
            </div>
            <span class="mt-1 font-mono text-[6px] text-white/30">09:42</span>
          </div>
          <div class="flex h-24 flex-1 flex-col items-center justify-center">
            <div class="relative flex h-20 w-[1px] items-center justify-center bg-emerald-500">
              <div class="absolute h-8 w-2 rounded bg-emerald-400"></div>
            </div>
            <span class="mt-1 font-mono text-[6px] text-white/30">09:43</span>
          </div>
          <div class="flex h-24 flex-1 flex-col items-center justify-center">
            <div class="relative flex h-20 w-[1px] items-center justify-center bg-red-500">
              <div class="absolute h-12 w-2 rounded bg-red-500"></div>
            </div>
            <span class="mt-1 font-mono text-[6px] text-white/30">09:44</span>
          </div>
          <div class="flex h-24 flex-1 flex-col items-center justify-center">
            <div class="relative flex h-20 w-[1px] items-center justify-center bg-emerald-500">
              <div class="absolute h-16 w-2 rounded bg-emerald-500"></div>
            </div>
            <span class="mt-1 font-mono text-[6px] text-white/30">09:45</span>
          </div>
        </div>
        <div class="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-1.5 font-mono text-[8px] leading-none">
          <div class="flex items-center gap-1 text-white/50">
            <CheckCircle2 class="h-3 w-3 text-green-400" />
            <span>Active matching stream</span>
          </div>
          <span class="font-bold tracking-tight text-cyan-400">LATENCY: 18μs</span>
        </div>
      </div>
    );
  },
});

export const ProjectMockups = defineComponent({
  name: "ProjectMockups",
  props: {
    type: {
      type: String as PropType<"fintech" | "chat" | "trade">,
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (props.type === "fintech") {
        return <FintechMockup />;
      }

      if (props.type === "chat") {
        return <ChatMockup />;
      }

      return <TradeMockup />;
    };
  },
});
