import React, { useState } from 'react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    interest: 'Retail Distribution',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.fullName || !formData.email) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground">
      {/* 1. Dark Midnight Navy Header matching BGS Law (/contact) */}
      <section className="relative flex min-h-[45vh] flex-col justify-end bg-[#161833] text-white px-6 pt-32 pb-16 md:px-12 md:pb-20">
        <div className="mx-auto max-w-[1400px] w-full">
          <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-[#a3d2e2]">
            Contact · Prendre Contact
          </div>
          <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-white">
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block">Direct Dialogue,</span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <span className="block">Measured Operational Precision</span>
            </span>
          </h1>
        </div>
      </section>

      {/* 2. Split Content & Form Section */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-x-12 items-start">
          {/* Left Column: Coordinates & Hours (5 Cols) */}
          <div className="md:col-span-5 space-y-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#161833] font-semibold mb-3">
                Headquarters · Siège Social
              </p>
              <address className="not-italic text-sm md:text-base leading-relaxed text-muted font-light">
                Five Group Trading Company W.L.L.
                <br />
                Building No. 18, Street No. 60, Zone No. 92
                <br />
                Logistic Park-A, Birkat Al Awamer, Al Wukair
                <br />
                PO Box: 31075, Doha – Qatar
              </address>
              <a
                href="https://maps.google.com/?q=Birkat+Al+Awamer+Doha+Qatar"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#161833] hover:text-[#a3d2e2] transition"
              >
                <span>Google Maps Directions</span>
                <span>↗</span>
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#161833] font-semibold mb-3">
                Direct Communications
              </p>
              <ul className="space-y-3 font-mono text-xs text-muted">
                <li>
                  <span className="text-foreground">Telephone: </span>
                  <a href="tel:+97444513537" className="hover:text-foreground transition">
                    +974 4451 3537
                  </a>
                </li>
                <li>
                  <span className="text-foreground">Corporate Email: </span>
                  <a
                    href="mailto:info@fivegrouptrading.com"
                    className="hover:text-foreground transition"
                  >
                    info@fivegrouptrading.com
                  </a>
                </li>
                <li>
                  <span className="text-foreground">Facsimile: </span>
                  <span>+974 4451 3538</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#161833] font-semibold mb-3">
                Operating Schedule
              </p>
              <p className="font-mono text-xs text-muted">
                Sunday – Thursday · 08:00 – 17:30
                <br />
                Warehouse Intake &amp; Dispatch: 24/7 Scheduled
              </p>
            </div>
          </div>

          {/* Right Column: High-End Swiss Inquiry Form (7 Cols) */}
          <div className="md:col-span-7 bg-surface p-8 md:p-12 border border-line">
            <h2 className="font-display text-2xl font-normal text-foreground mb-2">
              Transmission de Demande
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-8">
              Commercial &amp; Wholesale Inquiries
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <span className="font-mono text-xs text-[#a3d2e2] bg-[#161833] px-3 py-1 uppercase tracking-widest inline-block">
                  Transmis avec Succès
                </span>
                <h3 className="font-display text-2xl font-normal text-foreground">
                  Your inquiry has been registered.
                </h3>
                <p className="text-sm text-muted font-light max-w-md mx-auto leading-relaxed">
                  Our commercial distribution desk will review your specifications and contact you
                  within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LuLu Hypermarket / Grand Hotel"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+974 ...."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Commercial Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                  >
                    <option value="Retail Distribution">Retail &amp; Hypermarket Listing</option>
                    <option value="HORECA Supply">HORECA &amp; Foodservice Provisioning</option>
                    <option value="Warehousing Allocation">Cold Storage &amp; Warehousing Space</option>
                    <option value="Brand Representation">International Brand Representation</option>
                    <option value="Wholesale Bulk">Wholesale Container / Pallet Orders</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Message / Specifications
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details regarding volumes, SKUs, or scheduled replenishment requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none transition rounded-[1px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-mono text-xs uppercase tracking-[0.24em] bg-[#161833] text-white py-4 hover:bg-[#a3d2e2] hover:text-[#161833] transition-all duration-300"
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
