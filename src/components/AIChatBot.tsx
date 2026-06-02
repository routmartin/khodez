import { defineComponent, nextTick, ref, watch } from "vue";
import { Loader2, MessageSquare, Send, Sparkles, User, X } from "lucide-vue-next";
import type { Message } from "../types";

export const AIChatBot = defineComponent({
  name: "AIChatBot",
  setup() {
    const isOpen = ref(false);
    const messages = ref<Message[]>([
      {
        role: "assistant",
        content:
          "Hello! I am A. Chen's digital twin, trained on my actual portfolio data and engineering experience. Ask me anything about my work in full-stack, systems architecture, or mobile applications!",
        timestamp: new Date(),
      },
    ]);
    const input = ref("");
    const isLoading = ref(false);
    const messagesEndRef = ref<HTMLDivElement | null>(null);

    const suggestions = [
      "Are you available for contract roles?",
      "Tell me about the QuantumFin project.",
      "Explain your Clean Architecture implementation.",
      "What is your tech stack for scalable backends?",
    ];

    watch(
      () => [messages.value.length, isOpen.value],
      async () => {
        await nextTick();
        messagesEndRef.value?.scrollIntoView({ behavior: "smooth" });
      }
    );

    const handleSendMessage = async (text: string) => {
      if (!text.trim() || isLoading.value) return;

      const userMessage: Message = {
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      const requestMessages = [...messages.value, userMessage];
      messages.value = requestMessages;
      input.value = "";
      isLoading.value = true;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: requestMessages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Chat routing request failed");
        }

        const data = await response.json();
        messages.value = [
          ...messages.value,
          {
            role: "assistant",
            content:
              data.response ||
              "I didn't receive a response from my server module. Let's try again in a bit!",
            timestamp: new Date(),
          },
        ];
      } catch (error) {
        console.error(error);
        messages.value = [
          ...messages.value,
          {
            role: "assistant",
            content:
              "I encountered a minor network disruption connecting to my Express backend. Please verify your internet connection or reload the applet!",
            timestamp: new Date(),
          },
        ];
      } finally {
        isLoading.value = false;
      }
    };

    return () => [
      <button
        id="ai-assistant-toggle-btn"
        onClick={() => {
          isOpen.value = !isOpen.value;
        }}
        class="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 via-indigo-600 to-brand-tertiary p-4 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] active:scale-95 group"
        aria-label="Toggle AI Assist Assistant"
      >
        <div class="relative">
          <MessageSquare class="h-4.5 w-5.5" />
          <span class="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 animate-ping rounded-full border-2 border-brand-bg bg-green-400"></span>
          <span class="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full border-2 border-brand-bg bg-green-400"></span>
        </div>
        <span class="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold transition-all duration-500 group-hover:max-w-xs">
          Interactive AI Assist
        </span>
      </button>,
      isOpen.value ? (
        <div class="fixed inset-0 z-50 flex justify-end pointer-events-none">
          <div
            class="theme-chat-backdrop absolute inset-0 pointer-events-auto backdrop-filter backdrop-blur-sm"
            onClick={() => {
              isOpen.value = false;
            }}
          ></div>

          <div class="relative z-10 flex h-full w-full max-w-md flex-col justify-between overflow-hidden border-l border-white/10 bg-brand-surface/95 shadow-2xl pointer-events-auto">
            <div class="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-teal-500 via-indigo-500 to-indigo-800"></div>

            <div class="theme-chat-chrome flex items-center justify-between border-b border-white/5 p-4">
              <div class="flex items-center gap-3">
                <div class="relative flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  <Sparkles class="h-5 w-5 animate-pulse" />
                </div>
                <div class="text-left">
                  <h4 class="flex items-center gap-1.5 text-sm font-bold text-white">A. Chen Digital Twin</h4>
                  <span class="flex items-center gap-1 font-mono text-[10px] text-green-400">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"></span>
                    Gemini 3.5 Flash Model
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  isOpen.value = false;
                }}
                class="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <div class="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.value.map((message, index) => (
                <div
                  key={index}
                  class={`flex max-w-[85%] gap-3 ${
                    message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    class={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.role === "user"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {message.role === "user" ? <User class="h-4 w-4" /> : <Sparkles class="h-4 w-4" />}
                  </div>
                  <div>
                    <div
                      class={`rounded-2xl p-3 text-left text-xs leading-relaxed ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "border border-white/5 bg-white/5 text-white/90"
                      }`}
                    >
                      {message.content}
                    </div>
                    <span class="mt-1 block px-1 text-left font-mono text-[8px] text-white/30">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading.value ? (
                <div class="mr-auto flex max-w-[85%] items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                    <Loader2 class="h-4 w-4 animate-spin" />
                  </div>
                  <div class="rounded-2xl border border-white/5 bg-white/5 p-3 text-xs italic text-white/50">
                    Formulating response...
                  </div>
                </div>
              ) : null}

              <div ref={messagesEndRef}></div>
            </div>

            <div class="theme-chat-chrome border-t border-white/5 p-4">
              {messages.value.length === 1 ? (
                <div class="mb-3">
                  <p class="mb-1.5 text-left font-mono text-[10px] uppercase text-white/40">Suggested inquiries:</p>
                  <div class="flex flex-wrap gap-1.5">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => void handleSendMessage(suggestion)}
                        class="max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-left text-[11px] text-white/80 transition-all hover:border-indigo-500/30 hover:bg-indigo-600/20 active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void handleSendMessage(input.value);
                }}
                class="flex gap-2"
              >
                <input
                  type="text"
                  value={input.value}
                  onInput={(event) => {
                    input.value = (event.target as HTMLInputElement).value;
                  }}
                  placeholder="Ask digital companion A. Chen..."
                  class="theme-input-surface h-9 flex-1 rounded-lg border p-3 text-xs placeholder-white/30 focus:border-indigo-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.value.trim() || isLoading.value}
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white transition-all hover:bg-indigo-500 active:scale-95 disabled:scale-100 disabled:opacity-40"
                >
                  <Send class="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null,
    ];
  },
});
