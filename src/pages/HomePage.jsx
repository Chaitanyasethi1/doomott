import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Download, Info, ChevronLeft, ChevronRight, 
  Sparkles, Zap, Headphones, ShieldCheck, 
  Flame, CheckCircle, ArrowRight, Plus, X, Tv, Film, Video, Music
} from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

const ICON_MAP = {
  Tv,
  Download,
  Headphones,
  Zap,
  ShieldCheck,
  Sparkles,
  Film,
  Video,
  Music
};

/* =========================================================================
   ROW SCROLLER HELPER COMPONENT
========================================================================= */
function NetflixRow({ title, icon: Icon, children, rowId }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="netflix-row-section" id={rowId}>
      <div className="netflix-row-header">
        <div className="row-title-wrap">
          {Icon && <Icon size={20} className="matte-gold-text" />}
          <h2 className="netflix-row-title">{title}</h2>
        </div>
        <div className="row-nav-arrows">
          <button onClick={() => scroll('left')} className="row-arrow-btn" aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="row-arrow-btn" aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="netflix-row-track" ref={rowRef}>
        {children}
      </div>
    </section>
  );
}

/* =========================================================================
   HOME PAGE COMPONENT
========================================================================= */
export default function HomePage({ onOpenAppModal, onOpenShowreel }) {
  const { data } = useWebsiteData();
  const { 
    heroBillboard = {}, 
    top10Titles = [], 
    viralShorts = [], 
    blockbusterMovies = [],
    studioSongs = [], 
    reasons = [], 
    homeFaqs = [], 
    vipPassSection = {} 
  } = data || {};

  const [emailInput, setEmailInput] = useState('');
  const [vipCode, setVipCode] = useState('');
  const [vipClaimed, setVipClaimed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleClaim = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const prefix = vipPassSection.codePrefix || 'DOOM-';
    const code = prefix + Math.floor(100000 + Math.random() * 900000);
    setVipCode(code);
    setVipClaimed(true);
  };

  return (
    <div className="netflix-home">
      {/* =========================================================================
          1. NETFLIX-STYLE HERO BILLBOARD
      ========================================================================= */}
      <section className="netflix-billboard">
        {/* Dynamic backdrop image from admin */}
        <div 
          className="billboard-backdrop" 
          style={{ 
            backgroundImage: heroBillboard.backdropImage ? `url(${heroBillboard.backdropImage})` : undefined 
          }}
        />
        <div className="billboard-vignette-left" />
        <div className="billboard-vignette-bottom" />

        <div className="billboard-content">
          <div className="billboard-top-badge">
            <Flame size={16} className="matte-gold-text" />
            <span>{heroBillboard.badge || '#1 IN MOVIES TODAY'}</span>
          </div>

          <h1 className="billboard-title">
            {heroBillboard.title || 'KALKI: THE DARK ECLIPSE'}
          </h1>

          <div className="billboard-meta">
            {heroBillboard.matchScore && <span className="match-score">{heroBillboard.matchScore}</span>}
            {heroBillboard.ageRating && <span className="age-rating">{heroBillboard.ageRating}</span>}
            {heroBillboard.duration && <span className="duration-tag">{heroBillboard.duration}</span>}
            {heroBillboard.quality1 && <span className="quality-pill">{heroBillboard.quality1}</span>}
            {heroBillboard.quality2 && <span className="quality-pill">{heroBillboard.quality2}</span>}
          </div>

          <p className="billboard-synopsis">
            {heroBillboard.synopsis || 'Experience cinematic entertainment with DOOM OTT.'}
          </p>

          <div className="billboard-actions">
            <button className="btn-netflix-play" onClick={onOpenAppModal}>
              <Play size={20} fill="#080808" color="#080808" />
              <span>{heroBillboard.primaryBtnText || 'Watch in App'}</span>
            </button>

            <button className="btn-netflix-info" onClick={onOpenShowreel}>
              <Info size={20} />
              <span>{heroBillboard.secondaryBtnText || '3D Teaser'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. NETFLIX TOP 10 IN INDIA ROW (Large Numbered Cards)
      ========================================================================= */}
      <NetflixRow title="Top 10 Trending Today" icon={Flame} rowId="trending-row">
        {top10Titles.map((item, index) => (
          <div 
            key={item.id || index} 
            className="top-10-card"
            onClick={onOpenAppModal}
          >
            <div className="top-10-rank-number">
              {item.rank || index + 1}
            </div>
            <div className="top-10-poster-box">
              <img src={item.image} alt={item.title} className="top-10-poster-img" loading="lazy" />
              {item.badge && <div className="card-top-tag">{item.badge}</div>}
              <div className="card-hover-overlay">
                <Play size={28} className="hover-play-icon" />
                <div className="hover-card-info">
                  <span className="hover-title">{item.title}</span>
                  <span className="hover-sub">{item.match} • {item.quality}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </NetflixRow>

      {/* =========================================================================
          3. VIRAL SHORTS & REELS ROW (9:16 Vertical Cards)
      ========================================================================= */}
      <NetflixRow title="Viral Instant Shorts & Reels" icon={Video} rowId="shorts-row">
        {viralShorts.map((short, idx) => (
          <div 
            key={short.id || idx} 
            className="short-reel-card"
            onClick={onOpenAppModal}
          >
            <img src={short.image} alt={short.title} className="short-reel-img" loading="lazy" />
            <div className="short-reel-gradient" />
            <div className="short-reel-top">
              <span className="short-tag">{short.tag}</span>
              <span className="short-duration">{short.duration}</span>
            </div>
            <div className="short-reel-play-btn">
              <Play size={18} fill="#D4AF37" color="#D4AF37" style={{ marginLeft: '2px' }} />
            </div>
            <div className="short-reel-bottom">
              <h4 className="short-title">{short.title}</h4>
              <span className="short-views">{short.views} • {short.creator}</span>
            </div>
          </div>
        ))}
      </NetflixRow>

      {/* =========================================================================
          4. BLOCKBUSTER 4K MOVIES & SERIES
      ========================================================================= */}
      <NetflixRow title="Blockbuster Movies & Series" icon={Film} rowId="movies-row">
        {(blockbusterMovies.length > 0 ? blockbusterMovies : top10Titles.slice().reverse()).map((movie, idx) => (
          <div 
            key={movie.id || idx} 
            className="netflix-landscape-card"
            onClick={onOpenAppModal}
          >
            <div className="landscape-poster-wrap">
              <img src={movie.image} alt={movie.title} className="landscape-poster-img" loading="lazy" />
              {movie.quality && <div className="card-top-tag">{movie.quality}</div>}
              <div className="landscape-play-disc">
                <Play size={20} fill="#080808" color="#080808" style={{ marginLeft: '2px' }} />
              </div>
            </div>
            <div className="landscape-card-body">
              <div className="landscape-meta">
                <span className="matte-gold-text font-bold">{movie.match}</span>
                <span>{movie.duration}</span>
              </div>
              <h4 className="landscape-title">{movie.title}</h4>
              <p className="landscape-genre">{movie.genre}</p>
            </div>
          </div>
        ))}
      </NetflixRow>

      {/* =========================================================================
          5. LOSSLESS STUDIO SONGS & SPATIAL AUDIO
      ========================================================================= */}
      <NetflixRow title="Lossless Studio Songs & Soundtracks" icon={Music} rowId="songs-row">
        {studioSongs.map((song, idx) => (
          <div 
            key={song.id || idx} 
            className="netflix-song-card"
            onClick={onOpenAppModal}
          >
            <div className="song-artwork-wrap">
              <img src={song.image} alt={song.title} className="song-artwork-img" loading="lazy" />
              <div className="song-play-icon">
                <Play size={20} fill="#080808" color="#080808" style={{ marginLeft: '2px' }} />
              </div>
              <div className="song-eq-badge">
                <div className="eq-bars">
                  <span className="eq-bar bar-1" />
                  <span className="eq-bar bar-2" />
                  <span className="eq-bar bar-3" />
                </div>
              </div>
            </div>
            <div className="song-info">
              <h4 className="song-title">{song.title}</h4>
              <p className="song-artist">{song.artist}</p>
              <span className="song-badge">{song.audio}</span>
            </div>
          </div>
        ))}
      </NetflixRow>

      {/* =========================================================================
          6. WHY DOOM OTT (Netflix-Style Value Pillars)
      ========================================================================= */}
      <section className="netflix-reasons-section">
        <h2 className="netflix-section-heading">More Reasons to Join DOOM OTT</h2>
        <div className="reasons-grid">
          {reasons.map((reason, idx) => {
            const IconComponent = ICON_MAP[reason.icon] || Tv;
            return (
              <div key={reason.id || idx} className="reason-card">
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-desc">{reason.desc}</p>
                <div className="reason-icon">
                  <IconComponent size={32} className="matte-gold-text" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. NETFLIX-STYLE FAQ ACCORDION
      ========================================================================= */}
      <section className="netflix-faq-section">
        <h2 className="netflix-section-heading text-center">Frequently Asked Questions</h2>
        <div className="netflix-faq-container">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.id || idx} className="netflix-faq-item">
                <button 
                  className="netflix-faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <X size={24} className="matte-gold-text" /> : <Plus size={24} />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className="netflix-faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Netflix Membership / VIP Pass Input CTA */}
        <div className="netflix-signup-cta-box" id="vip-pass-section">
          <p className="signup-cta-label">
            {vipPassSection.heading || 'Ready to watch? Enter your mobile number or email to claim your 3-Month Free VIP Pass.'}
          </p>

          {!vipClaimed ? (
            <form onSubmit={handleClaim} className="netflix-email-form">
              <input 
                type="text" 
                placeholder="Mobile number or email address..." 
                className="netflix-email-input"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className="btn-netflix-submit">
                <span>{vipPassSection.buttonText || 'Get Started'}</span>
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <motion.div 
              className="vip-success-banner"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle size={24} className="matte-gold-text" />
              <div>
                <strong>{vipPassSection.successTitle || 'VIP Pass Activated!'}</strong> Use code <span className="pass-code">{vipCode}</span> {vipPassSection.successDesc || 'inside the app.'}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
