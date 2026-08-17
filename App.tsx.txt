import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ChefsSection from './components/ChefsSection';
import CouponBox from './components/CouponBox';
import DiscountsSection from './components/DiscountsSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { LanguageProvider } from './context/LanguageContext';

// Hardcoded premium data array that bypasses Supabase completely
const OFFLINE_MENU_ITEMS = [
  {
    id: '1',
    name: 'Espresso Intenso',
    description: 'A full-bodied, dark roast espresso shot with a rich, velvety crema coating.',
    price: 3.50,
    category: 'coffee',
    image_url: 'https://unsplash.com',
    id_category: 'coffee'
  },
  {
    id: '2',
    name: 'Velvet Vanilla Latte',
    description: 'Signature espresso blended with smooth Madagascar vanilla bean syrup and micro-foam.',
    price: 4.75,
    category: 'coffee',
    image_url: 'https://unsplash.com',
    id_category: 'coffee'
  },
  {
    id: '3',
    name: 'The Signature Burger',
    description: 'Premium flame-grilled Angus beef, melted cheddar cheese, crisp butter lettuce, and house sauce on a brioche bun.',
    price: 13.99,
    category: 'meals',
    image_url: 'https://unsplash.com',
    id_category: 'meals'
  },
  {
    id: '4',
    name: 'Crispy Truffle Fries',
    description: 'Golden, hand-cut potatoes tossed in white truffle oil, grated parmesan cheese, and fresh rosemary.',
    price: 6.50,
    category: 'snacks',
    image_url: 'https://unsplash.com',
    id_category: 'snacks'
  },
  {
    id: '5',
    name: 'Avocado Toast Elite',
    description: 'Smashed organic avocado, heirloom cherry tomatoes, feta cheese, and microgreens on toasted sourdough.',
    price: 9.25,
    category: 'meals',
    image_url: 'https://unsplash.com',
    id_category: 'meals'
  },
  {
    id: '6',
    name: 'Warm Fudge Brownie',
    description: 'Rich, gooey double chocolate brownie served warm with a dusting of premium powdered sugar.',
    price: 5.00,
    category: 'desserts',
    image_url: 'https://unsplash.com',
    id_category: 'desserts'
  }
];

export default function App() {
  const [items, setItems] = useState(OFFLINE_MENU_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [discountActive, setDiscountActive] = useState(false);
  const [discountPct, setDiscountPct] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  // Fallback check to ensure items array never empties out
  useEffect(() => {
    if (!items || items.length === 0) {
      setItems(OFFLINE_MENU_ITEMS);
    }
  }, [items]);

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-950 text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950">
        <Header onOpenAdmin={() => setShowAdmin(true)} />
        <main>
          <Hero />
          <MenuSection 
            items={items} 
            searchQuery={searchQuery}
            discountActive={discountActive}
            discountPct={discountPct}
          />
          <ChefsSection />
          <CouponBox 
            onApplyDiscount={(pct) => {
              setDiscountActive(true);
              setDiscountPct(pct);
            }} 
          />
          <DiscountsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

