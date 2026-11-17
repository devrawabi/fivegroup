import React from 'react';
import { Users, Truck, MapPinned, Award } from 'lucide-react';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';
import { useLanguage } from '@/components/ui/LanguageContext';
import { CLIENTS } from '@/data/clients';

const PILLARS = [
  {
    id: '01',
    Icon: Users,
    titleEn: 'Skilled Team Members',
    titleAr: 'فريق متخصص',
    bodyEn:
      'Dedicated professionals across trading, brands, and logistics — committed to execution excellence for every partner.',
    bodyAr:
      'محترفون متفانون عبر التجارة والعلامات واللوجستيات — ملتزمون بالتميز في التنفيذ لكل شريك.',
  },
  {
    id: '02',
    Icon: Truck,
    titleEn: 'Supply Chain Management',
    titleAr: 'إدارة سلسلة التوريد',
    bodyEn:
      'Seamless intake, multi-temperature warehousing, and punctual deliveries from Birkat Al Awamer to doors across Qatar.',
    bodyAr:
      'استلام سلس وتخزين متعدد درجات الحرارة وتسليم في الموعد من بركة العوامر إلى مختلف أنحاء قطر.',
  },
  {
    id: '03',
    Icon: MapPinned,
    titleEn: 'Holistic Coverage',
    titleAr: 'تغطية شاملة',
    bodyEn:
      'End-to-end distribution for retail, HORECA, wholesale, and e-commerce channels under one national platform.',
    bodyAr:
      'توزيع متكامل لقنوات التجزئة والضيافة والجملة والتجارة الإلكترونية تحت منصة وطنية واحدةحدة.',
  },
  {
    id: '04',
    Icon: Award,
    titleEn: 'Competent Leadership',
    titleAr: 'قيادة كفؤة',
    bodyEn:
      'Experienced leadership that aligns commercial strategy, brand stewardship, and operational discipline.',
    bodyAr:
      'قيادة ذات خبرة توائم الاستراتيجية التجارية ورعاية العلامات والانضباط التشغيلي.',
  },
];

export default function WhyFiveGroup() {
  const { language } = useLanguage();
  const logos = [...CLIENTS, ...CLIENTS];

  return (
    <section
      id="why-five-group"
      className="border-t border-line bg-background px-6 py-20 md:px-12 md:py-28"
      aria-labelledby="why-five-group-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="max-w-2xl">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                {language === 'ar' ? 'لماذا مجموعة الخمسة؟' : 'Why Five Group?'}
              </div>
              <div className="mb-5 h-px w-10 bg-navy" aria-hidden="true" />
            </BgsScrollReveal>

            <RevealText
              as="h2"
              id="why-five-group-heading"
              className="font-display text-[clamp(1.6rem,3.4vw,2.85rem)] font-[450] leading-[1.12] tracking-tight text-foreground"
            >
              {language === 'ar'
                ? ['خبرة موثوقة لدى', 'كبرى المؤسسات.']
                : ['Expertise Trusted by', 'Leading Institutions.']}
            </RevealText>

            <BgsScrollReveal delay={0.08}>
              <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-muted md:text-base md:leading-[1.75]">
                {language === 'ar'
                  ? 'اختر مجموعة الخمسة لخبرة تشغيلية موثوقة وفريق متخصص وإدارة دقيقة لسلسلة التوريد وتغطية شاملة عبر السوق القطري.'
                  : 'Choose Five Group for trusted operational expertise — a skilled team, precise supply-chain management, and holistic coverage across Qatar’s retail and hospitality network.'}
              </p>
            </BgsScrollReveal>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
            {PILLARS.map((item, idx) => {
              const Icon = item.Icon;
              return (
                <BgsScrollReveal as="li" key={item.id} delay={idx * 0.05}>
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs font-semibold tracking-[0.18em] text-navy">
                        {item.id}.
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-foreground md:text-lg">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted">
                      {language === 'ar' ? item.bodyAr : item.bodyEn}
                    </p>
                  </div>
                </BgsScrollReveal>
              );
            })}
          </ul>
        </div>

        <BgsScrollReveal delay={0.06}>
          <div className="relative mt-12 overflow-hidden md:mt-16">
            <div
              dir="ltr"
              className="animate-marquee-track flex w-max gap-8 py-1 md:gap-10"
              style={{ '--marquee-duration': '48s' }}
              aria-label={
                language === 'ar' ? 'شركاء التجزئة والضيافة' : 'Retail & hospitality partners'
              }
            >
              {logos.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex h-24 w-44 shrink-0 items-center justify-center border border-line bg-background p-2 sm:h-28 sm:w-52 sm:p-2.5 md:h-32 md:w-60 md:p-3"
                  title={client.name}
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </BgsScrollReveal>
      </div>
    </section>
  );
}
