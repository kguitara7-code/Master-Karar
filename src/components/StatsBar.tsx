import React from 'react';
import { 
  Package, 
  HardDrive, 
  FileCode2, 
  FolderArchive, 
  Zap, 
  ExternalLink,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { formatBytes } from '../data/programsData';

interface StatsBarProps {
  totalCount: number;
  totalSizeBytes: number;
  exeCount: number;
  archiveCount: number;
  repoPath: string;
  isArabic: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenBatch: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalCount,
  totalSizeBytes,
  exeCount,
  archiveCount,
  repoPath,
  isArabic,
  isLoading,
  onRefresh,
  onOpenBatch,
}) => {
  return (
    <div 
      className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 shadow-sm mb-6"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Top row: Repo banner & Action triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
            <span className="text-xl">🤗</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {isArabic ? 'مستودع Hugging Face' : 'Hugging Face Dataset'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                <CheckCircle2 size={11} />
                {isArabic ? 'متصل ومحدث' : 'Live Synced'}
              </span>
            </div>
            <a
              href={`https://huggingface.co/datasets/${repoPath}/tree/main`}
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base font-mono font-bold text-zinc-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
            >
              <span>{repoPath}</span>
              <ExternalLink size={14} className="text-zinc-400" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            id="refresh-repo-btn"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition disabled:opacity-50"
            title={isArabic ? 'تحديث البيانات من السيرفر' : 'Refresh from Hugging Face'}
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-blue-500' : ''} />
            <span>{isArabic ? 'تحديث' : 'Refresh'}</span>
          </button>

          <button
            id="batch-download-trigger-btn"
            onClick={onOpenBatch}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 transition"
          >
            <Zap size={14} />
            <span>{isArabic ? 'تحميل جماعي / روابط' : 'Batch Export'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 mb-1">
            <Package size={16} className="text-blue-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isArabic ? 'عدد البرامج والأدوات' : 'Total Programs'}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {totalCount} {isArabic ? 'ملف' : 'files'}
          </span>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 mb-1">
            <HardDrive size={16} className="text-emerald-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isArabic ? 'الحجم الإجمالي للمستودع' : 'Total Repository Size'}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatBytes(totalSizeBytes)}
          </span>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 mb-1">
            <FileCode2 size={16} className="text-indigo-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isArabic ? 'برامج التثبيت (EXE)' : 'Setup Executables'}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {exeCount} {isArabic ? 'برنامج' : 'apps'}
          </span>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 mb-1">
            <FolderArchive size={16} className="text-amber-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {isArabic ? 'حزم مضغوطة (ZIP/RAR)' : 'Archives & Drivers'}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {archiveCount} {isArabic ? 'حزمة' : 'archives'}
          </span>
        </div>
      </div>
    </div>
  );
};
