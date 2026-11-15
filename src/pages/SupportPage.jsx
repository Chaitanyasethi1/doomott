import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronUp, Mail, Smartphone, ShieldCheck, 
  HelpCircle, MessageSquare, AlertCircle, PlayCircle, CreditCard, 
  Send, CheckCircle, ExternalLink, Phone
} from 'lucide-react';
import { useWebsiteData } from '../context/WebsiteDataContext';

export default function SupportPage({ onOpenAppModal }) {
  const { data } = useWebsiteData();
  const { supportPage = {}, appLinks = {} } = data || {};
  const faqsList = supportPage.faqs || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Support', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    return faqsList.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        (item.question && item.question.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.answer && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory, faqsList]);

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
          <span>{supportPage.heroBadge || 'HELP & CUSTOMER SUCCESS'}</span>
        </span>

        <h1 className="support-main-title">
          {supportPage.heroTitle ? (
            supportPage.heroTitle
          ) : (
            <>How Can We <span className="gradient-matte-gold-text">Help You?</span></>
          )}
        </h1>
        <p className="support-main-subtext">
          {supportPage.heroSubtitle || 'Search frequently asked questions, learn about the app download process, or reach out to our dedicated 24/7 support team.'}
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
            onClick={() => { setActiveCategory('subscription'); }}
          >
            <div className="issue-icon-wrap">
              <CreditCard size={22} className="matte-gold-text" />
            </div>
            <h3>VIP Pass & Trials</h3>
            <p>How to activate your 3-month free pass and redeem codes inside the mobile app.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('download'); }}
          >
            <div className="issue-icon-wrap">
              <Smartphone size={22} className="matte-gold-text" />
            </div>
            <h3>Download & Install</h3>
            <p>Direct download links for Google Play Store, iOS App Store, and Android APK.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('playback'); }}
          >
            <div className="issue-icon-wrap">
              <PlayCircle size={22} className="matte-gold-text" />
            </div>
            <h3>4K & Audio Streaming</h3>
            <p>Troubleshoot video stutter, HDR playback issues, and spatial 3D audio features.</p>
          </div>

          <div 
            className="issue-card"
            onClick={() => { setActiveCategory('account'); }}
          >
            <div className="issue-icon-wrap">
              <ShieldCheck size={22} className="matte-gold-text" />
            </div>
            <h3>Account & Devices</h3>
            <p>Manage simultaneous device streams, change profile pins, and update email.</p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs-main-section">
        <div className="faqs-header-row">
          <div>
            <span className="section-pill-tag">KNOWLEDGE BASE</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          {/* Filter Tabs */}
          <div className="faq-category-pills">
            {['all', 'download', 'playback', 'subscription', 'account', 'shorts'].map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrap">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.id || index} className="faq-item-card">
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={20} className="matte-gold-text" /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer-pane"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="no-faqs-found">
              <AlertCircle size={32} className="matte-gold-text" />
              <p>No matching questions found for "{searchQuery}".</p>
              <button 
                className="btn-outline-gold"
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact & Support Ticket Section */}
      <section className="contact-support-section">
        <div className="contact-support-container">
          {/* Left Info Column */}
          <div className="contact-info-col">
            <span className="section-pill-tag">24/7 HELPDESK</span>
            <h2 className="section-title">Still Need Assistance?</h2>
            <p className="contact-lead-text">
              Our technical engineering and customer support teams are available 24 hours a day, 7 days a week.
            </p>

            <div className="contact-methods-list">
              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <Mail size={20} className="matte-gold-text" />
                </div>
                <div>
                  <h4>Direct Email Support</h4>
                  <p>Average response within 15 minutes</p>
                  <a href={`mailto:${appLinks.supportEmail || 'support@doomott.com'}`} className="matte-gold-text font-bold">
                    {appLinks.supportEmail || 'support@doomott.com'}
                  </a>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <Phone size={20} className="matte-gold-text" />
                </div>
                <div>
                  <h4>Helpline Phone</h4>
                  <p>Toll-free customer hotline</p>
                  <span className="text-white font-bold">{appLinks.supportPhone || '+91 (800) 420-DOOM'}</span>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <Smartphone size={20} className="matte-gold-text" />
                </div>
                <div>
                  <h4>In-App Priority Chat</h4>
                  <p>VIP Pass subscribers get instant live chat directly inside the Android / iOS mobile app.</p>
                  <button 
                    onClick={onOpenAppModal}
                    className="link-btn-gold"
                  >
                    Open Download Link <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Ticket Form Column */}
          <div className="contact-form-col">
            <h3 className="form-title">Send a Direct Message</h3>
            
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="support-ticket-form">
                <div className="form-group">
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
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
