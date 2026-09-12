import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Download, Sparkles, Volume2 } from 'lucide-react';

export default function ShowreelModal({ isOpen, onClose, onOpenAppModal }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop-fixed" onClick={onClose}>
        <motion.div
          className="showreel-modal-container"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="showreel-modal-header">
            <span className="modal-pill-badge">DOOM 3D SHOWREEL</span>
            <h3 className="showreel-title">The Future of Mobile Streaming</h3>
          </div>

          {/* Cinematic Teaser Window */}
          <div className="showreel-player-screen">
            <div className="player-background-art" />
            <div className="player-ambient-overlay" />

            {/* Centered Pulsing Play Button */}
            <motion.div
              className="player-play-disc"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              onClick={onOpenAppModal}
            >
              <Play size={32} fill="#080808" color="#080808" style={{ marginLeft: '4px' }} />
            </motion.div>

            <div className="player-meta-overlay">
              <h4 className="player-hero-text">UNLIMITED SHORT VIDEOS + 4K OTT</h4>
              <p className="player-sub-text">
                Dolby Atmos Audio • 60 FPS Vertical Reels • Zero-Buffer Caching Engine
              </p>

              <div className="player-audio-badge">
                <Volume2 size={15} className="matte-gold-text" />
                <span>SPATIAL 3D SOUNDTRACK ACTIVE</span>
                <div className="eq-bars">
                  <span className="eq-bar bar-1" />
                  <span className="eq-bar bar-2" />
                  <span className="eq-bar bar-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="showreel-modal-footer">
            <span className="footer-notice-text">
              Available soon on Android (Google Play) & iOS (App Store).
            </span>
            <div className="footer-actions-group">
              <button 
                className="btn-matte-gold"
                onClick={() => {
                  onClose();
                  onOpenAppModal();
                }}
              >
                <Download size={16} /> Get Early Access
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
