import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Info, 
  Hash, 
  HardDrive,
  Layers,
  Sparkles
} from 'lucide-react';
import { ProgramInfo } from '../types';
import { SoftwareIcon } from './SoftwareIcon';
import { formatBytes, getDownloadUrl, getHfBlobUrl } from '../data/programsData';

interface ProgramDetailModalProps {
  program: ProgramInfo | null;
  repoPath: string;
  isArabic: boolean;
  onClose: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  repoPath,
  isArabic,
  onClose,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  if (!program) return null;

  const downloadUrl = getDownloadUrl(repoPath, program.filename);
  const hfBlobUrl = getHfBlobUrl(repoPath, program.filename);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Header with gradient backdrop */}
        <div className="relative p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 dark:from-zinc-800/60 to-transparent">
          <button 
            id="close-modal-button"
            onClick={onClose}
            className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4">
            <SoftwareIcon 
              iconType={program.iconType} 
              extension={program.extension}
              filename={program.filename}
              size="xl" 
              programId={program.id} 
            />
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {isArabic ? program.categoryLabelAr : program.categoryLabelEn}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  .{program.extension}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  {isArabic ? 'برنامج أصلي موثق' : 'Official Verified Package'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {isArabic ? program.arabicName : program.name}
              </h2>
              <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {program.filename}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {/* Main Description */}
          <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-200/60 dark:border-zinc-700/50">
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info size={14} />
              {isArabic ? 'نبذة ومعلومات عن البرنامج' : 'Software Overview'}
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              {isArabic ? program.descriptionAr : program.descriptionEn}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                {isArabic ? 'حجم الملف' : 'File Size'}
              </span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5">
                <HardDrive size={15} className="text-blue-500" />
                {program.sizeBytes ? formatBytes(program.sizeBytes) : '—'}
              </span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                {isArabic ? 'الإصدار' : 'Version'}
              </span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5">
                <Layers size={15} className="text-purple-500" />
                {program.version}
              </span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                {isArabic ? 'المعمارية' : 'Architecture'}
              </span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5">
                <Cpu size={15} className="text-amber-500" />
                {program.architecture}
              </span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-1">
                {isArabic ? 'النظام المدعوم' : 'System'}
              </span>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate block">
                {program.systemReq}
              </span>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              {isArabic ? 'المميزات والوظائف الرئيسية' : 'Key Features & Capabilities'}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isArabic ? program.featuresAr : program.featuresEn).map((feat, idx) => (
                <li 
                  key={idx}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50/70 dark:bg-zinc-800/30 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Checksums & LFS Hash */}
          {(program.oid || program.xetHash) && (
            <div className="p-3.5 bg-zinc-900 dark:bg-black/80 rounded-2xl text-zinc-300 text-xs font-mono border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Hash size={14} className="text-emerald-400" />
                  {isArabic ? 'تجزئة الملف للتحقق من الأمان (Git OID)' : 'Security Hash (Git OID)'}
                </span>
                {program.oid && (
                  <button 
                    onClick={() => handleCopyHash(program.oid || '')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    {copiedHash ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    {copiedHash ? (isArabic ? 'تم النسخ' : 'Copied') : (isArabic ? 'نسخ التجزئة' : 'Copy Hash')}
                  </button>
                )}
              </div>
              <p className="break-all text-emerald-400/90 select-all">
                {program.oid || program.xetHash}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-800/80 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="copy-direct-download-link"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
            >
              {copiedUrl ? <Check size={16} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={16} />}
              {copiedUrl ? (isArabic ? 'تم نسخ الرابط!' : 'Link Copied!') : (isArabic ? 'نسخ رابط التنزيل' : 'Copy Direct Link')}
            </button>

            <a
              id="view-on-hf-btn"
              href={hfBlobUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition"
            >
              <ExternalLink size={15} />
              {isArabic ? 'عرض في Hugging Face' : 'View on HF'}
            </a>

            {program.officialSite && (
              <a
                id="official-site-btn"
                href={program.officialSite}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
              >
                <ExternalLink size={15} />
                {isArabic ? 'الموقع الرسمي' : 'Official Website'}
              </a>
            )}
          </div>

          <a
            id="modal-primary-download-btn"
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-500/25 transition flex-1 sm:flex-initial"
          >
            <Download size={18} />
            {isArabic ? 'تنزيل البرنامج الآن' : 'Download Program Now'}
          </a>
        </div>
      </div>
    </div>
  );
};
