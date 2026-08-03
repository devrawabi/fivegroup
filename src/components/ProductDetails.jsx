import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ButtonWithIcon } from '@/components/ui/button-witn-icon';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { getProductSpecs } from '../data/catalog';

export default function ProductDetails({ product, onBack }) {
  const [isInquired, setIsInquired] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: 'case', // case, pallet, container
    message: `Hello, we are interested in a wholesale inquiry for ${product.name}. Please send us pricing catalog sheets and container/pallet volume options.`
  });

  if (!product) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setIsInquired(true);
  };

  // Specs derived from live catalog category mapping
  const specs = getProductSpecs(product);

  return (
    <section className="details-section">
      <div className="container">
        <div className="details-topbar">
          <ScrollReveal>
            <Button
              type="button"
              variant="outline"
              className="btn-back rounded-full"
              onClick={onBack}
            >
              <ArrowLeft data-icon="inline-start" />
              Back to Catalog
            </Button>
          </ScrollReveal>
        </div>

        <div className="details-grid">
          <ScrollReveal className="details-img-card" variant="left">
            <img src={product.image} alt={product.name} />
          </ScrollReveal>

          <ScrollReveal className="details-content" variant="right" delay={120}>
            <h1>{product.name}</h1>
            <p className="details-notes">{product.notes}</p>
            
            <div className="details-price-badge">
              {product.priceText}
            </div>

            {/* Trading Product Specifications */}
            <table className="details-spec-table">
              <tbody>
                <tr>
                  <th>Brand</th>
                  <td>{specs.brand}</td>
                </tr>
                <tr>
                  <th>Country of Origin</th>
                  <td>{specs.origin}</td>
                </tr>
                <tr>
                  <th>Packaging Format</th>
                  <td>{specs.format}</td>
                </tr>
                <tr>
                  <th>Case Format</th>
                  <td>{specs.caseFormat}</td>
                </tr>
                <tr>
                  <th>Storage Requirements</th>
                  <td>{specs.storage}</td>
                </tr>
                <tr>
                  <th>Shelf Life</th>
                  <td>{specs.shelfLife}</td>
                </tr>
                <tr>
                  <th>Certificates</th>
                  <td>{specs.certificates}</td>
                </tr>
              </tbody>
            </table>

            {/* Wholesale Inquiry Form */}
            <div className="inquiry-card">
              {isInquired ? (
                <div className="inquiry-success animate-fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="44" 
                    height="44" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--brand-lime)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginBottom: '10px' }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <h4>Inquiry Received!</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Thank you. A wholesale coordinator from our Doha headquarters will contact you shortly with catalog pricings and logistics options.
                  </p>
                </div>
              ) : (
                <>
                  <h3>Wholesale Inquiry Form</h3>
                  <p>Submit your interest below. Our team coordinates logistics and supply paths directly across Qatar retail networks.</p>
                  
                  <form onSubmit={handleInquirySubmit}>
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name"
                        value={inquiryForm.name}
                        onChange={handleInputChange}
                        placeholder="Your Name" 
                        className="form-control"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="company"
                        value={inquiryForm.company}
                        onChange={handleInputChange}
                        placeholder="Company Name" 
                        className="form-control"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email"
                        value={inquiryForm.email}
                        onChange={handleInputChange}
                        placeholder="Email Address" 
                        className="form-control"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="tel" 
                        name="phone"
                        value={inquiryForm.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number" 
                        className="form-control"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <select 
                        name="type"
                        value={inquiryForm.type}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{ appearance: 'none', backgroundPosition: 'right 16px center' }}
                      >
                        <option value="case">Trial Cases (10+)</option>
                        <option value="pallet">Pallet Loadings</option>
                        <option value="container">Full Container Load (FCL)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea 
                        name="message"
                        value={inquiryForm.message}
                        onChange={handleInputChange}
                        placeholder="Your Message" 
                        className="form-control"
                        required
                      ></textarea>
                    </div>
                    
                    <ButtonWithIcon type="submit">
                      Submit Wholesale Inquiry
                    </ButtonWithIcon>
                  </form>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
