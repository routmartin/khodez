import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  Loader2,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from "lucide-vue-next";
import type { Message } from "../types";

export const AIChatBot = defineComponent({
  name: "AIChatBot",
  setup() {
    const isOpen = ref(false);
    const messages = ref<Message[]>([
      {
        role: "assistant",
        content:
          "Hello! I am Rout Martin's digital twin, trained on his portfolio and shipped work across DV Pay, HTP, chat/audio call, exchange, e-commerce, POS, and business systems. Ask me about Flutter, fintech, mobile architecture, payments, localization, or release delivery.",
        timestamp: new Date(),
      },
    ]);
    const input = ref("");
    const isLoading = ref(false);
    const messagesEndRef = ref<HTMLDivElement | null>(null);
    const latestUserMessageRef = ref<HTMLDivElement | null>(null);

    const suggestions = [
      "Are you available for contract roles?",
      "Tell me about the DV Pay project.",
      "What fintech work has Rout delivered?",
      "Which projects show technical leadership?",
    ];

    const cleanMessageText = (value: string) =>
      value
        .replace(/\s---\s/g, "\n---\n")
        .replace(/\s(#{1,4}\s+)/g, "\n$1")
        .replace(/\s(\*\s+\*\*)/g, "\n$1")
        .replace(/\s(\d+\.\s+)/g, "\n$1")
        .trim();

    const renderInlineText = (value: string) => {
      const parts = value.split(/(\*\*[^*]+\*\*)/g);

      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} class="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={index}>{part}</span>;
      });
    };

    const renderAssistantContent = (content: string) => {
      const lines = cleanMessageText(content)
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !/^#+$/.test(line));

      const hasStructuredContent = lines.some(
        (line) =>
          line === "---" ||
          line.startsWith("#") ||
          line.startsWith("* ") ||
          /^\d+\.\s/.test(line),
      );

      if (!hasStructuredContent) {
        return (
          <p class="chat-message-paragraph">{renderInlineText(content)}</p>
        );
      }

      return (
        <div class="chat-message-structured">
          {lines.map((line, index) => {
            if (line === "---") {
              return <div key={index} class="chat-message-divider"></div>;
            }

            const headingMatch = line.match(/^#{1,4}\s*(.+)$/);
            if (headingMatch) {
              const headingText = headingMatch[1]
                .replace(/^#+\s*/, "")
                .replace(/^\d+\.\s*/, "")
                .trim();

              if (!headingText) {
                return null;
              }

              return (
                <h5 key={index} class="chat-message-heading">
                  {headingText}
                </h5>
              );
            }

            const numberedHeading = line.match(/^\d+\.\s+(.+)$/);
            if (numberedHeading) {
              return (
                <h5 key={index} class="chat-message-heading">
                  {numberedHeading[1]}
                </h5>
              );
            }

            const bulletText = line.replace(/^\*\s+/, "");
            if (line.startsWith("* ")) {
              const labelMatch = bulletText.match(/^\*\*([^*]+):\*\*\s*(.*)$/);

              return (
                <div key={index} class="chat-message-bullet">
                  <span class="chat-message-bullet-dot"></span>
                  <div>
                    {labelMatch ? (
                      <>
                        <p class="chat-message-bullet-title">
                          {labelMatch[1]}
                        </p>
                        {labelMatch[2] ? (
                          <p class="chat-message-bullet-body">
                            {renderInlineText(labelMatch[2])}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p class="chat-message-bullet-body">
                        {renderInlineText(bulletText)}
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <p key={index} class="chat-message-paragraph">
                {renderInlineText(line)}
              </p>
            );
          })}
        </div>
      );
    };

    watch(
      isOpen,
      async (nextIsOpen) => {
        if (!nextIsOpen) {
          return;
        }

        await nextTick();
        messagesEndRef.value?.scrollIntoView({ behavior: "auto" });
      },
    );

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen.value) {
        isOpen.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleEscapeKey);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleEscapeKey);
    });

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
      await nextTick();
      latestUserMessageRef.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

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
        class="glass-container motion-soft-lift group fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-3 text-white shadow-xl active:scale-95"
        aria-label="Toggle AI Assist Assistant"
      >
        <div class="relative flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
          <MessageSquare class="h-4.5 w-4.5" />
          <span class="absolute right-1 top-1 h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400"></span>
          <span class="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border border-brand-bg bg-emerald-400"></span>
        </div>
        <span class="hidden pr-1 text-sm font-semibold text-white/85 sm:block">
          Ask Rout
        </span>
      </button>,
      isOpen.value ? (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2 pointer-events-none sm:p-4">
          <div
            class="theme-chat-backdrop absolute inset-0 pointer-events-auto backdrop-filter backdrop-blur-sm"
          ></div>

          <div
            class="glass-container chat-dialog-shell relative z-10 flex h-[calc(100dvh-1rem)] w-full max-w-[72rem] flex-col overflow-hidden rounded-2xl bg-brand-surface/98 shadow-2xl pointer-events-auto sm:h-[92dvh] sm:max-h-[860px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chatbot-dialog-title"
          >
            <div class="absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r from-teal-500 via-indigo-500 to-indigo-800"></div>

            <div class="theme-chat-chrome border-b border-white/5 p-3 sm:p-5">
              <div class="flex items-start justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 p-3 sm:gap-4 sm:p-5">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-sm sm:h-11 sm:w-11">
                    <Sparkles class="h-6 w-6 animate-pulse" />
                  </div>
                  <div class="flex min-w-0 items-center gap-2 text-left sm:gap-3">
                    <h4
                      id="ai-chatbot-dialog-title"
                      class="min-w-0 truncate font-display text-sm font-semibold leading-snug text-white sm:text-lg"
                    >
                      Rout Martin Digital Twin
                    </h4>
                    <span class="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 sm:text-[11px]">
                      <span class="h-1 w-1 animate-pulse rounded-full bg-emerald-400"></span>
                      Gemini model online /  AI assistant
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    isOpen.value = false;
                  }}
                  class="motion-soft-lift shrink-0 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60 shadow-sm transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close AI chat dialog with Escape"
                >
                  Esc
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-hidden p-2.5 sm:p-5">
              <div class="chat-conversation-surface h-full space-y-4 overflow-y-auto rounded-2xl border border-white/5 p-3 sm:space-y-5 sm:p-5">
                {messages.value.map((message, index) => (
                  <div
                    key={index}
                    ref={
                      message.role === "user" &&
                      index === messages.value.length - 1
                        ? latestUserMessageRef
                        : undefined
                    }
                    class={`flex gap-3 ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      class={`flex max-w-[98%] gap-2.5 sm:max-w-[94%] sm:gap-3 ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        class={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border ${
                          message.role === "user"
                            ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                            : "border-indigo-400/20 bg-indigo-500/10 text-indigo-300"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User class="h-4 w-4" />
                        ) : (
                          <Sparkles class="h-4 w-4" />
                        )}
                      </div>
                      <div
                        class={`min-w-0 ${
                          message.role === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          class={`chat-message-card rounded-2xl px-3.5 py-3 text-left text-[15px] leading-7 sm:px-4 sm:text-base ${
                            message.role === "user"
                              ? "chat-message-card--user text-white"
                              : "chat-message-card--assistant text-white"
                          }`}
                        >
                          {message.role === "assistant"
                            ? renderAssistantContent(message.content)
                            : message.content}
                        </div>
                        <span
                          class={`mt-1.5 block px-1 font-mono text-[10px] text-white/45 ${
                            message.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading.value ? (
                  <div class="flex justify-start">
                    <div class="flex max-w-[98%] gap-2.5 sm:max-w-[94%] sm:gap-3">
                      <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300">
                        <Loader2 class="h-4 w-4 animate-spin" />
                      </div>
                      <div class="chat-message-card chat-message-card--assistant rounded-2xl px-4 py-3 text-[15px] leading-7 text-white/70">
                        Formulating response...
                      </div>
                    </div>
                  </div>
                ) : null}

                <div ref={messagesEndRef}></div>
              </div>
            </div>

            <div class="theme-chat-chrome border-t border-white/5 p-3 sm:p-5">
              {messages.value.length === 1 ? (
                <div class="mb-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                  <p class="mb-2 text-left text-xs font-semibold uppercase tracking-wide text-white/60">
                    Suggested inquiries
                  </p>
                  <div class="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => void handleSendMessage(suggestion)}
                        type="button"
                        class="motion-soft-lift max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-medium text-white/85 transition-all hover:border-indigo-500/30 hover:bg-indigo-600/20 active:scale-95"
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
                class="flex gap-2 rounded-2xl border border-white/5 bg-white/5 p-2"
              >
                <input
                  type="text"
                  value={input.value}
                  onInput={(event) => {
                    input.value = (event.target as HTMLInputElement).value;
                  }}
                  placeholder="Ask Rout Martin's digital companion..."
                  class="theme-input-surface h-12 min-w-0 flex-1 rounded-xl border px-4 text-base placeholder-white/45 focus:border-indigo-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.value.trim() || isLoading.value}
                  class="motion-soft-lift flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-500 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send message"
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
