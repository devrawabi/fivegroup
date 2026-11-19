import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const TRANSLATIONS = {
  en: {
    navFirm: 'The Firm',
    navExpertise: 'Expertise',
    navLogistics: 'Logistics & Hub',
    navPartners: 'Partners',
    navPress: 'Press',
    navContact: 'Contact',
    inquiry: 'Inquiry',
    requestQuotation: 'Request Quotation',
    switchLabel: 'العربية',
    switchShort: 'AR',
    hours: 'Sunday – Thursday · 08:00 – 17:30',
    hubAddress: 'Birkat Al Awamer · Doha, Qatar',
    allRightsReserved: 'All rights reserved.',
    companyName: 'Five Group Trading Company W.L.L.',
    footerAddress: 'Address',
    footerHours: 'Hours',
    footerContact: 'Contact',
    addressLine1: 'Building 18, Street 60',
    addressLine2: 'Zone 92, Logistics Park-A',
    addressLine3: 'Birkat Al Awamer, PO Box 31075',
    addressLine4: 'Doha · Qatar',
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
  },
  ar: {
    navFirm: 'المجموعة',
    navExpertise: 'مجالات الخبرة',
    navLogistics: 'المركز اللوجستي',
    navPartners: 'الشركاء',
    navPress: 'المركز الإعلامي',
    navContact: 'تواصل معنا',
    inquiry: 'طلب تسعير',
    requestQuotation: 'طلب تسعير معتمد',
    switchLabel: 'English',
    switchShort: 'EN',
    hours: 'الأحد – الخميس · ٠٨:٠٠ – ١٧:٣٠',
    hubAddress: 'بركة العوامر · الدوحة، قطر',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    companyName: 'شركة مجموعة الخمسة للتجارة ذ.م.م.',
    footerAddress: 'العنوان',
    footerHours: 'ساعات العمل',
    footerContact: 'التواصل',
    addressLine1: 'مبنى ١٨، شارع ٦٠',
    addressLine2: 'المنطقة ٩٢، المنطقة اللوجستية (أ)',
    addressLine3: 'بركة العوامر، ص.ب ٣١٠٧٥',
    addressLine4: 'الدوحة · قطر',
    legalNotice: 'الشروط القانونية',
    privacyPolicy: 'سياسة الخصوصية',
  },
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isRtl: false,
  isLangTransitioning: false,
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fivegroup_lang');
      if (stored === 'ar' || stored === 'en') return stored;
    }
    return 'en';
  });
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const langCurtainRef = useRef(null);
  const langTlRef = useRef(null);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fivegroup_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    const curtain = langCurtainRef.current;

    if (!curtain) {
      setLanguage(nextLang);
      return;
    }

    // Kill any in-progress transition
    langTlRef.current?.kill();
    setIsLangTransitioning(true);

    gsap.set(curtain, { yPercent: 100 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLangTransitioning(false);
        langTlRef.current = null;
        gsap.set(curtain, { yPercent: 100 });
      },
    });

    tl.to(curtain, { yPercent: 0, duration: 0.38, ease: 'power3.in' })
      .call(() => {
        setLanguage(nextLang);
      })
      .to({}, { duration: 0.12 })
      .to(curtain, { yPercent: -100, duration: 0.48, ease: 'power3.out' });

    langTlRef.current = tl;
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRtl: language === 'ar',
        isLangTransitioning,
        t,
      }}
    >
      {children}

      {/* Language Switch Curtain — same navy wipe as page transition */}
      <div
        ref={langCurtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-[#8abd3f]"
        style={{ willChange: 'transform', transform: 'translateY(100%)' }}
      />
    </LanguageContext.Provider>
  );
}

export default LanguageContext;

