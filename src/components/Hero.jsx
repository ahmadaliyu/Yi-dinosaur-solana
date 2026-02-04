import { motion } from 'framer-motion';
import { Rocket, TrendingUp, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "YiQi...PUMP"; // Replace with actual contract

  const copyAddress = () => {
    navigator.clipboard.writeText("YiQiDINOSAURPUMPFUNADDRESS");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="hero-content container">
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge-dot"></span>
          Live on Solana • Launched on Pump.fun
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="title-chinese">翼奇</span>
          <span className="title-main">Yi Dinosaur</span>
          <span className="title-sub">The <span className="highlight">Strange Wing</span> of Crypto</span>
        </motion.h1>

        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          159 million years ago, the Yi qi dinosaur evolved unique bat-like wings — 
          a revolutionary adaptation never seen before. Today, <span className="highlight">$Yi</span> brings 
          that same revolutionary spirit to the Solana blockchain. The shortest named 
          dinosaur meets the fastest blockchain.
        </motion.p>

        <motion.div 
          className="hero-stats-mini"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mini-stat">
            <span className="mini-value">159M</span>
            <span className="mini-label">Years of Evolution</span>
          </div>
          <div className="mini-divider"></div>
          <div className="mini-stat">
            <span className="mini-value">2</span>
            <span className="mini-label">Letter Name</span>
          </div>
          <div className="mini-divider"></div>
          <div className="mini-stat">
            <span className="mini-value">∞</span>
            <span className="mini-label">Potential</span>
          </div>
        </motion.div>

        <motion.div 
          className="hero-contract"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <span className="contract-label">Contract Address:</span>
          <div className="contract-box" onClick={copyAddress}>
            <code>{contractAddress}</code>
            {copied ? <CheckCircle size={18} className="copy-icon success" /> : <Copy size={18} className="copy-icon" />}
          </div>
        </motion.div>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Rocket size={20} />
            Buy $Yi on Pump.fun
          </a>
          <a href="#stats" className="btn-secondary">
            <TrendingUp size={20} />
            View Live Stats
          </a>
          <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="btn-tertiary">
            <ExternalLink size={18} />
            DexScreener
          </a>
        </motion.div>

        <motion.div 
          className="hero-dino"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="dino-illustration">
            <svg viewBox="0 0 400 300" className="yi-dino-svg">
              {/* Stylized Yi dinosaur with bat-like wings */}
              <defs>
                <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff88" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Left Wing */}
              <path 
                d="M180 140 Q120 100, 60 80 Q80 120, 100 150 Q120 140, 140 145 Q160 140, 180 150 Z" 
                fill="url(#wingGradient)" 
                opacity="0.8"
                filter="url(#glow)"
                className="wing left-wing"
              />
              
              {/* Right Wing */}
              <path 
                d="M220 140 Q280 100, 340 80 Q320 120, 300 150 Q280 140, 260 145 Q240 140, 220 150 Z" 
                fill="url(#wingGradient)" 
                opacity="0.8"
                filter="url(#glow)"
                className="wing right-wing"
              />
              
              {/* Body */}
              <ellipse cx="200" cy="170" rx="40" ry="50" fill="#1a1a25" stroke="url(#wingGradient)" strokeWidth="2"/>
              
              {/* Head */}
              <circle cx="200" cy="110" r="25" fill="#1a1a25" stroke="url(#wingGradient)" strokeWidth="2"/>
              
              {/* Eyes */}
              <circle cx="190" cy="105" r="6" fill="#00ff88" className="eye"/>
              <circle cx="210" cy="105" r="6" fill="#00ff88" className="eye"/>
              <circle cx="190" cy="105" r="2" fill="#0a0a0f"/>
              <circle cx="210" cy="105" r="2" fill="#0a0a0f"/>
              
              {/* Beak */}
              <path d="M195 118 L200 130 L205 118 Z" fill="url(#wingGradient)"/>
              
              {/* Legs */}
              <line x1="180" y1="215" x2="170" y2="260" stroke="url(#wingGradient)" strokeWidth="3"/>
              <line x1="220" y1="215" x2="230" y2="260" stroke="url(#wingGradient)" strokeWidth="3"/>
              
              {/* Feet */}
              <path d="M160 260 L170 260 L175 255 L180 260" stroke="url(#wingGradient)" strokeWidth="2" fill="none"/>
              <path d="M220 260 L230 260 L235 255 L240 260" stroke="url(#wingGradient)" strokeWidth="2" fill="none"/>
              
              {/* Tail */}
              <path d="M200 220 Q230 240, 260 230 Q270 235, 280 230" stroke="url(#wingGradient)" strokeWidth="3" fill="none"/>
            </svg>
          </div>
          <div className="dino-glow"></div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <motion.div 
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
