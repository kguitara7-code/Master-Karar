import React, { useState } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Languages, 
  LayoutGrid, 
  List, 
  FolderGit2, 
  SlidersHorizontal,
  X,
  Sparkles
} from 'lucide-react';
import { SoftwareCategory } from '../types';
import { KararAhmedLogo } from './KararAhmedLogo';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: SoftwareCategory;
  onCategoryChange: (c: SoftwareCategory) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (m: 'grid' | 'list') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
  repoPath: string;
  onChangeRepoPath: (newPath: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  isDarkMode,
  onToggleDarkMode,
  isArabic,
  onToggleLanguage,
  repoPath,
  onChangeRepoPath,
}) => {
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [tempRepoInput, setTempRepoInput] = useState(repoPath);

  const categories: { key: SoftwareCategory; labelAr: string; labelEn: string }[] = [
    { key: 'all', labelAr: 'جميع البرامج', labelEn: 'All Files' },
    { key: 'apple_flashing', labelAr: 'أدوات أبل والتفليش (3uTools)', labelEn: 'Apple & Flash' },
    { key: 'remote_access', labelAr: 'التحكم عن بعد (AnyDesk / UltraViewer)', labelEn: 'Remote Desktop' },
    { key: 'schematics_hardware', labelAr: 'المخططات والصيانة (Borneo / JCID)', labelEn: 'Schematics & PCB' },
    { key: 'drivers_utilities', labelAr: 'التعريفات وحزم الصيانة (Drivers)', labelEn: 'Drivers & Utilities' },
  ];

  const handleSaveRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempRepoInput.trim()) {
      onChangeRepoPath(tempRepoInput.trim());
      setIsRepoModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Top bar: Brand + Search + Utility Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Title */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-3">
              <KararAhmedLogo variant="compact" isAnimated={true} />
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={onToggleLanguage}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold"
                title="Change language"
              >
                {isArabic ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="w-full md:flex-1 max-w-lg relative">
            <Search 
              size={18} 
              className={`absolute top-1/2 -translate-y-1/2 text-zinc-400 ${isArabic ? 'right-3.5' : 'left-3.5'}`} 
            />
            <input
              id="search-programs-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isArabic ? 'ابحث عن برنامج، إصدار، أو نوع الملف (مثال: 3uTools, Borneo, exe)...' : 'Search software, version, or type (e.g., AnyDesk, JCID)...'}
              className={`w-full py-2 text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
                isArabic ? 'pr-10 pl-9' : 'pl-10 pr-9'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className={`absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 ${isArabic ? 'left-2.5' : 'right-2.5'}`}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden md:flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <button
                id="grid-view-btn"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
                title={isArabic ? 'عرض شبكي' : 'Grid View'}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                id="list-view-btn"
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
                title={isArabic ? 'عرض قائمة' : 'List View'}
              >
                <List size={16} />
              </button>
            </div>

            {/* Custom Repo Button */}
            <button
              onClick={() => {
                setTempRepoInput(repoPath);
                setIsRepoModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 transition"
              title={isArabic ? 'تغيير مستودع Hugging Face' : 'Change Hugging Face Dataset'}
            >
              <SlidersHorizontal size={14} />
              <span className="max-w-[90px] truncate">{repoPath.split('/')[1] || repoPath}</span>
            </button>

            {/* Language Switch */}
            <button
              id="toggle-language-btn"
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 transition"
              title="Change Language"
            >
              <Languages size={14} />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="toggle-dark-mode-btn"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 transition"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-0.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`cat-filter-${cat.key}`}
                onClick={() => onCategoryChange(cat.key)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800'
                }`}
              >
                {isArabic ? cat.labelAr : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Repo Dialog */}
      {isRepoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <FolderGit2 className="text-blue-500" size={18} />
                {isArabic ? 'مسار مستودع Hugging Face' : 'Hugging Face Dataset Path'}
              </h3>
              <button 
                onClick={() => setIsRepoModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRepo} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                  {isArabic ? 'معرف المستودع (Username/RepoName)' : 'Dataset Repository ID'}
                </label>
                <input
                  type="text"
                  value={tempRepoInput}
                  onChange={(e) => setTempRepoInput(e.target.value)}
                  placeholder="kkgetrse/kararAhmed"
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setTempRepoInput('kkgetrse/kararAhmed')}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  {isArabic ? 'استعادة الافتراضي' : 'Reset to Default'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRepoModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow"
                  >
                    {isArabic ? 'حفظ وتحميل' : 'Save & Fetch'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
