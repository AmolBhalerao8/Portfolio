"use client";

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/10 blur-[120px] animate-gradient" />
      <div className="absolute bottom-[-30%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-purple-600/8 blur-[140px] animate-gradient" style={{ animationDelay: "-4s" }} />
      <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/5 blur-[100px] animate-float" />
    </div>
  );
}
