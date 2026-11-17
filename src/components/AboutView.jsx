import React from 'react';
import {
  ABOUT_OVERVIEW,
  ABOUT_PILLARS,
  ABOUT_STORY,
  ABOUT_VALUES,
  COMPANY_TIMELINE,
  SOURCE_COUNTRIES,
} from '../data/about';
import {
  BUSINESS_LINES,
  KEY_STATS,
  QUALITY_BADGES,
  WHY_PARTNER,
} from '../data/companyFacts';
import { CLIENTS } from '../data/clients';
import RevealText from '@/components/ui/RevealText';
import BgsScrollReveal from '@/components/ui/BgsScrollReveal';

const vision = ABOUT_PILLARS.find((p) => p.id === 'vision');
const mission = ABOUT_PILLARS.find((p) => p.id === 'mission');
const clientLogos = [...CLIENTS, ...CLIENTS];

export default function AboutView() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero — balanced text + image */}
      <section className="border-b border-line px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
        <div className="mx-auto grid max-w-[1400px] items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 lg:pt-2">
            <BgsScrollReveal>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                The Firm · About Us
              </div>
              <div className="mb-6 h-px w-10 bg-navy" aria-hidden="true" />
            </BgsScrollReveal>

            <RevealText
              as="h1"
              className="font-display text-[clamp(2.1rem,4.6vw,4rem)] font-[450] leading-[1.05] tracking-tight text-foreground"
            >
              {['A Shared Vision,', 'An Enduring Standard', 'of Excellence']}
            </RevealText>

            <BgsScrollReveal delay={0.08}>
              <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg md:leading-[1.75]">
                {ABOUT_OVERVIEW}
              </p>
            </BgsScrollReveal>

            <BgsScrollReveal delay={0.12}>
              <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {KEY_STATS.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="bg-background px-4 py-5 sm:px-5 sm:py-6">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </BgsScrollReveal>
          </div>

          <BgsScrollReveal className="lg:col-span-5" delay={0.06}>
            <figure className="overflow-hidden border border-line bg-surface">
              <img
                src="/brand/about-partnership-handshake.jpg"
                alt="Business partners sealing a distribution agreement — Five Group Trading"
                className="aspect-[4/5] h-auto w-full object-cover object-[center_20%]"
                width={900}
                height={1125}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </BgsScrollReveal>
        </div>
      </section>

      {/* 2. Story */}
      <section className="border-b border-line bg-surface px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                {ABOUT_STORY.eyebrow}
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.65rem,3.4vw,2.75rem)] font-[450] leading-[1.1] tracking-tight text-foreground"
            >
              {[ABOUT_STORY.title]}
            </RevealText>
          </div>

          <div className="md:col-span-8 space-y-5">
            {ABOUT_STORY.paragraphs.map((paragraph, idx) => (
              <BgsScrollReveal key={idx} delay={idx * 0.05}>
                <p className="max-w-3xl text-base font-light leading-[1.8] text-foreground/85 md:text-lg">
                  {paragraph}
                </p>
              </BgsScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <section className="border-b border-line px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 md:mb-14">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                Direction
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {['Vision & Mission']}
            </RevealText>
          </div>

          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {[vision, mission].filter(Boolean).map((item, idx) => (
              <BgsScrollReveal key={item.id} delay={idx * 0.06} className="h-full">
                <article className="flex h-full flex-col bg-background p-8 md:p-10 lg:p-12">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-navy">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-muted md:text-base md:leading-[1.75]">
                    {item.body}
                  </p>
                </article>
              </BgsScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="border-b border-line bg-surface px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-2xl md:mb-14">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                Foundations of Success
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {['Excellence, Commitment,', 'Reliability & Partnership']}
            </RevealText>
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((value, idx) => (
              <BgsScrollReveal key={value.id} delay={idx * 0.04} className="h-full">
                <article className="flex h-full flex-col justify-between bg-background p-7 transition-colors hover:bg-surface md:p-8">
                  <div>
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-navy">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-normal tracking-tight text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted">
                      {value.body}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Core Value
                  </div>
                </article>
              </BgsScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What we do */}
      <section className="border-b border-line px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 md:mb-14 md:flex md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <BgsScrollReveal>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                  What We Do
                </div>
              </BgsScrollReveal>
              <RevealText
                as="h2"
                className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
              >
                {['Distribution Built for', 'Qatar’s Channels']}
              </RevealText>
            </div>
            <BgsScrollReveal delay={0.06}>
              <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-muted md:mt-0 md:text-base">
                From hypermarkets and specialty retail to HORECA, wholesale, and e-commerce — one
                platform, disciplined execution.
              </p>
            </BgsScrollReveal>
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_LINES.map((line, idx) => (
              <BgsScrollReveal key={line.title} delay={idx * 0.04} className="h-full">
                <article className="h-full bg-background p-7 md:p-8">
                  <span className="font-mono text-xs font-semibold tracking-[0.18em] text-navy">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-normal tracking-tight text-foreground">
                    {line.title}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted">{line.body}</p>
                </article>
              </BgsScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why partner + quality */}
      <section className="border-b border-line bg-surface px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-2xl md:mb-14">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                Why Partners Choose Us
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {['Capability That Impresses', 'Principals & Buyers']}
            </RevealText>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <ul className="m-0 list-none space-y-0 border-t border-line p-0">
              {WHY_PARTNER.map((item, idx) => (
                <BgsScrollReveal as="li" key={item.title} delay={idx * 0.04}>
                  <div className="border-b border-line py-6 md:flex md:gap-8">
                    <span className="mb-2 block shrink-0 font-mono text-xs font-semibold tracking-[0.18em] text-navy md:mb-0 md:w-36">
                      {item.title}
                    </span>
                    <p className="text-sm font-light leading-relaxed text-muted md:flex-1">
                      {item.body}
                    </p>
                  </div>
                </BgsScrollReveal>
              ))}
            </ul>

            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {QUALITY_BADGES.map((badge, idx) => (
                <BgsScrollReveal key={badge.title} delay={idx * 0.05} className="h-full">
                  <article className="h-full bg-background p-6 md:p-7">
                    <h3 className="font-display text-lg font-normal tracking-tight text-foreground">
                      {badge.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-muted">{badge.body}</p>
                  </article>
                </BgsScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Trusted clients */}
      <section className="border-b border-line px-6 py-20 md:px-12 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 md:mb-12 md:flex md:items-end md:justify-between md:gap-8">
            <div className="max-w-2xl">
              <BgsScrollReveal>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                  Loyal Network
                </div>
              </BgsScrollReveal>
              <RevealText
                as="h2"
                className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
              >
                {['Trusted Across Qatar’s', 'Retail & Hospitality']}
              </RevealText>
            </div>
            <BgsScrollReveal delay={0.06}>
              <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-muted md:mt-0">
                Serving leading hypermarkets, specialty stores, and foodservice partners nationwide.
              </p>
            </BgsScrollReveal>
          </div>

          <BgsScrollReveal>
            <div className="relative overflow-hidden">
              <div
                dir="ltr"
                className="animate-marquee-track flex w-max gap-6 py-1 md:gap-8"
                style={{ '--marquee-duration': '52s' }}
                aria-label="Retail and hospitality clients"
              >
                {clientLogos.map((client, index) => (
                  <div
                    key={`${client.id}-${index}`}
                    className="flex h-24 w-40 shrink-0 items-center justify-center border border-line bg-surface p-2 sm:h-28 sm:w-48 md:h-32 md:w-56"
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

      {/* 8. Sourcing */}
      <section className="border-b border-line bg-surface px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 max-w-3xl md:mb-12">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                International Procurement
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {['Direct Corridors Across', '11+ Producer Nations']}
            </RevealText>
            <BgsScrollReveal delay={0.06}>
              <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-muted md:text-base">
                A resilient import network that keeps Qatar’s shelves stocked with trusted food and
                non-food FMCG from Italy, India, Spain, Southeast Asia, and beyond.
              </p>
            </BgsScrollReveal>
          </div>

          <BgsScrollReveal>
            <div className="flex flex-wrap gap-2">
              {SOURCE_COUNTRIES.map((country) => (
                <span
                  key={country}
                  className="border border-line bg-background px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                >
                  {country}
                </span>
              ))}
            </div>
          </BgsScrollReveal>
        </div>
      </section>

      {/* 9. Timeline */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-2xl md:mb-16">
            <BgsScrollReveal>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted md:text-xs">
                Historical Milestones
              </div>
            </BgsScrollReveal>
            <RevealText
              as="h2"
              className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-[450] leading-[1.08] tracking-tight text-foreground"
            >
              {['Two Decades of', 'Supply Chain Excellence']}
            </RevealText>
          </div>

          <div className="border-t border-line">
            {COMPANY_TIMELINE.map((item, idx) => (
              <BgsScrollReveal key={item.year} delay={Math.min(idx * 0.03, 0.2)}>
                <div className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                  <div className="font-mono text-2xl font-light tracking-tight text-foreground md:col-span-2 md:text-3xl">
                    {item.year}
                  </div>
                  <div className="md:col-span-7">
                    <span className="mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-navy">
                      {item.era}
                    </span>
                    <h3 className="font-display text-xl font-normal tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden font-mono text-xs uppercase tracking-[0.16em] text-muted md:col-span-3 md:block md:text-right">
                    Qatar Operations
                  </div>
                </div>
              </BgsScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
