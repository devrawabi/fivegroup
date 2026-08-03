import React, { useEffect, useRef, useState } from 'react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import ScrollReveal from '@/components/ui/scroll-reveal';
import warehouseImg from '../assets/locations/warehouse.jpg';
import officeImg from '../assets/locations/office.jpg';
import fleetImg from '../assets/locations/fleet.jpg';

const MOBILE_MQ = '(max-width: 992px), (hover: none)';

export default function Locations({ onInquire }) {
  const [expandedId, setExpandedId] = useState('birkat');
  const [isCompact, setIsCompact] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const shopLocations = [
    {
      id: 'birkat',
      city: 'Birkat Al Awamer',
      className: 'location-birkat',
      bgImage: warehouseImg,
      objectPosition: 'center 45%',
      desc: 'Dry and chilled warehouse in Logistic Park-A — temperature-controlled storage for Qatar retail supply.',
      hours: 'Logistic Park-A\nPO Box 31075, Qatar',
    },
    {
      id: 'doha-hq',
      city: 'Doha Center',
      className: 'location-hq',
      bgImage: officeImg,
      objectPosition: 'center center',
      desc: 'Trading hub for brand distribution, client partnerships, and logistics coordination from Doha.',
      hours: 'Building 18, Street 60\nZone 92, Al Wukair',
    },
    {
      id: 'fleet',
      city: 'Fleet Network',
      className: 'location-fleet',
      bgImage: fleetImg,
      objectPosition: '72% 55%',
      desc: 'Multi-temperature fleet delivering frozen, chilled, and dry goods to hypermarkets across Qatar.',
      hours: 'Daily Qatar Delivery\nMulti-Temp Fleet',
    },
  ];

  const selectCard = (id) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (isCompact) return;
    setExpandedId(id);
  };

  const handleHover = (id) => {
    if (isCompact) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setExpandedId(id), 80);
  };

  const handleInquire = (e) => {
    e.stopPropagation();
    onInquire?.();
  };

  return (
    <section id="logistics" className="locations-section">
      <div className="container">
        <ScrollReveal className="section-head">
          <p className="section-eyebrow">Supply Chain</p>
          <h2 className="section-title">Logistics &amp; Hubs</h2>
          <p className="section-desc">
            Temperature-controlled warehouses and fleet routes powering Qatar retail distribution.
          </p>
        </ScrollReveal>
        <div
          className={`locations-grid expand-${expandedId}${isCompact ? ' locations-grid--compact' : ''}`}
        >
          {shopLocations.map((loc, index) => {
            const isExpanded = !isCompact && loc.id === expandedId;
            return (
              <ScrollReveal
                as="article"
                key={loc.id}
                className={`location-card ${loc.className} ${isExpanded ? 'expanded' : 'collapsed'}`}
                variant={index === 0 ? 'left' : index === 2 ? 'right' : 'up'}
                delay={index * 90}
                onMouseEnter={() => handleHover(loc.id)}
                onFocus={() => selectCard(loc.id)}
                onClick={() => selectCard(loc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectCard(loc.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="location-card-bg" aria-hidden="true">
                  <img
                    src={loc.bgImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: loc.objectPosition }}
                  />
                </div>
                <div className="location-overlay" />

                <div className="location-content">
                  <div className="location-header">
                    <h3 className="location-title">{loc.city}</h3>
                    <button
                      type="button"
                      className="location-arrow-btn"
                      onClick={handleInquire}
                      tabIndex={isExpanded || isCompact ? 0 : -1}
                      aria-hidden={!(isExpanded || isCompact)}
                      aria-label={`Inquire about ${loc.city}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </button>
                  </div>

                  <p className="location-desc">{loc.desc}</p>

                  <div className="location-footer">
                    <ButtonWithIcon
                      onDark
                      className="navigate-btn"
                      onClick={handleInquire}
                    >
                      Navigate
                    </ButtonWithIcon>

                    <div className="location-hours" aria-label="Address">
                      {loc.hours.split('\n').map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
