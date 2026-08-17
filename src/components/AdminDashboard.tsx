import { useState, useEffect } from 'react';
import { Save, ArrowLeft, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem } from '@/types';

interface AdminDashboardProps {
  items: MenuItem[];
  onItemsUpdated: () => void;
  onBack: () => void;
  validCode: string;
  discountPct: number;
  onSettingsUpdated: () => void;
}

export function AdminDashboard({
  items,
  onItemsUpdated,
  onBack,
  validCode,
  discountPct,
  onSettingsUpdated,
}: AdminDashboardProps) {
  const { t } = useLanguage();
  const [priceEdits, setPriceEdits] = useState<Record<string, string>>({});
  const [codeEdit, setCodeEdit] = useState(validCode);
  const [pctEdit, setPctEdit] = useState(String(discountPct));
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setCodeEdit(validCode);
    setPctEdit(String(discountPct));
  }, [validCode, discountPct]);

  async function handleSave() {
    setSaving(true);
    try {
      for (const item of items) {
        const editVal = priceEdits[item.id];
        if (editVal !== undefined && editVal !== '') {
          const newPrice = parseFloat(editVal);
          if (!isNaN(newPrice) && newPrice >= 0) {
            await supabase
              .from('menu_items')
              .update({ price: newPrice })
              .eq('id', item.id);
          }
        }
      }

      await supabase
        .from('settings')
        .update({ value: codeEdit.trim().toUpperCase() })
        .eq('key', 'discount_code');
      await supabase
        .from('settings')
        .update({ value: pctEdit })
        .eq('key', 'discount_percentage');

      onItemsUpdated();
      onSettingsUpdated();
      setPriceEdits({});
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-espresso py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-cream-200/70 hover:text-glow-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-cream">{t.adminTitle}</h1>
          <p className="mt-2 text-cream-200/60">{t.adminSubtitle}</p>
        </div>

        {/* Menu price editor */}
        <div className="rounded-2xl bg-cream-100 p-6 shadow-xl mb-6">
          <h2 className="font-serif text-xl font-bold text-espresso-700 mb-4">
            {t.navMenu}
          </h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl bg-cream-200 p-4 border border-espresso-100"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-espresso-700 truncate">{item.name}</div>
                  <div className="text-xs text-espresso-400 capitalize">{item.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-espresso-400">$</span>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    defaultValue={item.price.toFixed(2)}
                    onChange={(e) =>
                      setPriceEdits((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    className="w-24 rounded-lg border border-espresso-100 bg-white px-3 py-2 text-sm text-espresso-700 focus:border-glow-400 focus:outline-none focus:ring-2 focus:ring-glow-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount settings */}
        <div className="rounded-2xl bg-cream-100 p-6 shadow-xl mb-6">
          <h2 className="font-serif text-xl font-bold text-espresso-700 mb-4">
            {t.navDiscounts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-espresso-500 mb-1.5">
                {t.adminDiscountCode}
              </label>
              <input
                type="text"
                value={codeEdit}
                onChange={(e) => setCodeEdit(e.target.value)}
                className="w-full rounded-lg border border-espresso-100 bg-white px-4 py-2.5 text-sm text-espresso-700 focus:border-glow-400 focus:outline-none focus:ring-2 focus:ring-glow-100 uppercase tracking-wide"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-espresso-500 mb-1.5">
                {t.adminDiscountPct}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pctEdit}
                  onChange={(e) => setPctEdit(e.target.value)}
                  className="w-full rounded-lg border border-espresso-100 bg-white px-4 py-2.5 pr-8 text-sm text-espresso-700 focus:border-glow-400 focus:outline-none focus:ring-2 focus:ring-glow-100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-espresso-300">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-glow-400 px-6 py-3 text-sm font-semibold text-espresso-900 transition-all hover:bg-glow-300 hover:shadow-lg hover:shadow-glow-400/30 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : t.adminSave}
          </button>
          {savedMsg && (
            <span className="inline-flex items-center gap-1.5 text-sm text-success animate-slide-down">
              <Check className="h-4 w-4" />
              {t.adminSaved}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
