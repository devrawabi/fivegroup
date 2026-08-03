import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  getOtherNews,
  getRandomProductsForNews,
  getRelatedProductsForNews,
  getRelatedProductsTitle,
} from '../data/news';

function RelatedProductCard({ product, onProductClick }) {
  return (
    <button
      type="button"
      className="news-related-product"
      onClick={() => onProductClick?.(product)}
      aria-label={`View ${product.name}`}
    >
      <span className="news-related-product-media">
        <img src={product.image} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="news-related-product-copy">
        <span className="news-related-product-brand">{product.brand}</span>
        <span className="news-related-product-name">{product.name}</span>
      </span>
    </button>
  );
}

export default function NewsDetails({
  article,
  onBack,
  onNewsClick,
  onProductClick,
}) {
  const articleId = article?.id;
  const relatedProducts = useMemo(
    () => (articleId ? getRelatedProductsForNews(articleId) : []),
    [articleId],
  );
  const otherNews = useMemo(
    () => (articleId ? getOtherNews(articleId) : []),
    [articleId],
  );
  const bottomProducts = useMemo(
    () =>
      articleId
        ? getRandomProductsForNews(
            articleId,
            4,
            relatedProducts.map((product) => product.id),
          )
        : [],
    [articleId, relatedProducts],
  );

  if (!article) return null;

  const paragraphs = article.body.split('\n\n').filter(Boolean);
  const relatedTitle = getRelatedProductsTitle(article.id);

  return (
    <div className="page-view news-details-page">
      <ScrollReveal as="article" className="news-details" delay={60}>
        <div className="container news-details-inner">
          <div className="news-details-topbar">
            <Button
              type="button"
              variant="outline"
              className="btn-back rounded-full"
              onClick={onBack}
            >
              <ArrowLeft data-icon="inline-start" />
              Back to News
            </Button>
          </div>

          <div className="news-details-split">
            <div className="news-details-main">
              <header className="news-details-header">
                {article.date ? (
                  <span className="news-card-date">{article.date}</span>
                ) : null}
                <h1>{article.title}</h1>
              </header>

              <div className="news-details-hero">
                <img
                  src={article.image}
                  alt=""
                  className="news-details-image"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="news-details-body">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 56)}>{paragraph}</p>
                ))}
              </div>
            </div>

            {relatedProducts.length > 0 ? (
              <aside className="news-related-aside" aria-label={relatedTitle}>
                <h2 className="news-related-title">{relatedTitle}</h2>
                <div className="news-related-list">
                  {relatedProducts.map((product) => (
                    <RelatedProductCard
                      key={product.id}
                      product={product}
                      onProductClick={onProductClick}
                    />
                  ))}
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </ScrollReveal>

      <div className="container news-details-bottom">
        {bottomProducts.length > 0 ? (
          <ScrollReveal className="news-bottom-products" delay={80}>
            <div className="news-bottom-header">
              <p className="section-eyebrow">Catalog</p>
              <h2 className="news-bottom-title">More products</h2>
            </div>
            <div className="news-bottom-products-grid">
              {bottomProducts.map((product) => (
                <RelatedProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </ScrollReveal>
        ) : null}

        {otherNews.length > 0 ? (
          <ScrollReveal className="news-other" delay={120}>
            <div className="news-bottom-header">
              <p className="section-eyebrow">Archive</p>
              <h2 className="news-bottom-title">Other news</h2>
            </div>
            <div className="news-other-grid">
              {otherNews.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="news-card news-card--media news-other-card"
                  onClick={() => onNewsClick?.(item)}
                  aria-label={`Read: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="news-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="news-card-overlay" />
                  <div className="news-card-content">
                    {item.date ? (
                      <span className="news-card-date">{item.date}</span>
                    ) : null}
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <span className="news-card-cta">Read more</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </div>
  );
}
