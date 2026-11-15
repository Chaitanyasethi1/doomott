import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

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
import AdminPanel from './admin/AdminPanel';
import AdminLogin from './admin/AdminLogin';
import { WebsiteDataProvider, useWebsiteData } from './context/WebsiteDataContext';
import { handleSmartAppRedirect } from './utils/appRedirect';

function AppContent() {
  const { data, isAdminAuthenticated, loginAdmin } = useWebsiteData();
  const { branding = {}, appLinks = {} } = data || {};

  const checkIsAdminUrl = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || hash === '#admin';
  };

  // Navigation State
  const [currentPage, setCurrentPage] = useState(() => {
    return checkIsAdminUrl() ? 'admin' : 'home';
  });
  const [activeCategory, setActiveCategory] = useState('all');

  // Modals & 3D Intro
  const [showIntro, setShowIntro] = useState(true);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);

  // Sync with URL pathname (/admin), hash (#admin), and keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminUrl()) {
        setCurrentPage('admin');
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage((prev) => {
          const next = prev === 'admin' ? 'home' : 'admin';
          if (next === 'admin') {
            window.history.pushState(null, '', '/admin');
          } else {
            window.history.pushState(null, '', '/');
          }
          return next;
        });
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenAppModal = () => {
    handleSmartAppRedirect(() => {
      setAppModalOpen(true);
    });
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const navigateToAdmin = () => {
    setCurrentPage('admin');
    window.history.pushState(null, '', '/admin');
  };

  const exitAdmin = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Admin Mode, render full-screen Admin Console or Login
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLogin={loginAdmin}
          onCancel={exitAdmin}
        />
      );
    }
    return (
      <AdminPanel
        onExit={exitAdmin}
      />
    );
  }

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
              {branding.footerDesc || 'DOOM OTT is the unified entertainment platform fusing viral instant shorts, 4K blockbuster cinema, studio-grade lossless songs, and captivating web series with spatial 3D audio.'}
            </p>
          </div>

          {/* Content Vault Links */}
          <div>
            <h4 className="footer-col-title">CONTENT VAULT</h4>
            <ul className="footer-links-list">
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('movies'); document.getElementById('movies-row')?.scrollIntoView({ behavior: 'smooth' }); }}>4K Blockbusters</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('shorts'); document.getElementById('shorts-row')?.scrollIntoView({ behavior: 'smooth' }); }}>Viral Instant Shorts</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('songs'); document.getElementById('songs-row')?.scrollIntoView({ behavior: 'smooth' }); }}>Lossless Studio Songs</li>
              <li onClick={() => { setCurrentPage('home'); setActiveCategory('shows'); document.getElementById('movies-row')?.scrollIntoView({ behavior: 'smooth' }); }}>Original Web Shows</li>
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
              <li>
                <a href={appLinks.instagramUrl || 'https://instagram.com/doomott'} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Instagram (@doomott)
                </a>
              </li>
              <li>
                <a href={appLinks.youtubeUrl || 'https://youtube.com/@doomott'} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  YouTube Channel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} {branding.copyrightText || 'DOOM OTT Inc. All rights reserved.'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--text-muted)' }}>
              {branding.developerCredit || 'Developed By ABS (Aggarwal Business Solutions)'}
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
            <button
              onClick={() => navigateToAdmin()}
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                color: 'var(--gold-primary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ShieldCheck size={12} /> Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WebsiteDataProvider>
      <AppContent />
    </WebsiteDataProvider>
  );
}
