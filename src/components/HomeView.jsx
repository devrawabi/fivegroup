import React from 'react';
import Hero from './Hero';
import WhoWeAre from './WhoWeAre';
import WhyFiveGroup from './WhyFiveGroup';
import Features from './Features';
import ManagingDirectorMessage from './ManagingDirectorMessage';
import HomeTestimonials from './HomeTestimonials';
import EditorialPrinciples from './EditorialPrinciples';

export default function HomeView({ onNavigate }) {
  return (
    <div className="home-view bg-background">
      {/* 1. Exact BGS Law Hero with Video, Grain, Laser Sweep & Line Reveals */}
      <Hero />

      {/* 2. Who We Are — two-column intro */}
      <WhoWeAre onNavigate={onNavigate} />

      {/* 3. Why Five Group — trusted expertise + partner logos */}
      <WhyFiveGroup />

      {/* 4. Exact BGS Law Bento Grid (Section 2 of bgslaw.ch) */}
      <Features onNavigate={onNavigate} />

      {/* 5. Managing Director’s Message */}
      <ManagingDirectorMessage />

      {/* 6. Verified Client & Principal Testimonials */}
      <HomeTestimonials />

      {/* 7. Exact BGS Law Two-Column Philosophy List (Section 4 of bgslaw.ch) */}
      <EditorialPrinciples />
    </div>
  );
}
