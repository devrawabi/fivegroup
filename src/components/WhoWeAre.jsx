import React from 'react';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';
import { KEY_STATS } from '@/data/companyFacts';

export default function WhoWeAre({ onNavigate }) {
  const { language } = useLanguage();
  const stats = KEY_STATS.filter((stat) => stat.label !== 'Fleet').slice(0, 3);

  return (
    <section
      id="who-we-are"
      className="border-t border-line bg-background px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="who-we-are-heading"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <BgsScrollReveal>
          <figure className="mx-auto w-full max-w-[480px] overflow-hidden border border-line bg-surface md:mx-0 md:max-w-[520px]">
            <img
              src="/brand/who-we-are.jpg"
              alt={
                language === 'ar'
                  ? 'ملصق ٢٠ عاماً من التميز — مجموعة الخمسة للتجارة'
                  : 'Five Group Trading — 20 years of excellence poster'
              }
              className="aspect-[3/4] h-auto w-full object-cover object-center"
              loading="lazy"
              decoding="async"
              width={900}
              height={1200}
            />
          </figure>
        </BgsScrollReveal>

        <div className="flex flex-col justify-center">
          <BgsScrollReveal>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
              {language === 'ar' ? 'من نحن' : 'Who We Are'}
            </div>
          </BgsScrollReveal>

          <RevealText
            as="h2"
            id="who-we-are-heading"
            className="font-display text-[clamp(1.7rem,3.6vw,3.2rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
          >
            {language === 'ar'
              ? ['عشرون عاماً من', 'التميز في التوزيع.']
              : ['20 Years of', 'Distribution Excellence.']}
          </RevealText>

          <BgsScrollReveal delay={0.06}>
            <p className="mt-6 max-w-xl text-[0.95rem] font-light leading-[1.8] text-foreground/85 md:text-base">
              {language === 'ar'
                ? 'تأسست شركة مجموعة الخمسة للتجارة ذ.م.م. عام ٢٠٠٦ كذراع متخصص ضمن مجموعة روابي، ومقرها الدوحة. نستورد ونوزّع أكثر من ٥٠٠ خط منتج غذائي وغير غذائي من أكثر من ١١ سوقاً عالمياً، ونخدم شبكات التجزئة والضيافة عبر قطر بثقة والتزام وانضباط تشغيلي.'
                : 'Founded in 2006 as a specialist Rawabi Group division and headquartered in Doha, Five Group Trading Company W.L.L. imports and distributes 500+ food and non-food product lines from 11+ global markets. We serve Qatar’s retail and hospitality networks with trust, commitment, and operational discipline.'}
            </p>
          </BgsScrollReveal>

          <BgsScrollReveal delay={0.1}>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-muted md:text-[0.95rem]">
              {language === 'ar'
                ? 'من مستودعنا في بركة العوامر بمساحة تتجاوز ١٦٬٠٠٠ م² وأسطول متعدد درجات الحرارة، نضمن وصول الإمدادات في الوقت المناسب وبالحالة الصحيحة — من الرف إلى باب العميل.'
                : 'From our 16,000+ sqm Birkat Al Awamer hub and multi-temperature fleet, we keep supply on time and in condition — from intake to the customer’s door.'}
            </p>
          </BgsScrollReveal>

          <BgsScrollReveal delay={0.14}>
            <div className="mt-8 grid grid-cols-3 gap-px border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-background px-3 py-4 md:px-4 md:py-5">
                  <div className="font-display text-lg font-semibold tracking-tight text-navy md:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </BgsScrollReveal>

          <BgsScrollReveal delay={0.18}>
            <button
              type="button"
              onClick={() => onNavigate?.('about-profile', null, 'The Firm · Le Groupe')}
              className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-navy transition-colors hover:text-foreground"
            >
              <span>{language === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </BgsScrollReveal>
        </div>
      </div>
    </section>
  );
}
