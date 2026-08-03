import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import NavMegaMenu from '@/components/NavMegaMenu';
import { isMenuActive, NAV_MENUS, resolvePageId } from '@/data/navigation';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState(null);

  useEffect(() => {
    const getScrollTop = () => {
      const root = document.getElementById('root');
      return Math.max(window.scrollY, root?.scrollTop ?? 0, document.documentElement.scrollTop);
    };

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 40);
    };

    const root = document.getElementById('root');
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    root?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      root?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) setMobileMega(null);
  }, [isMenuOpen]);

  const handleInquiryClick = () => {
    setIsMenuOpen(false);
    setActiveTab('contact-quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (page, category) => {
    setIsMenuOpen(false);
    setMobileMega(null);
    setActiveTab(page, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMega = (id) => {
    setMobileMega((current) => (current === id ? null : id));
  };

  const currentPage = resolvePageId(activeTab);

  return (
    <>
      <nav
        className={`navbar ${isScrolled ? 'scrolled' : 'transparent'} ${isMenuOpen ? 'menu-open' : ''} animate-fade-in`}
        aria-label="Primary"
      >
        <div className="navbar-container">
          <div className="nav-logo-wrapper" onClick={() => handleLinkClick('home')}>
            <img
              src="/brand/five-group-new-logo.png"
              alt="Five Group Logo"
              className="nav-logo-img"
            />
          </div>

          <div className="nav-group-links-capsule">
            <NavMegaMenu activeTab={currentPage} onNavigate={handleLinkClick} />
          </div>

          <div className="nav-group-actions">
            <ButtonWithIcon className="nav-inquiry-btn" onClick={handleInquiryClick}>
              Wholesale Inquiry
            </ButtonWithIcon>

            <button
              type="button"
              className={`nav-hamburger-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav-drawer"
        className={`nav-mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? true : undefined}
      >
        <div className="nav-mobile-drawer-links">
          <a
            href="#home"
            className={`nav-mobile-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('home');
            }}
          >
            Home
          </a>

          {NAV_MENUS.map((menu) => {
            const isOpen = mobileMega === menu.id;
            const panelId = `mobile-mega-${menu.id}`;
            const parentActive = isMenuActive(menu, currentPage);

            return (
              <div key={menu.id} className="nav-mobile-mega">
                <button
                  type="button"
                  className={`nav-mobile-link nav-mobile-mega-trigger ${parentActive ? 'active' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleMobileMega(menu.id)}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`nav-mobile-mega-chevron ${isOpen ? 'open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <div id={panelId} className={`nav-mobile-mega-panel ${isOpen ? 'open' : ''}`} hidden={!isOpen}>
                  <button
                    type="button"
                    className="nav-mobile-mega-link"
                    onClick={() => handleLinkClick(menu.cta.page, menu.cta.category)}
                  >
                    {menu.cta.label}
                  </button>
                  {menu.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`nav-mobile-mega-link ${currentPage === item.page ? 'active' : ''}`}
                      onClick={() => handleLinkClick(item.page, item.category)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <ButtonWithIcon onDark className="nav-mobile-inquiry-btn" onClick={handleInquiryClick}>
            Wholesale Inquiry
          </ButtonWithIcon>
        </div>
      </div>
    </>
  );
}
