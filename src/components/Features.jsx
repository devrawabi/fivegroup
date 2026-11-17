import React from 'react';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';

export default function Features({ onNavigate }) {
  const practiceAreas = [
    {
      id: 'retail',
      title: 'Retail & Hypermarket Distribution',
      desc: 'Direct scheduled supply into Qatar’s leading hypermarket and supermarket chains including Al Meera, LuLu, Carrefour, and Monoprix.',
      target: 'business-categories',
    },
    {
      id: 'horeca',
      title: 'HORECA & Hospitality Provisions',
      desc: 'Complete dry, chilled, and frozen pantry solutions for luxury hotels, commercial kitchens, caterers, and culinary venues.',
      target: 'business-categories',
    },
    {
      id: 'warehousing',
      title: 'Multi-Temperature Warehousing',
      desc: '16,000+ sqm certified facilities divided into ambient dry, chilled (+2°C to +4°C), and deep-freeze (-20°C) storage zones.',
      target: 'business-logistics',
    },
    {
      id: 'logistics',
      title: 'Cold-Chain Fleet & Distribution',
      desc: 'GPS-monitored refrigerated fleet executing daily temperature-guaranteed deliveries across Qatar with 99.4% on-time fulfillment.',
      target: 'business-logistics',
    },
    {
      id: 'brands',
      title: 'International Brand Representation',
      desc: 'Exclusive market entry, regulatory compliance, customs clearance, and brand positioning for world-class FMCG manufacturers.',
      target: 'business-categories',
    },
    {
      id: 'wholesale',
      title: 'Wholesale & Cash & Carry Trade',
      desc: 'High-volume trading with container-load shipments and rapid replenishment for wholesale merchants and institutional buyers.',
      target: 'business-categories',
    },
    {
      id: 'ecommerce',
      title: 'Omnichannel & E-Commerce Fulfillment',
      desc: 'Assortment integration and micro-replenishment supporting Qatar’s rapid on-demand grocery platforms and quick-commerce channels.',
      target: 'business-categories',
    },
  ];

  return (
    <section
      id="areas-of-expertise"
      className="border-t border-line px-6 py-24 md:px-12 md:py-32 bg-background"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header with exact RevealText line reveals */}
        <div className="mb-16">
          <BgsScrollReveal>
            <div className="mb-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
              Areas of Expertise
            </div>
          </BgsScrollReveal>

          <RevealText
            as="h2"
            className="font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.04] tracking-tight font-[450] text-foreground"
          >
            {[
              'Strategic FMCG Supply',
              '& Cold-Chain Across Qatar',
            ]}
          </RevealText>
        </div>

        {/* Swiss Bento Hairline Grid with Staggered Scroll Reveal */}
        <ul className="grid gap-px border border-line bg-line md:grid-flow-col md:grid-cols-3 md:grid-rows-[repeat(3,1fr)] list-none p-0 m-0">
          {practiceAreas.map((area, idx) => (
            <BgsScrollReveal
              as="li"
              key={area.id}
              delay={idx * 0.05}
              className="bg-background h-full"
            >
              <a
                href={`#${area.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(area.target);
                }}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-surface md:p-9"
              >
                <h3 className="font-display text-xl leading-tight md:text-2xl font-normal text-foreground group-hover:text-navy">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted font-light">{area.desc}</p>
                <span
                  aria-hidden="true"
                  className="mt-auto inline-block pt-6 font-mono text-xs text-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-foreground"
                >
                  →
                </span>
              </a>
            </BgsScrollReveal>
          ))}

          {/* Decorative Spacer Cell — dotted Qatar map */}
          <li
            aria-hidden="true"
            className="hidden bg-background md:block"
            style={{ gridRowEnd: 'span 2' }}
          >
            <div className="flex h-full flex-col justify-end gap-4 px-9 pb-9 pt-4">
              <div className="mx-auto flex w-full max-w-[280px] flex-1 items-end justify-center">
                <img
                  src="/brand/qatar-dot-map.png"
                  alt=""
                  className="h-full max-h-full w-full object-contain object-bottom"
                  draggable={false}
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/60">
                Five Group Trading W.L.L.
                <br />
                Doha, Qatar
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
