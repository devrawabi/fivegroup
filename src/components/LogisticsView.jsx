import React from 'react';
import {
  WAREHOUSE_INTRO,
  WAREHOUSE_DIVISIONS_INTRO,
  STORAGE_DIVISIONS,
  WAREHOUSE_FACILITIES,
} from '../data/warehouse';
import fleetImg from '../assets/locations/fleet.jpg';
import warehouseImg from '../assets/locations/warehouse.jpg';

export default function LogisticsView() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Page Header matching BGS Law */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24 max-w-[1400px] mx-auto">
        <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
          Infrastructure · Plateforme Logistique
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-foreground max-w-5xl">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">Multi-Temperature Warehousing &amp; Fleet,</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">Securing Integrity from Intake to Retail Shelf</span>
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl">
          {WAREHOUSE_INTRO}
        </p>

        {/* Technical Highlights in Monospace Hairline Box */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          <div className="bg-background p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
              Hub Floor Area
            </span>
            <span className="font-display text-2xl font-medium text-foreground">16,000+ sqm</span>
          </div>
          <div className="bg-background p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
              Active Fleet
            </span>
            <span className="font-display text-2xl font-medium text-foreground">Multi-Temp</span>
          </div>
          <div className="bg-background p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
              Cold Rooms
            </span>
            <span className="font-display text-2xl font-medium text-foreground">
              -20°C to +4°C
            </span>
          </div>
          <div className="bg-background p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
              SLA Standard
            </span>
            <span className="font-display text-2xl font-medium text-foreground">99.4% On-Time</span>
          </div>
        </div>
      </section>

      {/* 2. Storage Divisions in Swiss Hairline Bento Grid */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Thermal Segmentation · Divisions
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              {WAREHOUSE_DIVISIONS_INTRO}
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line md:grid-cols-3">
            {STORAGE_DIVISIONS.map((div, idx) => (
              <div
                key={div.id}
                className="bg-background p-8 md:p-10 flex flex-col justify-between hover:bg-surface transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#161833] font-semibold block mb-4">
                    Zone 0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-normal text-foreground mb-3">
                    {div.title}
                  </h3>
                  <p className="text-sm text-muted font-light leading-relaxed">{div.body}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-line font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Strictly Temperature Controlled
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Facilities Breakdown */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-background">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Hub Network · Emplacements
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Strategic Distribution Footprint Across Qatar
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line md:grid-cols-2">
            {WAREHOUSE_FACILITIES.map((fac) => (
              <div key={fac.id} className="bg-background p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#a3d2e2] bg-[#161833] px-2.5 py-1 inline-block mb-4">
                    {fac.detail}
                  </span>
                  <h3 className="font-display text-2xl font-normal text-foreground mb-2">
                    {fac.name}
                  </h3>
                  <p className="text-sm text-muted font-light mb-6">{fac.location}</p>
                </div>

                <div className="border-t border-line pt-4 flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted">Operational Footprint:</span>
                  <span className="font-display text-xl font-medium text-foreground">
                    {fac.area}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Visual Photo Grid */}
      <section className="border-t border-line bg-surface px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            <div className="bg-background p-6 md:p-8 flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden bg-black/10 mb-6">
                <img
                  src={warehouseImg}
                  alt="Birkat Al Awamer Hub"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl text-foreground font-normal mb-2">
                Birkat Al Awamer Logistics Park-A
              </h3>
              <p className="text-sm text-muted font-light leading-relaxed">
                Central storage, container unstuffing, multi-rack storage, and continuous quality
                inspection before store dispatch.
              </p>
            </div>

            <div className="bg-background p-6 md:p-8 flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden bg-black/10 mb-6">
                <img
                  src={fleetImg}
                  alt="Reefer Fleet Network"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl text-foreground font-normal mb-2">
                Nationwide Reefer Delivery Network
              </h3>
              <p className="text-sm text-muted font-light leading-relaxed">
                Temperature-regulated refrigerated fleet operating around the clock with GPS trace,
                ensuring uninterrupted cold chain for all perishable consignments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
