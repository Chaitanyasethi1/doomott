import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { FastForward } from 'lucide-react';

/* =========================================================================
   3D INTRO CANVAS SCENE (Matte Gold Particles & 3D Logo Reveal)
========================================================================= */

function IntroParticleDust({ count = 500 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorGold = new THREE.Color('#D4AF37');
    const colorLight = new THREE.Color('#E5C378');
    const colorMuted = new THREE.Color('#C5A059');

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixed = Math.random() > 0.6 ? colorGold : Math.random() > 0.3 ? colorLight : colorMuted;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function IntroEmblem3D() {
  const groupRef = useRef();
  const ringRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth inward zoom & gentle tilt
      groupRef.current.rotation.y = Math.sin(t * 1.2) * 0.35;
      groupRef.current.position.z = Math.min(0, -3 + t * 1.2);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6;
      ringRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.8;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.4;
      coreRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Outer Matte Gold Gyro Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.07, 16, 80]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.35}
          metalness={0.65}
          emissive="#7A5D18"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Inner Matte Gold Torus */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.8, 0.05, 16, 60]} />
        <meshStandardMaterial
          color="#E5C378"
          roughness={0.3}
          metalness={0.7}
          emissive="#5C4412"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Central 3D Core */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#141414"
            roughness={0.25}
            metalness={0.8}
            wireframe
            wireframeLinewidth={2}
            emissive="#D4AF37"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* =========================================================================
   3D INTRO OVERLAY COMPONENT
========================================================================= */

export default function Intro3D({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-complete after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onComplete) {
      setTimeout(onComplete, 400);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          {/* 3D Background Canvas */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }}>
              <ambientLight intensity={0.7} color="#FFF8E7" />
              <directionalLight position={[5, 10, 5]} intensity={2.2} color="#D4AF37" />
              <pointLight position={[-5, -5, -2]} intensity={1.5} color="#E5C378" />
              <IntroParticleDust count={600} />
              <IntroEmblem3D />
            </Canvas>
          </div>

          {/* Central Animated Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 1.5rem',
              pointerEvents: 'none'
            }}
          >
            {/* Matte Emblem */}
            <motion.div
              initial={{ rotate: -15, scale: 0.7 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '22px',
                background: 'linear-gradient(145deg, #181818, #0C0C0C)',
                border: '1.5px solid rgba(212, 175, 55, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(212, 175, 55, 0.2)'
              }}
            >
              <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
                <path
                  d="M32 24 H52 C66 24 74 33 74 50 C74 67 66 76 52 76 H32 V24 Z M44 36 V64 H51 C59 64 62 59 62 50 C62 41 59 36 51 36 H44 Z"
                  fill="#D4AF37"
                />
                <path d="M48 44 L56 50 L48 56 Z" fill="#0C0C0C" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                fontWeight: 900,
                letterSpacing: '0.1em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.1
              }}
            >
              DOOM <span style={{ color: '#D4AF37' }}>OTT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C5A059',
                marginTop: '0.7rem',
                fontWeight: 600
              }}
            >
              CINEMATIC SHORTS & STREAMING
            </motion.p>
          </motion.div>

          {/* Skip Button Top-Right */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 20
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              style={{
                background: 'rgba(24, 24, 24, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                color: '#E0E0E0',
                padding: '0.5rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Skip <FastForward size={14} />
            </button>
          </div>

          {/* Bottom Tap Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              fontSize: '0.78rem',
              color: '#888',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              pointerEvents: 'none'
            }}
          >
            Tap anywhere to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
