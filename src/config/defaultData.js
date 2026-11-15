export const BUILT_IN_POSTERS = [
  { label: 'Kalki: The Dark Eclipse', url: '/posters/kalki.jpg' },
  { label: 'Shadow Samurai 2099', url: '/posters/samurai.jpg' },
  { label: 'Velocity: Night Fury', url: '/posters/velocity.jpg' },
  { label: 'The Cartel Syndicate', url: '/posters/syndicate.jpg' },
  { label: 'Starfall: Golden Nebula', url: '/posters/starship.jpg' },
  { label: 'Hypersonic Drift (Shorts)', url: '/posters/drift.jpg' },
  { label: 'Sunburn Arena Beat (Shorts)', url: '/posters/concert.jpg' },
  { label: 'Midnight Highway Melody', url: '/posters/highway.jpg' },
  { label: 'Electrified Dhol Pulse', url: '/posters/dhol.jpg' },
  { label: 'Doom Anthem Lab (Music)', url: '/posters/music.jpg' },
  { label: 'DOOM Official Logo (Dark)', url: '/logo.png' },
];

export const DEFAULT_WEBSITE_DATA = {
  // Global & Branding
  branding: {
    siteName: 'DOOM OTT',
    siteTagline: 'Unified 4K Cinema, Viral Shorts & Lossless Studio Audio',
    logoUrl: '', // empty means use classic SVG BrandLogo
    footerDesc: 'DOOM OTT is the unified entertainment platform fusing viral instant shorts, 4K blockbuster cinema, studio-grade lossless songs, and captivating web series with spatial 3D audio.',
    developerCredit: 'Developed By ABS (Aggarwal Business Solutions)',
    developerUrl: '',
    copyrightText: 'DOOM OTT Inc. All rights reserved.',
  },

  // App Links & Socials
  appLinks: {
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.doomott.app',
    appStoreUrl: 'https://apps.apple.com/app/doom-ott/id6400000000',
    deepLink: 'doomott://open',
    fallbackWebUrl: 'https://doomott.vercel.app',
    supportEmail: 'support@doomott.com',
    supportPhone: '+91 (800) 420-DOOM',
    instagramUrl: 'https://instagram.com/doomott',
    youtubeUrl: 'https://youtube.com/@doomott',
    twitterUrl: 'https://x.com/doomott',
  },

  // Hero Billboard (HomePage)
  heroBillboard: {
    badge: '#1 IN MOVIES TODAY',
    title: 'KALKI: THE DARK ECLIPSE',
    matchScore: '99% Match',
    ageRating: 'U/A 16+',
    duration: '2h 45m',
    quality1: '4K Ultra HD',
    quality2: 'Dolby Atmos',
    synopsis: 'In a dystopian orbital war where ancient prophecies meet futuristic cyber weapons, a solitary rebel warrior unlocks the sacred dark eclipse engine to battle corporate warlords.',
    backdropImage: '/posters/kalki.jpg',
    primaryBtnText: 'Watch in App',
    secondaryBtnText: '3D Teaser',
  },

  // Top 10 Trending Titles
  top10Titles: [
    {
      id: 'top-1',
      rank: 1,
      title: 'Kalki: The Dark Eclipse',
      genre: 'Sci-Fi Action Thriller',
      match: '99% Match',
      rating: 'U/A 16+',
      duration: '2h 45m',
      quality: '4K Ultra HD',
      image: '/posters/kalki.jpg',
      badge: 'Trending #1',
      desc: 'Ancient prophecies collide with futuristic orbital warfare in an adrenaline-fueled cyber rebellion.'
    },
    {
      id: 'top-2',
      rank: 2,
      title: 'Shadow Samurai 2099',
      genre: 'Neo-Tokyo Cyberpunk',
      match: '97% Match',
      rating: 'A 18+',
      duration: '2h 15m',
      quality: 'Dolby Vision',
      image: '/posters/samurai.jpg',
      badge: 'Exclusive',
      desc: 'A rogue cyber-blade hunts corporate oligarchs across the rain-soaked skies of Neo-Mumbai.'
    },
    {
      id: 'top-3',
      rank: 3,
      title: 'Velocity: Night Fury',
      genre: 'High Octane Race Action',
      match: '95% Match',
      rating: 'U/A 13+',
      duration: '1h 58m',
      quality: '4K HDR',
      image: '/posters/velocity.jpg',
      badge: 'Blockbuster',
      desc: 'Supercars customized with sonic thrusters battle high in neon city streets for a $10B vault.'
    },
    {
      id: 'top-4',
      rank: 4,
      title: 'The Cartel Syndicate',
      genre: 'Underworld Crime Drama',
      match: '94% Match',
      rating: 'A 18+',
      duration: '8 Episodes',
      quality: '4K HDR10+',
      image: '/posters/syndicate.jpg',
      badge: 'Binge-Worthy',
      desc: 'An underground empire ruled by black market technology and ruthless boardroom barons.'
    },
    {
      id: 'top-5',
      rank: 5,
      title: 'Starfall: Golden Nebula',
      genre: 'Deep Space Odyssey',
      match: '93% Match',
      rating: 'U/A 13+',
      duration: '10 Episodes',
      quality: 'Dolby Atmos',
      image: '/posters/starship.jpg',
      badge: 'Original Series',
      desc: 'A colossal explorer cruiser navigates uncharted golden solar flares at the edge of known space.'
    }
  ],

  // Viral Instant Shorts & Reels
  viralShorts: [
    {
      id: 'short-1',
      title: 'Hypersonic Drift Reel',
      views: '12.4M Views',
      duration: '0:45s',
      tag: 'Viral Stunt',
      image: '/posters/drift.jpg',
      creator: '@SpeedDemon'
    },
    {
      id: 'short-2',
      title: 'Sunburn Arena Beat Drop',
      views: '9.8M Views',
      duration: '0:30s',
      tag: 'EDM Live',
      image: '/posters/concert.jpg',
      creator: '@DJNova'
    },
    {
      id: 'short-3',
      title: 'Hyper-Realistic CGI Breakdown',
      views: '8.2M Views',
      duration: '0:50s',
      tag: 'VFX Reel',
      image: '/posters/starship.jpg',
      creator: '@VFXMaster'
    },
    {
      id: 'short-4',
      title: 'Midnight Neo-Tokyo Stunt',
      views: '7.5M Views',
      duration: '0:35s',
      tag: 'Cyber Action',
      image: '/posters/samurai.jpg',
      creator: '@ShadowBlade'
    }
  ],

  // Blockbuster 4K Movies & Shows
  blockbusterMovies: [
    {
      id: 'mov-1',
      title: 'Starfall: Golden Nebula',
      genre: 'Deep Space Odyssey',
      match: '93% Match',
      duration: '10 Episodes',
      quality: 'Dolby Atmos',
      image: '/posters/starship.jpg',
      badge: 'Original Series'
    },
    {
      id: 'mov-2',
      title: 'The Cartel Syndicate',
      genre: 'Underworld Crime Drama',
      match: '94% Match',
      duration: '8 Episodes',
      quality: '4K HDR10+',
      image: '/posters/syndicate.jpg',
      badge: 'Binge-Worthy'
    },
    {
      id: 'mov-3',
      title: 'Velocity: Night Fury',
      genre: 'High Octane Race Action',
      match: '95% Match',
      duration: '1h 58m',
      quality: '4K HDR',
      image: '/posters/velocity.jpg',
      badge: 'Blockbuster'
    },
    {
      id: 'mov-4',
      title: 'Shadow Samurai 2099',
      genre: 'Neo-Tokyo Cyberpunk',
      match: '97% Match',
      duration: '2h 15m',
      quality: 'Dolby Vision',
      image: '/posters/samurai.jpg',
      badge: 'Exclusive'
    },
    {
      id: 'mov-5',
      title: 'Kalki: The Dark Eclipse',
      genre: 'Sci-Fi Action Thriller',
      match: '99% Match',
      duration: '2h 45m',
      quality: '4K Ultra HD',
      image: '/posters/kalki.jpg',
      badge: 'Trending #1'
    }
  ],

  // Lossless Studio Songs
  studioSongs: [
    {
      id: 'song-1',
      title: 'Doom Anthem: Golden Fury',
      artist: 'Original Sound Lab',
      duration: '3:42m',
      audio: '24-Bit Lossless',
      badge: 'Official Theme',
      image: '/posters/music.jpg'
    },
    {
      id: 'song-2',
      title: 'Midnight Highway Melody',
      artist: 'Lo-Fi Night Drive',
      duration: '2:58m',
      audio: 'Spatial 3D',
      badge: 'Top Chart #1',
      image: '/posters/highway.jpg'
    },
    {
      id: 'song-3',
      title: 'Electrified Dhol Pulse',
      artist: 'Club Bass Collective',
      duration: '3:15m',
      audio: 'Dolby Atmos',
      badge: 'Viral Audio',
      image: '/posters/dhol.jpg'
    }
  ],

  // Why DOOM OTT Reasons
  reasons: [
    {
      id: 'reason-1',
      title: 'Shorts + Cinema in One App',
      desc: 'Never switch between reel apps and movie streaming again. Everything is unified in one tap.',
      icon: 'Tv'
    },
    {
      id: 'reason-2',
      title: 'Download to Watch Offline',
      desc: 'Save movies, web series, and viral shorts directly to your phone for flights or offline travel.',
      icon: 'Download'
    },
    {
      id: 'reason-3',
      title: 'Background Spatial Audio',
      desc: 'Listen to lossless 24-bit tracks and original soundtracks even when your phone screen is locked.',
      icon: 'Headphones'
    },
    {
      id: 'reason-4',
      title: 'Zero-Buffer 4K Engine',
      desc: 'Proprietary distributed edge nodes deliver instant playback without stutter on Indian mobile networks.',
      icon: 'Zap'
    }
  ],

  // Home Page FAQs
  homeFaqs: [
    {
      id: 'faq-1',
      q: 'What is DOOM OTT?',
      a: 'DOOM OTT is an all-in-one mobile and web streaming app that combines 60-second viral vertical video shorts, 4K blockbuster movies, multi-season web series, and lossless 24-bit studio music with spatial 3D audio in a single subscription.'
    },
    {
      id: 'faq-2',
      q: 'How much does DOOM OTT cost?',
      a: 'You can stream free content instantly, or unlock the full 4K ad-free VIP tier with our 3-Month Free VIP Pass trial. No credit card is required during the pre-launch phase.'
    },
    {
      id: 'faq-3',
      q: 'Where can I watch?',
      a: 'Watch anywhere, anytime. Download the DOOM OTT app on your Android smartphone or Apple iPhone, or stream directly on your tablet, laptop, and Smart TV.'
    },
    {
      id: 'faq-4',
      q: 'Can I listen to music while using other apps or with screen locked?',
      a: 'Yes! DOOM OTT includes a built-in background audio engine that continues playing your favourite lossless tracks and podcasts even when your screen is locked.'
    },
    {
      id: 'faq-5',
      q: 'How do I claim my 3-Month Free VIP Pass?',
      a: 'Simply enter your phone number or email in the box below. You will receive an instant VIP activation code to enter when launching the mobile app.'
    }
  ],

  // VIP Pass Section Settings
  vipPassSection: {
    heading: 'Ready to watch? Enter your mobile number or email to claim your 3-Month Free VIP Pass.',
    buttonText: 'Get Started',
    codePrefix: 'DOOM-',
    successTitle: 'VIP Pass Activated!',
    successDesc: 'inside the app.',
  },

  // About Page
  aboutPage: {
    heroBadge: 'REDEFINING DIGITAL ENTERTAINMENT',
    heroTitle: 'The Story Behind DOOM OTT',
    heroSubtitle: 'We are tearing down the wall between bite-sized viral short videos and long-form cinematic cinema. Built for the modern generation of creators, film-lovers, and audiophiles.',
    visionSectionTitle: 'WHAT SETS US APART',
    visionSectionHeading: '4 Entertainment Pillars. 1 Seamless App.',
    visionSectionSub: 'Traditional streaming platforms focus either solely on movies or exclusively on short reels. DOOM OTT combines both with lossless studio music.',
    visionCards: [
      {
        id: 'vis-1',
        title: 'All Entertainment In One Tap',
        desc: 'Users shouldn\'t have to juggle 4 different apps for reels, movies, music, and web series. DOOM OTT unifies your entire digital diet under one blazing-fast roof.',
        icon: 'Layers'
      },
      {
        id: 'vis-2',
        title: 'Zero-Buffer Edge Streaming',
        desc: 'Proprietary distributed edge nodes deliver instantaneous 4K video playback and 60fps vertical swipe feeds without stutter or buffering.',
        icon: 'Zap'
      },
      {
        id: 'vis-3',
        title: 'Creator-First Ecosystem',
        desc: 'Direct monetization, high-fidelity lossless audio streaming, and algorithmic exposure designed to empower emerging filmmakers and digital creators.',
        icon: 'Users'
      }
    ],
    pillars: [
      {
        id: 'pil-1',
        title: 'Viral Instant Shorts',
        desc: 'Swipe through 60-second comedy, behind-the-scenes teasers, dance clips, and creative stories with instant audio synchronization.',
        icon: 'Video'
      },
      {
        id: 'pil-2',
        title: '4K Blockbuster Movies',
        desc: 'Stunning HDR10+ and Dolby Vision cinema library spanning action, neo-noir thrillers, sci-fi epics, and indie gems.',
        icon: 'Film'
      },
      {
        id: 'pil-3',
        title: 'Lossless Studio Songs',
        desc: 'True 24-bit studio master audio with background screen-off playback and proprietary spatial 3D audio enhancement.',
        icon: 'Music'
      },
      {
        id: 'pil-4',
        title: 'Original Web Series',
        desc: 'Multi-episode original narrative series written and produced by independent visionary directors worldwide.',
        icon: 'Tv'
      }
    ],
    stats: [
      { id: 'stat-1', number: '150K+', label: 'Pre-Registered Community' },
      { id: 'stat-2', number: '50,000+', label: 'Curated Video Shorts' },
      { id: 'stat-3', number: '4K 60FPS', label: 'Maximum Streaming Bitrate' },
      { id: 'stat-4', number: '0.02s', label: 'Instant Reel Swipe Latency' }
    ]
  },

  // Support Page Data
  supportPage: {
    heroBadge: 'HELP & CUSTOMER SUCCESS',
    heroTitle: 'How Can We Help You?',
    heroSubtitle: 'Search frequently asked questions, learn about the app download process, or reach out to our dedicated 24/7 support team.',
    faqs: [
      {
        id: 'sup-1',
        category: 'download',
        question: 'How do I download and install the DOOM OTT app?',
        answer: 'You can download the DOOM OTT app directly from the Google Play Store for Android devices or the Apple App Store for iOS devices. On desktop, click "Get App" in the navbar to scan the QR code directly with your smartphone camera.'
      },
      {
        id: 'sup-2',
        category: 'playback',
        question: 'What video and audio qualities are supported?',
        answer: 'DOOM OTT supports video playback from adaptive 720p HD up to native 4K Ultra HD with HDR10+ and Dolby Vision on supported mobile and smart TV displays. Our music vault streams lossless 24-bit audio with spatial 3D surround sound.'
      },
      {
        id: 'sup-3',
        category: 'subscription',
        question: 'How do I claim and activate my 3-Month Free VIP Pass?',
        answer: 'Simply enter your mobile number or email in the VIP Pass section on the homepage. You will receive a unique coupon code. When you first log into the DOOM OTT app, enter this code under Profile > VIP Pass to unlock 3 months of ad-free 4K streaming at zero cost.'
      },
      {
        id: 'sup-4',
        category: 'account',
        question: 'Can I stream on multiple devices with a single account?',
        answer: 'Yes! A standard DOOM OTT VIP account allows concurrent streaming across up to 4 devices simultaneously, including smartphones, tablets, laptops, and Android TVs.'
      },
      {
        id: 'sup-5',
        category: 'shorts',
        question: 'How can creators publish shorts and songs on DOOM OTT?',
        answer: 'We offer an open Creator Portal where certified filmmakers, musicians, and reel creators can submit content for algorithmic distribution and revenue-share monetization. Contact support@doomott.com with your portfolio to get early creator access.'
      },
      {
        id: 'sup-6',
        category: 'playback',
        question: 'Does music playback continue when the screen is locked?',
        answer: 'Yes! DOOM OTT features a dedicated background audio player that lets you listen to songs, playlists, and podcast episodes uninterrupted even when your phone screen is switched off or while using other apps.'
      },
      {
        id: 'sup-7',
        category: 'download',
        question: 'Can I download movies and episodes for offline viewing?',
        answer: 'Yes, VIP pass holders can download titles in high definition to their device storage for offline playback during flights or areas with low mobile connectivity.'
      }
    ]
  }
};

