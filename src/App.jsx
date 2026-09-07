import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Film, Music, Video, Tv } from 'lucide-react';
import './App.css';

function Background3D() {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ff2a2a" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0055ff" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={mesh} position={[0, 0, -10]}>
          <torusKnotGeometry args={[5, 1.5, 200, 32]} />
          <meshStandardMaterial color="#222" wireframe opacity={0.2} transparent />
        </mesh>
      </Float>
    </>
  );
}

function Hero() {
  return (
    <section className="content-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="hero-title">Doom OTT</h1>
        <p className="hero-subtitle">The Future of Entertainment</p>
      </motion.div>
    </section>
  );
}

function Showcase() {
  const items = [
    { title: "Movies", icon: <Film size={48} />, desc: "Blockbusters at your fingertips." },
    { title: "Shorts", icon: <Video size={48} />, desc: "Bite-sized entertainment." },
    { title: "Songs", icon: <Music size={48} />, desc: "Premium audio experience." },
    { title: "Shows", icon: <Tv size={48} />, desc: "Binge-worthy series." }
  ];

  return (
    <section className="content-section">
      <motion.h2 
        style={{ fontSize: '3rem', marginBottom: '1rem' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Explore Our Universe
      </motion.h2>
      <div className="showcase-grid">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="showcase-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="card-icon">{item.icon}</div>
            <h3 className="card-title">{item.title}</h3>
            <p style={{ color: '#aaa' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AppTeaser() {
  return (
    <section className="content-section app-teaser">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#fff' }}>The App is Coming.</h2>
        <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto' }}>
          Get ready to experience Doom OTT anywhere, anytime. Our mobile app launches soon with exclusive offline features and immersive 3D viewing modes.
        </p>
        <button className="download-btn">Get Early Access</button>
      </motion.div>
    </section>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Background3D />
        </Canvas>
      </div>
      
      <Hero />
      <Showcase />
      <AppTeaser />
    </div>
  );
}

export default App;
