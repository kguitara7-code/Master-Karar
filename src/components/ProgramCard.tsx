import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  HardDrive, 
  Info, 
  Layers, 
  Cpu, 
  Sparkles
} from 'lucide-react';
import { ProgramInfo } from '../types';
import { SoftwareIcon } from './SoftwareIcon';
import { formatBytes, getDownloadUrl } from '../data/programsData';

interface ProgramCardProps {
  program: ProgramInfo;
  repoPath: string;
  isArabic: boolean;
  onOpenDetails: (program: ProgramInfo) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  repoPath,
  isArabic,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);
  const downloadUrl = getDownloadUrl(repoPath, program.filename);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id={`program-card-${program.id}`}
      className="group relative bg-white dark:bg-zinc-900/90 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Top Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <SoftwareIcon 
              iconType={program.iconType} 
              extension={program.extension}
              filename={program.filename}
              size="md" 
              programId={program.id} 
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  .{program.extension}
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                  {isArabic ? program.categoryLabelAr : program.categoryLabelEn}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {isArabic ? program.arabicName : program.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Tagline if present */}
        {program.taglineAr && (
          <div className="mb-2 text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Sparkles size={12} className="shrink-0" />
            <span>{isArabic ? program.taglineAr : program.taglineEn}</span>
          </div>
        )}

        {/* File name & Description */}
        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 truncate mb-2.5 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
          {program.filename}
        </p>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
          {isArabic ? program.descriptionAr : program.descriptionEn}
        </p>

        {/* Key Attributes Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium">
            <HardDrive size={13} className="text-blue-500" />
            {program.sizeBytes ? formatBytes(program.sizeBytes) : '—'}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium">
            <Layers size={13} className="text-purple-500" />
            {program.version}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium">
            <Cpu size={13} className="text-amber-500" />
            {program.architecture}
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
        <button
          id={`details-btn-${program.id}`}
          onClick={() => onOpenDetails(program)}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Info size={14} />
          {isArabic ? 'تفاصيل البرنامج' : 'Program Details'}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            id={`copy-url-btn-${program.id}`}
            onClick={handleCopy}
            title={isArabic ? 'نسخ رابط التنزيل' : 'Copy download URL'}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          </button>

          <a
            id={`download-btn-${program.id}`}
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-md shadow-blue-500/20 transition"
          >
            <Download size={15} />
            {isArabic ? 'تنزيل' : 'Download'}
          </a>
        </div>
      </div>
    </div>
  );
};
