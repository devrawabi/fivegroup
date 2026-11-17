import React from 'react';
import { CLIENTS } from '@/data/clients';
import { TESTIMONIALS } from '@/data/companyFacts';

export default function LoyaltyCustomersView({ onNavigate }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Header matching BGS Law */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24 max-w-[1400px] mx-auto">
        <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
          Our Partners · Réseau &amp; Clients
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-foreground max-w-5xl">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">Trusted by Qatar's Premier Retailers</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">&amp; Hospitality Institutions</span>
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl">
          Scheduled intake and direct-to-store distribution servicing LuLu, Carrefour, Al Meera,
          Monoprix, Grand Hypermarket, and over 1,200 commercial doors nationwide.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => onNavigate?.('contact-us')}
            className="font-mono text-xs uppercase tracking-[0.22em] bg-[#161833] text-white px-6 py-3.5 hover:bg-[#a3d2e2] hover:text-[#161833] transition"
          >
            Become a Retail Partner →
          </button>
        </div>
      </section>

      {/* 2. Client Logos Bento Grid */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Verified Distribution Accounts ({CLIENTS.length})
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Institutional Retail &amp; HORECA Alliances
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {CLIENTS.map((client) => (
              <div
                key={client.id}
                className="bg-background p-6 flex flex-col items-center justify-between text-center hover:bg-surface transition-colors aspect-square"
              >
                <div className="flex-1 flex items-center justify-center p-2 w-full">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted mt-2 line-clamp-1">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Partner Testimonials in Swiss Hairline Grid */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Executive Feedback · Témoignages
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Commercial Partners on Reliability &amp; Fulfillment
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.name} className="bg-background p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#161833] font-semibold block mb-4">
                    Statement 0{idx + 1}
                  </span>
                  <p className="font-display text-base md:text-lg text-foreground font-normal leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-line pt-4 font-mono text-xs">
                  <span className="text-foreground font-semibold block">{t.name}</span>
                  <span className="text-muted block text-[11px]">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
