import React, { useState, useEffect } from "react";
import { Server, Database, Activity, Wifi, Battery, Bell, Play, Terminal, HelpCircle, CheckCircle } from "lucide-react";

export function HeroVisuals() {
  const [cpu, setCpu] = useState(12);
  const [latency, setLatency] = useState(35);
  const [memory, setMemory] = useState(1.42);
  const [time, setTime] = useState("");

  // Keep metrics moving organically
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((prev) => {
        const change = (Math.random() - 0.5) * 4;
        return Math.max(5, Math.min(35, parseFloat((prev + change).toFixed(1))));
      });
      setLatency((prev) => {
        const change = Math.round((Math.random() - 0.5) * 6);
        return Math.max(15, Math.min(65, prev + change));
      });
      setMemory((prev) => {
        const change = (Math.random() - 0.5) * 0.05;
        return Math.max(1.1, Math.min(1.8, parseFloat((prev + change).toFixed(2))));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Update mock digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const tInterval = setInterval(updateTime, 60000);
    return () => clearInterval(tInterval);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl mx-auto px-4 py-8">
      {/* 1. Styled Terminal with GraphQL Query (Center-left foreground element) */}
      <div className="w-full md:w-[45%] glass-container rounded-2xl p-5 relative overflow-hidden group hover:border-brand-accent/40 transition-all duration-500 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 via-indigo-500 to-brand-tertiary opacity-70"></div>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            <span className="font-mono text-xs text-white/50 ml-2">GraphQL API Query.txt</span>
          </div>
          <div className="flex items-center text-white/40 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 mr-1" />
            <span>localhost:3000</span>
          </div>
        </div>

        {/* Live GraphQL Snippet */}
        <div className="font-mono text-xs leading-relaxed overflow-x-auto text-left py-2">
          <span className="text-pink-400">query</span>{" "}
          <span className="text-cyan-400">GetUser</span>(
          <span className="text-yellow-400">$id</span>:{" "}
          <span className="text-teal-400">ID!</span>) {"{"}
          <div className="pl-4">
            <span className="text-purple-300">user</span>(id: <span className="text-yellow-400">$id</span>) {"{"}
            <div className="pl-4 text-white/80">
              <div>id</div>
              <div>name</div>
              <div>role</div>
              <div className="text-purple-300">
                latestActivity {"{"}
                <div className="pl-4 text-white/80">
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
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
          <div>Status: <span className="text-green-400 font-bold">200 OK</span></div>
          <div>Size: <span className="text-indigo-300">186 B</span></div>
        </div>
      </div>

      {/* 2. Interactive Phone Mockup */}
      <div className="w-full sm:w-[280px] h-[550px] rounded-[40px] bg-[#0c0e12]/90 border-[6px] border-white/10 relative shadow-2xl flex flex-col overflow-hidden isolate group">
        {/* Dynamic decorative backdrop radial gradient inside the phone */}
        <div className="absolute inset-x-0 top-1/4 h-1/2 bg-blue-500/10 filter blur-3xl rounded-full pointer-events-none -z-10 group-hover:bg-indigo-500/15 transition-all duration-700"></div>
        
        {/* Notch & Status Bar */}
        <div className="h-10 pt-4 px-6 flex justify-between items-center z-10 select-none">
          <span className="text-[11px] font-mono font-medium text-white/80">{time || "09:41"}</span>
          <div className="w-20 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono px-0.5">5G</span>
            <Battery className="w-4 h-4 ml-0.5" />
          </div>
        </div>

        {/* Mobile Header Widget */}
        <div className="px-6 pt-3 pb-2 flex justify-between items-center border-b border-white/5">
          <div>
            <h5 className="text-[10px] font-mono text-white/40 leading-none uppercase">Gateway Applet</h5>
            <h4 className="text-xs font-semibold text-white mt-1">A. Chen Digital Twin</h4>
          </div>
          <button className="relative p-1.5 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-colors">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-400"></span>
          </button>
        </div>

        {/* Device Dashboard Content */}
        <div className="flex-1 px-4 py-4 flex flex-col justify-between overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5 relative">
              <span className="block text-[8px] uppercase tracking-wider text-pink-400 font-mono">CPU</span>
              <span className="text-xs font-bold text-white mt-1 block font-mono">{cpu}%</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5 relative">
              <span className="block text-[8px] uppercase tracking-wider text-cyan-400 font-mono">Memory</span>
              <span className="text-xs font-bold text-white mt-1 block font-mono">{memory}GB</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5 relative">
              <span className="block text-[8px] uppercase tracking-wider text-indigo-400 font-mono">Latency</span>
              <span className="text-xs font-bold text-green-400 mt-1 block font-mono">{latency}ms</span>
            </div>
          </div>

          {/* Running Animated Canvas SVG Sparkline */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 relative">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-mono text-white/50 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                Live Response Wave
              </span>
              <span className="text-[8px] font-mono text-green-400 bg-green-950/40 px-1.5 py-0.5 rounded-full">ACTIVE</span>
            </div>
            {/* Visual Wave */}
            <div className="h-24 w-full relative overflow-hidden flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {/* Background area gradient beneath line */}
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Gridlines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" />

                <path
                  d={`M 0,30 Q 15,${10 + Math.sin(cpu / 4) * 8} 30,${24 + Math.cos(latency / 10) * 6} T 60,${15 + Math.sin(cpu / 2) * 5} T 90,${20 + Math.cos(cpu / 8) * 4} T 100,30 L 100,40 L 0,40 Z`}
                  fill="url(#waveGrad)"
                  className="transition-all duration-1000 ease-in-out"
                />
                
                <path
                  d={`M 0,30 Q 15,${10 + Math.sin(cpu / 4) * 8} 30,${24 + Math.cos(latency / 10) * 6} T 60,${15 + Math.sin(cpu / 2) * 5} T 90,${20 + Math.cos(cpu / 8) * 4} T 100,30`}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="1.5"
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
            </div>
            <div className="flex justify-between font-mono text-[8px] text-white/30 mt-1">
              <span>-60 sec</span>
              <span>Now</span>
            </div>
          </div>

          {/* Device Navigation Dock / Features Buttons */}
          <div className="bg-white/5 rounded-2xl p-2 border border-white/5">
            <h4 className="text-[9px] font-mono text-white/40 uppercase mb-2 text-left px-1">Specialized Stack</h4>
            <div className="grid grid-cols-2 gap-1 font-mono text-[9px]">
              <div className="p-1 px-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>iOS / Android</span>
              </div>
              <div className="p-1 px-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Node & Go</span>
              </div>
              <div className="p-1 px-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>GraphQL DB</span>
              </div>
              <div className="p-1 px-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                <span>Full-Stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Device Bottom Bar / Navigation Icons */}
        <div className="h-14 bg-black/60 border-t border-white/5 flex items-center justify-around px-2 relative z-10 select-none">
          <button className="p-2 text-blue-400 transition-colors">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
          <button className="p-2 text-white/40 hover:text-white/80 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
            </svg>
          </button>
          <button className="p-2 text-white/30 hover:text-white/80 transition-colors">
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center text-[10px] font-bold">+</div>
          </button>
          <button className="p-2 text-white/40 hover:text-white/80 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 text-white/40 hover:text-white/80 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
          <div className="absolute bottom-1 w-24 h-1 bg-white/20 rounded-full left-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      {/* 3. Floating Infrastructure Status Cards (Right side element) */}
      <div className="flex flex-col gap-3.5 w-full md:w-[30%] text-left relative z-10 select-none">
        {/* Status Card 1: API Gateway */}
        <div className="glass-container rounded-2xl p-3.5 flex items-center gap-3.5 hover:border-emerald-500/30 transition-all duration-300 shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">API Gateway</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <h5 className="text-xs font-semibold text-white/90">Online (99.99% Uptime)</h5>
            <p className="text-[10px] text-white/40 mt-0.5">High availability rate limiting & TLS edge</p>
          </div>
        </div>

        {/* Status Card 2: Database Cluster */}
        <div className="glass-container rounded-2xl p-3.5 flex items-center gap-3.5 hover:border-sky-500/30 transition-all duration-300 shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 transition-all">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400">Database Cluster</span>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            </div>
            <h5 className="text-xs font-semibold text-white/90">Database Healthy</h5>
            <p className="text-[10px] text-white/40 mt-0.5">Primary-replica PostgreSQL auto failover</p>
          </div>
        </div>

        {/* Status Card 3: Cache Service */}
        <div className="glass-container rounded-2xl p-3.5 flex items-center gap-3.5 hover:border-purple-500/30 transition-all duration-300 shadow-lg group">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">Cache Service</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
            </div>
            <h5 className="text-xs font-semibold text-white/90">Memory Cache Active</h5>
            <p className="text-[10px] text-white/40 mt-0.5">Multi-node Redis read/write clusters</p>
          </div>
        </div>
      </div>
    </div>
  );
}
