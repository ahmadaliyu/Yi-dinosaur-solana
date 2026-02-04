import { motion } from 'framer-motion';
import { Handshake, ExternalLink, CheckCircle } from 'lucide-react';
import './Partners.css';

const Partners = () => {
  const partners = [
    {
      name: 'Raydium',
      type: 'DEX Partner',
      status: 'Active',
      description: 'Primary liquidity pool on Solana\'s leading DEX',
      logo: '💧'
    },
    {
      name: 'Jupiter',
      type: 'Aggregator',
      status: 'Active',
      description: 'Best swap rates through Jupiter aggregation',
      logo: '🪐'
    },
    {
      name: 'Magic Eden',
      type: 'NFT Marketplace',
      status: 'Active',
      description: 'Official Yi NFT collection marketplace',
      logo: '🎨'
    },
    {
      name: 'Phantom',
      type: 'Wallet',
      status: 'Integrated',
      description: 'Seamless wallet integration',
      logo: '👻'
    },
    {
      name: 'Birdeye',
      type: 'Analytics',
      status: 'Listed',
      description: 'Real-time price and market analytics',
      logo: '🦅'
    },
    {
      name: 'DexScreener',
      type: 'Charts',
      status: 'Listed',
      description: 'Live trading charts and data',
      logo: '📊'
    }
  ];

  const exchanges = [
    { name: 'Binance', status: 'Target', logo: '🔶' },
    { name: 'Coinbase', status: 'Target', logo: '🔵' },
    { name: 'Kraken', status: 'Target', logo: '🐙' },
    { name: 'KuCoin', status: 'Pending', logo: '💚' },
    { name: 'Gate.io', status: 'Pending', logo: '🚪' },
    { name: 'MEXC', status: 'Listed', logo: 'Ⓜ️' }
  ];

  const roadmapItems = [
    { phase: 'Phase 1', title: 'Launch', items: ['Pump.fun Launch', 'Community Building', 'Social Media'], completed: true },
    { phase: 'Phase 2', title: 'Growth', items: ['DEX Listings', 'NFT Collection', 'Partnerships'], completed: true },
    { phase: 'Phase 3', title: 'Expansion', items: ['CEX Listings', 'Marketing Campaign', 'Merchandise'], completed: false },
    { phase: 'Phase 4', title: 'Evolution', items: ['Yi Ecosystem', 'DAO Governance', 'Global Events'], completed: false }
  ];

  return (
    <section id="partners" className="partners-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Partnerships & Integrations</h2>
          <p className="partners-subtitle">
            Building the Yi ecosystem with industry-leading partners
          </p>
        </motion.div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="partner-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="partner-logo">{partner.logo}</div>
              <div className="partner-info">
                <h3 className="partner-name">{partner.name}</h3>
                <span className="partner-type">{partner.type}</span>
                <p className="partner-desc">{partner.description}</p>
              </div>
              <span className={`partner-status ${partner.status.toLowerCase()}`}>
                <CheckCircle size={14} />
                {partner.status}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="exchanges-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="exchanges-title">
            <span>Exchange Listings</span>
            <span className="exchanges-subtitle">Where to trade $Yi</span>
          </h3>
          <div className="exchanges-grid">
            {exchanges.map((exchange, index) => (
              <div key={exchange.name} className={`exchange-card ${exchange.status.toLowerCase()}`}>
                <span className="exchange-logo">{exchange.logo}</span>
                <span className="exchange-name">{exchange.name}</span>
                <span className={`exchange-status ${exchange.status.toLowerCase()}`}>
                  {exchange.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="roadmap-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="roadmap-title">Evolution Roadmap</h3>
          <div className="roadmap-grid">
            {roadmapItems.map((item, index) => (
              <div key={item.phase} className={`roadmap-card ${item.completed ? 'completed' : ''}`}>
                <div className="roadmap-header">
                  <span className="roadmap-phase">{item.phase}</span>
                  <span className="roadmap-phase-title">{item.title}</span>
                  {item.completed && <CheckCircle size={20} className="completed-icon" />}
                </div>
                <ul className="roadmap-items">
                  {item.items.map((listItem, i) => (
                    <li key={i}>
                      <CheckCircle size={14} />
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="partner-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Handshake size={48} className="cta-icon" />
          <h3>Want to Partner with $Yi?</h3>
          <p>We're always looking for innovative projects to collaborate with</p>
          <a href="mailto:partners@yidinosaur.com" className="btn-primary">
            Contact Us <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
