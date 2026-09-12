import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Video, Film, Music, Tv, Zap, Users, Globe, 
  ShieldCheck, ArrowRight, Download, Award, Layers, Target 
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function AboutPage({ onOpenAppModal }) {
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
          <span>REDEFINING DIGITAL ENTERTAINMENT</span>
        </motion.div>

        <motion.h1
          className="about-main-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          The Story Behind <span className="gradient-matte-gold-text">DOOM OTT</span>
        </motion.h1>

        <motion.p
          className="about-main-subtext"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          We are tearing down the wall between bite-sized viral short videos and long-form cinematic cinema. Built for the modern generation of creators, film-lovers, and audiophiles.
        </motion.p>
      </section>

      {/* The Unified Ecosystem Vision */}
      <section className="about-vision-section">
        <div className="about-vision-grid">
          <div className="vision-card">
            <div className="vision-icon-box">
              <Layers size={24} className="matte-gold-text" />
            </div>
            <h3>All Entertainment In One Tap</h3>
            <p>
              Users shouldn't have to juggle 4 different apps for reels, movies, music, and web series. DOOM OTT unifies your entire digital diet under one blazing-fast roof.
            </p>
          </div>

          <div className="vision-card">
            <div className="vision-icon-box">
              <Zap size={24} className="matte-gold-text" />
            </div>
            <h3>Zero-Buffer Edge Streaming</h3>
            <p>
              Proprietary distributed edge nodes deliver instantaneous 4K video playback and 60fps vertical swipe feeds without stutter or buffering.
            </p>
          </div>

          <div className="vision-card">
            <div className="vision-icon-box">
              <Users size={24} className="matte-gold-text" />
            </div>
            <h3>Creator-First Ecosystem</h3>
            <p>
              Direct monetization, high-fidelity lossless audio streaming, and algorithmic exposure designed to empower emerging filmmakers and digital creators.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes DOOM OTT Different Section */}
      <section className="about-difference-section">
        <div className="about-diff-box">
          <span className="section-pill-tag">WHAT SETS US APART</span>
          <h2 className="section-title">4 Entertainment Pillars. 1 Seamless App.</h2>
          <p className="about-diff-sub">
            Traditional streaming platforms focus either solely on movies or exclusively on short reels. DOOM OTT combines both with lossless studio music.
          </p>

          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-header">
                <Video size={22} className="matte-gold-text" />
                <h4>Viral Instant Shorts</h4>
              </div>
              <p>Swipe through 60-second comedy, behind-the-scenes teasers, dance clips, and creative stories with instant audio synchronization.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <Film size={22} className="matte-gold-text" />
                <h4>4K Blockbuster Movies</h4>
              </div>
              <p>Stunning HDR10+ and Dolby Vision cinema library spanning action, neo-noir thrillers, sci-fi epics, and indie gems.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <Music size={22} className="matte-gold-text" />
                <h4>Lossless Studio Songs</h4>
              </div>
              <p>True 24-bit studio master audio with background screen-off playback and proprietary spatial 3D audio enhancement.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-header">
                <Tv size={22} className="matte-gold-text" />
                <h4>Original Web Series</h4>
              </div>
              <p>Multi-episode original narrative series written and produced by independent visionary directors worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="about-stats-section">
        <div className="about-stats-container">
          <div className="about-stat-col">
            <span className="about-big-number">150K+</span>
            <span className="about-stat-label">Pre-Registered Community</span>
          </div>
          <div className="stat-sep" />
          <div className="about-stat-col">
            <span className="about-big-number">50,000+</span>
            <span className="about-stat-label">Curated Video Shorts</span>
          </div>
          <div className="stat-sep" />
          <div className="about-stat-col">
            <span className="about-big-number">4K 60FPS</span>
            <span className="about-stat-label">Maximum Streaming Bitrate</span>
          </div>
          <div className="stat-sep" />
          <div className="about-stat-col">
            <span className="about-big-number">0.02s</span>
            <span className="about-stat-label">Instant Reel Swipe Latency</span>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="about-cta-banner">
        <div className="about-cta-inner">
          <BrandLogo size="medium" />
          <h2>Ready To Experience The Next Era Of Cinema?</h2>
          <p>Download the DOOM OTT app or claim your 3 months free VIP pass today.</p>
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
