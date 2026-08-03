import React, { useState } from 'react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import ScrollReveal from '@/components/ui/scroll-reveal';
import {
  GradientCard,
  GradientCardTitle,
} from '@/components/ui/gradient-card';

export default function ContactView() {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    interest: 'Retailer',
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
    <div className="page-view">
      <div className="container">
        <ScrollReveal as="header" className="page-header">
          <p className="section-eyebrow">Partnerships &amp; Orders</p>
          <h1 className="section-title">contact five group</h1>
          <p className="section-desc">
            Establish a distribution partnership or request bulk catalog shipments for your retail networks.
          </p>
        </ScrollReveal>

        <div className="page-split">
          <ScrollReveal variant="left">
            <GradientCard patternIndex={0} className="page-card-shell">
              <GradientCardTitle className="mb-6 text-xl">Wholesale Inquiry Form</GradientCardTitle>

              {submitted ? (
              <div className="success-state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand-lime)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h4>Inquiry Submitted!</h4>
                <p>
                  Thank you for contacting us. A B2B distribution executive will review your profile and email you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="form-stack" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    id="companyName"
                    type="text"
                    placeholder="Rawabi Supermarket / Doha Catering"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="fullName">Contact Person Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Corporate Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="buyer@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="interest">Inquiry type</label>
                  <select
                    id="interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option value="Retailer">I&apos;m a retailer / wholesale buyer</option>
                    <option value="Brand">I&apos;m a brand / principal</option>
                    <option value="Juices">Coco Queen Coconut Juices</option>
                    <option value="Confectionery">5Star Cream Fudge</option>
                    <option value="Warehousing">Cold Warehousing Storage</option>
                    <option value="Logistics">Fleet Logistics / Transport</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Enter order volumes or specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <ButtonWithIcon type="submit">Send Wholesale Inquiry</ButtonWithIcon>
              </form>
            )}
            </GradientCard>
          </ScrollReveal>

          <div className="page-side-stack">
            <ScrollReveal variant="right" delay={100}>
              <GradientCard patternIndex={1} className="page-card-shell">
                <GradientCardTitle className="mb-4 text-lg">Corporate Head Office</GradientCardTitle>
              <p>
                Building No# 18, Street No# 60, Zone No# 92,
                <br />
                PO Box: 31075, Doha – Qatar
              </p>
              <p>
                <strong>Tel:</strong> +974 4455 1234
              </p>
              <p>
                <strong>General:</strong>{' '}
                <a href="mailto:info@fivegrouptrading.com">info@fivegrouptrading.com</a>
              </p>
              <ul className="contact-dept-list">
                <li>
                  <strong>Sales:</strong>{' '}
                  <a href="mailto:sales@fivegrouptrading.com">sales@fivegrouptrading.com</a>
                </li>
                <li>
                  <strong>Logistics:</strong>{' '}
                  <a href="mailto:logistics@fivegrouptrading.com">logistics@fivegrouptrading.com</a>
                </li>
                <li>
                  <strong>Careers:</strong>{' '}
                  <a href="mailto:careers@fivegrouptrading.com">careers@fivegrouptrading.com</a>
                </li>
              </ul>
              </GradientCard>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={180}>
              <GradientCard patternIndex={2} className="page-card-shell">
                <GradientCardTitle className="mb-4 text-lg">Birkat Al Awamer Cold Storage</GradientCardTitle>
              <p>
                Logistic Park-A, Birkat Al Awamer, Al Wukair,
                <br />
                Doha - Qatar
              </p>
              <p>
                <strong>Hours:</strong> Saturday – Thursday: 8:00 AM – 6:00 PM
              </p>
              </GradientCard>
            </ScrollReveal>

            <ScrollReveal className="map-embed" variant="fade" delay={260}>
              <iframe
                title="Five Group Birkat Al Awamer location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.777085790518!2d51.520448187158204!3d25.137579600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e4604e0e56722ab%3A0xe56722ab!2sBirkat%20Al%20Awamer!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
