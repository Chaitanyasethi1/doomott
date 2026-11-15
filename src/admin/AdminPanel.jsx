import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Flame, Video, Film, Music, HelpCircle, 
  Settings, Database, Eye, LogOut, Plus, Trash2, Edit3, 
  ArrowUp, ArrowDown, Save, RotateCcw, Download, 
  Upload, Sparkles, Tv, Info, Key, CheckCircle, Copy, Check
} from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import ImageField from '../components/ImageField';
import BrandLogo from '../components/BrandLogo';

const SUPABASE_SETUP_SQL = `-- 1. Create table for website content
CREATE TABLE IF NOT EXISTS public.website_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access (so all visitors see updates)
CREATE POLICY "Public read website content"
ON public.website_content FOR SELECT TO public USING (true);

-- 4. Allow updates
CREATE POLICY "Public update website content"
ON public.website_content FOR ALL TO public USING (true) WITH CHECK (true);

-- 5. Enable Realtime updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;`;

export default function AdminPanel({ onExit }) {
  const { 
    data, 
    updateSection, 
    updateList, 
    addItemToList, 
    updateItemInList, 
    deleteItemFromList, 
    reorderList, 
    resetToDefaults, 
    exportDataJson, 
    importDataJson,
    logoutAdmin,
    changeAdminPassword,
    cloudStatus,
    syncToCloud
  } = useWebsiteData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveToast, setSaveToast] = useState('');
  
  // Generic Edit Modal State
  const [editingItem, setEditingItem] = useState(null); // { listKey, item, isNew: bool }

  // Admin Password Change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangedSuccess, setPasswordChangedSuccess] = useState(false);

  const showNotification = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const { listKey, item, isNew } = editingItem;
    if (isNew) {
      addItemToList(listKey, item);
      showNotification('New item created successfully!');
    } else {
      updateItemInList(listKey, item.id, item);
      showNotification('Item updated successfully!');
    }
    setEditingItem(null);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPasswordInput.trim()) return;
    changeAdminPassword(newPasswordInput.trim());
    setPasswordChangedSuccess(true);
    setNewPasswordInput('');
    showNotification('Admin password updated successfully!');
    setTimeout(() => setPasswordChangedSuccess(false), 4000);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importDataJson(event.target.result);
      if (result.success) {
        showNotification('Website data imported successfully!');
      } else {
        alert('Failed to import backup: ' + result.error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-root-layout">
      {/* Toast Notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div 
            className="admin-toast-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CheckCircle size={18} className="matte-gold-text" />
            <span>{saveToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navigation Header */}
      <header className="admin-header-bar">
        <div className="admin-header-left">
          <BrandLogo size="small" />
          <div className="admin-header-badge">
            <span className="admin-badge-dot" />
            <span>Admin Console</span>
          </div>
          {cloudStatus === 'connected' && (
            <div className="admin-cloud-pill connected" title="Connected to Supabase - Realtime Sync Active">
              <span className="cloud-dot-green" />
              <span>Cloud Synced</span>
            </div>
          )}
          {cloudStatus === 'needs_table' && (
            <div className="admin-cloud-pill setup-needed" title="Supabase SQL Setup Required">
              <span className="cloud-dot-yellow" />
              <span>SQL Setup Needed</span>
            </div>
          )}
        </div>

        <div className="admin-header-right">
          <button 
            type="button" 
            className="admin-header-btn btn-preview"
            onClick={onExit}
            title="Preview changes on public site"
          >
            <Eye size={16} />
            <span>View Public Website</span>
          </button>

          <button 
            type="button" 
            className="admin-header-btn btn-logout"
            onClick={() => {
              logoutAdmin();
              onExit();
            }}
            title="Sign out of Admin Console"
          >
            <LogOut size={16} />
            <span>Exit Admin</span>
          </button>
        </div>
      </header>

      <div className="admin-body-container">
        {/* Left Navigation Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-menu">
            <div className="admin-menu-section-title">MAIN</div>

            <button
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'hero' ? 'active' : ''}`}
              onClick={() => setActiveTab('hero')}
            >
              <Sparkles size={18} />
              <span>Hero & Banners</span>
            </button>

            <div className="admin-menu-section-title">CONTENT VAULT</div>

            <button
              className={`admin-nav-item ${activeTab === 'top10' ? 'active' : ''}`}
              onClick={() => setActiveTab('top10')}
            >
              <Flame size={18} />
              <span>Top 10 Trending ({data.top10Titles?.length || 0})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'shorts' ? 'active' : ''}`}
              onClick={() => setActiveTab('shorts')}
            >
              <Video size={18} />
              <span>Viral Shorts ({data.viralShorts?.length || 0})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
            >
              <Film size={18} />
              <span>Blockbuster Movies ({data.blockbusterMovies?.length || 0})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'songs' ? 'active' : ''}`}
              onClick={() => setActiveTab('songs')}
            >
              <Music size={18} />
              <span>Studio Songs ({data.studioSongs?.length || 0})</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'reasons' ? 'active' : ''}`}
              onClick={() => setActiveTab('reasons')}
            >
              <Tv size={18} />
              <span>Why DOOM OTT (4 Pillars)</span>
            </button>

            <div className="admin-menu-section-title">PAGES & FAQ</div>

            <button
              className={`admin-nav-item ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <Info size={18} />
              <span>About Us Page</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <HelpCircle size={18} />
              <span>Help Center & FAQ</span>
            </button>

            <div className="admin-menu-section-title">SYSTEM & LINKS</div>

            <button
              className={`admin-nav-item ${activeTab === 'branding' ? 'active' : ''}`}
              onClick={() => setActiveTab('branding')}
            >
              <Settings size={18} />
              <span>Branding & App Links</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
              onClick={() => setActiveTab('backup')}
            >
              <Database size={18} />
              <span>Backup & Reset</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="admin-main-stage">
          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Website Management Dashboard</h2>
                  <p className="admin-stage-subtitle">
                    Manage and update every photo, banner, video, audio track, link, and text on your DOOM OTT platform.
                  </p>
                </div>
                <button className="btn-matte-gold" onClick={onExit}>
                  <Eye size={16} /> View Public Website
                </button>
              </div>

              {/* Supabase Cloud Setup Banner (When table is not created yet) */}
              {cloudStatus === 'needs_table' && (
                <div className="admin-supabase-banner mb-6">
                  <div className="admin-supabase-banner-header">
                    <div className="flex items-center gap-2">
                      <Database size={20} className="matte-gold-text" />
                      <h3 className="admin-card-title text-gold-light">
                        ⚡ Supabase Cloud Database Setup (Sirf 1 Step)
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="btn-matte-gold"
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
                        showNotification('SQL Script Copied to Clipboard!');
                      }}
                    >
                      <Copy size={15} /> Copy SQL Script
                    </button>
                  </div>
                  <p className="admin-stage-subtitle mb-3 text-white">
                    Supabase credentials connect ho chuke hain! Ab bas apne <strong>Supabase Dashboard &gt; SQL Editor</strong> mein jakar <strong>"New Query"</strong> par click karein, niche diya gaya code paste karein aur <strong>"Run"</strong> daba dijiye. Iske baad poori website par changes worldwide live update honge!
                  </p>
                  <pre className="admin-sql-block">
                    {SUPABASE_SETUP_SQL}
                  </pre>
                </div>
              )}

              {/* Supabase Connected Banner */}
              {cloudStatus === 'connected' && (
                <div className="admin-supabase-connected-box mb-6">
                  <CheckCircle size={20} className="text-green" />
                  <div>
                    <strong className="text-white">Supabase Cloud Database Live & Connected!</strong>
                    <p className="text-muted text-xs mt-0.5">
                      Admin panel se jo bhi photo ya text change karenge, woh Supabase cloud mein save hoga aur har visitor ko real-time dikhega.
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Summary Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card" onClick={() => setActiveTab('top10')}>
                  <div className="stat-card-icon"><Flame size={24} className="matte-gold-text" /></div>
                  <div className="stat-card-value">{data.top10Titles?.length || 0}</div>
                  <div className="stat-card-label">Top 10 Trending Titles</div>
                  <div className="stat-card-hint">Click to manage & reorder →</div>
                </div>

                <div className="admin-stat-card" onClick={() => setActiveTab('shorts')}>
                  <div className="stat-card-icon"><Video size={24} className="matte-gold-text" /></div>
                  <div className="stat-card-value">{data.viralShorts?.length || 0}</div>
                  <div className="stat-card-label">Viral 9:16 Shorts & Reels</div>
                  <div className="stat-card-hint">Click to manage & upload →</div>
                </div>

                <div className="admin-stat-card" onClick={() => setActiveTab('movies')}>
                  <div className="stat-card-icon"><Film size={24} className="matte-gold-text" /></div>
                  <div className="stat-card-value">{data.blockbusterMovies?.length || 0}</div>
                  <div className="stat-card-label">Blockbuster Movies & Series</div>
                  <div className="stat-card-hint">Click to manage catalog →</div>
                </div>

                <div className="admin-stat-card" onClick={() => setActiveTab('songs')}>
                  <div className="stat-card-icon"><Music size={24} className="matte-gold-text" /></div>
                  <div className="stat-card-value">{data.studioSongs?.length || 0}</div>
                  <div className="stat-card-label">Lossless Studio Songs</div>
                  <div className="stat-card-hint">Click to manage music →</div>
                </div>
              </div>

              {/* Current Hero Billboard Quick Preview */}
              <div className="admin-card-box mt-6">
                <div className="admin-card-header">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="matte-gold-text" />
                    <h3 className="admin-card-title">Active Hero Billboard Banner</h3>
                  </div>
                  <button className="admin-btn-action" onClick={() => setActiveTab('hero')}>
                    <Edit3 size={14} /> Edit Hero Banner
                  </button>
                </div>
                <div className="admin-billboard-preview-row">
                  <img 
                    src={data.heroBillboard.backdropImage} 
                    alt="Hero Preview" 
                    className="admin-billboard-preview-img" 
                  />
                  <div className="admin-billboard-preview-info">
                    <span className="admin-preview-badge">{data.heroBillboard.badge}</span>
                    <h4 className="admin-preview-title">{data.heroBillboard.title}</h4>
                    <p className="admin-preview-synopsis">{data.heroBillboard.synopsis}</p>
                    <div className="admin-preview-meta">
                      <span>{data.heroBillboard.matchScore}</span> • 
                      <span>{data.heroBillboard.ageRating}</span> • 
                      <span>{data.heroBillboard.duration}</span> • 
                      <span className="gold-text">{data.heroBillboard.quality1}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="admin-grid-2col mt-6">
                <div className="admin-card-box">
                  <h3 className="admin-card-title mb-3">Quick Navigation</h3>
                  <div className="admin-quick-links-list">
                    <button onClick={() => setActiveTab('hero')} className="admin-quick-link">
                      <span>🎬 Change Billboard Title & Poster</span> →
                    </button>
                    <button onClick={() => setActiveTab('top10')} className="admin-quick-link">
                      <span>🏆 Add or Reorder Top 10 Trending Movies</span> →
                    </button>
                    <button onClick={() => setActiveTab('shorts')} className="admin-quick-link">
                      <span>📱 Upload New Vertical Reel / Short</span> →
                    </button>
                    <button onClick={() => setActiveTab('branding')} className="admin-quick-link">
                      <span>🔗 Update Play Store & iOS App Store Links</span> →
                    </button>
                    <button onClick={() => setActiveTab('backup')} className="admin-quick-link">
                      <span>💾 Download Complete Website Backup (JSON)</span> →
                    </button>
                  </div>
                </div>

                <div className="admin-card-box">
                  <h3 className="admin-card-title mb-3">System & Security Status</h3>
                  <div className="admin-info-list">
                    <div className="admin-info-row">
                      <span className="text-muted">Storage Engine:</span>
                      <span className="font-semibold">Local Storage (Active & Persistent)</span>
                    </div>
                    <div className="admin-info-row">
                      <span className="text-muted">Live Auto-Sync:</span>
                      <span className="font-semibold text-green">Enabled (Changes reflect instantly)</span>
                    </div>
                    <div className="admin-info-row">
                      <span className="text-muted">Admin Security:</span>
                      <span className="font-semibold">PIN / Password Protected</span>
                    </div>
                    <div className="admin-info-row">
                      <span className="text-muted">Platform Developer:</span>
                      <span className="matte-gold-text font-bold">{data.branding.developerCredit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. HERO BILLBOARD & BANNERS */}
          {activeTab === 'hero' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Hero Billboard & Banners</h2>
                  <p className="admin-stage-subtitle">
                    Control the large cinematic billboard, backdrop image, synopsis, and VIP promo section.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ Hero & Banners Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save & Publish Live
                  </button>
                  <button type="button" className="admin-btn-action" onClick={onExit}>
                    <Eye size={16} /> View Public Website
                  </button>
                </div>
              </div>

              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">Hero Billboard Main Movie Banner</h3>

                <div className="admin-grid-2col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Top Badge Label</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.badge}
                      onChange={(e) => updateSection('heroBillboard', { badge: e.target.value })}
                      placeholder="#1 IN MOVIES TODAY"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Movie / Series Title</label>
                    <input
                      type="text"
                      className="admin-input-text font-bold"
                      value={data.heroBillboard.title}
                      onChange={(e) => updateSection('heroBillboard', { title: e.target.value })}
                      placeholder="KALKI: THE DARK ECLIPSE"
                    />
                  </div>
                </div>

                {/* Backdrop Image with ImageField component */}
                <ImageField
                  label="Hero Backdrop / Banner Image"
                  value={data.heroBillboard.backdropImage}
                  onChange={(newUrl) => updateSection('heroBillboard', { backdropImage: newUrl })}
                  aspect="16/9"
                  helperText="Upload any custom banner photo or pick from preset OTT posters"
                />

                <div className="admin-field-group">
                  <label className="admin-field-label">Synopsis / Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={data.heroBillboard.synopsis}
                    onChange={(e) => updateSection('heroBillboard', { synopsis: e.target.value })}
                    placeholder="In a dystopian orbital war where ancient prophecies..."
                  />
                </div>

                <div className="admin-grid-4col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Match Score</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.matchScore}
                      onChange={(e) => updateSection('heroBillboard', { matchScore: e.target.value })}
                      placeholder="99% Match"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Age Rating</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.ageRating}
                      onChange={(e) => updateSection('heroBillboard', { ageRating: e.target.value })}
                      placeholder="U/A 16+"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Duration</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.duration}
                      onChange={(e) => updateSection('heroBillboard', { duration: e.target.value })}
                      placeholder="2h 45m"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Quality Badge</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.quality1}
                      onChange={(e) => updateSection('heroBillboard', { quality1: e.target.value })}
                      placeholder="4K Ultra HD"
                    />
                  </div>
                </div>

                <div className="admin-grid-2col mt-4">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Primary Button Text</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.primaryBtnText}
                      onChange={(e) => updateSection('heroBillboard', { primaryBtnText: e.target.value })}
                      placeholder="Watch in App"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Secondary Button Text</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.heroBillboard.secondaryBtnText}
                      onChange={(e) => updateSection('heroBillboard', { secondaryBtnText: e.target.value })}
                      placeholder="3D Teaser"
                    />
                  </div>
                </div>

                {/* Save Button Row for Hero Billboard */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Click to save and instantly update hero billboard on live website</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-matte-gold"
                      onClick={() => {
                        syncToCloud(data);
                        showNotification('✓ Hero Billboard Saved & Published Live!');
                      }}
                    >
                      <Check size={16} /> Save Billboard Changes
                    </button>
                    <button type="button" className="admin-btn-action" onClick={onExit}>
                      <Eye size={15} /> View on Public Site
                    </button>
                  </div>
                </div>
              </div>

              {/* VIP Pass Section Settings */}
              <div className="admin-card-box">
                <h3 className="admin-card-title mb-4">VIP Pass Claim Section (HomePage CTA)</h3>

                <div className="admin-field-group">
                  <label className="admin-field-label">CTA Heading</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={data.vipPassSection.heading}
                    onChange={(e) => updateSection('vipPassSection', { heading: e.target.value })}
                  />
                </div>

                <div className="admin-grid-3col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Submit Button Text</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.vipPassSection.buttonText}
                      onChange={(e) => updateSection('vipPassSection', { buttonText: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Coupon Code Prefix</label>
                    <input
                      type="text"
                      className="admin-input-text font-mono"
                      value={data.vipPassSection.codePrefix}
                      onChange={(e) => updateSection('vipPassSection', { codePrefix: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Success Message</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.vipPassSection.successTitle}
                      onChange={(e) => updateSection('vipPassSection', { successTitle: e.target.value })}
                    />
                  </div>
                </div>

                {/* Save Button Row for VIP Pass */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Save VIP pass offer heading & coupon settings</span>
                  </div>
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ VIP Pass Settings Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save VIP Pass Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. TOP 10 TRENDING TITLES */}
          {activeTab === 'top10' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Top 10 Trending Titles</h2>
                  <p className="admin-stage-subtitle">
                    Featured numbered cards on the home page. Edit ranks, posters, titles, and genres.
                  </p>
                </div>
                <button
                  className="btn-matte-gold"
                  onClick={() => setEditingItem({
                    listKey: 'top10Titles',
                    isNew: true,
                    item: {
                      rank: (data.top10Titles?.length || 0) + 1,
                      title: '',
                      genre: 'Action Sci-Fi',
                      match: '98% Match',
                      rating: 'U/A 16+',
                      duration: '2h 10m',
                      quality: '4K Ultra HD',
                      image: '/posters/kalki.jpg',
                      badge: 'Trending',
                      desc: ''
                    }
                  })}
                >
                  <Plus size={16} /> Add New Trending Title
                </button>
              </div>

              <div className="admin-items-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Rank</th>
                      <th style={{ width: '80px' }}>Poster</th>
                      <th>Title & Genre</th>
                      <th>Match & Quality</th>
                      <th>Badge</th>
                      <th style={{ width: '120px' }}>Order</th>
                      <th style={{ width: '110px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top10Titles?.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="font-bold text-center">
                          <span className="admin-rank-pill">#{item.rank || idx + 1}</span>
                        </td>
                        <td>
                          <img src={item.image} alt={item.title} className="admin-table-thumb" />
                        </td>
                        <td>
                          <div className="font-semibold text-white">{item.title}</div>
                          <div className="text-muted text-xs">{item.genre} • {item.duration}</div>
                        </td>
                        <td>
                          <span className="text-green text-xs font-semibold">{item.match}</span>
                          <span className="text-muted text-xs"> • {item.quality}</span>
                        </td>
                        <td>
                          <span className="admin-badge-mini">{item.badge}</span>
                        </td>
                        <td>
                          <div className="admin-order-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === 0}
                              onClick={() => reorderList('top10Titles', idx, idx - 1)}
                              title="Move Up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === (data.top10Titles.length - 1)}
                              onClick={() => reorderList('top10Titles', idx, idx + 1)}
                              title="Move Down"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              onClick={() => setEditingItem({
                                listKey: 'top10Titles',
                                isNew: false,
                                item: { ...item }
                              })}
                              title="Edit item"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn danger"
                              onClick={() => {
                                if (window.confirm(`Delete "${item.title}"?`)) {
                                  deleteItemFromList('top10Titles', item.id);
                                  showNotification('Deleted item');
                                }
                              }}
                              title="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. VIRAL SHORTS & REELS */}
          {activeTab === 'shorts' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Viral Shorts & Reels (9:16 Vertical)</h2>
                  <p className="admin-stage-subtitle">
                    Vertical video cards on the homepage. Edit titles, views, durations, creator handles, and poster thumbnails.
                  </p>
                </div>
                <button
                  className="btn-matte-gold"
                  onClick={() => setEditingItem({
                    listKey: 'viralShorts',
                    isNew: true,
                    item: {
                      title: '',
                      views: '10.5M Views',
                      duration: '0:45s',
                      tag: 'Viral Reel',
                      image: '/posters/drift.jpg',
                      creator: '@Creator'
                    }
                  })}
                >
                  <Plus size={16} /> Add New Short Reel
                </button>
              </div>

              <div className="admin-items-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>Thumbnail</th>
                      <th>Title</th>
                      <th>Views & Duration</th>
                      <th>Tag</th>
                      <th>Creator</th>
                      <th style={{ width: '120px' }}>Order</th>
                      <th style={{ width: '110px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.viralShorts?.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>
                          <img src={item.image} alt={item.title} className="admin-table-thumb-vertical" />
                        </td>
                        <td>
                          <div className="font-semibold text-white">{item.title}</div>
                        </td>
                        <td>
                          <span className="text-white text-xs font-semibold">{item.views}</span>
                          <span className="text-muted text-xs"> • {item.duration}</span>
                        </td>
                        <td>
                          <span className="admin-badge-mini">{item.tag}</span>
                        </td>
                        <td>
                          <span className="matte-gold-text text-xs">{item.creator}</span>
                        </td>
                        <td>
                          <div className="admin-order-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === 0}
                              onClick={() => reorderList('viralShorts', idx, idx - 1)}
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === (data.viralShorts.length - 1)}
                              onClick={() => reorderList('viralShorts', idx, idx + 1)}
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              onClick={() => setEditingItem({
                                listKey: 'viralShorts',
                                isNew: false,
                                item: { ...item }
                              })}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn danger"
                              onClick={() => {
                                if (window.confirm(`Delete "${item.title}"?`)) {
                                  deleteItemFromList('viralShorts', item.id);
                                  showNotification('Deleted reel');
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. BLOCKBUSTER MOVIES & SHOWS */}
          {activeTab === 'movies' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Blockbuster Movies & Series</h2>
                  <p className="admin-stage-subtitle">
                    Manage the horizontal landscape cards row on the home page.
                  </p>
                </div>
                <button
                  className="btn-matte-gold"
                  onClick={() => setEditingItem({
                    listKey: 'blockbusterMovies',
                    isNew: true,
                    item: {
                      title: '',
                      genre: 'Action Thriller',
                      match: '96% Match',
                      duration: '2h 15m',
                      quality: '4K Ultra HD',
                      image: '/posters/velocity.jpg',
                      badge: 'Blockbuster'
                    }
                  })}
                >
                  <Plus size={16} /> Add Blockbuster Movie
                </button>
              </div>

              <div className="admin-items-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '80px' }}>Poster</th>
                      <th>Title & Genre</th>
                      <th>Match Score</th>
                      <th>Duration & Quality</th>
                      <th>Badge</th>
                      <th style={{ width: '120px' }}>Order</th>
                      <th style={{ width: '110px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.blockbusterMovies?.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>
                          <img src={item.image} alt={item.title} className="admin-table-thumb" />
                        </td>
                        <td>
                          <div className="font-semibold text-white">{item.title}</div>
                          <div className="text-muted text-xs">{item.genre}</div>
                        </td>
                        <td>
                          <span className="text-green text-xs font-semibold">{item.match}</span>
                        </td>
                        <td>
                          <span className="text-white text-xs">{item.duration}</span>
                          <span className="text-muted text-xs"> • {item.quality}</span>
                        </td>
                        <td>
                          <span className="admin-badge-mini">{item.badge}</span>
                        </td>
                        <td>
                          <div className="admin-order-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === 0}
                              onClick={() => reorderList('blockbusterMovies', idx, idx - 1)}
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === (data.blockbusterMovies.length - 1)}
                              onClick={() => reorderList('blockbusterMovies', idx, idx + 1)}
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              onClick={() => setEditingItem({
                                listKey: 'blockbusterMovies',
                                isNew: false,
                                item: { ...item }
                              })}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn danger"
                              onClick={() => {
                                if (window.confirm(`Delete "${item.title}"?`)) {
                                  deleteItemFromList('blockbusterMovies', item.id);
                                  showNotification('Deleted movie');
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. LOSSLESS STUDIO SONGS */}
          {activeTab === 'songs' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Lossless Studio Songs & Soundtracks</h2>
                  <p className="admin-stage-subtitle">
                    Manage studio music, OSTs, artists, audio formats (Lossless, Spatial 3D, Dolby Atmos), and album art.
                  </p>
                </div>
                <button
                  className="btn-matte-gold"
                  onClick={() => setEditingItem({
                    listKey: 'studioSongs',
                    isNew: true,
                    item: {
                      title: '',
                      artist: 'DOOM Sound Lab',
                      duration: '3:30m',
                      audio: '24-Bit Lossless',
                      badge: 'New Release',
                      image: '/posters/music.jpg'
                    }
                  })}
                >
                  <Plus size={16} /> Add New Song
                </button>
              </div>

              <div className="admin-items-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>Artwork</th>
                      <th>Song Title</th>
                      <th>Artist</th>
                      <th>Duration</th>
                      <th>Audio Format</th>
                      <th>Badge</th>
                      <th style={{ width: '120px' }}>Order</th>
                      <th style={{ width: '110px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.studioSongs?.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>
                          <img src={item.image} alt={item.title} className="admin-table-thumb-square" />
                        </td>
                        <td>
                          <div className="font-semibold text-white">{item.title}</div>
                        </td>
                        <td>
                          <span className="text-muted text-sm">{item.artist}</span>
                        </td>
                        <td>
                          <span className="text-xs">{item.duration}</span>
                        </td>
                        <td>
                          <span className="matte-gold-text text-xs font-semibold">{item.audio}</span>
                        </td>
                        <td>
                          <span className="admin-badge-mini">{item.badge}</span>
                        </td>
                        <td>
                          <div className="admin-order-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === 0}
                              onClick={() => reorderList('studioSongs', idx, idx - 1)}
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn"
                              disabled={idx === (data.studioSongs.length - 1)}
                              onClick={() => reorderList('studioSongs', idx, idx + 1)}
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button
                              type="button"
                              className="admin-icon-btn"
                              onClick={() => setEditingItem({
                                listKey: 'studioSongs',
                                isNew: false,
                                item: { ...item }
                              })}
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              className="admin-icon-btn danger"
                              onClick={() => {
                                if (window.confirm(`Delete "${item.title}"?`)) {
                                  deleteItemFromList('studioSongs', item.id);
                                  showNotification('Deleted song');
                                }
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. WHY DOOM OTT (REASONS PILLARS) */}
          {activeTab === 'reasons' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Why DOOM OTT (Value Pillars)</h2>
                  <p className="admin-stage-subtitle">
                    Customize the 4 reason cards displayed on the homepage.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ 4 Value Pillars Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save & Publish Live
                  </button>
                  <button type="button" className="admin-btn-action" onClick={onExit}>
                    <Eye size={16} /> View Public Website
                  </button>
                </div>
              </div>

              <div className="admin-grid-2col">
                {data.reasons?.map((reason, idx) => (
                  <div key={reason.id || idx} className="admin-card-box">
                    <div className="admin-card-header">
                      <span className="admin-badge-pill">Card #{idx + 1}</span>
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Feature Title</label>
                      <input
                        type="text"
                        className="admin-input-text font-bold"
                        value={reason.title}
                        onChange={(e) => {
                          const updated = [...data.reasons];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateList('reasons', updated);
                        }}
                      />
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-textarea"
                        value={reason.desc}
                        onChange={(e) => {
                          const updated = [...data.reasons];
                          updated[idx] = { ...updated[idx], desc: e.target.value };
                          updateList('reasons', updated);
                        }}
                      />
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Icon Identifier</label>
                      <select
                        className="admin-select"
                        value={reason.icon}
                        onChange={(e) => {
                          const updated = [...data.reasons];
                          updated[idx] = { ...updated[idx], icon: e.target.value };
                          updateList('reasons', updated);
                        }}
                      >
                        <option value="Tv">Tv Screen (Tv)</option>
                        <option value="Download">Download Arrow (Download)</option>
                        <option value="Headphones">Headphones / Audio</option>
                        <option value="Zap">Lightning Bolt (Zap)</option>
                        <option value="Film">Film Reel</option>
                        <option value="Video">Video Camera</option>
                        <option value="Music">Music Note</option>
                        <option value="ShieldCheck">Shield Check</option>
                        <option value="Sparkles">Sparkles</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Footer for Value Pillars */}
              <div className="admin-card-box mt-4 flex items-center justify-between flex-wrap gap-3">
                <div className="text-muted text-xs flex items-center gap-1.5">
                  <CheckCircle size={15} className="matte-gold-text" />
                  <span>Click to save all 4 feature cards and update website</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ 4 Value Pillars Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save & Apply Changes
                  </button>
                  <button type="button" className="admin-btn-action" onClick={onExit}>
                    <Eye size={15} /> View on Public Site
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 8. ABOUT US PAGE */}
          {activeTab === 'about' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">About Us Page Content</h2>
                  <p className="admin-stage-subtitle">
                    Control headings, vision statements, ecosystem pillars, and community statistics.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ About Us Content Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save & Publish Live
                  </button>
                  <button type="button" className="admin-btn-action" onClick={onExit}>
                    <Eye size={16} /> View Public Website
                  </button>
                </div>
              </div>

              {/* Hero Banner */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">About Page Hero Header</h3>
                <div className="admin-field-group">
                  <label className="admin-field-label">Top Badge</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={data.aboutPage.heroBadge}
                    onChange={(e) => updateSection('aboutPage', { heroBadge: e.target.value })}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Main Heading</label>
                  <input
                    type="text"
                    className="admin-input-text font-bold"
                    value={data.aboutPage.heroTitle}
                    onChange={(e) => updateSection('aboutPage', { heroTitle: e.target.value })}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={data.aboutPage.heroSubtitle}
                    onChange={(e) => updateSection('aboutPage', { heroSubtitle: e.target.value })}
                  />
                </div>
              </div>

              {/* 3 Vision Cards */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">3 Vision Cards (Ecosystem Section)</h3>
                <div className="admin-grid-3col">
                  {data.aboutPage.visionCards?.map((card, idx) => (
                    <div key={card.id || idx} className="admin-subcard">
                      <span className="admin-badge-mini mb-2">Vision #{idx + 1}</span>
                      <div className="admin-field-group">
                        <label className="admin-field-label">Title</label>
                        <input
                          type="text"
                          className="admin-input-text"
                          value={card.title}
                          onChange={(e) => {
                            const updated = [...data.aboutPage.visionCards];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateSection('aboutPage', { visionCards: updated });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-field-label">Description</label>
                        <textarea
                          rows={3}
                          className="admin-textarea"
                          value={card.desc}
                          onChange={(e) => {
                            const updated = [...data.aboutPage.visionCards];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            updateSection('aboutPage', { visionCards: updated });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Community Stats */}
              <div className="admin-card-box">
                <h3 className="admin-card-title mb-4">4 Community Statistics Counters</h3>
                <div className="admin-grid-4col">
                  {data.aboutPage.stats?.map((stat, idx) => (
                    <div key={stat.id || idx} className="admin-subcard">
                      <div className="admin-field-group">
                        <label className="admin-field-label">Number / Metric</label>
                        <input
                          type="text"
                          className="admin-input-text font-bold text-center matte-gold-text"
                          value={stat.number}
                          onChange={(e) => {
                            const updated = [...data.aboutPage.stats];
                            updated[idx] = { ...updated[idx], number: e.target.value };
                            updateSection('aboutPage', { stats: updated });
                          }}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label className="admin-field-label">Label</label>
                        <input
                          type="text"
                          className="admin-input-text text-center"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...data.aboutPage.stats];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            updateSection('aboutPage', { stats: updated });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button Row for About Us Page */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Click to save and publish all About page headers, vision cards & stats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-matte-gold"
                      onClick={() => {
                        syncToCloud(data);
                        showNotification('✓ About Us Page Saved & Published Live!');
                      }}
                    >
                      <Check size={16} /> Save About Us Page
                    </button>
                    <button type="button" className="admin-btn-action" onClick={onExit}>
                      <Eye size={15} /> View on Public Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. HELP CENTER & FAQS */}
          {activeTab === 'support' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Help Center & FAQs</h2>
                  <p className="admin-stage-subtitle">
                    Add, edit, and organize frequently asked questions across the Homepage and Help Center.
                  </p>
                </div>
                <button
                  className="btn-matte-gold"
                  onClick={() => setEditingItem({
                    listKey: 'homeFaqs',
                    isNew: true,
                    item: {
                      q: 'New Question?',
                      a: 'Detailed answer here...'
                    }
                  })}
                >
                  <Plus size={16} /> Add FAQ Question
                </button>
              </div>

              {/* Support Contact Settings */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-3">Support Contact Information</h3>
                <div className="admin-grid-2col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Official Support Email</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.supportEmail}
                      onChange={(e) => updateSection('appLinks', { supportEmail: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Official Helpline Phone</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.supportPhone}
                      onChange={(e) => updateSection('appLinks', { supportPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Home Page FAQs */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">Homepage FAQ Accordion ({data.homeFaqs?.length || 0})</h3>
                <div className="admin-items-list">
                  {data.homeFaqs?.map((faq, idx) => (
                    <div key={faq.id || idx} className="admin-faq-edit-card">
                      <div className="admin-faq-header-row">
                        <span className="font-semibold text-white">Q{idx + 1}: {faq.q}</span>
                        <div className="admin-action-btns">
                          <button
                            type="button"
                            className="admin-icon-btn"
                            onClick={() => setEditingItem({
                              listKey: 'homeFaqs',
                              isNew: false,
                              item: { ...faq }
                            })}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn danger"
                            onClick={() => {
                              if (window.confirm('Delete this question?')) {
                                deleteItemFromList('homeFaqs', faq.id);
                                showNotification('FAQ deleted');
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="admin-faq-answer-preview">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Support Page FAQs */}
              <div className="admin-card-box">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Support Portal Categorized FAQs ({data.supportPage.faqs?.length || 0})</h3>
                  <button
                    className="admin-btn-action"
                    onClick={() => {
                      const newFaq = {
                        id: 'sup-' + Date.now(),
                        category: 'playback',
                        question: 'New Question?',
                        answer: 'Answer...'
                      };
                      updateSection('supportPage', { faqs: [newFaq, ...(data.supportPage.faqs || [])] });
                      showNotification('Added FAQ to support portal');
                    }}
                  >
                    <Plus size={14} /> Add Support FAQ
                  </button>
                </div>

                <div className="admin-items-list mt-4">
                  {data.supportPage.faqs?.map((faq, idx) => (
                    <div key={faq.id || idx} className="admin-faq-edit-card">
                      <div className="admin-faq-header-row">
                        <div className="flex items-center gap-2">
                          <span className="admin-badge-mini uppercase">{faq.category}</span>
                          <span className="font-semibold text-white">{faq.question}</span>
                        </div>
                        <button
                          type="button"
                          className="admin-icon-btn danger"
                          onClick={() => {
                            if (window.confirm('Delete this question?')) {
                              const updated = data.supportPage.faqs.filter((_, i) => i !== idx);
                              updateSection('supportPage', { faqs: updated });
                              showNotification('Deleted');
                            }
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="admin-faq-answer-preview">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                {/* Save Button Row for Support & FAQs */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Save support contacts & categorized FAQs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-matte-gold"
                      onClick={() => {
                        syncToCloud(data);
                        showNotification('✓ Support & FAQ Settings Saved & Published Live!');
                      }}
                    >
                      <Check size={16} /> Save Support & FAQ Settings
                    </button>
                    <button type="button" className="admin-btn-action" onClick={onExit}>
                      <Eye size={15} /> View on Public Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 10. BRANDING & APP LINKS */}
          {activeTab === 'branding' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Branding, App Links & Socials</h2>
                  <p className="admin-stage-subtitle">
                    Configure official Google Play Store, iOS App Store, website branding, footer credits, and change admin password.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ Branding & App Links Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save & Publish Live
                  </button>
                  <button type="button" className="admin-btn-action" onClick={onExit}>
                    <Eye size={16} /> View Public Website
                  </button>
                </div>
              </div>

              {/* Branding */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">Website Brand & Identity</h3>
                <div className="admin-grid-2col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Platform Name</label>
                    <input
                      type="text"
                      className="admin-input-text font-bold"
                      value={data.branding.siteName}
                      onChange={(e) => updateSection('branding', { siteName: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Brand Tagline</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.branding.siteTagline}
                      onChange={(e) => updateSection('branding', { siteTagline: e.target.value })}
                    />
                  </div>
                </div>

                {/* Custom Logo Image Uploader */}
                <ImageField
                  label="Custom Brand Logo Image (Optional)"
                  value={data.branding.logoUrl}
                  onChange={(newUrl) => updateSection('branding', { logoUrl: newUrl })}
                  aspect="auto"
                  helperText="Leave empty to use built-in vector BrandLogo emblem, or upload/paste a custom logo"
                />

                <div className="admin-field-group">
                  <label className="admin-field-label">Footer Brand Description</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={data.branding.footerDesc}
                    onChange={(e) => updateSection('branding', { footerDesc: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Developer Attribution Text</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.branding.developerCredit}
                      onChange={(e) => updateSection('branding', { developerCredit: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Copyright Notice</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.branding.copyrightText}
                      onChange={(e) => updateSection('branding', { copyrightText: e.target.value })}
                    />
                  </div>
                </div>

                {/* Save Branding */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Save platform name, logo and footer credits</span>
                  </div>
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ Brand Identity & Logo Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save Brand Settings
                  </button>
                </div>
              </div>

              {/* App Links */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">Mobile App Download Store Links</h3>

                <div className="admin-field-group">
                  <label className="admin-field-label">Google Play Store URL</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={data.appLinks.playStoreUrl}
                    onChange={(e) => updateSection('appLinks', { playStoreUrl: e.target.value })}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Apple App Store URL</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={data.appLinks.appStoreUrl}
                    onChange={(e) => updateSection('appLinks', { appStoreUrl: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Custom Deep Link Scheme</label>
                    <input
                      type="text"
                      className="admin-input-text font-mono"
                      value={data.appLinks.deepLink}
                      onChange={(e) => updateSection('appLinks', { deepLink: e.target.value })}
                      placeholder="doomott://open"
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Fallback Web URL</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.fallbackWebUrl}
                      onChange={(e) => updateSection('appLinks', { fallbackWebUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Save App Links */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Save Play Store, App Store and Deep Link URLs</span>
                  </div>
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ App Store & Deep Links Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save App Store Links
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="admin-card-box mb-6">
                <h3 className="admin-card-title mb-4">Official Social Media Profiles</h3>
                <div className="admin-grid-3col">
                  <div className="admin-field-group">
                    <label className="admin-field-label">Instagram Link</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.instagramUrl}
                      onChange={(e) => updateSection('appLinks', { instagramUrl: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">YouTube Link</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.youtubeUrl}
                      onChange={(e) => updateSection('appLinks', { youtubeUrl: e.target.value })}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Twitter / X Link</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      value={data.appLinks.twitterUrl}
                      onChange={(e) => updateSection('appLinks', { twitterUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Save Socials */}
                <div className="admin-card-save-row mt-6 pt-4 border-t border-glass flex items-center justify-between flex-wrap gap-3">
                  <div className="text-muted text-xs flex items-center gap-1.5">
                    <CheckCircle size={15} className="matte-gold-text" />
                    <span>Save Instagram, YouTube and Twitter URLs</span>
                  </div>
                  <button
                    type="button"
                    className="btn-matte-gold"
                    onClick={() => {
                      syncToCloud(data);
                      showNotification('✓ Social Media Links Saved & Published Live!');
                    }}
                  >
                    <Check size={16} /> Save Social Profiles
                  </button>
                </div>
              </div>

              {/* Security: Change Admin Password */}
              <div className="admin-card-box">
                <h3 className="admin-card-title mb-3">Admin Security PIN / Password</h3>
                <p className="admin-stage-subtitle mb-4">
                  Change the password or numeric PIN used to unlock this Admin Console.
                </p>

                <form onSubmit={handlePasswordSubmit} className="admin-password-change-form">
                  <div className="admin-field-group" style={{ maxWidth: '400px' }}>
                    <label className="admin-field-label">New Password or 4-Digit PIN</label>
                    <div className="admin-input-with-icon">
                      <Key size={16} className="admin-input-icon" />
                      <input
                        type="text"
                        className="admin-input-text font-mono"
                        placeholder="Enter new password (e.g. doom2026)"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-matte-gold" style={{ height: '42px', marginTop: '1.4rem' }}>
                    <Save size={16} /> Save New Password
                  </button>
                </form>

                {passwordChangedSuccess && (
                  <div className="text-green text-sm mt-3 flex items-center gap-2">
                    <CheckCircle size={16} /> Password updated successfully!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 11. BACKUP & FACTORY RESET */}
          {activeTab === 'backup' && (
            <div className="admin-panel-section">
              <div className="admin-section-header">
                <div>
                  <h2 className="admin-stage-title">Backup, Restore & Reset</h2>
                  <p className="admin-stage-subtitle">
                    Safely export a complete snapshot of all website content, import a backup JSON file, or restore factory default data.
                  </p>
                </div>
              </div>

              <div className="admin-grid-2col">
                {/* Export & Import */}
                <div className="admin-card-box">
                  <div className="flex items-center gap-2 mb-3">
                    <Download size={20} className="matte-gold-text" />
                    <h3 className="admin-card-title">Export Website Backup</h3>
                  </div>
                  <p className="admin-stage-subtitle mb-4">
                    Download all configured titles, posters, links, texts, and settings as a standalone `.json` backup file.
                  </p>
                  <button className="btn-matte-gold full-width" onClick={exportDataJson}>
                    <Download size={16} /> Download Complete Backup (.json)
                  </button>

                  <hr className="admin-divider" />

                  <div className="flex items-center gap-2 mb-3">
                    <Upload size={20} className="matte-gold-text" />
                    <h3 className="admin-card-title">Restore from Backup</h3>
                  </div>
                  <p className="admin-stage-subtitle mb-4">
                    Upload a previously downloaded `.json` backup file to restore all website content immediately.
                  </p>
                  <label className="admin-btn-action full-width flex justify-center cursor-pointer">
                    <Upload size={16} />
                    <span>Select Backup File to Import (.json)</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      style={{ display: 'none' }}
                      onChange={handleFileImport}
                    />
                  </label>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="admin-card-box danger-border">
                  <div className="flex items-center gap-2 mb-3">
                    <RotateCcw size={20} className="text-danger" />
                    <h3 className="admin-card-title text-danger">Factory Reset All Data</h3>
                  </div>
                  <p className="admin-stage-subtitle mb-4">
                    Warning: This action will erase all custom edits and restore the original initial demo data for all banners, movies, shorts, music, and text.
                  </p>
                  <button
                    type="button"
                    className="admin-btn-danger full-width"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset ALL website data to initial defaults? Custom changes will be wiped.')) {
                        resetToDefaults();
                        showNotification('Reset all data to default demo state!');
                      }
                    }}
                  >
                    <RotateCcw size={16} /> Reset Everything to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          UNIVERSAL EDIT / ADD MODAL
      ========================================================================= */}
      {editingItem && (
        <div className="admin-modal-backdrop" onClick={() => setEditingItem(null)}>
          <div className="admin-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingItem.isNew ? 'Create New Item' : 'Edit Item'}
              </h3>
              <button 
                type="button" 
                className="admin-close-mini" 
                onClick={() => setEditingItem(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="admin-modal-body">
              {/* Dynamic form fields depending on item schema */}
              
              {/* If item has title */}
              {'title' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Title</label>
                  <input
                    type="text"
                    className="admin-input-text font-bold"
                    value={editingItem.item.title || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, title: e.target.value }
                    })}
                    required
                  />
                </div>
              )}

              {/* If item has image */}
              {'image' in editingItem.item && (
                <ImageField
                  label="Poster / Thumbnail Artwork"
                  value={editingItem.item.image || ''}
                  onChange={(newUrl) => setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, image: newUrl }
                  })}
                  aspect={editingItem.listKey === 'viralShorts' ? '9/16' : editingItem.listKey === 'studioSongs' ? '1/1' : '16/9'}
                  helperText="Upload custom photo or select from existing posters"
                />
              )}

              {/* If item has genre */}
              {'genre' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Genre</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.genre || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, genre: e.target.value }
                    })}
                  />
                </div>
              )}

              {/* If item has artist (Songs) */}
              {'artist' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Artist / Creator</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.artist || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, artist: e.target.value }
                    })}
                  />
                </div>
              )}

              {/* If item has creator (Shorts) */}
              {'creator' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Creator Handle</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.creator || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, creator: e.target.value }
                    })}
                    placeholder="@Handle"
                  />
                </div>
              )}

              {/* If item has views (Shorts) */}
              {'views' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Views Count</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.views || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, views: e.target.value }
                    })}
                    placeholder="12.4M Views"
                  />
                </div>
              )}

              {/* If item has duration */}
              {'duration' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Duration</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.duration || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, duration: e.target.value }
                    })}
                    placeholder="2h 15m or 0:45s"
                  />
                </div>
              )}

              {/* If item has match percentage */}
              {'match' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Match Score</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.match || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, match: e.target.value }
                    })}
                    placeholder="99% Match"
                  />
                </div>
              )}

              {/* If item has audio format */}
              {'audio' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Audio Quality Specification</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.audio || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, audio: e.target.value }
                    })}
                    placeholder="24-Bit Lossless / Spatial 3D / Dolby Atmos"
                  />
                </div>
              )}

              {/* If item has badge or tag */}
              {'badge' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Badge Tag</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.badge || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, badge: e.target.value }
                    })}
                    placeholder="Trending #1, Exclusive, Blockbuster..."
                  />
                </div>
              )}

              {'tag' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Category Tag</label>
                  <input
                    type="text"
                    className="admin-input-text"
                    value={editingItem.item.tag || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, tag: e.target.value }
                    })}
                    placeholder="Viral Stunt, EDM Live, VFX..."
                  />
                </div>
              )}

              {/* If item has synopsis / desc */}
              {'desc' in editingItem.item && (
                <div className="admin-field-group">
                  <label className="admin-field-label">Description / Synopsis</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={editingItem.item.desc || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, desc: e.target.value }
                    })}
                  />
                </div>
              )}

              {/* If item has FAQ q & a */}
              {'q' in editingItem.item && (
                <>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Question</label>
                    <input
                      type="text"
                      className="admin-input-text font-semibold"
                      value={editingItem.item.q || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, q: e.target.value }
                      })}
                      required
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Answer</label>
                    <textarea
                      rows={4}
                      className="admin-textarea"
                      value={editingItem.item.a || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, a: e.target.value }
                      })}
                      required
                    />
                  </div>
                </>
              )}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn-action"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-matte-gold">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
