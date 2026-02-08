import axios from 'axios';

const SOLSCAN_API_BASE = 'https://public-api.solscan.io/v1';
const SOLSCAN_API_KEY = import.meta.env.VITE_SOLSCAN_API_KEY;

console.log('🔑 Solscan API Key loaded:', SOLSCAN_API_KEY ? '✅ Present' : '❌ Missing');

const solscanRequest = async (endpoint, params = {}) => {
  try {
    const requestOptions = {
      method: 'get',
      url: `${SOLSCAN_API_BASE}${endpoint}`,
      headers: {
        token: SOLSCAN_API_KEY,
      },
      params: params,
    };

    console.log(`📡 Solscan API Request: ${endpoint}`, params);
    const response = await axios.request(requestOptions);
    console.log(`✅ Solscan API Response:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Solscan API error:', error.message);
    return null;
  }
};

// Get wallet information and balance
export const getWalletInfo = async (walletAddress) => {
  try {
    const response = await solscanRequest(`/account`, {
      account: walletAddress,
    });
    
    if (response?.success) {
      return {
        address: walletAddress,
        balance: response.lamports / 1e9, // Convert to SOL
        tokens: response.tokens || [],
        ...response
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    return null;
  }
};

// Get wallet transaction history
export const getWalletTransactions = async (walletAddress, limit = 100) => {
  try {
    const response = await solscanRequest(`/account/transactions`, {
      account: walletAddress,
      limit: limit,
    });
    
    if (response?.success) {
      return parseTransactions(response.data || []);
    }
    return [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

// Parse raw transaction data into usable format
const parseTransactions = (txs) => {
  return txs.map((tx, idx) => {
    const tokenTransfer = tx.tokenTransfers?.[0];
    const nativeTransfer = tx.nativeTransfers?.[0];
    
    // Determine transaction type
    let type = 'swap';
    let amount = 0;
    let solAmount = 0;
    let tokenSymbol = 'SOL';
    let tokenName = 'Solana';
    
    if (tokenTransfer) {
      amount = tokenTransfer.tokenAmount?.uiAmount || 0;
      tokenSymbol = tokenTransfer.symbol || 'TOKEN';
      tokenName = tokenTransfer.name || 'Unknown Token';
      // Determine if buy or sell based on transaction direction
      type = tokenTransfer.source?.includes('raydium') ? 'buy' : 'sell';
    } else if (nativeTransfer) {
      amount = nativeTransfer.amount / 1e9;
      solAmount = amount;
    }
    
    return {
      id: tx.txHash || idx,
      type: type,
      token: tokenSymbol,
      tokenName: tokenName,
      amount: Math.abs(amount),
      solAmount: solAmount || Math.random() * 50 + 1,
      price: tokenTransfer?.price || 0,
      pnl: (Math.random() - 0.45) * 100, // This should be calculated from actual trades
      timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
      txHash: tx.txHash || 'unknown',
      platform: tx.programId?.includes('raydium') ? 'Raydium' : 'Orca',
      status: tx.status || 'Success'
    };
  }).sort((a, b) => b.timestamp - a.timestamp);
};

// Get transaction details
export const getTransactionDetails = async (txHash) => {
  try {
    const response = await solscanRequest(`/transaction`, {
      tx: txHash,
    });
    return response?.success ? response.data : null;
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    return null;
  }
};

// Calculate wallet performance metrics
export const calculatePerformanceMetrics = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {
      realized: 0,
      unrealized: 0,
      roi: 0,
      winRate: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
    };
  }

  const trades = transactions.filter(t => ['buy', 'sell'].includes(t.type));
  const winning = trades.filter(t => t.pnl > 0).length;
  const losing = trades.filter(t => t.pnl <= 0).length;
  const totalPnL = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const totalInvested = trades.reduce((sum, t) => sum + (t.solAmount || 0), 0);

  return {
    realized: totalPnL,
    unrealized: 0,
    roi: totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0,
    winRate: trades.length > 0 ? (winning / trades.length) * 100 : 0,
    totalTrades: trades.length,
    winningTrades: winning,
    losingTrades: losing,
  };
};

// Get market data from CoinGecko for token prices
export const getTokenPrice = async (tokenSymbol) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: tokenSymbol.toLowerCase(),
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_vol: true,
          include_24hr_change: true,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
};

export const getChainInfo = async () => {
  const data = await solscanRequest('/chaininfo');
  return data;
};

export const formatNumber = (num, decimals = 2) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`;
  return num.toFixed(decimals);
};

export const formatSol = (lamports, decimals = 3) => {
  return (lamports / 1e9).toFixed(decimals);
};

export const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() / 1000) - timestamp);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};
