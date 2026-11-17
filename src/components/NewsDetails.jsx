import React, { useMemo } from 'react';
import {
  getOtherNews,
  getRelatedProductsForNews,
  getRelatedProductsTitle,
} from '../data/news';

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

  if (!article) return null;

  const paragraphs = article.body ? article.body.split('\n\n').filter(Boolean) : [article.excerpt];
  const relatedTitle = getRelatedProductsTitle(article.id);

  return (
    <div className="bg-background text-foreground min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        {/* Top Back Navigation */}
        <div className="mb-10 border-b border-line pb-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted hover:text-foreground transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Return to Press Archive</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted mb-4">
            <span>{article.date || '2026'}</span>
            <span>·</span>
            <span className="text-[#161833] font-semibold">{article.tag || 'Official Bulletin'}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-normal text-foreground leading-[1.08] tracking-tight">
            {article.title}
          </h1>
        </header>

        {/* Article Featured Media */}
        {article.image && (
          <div className="mb-12 aspect-[16/9] w-full overflow-hidden bg-surface border border-line">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none space-y-6 text-foreground/85 font-light text-base md:text-lg leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-line">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted block mb-2">
              Associated Catalog Lines
            </span>
            <h3 className="font-display text-2xl font-normal text-foreground mb-8">
              {relatedTitle}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onProductClick?.(prod)}
                  className="bg-background p-6 hover:bg-surface transition-colors cursor-pointer flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                >
                  <div className="aspect-square w-full flex items-center justify-center p-2 mb-4">
                    <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted block mb-1">
                      {prod.brand}
                    </span>
                    <h4 className="font-display text-sm font-medium text-foreground leading-snug">
                      {prod.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other News Section */}
        {otherNews.length > 0 && (
          <div className="mt-16 pt-12 border-t border-line">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted block mb-4">
              More Bulletins · Autres Publications
            </span>
            <div className="border-t border-line">
              {otherNews.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNewsClick?.(item)}
                  className="border-b border-line py-5 flex items-baseline justify-between hover:text-[#161833] cursor-pointer group"
                >
                  <span className="font-display text-base md:text-lg font-normal group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </span>
                  <span className="font-mono text-xs text-muted">→</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
