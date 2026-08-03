import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import ScrollReveal from '@/components/ui/scroll-reveal';
import SeoManager from '@/components/SeoManager';
import HomeView from './components/HomeView';
import Products from './components/Products';
import { FOOTER_LINKS, resolvePageId } from '@/data/navigation';
import { PAGE_CONTENT } from '@/data/pages';
import { buildPageUrl, getPageSeo, pagePathFromLocation } from '@/data/seo';

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
  return <div className="page-loading" role="status" aria-live="polite" aria-label="Loading page" />;
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

function App() {
  const initial = readInitialRoute();
  const [activeTab, setActiveTab] = useState(initial.page);
  const [currentView, setCurrentView] = useState(initial.sku || initial.newsId ? 'details' : 'list');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [productCategory, setProductCategory] = useState(initial.category);

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
      setActiveTab(route.page);
      setProductCategory(route.category);
      setSelectedNews(null);
      setSelectedProduct(null);
      setCurrentView('list');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
    setSelectedProduct(product);
    setSelectedNews(null);
    setCurrentView('details');
    setActiveTab('business-categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsClick = (article) => {
    setSelectedNews(article);
    setSelectedProduct(null);
    setActiveTab('contact-news');
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProducts = () => {
    setCurrentView('list');
    setSelectedProduct(null);
    setActiveTab('business-categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToNews = () => {
    setCurrentView('list');
    setSelectedNews(null);
    setActiveTab('contact-news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab, category = null) => {
    const page = resolvePageId(tab);
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

      <main id="main-content">
        <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
      </main>

      <ScrollReveal as="footer" className="site-footer" variant="fade">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img
              src="/brand/five-group-footer-logo.png"
              alt="Five Group Trading Company logo"
              className="site-footer-logo"
              width={160}
              height={48}
              loading="lazy"
              decoding="async"
            />
            <p>
              Building No# 18, Street No# 60, Zone No# 92, Logistic Park-a, Birkat Al Awamer, Al
              Wukair, PO Box: 31075, Doha – Qatar
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <nav className="site-footer-nav" aria-label="Footer">
              {FOOTER_LINKS.map((link) => {
                const href = buildPageUrl(resolvePageId(link.page));
                return (
                  <a
                    key={link.page}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
          <div>
            <h4>Five Group</h4>
            <p>
              <a href="tel:+97444513537">+974 4451 3537</a>
              <br />
              <a href="mailto:info@fivegrouptrading.com">info@fivegrouptrading.com</a>
            </p>
            <p style={{ marginTop: '12px' }}>
              A premium division of Rawabi Group · Serving Qatar since 2006
            </p>
          </div>
        </div>
        <div className="site-footer-bottom">
          © {new Date().getFullYear()} Five Group Trading. All rights reserved.
        </div>
      </ScrollReveal>
    </>
  );
}

export default App;
