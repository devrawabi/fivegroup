import React from 'react';
import LogoScroller from '@/components/ui/logo-scroller';
import { CLIENTS } from '../data/clients';

export default function ClientsSlider() {
  const logos = CLIENTS.map((client) => ({
    name: client.name,
    image: client.image,
  }));

  return (
    <div className="clients-slider" aria-label="Our loyal clients">
      <div className="clients-slider-header">
        <p className="section-eyebrow">Loyal Clients</p>
        <h3 className="clients-slider-title">Trusted by Qatar&apos;s Leading Brands</h3>
      </div>

      <LogoScroller logos={logos} speed="70s" />
    </div>
  );
}
