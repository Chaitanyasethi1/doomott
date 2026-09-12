import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Download, Info, ChevronLeft, ChevronRight, Star, 
  Sparkles, Zap, Smartphone, Headphones, ShieldCheck, 
  Flame, CheckCircle, ArrowRight, Plus, X, Tv, Film, Video, Music
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

/* =========================================================================
   NETFLIX-STYLE SHOWCASE DATA
========================================================================= */

export const TOP_10_TITLES = [
  {
    rank: 1,
    title: 'Kalki: The Dark Eclipse',
    genre: 'Sci-Fi Action Thriller',
    match: '99% Match',
    rating: 'U/A 16+',
    duration: '2h 45m',
    quality: '4K Ultra HD',
    image: '/posters/kalki.jpg',
    badge: 'Trending #1',
    desc: 'Ancient prophecies collide with futuristic orbital warfare in an adrenaline-fueled cyber rebellion.'
  },
  {
    rank: 2,
    title: 'Shadow Samurai 2099',
    genre: 'Neo-Tokyo Cyberpunk',
    match: '97% Match',
    rating: 'A 18+',
    duration: '2h 15m',
    quality: 'Dolby Vision',
    image: '/posters/samurai.jpg',
    badge: 'Exclusive',
    desc: 'A rogue cyber-blade hunts corporate oligarchs across the rain-soaked skies of Neo-Mumbai.'
  },
  {
    rank: 3,
    title: 'Velocity: Night Fury',
    genre: 'High Octane Race Action',
    match: '95% Match',
    rating: 'U/A 13+',
    duration: '1h 58m',
    quality: '4K HDR',
    image: '/posters/velocity.jpg',
    badge: 'Blockbuster',
    desc: 'Supercars customized with sonic thrusters battle high in neon city streets for a $10B vault.'
  },
  {
    rank: 4,
    title: 'The Cartel Syndicate',
    genre: 'Underworld Crime Drama',
    match: '94% Match',
    rating: 'A 18+',
    duration: '8 Episodes',
    quality: '4K HDR10+',
    image: '/posters/syndicate.jpg',
    badge: 'Binge-Worthy',
    desc: 'An underground empire ruled by black market technology and ruthless boardroom barons.'
  },
  {
    rank: 5,
    title: 'Starfall: Golden Nebula',
    genre: 'Deep Space Odyssey',
    match: '93% Match',
    rating: 'U/A 13+',
    duration: '10 Episodes',
    quality: 'Dolby Atmos',
    image: '/posters/starship.jpg',
    badge: 'Original Series',
    desc: 'A colossal explorer cruiser navigates uncharted golden solar flares at the edge of known space.'
  }
];

export const VIRAL_SHORTS = [
  {
    title: 'Hypersonic Drift Reel',
    views: '12.4M Views',
    duration: '0:45s',
    tag: 'Viral Stunt',
    image: '/posters/drift.jpg',
    creator: '@SpeedDemon'
  },
  {
    title: 'Sunburn Arena Beat Drop',
    views: '9.8M Views',
    duration: '0:30s',
    tag: 'EDM Live',
    image: '/posters/concert.jpg',
    creator: '@DJNova'
  },
  {
    title: 'Hyper-Realistic CGI Breakdown',
    views: '8.2M Views',
    duration: '0:50s',
    tag: 'VFX Reel',
    image: '/posters/starship.jpg',
    creator: '@VFXMaster'
  },
  {
    title: 'Midnight Neo-Tokyo Stunt',
    views: '7.5M Views',
    duration: '0:35s',
    tag: 'Cyber Action',
    image: '/posters/samurai.jpg',
    creator: '@ShadowBlade'
  }
];

export const STUDIO_SONGS = [
  {
    title: 'Doom Anthem: Golden Fury',
    artist: 'Original Sound Lab',
    duration: '3:42m',
    audio: '24-Bit Lossless',
    badge: 'Official Theme',
    image: '/posters/music.jpg'
  },
  {
    title: 'Midnight Highway Melody',
    artist: 'Lo-Fi Night Drive',
    duration: '2:58m',
    audio: 'Spatial 3D',
    badge: 'Top Chart #1',
    image: '/posters/highway.jpg'
  },
  {
    title: 'Electrified Dhol Pulse',
    artist: 'Club Bass Collective',
    duration: '3:15m',
    audio: 'Dolby Atmos',
    badge: 'Viral Audio',
    image: '/posters/dhol.jpg'
  }
];

