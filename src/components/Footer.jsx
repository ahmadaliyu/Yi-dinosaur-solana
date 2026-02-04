import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Stats', href: '#stats' },
    { name: 'Token', href: '#token' },
    { name: 'NFTs', href: '#nfts' },
    { name: 'Community', href: '#community' },
    { name: 'Partners', href: '#partners' }
  ];

  const exchanges = [
    { name: 'Pump.fun', url: 'https://pump.fun', primary: true },
    { name: 'Raydium', url: 'https://raydium.io' },
    { name: 'Jupiter', url: 'https://jup.ag' },
    { name: 'DexScreener', url: 'https://dexscreener.com' },
    { name: 'Birdeye', url: 'https://birdeye.so' }
  ];

  const nftMarkets = [
    { name: 'Magic Eden', url: 'https://magiceden.io' },
    { name: 'OpenSea', url: 'https://opensea.io' },
    { name: 'Tensor', url: 'https://tensor.trade' }
  ];

  const socials = [
    { name: 'Twitter/X', url: 'https://twitter.com', icon: '𝕏' },
    { name: 'Telegram', url: 'https://t.me', icon: '✈' },
    { name: 'Discord', url: 'https://discord.gg', icon: '💬' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📷' }
  ];

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <motion.div 
          className="footer-main"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <div className="logo-icon">翼</div>
              <span className="logo-text">$Yi</span>
            </a>
            <p className="footer-tagline">
              The Strange Wing of Crypto. A 159 million year old dinosaur meets 
              the fastest blockchain. Yi qi — the shortest named dinosaur with 
              the biggest dreams.
            </p>
            <div className="footer-socials">
              {socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Buy $Yi</h4>
              <ul>
                {exchanges.map((exchange) => (
                  <li key={exchange.name}>
                    <a 
                      href={exchange.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={exchange.primary ? 'primary' : ''}
                    >
                      {exchange.name}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>NFT Markets</h4>
              <ul>
                {nftMarkets.map((market) => (
                  <li key={market.name}>
                    <a 
                      href={market.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {market.name}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Whitepaper</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Brand Assets</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="footer-exchanges">
          <span className="exchanges-label">Trade $Yi on:</span>
          <div className="exchanges-logos">
            {['Pump.fun', 'Raydium', 'Jupiter', 'Orca'].map((name) => (
              <a key={name} href="#" className="exchange-link">{name}</a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>© 2026 Yi Dinosaur ($Yi). All rights reserved.</p>
            <p className="disclaimer">
              $Yi is a meme coin with no intrinsic value. Trade responsibly. 
              This is not financial advice.
            </p>
          </div>
          <div className="footer-made">
            <span>Made with</span>
            <Heart size={16} className="heart" />
            <span>on Solana</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
