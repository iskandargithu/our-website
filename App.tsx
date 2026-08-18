import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { TopMarquee, Navbar } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { ChefsSection } from '@/components/ChefsSection';
import { DiscountsSection } from '@/components/DiscountsSection';
import { CouponBox } from '@/components/CouponBox';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Footer } from '@/components/Footer';
import { Tab } from '@/types';
import { MENU_ITEMS, CAFE_SETTINGS } from '@/lib/data';

function AppContent() {
  const [route, setRoute] = useState(window.location.hash);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(MENU_ITEMS);
  const [validCode, setValidCode] = useState(CAFE_SETTINGS.discountCode);
  const [discountPct, setDiscountPct] = useState(CAFE_SETTINGS.discountPercentage);

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

  function handleSettingsUpdate(newCode: string, newPct: number, priceEdits: Record<string, number>) {
    setValidCode(newCode);
    setDiscountPct(newPct);
    setItems((prev) =>
      prev.map((item) =>
        priceEdits[item.id] !== undefined ? { ...item, price: priceEdits[item.id] } : item,
      ),
    );
  }

  const isAdmin = route === '#/admin';

  if (isAdmin) {
    return (
      <AdminDashboard
        items={items}
        validCode={validCode}
        discountPct={discountPct}
        onSettingsUpdate={handleSettingsUpdate}
        onBack={goHome}
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
        <div key={activeTab} className="animate-page-enter">
          {activeTab === 'home' && <Hero onExploreMenu={() => navigateTo('menu')} />}

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
