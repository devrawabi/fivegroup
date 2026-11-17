import React from 'react';
import { HOME_IMPACT_STATS, QUALITY_BADGES } from '@/data/companyFacts';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeStandards() {
  const { language } = useLanguage();

  return (
    <section
      id="home-standards"
      className="border-t border-line bg-surface px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="home-standards-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-2xl md:mb-12">
          <BgsScrollReveal>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
              {language === 'ar' ? 'معايير التميز' : 'Winning Standards'}
            </div>
          </BgsScrollReveal>
          <RevealText
            as="h2"
            id="home-standards-heading"
            className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
          >
            {language === 'ar'
              ? ['انضباط تشغيلي', 'يثق به الشركاء']
              : ['Discipline Partners', 'Can Measure']}
          </RevealText>
        </div>

        <BgsScrollReveal>
          <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {HOME_IMPACT_STATS.map((stat) => (
              <div key={stat.label} className="bg-background px-5 py-7 md:px-6 md:py-9">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </BgsScrollReveal>

        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY_BADGES.map((badge, idx) => (
            <BgsScrollReveal key={badge.title} delay={idx * 0.04} className="h-full">
              <article className="h-full bg-background p-6 md:p-7">
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-navy">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-normal tracking-tight text-foreground">
                  {badge.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted">{badge.body}</p>
              </article>
            </BgsScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
