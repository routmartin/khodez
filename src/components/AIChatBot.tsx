import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Message } from "../types";

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am A. Chen's digital twin, trained on my actual portfolio data and engineering experience. Ask me anything about my work in full-stack, systems architecture, or mobile applications!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt questions
  const suggestions = [
    "Are you available for contract roles?",
    "Tell me about the QuantumFin project.",
    "Explain your Clean Architecture implementation.",
    "What is your tech stack for scalable backends?"
  ];

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error("Chat routing request failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || "I didn't receive a response from my server module. Let's try again in a bit!",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered a minor network disruption connecting to my Express backend. Please verify your internet connection or reload the applet!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. Pulse Floating Trigger Button */}
      <button
        id="ai-assistant-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-teal-500 via-indigo-600 to-brand-tertiary text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group flex items-center gap-2 cursor-pointer"
        aria-label="Toggle AI Assist Assistant"
      >
        <div className="relative">
          <MessageSquare className="w-5.5 h-4.5" />
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-green-400 border-2 border-brand-bg rounded-full animate-ping"></span>
          <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-green-400 border-2 border-brand-bg rounded-full"></span>
        </div>
        <span className="text-xs font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
          Interactive AI Assist
        </span>
      </button>

      {/* 2. Slide Drawer / Chat Frame */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* Backdrop Blur overlay for screen */}
          <div 
            className="absolute inset-0 bg-black/45 backdrop-filter backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Drawer Body Container */}
          <div className="w-full max-w-md h-full bg-brand-surface/95 border-l border-white/10 shadow-2xl relative flex flex-col justify-between pointer-events-auto z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-teal-500 via-indigo-500 to-indigo-800"></div>

            {/* Header section */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 relative">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    A. Chen Digital Twin
                  </h4>
                  <span className="text-[10px] font-mono text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Gemini 3.5 Flash Model
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-cyan-500/10 text-cyan-400" : "bg-indigo-500/10 text-indigo-400"}`}>
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={`rounded-2xl p-3 text-xs leading-relaxed text-left ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-white/5 border border-white/5 text-white/90"}`}>
                      {m.content}
                    </div>
                    <span className="text-[8px] font-mono text-white/30 mt-1 block px-1 text-left">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="rounded-2xl p-3 bg-white/5 border border-white/5 text-xs text-white/50 italic">
                    Formulating response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chip list inside foot */}
            <div className="p-4 border-t border-white/5 bg-black/10">
              {messages.length === 1 && (
                <div className="mb-3">
                  <p className="text-[10px] font-mono text-white/40 mb-1.5 uppercase text-left">Suggested inquiries:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(s)}
                        className="text-[11px] bg-white/5 hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-white/10 text-white/80 rounded-full px-2.5 py-1 text-left transition-all active:scale-95 whitespace-nowrap overflow-hidden text-ellipsis max-w-full cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat send box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask digital companion A. Chen..."
                  className="flex-1 h-9 rounded-lg bg-[#0a0d11] border border-white/10 p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-indigo-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
