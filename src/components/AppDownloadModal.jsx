import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Download, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';
import { detectDevice } from '../utils/appRedirect';
import BrandLogo from './BrandLogo';
import { useWebsiteData } from '../context/WebsiteDataContext';

export default function AppDownloadModal({ isOpen, onClose }) {
  const device = detectDevice();
  const { data } = useWebsiteData();
  const links = { ...APP_CONFIG, ...(data?.appLinks || {}) };
  const siteName = data?.branding?.siteName || 'DOOM OTT';

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
            Download <span className="matte-gold-text">{siteName}</span>
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
                    href={links.playStoreUrl || links.PLAYSTORE_URL}
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
                    href={links.appStoreUrl || links.APPSTORE_URL}
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

                  <div className="modal-trust-badge">
                    <ShieldCheck size={16} className="matte-gold-text" />
                    <span>Verified Official APK • 100% Virus Free • Instant Install</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Mobile View: High Visibility Single Tap Direct Store Redirects */
              <div className="mobile-download-stack">
                <a
                  href={device === 'ios' ? (links.appStoreUrl || links.APPSTORE_URL) : (links.playStoreUrl || links.PLAYSTORE_URL)}
                  className="btn-matte-gold-large full-width"
                  style={{ textDecoration: 'none' }}
                >
                  <Download size={20} />
                  <span>
                    {device === 'ios' ? 'Download for Apple iOS' : 'Download for Android (APK)'}
                  </span>
                </a>

                <div className="store-buttons-column" style={{ marginTop: '1.2rem' }}>
                  <a
                    href={links.playStoreUrl || links.PLAYSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-btn google-play"
                  >
                    <Smartphone size={20} />
                    <div className="store-btn-text">
                      <span className="store-small">Google Play Store</span>
                    </div>
                  </a>

                  <a
                    href={links.appStoreUrl || links.APPSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="store-btn apple-store"
                  >
                    <Download size={20} />
                    <div className="store-btn-text">
                      <span className="store-small">Apple App Store</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
