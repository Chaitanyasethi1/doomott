import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

import './App.css';
import BrandLogo from './components/BrandLogo';
import Intro3D from './components/Intro3D';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AppDownloadModal from './components/AppDownloadModal';
import ShowreelModal from './components/ShowreelModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import { handleSmartAppRedirect } from './utils/appRedirect';
import { APP_CONFIG } from './config/appLinks';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'support'
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'movies' | 'shorts' | 'songs' | 'shows'

  // Modals & 3D Intro (starts as true on page load so intro is immediately visible)
  const [showIntro, setShowIntro] = useState(true);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);

  const handleOpenAppModal = () => {
    handleSmartAppRedirect(() => {
      setAppModalOpen(true);
    });
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="app-wrapper">
      {/* 3D Intro Splash Animation (Skippable) */}
      {showIntro && (
        <Intro3D onComplete={() => setShowIntro(false)} />
      )}

      {/* Sticky Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isAudioActive={isAudioActive}
        onToggleAudio={() => setIsAudioActive(!isAudioActive)}
        onOpenAppModal={handleOpenAppModal}
        onReplayIntro={handleReplayIntro}
      />

      {/* Page Content View Router */}
      <main className="page-content-wrapper">
        {currentPage === 'home' && (
          <HomePage
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onOpenAppModal={handleOpenAppModal}
            onOpenShowreel={() => setShowreelOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenAppModal={handleOpenAppModal} />
        )}

        {currentPage === 'support' && (
          <SupportPage onOpenAppModal={handleOpenAppModal} />
        )}
      </main>

      {/* Fixed Netflix-Style Mobile Bottom Navigation Bar */}
      <BottomNav
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onOpenAppModal={handleOpenAppModal}
      />

      {/* App Download / QR Code Scanner Modal */}
      <AppDownloadModal
        isOpen={appModalOpen}
        onClose={() => setAppModalOpen(false)}
      />

      {/* 3D Showreel Teaser Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
        onOpenAppModal={handleOpenAppModal}
      />

      {/* Footer */}
      <footer className="footer-wrap">
        <div className="footer-inner">
          {/* Brand Info */}
          <div>
            <BrandLogo size="medium" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            <p className="footer-brand-desc">
              DOOM OTT is the unified entertainment platform fusing viral instant shorts, 4K blockbuster cinema, studio-grade lossless songs, and captivating web series with spatial 3D audio.
            </p>
          </div>

          {/* Content Vault Links */}
          <div>
            <h4 className="footer-col-title">CONTENT VAULT</h4>
            <ul className="footer-links-list">
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('movies'); document.getElementById('media-vault')?.scrollIntoView({ behavior: 'smooth' }); }}>4K Blockbusters</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('shorts'); document.getElementById('media-vault')?.scrollIntoView({ behavior: 'smooth' }); }}>Viral Instant Shorts</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('songs'); document.getElementById('media-vault')?.scrollIntoView({ behavior: 'smooth' }); }}>Lossless Studio Songs</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('shows'); document.getElementById('media-vault')?.scrollIntoView({ behavior: 'smooth' }); }}>Original Web Shows</li>
            </ul>
          </div>

          {/* Platform & Mobile */}
          <div>
            <h4 className="footer-col-title">MOBILE APP</h4>
            <ul className="footer-links-list">
              <li onClick={handleOpenAppModal}>Download Android APK</li>
              <li onClick={handleOpenAppModal}>Download iOS App</li>
              <li onClick={() => { setCurrentPage('home'); document.getElementById('vip-pass-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Claim 3-Month VIP Pass</li>
              <li onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Ecosystem & Vision</li>
            </ul>
          </div>

          {/* Support & Community */}
          <div>
            <h4 className="footer-col-title">HELP & COMMUNITY</h4>
            <ul className="footer-links-list">
              <li onClick={() => { setCurrentPage('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>FAQ & Troubleshooting</li>
              <li onClick={() => { setCurrentPage('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact 24/7 Support</li>
              <li><a href={APP_CONFIG.INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram (@doomott)</a></li>
              <li><a href={APP_CONFIG.YOUTUBE_URL} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>YouTube Channel</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} DOOM OTT Inc. All rights reserved. Designed for the next generation of mobile streaming.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--gold-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={13} /> MATTE GOLD & OBSIDIAN EDITION
            </span>
            <button 
              onClick={handleReplayIntro}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <RefreshCw size={12} /> Replay 3D Intro
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
