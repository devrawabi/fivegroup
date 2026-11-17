import React from 'react';
import { AWARDS } from '@/data/companyFacts';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeAwards() {
  const { language } = useLanguage();

  return (
    <section
      id="home-awards"
      className="border-t border-line bg-background px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="home-awards-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 max-w-2xl md:mb-12">
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
              ? ['لحظات تثبت', 'جودة التنفيذ']
              : ['Moments That Prove', 'Execution Quality']}
          </RevealText>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3 md:gap-6">
          {AWARDS.map((award, idx) => (
            <BgsScrollReveal as="li" key={award.title} delay={idx * 0.05} className="h-full">
              <article className="flex h-full flex-col border border-line bg-background">
                <div className="aspect-[16/10] overflow-hidden border-b border-line bg-surface">
                  <img
                    src={award.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-normal tracking-tight text-foreground">
                    {award.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted">{award.body}</p>
                </div>
              </article>
            </BgsScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
