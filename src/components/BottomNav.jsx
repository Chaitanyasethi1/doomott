import React from 'react';
import { Home, Video, Film, HelpCircle, Download, Flame } from 'lucide-react';

/**
 * BottomNav - Exact Netflix-style Mobile Bottom Navigation Bar
 */
export default function BottomNav({ 
  currentPage, 
  onPageChange, 
  onOpenAppModal 
}) {
  const handleTab = (page, rowId = null) => {
    onPageChange(page);
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
    <nav className="bottom-nav-root" aria-label="Mobile Bottom Navigation">
      <div className="bottom-nav-container">
        {/* HOME */}
        <button
          className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => handleTab('home')}
          aria-label="Home"
        >
          <div className="bottom-nav-icon-wrap">
            <Home size={20} strokeWidth={currentPage === 'home' ? 2.4 : 1.8} />
            {currentPage === 'home' && <span className="active-dot" />}
          </div>
          <span className="bottom-nav-label">Home</span>
        </button>

        {/* SHORTS */}
        <button
          className="bottom-nav-item"
          onClick={() => handleTab('home', 'shorts-row')}
          aria-label="Shorts"
        >
          <div className="bottom-nav-icon-wrap">
            <Video size={20} strokeWidth={1.8} />
          </div>
          <span className="bottom-nav-label">Shorts</span>
        </button>

        {/* MOVIES */}
        <button
          className="bottom-nav-item"
          onClick={() => handleTab('home', 'movies-row')}
          aria-label="Movies"
        >
          <div className="bottom-nav-icon-wrap">
            <Film size={20} strokeWidth={1.8} />
          </div>
          <span className="bottom-nav-label">Movies</span>
        </button>

        {/* HELP / SUPPORT */}
        <button
          className={`bottom-nav-item ${currentPage === 'support' ? 'active' : ''}`}
          onClick={() => handleTab('support')}
          aria-label="Help"
        >
          <div className="bottom-nav-icon-wrap">
            <HelpCircle size={20} strokeWidth={currentPage === 'support' ? 2.4 : 1.8} />
            {currentPage === 'support' && <span className="active-dot" />}
          </div>
          <span className="bottom-nav-label">Help</span>
        </button>

        {/* GET APP */}
        <button
          className="bottom-nav-item get-app-tab"
          onClick={onOpenAppModal}
          aria-label="Get App"
        >
          <div className="bottom-nav-icon-wrap app-pill-icon">
            <Download size={18} strokeWidth={2.4} />
          </div>
          <span className="bottom-nav-label highlight-label">Get App</span>
        </button>
      </div>
    </nav>
  );
}
