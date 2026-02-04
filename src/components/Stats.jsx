import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Globe,
  Activity,
  BarChart3,
  Zap,
  MessageCircle
} from 'lucide-react';
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState({
    mindshare: 0,
    views: 0,
    followers: 0,
    mentions: 0,
    trendingScore: 0,
    activeHolders: 0,
    dailyTransactions: 0,
    socialScore: 0
  });

  // Simulated real-time data updates
  useEffect(() => {
    const targetStats = {
      mindshare: 847562,
      views: 2456789,
      followers: 125678,
      mentions: 45892,
      trendingScore: 94.7,
      activeHolders: 15234,
      dailyTransactions: 8547,
      socialScore: 89.3
    };

    // Animate numbers on load
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        mindshare: Math.floor(targetStats.mindshare * progress),
        views: Math.floor(targetStats.views * progress),
        followers: Math.floor(targetStats.followers * progress),
        mentions: Math.floor(targetStats.mentions * progress),
        trendingScore: Math.floor(targetStats.trendingScore * progress * 10) / 10,
        activeHolders: Math.floor(targetStats.activeHolders * progress),
        dailyTransactions: Math.floor(targetStats.dailyTransactions * progress),
        socialScore: Math.floor(targetStats.socialScore * progress * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        // Continue with small random updates
        startLiveUpdates(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const startLiveUpdates = (baseStats) => {
    setInterval(() => {
      setStats(prev => ({
        ...prev,
        mindshare: prev.mindshare + Math.floor(Math.random() * 10),
        views: prev.views + Math.floor(Math.random() * 50),
        mentions: prev.mentions + Math.floor(Math.random() * 3),
        dailyTransactions: prev.dailyTransactions + Math.floor(Math.random() * 5)
      }));
    }, 3000);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const mainStats = [
    {
      icon: <Activity size={28} />,
      value: formatNumber(stats.mindshare),
      label: '$Yi Mindshare',
      change: '+12.5%',
      positive: true,
      description: 'Total social engagement score'
    },
    {
      icon: <Eye size={28} />,
      value: formatNumber(stats.views),
      label: 'Collective Views',
      change: '+28.3%',
      positive: true,
      description: 'Across all platforms'
    },
    {
      icon: <Users size={28} />,
      value: formatNumber(stats.followers),
      label: 'Global Followers',
      change: '+8.7%',
      positive: true,
      description: 'Combined community size'
    },
    {
      icon: <MessageCircle size={28} />,
      value: formatNumber(stats.mentions),
      label: 'Social Mentions',
      change: '+45.2%',
      positive: true,
      description: '24h mention count'
    }
  ];

  const secondaryStats = [
    {
      icon: <TrendingUp size={24} />,
      value: stats.trendingScore + '%',
      label: 'Trending Score',
      color: 'primary'
    },
    {
      icon: <BarChart3 size={24} />,
      value: formatNumber(stats.activeHolders),
      label: 'Active Holders',
      color: 'secondary'
    },
    {
      icon: <Zap size={24} />,
      value: formatNumber(stats.dailyTransactions),
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
    <section id="stats" className="stats-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="stats-header">
            <h2 className="section-title">Real-Time $Yi Mindshare Tracker</h2>
            <div className="live-indicator">
              <span className="live-dot"></span>
              LIVE DATA
            </div>
          </div>
        </motion.div>

        <div className="stats-grid">
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card main-stat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

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
