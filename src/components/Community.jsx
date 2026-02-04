import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Globe, 
  Heart,
  ExternalLink,
  Send,
  Twitter
} from 'lucide-react';
import './Community.css';

const Community = () => {
  const communityStats = [
    { icon: <Users size={24} />, value: '125K+', label: 'Community Members' },
    { icon: <Globe size={24} />, value: '50+', label: 'Countries' },
    { icon: <MessageCircle size={24} />, value: '1M+', label: 'Messages/Month' },
    { icon: <Heart size={24} />, value: '99%', label: 'Positive Vibes' }
  ];

  const socialLinks = [
    {
      name: 'Twitter / X',
      handle: '@YiDinosaurSol',
      followers: '45.2K',
      icon: <Twitter size={28} />,
      color: '#1DA1F2',
      url: 'https://twitter.com'
    },
    {
      name: 'Telegram',
      handle: 't.me/YiDinosaur',
      followers: '32.1K',
      icon: <Send size={28} />,
      color: '#0088cc',
      url: 'https://t.me'
    },
    {
      name: 'Discord',
      handle: 'Yi Community',
      followers: '28.4K',
      icon: <MessageCircle size={28} />,
      color: '#5865F2',
      url: 'https://discord.gg'
    }
  ];

  const recentActivity = [
    { type: 'join', user: 'DinoFan2026', action: 'joined the community', time: '2 min ago' },
    { type: 'buy', user: 'CryptoWing', action: 'bought 50,000 $Yi', time: '5 min ago' },
    { type: 'nft', user: 'JurassicHodler', action: 'minted Yi Genesis #847', time: '8 min ago' },
    { type: 'join', user: 'SolanaMaxi', action: 'joined the community', time: '12 min ago' },
    { type: 'buy', user: 'DiamondHands', action: 'bought 100,000 $Yi', time: '15 min ago' }
  ];

  return (
    <section id="community" className="community-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Join the Yi Community</h2>
          <p className="community-subtitle">
            A global tribe of dino enthusiasts, crypto believers, and future-thinkers. 
            Together, we're bringing the Yi dinosaur back to life.
          </p>
        </motion.div>

        <div className="community-stats">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="community-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="community-content">
          <motion.div 
            className="social-links"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Connect With Us</h3>
            <div className="social-cards">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{ '--social-color': social.color }}
                >
                  <div className="social-icon">{social.icon}</div>
                  <div className="social-info">
                    <span className="social-name">{social.name}</span>
                    <span className="social-handle">{social.handle}</span>
                    <span className="social-followers">{social.followers} followers</span>
                  </div>
                  <ExternalLink size={18} className="social-arrow" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="live-feed"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="feed-header">
              <h3>Live Activity</h3>
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE
              </div>
            </div>
            <div className="feed-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="feed-item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`feed-icon ${activity.type}`}>
                    {activity.type === 'join' && '👋'}
                    {activity.type === 'buy' && '💰'}
                    {activity.type === 'nft' && '🎨'}
                  </div>
                  <div className="feed-content">
                    <span className="feed-user">{activity.user}</span>
                    <span className="feed-action">{activity.action}</span>
                  </div>
                  <span className="feed-time">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="community-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="cta-emoji">🦕</div>
          <h3>Be Part of Something Prehistoric</h3>
          <p>Join thousands of Yi believers shaping the future of meme coins</p>
          <div className="cta-buttons">
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Send size={20} />
              Join Telegram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Twitter size={20} />
              Follow on X
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
