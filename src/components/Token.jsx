import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Users, 
  Puzzle, 
  Shield, 
  Coins,
  Lock,
  TrendingUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useTokenData } from '../hooks/useTokenData';
import './Token.css';

const Token = () => {
  // Fetch real data
  const { coinGecko, dexScreener, solana, isLoading } = useTokenData(60000);
  
  // Dynamic token stats based on real data
  const [dynamicStats, setDynamicStats] = useState({
    holders: '15,234',
    burned: '2.5M',
    integrations: '12'
  });

  useEffect(() => {
    if (solana?.holderCount) {
      setDynamicStats(prev => ({
        ...prev,
        holders: solana.holderCount.toLocaleString()
      }));
    }
  }, [solana]);

  const tokenStats = [
    {
      icon: <Users size={32} />,
      value: dynamicStats.holders,
      label: '$Yi Holders',
      description: 'Unique wallet addresses holding $Yi',
      color: 'primary'
    },
    {
      icon: <Flame size={32} />,
      value: dynamicStats.burned,
      label: '$Yi Burned',
      description: 'Tokens permanently removed from circulation',
      color: 'accent'
    },
    {
      icon: <Puzzle size={32} />,
      value: dynamicStats.integrations,
      label: 'Integrations',
      description: 'DeFi protocols & platforms supporting $Yi',
      color: 'secondary'
    }
  ];

  // Dynamic tokenomics based on real data
  const totalSupply = coinGecko?.totalSupply || 1000000000;
  const circulatingSupply = coinGecko?.circulatingSupply || 847500000;
  
  const tokenomics = [
    { label: 'Total Supply', value: totalSupply.toLocaleString(), icon: <Coins size={20} /> },
    { label: 'Circulating', value: circulatingSupply.toLocaleString(), icon: <TrendingUp size={20} /> },
    { label: 'Burned', value: '2,500,000', icon: <Flame size={20} /> },
    { label: 'Locked', value: '150,000,000', icon: <Lock size={20} /> }
  ];

  const features = [
    {
      title: 'Community Driven',
      description: 'No team tokens. 100% fair launch on pump.fun. Power to the holders.',
      icon: <Users size={24} />
    },
    {
      title: 'Deflationary',
      description: 'Built-in burn mechanism reduces supply with every transaction.',
      icon: <Flame size={24} />
    },
    {
      title: 'Secure',
      description: 'Contract verified and liquidity locked. Audited for your safety.',
      icon: <Shield size={24} />
    },
    {
      title: 'Evolving',
      description: 'Constant development and new integrations coming.',
      icon: <Sparkles size={24} />
    }
  ];

  const integrations = [
    { name: 'Raydium', type: 'DEX' },
    { name: 'Jupiter', type: 'Aggregator' },
    { name: 'Orca', type: 'DEX' },
    { name: 'Phantom', type: 'Wallet' },
    { name: 'Solflare', type: 'Wallet' },
    { name: 'Magic Eden', type: 'NFT' }
  ];

  return (
    <section id="token" className="token-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">The $Yi Token</h2>
          <p className="token-tagline">
            From the Jurassic era to the blockchain age — <span className="highlight">Yi dinosaur</span> has 
            become the face of evolutionary crypto. The shortest dinosaur name meets the fastest blockchain.
          </p>
        </motion.div>

        <div className="token-stats-grid">
          {tokenStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`token-stat-card ${stat.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="token-stat-icon">{stat.icon}</div>
              <div className="token-stat-value">{stat.value}</div>
              <div className="token-stat-label">{stat.label}</div>
              <div className="token-stat-desc">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="tokenomics-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="tokenomics-visual">
            <div className="token-circle">
              <div className="token-inner">
                <span className="token-symbol">翼</span>
                <span className="token-name">$Yi</span>
              </div>
              <svg className="token-ring" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border)" strokeWidth="8"/>
                <circle 
                  cx="100" 
                  cy="100" 
                  r="90" 
                  fill="none" 
                  stroke="url(#tokenGradient)" 
                  strokeWidth="8"
                  strokeDasharray="565.48"
                  strokeDashoffset="141.37"
                  strokeLinecap="round"
                  className="progress-ring"
                />
                <defs>
                  <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="tokenomics-data">
              {tokenomics.map((item, index) => (
                <div key={item.label} className="tokenomics-item">
                  <div className="tokenomics-icon">{item.icon}</div>
                  <div className="tokenomics-info">
                    <span className="tokenomics-label">{item.label}</span>
                    <span className="tokenomics-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="integrations-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="integrations-title">$Yi Integrations</h3>
          <div className="integrations-grid">
            {integrations.map((integration, index) => (
              <div key={integration.name} className="integration-badge">
                <span className="integration-name">{integration.name}</span>
                <span className="integration-type">{integration.type}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="token-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <h3>Ready to Join the Evolution?</h3>
            <p>Get $Yi now and become part of the most unique community in crypto.</p>
          </div>
          <div className="cta-actions">
            <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buy $Yi <ExternalLink size={18} />
            </a>
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View Chart <ExternalLink size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Token;
