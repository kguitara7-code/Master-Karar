/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ProgramInfo, 
  RepoFile, 
  SoftwareCategory 
} from './types';
import { 
  DEFAULT_REPO_PATH, 
  STATIC_REPO_FILES, 
  parseRepoFileToProgram, 
  formatBytes,
  getDownloadUrl 
} from './data/programsData';
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { ProgramCard } from './components/ProgramCard';
import { ProgramListItem } from './components/ProgramListItem';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { BatchDownloadModal } from './components/BatchDownloadModal';
import { KararAhmedLogo } from './components/KararAhmedLogo';
import { 
  Download, 
  ArrowUpDown, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Info,
  Layers,
  Cpu,
  AlertCircle,
  HardDrive,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

export default function App() {
  const [repoPath, setRepoPath] = useState<string>(DEFAULT_REPO_PATH);
  const [repoFiles, setRepoFiles] = useState<RepoFile[]>(STATIC_REPO_FILES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SoftwareCategory>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'size_desc' | 'size_asc' | 'name'>('default');

  const [selectedProgram, setSelectedProgram] = useState<ProgramInfo | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isArabic, setIsArabic] = useState<boolean>(true);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync document direction and lang
  useEffect(() => {
    document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isArabic ? 'ar' : 'en');
  }, [isArabic]);

  // Fetch repository tree from Hugging Face API
  const fetchRepoData = async (targetRepo: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`https://huggingface.co/api/datasets/${targetRepo}/tree/main`);
      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }
      const data: RepoFile[] = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepoFiles(data);
      } else {
        // Fallback to static data if repo is current one
        if (targetRepo === DEFAULT_REPO_PATH) {
          setRepoFiles(STATIC_REPO_FILES);
        }
      }
    } catch (err: any) {
      console.warn('Hugging Face live API error, using cached dataset:', err);
      if (targetRepo === DEFAULT_REPO_PATH) {
        setRepoFiles(STATIC_REPO_FILES);
      } else {
        setFetchError(isArabic ? 'تعذر جلب المستودع عبر الإنترنت، يرجى التأكد من اسم المسار.' : 'Could not fetch repository, please verify dataset ID.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepoData(repoPath);
  }, [repoPath]);

  // Parse repo files into structured programs (filter out non-downloadable meta like .gitattributes or README)
  const programsList: ProgramInfo[] = useMemo(() => {
    return repoFiles
      .filter(f => f.type === 'file' && !f.path.startsWith('.') && f.path !== 'README.md')
      .map(file => parseRepoFileToProgram(file, repoPath));
  }, [repoFiles, repoPath]);

  // Total statistics calculations
  const totalSizeBytes = useMemo(() => {
    return programsList.reduce((acc, p) => acc + (p.sizeBytes || 0), 0);
  }, [programsList]);

  const exeCount = useMemo(() => {
    return programsList.filter(p => p.extension === 'exe').length;
  }, [programsList]);

  const archiveCount = useMemo(() => {
    return programsList.filter(p => p.extension === 'zip' || p.extension === 'rar').length;
  }, [programsList]);

  // Filtered and sorted programs
  const filteredPrograms = useMemo(() => {
    return programsList.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchAr = p.arabicName.toLowerCase().includes(q);
        const matchFile = p.filename.toLowerCase().includes(q);
        const matchDescAr = p.descriptionAr.toLowerCase().includes(q);
        const matchDescEn = p.descriptionEn.toLowerCase().includes(q);
        const matchCat = p.categoryLabelAr.toLowerCase().includes(q) || p.categoryLabelEn.toLowerCase().includes(q);
        return matchName || matchAr || matchFile || matchDescAr || matchDescEn || matchCat;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'size_desc') {
        return (b.sizeBytes || 0) - (a.sizeBytes || 0);
      }
      if (sortBy === 'size_asc') {
        return (a.sizeBytes || 0) - (b.sizeBytes || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // default: EXE first, then by size
      return (b.sizeBytes || 0) - (a.sizeBytes || 0);
    });
  }, [programsList, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isArabic={isArabic}
        onToggleLanguage={() => setIsArabic(!isArabic)}
        repoPath={repoPath}
        onChangeRepoPath={(newPath) => setRepoPath(newPath)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Animated Brand Banner */}
        <div className="mb-6 sm:mb-8">
          <KararAhmedLogo variant="full" isAnimated={true} />
        </div>

        {/* Error notification if any */}
        {fetchError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0 text-amber-600" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Repository Stats Header */}
        <StatsBar
          totalCount={programsList.length}
          totalSizeBytes={totalSizeBytes}
          exeCount={exeCount}
          archiveCount={archiveCount}
          repoPath={repoPath}
          isArabic={isArabic}
          isLoading={isLoading}
          onRefresh={() => fetchRepoData(repoPath)}
          onOpenBatch={() => setIsBatchModalOpen(true)}
        />

        {/* Action Controls & Sort bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {isArabic ? 'قائمة البرامج والأدوات المتاحة' : 'Available Software & Packages'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
              {filteredPrograms.length}
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1">
              <ArrowUpDown size={13} />
              {isArabic ? 'الترتيب حسب:' : 'Sort by:'}
            </span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">{isArabic ? 'الافتراضي (حجم الملف)' : 'Default (File Size)'}</option>
              <option value="size_desc">{isArabic ? 'الحجم (من الأكبر للأصغر)' : 'Size (Largest first)'}</option>
              <option value="size_asc">{isArabic ? 'الحجم (من الأصغر للأكبر)' : 'Size (Smallest first)'}</option>
              <option value="name">{isArabic ? 'الاسم الأبجدي (A-Z)' : 'Name (A to Z)'}</option>
            </select>
          </div>
        </div>

        {/* Programs Display (Grid or List) */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
            <div className="w-16 h-16 rounded-3xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <Layers size={28} />
            </div>
            <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {isArabic ? 'لم يتم العثور على أي برامج مطابقة للبحث' : 'No matching programs found'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-4">
              {isArabic ? 'جرب البحث بكلمة أخرى أو قم بإلغاء فلتر الفئات' : 'Try adjusting your search keywords or clear category filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              {isArabic ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                repoPath={repoPath}
                isArabic={isArabic}
                onOpenDetails={setSelectedProgram}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPrograms.map((program) => (
              <ProgramListItem
                key={program.id}
                program={program}
                repoPath={repoPath}
                isArabic={isArabic}
                onOpenDetails={setSelectedProgram}
              />
            ))}
          </div>
        )}

        {/* Quick Tips & Tech info Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-800/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                  {isArabic ? 'سيرفرات تنزيل عالية السرعة ومباشرة (Hugging Face LFS)' : 'High-Speed Direct Downloads via Hugging Face LFS'}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl">
                  {isArabic 
                    ? 'جميع الملفات والبرامج يتم تنزيلها مباشرة من مستودع Git LFS الرسمي مع دعم الاستكمال وسرعات التحميل القصوى واستقرار الاتصال.' 
                    : 'All binaries are served directly from Hugging Face Git LFS edge storage with resume support and gigabit download bandwidth.'}
                </p>
              </div>
            </div>

            <a
              href={`https://huggingface.co/datasets/${repoPath}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 shadow-sm transition"
            >
              <ExternalLink size={14} />
              <span>{isArabic ? 'فتح المستودع في Hugging Face' : 'Open Hugging Face Repo'}</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-6 mt-12 bg-white/50 dark:bg-zinc-950/50 text-center text-xs text-zinc-500 dark:text-zinc-400" dir={isArabic ? 'rtl' : 'ltr'}>
        <p>
          {isArabic ? 'مستودع برامج الصيانة والمخططات' : 'Maintenance & Schematics Software Repository'} —{' '}
          <span className="font-mono text-zinc-700 dark:text-zinc-300">{repoPath}</span>
        </p>
      </footer>

      {/* Program Details Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        repoPath={repoPath}
        isArabic={isArabic}
        onClose={() => setSelectedProgram(null)}
      />

      {/* Batch Download Modal */}
      {isBatchModalOpen && (
        <BatchDownloadModal
          programs={programsList}
          repoPath={repoPath}
          isArabic={isArabic}
          onClose={() => setIsBatchModalOpen(false)}
        />
      )}
    </div>
  );
}
