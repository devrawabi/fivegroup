import React from 'react';
import Hero from './Hero';
import WhoWeAre from './WhoWeAre';
import WhyFiveGroup from './WhyFiveGroup';
import HomeNews from './HomeNews';
import Features from './Features';
import HomeStandards from './HomeStandards';
import ManagingDirectorMessage from './ManagingDirectorMessage';
import HomeTestimonials from './HomeTestimonials';
import HomeBrandPrincipals from './HomeBrandPrincipals';
import HomeAwards from './HomeAwards';
import EditorialPrinciples from './EditorialPrinciples';

export default function HomeView({ onNavigate, onNewsClick }) {
  return (
    <div className="home-view bg-background">
      <Hero />

      <WhoWeAre onNavigate={onNavigate} />

      <WhyFiveGroup />

      {/* News brought forward — same cards as News page */}
      <HomeNews onNewsClick={onNewsClick} onNavigate={onNavigate} />

      <Features onNavigate={onNavigate} />

      <HomeStandards />

      <ManagingDirectorMessage />

      <HomeTestimonials />

      <HomeBrandPrincipals />

      <HomeAwards />

      <EditorialPrinciples />
    </div>
  );
}
