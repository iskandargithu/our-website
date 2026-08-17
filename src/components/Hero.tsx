const HERO_IMAGE =
  'https://images.pexels.com/photos/34104248/pexels-photo-34104248.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface HeroProps {
  onExploreMenu: () => void;
}

export function Hero({ onExploreMenu }: HeroProps) {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Full-width hero image — no heavy overlapping text */}
      <div className="relative h-[50vh] sm:h-[60vh] w-full">
        <img
          src={HERO_IMAGE}
          alt="Velvet & Bean cozy café interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-900/40 via-transparent to-espresso-900/30" />
      </div>

      {/* Wavy white intro section */}
      <div className="relative bg-cream-100">
        {/* Wavy SVG divider at top */}
        <div className="absolute -top-1 left-0 right-0 leading-[0]">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-[40px] sm:h-[60px]"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
          <span className="text-xs font-semibold text-glow-500 uppercase tracking-widest">
            Artisanal Specialty Café
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-700 leading-tight text-balance">
            Premium single-origin espresso and artisanal pastries crafted for slow mornings.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-espresso-500 leading-relaxed max-w-2xl mx-auto">
            From bean to cup, every detail is intentional. We source ethically, roast in-house,
            and pour with care — so your morning ritual feels effortless.
          </p>

          {/* CTA button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onExploreMenu}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-glow-400 px-8 py-3.5 text-sm font-semibold text-espresso-900 shadow-lg shadow-glow-400/30 transition-all hover:bg-glow-300 hover:shadow-glow-400/50 hover:-translate-y-0.5"
            >
              Explore Menu
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              ['12+', 'Single Origins'],
              ['8', 'Master Chefs'],
              ['100%', 'Locally Sourced'],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-3xl font-bold text-glow-500">{num}</div>
                <div className="text-xs text-espresso-400 uppercase tracking-wide mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
