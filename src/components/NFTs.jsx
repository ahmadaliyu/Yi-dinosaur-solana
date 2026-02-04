import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';
import './NFTs.css';

const NFTs = () => {
  const nftCollections = [
    {
      id: 1,
      name: 'Yi Genesis',
      image: '🦕',
      items: 1000,
      floor: '2.5 SOL',
      description: 'The original Yi dinosaur collection',
      rarity: 'Legendary'
    },
    {
      id: 2,
      name: 'Wing Warriors',
      image: '🪶',
      items: 5000,
      floor: '0.8 SOL',
      description: 'Bat-winged Yi warriors ready for battle',
      rarity: 'Epic'
    },
    {
      id: 3,
      name: 'Jurassic Punks',
      image: '🎸',
      items: 10000,
      floor: '0.3 SOL',
      description: 'Punk rock meets prehistoric',
      rarity: 'Rare'
    },
    {
      id: 4,
      name: 'Yi Artifacts',
      image: '💎',
      items: 500,
      floor: '5.0 SOL',
      description: 'Ancient fossilized treasures',
      rarity: 'Mythic'
    }
  ];

  const featuredNFTs = [
    { id: 1, name: 'Yi Alpha #001', price: '50 SOL', emoji: '👑' },
    { id: 2, name: 'Golden Wing #042', price: '25 SOL', emoji: '✨' },
    { id: 3, name: 'Cyber Yi #777', price: '15 SOL', emoji: '🤖' },
    { id: 4, name: 'Fossil King #100', price: '30 SOL', emoji: '🦴' },
    { id: 5, name: 'Neon Dino #369', price: '12 SOL', emoji: '💜' },
    { id: 6, name: 'Ice Yi #222', price: '18 SOL', emoji: '❄️' }
  ];

  return (
    <section id="nfts" className="nfts-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Yi NFT Collections</h2>
          <p className="nfts-subtitle">
            Own a piece of prehistoric evolution. Each Yi NFT is a unique digital fossil 
            powered by the Solana blockchain.
          </p>
        </motion.div>

        <div className="collections-grid">
          {nftCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="collection-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="collection-image">
                <span className="collection-emoji">{collection.image}</span>
                <span className={`rarity-badge ${collection.rarity.toLowerCase()}`}>
                  {collection.rarity}
                </span>
              </div>
              <div className="collection-info">
                <h3 className="collection-name">{collection.name}</h3>
                <p className="collection-desc">{collection.description}</p>
                <div className="collection-stats">
                  <div className="stat">
                    <span className="stat-value">{collection.items.toLocaleString()}</span>
                    <span className="stat-label">Items</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{collection.floor}</span>
                    <span className="stat-label">Floor</span>
                  </div>
                </div>
                <a href="https://magiceden.io" target="_blank" rel="noopener noreferrer" className="collection-link">
                  <ShoppingBag size={16} />
                  View Collection
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="featured-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="featured-header">
            <h3>
              <Sparkles size={24} />
              Featured NFTs
            </h3>
            <a href="https://magiceden.io" target="_blank" rel="noopener noreferrer">
              View All <ExternalLink size={16} />
            </a>
          </div>
          <div className="featured-grid">
            {featuredNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                className="featured-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="featured-image">
                  <span>{nft.emoji}</span>
                </div>
                <div className="featured-info">
                  <span className="featured-name">{nft.name}</span>
                  <span className="featured-price">{nft.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="nft-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="nft-cta-content">
            <h3>Trade Yi NFTs on Magic Eden</h3>
            <p>The premier Solana NFT marketplace</p>
          </div>
          <a href="https://magiceden.io" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <img src="https://magiceden.io/favicon.ico" alt="Magic Eden" width="20" height="20" onError={(e) => e.target.style.display = 'none'} />
            Explore on Magic Eden
            <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NFTs;
