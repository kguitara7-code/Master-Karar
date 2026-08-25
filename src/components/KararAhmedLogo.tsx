import React from 'react';

interface KararAhmedLogoProps {
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
  isAnimated?: boolean;
}

export const KararAhmedLogo: React.FC<KararAhmedLogoProps> = ({
  variant = 'full',
  className = '',
  isAnimated = true,
}) => {
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {/* Hexagon Badge Icon Only */}
        <div className="relative w-11 h-11 flex items-center justify-center">
          {/* Animated Ambient Glow */}
          {isAnimated && (
            <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-md animate-pulse" />
          )}

          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]">
            <defs>
              <linearGradient id="badgeHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#0072ff" />
                <stop offset="100%" stopColor="#00c6ff" />
              </linearGradient>
              <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Hexagon outline */}
            <polygon
              points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"
              fill="#060d17"
              stroke="url(#badgeHexGrad)"
              strokeWidth="4.5"
              strokeLinejoin="round"
              className={isAnimated ? 'animate-pulse' : ''}
            />

            {/* Inner Cyber Circuit 'K' */}
            {/* White Vertical Line with green terminal nodes */}
            <line x1="36" y1="26" x2="36" y2="74" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <circle cx="36" cy="26" r="4.5" fill="#00ff88" filter="url(#badgeGlow)" />
            <circle cx="36" cy="74" r="4.5" fill="#00ff88" filter="url(#badgeGlow)" />

            {/* Cyan Angled Lines with cyan/blue terminal nodes */}
            <path
              d="M 64 27 L 38 50 L 65 73"
              fill="none"
              stroke="#00f7ff"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="64" cy="27" r="4.5" fill="#00f7ff" filter="url(#badgeGlow)" />
            <circle cx="38" cy="50" r="4" fill="#00c6ff" />
            <circle cx="65" cy="73" r="5" fill="#0077ff" filter="url(#badgeGlow)" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={`relative inline-flex items-center gap-3 bg-[#080d16] px-3.5 py-1.5 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,180,255,0.15)] overflow-hidden ${className}`}
        dir="ltr"
      >
        {/* Animated Background Laser Light Sweep */}
        {isAnimated && (
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full animate-[shimmer_3.5s_infinite]" />
        )}

        {/* Hexagon K Icon */}
        <div className="relative w-8 h-8 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
            <polygon
              points="50,5 89,27.5 89,72.5 50,95 11,72.5 11,27.5"
              fill="#080e1a"
              stroke="#00d2ff"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <line x1="36" y1="26" x2="36" y2="74" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="36" cy="26" r="4.5" fill="#00ff88" />
            <circle cx="36" cy="74" r="4.5" fill="#00ff88" />
            <path d="M 64 27 L 38 50 L 65 73" fill="none" stroke="#00f7ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="64" cy="27" r="4.5" fill="#00f7ff" />
            <circle cx="65" cy="73" r="4.5" fill="#0077ff" />
          </svg>
        </div>

        {/* Typography */}
        <div className="flex flex-col leading-tight select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm tracking-wider text-white">KARAR</span>
            <span className="font-black text-sm tracking-wider text-[#1a8cff]">AHMED</span>
          </div>
          <span className="text-[9px] font-extrabold tracking-widest text-[#00ff9d] uppercase">
            TECH & GSM SOLUTIONS
          </span>
        </div>
      </div>
    );
  }

  // Full Cinematic Banner (Exact Replica of Capture.PNG with High-Tech Animations)
  return (
    <div 
      className={`relative w-full rounded-2xl sm:rounded-3xl bg-[#070b12] border border-cyan-500/40 shadow-[0_0_35px_rgba(0,180,255,0.2)] overflow-hidden p-4 sm:p-6 transition-all duration-300 ${className}`}
      dir="ltr"
    >
      {/* Dynamic Animated Cyber Background Grid & Circuit Nodes */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#00d2ff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Sweeping Light Ray Animation */}
      {isAnimated && (
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full animate-[shimmer_4s_ease-in-out_infinite]" 
          style={{ animationDuration: '4s' }}
        />
      )}

      {/* Circuit Board Trace Vectors (Left & Right Traces exactly matching Capture.PNG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-visible" preserveAspectRatio="none">
        <defs>
          <filter id="traceGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Circuit Traces */}
        <path d="M 0,35 L 40,35 L 70,55" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.6" />
        <circle cx="20" cy="35" r="3" fill="#00d2ff" className={isAnimated ? 'animate-ping' : ''} />
        <circle cx="20" cy="35" r="2.5" fill="#00f7ff" />

        {/* Top/Bottom Subtle Traces */}
        <path d="M 120,20 L 160,20 L 175,35" fill="none" stroke="#0077ff" strokeWidth="1" opacity="0.4" />

        {/* Right Circuit Traces */}
        <path d="M 850,25 L 880,45 L 940,45" fill="none" stroke="#00d2ff" strokeWidth="1.5" opacity="0.5" />
        <circle cx="940" cy="45" r="3" fill="#00ff88" className={isAnimated ? 'animate-pulse' : ''} />
        
        <path d="M 820,75 L 860,75 L 890,95 L 950,95" fill="none" stroke="#00d2ff" strokeWidth="1.2" opacity="0.4" />
        <circle cx="950" cy="95" r="2.5" fill="#0077ff" />
      </svg>

      {/* Main Brand Content Layout */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8">
        {/* Left Glowing Hexagon 'K' Emblem */}
        <div className="relative shrink-0 group">
          {/* Animated Neon Ambient Aura */}
          {isAnimated && (
            <div className="absolute -inset-2 rounded-full bg-cyan-500/25 blur-xl animate-pulse" />
          )}

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_16px_rgba(0,210,255,0.9)]">
              <defs>
                <linearGradient id="mainHexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f7ff" />
                  <stop offset="50%" stopColor="#0088ff" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
                <filter id="neonPulse" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Hexagon with Neon Blue Glow */}
              <polygon
                points="50,4 90,27 90,73 50,96 10,73 10,27"
                fill="#060c16"
                stroke="url(#mainHexGradient)"
                strokeWidth="4"
                strokeLinejoin="round"
                className={isAnimated ? 'transition-all duration-700' : ''}
              />

              {/* Futuristic Cyber 'K' */}
              {/* White Vertical Bar with Green Terminal Bulbs */}
              <line 
                x1="35" 
                y1="25" 
                x2="35" 
                y2="75" 
                stroke="#ffffff" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
              />
              <circle cx="35" cy="25" r="4.5" fill="#00ff88" filter="url(#neonPulse)" />
              <circle cx="35" cy="75" r="4.5" fill="#00ff88" filter="url(#neonPulse)" />

              {/* Cyan & Blue Angled Chevron Bars */}
              <path
                d="M 66 26 L 37 50 L 67 74"
                fill="none"
                stroke="#00f7ff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Top Cyan Node */}
              <circle cx="66" cy="26" r="4.5" fill="#00f7ff" filter="url(#neonPulse)" />
              {/* Middle Joint Node */}
              <circle cx="37" cy="50" r="4" fill="#00d2ff" />
              {/* Bottom Electric Blue Node */}
              <circle cx="67" cy="74" r="5" fill="#0077ff" filter="url(#neonPulse)" />
            </svg>
          </div>
        </div>

        {/* Right Brand Text & Subtitle */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left select-none">
          {/* Main Title: KARAR (White) + AHMED (Electric Blue) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-wider drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              KARAR
            </span>
            <span className="font-black text-2xl sm:text-3xl md:text-4xl text-[#0088ff] tracking-wider drop-shadow-[0_0_15px_rgba(0,136,255,0.8)]">
              AHMED
            </span>
          </div>

          {/* Glowing Green Subtitle */}
          <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-sm md:text-base text-[#00ff9d] tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(0,255,157,0.7)]">
              TECH & GSM SOLUTIONS
            </span>
          </div>

          {/* High-Tech Accent Divider Line */}
          <div className="w-full max-w-md mt-2.5 h-[1.5px] bg-gradient-to-r from-cyan-500/80 via-blue-500/40 to-transparent relative">
            {isAnimated && (
              <div className="absolute top-[-2px] left-0 w-8 h-[5px] bg-white rounded-full blur-[2px] animate-[pulse_2s_infinite]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
