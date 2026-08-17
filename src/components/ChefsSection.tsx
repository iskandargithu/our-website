import { useState, useEffect } from 'react';
import { X, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Chef {
  name: string;
  role: string;
  title: string;
  specialty: string;
  signatureDish: string;
  bio: string;
  experience: string;
  image: string;
}

const CHEFS: Chef[] = [
  {
    name: 'Marco Esposito',
    role: 'Head Barista',
    title: 'Master Barista & Coffee Director',
    specialty: 'Single-origin espresso & latte art',
    signatureDish: 'Three-Layer Maple Cortado',
    bio: 'Marco began his journey in the coffee houses of Naples, spending over a decade perfecting the art of extraction. He has trained under world-champion baristas and holds certifications from the Specialty Coffee Association. At Velvet & Bean, he oversees every bean from roast to pour, ensuring each cup reflects the terroir of its origin.',
    experience: '14 years',
    image: 'https://images.pexels.com/photos/20609544/pexels-photo-20609544.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
  },
  {
    name: 'Sofia Almeida',
    role: 'Pastry Chef',
    title: 'Executive Pastry Chef',
    specialty: 'French viennoiserie & sourdough',
    signatureDish: '72-Hour Sourdough Butter Croissant',
    bio: 'Sofia trained at Le Cordon Bleu in Paris before refining her craft at a Michelin-starred patisserie in Lisbon. She is obsessed with fermentation science and lamination technique, often spending days perfecting a single dough. Her pastries are known for their shatteringly crisp layers and deeply complex flavor profiles.',
    experience: '11 years',
    image: 'https://images.pexels.com/photos/5964621/pexels-photo-5964621.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
  },
  {
    name: 'Daniel Hartmann',
    role: 'Kitchen Lead',
    title: 'Culinary Director & Kitchen Lead',
    specialty: 'Seasonal brunch & savory plates',
    signatureDish: 'Smoked Salmon Avocado Tartine',
    bio: 'Daniel brings a farm-to-table philosophy honed across kitchens in Copenhagen and Portland. He works directly with local growers to source produce at peak seasonality, designing menus that change weekly. His plates balance Nordic minimalism with the warmth of Pacific Northwest comfort food.',
    experience: '9 years',
    image: 'https://images.pexels.com/photos/4253298/pexels-photo-4253298.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
  },
];

export function ChefsSection() {
  const { t } = useLanguage();
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedChef(null);
    }
    if (selectedChef) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [selectedChef]);

  return (
    <section id="chefs" className="relative py-20 sm:py-28 bg-espresso-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-glow-400 uppercase tracking-widest">
            {t.navChefs}
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-cream">
            {t.chefsTitle}
          </h2>
          <p className="mt-3 text-cream-200/70 max-w-2xl mx-auto">{t.chefsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CHEFS.map((chef) => (
            <button
              key={chef.name}
              onClick={() => setSelectedChef(chef)}
              className="group rounded-2xl bg-cream-100 overflow-hidden shadow-lg shadow-espresso-900/30 border border-espresso-600/20 transition-all hover:shadow-glow-400/20 hover:-translate-y-1 text-left w-full cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-block rounded-full bg-glow-400/90 px-3 py-1 text-xs font-bold text-espresso-900">
                    {chef.role}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-espresso-900/70 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm transition-colors group-hover:bg-glow-400 group-hover:text-espresso-900">
                    View Profile
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-espresso-700">{chef.name}</h3>
                <p className="mt-1 text-sm text-espresso-400">{chef.specialty}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-glow-50 px-2.5 py-1 text-xs font-medium text-glow-600">
                  <Award className="h-3 w-3" />
                  {chef.signatureDish}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      {selectedChef && (
        <ChefModal chef={selectedChef} onClose={() => setSelectedChef(null)} />
      )}
    </section>
  );
}

function ChefModal({ chef, onClose }: { chef: Chef; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso-900/80 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-cream-100 shadow-2xl shadow-espresso-900/50 border border-espresso-600/20"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-espresso-900/60 text-cream backdrop-blur-sm transition-all hover:bg-glow-400 hover:text-espresso-900 hover:scale-110"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image header */}
        <div className="relative h-64 sm:h-72 overflow-hidden rounded-t-2xl">
          <img
            src={chef.image}
            alt={chef.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/90 via-espresso-900/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <span className="inline-block rounded-full bg-glow-400 px-3 py-1 text-xs font-bold text-espresso-900 mb-2">
              {chef.role}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
              {chef.name}
            </h2>
            <p className="mt-1 text-sm text-cream-200/80">{chef.title}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-espresso-50 px-4 py-2.5">
              <Clock className="h-4 w-4 text-glow-500" />
              <div>
                <div className="text-xs text-espresso-400 uppercase tracking-wide">Experience</div>
                <div className="text-sm font-semibold text-espresso-700">{chef.experience}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-espresso-50 px-4 py-2.5">
              <Award className="h-4 w-4 text-glow-500" />
              <div>
                <div className="text-xs text-espresso-400 uppercase tracking-wide">Focus</div>
                <div className="text-sm font-semibold text-espresso-700">{chef.specialty}</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-serif text-lg font-bold text-espresso-700 mb-2">
              Culinary Background
            </h3>
            <p className="text-sm text-espresso-500 leading-relaxed">
              {chef.bio}
            </p>
          </div>

          {/* Signature dish badge */}
          <div className="rounded-xl bg-gradient-to-r from-glow-50 to-glow-100/50 border border-glow-200/40 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-glow-400 text-espresso-900">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-glow-600 uppercase tracking-wide mb-1">
                  Signature Specialty
                </div>
                <div className="font-serif text-lg font-bold text-espresso-700">
                  {chef.signatureDish}
                </div>
                <p className="mt-1 text-sm text-espresso-400">
                  The dish that defines {chef.name.split(' ')[0]}'s craft at Velvet &amp; Bean.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
