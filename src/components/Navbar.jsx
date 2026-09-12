import React, { useState, useEffect } from 'react';
import { 
  Film, Video, Music, Tv, Smartphone, Sparkles, Volume2, VolumeX, 
  Menu, X, Download, HelpCircle, Info, Home, RefreshCw, Search
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ 
  currentPage, 
  onPageChange, 
  activeCategory, 
  onCategoryChange,
  isAudioActive, 
  onToggleAudio,
  onOpenAppModal,
  onReplayIntro
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, rowId = null) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    if (page === 'home') {
      if (rowId) {
        setTimeout(() => {
          const el = document.getElementById(rowId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left: Brand Logo & Netflix Nav Links */}
        <div className="navbar-left">
          <BrandLogo 
            size="medium" 
            onClick={() => handleNavClick('home')} 
          />

          <nav className="navbar-links-desktop">
            <ul className="nav-menu-netflix">
              <li 
                className={`nav-link-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </li>
              <li 
                className="nav-link-item"
                onClick={() => handleNavClick('home', 'movies-row')}
              >
                Movies
              </li>
              <li 
                className="nav-link-item"
                onClick={() => handleNavClick('home', 'shorts-row')}
              >
                Shorts
              </li>
              <li 
                className="nav-link-item"
                onClick={() => handleNavClick('home', 'songs-row')}
              >
                Music
              </li>
              <li 
                className={`nav-link-item ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About Us
              </li>
              <li 
                className={`nav-link-item ${currentPage === 'support' ? 'active' : ''}`}
                onClick={() => handleNavClick('support')}
              >
                Help Center
              </li>
            </ul>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="navbar-right">
          {/* Spatial Audio Equalizer Pill */}
          <button 
            className={`audio-pill ${isAudioActive ? 'active' : 'muted'}`}
            onClick={onToggleAudio}
            title={isAudioActive ? 'Spatial 3D Audio Active' : 'Audio Engine Muted'}
            aria-label="Toggle Spatial Audio"
          >
            {isAudioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="audio-label">{isAudioActive ? 'SPATIAL' : 'MUTED'}</span>
            {isAudioActive && (
              <div className="eq-bars">
                <span className="eq-bar bar-1" />
                <span className="eq-bar bar-2" />
                <span className="eq-bar bar-3" />
              </div>
            )}
          </button>

          {/* Replay 3D Intro Button */}
          {onReplayIntro && (
            <button 
              className="icon-btn-subtle"
              onClick={onReplayIntro}
              title="Replay 3D Intro"
              aria-label="Replay 3D Intro"
            >
              <RefreshCw size={15} />
            </button>
          )}

          {/* Download App / Get Started Button */}
          <button 
            className="btn-matte-gold"
            onClick={onOpenAppModal}
          >
            <Download size={15} />
            <span>Get App</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <div className="mobile-dropdown-links">
            <button 
              className={`mobile-link-item ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={18} /> Home
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => handleNavClick('home', 'movies-row')}
            >
              <Film size={18} /> Movies & Shows
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => handleNavClick('home', 'shorts-row')}
            >
              <Video size={18} /> Viral Shorts
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => handleNavClick('home', 'songs-row')}
            >
              <Music size={18} /> Studio Music
            </button>
            <button 
              className={`mobile-link-item ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => handleNavClick('about')}
            >
              <Info size={18} /> About DOOM OTT
            </button>
            <button 
              className={`mobile-link-item ${currentPage === 'support' ? 'active' : ''}`}
              onClick={() => handleNavClick('support')}
            >
              <HelpCircle size={18} /> Support & FAQ
            </button>
          </div>

          <div className="mobile-dropdown-cta">
            <button 
              className="btn-matte-gold full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppModal();
              }}
            >
              <Download size={16} /> Download App (Google Play / iOS)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
