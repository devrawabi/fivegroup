import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ScrollReveal from '@/components/ui/scroll-reveal';

const STORY_IMAGE = '/media/story.webp';
const CORPORATE_STORY_VIDEO = '/videos/corporate-story.mp4';

export default function Features() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

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
            aria-labelledby="story-modal-title"
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
              <p id="story-modal-title" className="sr-only">
                Watch Corporate Story
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <ScrollReveal as="section" id="about" className="features-section">
      <div className="container">
        <ScrollReveal delay={120}>
          <div className="features-row-single">
            <div className="features-left-heading">
              <p className="section-eyebrow">Our Story</p>
              <h2>
                The Beginning Of A<br />
                Successful Story.
              </h2>
              <p className="features-subheading">Trust, commitment &amp; work in one space.</p>
            </div>

            <button
              type="button"
              className="features-center-video"
              onClick={() => setIsModalOpen(true)}
              aria-label="Play company story"
            >
              <img
                src={STORY_IMAGE}
                alt="Five Group warehouse and team"
                className="features-video-thumb"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="features-play-btn">
                <div className="play-arrow" />
              </div>
            </button>

            <div className="features-right-text">
              <p className="features-paragraph">
                Founded in 2006 as a premium division of Rawabi Group, Five Group stands among the major
                distribution chains in the Middle East.
                <span
                  className="badge-leaves-pill"
                  style={{ backgroundImage: `url(${STORY_IMAGE})` }}
                  aria-hidden="true"
                />
                With 500 product lines, we put quality into every home we serve.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {modal}
    </ScrollReveal>
  );
}
