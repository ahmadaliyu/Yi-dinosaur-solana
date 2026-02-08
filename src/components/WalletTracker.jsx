import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  Coins,
  Target,
  Award,
  Timer,
  PieChart,
  Filter,
  Calendar,
  Eye,
  Lock,
  Crown,
  Star,
  AlertCircle,
  Zap
} from 'lucide-react';
import {
  getWalletInfo,
  getWalletTransactions,
  calculatePerformanceMetrics,
  formatTimeAgo,
  formatNumber,
} from '../services/solscanApi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import './WalletTracker.css';

const WalletTracker = () => {
  const [activeTab, setActiveTab] = useState('tracker'); // tracker, leaderboard, tokens
  const [searchAddress, setSearchAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [walletData, setWalletData] = useState(null);
  
  // Filter states
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d'); // 1d, 7d, 30d
  const [tradeFilter, setTradeFilter] = useState('all'); // all, buy, sell
  const [sortBy, setSortBy] = useState('pnl'); // pnl, roi, date
  const [showMore, setShowMore] = useState(false);
  
  // Multi-wallet tracking
  const [trackedWallets, setTrackedWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  
  // Premium features
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const isPremium = false; // TODO: Check token holdings or subscription status
  const leaderboardData = [
    {
      rank: 1,
      wallet: 'J7wR...2xKp',
      fullAddress: 'J7wR8jK2xKp9mL3qR5sT7uV9wX1yZ3aB5cD7eF9gH2xKp',
      realizedPnL: 1250000,
      roi: 324,
      trades: 487,
      winRate: 68.5,
      timeframe: '30d',
      trend: 'up'
    },
    {
      rank: 2,
      wallet: 'K9mQ...5pLx',
      fullAddress: 'K9mQ3nR7sT1uV5wX9yZ2aB4cD6eF8gH0jK2lM4nO6pLx',
      realizedPnL: 890000,
      roi: 287,
      trades: 234,
      winRate: 65.2,
      timeframe: '30d',
      trend: 'up'
    },
    {
      rank: 3,
      wallet: 'L4nP...8rQy',
      fullAddress: 'L4nP2oQ6rS8tU0vW4xY6zAcD8eF0gH2jK4lM6nO8pQy',
      realizedPnL: 654000,
      roi: 245,
      trades: 156,
      winRate: 62.1,
      timeframe: '30d',
      trend: 'down'
    },
  ];

  // Sample token data
  const trendingTokens = [
    {
      address: 'EPjFWaLb3odcccccccccccccccccccccccccccccccc',
      name: 'USDC',
      symbol: 'USDC',
      holders: 125000,
      volume24h: 45000000,
      priceChange24h: 0.02,
      trend: 'up',
      icon: '💵'
    },
    {
      address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BEnLc',
      name: 'Wrapped USDT',
      symbol: 'USDT',
      holders: 98000,
      volume24h: 38000000,
      priceChange24h: 0.01,
      trend: 'up',
      icon: '💳'
    },
    {
      address: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
      name: 'Mango',
      symbol: 'MNGO',
      holders: 45000,
      volume24h: 12000000,
      priceChange24h: 5.2,
      trend: 'up',
      icon: '🥭'
    },
  ];

  // Handle search for wallet address
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchAddress.trim()) {
      showErrorToast('Please enter a wallet address');
      return;
    }

    // Basic Solana address validation (base58, 32-44 chars)
    if (searchAddress.length < 32 || searchAddress.length > 44) {
      showErrorToast('Invalid Solana wallet address (32-44 characters)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Fetching wallet data from Solscan for:', searchAddress);
      
      // Fetch wallet info and transactions from Solscan API
      const [walletInfo, transactions] = await Promise.all([
        getWalletInfo(searchAddress),
        getWalletTransactions(searchAddress, 100)
      ]);
      
      if (walletInfo && transactions) {
        console.log('✅ Wallet Info:', walletInfo);
        console.log('✅ Transactions:', transactions);
        
        // Calculate performance metrics from transactions
        const pnlStats = calculatePerformanceMetrics(transactions);
        
        // Calculate performance by timeframe
        const now = Date.now();
        const performanceByTimeframe = {
          '1d': calculatePerformanceMetrics(
            transactions.filter(t => (now - t.timestamp) <= 86400000)
          ),
          '7d': calculatePerformanceMetrics(
            transactions.filter(t => (now - t.timestamp) <= 604800000)
          ),
          '30d': calculatePerformanceMetrics(
            transactions.filter(t => (now - t.timestamp) <= 2592000000)
          ),
        };

        const realWalletData = {
          address: searchAddress,
          balance: walletInfo.balance || 0,
          trades: transactions,
          pnlStats: {
            realized: pnlStats.realized,
            unrealized: pnlStats.unrealized,
            roi: pnlStats.roi,
            winRate: pnlStats.winRate,
            totalTrades: pnlStats.totalTrades,
            winningTrades: pnlStats.winningTrades,
            losingTrades: pnlStats.losingTrades,
          },
          performanceByTimeframe: {
            '1d': { pnl: performanceByTimeframe['1d'].realized, roi: performanceByTimeframe['1d'].roi },
            '7d': { pnl: performanceByTimeframe['7d'].realized, roi: performanceByTimeframe['7d'].roi },
            '30d': { pnl: performanceByTimeframe['30d'].realized, roi: performanceByTimeframe['30d'].roi },
          }
        };
        
        setWalletData(realWalletData);
        setSelectedWallet(searchAddress);
        setShowMore(false);
      } else {
        showErrorToast('Failed to fetch wallet data. Please check the address.');
      }
    } catch (err) {
      console.error('❌ Error fetching wallet information:', err);
      showErrorToast('Error fetching wallet information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show error toast
  const showErrorToast = (message) => {
    setError(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => setError(null), 300);
    }, 4000);
  };

  // Add wallet to tracking
  const addTrackedWallet = () => {
    if (searchAddress && !trackedWallets.includes(searchAddress)) {
      setTrackedWallets([...trackedWallets, searchAddress]);
    }
  };

  // Remove wallet from tracking
  const removeTrackedWallet = (wallet) => {
    setTrackedWallets(trackedWallets.filter(w => w !== wallet));
    if (selectedWallet === wallet) {
      setSelectedWallet(null);
      setWalletData(null);
    }
  };

  // Copy address
  const copyAddress = () => {
    navigator.clipboard.writeText(walletData?.address || searchAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter and sort trades
  const getFilteredTrades = () => {
    let filtered = walletData?.trades || [];
    
    // Filter by trade type
    if (tradeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === tradeFilter);
    }

    // Filter by timeframe
    const now = Date.now();
    const timeframeMs = {
      '1d': 86400000,
      '7d': 604800000,
      '30d': 2592000000,
    };
    filtered = filtered.filter(t => (now - t.timestamp) <= timeframeMs[selectedTimeframe]);

    // Sort
    if (sortBy === 'pnl') {
      filtered.sort((a, b) => b.pnl - a.pnl);
    } else if (sortBy === 'roi') {
      filtered.sort((a, b) => {
        const aRoi = (a.pnl / a.solAmount) * 100;
        const bRoi = (b.pnl / b.solAmount) * 100;
        return bRoi - aRoi;
      });
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    return filtered;
  };

  // Shorten address for display
  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <section id="tracker" className="tracker-section section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tracker-header"
        >
          <h2 className="section-title">
            <Zap size={32} style={{ display: 'inline-block', marginRight: '12px' }} />
            Wallet Tracker & Analytics
          </h2>
          <p className="section-subtitle">
            Track wallet performance, view trading history, and discover top traders
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="tracker-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button
            className={`tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Activity size={18} />
            <span>Wallet Tracker</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Award size={18} />
            <span>Leaderboard</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            <Coins size={18} />
            <span>Trending Tokens</span>
          </button>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* TRACKER TAB */}
          {activeTab === 'tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Wallet Connect CTA */}
              {!connected && (
                <motion.div className="connect-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Wallet size={20} />
                  <span>Connect your wallet for personalized insights</span>
                  <button className="cta-btn" onClick={() => setVisible(true)}>
                    Connect Wallet
                  </button>
                </motion.div>
              )}

              {/* Search Bar */}
              <motion.form
                className="tracker-search"
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="search-input-wrapper">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Enter Solana wallet address..."
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="search-input"
                  />
                  {searchAddress && (
                    <button
                      type="button"
                      className="clear-btn"
                      onClick={() => setSearchAddress('')}
                    >
                      ×
                    </button>
                  )}
                </div>
                <button type="submit" className="search-btn" disabled={loading}>
                  {loading ? (
                    <RefreshCw size={20} className="spinning" />
                  ) : (
                    <>
                      <Search size={18} />
                      Track Wallet
                    </>
                  )}
                </button>
              </motion.form>

              {/* Toast Notification */}
              <AnimatePresence>
                {showToast && error && (
                  <motion.div
                    className="error-toast"
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="toast-content">
                      <AlertCircle size={18} />
                      <span className="toast-message">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tracked Wallets List */}
              {trackedWallets.length > 0 && (
                <motion.div
                  className="tracked-wallets-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Tracked Wallets</h3>
                  <div className="wallets-grid">
                    {trackedWallets.map((wallet) => (
                      <div
                        key={wallet}
                        className={`wallet-chip ${selectedWallet === wallet ? 'active' : ''}`}
                        onClick={() => setSelectedWallet(wallet)}
                      >
                        <Wallet size={14} />
                        <span>{shortenAddress(wallet)}</span>
                        <button
                          className="remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTrackedWallet(wallet);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Wallet Data Display */}
              {walletData && (
                <motion.div
                  className="wallet-data"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Wallet Header */}
                  <div className="wallet-header">
                    <div className="wallet-info">
                      <h3>Wallet Performance</h3>
                      <div className="wallet-address">
                        <code>{walletData.address}</code>
                        <button className="copy-btn" onClick={copyAddress} title="Copy address">
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                    <button className="add-to-track-btn" onClick={addTrackedWallet}>
                      <Star size={16} />
                      {trackedWallets.includes(walletData.address) ? 'Tracked' : 'Add to Track'}
                    </button>
                  </div>

                  {/* Performance Stats */}
                  <div className="performance-grid">
                    <motion.div className="perf-card" whileHover={{ y: -5 }}>
                      <div className="perf-label">Realized PnL</div>
                      <div className={`perf-value ${walletData.pnlStats.realized > 0 ? 'positive' : 'negative'}`}>
                        <TrendingUp size={20} />
                        ${walletData.pnlStats.realized.toFixed(2)}
                      </div>
                      <div className="perf-detail">All time</div>
                    </motion.div>

                    <motion.div className="perf-card" whileHover={{ y: -5 }}>
                      <div className="perf-label">ROI</div>
                      <div className={`perf-value ${walletData.pnlStats.roi > 0 ? 'positive' : 'negative'}`}>
                        <TrendingUp size={20} />
                        {walletData.pnlStats.roi.toFixed(1)}%
                      </div>
                      <div className="perf-detail">Return on Investment</div>
                    </motion.div>

                    <motion.div className="perf-card" whileHover={{ y: -5 }}>
                      <div className="perf-label">Win Rate</div>
                      <div className="perf-value">
                        <Target size={20} />
                        {walletData.pnlStats.winRate.toFixed(1)}%
                      </div>
                      <div className="perf-detail">{walletData.pnlStats.winningTrades}/{walletData.pnlStats.totalTrades}</div>
                    </motion.div>

                    <motion.div className="perf-card" whileHover={{ y: -5 }}>
                      <div className="perf-label">Total Trades</div>
                      <div className="perf-value">
                        <Activity size={20} />
                        {walletData.pnlStats.totalTrades}
                      </div>
                      <div className="perf-detail">Last 30 days</div>
                    </motion.div>
                  </div>

                  {/* Timeframe Performance */}
                  <div className="timeframe-perf">
                    <h4>Performance by Timeframe</h4>
                    <div className="timeframe-grid">
                      {Object.entries(walletData.performanceByTimeframe).map(([timeframe, stats]) => (
                        <div key={timeframe} className="timeframe-card">
                          <div className="tf-label">{timeframe}</div>
                          <div className={`tf-pnl ${stats.pnl > 0 ? 'positive' : 'negative'}`}>
                            ${stats.pnl.toFixed(2)}
                          </div>
                          <div className="tf-roi">{stats.roi.toFixed(1)}% ROI</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filters and Controls */}
                  <div className="filters-section">
                    <div className="filter-group">
                      <label>Timeframe</label>
                      <div className="filter-buttons">
                        {['1d', '7d', '30d'].map(tf => (
                          <button
                            key={tf}
                            className={`filter-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                            onClick={() => setSelectedTimeframe(tf)}
                          >
                            <Calendar size={14} />
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="filter-group">
                      <label>Trade Type</label>
                      <div className="filter-buttons">
                        {[
                          { value: 'all', label: 'All', icon: Activity },
                          { value: 'buy', label: 'Buys', icon: ArrowDownLeft },
                          { value: 'sell', label: 'Sells', icon: ArrowUpRight }
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            className={`filter-btn ${tradeFilter === value ? 'active' : ''}`}
                            onClick={() => setTradeFilter(value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="filter-group">
                      <label>Sort By</label>
                      <div className="filter-buttons">
                        {[
                          { value: 'pnl', label: 'PnL' },
                          { value: 'roi', label: 'ROI' },
                          { value: 'date', label: 'Date' }
                        ].map(({ value, label }) => (
                          <button
                            key={value}
                            className={`filter-btn ${sortBy === value ? 'active' : ''}`}
                            onClick={() => setSortBy(value)}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Transactions List */}
                  <div className="transactions-list">
                    <h4>Transaction History ({getFilteredTrades().length})</h4>
                    <div className="trades-table">
                      <div className="table-header">
                        <div className="col-type">Type</div>
                        <div className="col-token">Token</div>
                        <div className="col-amount">Amount</div>
                        <div className="col-price">Price (SOL)</div>
                        <div className="col-pnl">PnL</div>
                        <div className="col-time">Time</div>
                        <div className="col-action">Action</div>
                      </div>
                      {getFilteredTrades().slice(0, showMore ? undefined : 10).map((trade, idx) => (
                        <motion.div
                          key={trade.id}
                          className="table-row"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="col-type">
                            <span className={`trade-badge ${trade.type}`}>
                              {trade.type === 'buy' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                              {trade.type.toUpperCase()}
                            </span>
                          </div>
                          <div className="col-token">
                            <div className="token-info">
                              <span className="token-symbol">{trade.token}</span>
                              <span className="token-name">{trade.tokenName}</span>
                            </div>
                          </div>
                          <div className="col-amount">{formatNumber(trade.amount)}</div>
                          <div className="col-price">{trade.solAmount.toFixed(2)}</div>
                          <div className={`col-pnl ${trade.pnl > 0 ? 'positive' : 'negative'}`}>
                            {trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                          </div>
                          <div className="col-time">{formatTimeAgo(Math.floor(trade.timestamp / 1000))}</div>
                          <div className="col-action">
                            <a
                              href={`https://solscan.io/tx/${trade.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-link"
                              title="View on Solscan"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {getFilteredTrades().length > 10 && (
                      <button className="load-more-btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Load More'}
                      </button>
                    )}
                  </div>

                  {/* Premium Features Banner */}
                  {!isPremium && (
                    <motion.div className="premium-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Crown size={20} />
                      <div>
                        <h4>Unlock Premium Features</h4>
                        <p>Advanced alerts, live terminals, and expanded leaderboards</p>
                      </div>
                      <button className="premium-btn">Upgrade Now</button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Empty State */}
              {!walletData && !loading && (
                <motion.div
                  className="tracker-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Activity size={48} />
                  <p>Enter a wallet address to start tracking performance</p>
                  <p className="placeholder-hint">Paste any Solana wallet address above</p>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  className="loading-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <RefreshCw size={32} className="spinning" />
                  <p>Loading wallet data...</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* LEADERBOARD TAB */}
          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="leaderboard-section">
                <div className="leaderboard-header">
                  <h3>Top Traders Leaderboard</h3>
                  <div className="leaderboard-controls">
                    <select value={selectedTimeframe} onChange={(e) => setSelectedTimeframe(e.target.value)}>
                      <option value="1d">Last 24h</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>
                </div>

                <div className="leaderboard-list">
                  {leaderboardData.map((trader, idx) => (
                    <motion.div
                      key={trader.rank}
                      className="leaderboard-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="rank-badge">
                        {idx === 0 && <Crown size={20} />}
                        {idx === 1 && <Award size={20} />}
                        {idx === 2 && <Star size={20} />}
                        {idx >= 3 && <span>#{trader.rank}</span>}
                      </div>

                      <div className="trader-info">
                        <div className="trader-address">{trader.wallet}</div>
                        <div className="trader-stats">
                          <span className="stat">{trader.trades} trades</span>
                          <span className="divider">•</span>
                          <span className="stat">{trader.winRate}% win</span>
                        </div>
                      </div>

                      <div className="trader-metrics">
                        <div className="metric">
                          <span className="label">Realized PnL</span>
                          <span className={`value positive`}>${(trader.realizedPnL / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="metric">
                          <span className="label">ROI</span>
                          <span className={`value positive`}>{trader.roi}%</span>
                        </div>
                        <div className="metric trend">
                          <span className={`trend-indicator ${trader.trend}`}>
                            {trader.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          </span>
                        </div>
                      </div>

                      <button className="track-trader-btn" onClick={() => {
                        setSearchAddress(trader.fullAddress);
                        setActiveTab('tracker');
                      }}>
                        Track
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TRENDING TOKENS TAB */}
          {activeTab === 'tokens' && (
            <motion.div
              key="tokens"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="tokens-section">
                <h3>Trending Tokens</h3>
                <div className="tokens-grid">
                  {trendingTokens.map((token, idx) => (
                    <motion.div
                      key={token.address}
                      className="token-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="token-header">
                        <div className="token-icon">{token.icon}</div>
                        <div className="token-name-info">
                          <div className="name">{token.name}</div>
                          <div className="symbol">{token.symbol}</div>
                        </div>
                        <div className={`price-change ${token.trend}`}>
                          {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                        </div>
                      </div>

                      <div className="token-stats">
                        <div className="stat">
                          <span className="label">Holders</span>
                          <span className="value">{formatNumber(token.holders)}</span>
                        </div>
                        <div className="stat">
                          <span className="label">24h Volume</span>
                          <span className="value">${formatNumber(token.volume24h / 1000000)}M</span>
                        </div>
                      </div>

                      <button className="token-action-btn">View Token</button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WalletTracker;
