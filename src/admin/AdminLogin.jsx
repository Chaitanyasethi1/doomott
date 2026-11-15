import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function AdminLogin({ onLogin, onCancel }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter the admin password or PIN');
      return;
    }

    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password or PIN. (Master Password: Doom@Harish009)');
    } else {
      setError('');
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-backdrop" />

      <motion.div 
        className="admin-login-card"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Header */}
        <div className="admin-login-header">
          <BrandLogo size="medium" />
          <div className="admin-badge-lock">
            <ShieldCheck size={16} className="matte-gold-text" />
            <span>OTT CONTROL PANEL</span>
          </div>
        </div>

        <h2 className="admin-login-title">Administrator Portal</h2>
        <p className="admin-login-desc">
          Sign in to modify website banners, videos, music, photos, links, and all site content in real time.
        </p>

        {error && (
          <div className="admin-login-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field-group">
            <label className="admin-field-label">Admin Security PIN / Password</label>
            <div className="admin-input-with-icon">
              <Lock size={18} className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="admin-input-text font-mono"
                placeholder="Enter password (Doom@Harish009)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                autoFocus
              />
              <button
                type="button"
                className="admin-input-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div 
            className="admin-credentials-hint" 
            style={{ cursor: 'pointer' }}
            onClick={() => setPassword('Doom@Harish009')}
            title="Click to auto-fill password"
          >
            <KeyRound size={14} className="matte-gold-text" />
            <span>Master Password: <code className="gold-code">Doom@Harish009</code> (Click to fill)</span>
          </div>

          <button type="submit" className="btn-matte-gold full-width admin-submit-btn">
            <ShieldCheck size={18} />
            <span>Unlock Admin Panel</span>
          </button>
        </form>

        <div className="admin-login-footer">
          <button 
            type="button" 
            className="admin-btn-back"
            onClick={onCancel}
          >
            <ArrowLeft size={16} />
            <span>Back to Public Website</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

