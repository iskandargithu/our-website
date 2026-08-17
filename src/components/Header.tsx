import { useState, useRef, useEffect } from 'react';
import { Coffee, Globe, Search, Settings, ChevronRight, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language, Tab } from '@/types';

export function TopMarquee() {
  const message =
    '☕ Freshly roasted single-origin espresso beans available now!   🥐 Happy Hour: Get 20% off all pastries from 4 PM to 6 PM daily!   🎉 Book our cozy space for your next private event!';
  const fullMessage = message + '   ';

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-glow-700 via-glow-400 to-glow-600 py-2">
      <div className="absolute inset-0 bg-gradient-to-r from-glow-800 via-transparent to-glow-800 opacity-40" />
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-sm font-medium text-white glow-text px-4">
          {fullMessage}
        </span>
        <span className="text-sm font-medium text-white glow-text px-4" aria-hidden="true">
          {fullMessage}
        </span>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-glow-700 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-glow-600 to-transparent" />
    </div>
  );
}

interface NavbarProps {
  onSearchToggle: () => void;
  searchOpen: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onTabSelect: (tab: Tab) => void;
  activeTab: Tab;
  onLogoClick: () => void;
}

export function Navbar({
  onSearchToggle,
  searchOpen,
  searchQuery,
  onSearchChange,
  onTabSelect,
  activeTab,
  onLogoClick,
}: NavbarProps) {
  const { t } = useLanguage();

  const navLinks: { key: 'navHome' | 'navMenu' | 'navChefs' | 'navDiscounts'; tab: Tab }[] = [
    { key: 'navHome', tab: 'home' },
    { key: 'navMenu', tab: 'menu' },
    { key: 'navChefs', tab: 'chefs' },
    { key: 'navDiscounts', tab: 'discounts' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-espresso-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso-700 text-glow-400 transition-transform group-hover:scale-110">
              <Coffee className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-bold text-espresso-700 tracking-tight">
              Velvet <span className="text-glow-500">&</span> Bean
            </span>
          </button>

          {/* Center nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ key, tab }) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onTabSelect(tab)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-glow-400 text-espresso-900 shadow-md shadow-glow-400/30'
                      : 'bg-espresso-50 text-espresso-600 hover:bg-glow-50 hover:text-glow-500'
                  }`}
                >
                  {t[key]}
                </button>
              );
            })}
          </div>

          {/* Right utility */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchToggle}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                searchOpen
                  ? 'bg-glow-50 text-glow-500'
                  : 'text-espresso-600 hover:bg-cream-200 hover:text-glow-500'
              }`}
              aria-label={t.search}
            >
              <Search className="h-5 w-5" />
            </button>
            <a
              href="tel:+15535550142"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-glow-400 px-4 py-2 text-sm font-semibold text-espresso-900 shadow-md shadow-glow-400/30 transition-all hover:bg-glow-300 hover:shadow-glow-400/50 hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Order Online
            </a>
            <SettingsDropdown />
          </div>
        </div>

        {/* Search bar overlay */}
        {searchOpen && (
          <div className="pb-3 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-espresso-300" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-espresso-100 bg-cream-100 py-2.5 pl-10 pr-4 text-sm text-espresso-700 placeholder-espresso-300 focus:border-glow-400 focus:outline-none focus:ring-2 focus:ring-glow-100 transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function SettingsDropdown() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'zh', label: 'Chinese' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          setOpen(!open);
          setLangOpen(false);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-espresso-600 hover:bg-cream-200 hover:text-glow-500 transition-colors"
        aria-label={t.settings}
      >
        <Settings className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-espresso-100 bg-white shadow-xl animate-slide-down overflow-hidden">
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-espresso-600 hover:bg-cream-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-glow-500" />
                {t.language}
              </span>
              <ChevronRight
                className={`h-4 w-4 text-espresso-300 transition-transform ${langOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {langOpen && (
              <div className="border-t border-espresso-100">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setOpen(false);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                      language === l.code
                        ? 'bg-glow-50 text-glow-600 font-medium'
                        : 'text-espresso-500 hover:bg-cream-100'
                    }`}
                  >
                    {l.label}
                    {language === l.code && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-glow-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
