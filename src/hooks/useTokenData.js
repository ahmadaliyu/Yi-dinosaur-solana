import { useState, useEffect, useCallback } from 'react';
import {
  fetchCoinGeckoData,
  fetchDexScreenerData,
  fetchSolanaTokenData,
  fetchAllData,
} from '../services/api';

// Hook for fetching all token data
export const useTokenData = (refreshInterval = 30000) => {
  const [data, setData] = useState({
    coinGecko: null,
    dexScreener: null,
    solana: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchAllData();
      setData({
        ...result,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { ...data, refetch: fetchData };
};

// Hook for DexScreener data only (faster updates)
export const useDexData = (pairAddress, refreshInterval = 10000) => {
  const [data, setData] = useState({
    price: 0,
    priceChange24h: 0,
    volume24h: 0,
    liquidity: 0,
    txns24h: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDexScreenerData(pairAddress);
        if (result) {
          setData({
            ...result,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [pairAddress, refreshInterval]);

  return data;
};

// Hook for simulated real-time view counter
// Uses actual data as base, then simulates real-time increments
export const useRealtimeViews = (baseViews = 0, incrementRange = [1, 5], intervalMs = 500) => {
  const [views, setViews] = useState(baseViews);

  useEffect(() => {
    setViews(baseViews);
  }, [baseViews]);

  useEffect(() => {
    const interval = setInterval(() => {
      const [min, max] = incrementRange;
      const increment = Math.floor(Math.random() * (max - min + 1)) + min;
      setViews(prev => prev + increment);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [incrementRange, intervalMs]);

  return views;
};

// Hook for formatting large numbers
export const useFormattedNumber = (number, options = {}) => {
  const { compact = false, decimals = 2 } = options;

  if (compact) {
    if (number >= 1e9) return `${(number / 1e9).toFixed(decimals)}B`;
    if (number >= 1e6) return `${(number / 1e6).toFixed(decimals)}M`;
    if (number >= 1e3) return `${(number / 1e3).toFixed(decimals)}K`;
  }

  return number.toLocaleString();
};

export default {
  useTokenData,
  useDexData,
  useRealtimeViews,
  useFormattedNumber,
};
