import React from 'react';
import { NEWS_ITEMS } from '@/data/news';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function HomeNews({ onNewsClick, onNavigate }) {
  const { language } = useLanguage();
  const items = NEWS_ITEMS.slice(0, 3);

  return (
    <section
      id="home-news"
      className="border-t border-line bg-background px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="home-news-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                {language === 'ar' ? 'الأخبار والفعاليات' : 'News & Events'}
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              id="home-news-heading"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {language === 'ar'
                ? ['أحدث التغطيات من', 'مجموعة الخمسة']
                : ['Launches, Partners,', '& Market Moments']}
            </RevealText>
          </div>

          <BgsScrollReveal delay={0.06}>
            <button
              type="button"
              onClick={() => onNavigate?.('contact-news', null, 'News')}
              className="inline-flex items-center gap-3 self-start font-mono text-xs uppercase tracking-[0.22em] text-navy transition-colors hover:text-foreground md:self-auto"
            >
              <span>{language === 'ar' ? 'كل الأخبار' : 'All news'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </BgsScrollReveal>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {items.map((item, idx) => (
            <BgsScrollReveal as="li" key={item.id} delay={idx * 0.05} className="h-full">
              <article
                onClick={() => onNewsClick?.(item)}
                className="group flex h-full cursor-pointer flex-col border border-line bg-background transition-colors hover:bg-surface"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNewsClick?.(item);
                  }
                }}
              >
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-[11px]">
                    <span>{item.date || '2026'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-navy">
                      {item.category || item.tag || 'Bulletin'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-normal leading-snug tracking-tight text-foreground transition-colors group-hover:text-navy md:text-xl">
                    {item.title}
                  </h3>

                  {item.excerpt ? (
                    <p className="line-clamp-3 text-sm font-light leading-relaxed text-muted">
                      {item.excerpt}
                    </p>
                  ) : null}

                  <span className="mt-auto pt-3 font-mono text-xs text-muted transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-foreground">
                    {language === 'ar' ? 'اقرأ المزيد ←' : 'Read article →'}
                  </span>
                </div>
              </article>
            </BgsScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
