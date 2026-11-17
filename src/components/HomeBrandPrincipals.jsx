import React from 'react';
import { BRAND_ALLIANCES } from '@/data/companyFacts';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeBrandPrincipals() {
  const { language } = useLanguage();
  const brands = [...BRAND_ALLIANCES, ...BRAND_ALLIANCES];

  return (
    <section
      id="home-brands"
      className="border-t border-line bg-surface px-6 py-16 md:px-12 md:py-20 overflow-hidden"
      aria-labelledby="home-brands-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                {language === 'ar' ? 'الشركاء العالميون' : 'Brand Principals'}
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              id="home-brands-heading"
              className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-[450] leading-[1.1] tracking-tight text-foreground"
            >
              {language === 'ar'
                ? ['علامات نثق بتمثيلها', 'في قطر']
                : ['Trusted Names We', 'Represent in Qatar']}
            </RevealText>
          </div>
        </div>

        <BgsScrollReveal>
          <div className="relative overflow-hidden">
            <div
              dir="ltr"
              className="animate-marquee-track flex w-max gap-3 py-1 md:gap-4"
              style={{ '--marquee-duration': '55s' }}
              aria-label={
                language === 'ar' ? 'شركاء العلامات التجارية' : 'Brand principal partners'
              }
            >
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex h-16 shrink-0 items-center border border-line bg-background px-6 md:h-20 md:px-8"
                >
                  <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-foreground md:text-[13px]">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BgsScrollReveal>
      </div>
    </section>
  );
}
