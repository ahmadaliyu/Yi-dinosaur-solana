import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stats', href: '#stats' },
    { name: 'Token', href: '#token' },
    { name: 'NFTs', href: '#nfts' },
    { name: 'Community', href: '#community' },
    { name: 'Partners', href: '#partners' },
  ];

  const connectWallet = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect();
        console.log('Connected:', response.publicKey.toString());
        setWalletConnected(true);
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <a href="#" className="logo">
          <div className="logo-icon">翼</div>
          <span className="logo-text">$Yi</span>
        </a>

        <div className={`nav-links ${isMobileOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="nav-link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="nav-actions">
          <div className="network-badge">
            <span className="network-dot"></span>
            Solana
          </div>
          <button className="wallet-btn" onClick={connectWallet}>
            <Wallet size={18} />
            {walletConnected ? 'Connected' : 'Connect Wallet'}
          </button>
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
