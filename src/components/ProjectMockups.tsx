import React, { useState, useEffect } from "react";
import { CreditCard, TrendingUp, Send, CheckCircle2, Shield, Lock, Eye, AlertCircle, RefreshCw, BarChart2, DollarSign } from "lucide-react";

interface MockupProps {
  type: "fintech" | "chat" | "trade";
}

export function ProjectMockups({ type }: MockupProps) {
  if (type === "fintech") {
    return <FintechMockup />;
  }
  if (type === "chat") {
    return <ChatMockup />;
  }
  return <TradeMockup />;
}

// 1. QuantumFin Mockup (Fintech)
function FintechMockup() {
  const [balance, setBalance] = useState(48250.75);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + (Math.random() - 0.45) * 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[240px] h-[340px] rounded-[32px] bg-[#0d0f14] border-4 border-white/5 relative p-4 flex flex-col justify-between overflow-hidden shadow-2xl shrink-0 mx-auto select-none">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-500 to-sky-500"></div>

      {/* Top Bar info */}
      <div className="flex justify-between items-center pb-2 border-b border-white/5">
        <span className="text-[9px] font-mono text-cyan-400 font-semibold tracking-wider">QUANTUM.FIN</span>
        <span className="text-[8px] font-mono text-white/40">v2.1.0</span>
      </div>

      {/* Credit Card Graphic */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-xl p-3 text-left relative overflow-hidden shadow-lg mt-2">
        <div className="absolute right-2 bottom-2 font-mono text-white/10 text-3xl font-black italic">VISA</div>
        <div className="flex justify-between items-start">
          <CreditCard className="w-6 h-6 text-indigo-200" />
          <span className="text-[7px] text-indigo-300 font-mono tracking-widest">PREMIUM CHEN</span>
        </div>
        <div className="mt-4">
          <span className="text-[7px] block uppercase text-indigo-300 tracking-wider">Primary Account</span>
          <span className="text-sm font-semibold text-white font-mono tracking-wider">•••• •••• •••• 5678</span>
        </div>
      </div>

      {/* Balance Statement */}
      <div className="text-left mt-3">
        <span className="text-[8px] font-mono text-white/40 uppercase">Total Net Worth</span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-lg font-bold font-mono tracking-tight text-white">${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="text-[8px] text-green-400 font-medium font-mono">+12.4%</span>
        </div>
      </div>

      {/* Action / Transaction Simulator */}
      <div className="bg-white/5 rounded-xl p-2.5 flex-1 mt-3 flex flex-col justify-center gap-1.5 border border-white/5 text-left">
        <span className="text-[8px] font-mono text-white/30 uppercase">Immediate Settlement Queue</span>
        
        {/* Transaction 1 */}
        <div className="flex items-center justify-between text-[9px] bg-white/5 p-1 px-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-medium text-white/80">USD to KHR Routing</span>
          </div>
          <span className="font-mono text-green-400">+$2,450.00</span>
        </div>

        {/* Transaction 2 */}
        <div className="flex items-center justify-between text-[9px] bg-white/5 p-1 px-1.5 rounded-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="font-medium text-white/80">Biometric Verification</span>
          </div>
          <span className="font-semibold text-cyan-400">PASSED</span>
        </div>
      </div>
    </div>
  );
}

// 2. EchoConnect Mockup (Chat / WebSockets)
function ChatMockup() {
  const [dots, setDots] = useState("• • •");

  useEffect(() => {
    const sequence = ["•", "• •", "• • •", ""];
    let i = 0;
    const interval = setInterval(() => {
      setDots(sequence[i % sequence.length]);
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[320px] h-[220px] rounded-2xl bg-[#090b0e] border border-white/10 relative p-4 flex flex-col justify-between overflow-hidden shadow-2xl mx-auto text-left select-none">
      {/* Encryption Header Indicator */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
            <Lock className="w-3 h-3 text-[#3b82f6]" />
          </div>
          <span className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-wider font-semibold">AES-256 E2EE Enabled</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[8px] font-mono text-white/40">1.2k connected</span>
        </div>
      </div>

      {/* Message Stream layout */}
      <div className="flex-1 my-3 flex flex-col justify-end gap-2 pr-1 font-sans">
        {/* Msg 1 (Left) */}
        <div className="max-w-[80%] rounded-[12px] bg-white/5 border border-white/5 p-2 text-left self-start relative">
          <span className="absolute -top-3.5 left-1 text-[8px] font-mono text-white/40">Peer #4102</span>
          <p className="text-[10px] text-white/80 leading-snug">Client socket dispatch initiated. Testing load threshold.</p>
        </div>

        {/* Msg 2 (Right) */}
        <div className="max-w-[80%] rounded-[12px] bg-indigo-500/15 border border-indigo-500/20 p-2 text-left self-end relative">
          <span className="absolute -top-3.5 right-1 text-[8px] font-mono text-indigo-400">Server Node</span>
          <p className="text-[10px] text-indigo-200 leading-snug">ACK received. Concurrency stable under 3.5ms delay.</p>
        </div>

        {/* Typing indicator */}
        <div className="flex items-center gap-1 self-start ml-1 mt-1 text-[9px] text-white/30 font-mono">
          <span>Active Tunnel Routing</span>
          <span className="text-cyan-400 font-bold min-w-[20px]">{dots}</span>
        </div>
      </div>

      {/* Simulated text input row */}
      <div className="flex gap-1.5 mt-1 pt-2 border-t border-white/5 items-center">
        <div className="flex-1 bg-white/5 border border-white/5 rounded-full h-7 px-3 flex items-center text-[9px] text-white/40">
          Secure Payload Tunneling ...
        </div>
        <button className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors shrink-0">
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}

// 3. ApexTrade Mockup (Stock Exchange charts)
function TradeMockup() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[320px] h-[220px] rounded-2xl bg-[#0a0d11] border border-white/10 relative p-4 flex flex-col justify-between overflow-hidden shadow-2xl mx-auto text-left select-none">
      {/* Header with quick stats */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="flex items-center gap-1">
          <BarChart2 className="w-4 h-4 text-emerald-400" />
          <span className="text-[9px] font-mono text-white/80 font-bold tracking-wider">APX_MATCH_ENGINE</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="text-white/40">Index:</span>
          <span className="text-emerald-400 font-semibold">$1,489.20</span>
        </div>
      </div>

      {/* Candlestick visual mockup using colored items */}
      <div className="flex-1 flex items-center justify-between gap-2.5 px-2 relative my-3">
        {/* Background Gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-1">
          <div className="border-b border-white/10 w-full h-[1px]"></div>
          <div className="border-b border-white/10 w-full h-[1px]"></div>
          <div className="border-b border-white/10 w-full h-[1px]"></div>
          <div className="border-b border-white/10 w-full h-[1px]"></div>
        </div>

        {/* Candlestick 1 */}
        <div className="flex flex-col items-center flex-1 h-24 justify-center">
          <div className="w-[1px] h-20 bg-red-500 relative flex justify-center items-center">
            <div className="absolute w-2 h-10 bg-red-600 rounded"></div>
          </div>
          <span className="text-[6px] font-mono text-white/30 mt-1">09:41</span>
        </div>

        {/* Candlestick 2 */}
        <div className="flex flex-col items-center flex-1 h-24 justify-center">
          <div className="w-[1px] h-20 bg-emerald-500 relative flex justify-center items-center">
            <div className="absolute w-2 h-14 bg-emerald-500 rounded"></div>
          </div>
          <span className="text-[6px] font-mono text-white/30 mt-1">09:42</span>
        </div>

        {/* Candlestick 3 */}
        <div className="flex flex-col items-center flex-1 h-24 justify-center">
          <div className="w-[1px] h-20 bg-emerald-500 relative flex justify-center items-center">
            <div className="absolute w-2 h-8 bg-emerald-400 rounded"></div>
          </div>
          <span className="text-[6px] font-mono text-white/30 mt-1">09:43</span>
        </div>

        {/* Candlestick 4 */}
        <div className="flex flex-col items-center flex-1 h-24 justify-center">
          <div className="w-[1px] h-20 bg-red-500 relative flex justify-center items-center">
            <div className="absolute w-2 h-12 bg-red-500 rounded"></div>
          </div>
          <span className="text-[6px] font-mono text-white/30 mt-1">09:44</span>
        </div>

        {/* Candlestick 5 */}
        <div className="flex flex-col items-center flex-1 h-24 justify-center">
          <div className="w-[1px] h-20 bg-emerald-500 relative flex justify-center items-center">
            <div className="absolute w-2 h-16 bg-emerald-500 rounded"></div>
          </div>
          <span className="text-[6px] font-mono text-white/30 mt-1">09:45</span>
        </div>
      </div>

      {/* Live Matching Signal Trigger indicator at bottom */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-1.5 flex items-center justify-between text-[8px] font-mono leading-none">
        <div className="flex items-center gap-1 text-white/50">
          <CheckCircle2 className="w-3 h-3 text-green-400" />
          <span>Active matching stream</span>
        </div>
        <span className="text-cyan-400 font-bold tracking-tight">LATENCY: 18μs</span>
      </div>
    </div>
  );
}
