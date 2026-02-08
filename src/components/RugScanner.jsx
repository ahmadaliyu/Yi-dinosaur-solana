import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
  Lock,
  Eye,
  Users,
  Zap,
  Shield,
  Flame,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  AlertCircle,
  Info,
} from 'lucide-react';
import './RugScanner.css';

const RugScanner = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Show error toast
  const showErrorToast = (message) => {
    setError(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => setError(null), 300);
    }, 4000);
  };

  // Handle token scan
  const handleScan = async (e) => {
    e.preventDefault();

    if (!tokenAddress.trim()) {
      showErrorToast('Please enter a token address');
      return;
    }

    // Basic validation
    if (tokenAddress.length < 32 || tokenAddress.length > 44) {
      showErrorToast('Invalid token address (32-44 characters)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Scanning token for rugpull risks:', tokenAddress);

      // Generate mock scan result for now
      // TODO: Replace with real token analysis API
      const mockScanResult = generateMockScanResult(tokenAddress);

      setScanResult(mockScanResult);
      setActiveTab('overview');
    } catch (err) {
      console.error('❌ Error scanning token:', err);
      showErrorToast('Error scanning token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate realistic mock scan data
  const generateMockScanResult = (address) => {
    const riskFactors = {
      high: [
        {
          name: 'Mint Authority',
          description: 'Token can mint unlimited new supply',
          severity: 'high',
          details: 'The contract has an active mint function that allows unlimited token creation',
        },
        {
          name: 'Freeze Authority',
          description: 'Wallet funds can be frozen',
          severity: 'high',
          details: 'The token creator can freeze any wallet, preventing transfers',
        },
      ],
      medium: [
        {
          name: 'High Ownership Concentration',
          description: 'Top 10 holders own >80% of supply',
          severity: 'medium',
          details: '80% of tokens held by 10 addresses - high rugpull risk',
        },
        {
          name: 'Liquidity Pool Risk',
          description: 'Liquidity pool is small',
          severity: 'medium',
          details: 'LP value is only $10,000 - easy to manipulate price',
        },
      ],
      low: [
        {
          name: 'Creator Verification',
          description: 'Creator has no on-chain history',
          severity: 'low',
          details: 'New wallet created recently - verify legitimacy',
        },
        {
          name: 'Contract Age',
          description: 'Contract deployed recently',
          severity: 'low',
          details: 'Token deployed only 2 days ago - monitor for suspicious activity',
        },
      ],
    };

    // Randomly select factors
    const selectedHigh = riskFactors.high.slice(0, Math.random() > 0.5 ? 1 : 2);
    const selectedMedium = riskFactors.medium.slice(0, Math.random() > 0.7 ? 1 : 2);
    const selectedLow = riskFactors.low.slice(0, Math.random() > 0.6 ? 1 : 2);

    const totalRisks = selectedHigh.length + selectedMedium.length + selectedLow.length;

    // Calculate risk score
    const riskScore =
      selectedHigh.length * 35 +
      selectedMedium.length * 20 +
      selectedLow.length * 5;

    const riskLevel = riskScore > 60 ? 'very-high' : riskScore > 40 ? 'high' : riskScore > 20 ? 'medium' : 'low';

    return {
      address,
      name: 'Sample Token',
      symbol: 'SAMPLE',
      contractAddress: address,
      deployer: address.slice(0, 6) + '...' + address.slice(-4),
      deployDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      holders: Math.floor(Math.random() * 5000) + 100,
      liquidity: {
        total: Math.floor(Math.random() * 500000) + 10000,
        currency: 'SOL',
      },
      supply: {
        total: (Math.random() * 1000000000).toFixed(0),
        decimals: 6,
      },
      priceInfo: {
        price: (Math.random() * 0.001 + 0.00001).toFixed(8),
        marketCap: Math.floor(Math.random() * 50000000) + 100000,
        change24h: (Math.random() * 200 - 100).toFixed(2),
      },
      risks: {
        high: selectedHigh,
        medium: selectedMedium,
        low: selectedLow,
      },
      riskScore,
      riskLevel,
      totalRisks,
      checks: {
        transferFeeEnabled: Math.random() > 0.5,
        mintAuthorityDisabled: Math.random() > 0.5,
        freezeAuthorityDisabled: Math.random() > 0.5,
        lpLocked: Math.random() > 0.4,
        lpBurned: Math.random() > 0.6,
        renounced: Math.random() > 0.7,
        verified: Math.random() > 0.8,
      },
    };
  };

  // Copy address
  const copyAddress = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get risk color
  const getRiskColor = (level) => {
    switch (level) {
      case 'very-high':
        return '#ff4444';
      case 'high':
        return '#ff6b35';
      case 'medium':
        return '#ffa500';
      case 'low':
        return '#4caf50';
      default:
        return '#9c27b0';
    }
  };

  // Get risk label
  const getRiskLabel = (level) => {
    switch (level) {
      case 'very-high':
        return '🔴 Very High Risk';
      case 'high':
        return '🟠 High Risk';
      case 'medium':
        return '🟡 Medium Risk';
      case 'low':
        return '🟢 Low Risk';
      default:
        return '🟣 Unknown';
    }
  };

  return (
    <section id="rug-scanner" className="rug-scanner-section section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rug-scanner-header"
        >
          <h2 className="section-title">
            <Shield size={32} style={{ display: 'inline-block', marginRight: '12px' }} />
            Rug Scanner
          </h2>
          <p className="section-subtitle">
            Analyze tokens for scams, rugpull risks, and security vulnerabilities
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          className="scanner-search"
          onSubmit={handleScan}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Enter token contract address..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="scanner-input"
            />
            {tokenAddress && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setTokenAddress('')}
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="scan-btn" disabled={loading}>
            {loading ? (
              <RefreshCw size={20} className="spinning" />
            ) : (
              <>
                <Shield size={18} />
                Scan Token
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

        {/* Scan Results */}
        {scanResult && (
          <motion.div
            className="scan-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Risk Score Card */}
            <div className="risk-score-card">
              <div className="risk-score-content">
                <div className="risk-score-left">
                  <div
                    className="risk-score-circle"
                    style={{ borderColor: getRiskColor(scanResult.riskLevel) }}
                  >
                    <div className="risk-score-number" style={{ color: getRiskColor(scanResult.riskLevel) }}>
                      {scanResult.riskScore}
                    </div>
                    <div className="risk-score-label">Risk Score</div>
                  </div>
                </div>

                <div className="risk-score-middle">
                  <h3>{getRiskLabel(scanResult.riskLevel)}</h3>
                  <p>{scanResult.totalRisks} risk factor(s) detected</p>

                  {scanResult.riskLevel === 'very-high' && (
                    <div className="risk-warning">
                      ⚠️ This token shows significant red flags. Exercise extreme caution!
                    </div>
                  )}
                  {scanResult.riskLevel === 'high' && (
                    <div className="risk-warning">
                      ⚠️ This token has multiple risk factors. Be cautious.
                    </div>
                  )}
                  {scanResult.riskLevel === 'medium' && (
                    <div className="risk-warning">
                      ℹ️ This token has some risk factors. Do your own research.
                    </div>
                  )}
                  {scanResult.riskLevel === 'low' && (
                    <div className="risk-good">
                      ✓ This token appears relatively safe. Still DYOR!
                    </div>
                  )}
                </div>

                <div className="risk-score-right">
                  <div className="risk-checks">
                    <div className={`check-item ${scanResult.checks.lpBurned ? 'passed' : 'failed'}`}>
                      <Flame size={16} />
                      <span>LP Burned</span>
                    </div>
                    <div className={`check-item ${scanResult.checks.mintAuthorityDisabled ? 'passed' : 'failed'}`}>
                      <Lock size={16} />
                      <span>Mint Disabled</span>
                    </div>
                    <div className={`check-item ${scanResult.checks.renounced ? 'passed' : 'failed'}`}>
                      <CheckCircle size={16} />
                      <span>Ownership Renounced</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Info */}
            <div className="token-info-grid">
              <div className="info-card">
                <div className="info-label">Token Name</div>
                <div className="info-value">{scanResult.name} ({scanResult.symbol})</div>
              </div>
              <div className="info-card">
                <div className="info-label">Contract Address</div>
                <div className="info-value-with-copy">
                  <code>{scanResult.contractAddress}</code>
                  <button
                    className="copy-btn"
                    onClick={() => copyAddress(scanResult.contractAddress)}
                    title="Copy address"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="info-card">
                <div className="info-label">Deployer</div>
                <div className="info-value">{scanResult.deployer}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Deploy Date</div>
                <div className="info-value">{scanResult.deployDate}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Total Holders</div>
                <div className="info-value">{scanResult.holders.toLocaleString()}</div>
              </div>
              <div className="info-card">
                <div className="info-label">Market Cap</div>
                <div className="info-value">${(scanResult.priceInfo.marketCap / 1000000).toFixed(2)}M</div>
              </div>
            </div>

            {/* Tabs */}
            <motion.div className="scanner-tabs">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <Info size={18} />
                <span>Overview</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'risks' ? 'active' : ''}`}
                onClick={() => setActiveTab('risks')}
              >
                <AlertTriangle size={18} />
                <span>Risk Factors</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'checks' ? 'active' : ''}`}
                onClick={() => setActiveTab('checks')}
              >
                <CheckCircle size={18} />
                <span>Security Checks</span>
              </button>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  <div className="overview-grid">
                    <div className="metric-card">
                      <div className="metric-icon">
                        <DollarSign size={24} style={{ color: '#00d4ff' }} />
                      </div>
                      <div className="metric-details">
                        <div className="metric-label">Price</div>
                        <div className="metric-value">${scanResult.priceInfo.price}</div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon">
                        <BarChart3 size={24} style={{ color: '#00ff88' }} />
                      </div>
                      <div className="metric-details">
                        <div className="metric-label">24h Change</div>
                        <div
                          className={`metric-value ${
                            parseFloat(scanResult.priceInfo.change24h) > 0 ? 'positive' : 'negative'
                          }`}
                        >
                          {scanResult.priceInfo.change24h > 0 ? '+' : ''}{scanResult.priceInfo.change24h}%
                        </div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon">
                        <Zap size={24} style={{ color: '#ffa500' }} />
                      </div>
                      <div className="metric-details">
                        <div className="metric-label">Liquidity</div>
                        <div className="metric-value">${(scanResult.liquidity.total / 1000).toFixed(0)}K</div>
                      </div>
                    </div>

                    <div className="metric-card">
                      <div className="metric-icon">
                        <Users size={24} style={{ color: '#ff6b6b' }} />
                      </div>
                      <div className="metric-details">
                        <div className="metric-label">Holders</div>
                        <div className="metric-value">{(scanResult.holders / 1000).toFixed(1)}K</div>
                      </div>
                    </div>
                  </div>

                  <div className="overview-description">
                    <h4>📊 Token Overview</h4>
                    <p>
                      {scanResult.name} ({scanResult.symbol}) is a token deployed on Solana network.
                      This token has {scanResult.holders.toLocaleString()} holders and a market cap of $
                      {(scanResult.priceInfo.marketCap / 1000000).toFixed(2)}M. The liquidity pool contains
                      approximately {(scanResult.liquidity.total / 1000).toFixed(0)}K {scanResult.liquidity.currency}.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Risk Factors Tab */}
              {activeTab === 'risks' && (
                <motion.div
                  key="risks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  {scanResult.risks.high.length > 0 && (
                    <div className="risks-section">
                      <h4 className="risks-title high">🔴 High Risk Factors</h4>
                      <div className="risks-list">
                        {scanResult.risks.high.map((risk, idx) => (
                          <motion.div
                            key={idx}
                            className="risk-item high"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="risk-icon">
                              <XCircle size={20} />
                            </div>
                            <div className="risk-content">
                              <div className="risk-name">{risk.name}</div>
                              <div className="risk-description">{risk.description}</div>
                              <div className="risk-details">{risk.details}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {scanResult.risks.medium.length > 0 && (
                    <div className="risks-section">
                      <h4 className="risks-title medium">🟠 Medium Risk Factors</h4>
                      <div className="risks-list">
                        {scanResult.risks.medium.map((risk, idx) => (
                          <motion.div
                            key={idx}
                            className="risk-item medium"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="risk-icon">
                              <AlertTriangle size={20} />
                            </div>
                            <div className="risk-content">
                              <div className="risk-name">{risk.name}</div>
                              <div className="risk-description">{risk.description}</div>
                              <div className="risk-details">{risk.details}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {scanResult.risks.low.length > 0 && (
                    <div className="risks-section">
                      <h4 className="risks-title low">🟡 Low Risk Factors</h4>
                      <div className="risks-list">
                        {scanResult.risks.low.map((risk, idx) => (
                          <motion.div
                            key={idx}
                            className="risk-item low"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="risk-icon">
                              <Info size={20} />
                            </div>
                            <div className="risk-content">
                              <div className="risk-name">{risk.name}</div>
                              <div className="risk-description">{risk.description}</div>
                              <div className="risk-details">{risk.details}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Security Checks Tab */}
              {activeTab === 'checks' && (
                <motion.div
                  key="checks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="tab-content"
                >
                  <div className="checks-grid">
                    <div className={`check-card ${scanResult.checks.transferFeeEnabled ? 'warning' : 'safe'}`}>
                      <div className="check-header">
                        <h4>Transfer Fee</h4>
                        {scanResult.checks.transferFeeEnabled ? (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        ) : (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.transferFeeEnabled ? 'Enabled - May hide true cost' : 'Disabled - Safe'}</p>
                    </div>

                    <div className={`check-card ${scanResult.checks.mintAuthorityDisabled ? 'safe' : 'warning'}`}>
                      <div className="check-header">
                        <h4>Mint Authority</h4>
                        {scanResult.checks.mintAuthorityDisabled ? (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        ) : (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.mintAuthorityDisabled ? 'Disabled - Safe' : 'Enabled - Can create unlimited supply'}</p>
                    </div>

                    <div className={`check-card ${scanResult.checks.freezeAuthorityDisabled ? 'safe' : 'warning'}`}>
                      <div className="check-header">
                        <h4>Freeze Authority</h4>
                        {scanResult.checks.freezeAuthorityDisabled ? (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        ) : (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.freezeAuthorityDisabled ? 'Disabled - Safe' : 'Enabled - Can freeze wallets'}</p>
                    </div>

                    <div className={`check-card ${scanResult.checks.lpBurned ? 'safe' : 'warning'}`}>
                      <div className="check-header">
                        <h4>Liquidity Pool</h4>
                        {scanResult.checks.lpBurned ? (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        ) : (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.lpBurned ? 'Burned - Safe' : 'Not Burned - At Risk'}</p>
                    </div>

                    <div className={`check-card ${scanResult.checks.lpLocked ? 'safe' : 'warning'}`}>
                      <div className="check-header">
                        <h4>LP Locked</h4>
                        {scanResult.checks.lpLocked ? (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        ) : (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.lpLocked ? 'Locked - Safe' : 'Not Locked - May be withdrawn'}</p>
                    </div>

                    <div className={`check-card ${scanResult.checks.renounced ? 'safe' : 'warning'}`}>
                      <div className="check-header">
                        <h4>Ownership</h4>
                        {scanResult.checks.renounced ? (
                          <CheckCircle size={20} style={{ color: '#4caf50' }} />
                        ) : (
                          <XCircle size={20} style={{ color: '#ff6b6b' }} />
                        )}
                      </div>
                      <p>{scanResult.checks.renounced ? 'Renounced - Safe' : 'Not Renounced - Centralized'}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Research Button */}
            <div className="research-cta">
              <p>🔗 Always do your own research before investing!</p>
              <div className="research-buttons">
                <a
                  href={`https://solscan.io/token/${scanResult.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-btn solscan"
                >
                  <ExternalLink size={16} />
                  View on Solscan
                </a>
                <a
                  href={`https://rugcheck.xyz/tokens/solana/${scanResult.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-btn rugcheck"
                >
                  <ExternalLink size={16} />
                  Verify on RugCheck
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!scanResult && !loading && (
          <motion.div
            className="scanner-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Shield size={48} />
            <p>Enter a token contract address to scan for rugpull risks</p>
            <p className="placeholder-hint">Analyze security, ownership, and liquidity factors</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div className="loading-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RefreshCw size={32} className="spinning" />
            <p>Scanning token for risks...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RugScanner;
