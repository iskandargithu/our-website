import { useState } from 'react';
import { Tag, Check, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem } from '@/types';

interface CouponBoxProps {
  items: MenuItem[];
  validCode: string;
  discountPct: number;
}

export function CouponBox({ items, validCode, discountPct }: CouponBoxProps) {
  const { t } = useLanguage();
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const isValid = code.trim().toUpperCase() === validCode.toUpperCase();
  const savings = applied && isValid ? total * (discountPct / 100) : 0;
  const final = total - savings;

  function handleApply() {
    if (!code.trim()) return;
    setShowResult(true);
    setApplied(isValid);
  }

  return (
    <section className="relative py-16 sm:py-20 bg-espresso-800/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-espresso-700 to-espresso-800 border border-glow-400/20 p-8 sm:p-10 shadow-2xl shadow-espresso-900/50">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-glow-400/10 text-glow-400 mb-4 animate-glow-pulse">
              <Tag className="h-7 w-7" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
              {t.couponTitle}
            </h2>
            <p className="mt-2 text-cream-200/70 text-sm">{t.couponSubtitle}</p>
          </div>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setShowResult(false);
                  setApplied(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                placeholder={t.couponPlaceholder}
                className="w-full rounded-xl border border-espresso-600/40 bg-espresso-900/50 px-4 py-3 text-sm text-cream placeholder-espresso-300 focus:border-glow-400 focus:outline-none focus:ring-2 focus:ring-glow-400/30 transition-all uppercase tracking-wide"
              />
            </div>
            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-glow-400 px-6 py-3 text-sm font-semibold text-espresso-900 transition-all hover:bg-glow-300 hover:shadow-lg hover:shadow-glow-400/30"
            >
              <Sparkles className="h-4 w-4" />
              {t.couponApply}
            </button>
          </div>

          {/* Result message */}
          {showResult && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium animate-slide-down ${
                isValid
                  ? 'bg-success/10 text-success border border-success/30'
                  : 'bg-error/10 text-error border border-error/30'
              }`}
            >
              {isValid ? (
                <>
                  <Check className="h-4 w-4" />
                  {t.couponValid}
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  {t.couponInvalid}
                </>
              )}
            </div>
          )}

          {/* Live calculation */}
          <div className="mt-6 rounded-xl bg-espresso-900/40 border border-espresso-600/30 p-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream-200/70">{t.originalTotal}</span>
              <span className="text-cream font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream-200/70">{t.discountApplied}</span>
              <span className={applied && isValid ? 'text-glow-300 font-medium' : 'text-cream-200/40'}>
                {applied && isValid ? `-${discountPct}%` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream-200/70">{t.youSave}</span>
              <span className={savings > 0 ? 'text-success font-medium' : 'text-cream-200/40'}>
                {savings > 0 ? `$${savings.toFixed(2)}` : '$0.00'}
              </span>
            </div>
            <div className="border-t border-espresso-600/30 pt-3 flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-cream">{t.finalPrice}</span>
              <span className="font-serif text-2xl font-bold text-glow-300">
                ${final.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Hint */}
          <p className="mt-4 text-center text-xs text-espresso-300">
            Hint: try the code <span className="font-mono font-semibold text-glow-400">{validCode}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
