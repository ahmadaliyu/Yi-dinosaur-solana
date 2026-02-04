import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, ChevronDown } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { publicKey, connected, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();

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

  const handleConnectClick = () => {
    if (connected) {
      setShowDropdown(!showDropdown);
    } else {
      setVisible(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDropdown(false);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    const str = address.toString();
    return `${str.slice(0, 4)}...${str.slice(-4)}`;
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
          <div className="logo-icon">
            <span className="logo-yi">Yi</span>
          </div>
          <span className="logo-text">Dinosaur</span>
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
          
          <div className="wallet-container">
            <button className="wallet-btn" onClick={handleConnectClick}>
              {connected && wallet ? (
                <>
                  <img 
                    src={wallet.adapter.icon} 
                    alt={wallet.adapter.name} 
                    className="wallet-icon"
                  />
                  {formatAddress(publicKey)}
                  <ChevronDown size={16} />
                </>
              ) : (
                <>
                  <Wallet size={18} />
                  Connect Wallet
                </>
              )}
            </button>
            
            {showDropdown && connected && (
              <div className="wallet-dropdown">
                <div className="dropdown-header">
                  <img 
                    src={wallet?.adapter.icon} 
                    alt={wallet?.adapter.name} 
                    className="dropdown-wallet-icon"
                  />
                  <div className="dropdown-info">
                    <span className="dropdown-wallet-name">{wallet?.adapter.name}</span>
                    <span className="dropdown-address">{formatAddress(publicKey)}</span>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    navigator.clipboard.writeText(publicKey?.toString() || '');
                    setShowDropdown(false);
                  }}
                >
                  📋 Copy Address
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => setVisible(true)}
                >
                  🔄 Change Wallet
                </button>
                <button 
                  className="dropdown-item disconnect"
                  onClick={handleDisconnect}
                >
                  🚪 Disconnect
                </button>
              </div>
            )}
          </div>

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
