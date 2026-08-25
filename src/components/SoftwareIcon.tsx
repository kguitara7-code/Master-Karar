import React from 'react';
import { ProgramInfo } from '../types';

interface SoftwareIconProps {
  iconType?: ProgramInfo['iconType'];
  extension?: string;
  filename?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  programId?: string;
}

export const SoftwareIcon: React.FC<SoftwareIconProps> = ({ 
  iconType, 
  extension,
  filename = '',
  size = 'md',
  className = '',
  programId = '',
}) => {
  const containerDimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  }[size];

  // Determine actual file extension if not provided directly
  const ext = (extension || (filename ? filename.split('.').pop() : '') || '').toLowerCase();
  const isRar = ext === 'rar' || programId.includes('rar') || filename.toLowerCase().endsWith('.rar');
  const isZip = ext === 'zip' || programId.includes('zip') || filename.toLowerCase().endsWith('.zip');

  // Render authentic OS / Repository file icon matching the exact file format (.exe, .rar, .zip)
  const renderRepositoryFileIcon = () => {
    // 1. WinRAR Compressed Archive File (.rar) - Iconic 3 Books Stack with Leather Belt
    if (isRar) {
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <defs>
            <filter id={`rarShadow-${programId}-${size}`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.4" />
            </filter>
            {/* Top Book (Violet / Maroon) */}
            <linearGradient id={`bookTop-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
            {/* Middle Book (Cyan / Blue) */}
            <linearGradient id={`bookMid-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            {/* Bottom Book (Green) */}
            <linearGradient id={`bookBot-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            {/* Leather Belt */}
            <linearGradient id={`beltGrad-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            {/* Gold Buckle */}
            <linearGradient id={`buckleGrad-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>

          {/* Background subtle file card glow */}
          <rect x="10" y="8" width="100" height="104" rx="18" fill="#18181b" fillOpacity="0.08" />

          {/* WinRAR Book 3 (Bottom Green Book) */}
          <g filter={`url(#rarShadow-${programId}-${size})`}>
            {/* Book Spine & Cover */}
            <path d="M 22,68 L 96,68 C 100,68 103,71 103,75 L 103,89 C 103,93 100,96 96,96 L 22,96 C 18,96 15,93 15,89 L 15,75 C 15,71 18,68 22,68 Z" fill={`url(#bookBot-${programId}-${size})`} />
            {/* White Pages */}
            <rect x="25" y="73" width="70" height="18" rx="2" fill="#f8fafc" />
            <line x1="95" y1="75" x2="95" y2="89" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1.5,1.5" />
          </g>

          {/* WinRAR Book 2 (Middle Blue Book) */}
          <g filter={`url(#rarShadow-${programId}-${size})`}>
            <path d="M 20,44 L 98,44 C 102,44 105,47 105,51 L 105,65 C 105,69 102,72 98,72 L 20,72 C 16,72 13,69 13,65 L 13,51 C 13,47 16,44 20,44 Z" fill={`url(#bookMid-${programId}-${size})`} />
            <rect x="23" y="49" width="74" height="18" rx="2" fill="#f8fafc" />
            <line x1="97" y1="51" x2="97" y2="65" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1.5,1.5" />
          </g>

          {/* WinRAR Book 1 (Top Violet Book) */}
          <g filter={`url(#rarShadow-${programId}-${size})`}>
            <path d="M 24,20 L 94,20 C 98,20 101,23 101,27 L 101,41 C 101,45 98,48 94,48 L 24,48 C 20,48 17,45 17,41 L 17,27 C 17,23 20,20 24,20 Z" fill={`url(#bookTop-${programId}-${size})`} />
            <rect x="27" y="25" width="66" height="18" rx="2" fill="#f8fafc" />
            <line x1="93" y1="27" x2="93" y2="41" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1.5,1.5" />
          </g>

          {/* WinRAR Leather Belt wrapping around the books */}
          <rect x="52" y="16" width="16" height="84" rx="3" fill={`url(#beltGrad-${programId}-${size})`} stroke="#291104" strokeWidth="1" />
          {/* Belt Stitching */}
          <line x1="54" y1="18" x2="54" y2="98" stroke="#a16207" strokeWidth="0.8" strokeDasharray="2,2" />
          <line x1="66" y1="18" x2="66" y2="98" stroke="#a16207" strokeWidth="0.8" strokeDasharray="2,2" />

          {/* Gold Metal Buckle */}
          <rect x="47" y="48" width="26" height="20" rx="4" fill={`url(#buckleGrad-${programId}-${size})`} stroke="#78350f" strokeWidth="1.5" />
          <rect x="53" y="53" width="14" height="10" rx="2" fill="#451a03" />
          <line x1="60" y1="50" x2="60" y2="66" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Official .RAR Badge */}
          <g transform="translate(18, 92)">
            <rect x="0" y="0" width="84" height="20" rx="6" fill="#7e22ce" stroke="#ffffff" strokeWidth="1.5" />
            <text x="42" y="14" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
              WINRAR .RAR
            </text>
          </g>
        </svg>
      );
    }

    // 2. Windows Compressed ZIP Folder (.zip) - Authentic Folder with Metal Zipper
    if (isZip) {
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <defs>
            <filter id={`zipShadow-${programId}-${size}`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.35" />
            </filter>
            {/* Folder Front Yellow Gradient */}
            <linearGradient id={`folderFront-${programId}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            {/* Folder Back Tab Gradient */}
            <linearGradient id={`folderBack-${programId}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            {/* Metallic Zipper */}
            <linearGradient id={`metalZip-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Folder Back Tab */}
          <path d="M 16,28 C 16,23 20,19 25,19 L 50,19 C 54,19 58,22 61,26 L 68,34 L 102,34 C 107,34 111,38 111,43 L 111,92 C 111,97 107,101 102,101 L 18,101 C 13,101 9,97 9,92 L 9,35 C 9,31 12,28 16,28 Z" fill={`url(#folderBack-${programId}-${size})`} />

          {/* Inner Paper Sheet in Folder */}
          <rect x="22" y="26" width="76" height="30" rx="3" fill="#ffffff" />
          <line x1="30" y1="33" x2="60" y2="33" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="39" x2="50" y2="39" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

          {/* Folder Front Main Body */}
          <g filter={`url(#zipShadow-${programId}-${size})`}>
            <path d="M 9,42 C 9,37 13,33 18,33 L 102,33 C 107,33 111,37 111,42 L 111,94 C 111,99 107,103 102,103 L 18,103 C 13,103 9,99 9,94 Z" fill={`url(#folderFront-${programId}-${size})`} stroke="#a16207" strokeWidth="1" />
            
            {/* Top Gloss Highlights */}
            <path d="M 12,36 L 108,36" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Vertical Zipper Strip Running Down Center */}
          <g transform="translate(60, 33)">
            {/* Zipper Base Fabric Band */}
            <rect x="-10" y="0" width="20" height="60" fill="#334155" />
            <rect x="-8" y="0" width="16" height="60" fill="#1e293b" />

            {/* Alternating Metallic Zipper Teeth */}
            <rect x="-7" y="4" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="1" y="7" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="-7" y="10" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="1" y="13" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="-7" y="16" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="1" y="19" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="-7" y="22" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="1" y="25" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="-7" y="28" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />
            <rect x="1" y="31" width="6" height="3" rx="0.5" fill={`url(#metalZip-${programId}-${size})`} />

            {/* Metal Zipper Slider Pull */}
            <g transform="translate(0, 38)">
              <polygon points="-7,-4 7,-4 5,8 -5,8" fill={`url(#metalZip-${programId}-${size})`} stroke="#1e293b" strokeWidth="1" />
              <rect x="-4" y="6" width="8" height="14" rx="2" fill={`url(#metalZip-${programId}-${size})`} stroke="#0f172a" strokeWidth="1" />
              <circle cx="0" cy="14" r="2.5" fill="#1e293b" />
            </g>
          </g>

          {/* Official .ZIP Badge */}
          <g transform="translate(18, 92)">
            <rect x="0" y="0" width="84" height="20" rx="6" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
            <text x="42" y="14" fill="#fde047" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="sans-serif">
              ZIP ARCHIVE
            </text>
          </g>
        </svg>
      );
    }

    // 3. Windows Executable Setup / Application Package (.exe)
    // Custom styled per program brand embedded into real Windows .EXE Setup File icon
    return renderWindowsExeIcon();
  };

  const renderWindowsExeIcon = () => {
    switch (iconType) {
      case '3utools':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`exeWindow-${programId}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <linearGradient id={`exe3uHeader-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <filter id={`exeShadow-${programId}-${size}`} x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Windows Application Window Card */}
            <g filter={`url(#exeShadow-${programId}-${size})`}>
              <rect x="12" y="10" width="96" height="98" rx="14" fill={`url(#exeWindow-${programId}-${size})`} stroke="#cbd5e1" strokeWidth="1.5" />
              
              {/* Window Header Titlebar */}
              <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill={`url(#exe3uHeader-${programId}-${size})`} />
              
              {/* Window Buttons (Close, Min, Max) */}
              <circle cx="22" cy="20" r="3.5" fill="#ef4444" />
              <circle cx="31" cy="20" r="3.5" fill="#eab308" />
              <circle cx="40" cy="20" r="3.5" fill="#22c55e" />
              
              <text x="70" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Setup.exe
              </text>
            </g>

            {/* 3uTools Emblem */}
            <g transform="translate(60, 60)">
              <circle cx="0" cy="0" r="22" fill="#1870ea" />
              <circle cx="0" cy="0" r="19" fill="#ffffff" />
              <text x="0" y="7" fill="#1870ea" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                3u
              </text>
            </g>

            {/* Setup Badge */}
            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
              <text x="42" y="14" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                3uTools .EXE
              </text>
            </g>
          </svg>
        );

      case 'anydesk':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`exeAnyHeader-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id={`exeAnyShadow-${programId}-${size}`} x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            <g filter={`url(#exeAnyShadow-${programId}-${size})`}>
              <rect x="12" y="10" width="96" height="98" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill={`url(#exeAnyHeader-${programId}-${size})`} />
              
              <circle cx="22" cy="20" r="3.5" fill="#ffffff" fillOpacity="0.8" />
              <circle cx="31" cy="20" r="3.5" fill="#ffffff" fillOpacity="0.8" />
              <circle cx="40" cy="20" r="3.5" fill="#ffffff" fillOpacity="0.8" />
              <text x="70" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                AnyDesk.exe
              </text>
            </g>

            {/* AnyDesk Overlapping Diamonds */}
            <g transform="translate(60, 58) scale(0.9)">
              <path d="M 8,-8 L 22,6 L 8,20 L -6,6 Z" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
              <path d="M -8,-8 L 6,6 L -8,20 L -22,6 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            </g>

            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
              <text x="42" y="14" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                AnyDesk .EXE
              </text>
            </g>
          </svg>
        );

      case 'borneo':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`exeBorneoHeader-${programId}-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#27272a" />
              </linearGradient>
            </defs>

            <rect x="12" y="10" width="96" height="98" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill={`url(#exeBorneoHeader-${programId}-${size})`} />
            
            <circle cx="22" cy="20" r="3.5" fill="#ef4444" />
            <circle cx="31" cy="20" r="3.5" fill="#eab308" />
            <circle cx="40" cy="20" r="3.5" fill="#22c55e" />
            <text x="70" y="23" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Installer.exe
            </text>

            {/* Borneo Gold Circuit Emblem */}
            <g transform="translate(60, 58) scale(0.85)">
              <polygon points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12" fill="#18181b" stroke="#f59e0b" strokeWidth="3" />
              <path d="M -10,-12 L 2,-12 C 6,-12 9,-10 9,-6 C 9,-3 7,-1 4,0 C 8,1 10,4 10,7 C 10,12 6,14 1,14 L -10,14 Z" fill="#f59e0b" />
            </g>

            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="42" y="14" fill="#f59e0b" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                BORNEO .EXE
              </text>
            </g>
          </svg>
        );

      case 'jcid':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <rect x="12" y="10" width="96" height="98" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill="#065f46" />
            
            <circle cx="22" cy="20" r="3.5" fill="#ef4444" />
            <circle cx="31" cy="20" r="3.5" fill="#eab308" />
            <circle cx="40" cy="20" r="3.5" fill="#22c55e" />
            <text x="70" y="23" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              JCID_Setup.exe
            </text>

            <g transform="translate(60, 58) scale(0.85)">
              <rect x="-22" y="-20" width="44" height="40" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
              <text x="-4" y="8" fill="#ffffff" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">J</text>
              <text x="9" y="8" fill="#34d399" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">C</text>
            </g>

            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
              <text x="42" y="14" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                JCID .EXE
              </text>
            </g>
          </svg>
        );

      case 'ultraviewer':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <rect x="12" y="10" width="96" height="98" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill="#ea580c" />
            
            <circle cx="22" cy="20" r="3.5" fill="#ffffff" />
            <circle cx="31" cy="20" r="3.5" fill="#ffffff" />
            <circle cx="40" cy="20" r="3.5" fill="#ffffff" />
            <text x="70" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              UltraViewer.exe
            </text>

            <g transform="translate(60, 58) scale(0.85)">
              <rect x="-14" y="-18" width="30" height="22" rx="3" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
              <rect x="-22" y="-10" width="32" height="24" rx="4" fill="#0f172a" stroke="#ea580c" strokeWidth="1.5" />
            </g>

            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#c2410c" stroke="#ffffff" strokeWidth="1.5" />
              <text x="42" y="14" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                UltraViewer .EXE
              </text>
            </g>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <rect x="12" y="10" width="96" height="98" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 12,24 C 12,16.2 18.2,10 26,10 L 94,10 C 101.8,10 108,16.2 108,24 L 108,30 L 12,30 Z" fill="#2563eb" />
            
            <circle cx="22" cy="20" r="3.5" fill="#ef4444" />
            <circle cx="31" cy="20" r="3.5" fill="#eab308" />
            <circle cx="40" cy="20" r="3.5" fill="#22c55e" />
            <text x="70" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              Application.exe
            </text>

            {/* General Executable Gear & Disc */}
            <g transform="translate(60, 58)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#3b82f6" />
            </g>

            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="84" height="20" rx="6" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
              <text x="42" y="14" fill="#ffffff" fontSize="10.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="sans-serif">
                SETUP .EXE
              </text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div 
      id={`software-icon-${iconType || 'file'}-${programId || size}`}
      className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 select-none ${containerDimensions} ${className}`}
    >
      {renderRepositoryFileIcon()}
    </div>
  );
};
