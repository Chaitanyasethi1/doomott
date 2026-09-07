import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  Film, Music, Video, Tv, Play, Sparkles, Smartphone, Download, 
  Flame, Star, ShieldCheck, Zap, Headphones, CheckCircle, X, Volume2, VolumeX,
  Radio, ArrowRight, Share2
} from 'lucide-react';
import './App.css';

/* =========================================================================
   3D CANVAS COMPONENTS (Black & Electric Yellow Cyber World)
========================================================================= */

function GoldenParticleField({ count = 1000 }) {
  const points = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color('#FFE600');
    const color2 = new THREE.Color('#FFB800');
    const color3 = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const mixed = Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DoomCyberCore() {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Mouse parallax tilt
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.25;
      outerRingRef.current.rotation.x = targetY + t * 0.1;
      outerRingRef.current.rotation.y = targetX;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.35;
      innerRingRef.current.rotation.y = targetX + t * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.4;
      coreRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Outer Golden Gyro Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3.8, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#FFE600"
          emissive="#FFB800"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Second Golden Torus */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.8, 0.08, 16, 80]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.95}
        />
      </mesh>

      {/* Central Holographic Icosahedron */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#141410"
            roughness={0.1}
            metalness={0.9}
            wireframe
            wireframeLinewidth={2}
            emissive="#FFE600"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingCyberMediaBlocks() {
  const group = useRef();

  const blocks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        -4 - Math.random() * 8,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.35 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.8,
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={group}>
      {blocks.map((item, index) => (
        <Float key={index} speed={item.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh position={item.position} rotation={item.rotation} scale={item.scale}>
            <boxGeometry args={[1.2, 1.8, 0.15]} />
            <meshStandardMaterial
              color="#0d0d0a"
              emissive={index % 2 === 0 ? '#FFE600' : '#FF9900'}
              emissiveIntensity={0.25}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.7} color="#fffbee" />
      <directionalLight position={[10, 15, 10]} intensity={2.5} color="#FFE600" />
      <pointLight position={[-10, -5, -5]} intensity={1.8} color="#FF8800" />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#FFF580" />

      <GoldenParticleField count={1200} />
      <DoomCyberCore />
      <FloatingCyberMediaBlocks />
    </>
  );
}

/* =========================================================================
   MEDIA SHOWCASE DATA (Movies, Shorts, Songs, Shows)
========================================================================= */

const SHOWCASE_DATA = [
  // MOVIES
  {
    category: 'movies',
    title: 'Kalki: The Dark Eclipse',
    type: 'Movie',
    genre: 'Sci-Fi Action Thriller',
    duration: '2h 45m',
    rating: '9.4',
    badge: 'Trending #1',
    quality: '4K IMAX',
    image: '/posters/kalki.jpg',
    desc: 'An adrenaline-fueled cyber rebellion where ancient prophecies meet futuristic orbital warfare.',
    gradient: 'linear-gradient(135deg, #FFB800 0%, #3a2e00 50%, #111111 100%)'
  },
  {
    category: 'movies',
    title: 'Shadow Samurai 2099',
    type: 'Movie',
    genre: 'Neo-Tokyo Cyberpunk',
    duration: '2h 15m',
    rating: '9.1',
    badge: 'Exclusive',
    quality: 'Dolby Vision',
    image: '/posters/samurai.jpg',
    desc: 'A rogue cyber-blade hunts corporate oligarchs across the rain-soaked skies of Neo-Mumbai.',
    gradient: 'linear-gradient(135deg, #FFE600 0%, #5a4b00 50%, #0a0a0a 100%)'
  },
  {
    category: 'movies',
    title: 'Velocity: Night Fury',
    type: 'Movie',
    genre: 'High Octane Race Action',
    duration: '1h 58m',
    rating: '8.9',
    badge: 'Original',
    quality: '4K Ultra',
    image: '/posters/velocity.jpg',
    desc: 'Supercars customized with sonic thrusters battle high in the neon city streets for a $10B vault.',
    gradient: 'linear-gradient(135deg, #FF9900 0%, #472600 50%, #0d0d0d 100%)'
  },

  // SHORTS
  {
    category: 'shorts',
    title: 'Hypersonic Drift (Reel #08)',
    type: 'Short',
    genre: 'Urban Stunt & Drift',
    duration: '0:45s',
    rating: '9.8',
    badge: 'Viral Short',
    quality: '60 FPS',
    image: '/posters/drift.jpg',
    desc: 'Breathtaking POV drone shots through midnight city highway intersections with burning tire smoke.',
    gradient: 'linear-gradient(135deg, #FFF017 0%, #685b00 50%, #0f0f0f 100%)'
  },
  {
    category: 'shorts',
    title: 'Bass Drop Studio Cut',
    type: 'Short',
    genre: 'EDM Beat Drop Moment',
    duration: '0:30s',
    rating: '9.6',
    badge: '9.2M Views',
    quality: 'Spatial Hi-Fi',
    image: '/posters/concert.jpg',
    desc: 'Live DJ crowd explosion at Sunburn Cyber Arena with insane golden laser synchronization.',
    gradient: 'linear-gradient(135deg, #FFC700 0%, #4c3c00 50%, #121212 100%)'
  },
  {
    category: 'shorts',
    title: 'Starfall VFX Breakdown',
    type: 'Short',
    genre: '3D CGI Reel',
    duration: '0:50s',
    rating: '9.5',
    badge: 'Trending',
    quality: '4K HDR',
    image: '/posters/starship.jpg',
    desc: 'Watch a golden solar nebula rendered with 100 million particles transform before your eyes.',
    gradient: 'linear-gradient(135deg, #E5A900 0%, #3b2c00 50%, #090909 100%)'
  },

  // SONGS
  {
    category: 'songs',
    title: 'Doom Anthem: Golden Fury',
    type: 'Song',
    genre: 'Cyber Trap & Bass',
    duration: '3:42m',
    rating: '9.9',
    badge: 'Official Theme',
    quality: 'Dolby Atmos',
    image: '/posters/music.jpg',
    desc: 'Heavy 808s, soaring synth arpeggios, and raw vocal anthems that shake your subwoofers.',
    gradient: 'linear-gradient(135deg, #FFE600 0%, #7d6e00 50%, #171714 100%)'
  },
  {
    category: 'songs',
    title: 'Midnight Highway Melody',
    type: 'Song',
    genre: 'Lo-Fi Night Drive',
    duration: '2:58m',
    rating: '9.3',
    badge: 'Top Chart',
    quality: 'Lossless Audio',
    image: '/posters/highway.jpg',
    desc: 'Mellow nocturnal rhythms blending warm acoustic tones with hypnotic midnight rain beats.',
    gradient: 'linear-gradient(135deg, #FFD000 0%, #524300 50%, #10100e 100%)'
  },
  {
    category: 'songs',
    title: 'Electrified Dhol Pulse',
    type: 'Song',
    genre: 'Club Dance Fusion',
    duration: '3:15m',
    rating: '9.7',
    badge: 'Viral Audio',
    quality: 'Studio Master',
    image: '/posters/dhol.jpg',
    desc: 'High-energy live festive beats remixed with hardstyle synthesizers and explosive golden pyro.',
    gradient: 'linear-gradient(135deg, #FFB800 0%, #614600 50%, #0a0a08 100%)'
  },

  // SHOWS
  {
    category: 'shows',
    title: 'The Cartel Syndicate S1',
    type: 'Show',
    genre: 'Underworld Crime Drama',
    duration: '8 Episodes',
    rating: '9.5',
    badge: 'Binge-Worthy',
    quality: '4K HDR10+',
    image: '/posters/syndicate.jpg',
    desc: 'An underground empire ruled by black market tech and ruthless corporate boardroom barons.',
    gradient: 'linear-gradient(135deg, #FFE600 0%, #3f3600 50%, #0f0e08 100%)'
  },
  {
    category: 'shows',
    title: 'Starfall: The Golden Nebula',
    type: 'Show',
    genre: 'Deep Space Odyssey',
    duration: '10 Episodes',
    rating: '9.2',
    badge: 'Original Series',
    quality: 'Dolby Vision',
    image: '/posters/starship.jpg',
    desc: 'A colossal explorer cruiser navigates uncharted golden solar flares at the universe’s edge.',
    gradient: 'linear-gradient(135deg, #FFB800 0%, #4d3a00 50%, #13120d 100%)'
  },
  {
    category: 'shows',
    title: 'Beat Masters Arena',
    type: 'Show',
    genre: 'Music Reality Show',
    duration: '6 Episodes',
    rating: '9.0',
    badge: 'Trending',
    quality: 'Spatial Sound',
    image: '/posters/concert.jpg',
    desc: 'India’s top music producers battle live in 60-minute beat making challenges under arena lasers.',
    gradient: 'linear-gradient(135deg, #FFCF00 0%, #4a3e00 50%, #0c0b08 100%)'
  }
];

/* =========================================================================
   MAIN APP COMPONENT
========================================================================= */

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [vipPassClaimed, setVipPassClaimed] = useState(false);
  const [vipCode, setVipCode] = useState('');

  const filteredMedia = useMemo(() => {
    if (activeCategory === 'all') return SHOWCASE_DATA;
    return SHOWCASE_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleClaimVip = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    const randomCode = 'DOOM-' + Math.floor(100000 + Math.random() * 900000);
    setVipCode(randomCode);
    setVipPassClaimed(true);
  };

  return (
    <div className="app-wrapper">
      {/* 3D Canvas fixed in background */}
      <div className="canvas-3d-bg">
        <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Cyber ambient overlays */}
      <div className="ambient-glow-top" />
      <div className="cyber-grid-overlay" />

      {/* Sticky Navbar */}
      <header className="navbar">
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.jpg" alt="DOOM OTT Logo" className="navbar-logo-img" />
        </div>

        <nav>
          <ul className="nav-links">
            <li 
              className={`nav-link ${activeCategory === 'movies' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('movies'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <Film size={17} /> Movies
            </li>
            <li 
              className={`nav-link ${activeCategory === 'shorts' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('shorts'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <Video size={17} /> Shorts
            </li>
            <li 
              className={`nav-link ${activeCategory === 'songs' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('songs'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <Music size={17} /> Songs
            </li>
            <li 
              className={`nav-link ${activeCategory === 'shows' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('shows'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <Tv size={17} /> Shows
            </li>
            <li 
              className="nav-link"
              onClick={() => document.getElementById('app-showcase')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Smartphone size={17} /> App Coming Soon
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {/* Sound Visualizer Pill */}
          <div 
            className="audio-equalizer-pill" 
            title="Toggle Doom Spatial Sound Engine"
            onClick={() => setIsAudioActive(!isAudioActive)}
          >
            {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{isAudioActive ? '3D AUDIO' : 'MUTED'}</span>
            {isAudioActive && (
              <div className="eq-bars">
                <div className="eq-bar" />
                <div className="eq-bar" />
                <div className="eq-bar" />
                <div className="eq-bar" />
              </div>
            )}
          </div>

          <button 
            className="btn-yellow-glow"
            onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Sparkles size={16} /> Get VIP Pass
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="page-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <motion.div 
            className="hero-pill-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="pulse-dot" />
            <span>⚡ THE ULTIMATE 3D OTT ECOSYSTEM • APP LAUNCHING SOON ⚡</span>
          </motion.div>

          {/* Official Animated Brand Logo */}
          <motion.div 
            className="hero-official-logo-wrap"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/logo.jpg" alt="DOOM OTT Official Logo" className="hero-logo-img" />
          </motion.div>

          <motion.h1 
            className="hero-main-title"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.2rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            STREAM WITHOUT LIMITS
          </motion.h1>

          <motion.p 
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive into explosive <strong>4K Blockbuster Movies</strong>, binge-worthy <strong>Web Series</strong>, viral instant <strong>Shorts</strong>, and high-fidelity studio <strong>Songs</strong> — all powered by our proprietary 3D spatial sound engine.
          </motion.p>

          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <button 
              className="btn-yellow-glow" 
              style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}
              onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Download size={20} /> Pre-Register App (3 Months Free)
            </button>

            <button 
              className="btn-outline-yellow"
              style={{ fontSize: '1.05rem', padding: '0.95rem 1.8rem' }}
              onClick={() => setShowreelOpen(true)}
            >
              <Play size={18} fill="#FFE600" /> Watch 3D Showreel
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            className="hero-stats-bar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="stat-item">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Lossless Songs</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Movies & Shows</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">50,000+</span>
              <span className="stat-label">Instant Shorts</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">150K+</span>
              <span className="stat-label">App Pre-Registers</span>
            </div>
          </motion.div>
        </section>

        {/* SHOWCASE SECTION */}
        <section id="showcase" className="showcase-section">
          <div className="section-header-wrap">
            <span className="section-badge">✨ UNMATCHED ENTERTAINMENT VAULT</span>
            <h2 className="section-title">
              Songs, Shorts, Movies & Shows
            </h2>
            <p className="section-desc">
              Curated for creators, audiophiles, and cinema lovers. Browse what awaits you inside the Doom OTT ecosystem.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="category-tabs">
            <button 
              className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <Sparkles size={16} /> All Titles
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveCategory('movies')}
            >
              <Film size={16} /> Movies (4K)
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'shorts' ? 'active' : ''}`}
              onClick={() => setActiveCategory('shorts')}
            >
              <Video size={16} /> Viral Shorts
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'songs' ? 'active' : ''}`}
              onClick={() => setActiveCategory('songs')}
            >
              <Music size={16} /> Studio Songs
            </button>
            <button 
              className={`tab-btn ${activeCategory === 'shows' ? 'active' : ''}`}
              onClick={() => setActiveCategory('shows')}
            >
              <Tv size={16} /> Web Series
            </button>
          </div>

          {/* Media Cards Grid */}
          <motion.div 
            className="media-grid"
            layout
          >
            <AnimatePresence>
              {filteredMedia.map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="media-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <div className="media-poster-box">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="media-poster-img"
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="poster-bg-gradient"
                        style={{ background: item.gradient }}
                      />
                    )}
                    <div className="poster-overlay" />

                    <div className="card-top-badges">
                      <span className="tag-badge">{item.badge}</span>
                      <span className="quality-badge">{item.quality}</span>
                    </div>

                    <div className="play-hover-btn">
                      <Play size={24} fill="#000" />
                    </div>
                  </div>

                  <div className="media-info-body">
                    <div className="media-category-row">
                      <span>{item.genre}</span>
                      <span>{item.duration}</span>
                    </div>
                    <h3 className="media-title">{item.title}</h3>
                    <p className="media-desc">{item.desc}</p>
                    
                    <div className="media-footer-meta">
                      <span className="meta-rating">
                        <Star size={14} fill="#FFE600" /> {item.rating} / 10
                      </span>
                      <span>Dolby Atmos Ready</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 3D APP SHOWCASE & TEASER */}
        <section id="app-showcase" className="app-showcase-section">
          <div className="app-showcase-container">
            <div className="app-details-col">
              <span className="section-badge">🚀 MOBILE REVOLUTION</span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
                Doom OTT App Is Dropping Soon.
              </h2>
              <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Experience lightning-fast streaming in the palm of your hand. Zero lag, dynamic offline caching, instant swipe-up shorts feed, and a built-in Hi-Fi music player that keeps playing with your screen off.
              </p>

              <div className="feature-pill-list">
                <div className="feature-pill-item">
                  <div className="feature-icon-box">
                    <Zap size={22} />
                  </div>
                  <div>
                    <h4 className="feature-item-title">Zero-Buffer Ultra HD</h4>
                    <p className="feature-item-desc">Next-gen adaptive bitrate streaming optimized for Indian 4G/5G mobile networks.</p>
                  </div>
                </div>

                <div className="feature-pill-item">
                  <div className="feature-icon-box">
                    <Video size={22} />
                  </div>
                  <div>
                    <h4 className="feature-item-title">Addictive Shorts Feed</h4>
                    <p className="feature-item-desc">Seamless vertical swipe for comedy, trailer teasers, music clips, and viral moments.</p>
                  </div>
                </div>

                <div className="feature-pill-item">
                  <div className="feature-icon-box">
                    <Headphones size={22} />
                  </div>
                  <div>
                    <h4 className="feature-item-title">Background Songs & Offline Vault</h4>
                    <p className="feature-item-desc">Listen to lossless music tracks in the background without interruptions or ads.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button 
                  className="btn-yellow-glow"
                  onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Download size={18} /> Pre-Register for Android & iOS
                </button>
              </div>
            </div>

            {/* 3D Tilted Cyber Phone */}
            <div className="phone-mockup-wrapper">
              <div className="cyber-phone">
                <div className="phone-dynamic-island" />
                <div className="phone-screen-content">
                  <div className="phone-nav-bar">
                    <img src="/logo.jpg" alt="DOOM OTT" style={{ height: '22px', objectFit: 'contain' }} />
                    <Radio size={16} color="#FFE600" />
                  </div>

                  {/* Featured Phone Card */}
                  <div 
                    className="phone-hero-card"
                    style={{
                      backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url(/posters/kalki.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center 15%'
                    }}
                  >
                    <span className="phone-hero-badge">PREMIERE</span>
                    <span className="phone-hero-title">Kalki: The Dark Eclipse</span>
                    <span style={{ fontSize: '0.75rem', color: '#ffec80' }}>Streaming in 4K HDR</span>
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#aaa', marginBottom: '0.5rem' }}>
                    TRENDING SHORTS
                  </span>

                  {/* Mini Shorts Reel */}
                  <div className="phone-shorts-strip">
                    <div 
                      className="phone-short-box"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url(/posters/drift.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <Play size={14} fill="#FFE600" color="#FFE600" />
                      <span>Speed Drift</span>
                    </div>
                    <div 
                      className="phone-short-box"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url(/posters/concert.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <Play size={14} fill="#FFE600" color="#FFE600" />
                      <span>Beat Drop</span>
                    </div>
                    <div 
                      className="phone-short-box"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url(/posters/starship.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <Play size={14} fill="#FFE600" color="#FFE600" />
                      <span>CGI Reel</span>
                    </div>
                  </div>

                  {/* Mini Music Bar */}
                  <div className="phone-music-player-bar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <img 
                        src="/posters/music.jpg" 
                        alt="Music" 
                        style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>Doom Anthem</span>
                        <span style={{ fontSize: '0.65rem', color: '#888' }}>Spatial 3D Audio</span>
                      </div>
                    </div>
                    <div className="eq-bars">
                      <div className="eq-bar" />
                      <div className="eq-bar" />
                      <div className="eq-bar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRE-REGISTRATION / VIP PASS BOX */}
        <section id="vip-pass" style={{ padding: '0 5%' }}>
          <div className="vip-pass-container">
            <div className="vip-badge-ribbon">
              <Sparkles size={16} /> VIP PRE-LAUNCH EXCLUSIVE
            </div>

            <h2 className="section-title">
              Claim Your 3 Months Free VIP Pass
            </h2>

            <p style={{ color: '#ccc', maxWidth: '620px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Join over 150,000+ early adopters. Enter your mobile or email to unlock the VIP tier with zero ads, 4K streaming, and early access to the upcoming Doom OTT app.
            </p>

            {!vipPassClaimed ? (
              <form onSubmit={handleClaimVip} className="vip-input-group">
                <input 
                  type="text" 
                  className="vip-input"
                  placeholder="Enter your phone number or email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit" className="btn-yellow-glow" style={{ borderRadius: '10px' }}>
                  CLAIM VIP PASS <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  marginTop: '2rem',
                  padding: '1.8rem',
                  background: 'rgba(255, 230, 0, 0.12)',
                  border: '2px solid var(--primary-yellow)',
                  borderRadius: '18px',
                  display: 'inline-block'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={26} color="#FFE600" />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFE600' }}>VIP PASS ACTIVATED!</h3>
                </div>
                <p style={{ color: '#eee', marginBottom: '0.8rem' }}>
                  Your VIP Pass code has been generated. You will receive an SMS/Email with the direct download link on launch day.
                </p>
                <div style={{
                  background: '#000',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px dashed #FFE600',
                  display: 'inline-block',
                  fontFamily: 'monospace',
                  fontSize: '1.3rem',
                  letterSpacing: '2px',
                  color: '#FFE600',
                  fontWeight: 900
                }}>
                  {vipCode}
                </div>
              </motion.div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#aaa', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="#FFE600" /> 100% Free • No Credit Card Required
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#aaa', fontSize: '0.85rem' }}>
                <Flame size={16} color="#FFE600" /> Priority Day-1 App Server Access
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* 3D SHOWREEL MODAL */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowreelOpen(false)}
          >
            <motion.div 
              className="modal-box"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setShowreelOpen(false)}>
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span className="brand-badge">3D SHOWREEL</span>
                <span style={{ color: '#FFE600', fontWeight: 800 }}>DOOM OTT SIZZLE TEASER</span>
              </div>

              {/* Simulated 3D Video Player */}
              <div style={{
                position: 'relative',
                height: '380px',
                borderRadius: '16px',
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%), url(/posters/samurai.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                border: '1px solid rgba(255, 230, 0, 0.4)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(255, 230, 0, 0.2) 0%, transparent 60%)',
                  pointerEvents: 'none'
                }} />

                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--primary-yellow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 35px rgba(255, 230, 0, 0.8)',
                    cursor: 'pointer',
                    marginBottom: '1.5rem',
                    color: '#000'
                  }}
                >
                  <Play size={38} fill="#000" style={{ marginLeft: '4px' }} />
                </motion.div>

                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#fff' }}>
                  THE FUTURE OF ENTERTAINMENT
                </h3>
                <p style={{ color: '#bbb', maxWidth: '480px', fontSize: '0.95rem' }}>
                  4K Blockbuster Movies • Viral Fast Shorts • Dolby Atmos Songs • Next-Gen Web Shows
                </p>
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 230, 0, 0.3)'
                }}>
                  <div className="eq-bars">
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#FFE600', fontWeight: 800 }}>
                    SPATIAL 3D SOUNDTRACK ACTIVE
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>
                  Mobile App Coming Soon on Google Play & App Store
                </span>
                <button 
                  className="btn-yellow-glow" 
                  onClick={() => {
                    setShowreelOpen(false);
                    document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get VIP Pass
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="footer-wrap">
        <div className="footer-inner">
          <div>
            <div className="brand-logo">
              <img src="/logo.jpg" alt="DOOM OTT" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              Doom OTT is the next-generation entertainment hub delivering blockbusters, short-form viral reels, chart-topping original music, and gripping web shows in an immersive 3D realm.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">CONTENT VAULT</h4>
            <ul className="footer-links-list">
              <li onClick={() => { setActiveCategory('movies'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>4K Movies & Films</li>
              <li onClick={() => { setActiveCategory('shorts'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>Viral Shorts & Reels</li>
              <li onClick={() => { setActiveCategory('songs'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>Lossless Studio Songs</li>
              <li onClick={() => { setActiveCategory('shows'); document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>Exclusive Web Series</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">MOBILE APP</h4>
            <ul className="footer-links-list">
              <li onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}>Pre-Register Android (APK)</li>
              <li onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}>Pre-Register iOS TestFlight</li>
              <li onClick={() => document.getElementById('vip-pass')?.scrollIntoView({ behavior: 'smooth' })}>VIP Pass Claim</li>
              <li>Device Compatibility Check</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">COMMUNITY & LEGAL</h4>
            <ul className="footer-links-list">
              <li>Instagram (@doomott)</li>
              <li>YouTube Originals</li>
              <li>Privacy Policy</li>
              <li>Terms of Streaming</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} DOOM OTT Inc. All rights reserved. Made for the next generation of cinema.</span>
          <span style={{ color: '#FFE600', fontWeight: 700 }}>⚡ 3D ENGINE • SPATIAL AUDIO • BLACK & YELLOW EDITION</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
