import React from 'react';
import { AWARDS } from '@/data/companyFacts';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeAwards() {
  const { language } = useLanguage();
  const items = [...AWARDS, ...AWARDS];

  return (
    <section
      id="home-awards"
      className="border-t border-line bg-background py-20 md:py-28 overflow-hidden"
      aria-labelledby="home-awards-heading"
    >
      <div className="mx-auto mb-10 max-w-[1400px] px-6 md:mb-12 md:px-12">
        <BgsScrollReveal>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
            {language === 'ar' ? 'الجوائز والتقدير' : 'Awards & Recognition'}
          </div>
        </BgsScrollReveal>
        <RevealText
          as="h2"
          id="home-awards-heading"
          className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
        >
          {language === 'ar'
            ? ['إنجازات تثبت', 'جودة التنفيذ']
            : ['Recognition That', 'Reflects Execution']}
        </RevealText>
      </div>

      <BgsScrollReveal>
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent sm:w-20 md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent sm:w-20 md:w-28" />

          <div
            dir="ltr"
            className="animate-marquee-track flex w-max gap-5 px-4 md:gap-6"
            style={{ '--marquee-duration': '48s' }}
            aria-label={
              language === 'ar' ? 'جوائز وتقديرات الشركة' : 'Company awards and recognitions'
            }
          >
            {items.map((award, index) => (
              <article
                key={`${award.title}-${index}`}
                className="flex w-[220px] shrink-0 flex-col items-center border border-line bg-surface px-5 py-6 sm:w-[240px] md:w-[260px] md:px-6 md:py-7"
              >
                <div className="flex h-[110px] w-full items-center justify-center sm:h-[120px]">
                  <img
                    src={award.image}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                    width={348}
                    height={157}
                  />
                </div>
                <h3 className="mt-5 text-center font-display text-sm font-medium leading-snug tracking-tight text-foreground md:text-[15px]">
                  {award.title}
                </h3>
                {award.subtitle ? (
                  <p className="mt-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {award.subtitle}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </BgsScrollReveal>
    </section>
  );
}
