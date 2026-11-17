import React from 'react';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';

const PARAGRAPHS_EN = [
  'Since its founding in 2006, Five Group has grown into a trusted distribution name in the State of Qatar. We thank our loyal customers, our dedicated team, and our partners and suppliers from around the world, who have stood by us over the years and played a vital part in our growth.',
  'Our approach has always been simple: bring trust, commitment, and hard work together in one place. We source FMCG and non-food items from around the world and supply our clients with quality products, consistently and on schedule.',
  'We take great care in the storage and handling of every product, from our warehouse at Logistics Park, Birkat Al Awamer, to the customer’s door. Our strong distribution network and large vehicle fleet ensure that supplies reach our clients at the right time and in the right condition.',
  'We serve retail stores, restaurants, and hotels across Qatar, and we are proud to be a dependable partner to each of them.',
  'I extend my sincere gratitude to our customers, our staff, and our suppliers for their hard work and trust. We assure all our existing and future clients that our team will continue to strive for excellent service in Qatar.',
];

const PARAGRAPHS_AR = [
  'منذ تأسيسها عام ٢٠٠٦، نمت مجموعة الخمسة لتصبح اسماً موثوقاً في التوزيع بدولة قطر. نشكر عملاءنا الأوفياء وفريقنا المتفاني وشركاءنا وموردينا من حول العالم، الذين وقفوا إلى جانبنا على مر السنين وكان لهم دور حيوي في نمونا.',
  'نهجنا كان دائماً بسيطاً: جمع الثقة والالتزام والعمل الجاد في مكان واحد. نستورد منتجات السلع الاستهلاكية سريعة الحركة والمواد غير الغذائية من أنحاء العالم، ونزوّد عملاءنا بمنتجات عالية الجودة بانتظام وفي الموعد المحدد.',
  'نولي عناية فائقة لتخزين ومناولة كل منتج، من مستودعنا في المنطقة اللوجستية ببركة العوامر إلى باب العميل. وتضمن شبكة التوزيع القوية وأسطول المركبات الكبير وصول الإمدادات في الوقت المناسب وبالحالة الصحيحة.',
  'نخدم متاجر التجزئة والمطاعم والفنادق في مختلف أنحاء قطر، ونفخر بأن نكون شريكاً يعتمد عليه لكل منهم.',
  'أقدم خالص امتناني لعملائنا وموظفينا وموردينا على عملهم الجاد وثقتهم. ونؤكد لجميع عملائنا الحاليين والمستقبليين أن فريقنا سيواصل السعي لتقديم خدمة متميزة في قطر.',
];

export default function ManagingDirectorMessage() {
  const { language, isRtl } = useLanguage();
  const paragraphs = language === 'ar' ? PARAGRAPHS_AR : PARAGRAPHS_EN;

  return (
    <section
      id="md-message"
      className="border-t border-line bg-background px-6 py-24 md:px-12 md:py-32"
      aria-labelledby="md-message-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 md:mb-16">
          <BgsScrollReveal>
            <div className="mb-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
              {language === 'ar' ? 'كلمة القيادة' : 'Leadership'}
            </div>
          </BgsScrollReveal>

          <RevealText
            as="h2"
            id="md-message-heading"
            className="font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.04] tracking-tight font-[450] text-foreground"
          >
            {language === 'ar'
              ? ['كلمة العضو المنتدب']
              : ["Managing Director’s Message"]}
          </RevealText>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          <BgsScrollReveal className="md:col-span-5 lg:col-span-4">
            <figure className="relative">
              <div className="overflow-hidden border border-line bg-surface aspect-[3/4]">
                <img
                  src="/brand/managing-director.jpg"
                  alt={
                    language === 'ar'
                      ? 'ك. ك. عثمان، العضو المنتدب لمجموعة الخمسة'
                      : 'K. K. Usman, Managing Director of Five Group'
                  }
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                  decoding="async"
                  width={720}
                  height={960}
                />
              </div>
              <figcaption className="mt-5 border-t border-line pt-4">
                <div className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {language === 'ar' ? 'ك. ك. عثمان' : 'K. K. Usman'}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {language === 'ar'
                    ? 'العضو المنتدب · مجموعة الخمسة للتجارة'
                    : 'Managing Director · Five Group Trading'}
                </div>
              </figcaption>
            </figure>
          </BgsScrollReveal>

          <div className="md:col-span-7 lg:col-span-8" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="space-y-5 md:space-y-6">
              {paragraphs.map((text, idx) => (
                <BgsScrollReveal key={idx} delay={idx * 0.04}>
                  <p className="max-w-3xl text-[0.95rem] leading-[1.75] text-foreground/85 md:text-base md:leading-[1.8]">
                    {text}
                  </p>
                </BgsScrollReveal>
              ))}
            </div>

            <BgsScrollReveal delay={0.28}>
              <div className="mt-10 border-t border-line pt-6">
                <p className="font-display text-lg text-foreground">
                  {language === 'ar' ? 'شكراً لكم.' : 'Thank you.'}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {language === 'ar' ? 'ك. ك. عثمان' : 'K. K. Usman'}
                  <span className="mx-2 text-line">·</span>
                  {language === 'ar' ? 'العضو المنتدب' : 'Managing Director'}
                </p>
              </div>
            </BgsScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
