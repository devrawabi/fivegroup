import React, { useState } from 'react';
import {
  CAREERS_DEPARTMENTS,
  CAREERS_HERO,
  CAREERS_JOBS,
  CAREERS_STATS,
  CAREERS_VALUES,
} from '@/data/careers';

export default function CareersView() {
  const [selectedJobId, setSelectedJobId] = useState(CAREERS_JOBS[0]?.id || '');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: CAREERS_JOBS[0]?.department || CAREERS_DEPARTMENTS[0],
    role: CAREERS_JOBS[0]?.title || '',
    experience: '',
    message: '',
  });

  const selectJob = (job) => {
    setSelectedJobId(job.id);
    setFormData((current) => ({
      ...current,
      department: job.department,
      role: job.title,
    }));
    document.getElementById('application-desk')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* 1. Header matching BGS Law (/equipe) */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-44 md:pb-24 max-w-[1400px] mx-auto">
        <div className="mb-4 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted">
          Our Team &amp; Careers · Talents &amp; Métiers
        </div>
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.03] tracking-tight font-[450] text-foreground max-w-5xl">
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">Dedicated to Operational Precision,</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span className="block">United in Shared Professional Excellence</span>
          </span>
        </h1>

        <p className="mt-8 text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl">
          {CAREERS_HERO.lead}
        </p>

        {/* Quick Stats in Monospace Hairline Box */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
          {CAREERS_STATS.map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-1">
                {stat.label}
              </span>
              <span className="font-display text-2xl font-medium text-foreground">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Team Values in Swiss Bento Grid */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-surface">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
              Corporate Culture · Démarche
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
              Institutional Values Guiding our Workforce
            </h2>
          </div>

          <div className="grid gap-px bg-line border border-line sm:grid-cols-2 lg:grid-cols-4">
            {CAREERS_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="bg-background p-8 flex flex-col justify-between hover:bg-surface transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#161833] font-semibold block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl font-normal text-foreground mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-muted font-light leading-relaxed">{val.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Open Roles with Hairline List */}
      <section className="border-t border-line px-6 py-20 md:px-12 md:py-28 bg-background">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
                Open Opportunities · Postes Ouverts
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-normal text-foreground">
                Current Professional Openings
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">Doha &amp; Birkat Al Awamer Hub</span>
          </div>

          <div className="border-t border-line">
            {CAREERS_JOBS.map((job) => (
              <div
                key={job.id}
                onClick={() => selectJob(job)}
                className={`border-b border-line py-8 px-2 flex flex-col md:flex-row md:items-baseline justify-between gap-6 hover:bg-surface transition-colors cursor-pointer group ${
                  selectedJobId === job.id ? 'bg-surface' : ''
                }`}
                role="button"
                tabIndex={0}
              >
                <div className="md:w-64 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-[#161833] font-semibold">{job.department}</span>
                  <br />
                  <span className="text-[11px]">{job.location} · {job.type}</span>
                </div>

                <div className="flex-1 max-w-2xl">
                  <h3 className="font-display text-xl md:text-2xl font-normal text-foreground group-hover:text-navy transition-colors">
                    {job.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted font-light leading-relaxed">
                    {job.summary}
                  </p>
                </div>

                <div className="shrink-0 font-mono text-xs text-muted group-hover:text-foreground group-hover:translate-x-1.5 transition-all">
                  Apply for Role →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Application Desk */}
      <section className="border-t border-line bg-surface px-6 py-20 md:px-12 md:py-28" id="application-desk">
        <div className="mx-auto max-w-[800px]">
          <span className="font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-muted block mb-2">
            Direct Transmission
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-normal text-foreground mb-8">
            Candidate Application Desk
          </h2>

          {submitted ? (
            <div className="p-12 text-center bg-background border border-line space-y-3">
              <span className="font-mono text-xs text-[#a3d2e2] bg-[#161833] px-3 py-1 uppercase tracking-widest inline-block">
                Candidature Transmise
              </span>
              <h3 className="font-display text-2xl text-foreground font-normal">
                Your application has been logged.
              </h3>
              <p className="text-sm text-muted font-light">
                Our HR and recruitment division will examine your profile and qualifications.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-background border border-line p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-surface border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="candidate@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+974 ...."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-surface border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                    Role Applied For
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-surface border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted block mb-2">
                  Professional Experience &amp; Cover Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline your background, certifications, and years in FMCG or logistics..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface border border-line px-4 py-3 text-sm text-foreground focus:border-[#161833] focus:outline-none rounded-[1px]"
                />
              </div>

              <button
                type="submit"
                className="w-full font-mono text-xs uppercase tracking-[0.24em] bg-[#161833] text-white py-4 hover:bg-[#a3d2e2] hover:text-[#161833] transition-all duration-300"
              >
                Submit Dossier →
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
