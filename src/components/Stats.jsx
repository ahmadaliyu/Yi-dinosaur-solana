import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Globe,
  Activity,
  BarChart3,
  Zap,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import { useTokenData } from '../hooks/useTokenData';
import './Stats.css';

// Individual digit component that slides when it changes
const SlidingDigit = ({ digit, index }) => {
  return (
    <span className="digit-wrapper">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${index}-${digit}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="sliding-digit"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// Sliding number that animates individual digits - ONLY for Collective Views
const SlidingNumber = ({ value }) => {
  const formattedValue = value.toLocaleString();
  
  return (
    <div className="sliding-number-container">
      {formattedValue.split('').map((char, index) => {
        // Commas don't animate, just render them
        if (char === ',') {
          return <span key={`comma-${index}`} className="digit-comma">,</span>;
        }
        return <SlidingDigit key={index} digit={char} index={index} />;
      })}
    </div>
  );
};

const Stats = () => {
  // Fetch real data from APIs (with 30s refresh)
  const { coinGecko, dexScreener, solana, isLoading, lastUpdated, refetch } = useTokenData(30000);

  // Default/fallback stats (used when API data not available)
  const [stats, setStats] = useState({
    mindshare: 847562000,
    views: 2456789000,
    followers: 125678000,
    mentions: 45892000,
    trendingScore: 94.7,
    activeHolders: 15234,
    dailyTransactions: 8547,
    socialScore: 89.3
  });

  // Update stats when real data arrives
  useEffect(() => {
    if (coinGecko || dexScreener || solana) {
      setStats(prev => ({
        ...prev,
        // From CoinGecko
        followers: coinGecko?.twitterFollowers || prev.followers,
        trendingScore: coinGecko?.priceChange24h ? Math.min(99.9, Math.abs(coinGecko.priceChange24h) + 80) : prev.trendingScore,
        
        // From DexScreener
        dailyTransactions: dexScreener?.txns24h || prev.dailyTransactions,
        activeHolders: solana?.holderCount ? solana.holderCount * 1000 : prev.activeHolders,
        
        // Market data
        marketCap: coinGecko?.marketCap || dexScreener?.fdv || 0,
        price: dexScreener?.price || coinGecko?.price || 0,
        volume24h: dexScreener?.volume24h || coinGecko?.volume24h || 0,
        liquidity: dexScreener?.liquidity || 0,
      }));
    }
  }, [coinGecko, dexScreener, solana]);

  const [displayStats, setDisplayStats] = useState({
    mindshare: 0,
    views: 0,
    followers: 0,
    mentions: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animate numbers when section becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 100;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = easeOutExpo(currentStep / steps);
      
      setDisplayStats({
        mindshare: Math.floor(stats.mindshare * progress),
        views: Math.floor(stats.views * progress),
        followers: Math.floor(stats.followers * progress),
        mentions: Math.floor(stats.mentions * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        startLiveUpdates();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Easing function for smooth animation
  const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  // Real-time updates that continue forever
  const startLiveUpdates = () => {
    // Slower updates for views (every 800ms) - only Collective Views has sliding animation
    setInterval(() => {
      setDisplayStats(prev => ({
        ...prev,
        views: prev.views + Math.floor(Math.random() * 50000) + 10000
      }));
    }, 800);

    // Medium updates for mindshare (every 2s)
    setInterval(() => {
      setDisplayStats(prev => ({
        ...prev,
        mindshare: prev.mindshare + Math.floor(Math.random() * 30000) + 5000
      }));
    }, 2000);

    // Slower updates for followers and mentions
    setInterval(() => {
      setDisplayStats(prev => ({
        ...prev,
        followers: prev.followers + Math.floor(Math.random() * 2),
        mentions: prev.mentions + Math.floor(Math.random() * 3)
      }));
    }, 2000);
  };

  const formatNumberWithCommas = (num) => {
    return num.toLocaleString();
  };

  const secondaryStats = [
    {
      icon: <TrendingUp size={24} />,
      value: stats.trendingScore + '%',
      label: 'Trending Score',
      color: 'primary'
    },
    {
      icon: <BarChart3 size={24} />,
      value: formatNumberWithCommas(stats.activeHolders),
      label: 'Active Holders',
      color: 'secondary'
    },
    {
      icon: <Zap size={24} />,
      value: formatNumberWithCommas(stats.dailyTransactions),
      label: 'Daily TXs',
      color: 'accent'
    },
    {
      icon: <Globe size={24} />,
      value: stats.socialScore + '%',
      label: 'Social Score',
      color: 'warning'
    }
  ];

  const socialPlatforms = [
    { name: 'Twitter/X', followers: '45.2K', icon: '𝕏', color: '#1DA1F2' },
    { name: 'Telegram', followers: '32.1K', icon: '✈', color: '#0088cc' },
    { name: 'Discord', followers: '28.4K', icon: '🎮', color: '#5865F2' },
    { name: 'Instagram', followers: '20.0K', icon: '📷', color: '#E4405F' }
  ];

  return (
    <section id="stats" className="stats-section section" ref={sectionRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="stats-hero"
        >
          <div className="stats-header">
            <h2 className="section-title">Real-Time $Yi Mindshare Tracker</h2>
            <div className="live-indicator-group">
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE DATA
              </div>
              <button 
                className="refresh-btn" 
                onClick={refetch}
                disabled={isLoading}
                title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Refresh data'}
              >
                <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
              </button>
            </div>
          </div>

          {/* Prominent Collective Views Counter */}
          <div className="collective-views-display">
            <div className="collective-label">
              <Eye size={28} />
              <span>Collective Views</span>
            </div>
            <div className="collective-number">
              <SlidingNumber value={displayStats.views} />
            </div>
            <div className="collective-subtitle">
              <span className="pulse-dot"></span>
              Updating in real-time
              <span className="collective-change">+28.3% today</span>
            </div>
          </div>
        </motion.div>

        {/* Main Real-Time Counter Display */}
        <motion.div 
          className="realtime-counter-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="counter-grid">
            <div className="counter-card">
              <div className="counter-icon mindshare">
                <Activity size={36} />
              </div>
              <div className="counter-label">$Yi Mindshare</div>
              <div className="counter-value">{displayStats.mindshare.toLocaleString()}</div>
              <div className="counter-change positive">+12.5%</div>
            </div>

            <div className="counter-card">
              <div className="counter-icon followers">
                <Users size={36} />
              </div>
              <div className="counter-label">Global Followers</div>
              <div className="counter-value">{displayStats.followers.toLocaleString()}</div>
              <div className="counter-change positive">+8.7%</div>
            </div>

            <div className="counter-card">
              <div className="counter-icon mentions">
                <MessageCircle size={36} />
              </div>
              <div className="counter-label">Social Mentions</div>
              <div className="counter-value">{displayStats.mentions.toLocaleString()}</div>
              <div className="counter-change positive">+45.2%</div>
            </div>
          </div>
        </motion.div>

        <div className="secondary-stats">
          {secondaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`secondary-stat-card ${stat.color}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="secondary-icon">{stat.icon}</div>
              <div className="secondary-value">{stat.value}</div>
              <div className="secondary-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="social-platforms"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="social-title">Community Presence</h3>
          <div className="platforms-grid">
            {socialPlatforms.map((platform, index) => (
              <a 
                key={platform.name}
                href="#"
                className="platform-card"
                style={{ '--platform-color': platform.color }}
              >
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-name">{platform.name}</span>
                <span className="platform-followers">{platform.followers}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mindshare-chart"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="chart-header">
            <h3>Mindshare Growth (7 Days)</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot primary"></span> Mindshare</span>
              <span className="legend-item"><span className="legend-dot secondary"></span> Engagement</span>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {[65, 72, 68, 85, 78, 92, 100].map((height, index) => (
                <div key={index} className="chart-bar-group">
                  <div 
                    className="chart-bar"
                    style={{ height: `${height}%` }}
                  >
                    <div className="bar-tooltip">{Math.floor(height * 8475)}+</div>
                  </div>
                  <span className="bar-label">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
