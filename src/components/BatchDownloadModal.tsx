import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  CheckSquare, 
  Square,
  FileText,
  Sparkles
} from 'lucide-react';
import { ProgramInfo } from '../types';
import { formatBytes, getDownloadUrl } from '../data/programsData';

interface BatchDownloadModalProps {
  programs: ProgramInfo[];
  repoPath: string;
  isArabic: boolean;
  onClose: () => void;
}

export const BatchDownloadModal: React.FC<BatchDownloadModalProps> = ({
  programs,
  repoPath,
  isArabic,
  onClose,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(programs.map(p => p.id));
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === programs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(programs.map(p => p.id));
    }
  };

  const selectedPrograms = programs.filter(p => selectedIds.includes(p.id));
  const totalSelectedSize = selectedPrograms.reduce((acc, p) => acc + (p.sizeBytes || 0), 0);

  const getLinksList = () => {
    return selectedPrograms.map(p => getDownloadUrl(repoPath, p.filename)).join('\n');
  };

  const getPowerShellScript = () => {
    const lines = [
      '# PowerShell Batch Download Script for kararAhmed Repository',
      `# Total Files: ${selectedPrograms.length} | Total Size: ${formatBytes(totalSelectedSize)}`,
      '$client = New-Object System.Net.WebClient',
      '',
    ];
    selectedPrograms.forEach(p => {
      const url = getDownloadUrl(repoPath, p.filename);
      lines.push(`Write-Host "Downloading ${p.filename}..." -ForegroundColor Cyan`);
      lines.push(`$client.DownloadFile("${url}", "${p.filename}")`);
    });
    lines.push('Write-Host "All downloads complete!" -ForegroundColor Green');
    return lines.join('\n');
  };

  const getCurlScript = () => {
    const lines = [
      '#!/bin/bash',
      `# Bash Batch Download Script for kararAhmed Software`,
      '',
    ];
    selectedPrograms.forEach(p => {
      const url = getDownloadUrl(repoPath, p.filename);
      lines.push(`curl -L "${url}" -o "${p.filename}"`);
    });
    return lines.join('\n');
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <div className="p-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Download className="text-blue-500" size={20} />
              {isArabic ? 'إدارة التنزيل الجماعي وتصدير الروابط' : 'Batch Download & URL Exporter'}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isArabic ? 'حدد الملفات لنسخ روابط التحميل المباشرة أو توليد سكربت تنزيل آلي' : 'Select files to export direct download URLs or batch script'}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
            <button
              onClick={selectAll}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {selectedIds.length === programs.length ? (
                <CheckSquare size={18} className="text-blue-600" />
              ) : (
                <Square size={18} className="text-zinc-400" />
              )}
              <span>{isArabic ? 'تحديد كل البرامج' : 'Select All'} ({programs.length})</span>
            </button>

            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
              {isArabic ? 'المحدد:' : 'Selected:'} {selectedPrograms.length} ({formatBytes(totalSelectedSize)})
            </span>
          </div>

          {/* Files List Checklist */}
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {programs.map(p => {
              const isChecked = selectedIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    isChecked 
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-zinc-900 dark:text-zinc-100' 
                      : 'bg-zinc-50/50 dark:bg-zinc-800/30 border-zinc-200/40 dark:border-zinc-800 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isChecked ? (
                      <CheckSquare size={16} className="text-blue-600 shrink-0" />
                    ) : (
                      <Square size={16} className="text-zinc-400 shrink-0" />
                    )}
                    <span className="font-medium truncate">
                      {isArabic ? p.arabicName : p.name}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 truncate">
                      ({p.filename})
                    </span>
                  </div>
                  <span className="font-semibold shrink-0 ml-2">
                    {p.sizeBytes ? formatBytes(p.sizeBytes) : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Export Actions Box */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              {isArabic ? 'خيارات التصدير والنسخ' : 'Export Formats'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => copyToClipboard(getLinksList(), 'links')}
                disabled={selectedPrograms.length === 0}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition disabled:opacity-40"
              >
                {copiedType === 'links' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span>{copiedType === 'links' ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ قائمة الروابط' : 'Copy Direct URLs')}</span>
              </button>

              <button
                onClick={() => copyToClipboard(getPowerShellScript(), 'ps')}
                disabled={selectedPrograms.length === 0}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition disabled:opacity-40"
              >
                {copiedType === 'ps' ? <Check size={16} className="text-emerald-500" /> : <Terminal size={16} />}
                <span>{copiedType === 'ps' ? (isArabic ? 'تم النسخ!' : 'Copied!') : 'PowerShell Script'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(getCurlScript(), 'curl')}
                disabled={selectedPrograms.length === 0}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition disabled:opacity-40"
              >
                {copiedType === 'curl' ? <Check size={16} className="text-emerald-500" /> : <Terminal size={16} />}
                <span>{copiedType === 'curl' ? (isArabic ? 'تم النسخ!' : 'Copied!') : 'cURL / Bash Script'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/80 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
