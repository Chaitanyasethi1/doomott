import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, Check, Sparkles } from 'lucide-react';
import { BUILT_IN_POSTERS } from '../config/defaultData';

/**
 * ImageField - Comprehensive Image Selector for Admin Panel
 * Supports:
 * 1. Direct Image URL
 * 2. File Upload from Computer (reads to optimized base64)
 * 3. Built-in Preset Poster Selector
 * 4. Live visual preview
 */
export default function ImageField({ 
  label = 'Image / Poster', 
  value = '', 
  onChange, 
  aspect = '16/9', // '16/9' | '9/16' | '1/1' | 'auto'
  helperText = '' 
}) {
  const [showPresets, setShowPresets] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Compress & convert file to Base64
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Optimize dimensions (max 1280px) to prevent exceeding localStorage quotas
        const MAX_WIDTH = 1280;
        const MAX_HEIGHT = 1280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        onChange(dataUrl);
        setUploadLoading(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-field-group">
      <div className="admin-field-label-row">
        <label className="admin-field-label">{label}</label>
        {helperText && <span className="admin-field-hint">{helperText}</span>}
      </div>

      <div className="admin-image-field-wrap">
        {/* Preview Thumbnail */}
        <div className={`admin-img-preview-box aspect-${aspect}`}>
          {value ? (
            <img 
              src={value} 
              alt="Preview" 
              className="admin-img-preview-thumb" 
              onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
            />
          ) : (
            <div className="admin-img-placeholder">
              <ImageIcon size={26} className="text-muted" />
              <span>No image selected</span>
            </div>
          )}

          {value && (
            <button
              type="button"
              className="admin-img-clear-btn"
              onClick={() => onChange('')}
              title="Remove image"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="admin-img-controls">
          {/* Direct URL input */}
          <div className="admin-input-with-icon">
            <LinkIcon size={16} className="admin-input-icon" />
            <input
              type="text"
              className="admin-input-text"
              placeholder="Enter image URL (/posters/... or https://...)"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>

          <div className="admin-img-buttons-row">
            {/* File Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <button
              type="button"
              className="admin-btn-action"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadLoading}
            >
              <Upload size={14} />
              <span>{uploadLoading ? 'Optimizing...' : 'Upload from Device'}</span>
            </button>

            {/* Presets Gallery Toggle */}
            <button
              type="button"
              className={`admin-btn-action ${showPresets ? 'active' : ''}`}
              onClick={() => setShowPresets(!showPresets)}
            >
              <Sparkles size={14} />
              <span>Preset Posters ({BUILT_IN_POSTERS.length})</span>
            </button>
          </div>

          {/* Preset Posters Dropdown Drawer */}
          {showPresets && (
            <div className="admin-presets-drawer">
              <div className="admin-presets-header">
                <span>Select from Built-in OTT Posters</span>
                <button 
                  type="button" 
                  className="admin-close-mini" 
                  onClick={() => setShowPresets(false)}
                >
                  ✕
                </button>
              </div>
              <div className="admin-presets-grid">
                {BUILT_IN_POSTERS.map((preset, idx) => (
                  <div
                    key={idx}
                    className={`admin-preset-item ${value === preset.url ? 'selected' : ''}`}
                    onClick={() => {
                      onChange(preset.url);
                      setShowPresets(false);
                    }}
                  >
                    <img src={preset.url} alt={preset.label} className="admin-preset-thumb" />
                    <span className="admin-preset-name">{preset.label}</span>
                    {value === preset.url && (
                      <span className="admin-preset-check">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
