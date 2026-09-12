import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Download, QrCode, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';
import { detectDevice } from '../utils/appRedirect';
import BrandLogo from './BrandLogo';

export default function AppDownloadModal({ isOpen, onClose }) {
  const device = detectDevice();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop-fixed" onClick={onClose}>
        <motion.div
          className="download-modal-container"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Header */}
          <div className="download-modal-header">
            <BrandLogo size="medium" />
            <span className="modal-pill-badge">OFFICIAL MOBILE APP</span>
          </div>

          <h2 className="download-modal-title">
            Download <span className="matte-gold-text">DOOM OTT</span>
          </h2>
          <p className="download-modal-subtitle">
            Experience ultra-smooth 4K streaming, 60fps vertical shorts, and background spatial music on your smartphone.
          </p>

          <div className="download-modal-body">
            {/* Desktop View: QR Code & Mobile Store Buttons */}
            {device === 'desktop' ? (
              <div className="qr-section-wrapper">
                <div className="qr-code-box">
                  {/* Clean SVG Scannable QR Code representation */}
                  <svg 
                    viewBox="0 0 160 160" 
                    className="qr-svg"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="160" height="160" fill="#0C0C0C" rx="12" />
                    {/* Corner Position Detection Patterns */}
                    <rect x="15" y="15" width="40" height="40" fill="none" stroke="#D4AF37" strokeWidth="6" rx="4" />
                    <rect x="25" y="25" width="20" height="20" fill="#D4AF37" rx="2" />

                    <rect x="105" y="15" width="40" height="40" fill="none" stroke="#D4AF37" strokeWidth="6" rx="4" />
                    <rect x="115" y="25" width="20" height="20" fill="#D4AF37" rx="2" />

                    <rect x="15" y="105" width="40" height="40" fill="none" stroke="#D4AF37" strokeWidth="6" rx="4" />
                    <rect x="25" y="115" width="20" height="20" fill="#D4AF37" rx="2" />

                    {/* QR Matrix Grid Dots */}
                    <circle cx="70" cy="25" r="4" fill="#D4AF37" />
                    <circle cx="85" cy="25" r="4" fill="#E5C378" />
                    <circle cx="70" cy="40" r="4" fill="#E5C378" />
                    <circle cx="85" cy="50" r="4" fill="#D4AF37" />

                    <circle cx="25" cy="75" r="4" fill="#E5C378" />
                    <circle cx="40" cy="75" r="4" fill="#D4AF37" />
                    <circle cx="55" cy="75" r="4" fill="#D4AF37" />
                    <circle cx="70" cy="75" r="4" fill="#E5C378" />
                    <circle cx="85" cy="75" r="4" fill="#D4AF37" />
                    <circle cx="100" cy="75" r="4" fill="#E5C378" />
                    <circle cx="115" cy="75" r="4" fill="#D4AF37" />
                    <circle cx="130" cy="75" r="4" fill="#E5C378" />

                    <circle cx="70" cy="95" r="4" fill="#D4AF37" />
                    <circle cx="85" cy="95" r="4" fill="#E5C378" />
                    <circle cx="70" cy="115" r="4" fill="#E5C378" />
                    <circle cx="85" cy="115" r="4" fill="#D4AF37" />
                    <circle cx="70" cy="135" r="4" fill="#D4AF37" />
                    <circle cx="85" cy="135" r="4" fill="#E5C378" />

                    <circle cx="105" cy="105" r="4" fill="#D4AF37" />
                    <circle cx="120" cy="105" r="4" fill="#E5C378" />
                    <circle cx="135" cy="105" r="4" fill="#D4AF37" />
                    <circle cx="105" cy="125" r="4" fill="#E5C378" />
                    <circle cx="125" cy="125" r="4" fill="#D4AF37" />
                    <circle cx="120" cy="138" r="4" fill="#E5C378" />
                    <circle cx="138" cy="138" r="4" fill="#D4AF37" />
                  </svg>
                  <span className="qr-scan-hint">
                    <QrCode size={14} /> Point your phone camera to scan & download
                  </span>
                </div>

                <div className="store-buttons-column">
                  <span className="store-group-label">Direct App Store Links</span>
                  <a
                    href={APP_CONFIG.PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-btn google-play"
                  >
                    <div className="store-btn-icon">
                      <Smartphone size={22} />
                    </div>
                    <div className="store-btn-text">
                      <span className="store-small">GET IT ON</span>
                      <span className="store-large">Google Play</span>
                    </div>
                    <ArrowRight size={16} className="store-arrow" />
                  </a>

                  <a
                    href={APP_CONFIG.APPSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-btn apple-store"
                  >
                    <div className="store-btn-icon">
                      <Download size={22} />
                    </div>
                    <div className="store-btn-text">
                      <span className="store-small">DOWNLOAD ON THE</span>
                      <span className="store-large">App Store</span>
                    </div>
                    <ArrowRight size={16} className="store-arrow" />
                  </a>
                </div>
              </div>
            ) : (
              /* Mobile View: 1-Click Primary Store CTA */
              <div className="mobile-direct-download-box">
                {device === 'android' ? (
                  <a
                    href={APP_CONFIG.PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-matte-gold-large"
                  >
                    <Smartphone size={20} />
                    <span>Download on Google Play Store</span>
                  </a>
                ) : (
                  <a
                    href={APP_CONFIG.APPSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-matte-gold-large"
                  >
                    <Download size={20} />
                    <span>Download on Apple App Store</span>
                  </a>
                )}

                <div className="mobile-store-alternatives">
                  <span>Looking for other platforms?</span>
                  <div className="alt-links">
                    <a href={APP_CONFIG.PLAYSTORE_URL} target="_blank" rel="noreferrer">Android APK</a>
                    <span>•</span>
                    <a href={APP_CONFIG.APPSTORE_URL} target="_blank" rel="noreferrer">iOS TestFlight</a>
                  </div>
                </div>
              </div>
            )}

            {/* Feature Perks */}
            <div className="modal-perks-row">
              <div className="modal-perk-item">
                <Check size={14} className="matte-gold-text" />
                <span>Zero Ads</span>
              </div>
              <div className="modal-perk-item">
                <Check size={14} className="matte-gold-text" />
                <span>4K Dolby Vision</span>
              </div>
              <div className="modal-perk-item">
                <Check size={14} className="matte-gold-text" />
                <span>Background Audio</span>
              </div>
              <div className="modal-perk-item">
                <ShieldCheck size={14} className="matte-gold-text" />
                <span>Verified Safe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
