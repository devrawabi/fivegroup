import React from 'react';
import warehouseImg from '../assets/locations/warehouse.jpg';
import officeImg from '../assets/locations/office.jpg';
import fleetImg from '../assets/locations/fleet.jpg';

export default function Locations({ onInquire }) {
  const facilities = [
    {
      id: 'birkat',
      title: 'Birkat Al Awamer Central Hub',
      badge: 'LOGISTICS PARK-A',
      image: warehouseImg,
      specs: '16,000+ sqm total capacity · Dry, Chilled & Frozen multi-temp zones.',
      detail:
        'Equipped with advanced racking, motorized dock levelers, automated temperature loggers, and ISO-aligned sanitation standards.',
    },
    {
      id: 'fleet',
      title: 'Reefer Fleet Network',
      badge: 'MULTI-TEMP FLEET',
      image: fleetImg,
      specs: 'Dedicated GPS-tracked reefer vans and heavy trucks with continuous thermograph monitoring.',
      detail:
        'Daily delivery routes servicing tier-1 hypermarkets, commercial hubs, and hospitality clients across Doha, Al Khor, and Mesaieed.',
    },
    {
      id: 'doha-hq',
      title: 'Corporate Headquarters',
      badge: 'DOHA · AL WUKAIR',
      image: officeImg,
      specs: 'Executive management, supplier liaisons, customs clearance, and procurement desk.',
      detail:
        'Direct coordination center overseeing international supplier agreements, client accounts, and national distribution schedules.',
    },
  ];

  return (
    <section className="border-t border-white/10 bg-[#1b1b1b] text-white px-6 py-24 md:px-12 md:py-32" id="logistics">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-16">
          <div className="mb-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-[#8abd3f]">
            Strategic Logistics · Hubs &amp; Flotte
          </div>
          <h2 className="font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.04] tracking-tight font-[450] text-white">
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block">Integrated Cold-Chain &amp; Logistics Hub,</span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block">Engineering 99.4% On-Time Precision</span>
            </span>
          </h2>
        </div>

        {/* Technical Specification Matrix in JetBrains Mono */}
        <div className="mb-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          <div className="bg-[#1b1b1b] p-6 md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 block mb-2">
              Storage Capacity
            </span>
            <p className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight">
              16,000+ <span className="text-sm font-mono text-[#8abd3f]">sqm</span>
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-6 md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 block mb-2">
              Thermal Control
            </span>
            <p className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight">
              -20°C <span className="text-sm font-mono text-[#8abd3f]">to</span> +25°C
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-6 md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 block mb-2">
              Dispatch SLA
            </span>
            <p className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight">
              99.4% <span className="text-sm font-mono text-[#8abd3f]">on-time</span>
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-6 md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 block mb-2">
              Nationwide Doors
            </span>
            <p className="font-display text-2xl md:text-3xl font-medium text-white tracking-tight">
              1,200+ <span className="text-sm font-mono text-[#8abd3f]">retailers</span>
            </p>
          </div>
        </div>

        {/* Facilities Bento Grid */}
        <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-3">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-[#1b1b1b] flex flex-col group hover:bg-[#1a1d3d] transition-colors"
            >
              {/* Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#1b1b1b] bg-[#8abd3f] px-2 py-0.5 font-medium">
                  {fac.badge}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-7 md:p-9 flex flex-col flex-1">
                <h3 className="font-display text-xl font-normal text-white">{fac.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-[#8abd3f] font-mono tracking-wide">
                  {fac.specs}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70 font-light flex-1">
                  {fac.detail}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Location Verified
                  </span>
                  <span className="font-mono text-xs text-[#8abd3f] group-hover:translate-x-1.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/15 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            Zone 92, Street 60, Building 18 · Birkat Al Awamer, Qatar
          </p>

          <button
            type="button"
            onClick={onInquire}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#8abd3f] hover:text-white transition-colors"
          >
            <span>Inquire About Cold-Chain Allocation</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
