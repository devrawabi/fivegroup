import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import SeoManager from '@/components/SeoManager';
import HomeView from './components/HomeView';
import Products from './components/Products';
import { resolvePageId } from '@/data/navigation';
import { PAGE_CONTENT } from '@/data/pages';
import { buildPageUrl, getPageSeo, pagePathFromLocation } from '@/data/seo';
import { PageTransitionProvider } from '@/components/ui/PageTransitionCurtain';
import { usePageTransition } from '@/components/ui/TransitionContext';
import { LanguageProvider, useLanguage } from '@/components/ui/LanguageContext';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';

const AboutView = lazy(() => import('./components/AboutView'));
const LogisticsView = lazy(() => import('./components/LogisticsView'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const ContactView = lazy(() => import('./components/ContactView'));
const NewsView = lazy(() => import('./components/NewsView'));
const NewsDetails = lazy(() => import('./components/NewsDetails'));
const ContentPage = lazy(() => import('./components/ContentPage'));
const CareersView = lazy(() => import('./components/CareersView'));
const LoyaltyCustomersView = lazy(() => import('./components/LoyaltyCustomersView'));

function PageFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background text-muted">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em]">
        <span className="size-2 rounded-full bg-[#a3d2e2] animate-ping" />
        <span>Loading Perspective</span>
      </div>
    </div>
  );
}

function getPageLabel(pageId, lang = 'en') {
  if (lang === 'ar') {
    const arLabels = {
      home: 'الرئيسية · شركة مجموعة الخمسة',
      'about-profile': 'المجموعة · الملف التعريفي',
      'business-categories': 'محفظة التوزيع · المنتجات',
      'brands-featured': 'العلامات التجارية المعتمدة',
      'business-logistics': 'المركز اللوجستي · بركة العوامر',
      'business-loyalty': 'الشركاء والعملاء · شبكة التوزيع',
      'contact-news': 'المركز الإعلامي · الأخبار',
      'contact-us': 'تواصل معنا · المكتب الرئيسي',
      'contact-quote': 'طلب عرض أسعار معتمد',
      'contact-careers': 'الوظائف والفرص المهنية',
    };
    return arLabels[pageId] || 'شركة مجموعة الخمسة للتجارة';
  }
  const enLabels = {
    home: 'Five Group · Distribution & Cold Chain',
    'about-profile': 'The Firm · Corporate Profile',
    'business-categories': 'Wholesale Portfolio · Categories',
    'brands-featured': 'Featured Brands · Portfolio',
    'business-logistics': 'Logistics & Hub · Birkat Al Awamer',
    'business-loyalty': 'Partners & Clients · Network',
    'contact-news': 'Press Archive · Bulletin',
    'contact-us': 'Contact Desk · Headquarters',
    'contact-quote': 'Request Quotation · Inquiry',
    'contact-careers': 'Careers & Talent · Opportunities',
  };
  return enLabels[pageId] || 'Five Group Trading';
}