const NETFLIX_FAQS = [
  {
    q: 'What is DOOM OTT?',
    a: 'DOOM OTT is an all-in-one mobile and web streaming app that combines 60-second viral vertical video shorts, 4K blockbuster movies, multi-season web series, and lossless 24-bit studio music with spatial 3D audio in a single subscription.'
  },
  {
    q: 'How much does DOOM OTT cost?',
    a: 'You can stream free content instantly, or unlock the full 4K ad-free VIP tier with our 3-Month Free VIP Pass trial. No credit card is required during the pre-launch phase.'
  },
  {
    q: 'Where can I watch?',
    a: 'Watch anywhere, anytime. Download the DOOM OTT app on your Android smartphone or Apple iPhone, or stream directly on your tablet, laptop, and Smart TV.'
  },
  {
    q: 'Can I listen to music while using other apps or with screen locked?',
    a: 'Yes! DOOM OTT includes a built-in background audio engine that continues playing your favourite lossless tracks and podcasts even when your screen is locked.'
  },
  {
    q: 'How do I claim my 3-Month Free VIP Pass?',
    a: 'Simply enter your phone number or email in the box below. You will receive an instant VIP activation code to enter when launching the mobile app.'
  }
];

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
  const [emailInput, setEmailInput] = useState('');
  const [vipCode, setVipCode] = useState('');
  const [vipClaimed, setVipClaimed] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleClaim = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const code = 'DOOM-' + Math.floor(100000 + Math.random() * 900000);
    setVipCode(code);
    setVipClaimed(true);
  };

  return (
    <div className="netflix-home">
      {/* =========================================================================
          1. NETFLIX-STYLE HERO BILLBOARD
      ========================================================================= */}
      <section className="netflix-billboard">
        <div className="billboard-backdrop" />
        <div className="billboard-vignette-left" />
        <div className="billboard-vignette-bottom" />

        <div className="billboard-content">
          <div className="billboard-top-badge">
            <Flame size={16} className="matte-gold-text" />
            <span>#1 IN MOVIES TODAY</span>
          </div>

          <h1 className="billboard-title">
            KALKI: THE DARK ECLIPSE
          </h1>

          <div className="billboard-meta">
            <span className="match-score">99% Match</span>
            <span className="age-rating">U/A 16+</span>
            <span className="duration-tag">2h 45m</span>
            <span className="quality-pill">4K Ultra HD</span>
            <span className="quality-pill">Dolby Atmos</span>
          </div>

          <p className="billboard-synopsis">
            In a dystopian orbital war where ancient prophecies meet futuristic cyber weapons, a solitary rebel warrior unlocks the sacred dark eclipse engine to battle corporate warlords.
          </p>

          <div className="billboard-actions">
            <button className="btn-netflix-play" onClick={onOpenAppModal}>
              <Play size={20} fill="#080808" color="#080808" />
              <span>Watch in App</span>
            </button>

            <button className="btn-netflix-info" onClick={onOpenShowreel}>
              <Info size={20} />
              <span>3D Teaser</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. NETFLIX TOP 10 IN INDIA ROW (Large Numbered Cards)
      ========================================================================= */}
      <NetflixRow title="Top 10 Trending Today" icon={Flame} rowId="trending-row">
        {TOP_10_TITLES.map((item) => (
          <div 
            key={item.rank} 
            className="top-10-card"
            onClick={onOpenAppModal}
          >
            <div className="top-10-rank-number">
              {item.rank}
            </div>
            <div className="top-10-poster-box">
              <img src={item.image} alt={item.title} className="top-10-poster-img" loading="lazy" />
              <div className="card-top-tag">{item.badge}</div>
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
        {VIRAL_SHORTS.map((short, idx) => (
          <div 
            key={idx} 
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
        {TOP_10_TITLES.slice().reverse().map((movie, idx) => (
          <div 
            key={idx} 
            className="netflix-landscape-card"
            onClick={onOpenAppModal}
          >
            <div className="landscape-poster-wrap">
              <img src={movie.image} alt={movie.title} className="landscape-poster-img" loading="lazy" />
              <div className="card-top-tag">{movie.quality}</div>
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
        {STUDIO_SONGS.map((song, idx) => (
          <div 
            key={idx} 
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
          <div className="reason-card">
            <h3 className="reason-title">Shorts + Cinema in One App</h3>
            <p className="reason-desc">Never switch between reel apps and movie streaming again. Everything is unified in one tap.</p>
            <div className="reason-icon"><Tv size={32} className="matte-gold-text" /></div>
          </div>

          <div className="reason-card">
            <h3 className="reason-title">Download to Watch Offline</h3>
            <p className="reason-desc">Save movies, web series, and viral shorts directly to your phone for flights or offline travel.</p>
            <div className="reason-icon"><Download size={32} className="matte-gold-text" /></div>
          </div>

          <div className="reason-card">
            <h3 className="reason-title">Background Spatial Audio</h3>
            <p className="reason-desc">Listen to lossless 24-bit tracks and original soundtracks even when your phone screen is locked.</p>
            <div className="reason-icon"><Headphones size={32} className="matte-gold-text" /></div>
          </div>

          <div className="reason-card">
            <h3 className="reason-title">Zero-Buffer 4K Engine</h3>
            <p className="reason-desc">Proprietary distributed edge nodes deliver instant playback without stutter on Indian mobile networks.</p>
            <div className="reason-icon"><Zap size={32} className="matte-gold-text" /></div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. NETFLIX-STYLE FAQ ACCORDION
      ========================================================================= */}
      <section className="netflix-faq-section">
        <h2 className="netflix-section-heading text-center">Frequently Asked Questions</h2>
        <div className="netflix-faq-container">
          {NETFLIX_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="netflix-faq-item">
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
            Ready to watch? Enter your mobile number or email to claim your <strong>3-Month Free VIP Pass</strong>.
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
                <span>Get Started</span>
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
                <strong>VIP Pass Activated!</strong> Use code <span className="pass-code">{vipCode}</span> inside the app.
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
