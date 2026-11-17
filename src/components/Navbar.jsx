import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { resolvePageId } from '@/data/navigation';
import { useLanguage } from '@/components/ui/LanguageContext';
import FlagIcon from '@/components/ui/FlagIcon';

const WHAT_WE_DO_CHILDREN = [
  {
    id: 'business-categories',
    label: 'Retail',
    labelAr: 'التجزئة',
    labelFr: 'Retail',
  },
  {
    id: 'business-categories',
    label: 'HORECA',
    labelAr: 'الفنادق والمطاعم',
    labelFr: 'HORECA',
    key: 'horeca',
  },
  {
    id: 'business-logistics',
    label: 'Logistics & Hub',
    labelAr: 'اللوجستية والأسطول',
    labelFr: 'Logistique',
  },
  {
    id: 'brands-featured',
    label: 'Brand Portfolio',
    labelAr: 'محفظة العلامات',
    labelFr: 'Marques',
  },
  {
    id: 'business-import-export',
    label: 'Import & Export',
    labelAr: 'الاستيراد والتصدير',
    labelFr: 'Import & Export',
  },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileWhatWeDoOpen, setMobileWhatWeDoOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language, toggleLanguage, t } = useLanguage();

  const currentPage = resolvePageId(activeTab);

  const isDarkTopPage =
    currentPage === 'home' ||
    currentPage === 'contact-us' ||
    currentPage === 'contact-quote';

  const isTransparentDark = isDarkTopPage && !isScrolled && !isMenuOpen;

  const whatWeDoChildIds = [
    'business-categories',
    'business-logistics',
    'brands-featured',
    'business-import-export',
    'business-fmcg',
    'business-portfolio',
  ];
  const isWhatWeDoActive = whatWeDoChildIds.includes(currentPage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileWhatWeDoOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const handleNavClick = (pageId, label) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileWhatWeDoOpen(false);
    setActiveTab(pageId, null, label || 'Navigating View');
  };

  const navLinks = [
    { id: 'home', label: 'Home', labelAr: 'الرئيسية', labelFr: 'Accueil' },
    { id: 'about-profile', label: 'The Firm', labelAr: 'المجموعة', labelFr: 'Le Groupe' },
    {
      id: 'what-we-do',
      label: 'What We Do',
      labelAr: 'ما نقدمه',
      labelFr: 'Ce que nous faisons',
      children: WHAT_WE_DO_CHILDREN,
    },
    { id: 'business-loyalty', label: 'Partners', labelAr: 'الشركاء والعملاء', labelFr: 'Partenaires' },
    { id: 'contact-news', label: 'News', labelAr: 'الأخبار', labelFr: 'Actualités' },
    { id: 'contact-us', label: 'Contact Us', labelAr: 'تواصل معنا', labelFr: 'Contact' },
  ];

  const leftNavLinks = navLinks.slice(0, 3);
  const rightNavLinks = navLinks.slice(3, 6);

  const linkColorClass = (isActive) =>
    isTransparentDark
      ? isActive
        ? 'text-white font-medium drop-shadow-sm'
        : 'text-white/90 hover:text-white drop-shadow-sm'
      : isActive
        ? 'text-foreground font-semibold'
        : 'text-foreground/75 hover:text-foreground';

  const underlineColorClass = isTransparentDark ? 'bg-[#a3d2e2]' : 'bg-[#161833]';

  const renderNavLink = (item) => {
    const isActive =
      currentPage === item.id ||
      (item.id === 'contact-us' && currentPage === 'contact-quote') ||
      (item.id === 'what-we-do' && isWhatWeDoActive);

    const displayLabel = language === 'ar' ? item.labelAr : item.label;

    if (item.children?.length) {
      const isOpen = openDropdown === item.id;

      return (
        <div
          key={item.id}
          className="relative"
          ref={item.id === 'what-we-do' ? dropdownRef : undefined}
          onMouseEnter={() => setOpenDropdown(item.id)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setOpenDropdown(isOpen ? null : item.id)}
            className={`group relative inline-flex items-center gap-1.5 font-mono text-[11px] lg:text-xs uppercase tracking-[0.18em] lg:tracking-[0.2em] transition duration-300 ${linkColorClass(isActive)}`}
          >
            {displayLabel}
            <span
              aria-hidden="true"
              className={`text-[0.65em] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            >
              ▾
            </span>
            <span
              className={`absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500 ${underlineColorClass} ${
                isActive || isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </button>

          <div
            className={`absolute top-full left-0 z-50 pt-3 transition-all duration-200 ${
              isOpen
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-1 opacity-0'
            }`}
          >
            <ul className="min-w-[220px] list-none border border-line bg-white py-2 shadow-[0_12px_40px_rgba(22,24,51,0.12)]">
              {item.children.map((child) => {
                const childLabel = language === 'ar' ? child.labelAr : child.label;
                const childActive = currentPage === child.id;
                return (
                  <li key={child.key || `${child.id}-${child.label}`}>
                    <a
                      href={`#${child.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(child.id, `${child.label} · ${child.labelFr}`);
                      }}
                      className={`block px-5 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                        childActive
                          ? 'bg-surface text-navy font-semibold'
                          : 'text-foreground/80 hover:bg-surface hover:text-navy'
                      }`}
                    >
                      {childLabel}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <a
        key={item.id}
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.id, `${item.label} · ${item.labelFr}`);
        }}
        className={`group relative font-mono text-xs lg:text-sm uppercase tracking-[0.16em] lg:tracking-[0.18em] transition duration-300 ${linkColorClass(isActive)}`}
      >
        {displayLabel}
        <span
          className={`absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500 ${underlineColorClass} ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </a>
    );
  };

  return (
    <>
      <motion.header
        data-site-header="true"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 px-6 transition-all duration-300 md:px-12 ${
          isMenuOpen
            ? 'bg-[#161833]'
            : isTransparentDark
              ? 'bg-gradient-to-b from-[#161833]/75 via-[#161833]/40 to-transparent backdrop-blur-[1px]'
              : 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between py-3 md:py-4 transition-colors duration-300 ${
            isTransparentDark || isMenuOpen ? 'text-white' : 'text-foreground'
          }`}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', 'Home · Accueil');
            }}
            className="group flex items-center md:hidden transition-opacity duration-300 hover:opacity-80"
            aria-label="Five Group Trading Home"
          >
            <img
              src="/brand/five-group-icon.png"
              alt="Five Group Trading Logo"
              className="h-10 w-auto object-contain transition-opacity duration-300 drop-shadow-sm"
            />
          </a>

          <div className="hidden md:block w-[90px] lg:w-[120px] shrink-0" aria-hidden="true" />

          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center justify-end flex-1 gap-5 lg:gap-8">
              {leftNavLinks.map(renderNavLink)}
            </div>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home', 'Home · Accueil');
              }}
              className="group mx-3.5 lg:mx-6 flex items-center justify-center transition-transform duration-300 hover:scale-105 shrink-0"
              aria-label="Five Group Trading Home"
            >
              <img
                src="/brand/five-group-icon.png"
                alt="Five Group Trading Logo"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 drop-shadow-sm"
              />
            </a>

            <div className="flex items-center justify-start flex-1 gap-5 lg:gap-8">
              {rightNavLinks.map(renderNavLink)}
            </div>
          </nav>

          <div className="hidden items-center justify-end md:flex w-[90px] lg:w-[120px] shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              dir="ltr"
              className={`group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] transition-all duration-300 py-1.5 px-2.5 rounded-[2px] cursor-pointer ${
                isTransparentDark
                  ? 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-sm'
                  : 'text-foreground/80 hover:text-foreground hover:bg-black/[0.04]'
              }`}
              aria-label={
                language === 'en'
                  ? 'Switch to Arabic · التبديل إلى العربية'
                  : 'Switch to English'
              }
              title={
                language === 'en'
                  ? 'Switch to Arabic · دولة قطر'
                  : 'Switch to English'
              }
            >
              <FlagIcon
                locale={language === 'en' ? 'qa' : 'en'}
                className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[1px] ring-1 ring-current/25 shadow-xs transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-mono text-xs font-semibold">
                {language === 'en' ? 'AR' : 'EN'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              dir="ltr"
              className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider py-1 px-2 rounded-[2px] transition ${
                isTransparentDark || isMenuOpen
                  ? 'text-white/90 bg-white/10 hover:bg-white/20'
                  : 'text-foreground/85 bg-black/[0.04] hover:bg-black/[0.08]'
              }`}
              aria-label="Toggle language"
            >
              <FlagIcon
                locale={language === 'en' ? 'qa' : 'en'}
                className="h-2.5 w-3.5 shrink-0 rounded-[1px] ring-1 ring-current/25"
              />
              <span className="font-semibold">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] focus:outline-none"
            >
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  isMenuOpen
                    ? 'translate-y-[3.5px] rotate-45 bg-white'
                    : isTransparentDark
                      ? 'bg-white'
                      : 'bg-foreground'
                }`}
              />
              <span
                className={`block h-px w-6 transition-all duration-300 ${
                  isMenuOpen
                    ? '-translate-y-[3.5px] -rotate-45 bg-white'
                    : isTransparentDark
                      ? 'bg-white'
                      : 'bg-foreground'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <div
        className={`fixed inset-0 z-40 bg-[#161833] text-white transition-all duration-500 md:hidden flex flex-col justify-between px-6 pt-24 pb-12 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-center pb-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', 'Home · Accueil');
            }}
            className="group flex items-center justify-center transition-transform duration-300 hover:scale-105"
            aria-label="Five Group Trading Home"
          >
            <img
              src="/brand/five-group-icon.png"
              alt="Five Group Trading Logo"
              className="h-16 w-auto object-contain drop-shadow-sm"
            />
          </a>
        </div>
        <nav className="flex flex-col space-y-6 overflow-y-auto">
          {navLinks.map((item, index) => {
            const displayLabel = language === 'ar' ? item.labelAr : item.label;

            if (item.children?.length) {
              return (
                <div key={item.id} className="border-b border-white/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setMobileWhatWeDoOpen((open) => !open)}
                    className="group flex w-full items-baseline justify-between"
                    aria-expanded={mobileWhatWeDoOpen}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#a3d2e2]">0{index + 1}</span>
                      <span className="font-display text-2xl font-light tracking-tight text-white/90">
                        {displayLabel}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs text-[#a3d2e2] transition-transform ${
                        mobileWhatWeDoOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {mobileWhatWeDoOpen ? (
                    <div className="mt-4 space-y-3 pl-10">
                      {item.children.map((child) => {
                        const childLabel = language === 'ar' ? child.labelAr : child.label;
                        return (
                          <a
                            key={child.key || `${child.id}-${child.label}`}
                            href={`#${child.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(child.id, `${child.label} · ${child.labelFr}`);
                            }}
                            className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-[#a3d2e2]"
                          >
                            {childLabel}
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, `${item.label} · ${item.labelFr}`);
                }}
                className="group flex items-baseline justify-between border-b border-white/10 pb-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#a3d2e2]">0{index + 1}</span>
                  <span className="font-display text-2xl font-light tracking-tight text-white/90 group-hover:text-white">
                    {displayLabel}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#a3d2e2] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </a>
            );
          })}
        </nav>

        <div className="border-t border-white/15 pt-6 space-y-4 font-mono text-xs text-white/60">
          <div className="flex items-center justify-between">
            <span className="tracking-widest uppercase text-[#a3d2e2]">
              {language === 'ar' ? 'بركة العوامر · الدوحة' : 'Birkat Al Awamer · Doha, Qatar'}
            </span>

            <button
              type="button"
              onClick={toggleLanguage}
              dir="ltr"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-[0.2em] transition cursor-pointer"
            >
              <FlagIcon
                locale={language === 'en' ? 'qa' : 'en'}
                className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[1px] ring-1 ring-white/30"
              />
              <span>{language === 'en' ? 'AR · العربية' : 'EN · English'}</span>
            </button>
          </div>

          <p>T +974 4451 3537 · info@fivegrouptrading.com</p>
          <button
            type="button"
            onClick={() => handleNavClick('contact-us', 'Contact Us · Contact')}
            className="w-full mt-2 py-3 border border-[#a3d2e2] text-[#a3d2e2] text-center uppercase tracking-widest hover:bg-[#a3d2e2] hover:text-[#161833] transition"
          >
            {t('navContact')}
          </button>
        </div>
      </div>
    </>
  );
}
