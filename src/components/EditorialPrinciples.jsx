import React from 'react';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';

export default function EditorialPrinciples() {
  const principles = [
    {
      index: '01',
      text: 'We partner with global FMCG manufacturers to import, safeguard, and distribute premium products across Qatar and the GCC.',
    },
    {
      index: '02',
      text: 'High-level operational discipline forged through two decades of supply chain execution under the Rawabi Group umbrella.',
    },
    {
      index: '03',
      text: 'A dedicated, responsive team providing hands-on merchant support, fast contract turnaround, and tailored replenishment.',
    },
    {
      index: '04',
      text: 'We leverage end-to-end multi-temperature cold chain infrastructure to eliminate storage risks and protect brand equity.',
    },
    {
      index: '05',
      text: 'A truly international sourcing network spanning 11+ countries including Italy, Spain, India, Thailand, and Malaysia.',
    },
    {
      index: '06',
      text: 'Trusted by tier-1 hypermarket procurement heads and corporate HORECA managers who require uncompromising SLA consistency.',
    },
    {
      index: '07',
      text: 'In every engagement, a pragmatic commercial strategy aligned with our retail partners to accelerate shelf-velocity and optimize margins.',
    },
  ];

  return (
    <section className="border-t border-line bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Heading with RevealText line reveals */}
        <div className="mb-6">
          <BgsScrollReveal>
            <div className="mb-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
              Institutional Values
            </div>
          </BgsScrollReveal>

          <RevealText
            as="h2"
            className="font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.04] tracking-tight font-[450] text-foreground"
          >
            {[
              'Proximity, precision,',
              'immediate responsiveness',
            ]}
          </RevealText>
        </div>

        {/* Editorial Two-Column List with Hairline Borders & Staggered Scroll Reveal */}
        <ul className="mt-14 grid border-t border-line md:grid-cols-2 md:gap-x-16 list-none p-0 m-0">
          {principles.map((item, idx) => (
            <BgsScrollReveal
              as="li"
              key={item.index}
              delay={idx * 0.05}
              className="flex items-baseline gap-6 border-b border-line py-7 md:py-8 group"
            >
              <span className="font-mono text-xs text-navy font-medium shrink-0">
                [{item.index}]
              </span>
              <p className="font-display text-lg leading-snug md:text-xl text-foreground font-normal">
                {item.text}
              </p>
            </BgsScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
