import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  HardDrive, 
  Info, 
  Layers 
} from 'lucide-react';
import { ProgramInfo } from '../types';
import { SoftwareIcon } from './SoftwareIcon';
import { formatBytes, getDownloadUrl } from '../data/programsData';

interface ProgramListItemProps {
  program: ProgramInfo;
  repoPath: string;
  isArabic: boolean;
  onOpenDetails: (program: ProgramInfo) => void;
}

export const ProgramListItem: React.FC<ProgramListItemProps> = ({
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
      id={`program-list-item-${program.id}`}
      className="group bg-white dark:bg-zinc-900/90 rounded-2xl p-4 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <SoftwareIcon 
          iconType={program.iconType} 
          extension={program.extension}
          filename={program.filename}
          size="sm" 
          programId={program.id} 
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {isArabic ? program.arabicName : program.name}
            </h3>
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              .{program.extension}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-[200px] sm:max-w-xs">
              {program.filename}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
              <HardDrive size={12} className="text-blue-500" />
              {program.sizeBytes ? formatBytes(program.sizeBytes) : '—'}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-blue-600 dark:text-blue-400">
              {isArabic ? program.categoryLabelAr : program.categoryLabelEn}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          onClick={() => onOpenDetails(program)}
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Info size={14} />
          <span className="hidden xs:inline">{isArabic ? 'التفاصيل' : 'Details'}</span>
        </button>

        <button
          onClick={handleCopy}
          title={isArabic ? 'نسخ رابط التنزيل' : 'Copy download URL'}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-sm transition"
        >
          <Download size={14} />
          {isArabic ? 'تنزيل' : 'Download'}
        </a>
      </div>
    </div>
  );
};
