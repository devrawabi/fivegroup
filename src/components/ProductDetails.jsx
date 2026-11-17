import React, { useState } from 'react';
import { getProductSpecs } from '../data/catalog';

export default function ProductDetails({ product, onBack }) {
  const [isInquired, setIsInquired] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    volume: 'Pallet Volume',
    message: `Wholesale inquiry regarding ${product?.name}. Please supply price schedule and lead times.`,
  });

  if (!product) return null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setIsInquired(true);
  };

  const specs = getProductSpecs(product);

  return (
    <div className="bg-background text-foreground min-h-screen pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Back Navigation in Monospace */}
        <div className="mb-10 border-b border-line pb-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted hover:text-foreground transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Return to Portfolio</span>
          </button>
        </div>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Presentation (5 Cols) */}
          <div className="lg:col-span-5 bg-surface border border-line p-8 md:p-12 flex flex-col items-center justify-center sticky top-28">
            <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted mb-8">
              <span className="bg-[#161833] text-white px-2.5 py-0.5">
                {product.brand || 'Five Group'}
              </span>
              <span>{specs.origin || 'Import'}</span>
            </div>

            <div className="relative aspect-square w-full max-w-sm flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="w-full mt-8 pt-4 border-t border-line flex items-center justify-between font-mono text-xs text-muted">
              <span>Standard: {specs.certificates || 'ISO Compliant'}</span>
              <span>{specs.storage || 'Ambient'}</span>
            </div>
          </div>

          {/* Right Column: Specification & Inquiry (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted mb-2">
                FMCG Product Specifications
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-normal text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted font-light leading-relaxed">
                {product.notes ||
                  'Certified commercial grade FMCG product with complete health clearance and temperature-assured chain of custody.'}
              </p>
            </div>

            {/* Architectural Specifications Table */}
            <div className="border-t border-line">
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Brand Name
                </span>
                <span className="font-display text-foreground font-medium">{specs.brand}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Country of Origin
                </span>
                <span className="font-display text-foreground font-medium">{specs.origin}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Packaging Format
                </span>
                <span className="font-display text-foreground font-medium">{specs.format}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Master Case Format
                </span>
                <span className="font-display text-foreground font-medium">{specs.caseFormat}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Storage Condition
                </span>
                <span className="font-display text-foreground font-medium">{specs.storage}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Shelf Life
                </span>
                <span className="font-display text-foreground font-medium">{specs.shelfLife}</span>
              </div>
              <div className="border-b border-line py-3.5 flex items-baseline justify-between text-sm">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Regulatory Compliance
                </span>
                <span className="font-display text-foreground font-medium">
                  {specs.certificates}
                </span>
              </div>
            </div>

            {/* Direct Commercial Quotation Box */}
            <div className="bg-surface p-8 border border-line">
              <h2 className="font-display text-xl font-normal text-foreground mb-1">
                Direct Volume Quotation
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-6">
                Request Case, Pallet or Container Pricing
              </p>

              {isInquired ? (
                <div className="py-6 text-center space-y-2">
                  <span className="font-mono text-xs text-[#a3d2e2] bg-[#161833] px-3 py-1 uppercase tracking-widest inline-block">
                    Inquiry Transmitted
                  </span>
                  <p className="text-sm text-muted font-light mt-2">
                    Our sales desk will send you catalog price lists for {product.name} promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-2.5 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Company / Institution"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-2.5 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-2.5 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-2.5 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-mono text-xs uppercase tracking-[0.22em] bg-[#161833] text-white py-3.5 hover:bg-[#a3d2e2] hover:text-[#161833] transition"
                  >
                    Request Pricing Schedule →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
