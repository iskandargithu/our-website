import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { LanguageProvider } from '@/context/LanguageContext';
import { TopMarquee, Navbar } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { ChefsSection } from '@/components/ChefsSection';
import { DiscountsSection } from '@/components/DiscountsSection';
import { CouponBox } from '@/components/CouponBox';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Footer } from '@/components/Footer';
import { MenuItem, Setting, Tab } from '@/types';

function AppContent() {
  const [route, setRoute] = useState(window.location.hash);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const validCode = settings['discount_code'] || 'COFFEE10';
  const discountPct = parseInt(settings['discount_percentage'] || '10', 10);

  const loadData = useCallback(async () => {
    const [itemsRes, settingsRes] = await Promise.all([
      supabase.from('menu_items').select('*').order('created_at', { ascending: true }),
      supabase.from('settings').select('*'),
    ]);

    if (itemsRes.data) setItems(itemsRes.data as MenuItem[]);
    if (settingsRes.data) {
      const map: Record<string, string> = {};
      (settingsRes.data as Setting[]).forEach((s) => {
        map[s.key] = s.value;
      });
      setSettings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function navigateTo(tab: Tab) {
    setActiveTab(tab);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToAdmin() {
    window.location.hash = '/admin';
  }

  function goHome() {
    window.location.hash = '';
    navigateTo('home');
  }

  const isAdmin = route === '#/admin';

  if (isAdmin) {
    return (
      <AdminDashboard
        items={items}
        onItemsUpdated={loadData}
        onBack={goHome}
        validCode={validCode}
        discountPct={discountPct}
        onSettingsUpdated={loadData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-espresso">
      <TopMarquee />

      <Navbar
        onSearchToggle={() => setSearchOpen(!searchOpen)}
        searchOpen={searchOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTabSelect={navigateTo}
        activeTab={activeTab}
        onLogoClick={() => navigateTo('home')}
      />

      <main>
        {loading ? (
          <div className="py-32 text-center">
            <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-espresso-600 border-t-glow-400" />
            <p className="mt-4 text-cream-200/60 text-sm">Loading...</p>
          </div>
        ) : (
          <div key={activeTab} className="animate-page-enter">
            {activeTab === 'home' && (
              <Hero onExploreMenu={() => navigateTo('menu')} />
            )}

            {activeTab === 'menu' && (
              <MenuSection
                items={items}
                searchQuery={searchQuery}
                discountActive={false}
                discountPct={discountPct}
              />
            )}

            {activeTab === 'chefs' && <ChefsSection />}

            {activeTab === 'discounts' && (
              <>
                <DiscountsSection />
                <CouponBox items={items} validCode={validCode} discountPct={discountPct} />
              </>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Hidden admin trigger */}
      <button
        onClick={goToAdmin}
        className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-espresso-700/80 text-espresso-300 hover:text-glow-400 hover:bg-espresso-600 backdrop-blur-sm border border-espresso-600/40 transition-all opacity-30 hover:opacity-100"
        aria-label="Admin"
        title="Admin Dashboard"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