function readInitialRoute() {
  if (typeof window === 'undefined') {
    return { page: 'home', category: 'all', newsId: null, sku: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    page: pagePathFromLocation(window.location.search),
    category: params.get('c') || 'all',
    newsId: params.get('n'),
    sku: params.get('sku'),
  };
}

function AppInner() {
  const initial = readInitialRoute();
  const [activeTab, setActiveTab] = useState(initial.page);
  const [currentView, setCurrentView] = useState(initial.sku || initial.newsId ? 'details' : 'list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [productCategory, setProductCategory] = useState(initial.category);

  const { navigateWithTransition } = usePageTransition();
  const { language, t } = useLanguage();
  const currentPage = resolvePageId(activeTab);

  const syncUrl = useCallback((page, extras = {}) => {
    const next = buildPageUrl(page, extras);
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== next) {
      window.history.pushState({ page, ...extras }, '', next);
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const route = readInitialRoute();
      navigateWithTransition(() => {
        setActiveTab(route.page);
        setProductCategory(route.category);
        setSelectedNews(null);
        setSelectedProduct(null);
        setCurrentView('list');
      }, getPageLabel(route.page));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [navigateWithTransition]);

  useEffect(() => {
    const extras = {
      category:
        currentPage === 'business-categories' || currentPage === 'brands-featured'
          ? productCategory
          : undefined,
      product: currentView === 'details' && selectedProduct ? selectedProduct.id : undefined,
      news: currentView === 'details' && selectedNews ? selectedNews.id : undefined,
    };
    syncUrl(currentPage, extras);
  }, [currentPage, productCategory, currentView, selectedProduct, selectedNews, syncUrl]);

  const seoOverrides = useMemo(() => {
    if (currentView === 'details' && selectedProduct) {
      return {
        title: `${selectedProduct.name} | Five Group Trading`,
        description: `${selectedProduct.brand || 'Five Group'} — ${selectedProduct.name}. Wholesale FMCG supply in Qatar from Five Group Trading.`,
        image: selectedProduct.image,
      };
    }
    if (currentView === 'details' && selectedNews) {
      return {
        title: `${selectedNews.title} | Five Group News`,
        description: selectedNews.excerpt || getPageSeo('contact-news').description,
        image: selectedNews.image,
      };
    }
    return {};
  }, [currentView, selectedProduct, selectedNews]);

  const handleProductClick = (product) => {
    navigateWithTransition(() => {
      setSelectedProduct(product);
      setSelectedNews(null);
      setCurrentView('details');
      setActiveTab('business-categories');
    }, product.name || 'Product Details');
  };

  const handleNewsClick = (article) => {
    navigateWithTransition(() => {
      setSelectedNews(article);
      setSelectedProduct(null);
      setActiveTab('contact-news');
      setCurrentView('details');
    }, article.title || 'Official Bulletin');
  };

  const handleBackToProducts = () => {
    navigateWithTransition(() => {
      setCurrentView('list');
      setSelectedProduct(null);
      setActiveTab('business-categories');
    }, 'Wholesale Portfolio');
  };

  const handleBackToNews = () => {
    navigateWithTransition(() => {
      setCurrentView('list');
      setSelectedNews(null);
      setActiveTab('contact-news');
    }, 'Press Archive');
  };

  const handleTabChange = (tab, category = null, customLabel = null) => {
    const page = resolvePageId(tab);
    const label = customLabel || getPageLabel(page, language);
    navigateWithTransition(() => {
      setActiveTab(page);
      setSelectedNews(null);

      if (page === 'business-categories' || page === 'brands-featured') {
        setProductCategory(category || 'all');
        setCurrentView('list');
        setSelectedProduct(null);
      } else {
        setCurrentView('list');
        setSelectedProduct(null);
      }
    }, label);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeView
            onNavigate={handleTabChange}
            onNewsClick={handleNewsClick}
            onProductClick={handleProductClick}
          />
        );

      case 'about-profile':
        return <AboutView />;

      case 'business-logistics':
        return <LogisticsView />;

      case 'business-loyalty':
        return <LoyaltyCustomersView onNavigate={handleTabChange} />;

      case 'business-categories':
      case 'brands-featured':
        if (currentView === 'details' && selectedProduct) {
          return <ProductDetails product={selectedProduct} onBack={handleBackToProducts} />;
        }
        return (
          <Products
            onProductClick={handleProductClick}
            activeCategory={productCategory}
            onCategoryChange={setProductCategory}
          />
        );

      case 'contact-us':
      case 'contact-quote':
        return <ContactView />;

      case 'contact-careers':
        return <CareersView onNavigate={handleTabChange} />;

      case 'contact-news':
        if (currentView === 'details' && selectedNews) {
          return (
            <NewsDetails
              article={selectedNews}
              onBack={handleBackToNews}
              onNewsClick={handleNewsClick}
              onProductClick={handleProductClick}
            />
          );
        }
        return <NewsView onArticleClick={handleNewsClick} />;

      default:
        if (PAGE_CONTENT[currentPage]) {
          return <ContentPage pageId={currentPage} onNavigate={handleTabChange} />;
        }
        return (
          <HomeView
            onNavigate={handleTabChange}
            onNewsClick={handleNewsClick}
            onProductClick={handleProductClick}
          />
        );
    }
  };

  return (
    <>
      <SeoManager
        pageId={currentPage}
        title={seoOverrides.title}
        description={seoOverrides.description}
        image={seoOverrides.image}
        includeFaq={currentPage === 'home'}
      />

      <Navbar activeTab={currentPage} setActiveTab={handleTabChange} />

      <main id="main-content" className="relative min-h-[70vh] w-full">
        <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
      </main>

      {/* Editorial Footer - exact BGS Law structure & bilingual adaptation */}
      <footer className="border-t border-white/10 bg-[#161833] px-6 text-white md:px-12">
        <div className="mx-auto max-w-[1400px] py-16 md:py-24">
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-x-8">
            <div className="md:col-span-5">
              <a
                className="block transition-opacity duration-300 hover:opacity-80"
                aria-label="Five Group Trading"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('home', null, getPageLabel('home', language));
                }}
              >
                <img
                  src="/brand/five-group-footer-logo.png"
                  alt="Five Group Trading Logo"
                  className="block h-10 w-auto md:h-12 object-contain"
                />
              </a>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-xs tracking-[0.18em] text-white/50">
                  {t('hours')}
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a3d2e2]/70">
                {t('hubAddress')}
              </p>
            </div>

            <div className="space-y-10 md:col-span-3 md:col-start-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#a3d2e2]/80">
                  {t('footerAddress')}
                </p>
                <address className="mt-3 text-sm not-italic leading-relaxed text-white/85 font-light">
                  {t('addressLine1')}
                  <br />
                  {t('addressLine2')}
                  <br />
                  {t('addressLine3')}
                  <br />
                  {t('addressLine4')}
                </address>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#a3d2e2]/80">
                  {t('footerHours')}
                </p>
                <p className="mt-3 text-sm text-white/85 font-light">
                  {t('hours')}
                </p>
              </div>
            </div>

            <div className="space-y-10 md:col-span-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#a3d2e2]/80">
                  {t('footerContact')}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/85 font-light">
                  <li>
                    <a
                      href="tel:+97444513537"
                      className="transition duration-200 hover:text-[#a3d2e2] font-mono text-xs"
                      dir="ltr"
                    >
                      +974 4451 3537
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@fivegrouptrading.com"
                      className="transition duration-200 hover:text-[#a3d2e2] font-mono text-xs"
                      dir="ltr"
                    >
                      info@fivegrouptrading.com
                    </a>
                  </li>
                  <li className="text-white/55 font-mono text-xs" dir="ltr">
                    Fax · +974 4451 3538
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              © {new Date().getFullYear()} · {t('companyName')} · {t('allRightsReserved')}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <a
                className="hover:text-white transition-colors duration-200"
                href="#legal"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('about-profile', null, language === 'ar' ? 'الشروط القانونية' : 'Legal Notice');
                }}
              >
                {t('legalNotice')}
              </a>
              <a
                className="hover:text-white transition-colors duration-200"
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange('about-profile', null, language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy');
                }}
              >
                {t('privacyPolicy')}
              </a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <PageTransitionProvider>
          <AppInner />
        </PageTransitionProvider>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}
