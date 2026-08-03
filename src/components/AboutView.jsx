import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Eye, Heart, Target, Users } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Timeline } from '@/components/ui/timeline';
import {
  GradientCard,
  GradientCardDescription,
  GradientCardIcon,
  GradientCardTitle,
} from '@/components/ui/gradient-card';
import {
  ABOUT_OVERVIEW,
  ABOUT_PILLARS,
  ABOUT_QUOTE,
  COMPANY_TIMELINE,
  SOURCE_COUNTRIES,
} from '../data/about';
import { AWARDS, HQ_SUMMARY, KEY_STATS } from '../data/companyFacts';

const STORY_IMAGE = '/media/story.webp';
const CORPORATE_STORY_VIDEO = '/videos/corporate-story.mp4';

const TIMELINE_IMAGES = {
  '2006': ['/media/unsplash-building.webp', '/media/unsplash-office.webp'],
  '2008': ['/media/unsplash-store.webp', '/media/unsplash-retail.webp'],
  '2012': ['/media/unsplash-grocery.webp', '/media/unsplash-retail.webp'],
  '2015': ['/media/unsplash-warehouse.webp', '/media/unsplash-shipping.webp'],
  '2018': ['/media/unsplash-cold.webp', '/media/unsplash-containers.webp'],
  '2020': ['/media/unsplash-truck.webp', '/media/unsplash-delivery.webp'],
  '2023': ['/media/unsplash-retail.webp', '/media/unsplash-market.webp'],
  '2025': ['/media/unsplash-handshake.webp', '/media/unsplash-shop.webp'],
  '2030': ['/media/unsplash-team.webp', '/media/unsplash-desk.webp'],
};

const TIMELINE_IMG_CLASS =
  'rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]';

const PILLAR_ICONS = {
  vision: Eye,
  mission: Target,
  values: Heart,
  clients: Users,
};

export default function AboutView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

  const timelineData = useMemo(
    () =>
      COMPANY_TIMELINE.map((item) => {
        const images = TIMELINE_IMAGES[item.year] || TIMELINE_IMAGES['2006'];
        return {
          title: item.year,
          content: (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand-lime)] md:text-sm">
                {item.era}
              </p>
              <h4 className="mb-3 text-base font-semibold text-foreground md:text-lg">
                {item.title}
              </h4>
              <p className="mb-8 text-xs font-normal text-muted-foreground md:text-sm">
                {item.desc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${item.title} — ${item.era}`}
                    width={500}
                    height={500}
                    className={TIMELINE_IMG_CLASS}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ),
        };
      }),
    [],
  );

  useEffect(() => {
    if (!isModalOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const modal = isModalOpen
    ? createPortal(
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} role="presentation">
          <div
            className="modal-content modal-content--video"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-story-modal-title"
          >
            <button type="button" className="modal-close" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
            <div className="modal-video-frame">
              <video
                ref={videoRef}
                className="modal-video-player"
                src={CORPORATE_STORY_VIDEO}
                controls
                autoPlay
                playsInline
                preload="none"
                title="Five Group Corporate Story"
              />
              <p id="about-story-modal-title" className="sr-only">
                Watch Corporate Story
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="page-view about-page">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">About</p>
          <h1 className="section-title">five group trading</h1>
          <p className="section-desc about-lead mx-auto text-justify">
            {ABOUT_OVERVIEW}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="about-country-tags" aria-label="Source countries">
            {SOURCE_COUNTRIES.map((country) => (
              <span key={country} className="about-country-tag">
                {country}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={90} className="content-page-highlights about-key-stats">
          {KEY_STATS.map((item) => (
            <div key={`${item.label}-${item.value}`} className="content-page-highlight">
              <span className="content-page-highlight-value">{item.value}</span>
              <span className="content-page-highlight-label">{item.label}</span>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="about-story-grid">
            <button
              type="button"
              className="about-video-card"
              style={{ backgroundImage: `url(${STORY_IMAGE})` }}
              onClick={() => setIsModalOpen(true)}
              aria-label="Play company story video"
            >
              <span className="about-play-btn" aria-hidden="true">
                <span className="play-arrow" />
              </span>
            </button>

            <div className="about-story-copy">
              <h2>The beginning of a successful story</h2>
              <p>
                Founded in 2006 as a premium division of <strong>Rawabi Group</strong>, Five Group
                stands among the major distribution chains in the Middle East — putting trust,
                commitment, and work into one space.
              </p>
              <p>
                With 500+ product lines, we bring trusted quality into homes and retail shelves
                across Qatar through temperature-controlled warehouses and a dedicated distribution
                fleet.
              </p>
              <p>{HQ_SUMMARY}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} stagger>
          <div className="about-pillars">
            {ABOUT_PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[pillar.id] || Target;
              return (
                <article key={pillar.id} className="reveal-stagger-item">
                  <GradientCard patternIndex={index} interactive className="h-full">
                    <GradientCardIcon aria-hidden="true">
                      <Icon size={22} strokeWidth={2.2} />
                    </GradientCardIcon>
                    <GradientCardTitle>{pillar.title}</GradientCardTitle>
                    <GradientCardDescription>{pillar.body}</GradientCardDescription>
                  </GradientCard>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        <section className="about-awards-section" aria-labelledby="about-awards-heading">
          <ScrollReveal>
            <p className="section-eyebrow">Recognition</p>
            <h2 id="about-awards-heading" className="section-title">
              Awards and recognition
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80} stagger>
            <div className="about-pillars about-awards">
              {AWARDS.map((award, index) => (
                <article key={award.title} className="reveal-stagger-item">
                  <GradientCard patternIndex={(index + 1) % 4} className="h-full">
                    <GradientCardTitle>{award.title}</GradientCardTitle>
                    <GradientCardDescription>{award.body}</GradientCardDescription>
                  </GradientCard>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </section>

        <section className="about-timeline-section" aria-labelledby="about-timeline-heading">
          <ScrollReveal className="about-timeline-header">
            <p className="section-eyebrow">Since 2006</p>
            <h2 id="about-timeline-heading">Our Historical Journey</h2>
            <p className="section-desc mx-auto text-center">
              Two decades of growth — from a Rawabi Group division to a nationwide FMCG
              distribution leader serving Qatar&apos;s leading retailers.
            </p>
          </ScrollReveal>

          <Timeline data={timelineData} />
        </section>

        <ScrollReveal delay={160}>
          <blockquote className="about-quote">
            <p>&ldquo;{ABOUT_QUOTE.text}&rdquo;</p>
            <cite>— {ABOUT_QUOTE.author}</cite>
          </blockquote>
        </ScrollReveal>
      </div>

      {modal}
    </div>
  );
}
