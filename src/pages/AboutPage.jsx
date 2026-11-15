import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Video, Film, Music, Tv, Zap, Users, Globe, 
  ShieldCheck, Download, Award, Layers, Target 
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useWebsiteData } from '../context/WebsiteDataContext';

const ICON_MAP = {
  Layers,
  Zap,
  Users,
  Video,
  Film,
  Music,
  Tv,
  Globe,
  ShieldCheck,
  Award,
  Target,
  Sparkles
};

export default function AboutPage({ onOpenAppModal }) {
  const { data } = useWebsiteData();
  const { aboutPage = {}, branding = {} } = data || {};
  const {
    heroBadge = 'REDEFINING DIGITAL ENTERTAINMENT',
    heroTitle = 'The Story Behind DOOM OTT',
    heroSubtitle = 'We are tearing down the wall between bite-sized viral short videos and long-form cinematic cinema.',
    visionCards = [],
    pillars = [],
    stats = []
  } = aboutPage;

  return (
    <div className="about-page-container">
      {/* Hero Header */}
      <section className="about-hero-section">
        <motion.div
          className="hero-badge-pill"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={14} className="matte-gold-text" />
          <span>{heroBadge}</span>
        </motion.div>

        <motion.h1
          className="about-main-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          className="about-main-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {heroSubtitle}
        </motion.p>
      </section>

      {/* The Unified Ecosystem Vision */}
      <section className="about-vision-section">
        <div className="about-vision-grid">
          {visionCards.map((card, idx) => {
            const IconComp = ICON_MAP[card.icon] || Layers;
            return (
              <div key={card.id || idx} className="vision-card">
                <div className="vision-icon-box">
                  <IconComp size={24} className="matte-gold-text" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What Makes DOOM OTT Different Section */}
      <section className="about-difference-section">
        <div className="about-diff-box">
          <span className="section-pill-tag">WHAT SETS US APART</span>
          <h2 className="section-title">4 Entertainment Pillars. 1 Seamless App.</h2>
          <p className="about-diff-sub">
            Traditional streaming platforms focus either solely on movies or exclusively on short reels. {branding.siteName || 'DOOM OTT'} combines both with lossless studio music.
          </p>

          <div className="pillars-grid">
            {pillars.map((pillar, idx) => {
              const IconComp = ICON_MAP[pillar.icon] || Film;
              return (
                <div key={pillar.id || idx} className="pillar-item">
                  <div className="pillar-header">
                    <IconComp size={22} className="matte-gold-text" />
                    <h4>{pillar.title}</h4>
                  </div>
                  <p>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="about-stats-section">
        <div className="about-stats-container">
          {stats.map((stat, idx) => (
            <React.Fragment key={stat.id || idx}>
              <div className="about-stat-col">
                <span className="about-big-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
              {idx < stats.length - 1 && <div className="stat-sep" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="about-cta-banner">
        <div className="about-cta-inner">
          <BrandLogo size="medium" />
          <h2>Ready To Experience The Next Era Of Cinema?</h2>
          <p>Download the {branding.siteName || 'DOOM OTT'} app or claim your 3 months free VIP pass today.</p>
          <div className="about-cta-buttons">
            <button className="btn-matte-gold-large" onClick={onOpenAppModal}>
              <Download size={18} />
              <span>Get The App Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
