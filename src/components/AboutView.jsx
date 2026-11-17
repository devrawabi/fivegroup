import React from 'react';
import {
  ABOUT_OVERVIEW,
  ABOUT_PILLARS,
  COMPANY_TIMELINE,
  SOURCE_COUNTRIES,
} from '../data/about';
import { KEY_STATS } from '../data/companyFacts';

export default function AboutView() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Page Header matching BGS Law (/cabinet) */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24 max-w-[1400px] mx-auto">
        <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
          The Firm · Le Groupe
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-foreground max-w-5xl">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">A Shared Vision,</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">An Enduring Standard of Excellence</span>
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl">
          {ABOUT_OVERVIEW}
        </p>

        {/* Quick Key Metrics in Monospace */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          {KEY_STATS.slice(0, 4).map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                {stat.label}
              </span>
              <span className="font-display text-2xl font-medium text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Institutional Pillars in Swiss Bento Grid */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Foundations · Piliers
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Core Principles Guiding Every Operation
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="bg-background p-8 flex flex-col justify-between hover:bg-surface transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#161833] font-semibold block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-normal text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted font-light leading-relaxed">{pillar.body}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-line font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Standard Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Global Sourcing Network */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-background">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              International Procurement
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Direct Corridors Across 11+ Producer Nations
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {SOURCE_COUNTRIES.map((country) => (
              <span
                key={country}
                className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2.5 bg-surface border border-line text-foreground"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Chronological Timeline */}
      <section className="border-t border-line bg-surface px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Historical Milestones · Chronologie
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Two Decades of Supply Chain Excellence
            </h2>
          </div>

          <div className="border-t border-line">
            {COMPANY_TIMELINE.map((item) => (
              <div
                key={item.year}
                className="border-b border-line py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6"
              >
                <div className="font-mono text-2xl md:text-3xl text-foreground font-light md:w-48 shrink-0">
                  {item.year}
                </div>

                <div className="flex-1 max-w-2xl">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#161833] font-semibold block mb-1">
                    {item.era}
                  </span>
                  <h4 className="font-display text-xl font-normal text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted font-light leading-relaxed">{item.desc}</p>
                </div>

                <div className="hidden md:block font-mono text-xs text-muted">
                  Qatar Operations
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
