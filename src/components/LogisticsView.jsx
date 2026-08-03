import React from 'react';
import { Package, Snowflake, ThermometerSnowflake, Warehouse, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  GradientCard,
  GradientCardDescription,
  GradientCardIcon,
  GradientCardTitle,
} from '@/components/ui/gradient-card';
import {
  WAREHOUSE_INTRO,
  WAREHOUSE_DIVISIONS_INTRO,
  STORAGE_DIVISIONS,
  WAREHOUSE_FACILITIES,
  WAREHOUSE_VISION,
  WAREHOUSE_QUOTE,
} from '../data/warehouse';
import { COVERAGE_COPY, KEY_STATS } from '../data/companyFacts';
import fleetImg from '../assets/locations/fleet.jpg';
import warehouseImg from '../assets/locations/warehouse.jpg';

const WAREHOUSE_IMAGE = '/media/story.webp';
const COVERAGE_MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.777085790518!2d51.520448187158204!3d25.137579600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e4604e0e56722ab%3A0xe56722ab!2sBirkat%20Al%20Awamer!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa';

const DIVISION_ICONS = {
  dry: Package,
  chilled: ThermometerSnowflake,
  frozen: Snowflake,
};

export default function LogisticsView() {
  return (
    <div className="page-view warehouse-page">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">Warehouse</p>
          <h1 className="section-title">warehouse management</h1>
          <p className="section-desc warehouse-lead text-justify">{WAREHOUSE_INTRO}</p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p className="warehouse-divisions-lead">{WAREHOUSE_DIVISIONS_INTRO}</p>
        </ScrollReveal>

        <ScrollReveal delay={100} stagger>
          <div className="warehouse-divisions">
            {STORAGE_DIVISIONS.map((division, index) => {
              const Icon = DIVISION_ICONS[division.id] || Package;
              return (
                <article key={division.id} className="reveal-stagger-item">
                  <GradientCard patternIndex={index} interactive className="h-full">
                    <GradientCardIcon aria-hidden="true">
                      <Icon size={22} strokeWidth={2.2} />
                    </GradientCardIcon>
                    <GradientCardTitle>{division.title}</GradientCardTitle>
                    <GradientCardDescription>{division.body}</GradientCardDescription>
                  </GradientCard>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger>
          <div className="warehouse-facilities">
            {WAREHOUSE_FACILITIES.map((facility, index) => (
              <article key={facility.id} className="reveal-stagger-item">
                <GradientCard patternIndex={index + 1} className="h-full">
                  <div className="mb-5 flex items-center gap-3.5">
                    <GradientCardIcon className="mb-0" aria-hidden="true">
                      <Warehouse size={20} strokeWidth={2.2} />
                    </GradientCardIcon>
                    <GradientCardTitle className="mt-0">{facility.name}</GradientCardTitle>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <MapPin size={16} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--brand-lime)]" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-t border-border/70 pt-4">
                      <span className="font-display text-3xl font-extrabold tracking-tight text-[var(--brand-ink)] md:text-4xl">
                        {facility.area}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {facility.detail}
                      </span>
                    </div>
                  </div>
                </GradientCard>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="warehouse-vision-grid">
            <div
              className="warehouse-vision-image"
              style={{ backgroundImage: `url(${WAREHOUSE_IMAGE})` }}
              role="img"
              aria-label="Five Group warehouse facility"
            />
            <div className="warehouse-vision-copy">
              <p className="section-eyebrow">Our Vision</p>
              <h2>{WAREHOUSE_VISION.title}</h2>
              <p className="text-justify">{WAREHOUSE_VISION.body}</p>
              <div className="warehouse-vision-highlight">
                <span className="warehouse-vision-highlight-value">{WAREHOUSE_VISION.highlight}</span>
                <span className="warehouse-vision-highlight-label">total storage capacity</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <section className="warehouse-coverage" aria-labelledby="warehouse-coverage-heading">
          <ScrollReveal>
            <p className="section-eyebrow">Coverage</p>
            <h2 id="warehouse-coverage-heading" className="section-title">
              {COVERAGE_COPY.title}
            </h2>
            <p className="section-desc">{COVERAGE_COPY.lead}</p>
          </ScrollReveal>

          <ScrollReveal className="content-page-highlights warehouse-coverage-stats" delay={60}>
            {KEY_STATS.map((item) => (
              <div key={`${item.label}-${item.value}`} className="content-page-highlight">
                <span className="content-page-highlight-value">{item.value}</span>
                <span className="content-page-highlight-label">{item.label}</span>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal className="warehouse-coverage-media" delay={100}>
            <div className="warehouse-coverage-photos">
              <figure>
                <img src={warehouseImg} alt="Five Group warehouse facility" loading="lazy" decoding="async" />
                <figcaption>Warehouse operations</figcaption>
              </figure>
              <figure>
                <img src={fleetImg} alt="Five Group distribution fleet" loading="lazy" decoding="async" />
                <figcaption>Multi-temperature fleet</figcaption>
              </figure>
            </div>
            <div className="map-embed warehouse-coverage-map">
              <iframe
                title={COVERAGE_COPY.mapLabel}
                src={COVERAGE_MAP_SRC}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal delay={160}>
          <blockquote className="about-quote warehouse-quote">
            <p>&ldquo;{WAREHOUSE_QUOTE.text}&rdquo;</p>
            <cite>— {WAREHOUSE_QUOTE.author}</cite>
          </blockquote>
        </ScrollReveal>
      </div>
    </div>
  );
}
