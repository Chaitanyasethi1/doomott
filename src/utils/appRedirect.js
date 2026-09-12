import { APP_CONFIG } from '../config/appLinks';

/**
 * Detect user device operating system
 * @returns {'android' | 'ios' | 'desktop'}
 */
export function detectDevice() {
  if (typeof window === 'undefined') return 'desktop';
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || '';

  if (/android/i.test(userAgent)) {
    return 'android';
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  // Check for macOS with touch (iPad Pro)
  if (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
    return 'ios';
  }
  return 'desktop';
}

/**
 * Handle smart app redirection:
 * - On Mobile (Android/iOS): attempts deep-link opening, falls back to store if app not present
 * - On Desktop: invokes the provided onDesktop callback (e.g. opens QR download modal)
 * 
 * @param {Function} onDesktopModalOpen - Callback to open QR/Download modal on desktop
 */
export function handleSmartAppRedirect(onDesktopModalOpen) {
  const device = detectDevice();

  if (device === 'android') {
    const start = Date.now();
    // Try deep link
    window.location.href = APP_CONFIG.APP_DEEP_LINK;

    // Fallback to Play Store if app doesn't open within 1.5s
    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = APP_CONFIG.PLAYSTORE_URL;
      }
    }, 1500);
  } else if (device === 'ios') {
    const start = Date.now();
    // Try deep link
    window.location.href = APP_CONFIG.APP_DEEP_LINK;

    // Fallback to App Store if app doesn't open within 1.5s
    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = APP_CONFIG.APPSTORE_URL;
      }
    }, 1500);
  } else {
    // Desktop: open QR Code & Store modal
    if (typeof onDesktopModalOpen === 'function') {
      onDesktopModalOpen();
    } else {
      // Fallback open Play Store in new tab
      window.open(APP_CONFIG.PLAYSTORE_URL, '_blank', 'noopener,noreferrer');
    }
  }
}
