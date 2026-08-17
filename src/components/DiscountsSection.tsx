import { Clock, Tag, PartyPopper } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const DISCOUNTS = [
  {
    icon: Clock,
    title: 'Happy Hour',
    desc: '20% off all pastries from 4 PM to 6 PM, every single day.',
    badge: 'Daily',
  },
  {
    icon: Tag,
    title: 'COFFEE10',
    desc: 'Use the code COFFEE10 at checkout for 10% off your entire order.',
    badge: 'Code',
  },
  {
    icon: PartyPopper,
    title: 'Private Events',
    desc: 'Book our cozy space for private events and enjoy a special group rate.',
    badge: 'Seasonal',
  },
];

export function DiscountsSection() {
  const { t } = useLanguage();

  return (
    <section id="discounts" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-glow-400 uppercase tracking-widest">
            {t.navDiscounts}
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-cream">
            {t.discountsTitle}
          </h2>
          <p className="mt-3 text-cream-200/70 max-w-2xl mx-auto">{t.discountsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {DISCOUNTS.map(({ icon: Icon, title, desc, badge }) => (
            <article
              key={title}
              className="group rounded-2xl bg-cream-100 p-6 shadow-lg shadow-espresso-900/20 border border-espresso-600/20 transition-all hover:shadow-glow-400/20 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-glow-50 text-glow-500 transition-colors group-hover:bg-glow-400 group-hover:text-espresso-900">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-espresso-700/10 px-3 py-1 text-xs font-semibold text-espresso-500">
                  {badge}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-espresso-700">{title}</h3>
              <p className="mt-2 text-sm text-espresso-400 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
