import { useLanguage } from '@/context/LanguageContext';
import { MenuItem } from '@/types';

interface MenuSectionProps {
  items: MenuItem[];
  searchQuery: string;
  discountActive: boolean;
  discountPct: number;
}

export function MenuSection({ items, searchQuery, discountActive, discountPct }: MenuSectionProps) {
  const { t } = useLanguage();

  const filtered = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <section id="menu" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-glow-400 uppercase tracking-widest">
            {t.navMenu}
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-cream">
            {t.menuTitle}
          </h2>
          <p className="mt-3 text-cream-200/70 max-w-2xl mx-auto">{t.menuSubtitle}</p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((item) => {
              const discounted = discountActive
                ? item.price * (1 - discountPct / 100)
                : item.price;
              return (
                <article
                  key={item.id}
                  className="group rounded-2xl bg-cream-100 overflow-hidden shadow-lg shadow-espresso-900/30 border border-espresso-600/20 transition-all hover:shadow-glow-400/20 hover:-translate-y-1 animate-fade-in"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-espresso-900/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm capitalize">
                      {item.category}
                    </div>
                    {discountActive && (
                      <div className="absolute top-3 right-3 rounded-full bg-glow-400 px-3 py-1 text-xs font-bold text-espresso-900 animate-glow-pulse">
                        -{discountPct}%
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-espresso-700">{item.name}</h3>
                    <p className="mt-2 text-sm text-espresso-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        {discountActive ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-glow-500">
                              ${discounted.toFixed(2)}
                            </span>
                            <span className="text-sm text-espresso-300 line-through">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-espresso-700">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button className="rounded-xl bg-espresso-700 px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-glow-500 hover:text-espresso-900">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-espresso-600/30 mb-4">
              <svg className="h-8 w-8 text-espresso-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-cream-200/60">{t.noResults}</p>
          </div>
        )}
      </div>
    </section>
  );
}
