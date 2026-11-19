import React from 'react';
import { TESTIMONIALS } from '@/data/companyFacts';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeTestimonials() {
  const { language, isRtl } = useLanguage();

  // Double testimonials array for seamless infinite looping (-50% translateX)
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="home-testimonials"
      className="border-t border-line bg-surface py-20 md:py-28 overflow-hidden transition-colors duration-300 relative"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-line">
          <div className="max-w-3xl">
            <BgsScrollReveal>
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
                <span className="size-2 rounded-full bg-lime animate-pulse" />
                <span>
                  {language === 'ar' ? 'شهادات الشركاء' : 'Partner Endorsements'}
                </span>
              </div>
            </BgsScrollReveal>

            <RevealText
              as="h2"
              className="font-display text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.08] tracking-tight font-[450] text-foreground"
            >
              {language === 'ar'
                ? ['شهادات قيادات الشركاء المعتمدة']
                : ['Principals on Execution & Trust']}
            </RevealText>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scroller Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Edge Gradient Fades for Smooth Seamless Illusion */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-surface to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-surface to-transparent z-20" />

        {/* Marquee Track: Always LTR container so translate3d(0) -> translate3d(-50%) moves Right-to-Left smoothly */}
        <div
          dir="ltr"
          className="animate-marquee-track flex gap-6 px-4"
          style={{ '--marquee-duration': '65s' }}
        >
          {marqueeItems.map((item, index) => {
            const quoteText = language === 'ar' ? item.quoteAr : item.quote;
            const roleText = language === 'ar' ? item.roleAr : item.role;
            const noteText = language === 'ar' ? item.brandNoteAr : item.brandNote;

            return (
              <article
                key={`${item.id}-${index}`}
                dir={isRtl ? 'rtl' : 'ltr'}
                className="w-[360px] sm:w-[460px] md:w-[500px] lg:w-[540px] shrink-0 border border-line bg-background p-6 sm:p-8 md:p-9 flex flex-col justify-between hover:border-[#1b1b1b] hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Brand & Category Note */}
                  <div className="mb-5">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug group-hover:text-[#1b1b1b] transition-colors">
                      {item.brand}
                    </h3>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                      {noteText}
                    </div>
                  </div>

                  {/* Verbatim Quote — shared start edge with brand (no absolute offset) */}
                  <blockquote className="border-s-2 border-[#1b1b1b]/15 ps-4">
                    <p className="font-sans text-xs sm:text-sm md:text-[14.5px] font-normal leading-relaxed text-foreground/90 sm:leading-[1.65]">
                      {quoteText}
                    </p>
                  </blockquote>
                </div>

                {/* Card Signatory Footer */}
                <div className="pt-5 mt-6 border-t border-line">
                  <div className="font-display text-sm sm:text-base font-semibold text-foreground">
                    {item.name}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted mt-0.5">
                    {roleText}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
