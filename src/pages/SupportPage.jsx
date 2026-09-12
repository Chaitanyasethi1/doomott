import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronUp, Mail, Smartphone, ShieldCheck, 
  HelpCircle, MessageSquare, AlertCircle, PlayCircle, CreditCard, 
  Send, CheckCircle, ExternalLink
} from 'lucide-react';
import { APP_CONFIG } from '../config/appLinks';

const FAQ_DATA = [
  {
    category: 'download',
    question: 'How do I download and install the DOOM OTT app?',
    answer: 'You can download the DOOM OTT app directly from the Google Play Store for Android devices or the Apple App Store for iOS devices. On desktop, click "Get App" in the navbar to scan the QR code directly with your smartphone camera.'
  },
  {
    category: 'playback',
    question: 'What video and audio qualities are supported?',
    answer: 'DOOM OTT supports video playback from adaptive 720p HD up to native 4K Ultra HD with HDR10+ and Dolby Vision on supported mobile and smart TV displays. Our music vault streams lossless 24-bit audio with spatial 3D surround sound.'
  },
  {
    category: 'subscription',
    question: 'How do I claim and activate my 3-Month Free VIP Pass?',
    answer: 'Simply enter your mobile number or email in the VIP Pass section on the homepage. You will receive a unique coupon code. When you first log into the DOOM OTT app, enter this code under Profile > VIP Pass to unlock 3 months of ad-free 4K streaming at zero cost.'
  },
  {
    category: 'account',
    question: 'Can I stream on multiple devices with a single account?',
    answer: 'Yes! A standard DOOM OTT VIP account allows concurrent streaming across up to 4 devices simultaneously, including smartphones, tablets, laptops, and Android TVs.'
  },
  {
    category: 'shorts',
    question: 'How can creators publish shorts and songs on DOOM OTT?',
    answer: 'We offer an open Creator Portal where certified filmmakers, musicians, and reel creators can submit content for algorithmic distribution and revenue-share monetization. Contact support@doomott.com with your portfolio to get early creator access.'
  },
  {
    category: 'playback',
    question: 'Does music playback continue when the screen is locked?',
    answer: 'Yes! DOOM OTT features a dedicated background audio player that lets you listen to songs, playlists, and podcast episodes uninterrupted even when your phone screen is switched off or while using other apps.'
  },
  {
    category: 'download',
    question: 'Can I download movies and episodes for offline viewing?',
    answer: 'Yes, VIP pass holders can download titles in high definition to their device storage for offline playback during flights or areas with low mobile connectivity.'
  }
];

export default function SupportPage({ onOpenAppModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Support', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="support-page-container">
      {/* Support Hero Header */}
      <section className="support-hero-section">
        <span className="hero-badge-pill">
          <HelpCircle size={14} className="matte-gold-text" />
          <span>HELP & CUSTOMER SUCCESS</span>
        </span>

        <h1 className="support-main-title">
          How Can We <span className="gradient-matte-gold-text">Help You?</span>
        </h1>
        <p className="support-main-subtext">
          Search frequently asked questions, learn about the app download process, or reach out to our dedicated 24/7 support team.
        </p>

        {/* Live Search Bar */}
        <div className="support-search-wrapper">
          <div className="support-search-input-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="support-search-input"
              placeholder="Search topics (e.g. VIP Pass, 4K Playback, App Store, Login)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Common Issue Quick Cards */}
      <section className="common-issues-section">
        <h2 className="section-title">Common Topics & Quick Fixes</h2>
        <div className="issues-grid">
          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('download'); setOpenFaqIndex(0); }}
          >
            <div className="issue-icon-wrap">
              <Smartphone size={22} className="matte-gold-text" />
            </div>
            <h3>App Download & Setup</h3>
            <p>Step-by-step installation guides for Android APK, Play Store & Apple TestFlight.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('playback'); setOpenFaqIndex(1); }}
          >
            <div className="issue-icon-wrap">
              <PlayCircle size={22} className="matte-gold-text" />
            </div>
            <h3>Playback & Streaming</h3>
            <p>Troubleshooting buffering, 4K HDR display switching, and spatial audio sync.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('subscription'); setOpenFaqIndex(2); }}
          >
            <div className="issue-icon-wrap">
              <CreditCard size={22} className="matte-gold-text" />
            </div>
            <h3>VIP Pass & Rewards</h3>
            <p>Redeeming promo codes, checking trial duration, and account subscription tiers.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('account'); setOpenFaqIndex(3); }}
          >
            <div className="issue-icon-wrap">
              <ShieldCheck size={22} className="matte-gold-text" />
            </div>
            <h3>Account & Devices</h3>
            <p>Managing linked devices, resetting PIN/passwords, and privacy preferences.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <div className="faq-header-row">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-category-pills">
            <button 
              className={`faq-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All FAQs
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'download' ? 'active' : ''}`}
              onClick={() => setActiveCategory('download')}
            >
              Downloads
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'playback' ? 'active' : ''}`}
              onClick={() => setActiveCategory('playback')}
            >
              Streaming
            </button>
            <button 
              className={`faq-pill ${activeCategory === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveCategory('subscription')}
            >
              VIP Pass
            </button>
          </div>
        </div>

        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                >
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? <ChevronUp size={18} className="matte-gold-text" /> : <ChevronDown size={18} />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-drawer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="faq-empty-state">
              <AlertCircle size={32} className="matte-gold-text" />
              <p>No FAQ articles matched your search query "{searchQuery}".</p>
              <button 
                className="btn-outline-gold"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact & Support Inquiry Form */}
      <section className="support-contact-section">
        <div className="contact-card-wrapper">
          <div className="contact-info-col">
            <span className="section-pill-tag">DIRECT INQUIRIES</span>
            <h3 className="contact-heading">Can't Find What You Need?</h3>
            <p className="contact-text">
              Our support engineers and developer team are available 24/7 to resolve technical issues or assist with creator onboarding.
            </p>

            <div className="contact-methods-list">
              <div className="contact-method-item">
                <Mail size={18} className="matte-gold-text" />
                <div>
                  <strong>Official Email Support</strong>
                  <p>{APP_CONFIG.SUPPORT_EMAIL}</p>
                </div>
              </div>

              <div className="contact-method-item">
                <MessageSquare size={18} className="matte-gold-text" />
                <div>
                  <strong>Community Discord & Telegram</strong>
                  <p>Join 25,000+ community members for instant updates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Support">General Support</option>
                    <option value="VIP Pass / Coupon Issue">VIP Pass / Coupon Issue</option>
                    <option value="App Download & Playback">App Download & Playback</option>
                    <option value="Creator Program">Creator Program / Content Submission</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your question or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-matte-gold full-width">
                  <Send size={16} />
                  <span>Submit Support Ticket</span>
                </button>
              </form>
            ) : (
              <motion.div
                className="form-success-box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={36} className="matte-gold-text" />
                <h3>Ticket Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. A support specialist has been assigned to ticket <strong>#DOOM-{Math.floor(1000 + Math.random() * 9000)}</strong> and will respond to <strong>{formData.email}</strong> shortly.
                </p>
                <button 
                  className="btn-outline-gold"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Support', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
