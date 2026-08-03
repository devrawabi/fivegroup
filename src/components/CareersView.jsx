import React, { useState } from 'react'
import { ArrowDown, Briefcase, MapPin, Clock3 } from 'lucide-react'
import { ButtonWithIcon } from '@/components/ui/button-witn-icon'
import ScrollReveal from '@/components/ui/scroll-reveal'
import {
  CAREERS_DEPARTMENTS,
  CAREERS_HERO,
  CAREERS_JOBS,
  CAREERS_STATS,
  CAREERS_VALUES,
} from '@/data/careers'

export default function CareersView({ onNavigate }) {
  const [selectedJobId, setSelectedJobId] = useState(CAREERS_JOBS[0]?.id || '')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: CAREERS_JOBS[0]?.department || CAREERS_DEPARTMENTS[0],
    role: CAREERS_JOBS[0]?.title || '',
    experience: '',
    message: '',
  })

  const selectedJob = CAREERS_JOBS.find((job) => job.id === selectedJobId)

  const scrollToApply = () => {
    document.getElementById('careers-apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToRoles = () => {
    document.getElementById('careers-roles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectJob = (job) => {
    setSelectedJobId(job.id)
    setFormData((current) => ({
      ...current,
      department: job.department,
      role: job.title,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) return
    setSubmitted(true)
  }

  return (
    <div className="page-view careers-view">
      <section className="careers-hero" aria-label="Careers hero">
        <div
          className="careers-hero-media"
          style={{ backgroundImage: `url(${CAREERS_HERO.image})` }}
          aria-hidden="true"
        />
        <div className="careers-hero-overlay" aria-hidden="true" />
        <div className="container careers-hero-inner">
          <ScrollReveal className="careers-hero-copy">
            <p className="section-eyebrow careers-hero-eyebrow">{CAREERS_HERO.eyebrow}</p>
            <h1 className="careers-hero-title">{CAREERS_HERO.title}</h1>
            <p className="careers-hero-lead">{CAREERS_HERO.lead}</p>
            <div className="careers-hero-actions">
              <ButtonWithIcon onDark onClick={scrollToRoles}>
                View openings
              </ButtonWithIcon>
              <button type="button" className="careers-hero-secondary" onClick={scrollToApply}>
                Apply now
                <ArrowDown aria-hidden="true" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container">
        <ScrollReveal className="careers-stats-strip" delay={80}>
          {CAREERS_STATS.map((stat) => (
            <div key={stat.label} className="careers-stat">
              <span className="careers-stat-value">{stat.value}</span>
              <span className="careers-stat-label">{stat.label}</span>
            </div>
          ))}
        </ScrollReveal>
      </div>

      <div className="container careers-body">
        <ScrollReveal as="section" id="careers-roles" className="careers-section" aria-labelledby="careers-roles-heading">
          <div className="careers-section-head">
            <p className="section-eyebrow">Openings</p>
            <h2 id="careers-roles-heading" className="section-title">
              roles we are building
            </h2>
            <p className="section-desc">
              Select a role to prefill your application. We also welcome strong open applications.
            </p>
          </div>

          <ul className="careers-jobs">
            {CAREERS_JOBS.map((job, index) => {
              const isActive = job.id === selectedJobId
              return (
                <ScrollReveal as="li" key={job.id} delay={index * 60}>
                  <button
                    type="button"
                    className={`careers-job ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      selectJob(job)
                      scrollToApply()
                    }}
                    aria-pressed={isActive}
                  >
                    <div className="careers-job-top">
                      <h3>{job.title}</h3>
                      <span className="careers-job-dept">{job.department}</span>
                    </div>
                    <p>{job.summary}</p>
                    <div className="careers-job-meta">
                      <span>
                        <Briefcase aria-hidden="true" />
                        {job.type}
                      </span>
                      <span>
                        <MapPin aria-hidden="true" />
                        {job.location}
                      </span>
                      <span>
                        <Clock3 aria-hidden="true" />
                        Immediate
                      </span>
                    </div>
                  </button>
                </ScrollReveal>
              )
            })}
          </ul>
        </ScrollReveal>

        <ScrollReveal as="section" className="careers-section" aria-labelledby="careers-values-heading">
          <div className="careers-section-head">
            <p className="section-eyebrow">Culture</p>
            <h2 id="careers-values-heading" className="section-title">
              how we work
            </h2>
          </div>
          <div className="careers-values">
            {CAREERS_VALUES.map((value) => (
              <article key={value.id} className="careers-value">
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <section id="careers-apply" className="careers-apply" aria-labelledby="careers-apply-heading">
          <ScrollReveal className="careers-apply-intro">
            <p className="section-eyebrow">Apply</p>
            <h2 id="careers-apply-heading" className="section-title">
              send your profile
            </h2>
            <p className="section-desc">
              {selectedJob
                ? `Applying for ${selectedJob.title}. Our team reviews every application and responds when there is a fit.`
                : 'Tell us where you can contribute. Our team reviews every application carefully.'}
            </p>
            <p className="careers-apply-note">
              Prefer email? Write to{' '}
              <a href="mailto:info@fivegrouptrading.com">info@fivegrouptrading.com</a>
              {' '}or{' '}
              <button type="button" className="careers-inline-link" onClick={() => onNavigate?.('contact-us')}>
                contact the team
              </button>
              .
            </p>
          </ScrollReveal>

          <ScrollReveal className="careers-apply-panel" delay={100}>
            {submitted ? (
              <div className="success-state careers-success">
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
                <h3>Application received</h3>
                <p>
                  Thank you, {formData.fullName.split(' ')[0] || 'applicant'}. Our HR team will review your
                  profile for {formData.role || 'open roles'} and follow up if there is a match.
                </p>
                <ButtonWithIcon
                  onClick={() => {
                    setSubmitted(false)
                    setFormData((current) => ({ ...current, message: '', experience: '' }))
                  }}
                >
                  Submit another
                </ButtonWithIcon>
              </div>
            ) : (
              <form className="form-stack careers-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="careers-fullName">Full name *</label>
                  <input
                    id="careers-fullName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="careers-form-row">
                  <div className="form-field">
                    <label htmlFor="careers-email">Email *</label>
                    <input
                      id="careers-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="careers-phone">Phone *</label>
                    <input
                      id="careers-phone"
                      name="tel"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+974 …"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="careers-form-row">
                  <div className="form-field">
                    <label htmlFor="careers-department">Department</label>
                    <select
                      id="careers-department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    >
                      {CAREERS_DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="careers-role">Role interest</label>
                    <input
                      id="careers-role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Role title"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="careers-experience">Years of experience</label>
                  <input
                    id="careers-experience"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 3 years in FMCG sales"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="careers-message">Cover note</label>
                  <textarea
                    id="careers-message"
                    rows={4}
                    placeholder="Share relevant experience, availability, and why Five Group."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <ButtonWithIcon type="submit">Submit application</ButtonWithIcon>
              </form>
            )}
          </ScrollReveal>
        </section>
      </div>
    </div>
  )
}
