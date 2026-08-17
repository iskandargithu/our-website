import { Coffee, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-espresso-600/30 bg-espresso-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso-700 text-glow-400">
                <Coffee className="h-4 w-4" />
              </span>
              <span className="font-serif text-lg font-bold text-cream">
                Velvet <span className="text-glow-400">&</span> Bean
              </span>
            </div>
            <p className="text-sm text-cream-200/50 leading-relaxed max-w-xs">
              Artisanal specialty café. Single-origin espresso, hand-crafted pastries, and a cozy space to call your own.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold text-cream mb-3 uppercase tracking-wide">Hours</h4>
            <ul className="space-y-1.5 text-sm text-cream-200/60">
              <li className="flex justify-between"><span>Mon – Fri</span><span>7AM – 8PM</span></li>
              <li className="flex justify-between"><span>Sat – Sun</span><span>8AM – 9PM</span></li>
              <li className="flex justify-between"><span>Happy Hour</span><span>4PM – 6PM</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cream mb-3 uppercase tracking-wide">Visit Us</h4>
            <ul className="space-y-1.5 text-sm text-cream-200/60">
              <li>128 Maple Grove Lane</li>
              <li>Portland, OR 97201</li>
              <li>(503) 555-0142</li>
              <li className="text-glow-400">hello@velvetandbean.cafe</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-espresso-600/20 flex items-center justify-between">
          <p className="text-xs text-cream-200/40">
            © {new Date().getFullYear()} Velvet &amp; Bean. All rights reserved.
          </p>
          <p className="text-xs text-cream-200/40 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-glow-400 fill-current" /> and good coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
