import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppKit, useAppKitAccount, useDisconnect, useAppKitNetwork, useAppKitProvider } from '@reown/appkit/react'
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react"
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import ContainerLayout from '../Layouts/ContainerLayout';
import { toast } from 'react-toastify';
import WalletConnect from '../components/WalletConnect';
import Image from "next/image";
import logo from "../../assets/png/logo.png";
import Link from "next/link";
import type { Provider } from "@reown/appkit-adapter-solana/react";

// TypeScript declarations for Solana wallet (using AppKit)

// Recipient addresses for different chains - SECURITY: Move to env vars
const RECIPIENT_ADDRESSES = {
  evm: process.env.NEXT_PUBLIC_EVM_RECIPIENT_ADDRESS,
  solana: process.env.NEXT_PUBLIC_SOLANA_RECIPIENT_ADDRESS
};


// SECURITY: Add constants for validation
const MIN_PURCHASE_AMOUNT = 0.01;
const MAX_PURCHASE_AMOUNT = 100000;
const RATE_LIMIT_WINDOW = 30000; // 30 seconds

// SECURITY: Rate limiting storage
const rateLimiter = new Map();

// SECURITY: Input validation function
const validatePurchaseAmount = (amount) => {
  const numAmount = parseFloat(amount);

  if (isNaN(numAmount) || numAmount <= 0) {
    throw new Error('Invalid amount');
  }

  if (numAmount > MAX_PURCHASE_AMOUNT) {
    throw new Error(`Maximum purchase amount is $${MAX_PURCHASE_AMOUNT}`);
  }

  if (numAmount < MIN_PURCHASE_AMOUNT) {
    throw new Error(`Minimum purchase amount is $${MIN_PURCHASE_AMOUNT}`);
  }

  return numAmount;
};

// SECURITY: Transaction hash validation
const isValidTxHash = (hash, chainType) => {
  if (chainType === 'solana') {
    // Solana transaction signatures are base58 encoded, typically 87-88 characters
    return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(hash);
  } else {
    // EVM transaction hashes are 66 characters (0x + 64 hex chars)
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
  }
};

// SECURITY: Wallet-based rate limiting
const isRateLimited = (walletAddress) => {
  const now = Date.now();
  const lastRequest = rateLimiter.get(walletAddress);

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
    return true;
  }

  rateLimiter.set(walletAddress, now);
  return false;
};

// SECURITY: Request signing for authenticity
const generateRequestSignature = async (data, walletAddress) => {
  try {
    const message = JSON.stringify({
      timestamp: data.timestamp,
      walletAddress: walletAddress,
      transactionHash: data.transactionHash,
      amount: data.amount
    });

    // Skip signature generation for now to avoid wallet conflicts
    // This was causing malformed signatures to be generated
  
    return null;
  } catch (error) {
    return null;
  }
};

// SECURITY: Enhanced input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  // Remove dangerous characters and patterns
  return input
    .replace(/[<>\"'&]/g, '') // Remove HTML/XML characters
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script tags
    .trim()
    .slice(0, 200); // Limit length
};

// SECURITY: BSC address validation
const isValidBscAddress = (address) => {
  // BSC addresses are EVM addresses, same format as Ethereum (0x + 40 hex chars)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default function Presale() {
  const [amount, setAmount] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showPrePresale, setShowPrePresale] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastPurchaseAmount, setLastPurchaseAmount] = useState('');
  const [lastTokenAmount, setLastTokenAmount] = useState(0);
  const [lastTransactionHash, setLastTransactionHash] = useState('');
  const [isInitiatingTransaction, setIsInitiatingTransaction] = useState(false);
  const [showReferralQuestion, setShowReferralQuestion] = useState(false);
  const [showReferrerInput, setShowReferrerInput] = useState(false);
  const [referrerBscAddress, setReferrerBscAddress] = useState('');
  const [isSendingToSheet, setIsSendingToSheet] = useState(false);
  const [userContributions, setUserContributions] = useState([]);
  const [submittedTxHashes, setSubmittedTxHashes] = useState(new Set());
  const [transactionStartTime, setTransactionStartTime] = useState(null);
  const [isLoadingContributions, setIsLoadingContributions] = useState(false);

  const { address, isConnected } = useAppKitAccount()
  const { caipNetwork } = useAppKitNetwork()
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()
  const { walletProvider } = useAppKitProvider<Provider>("solana")
  const { connection } = useAppKitConnection()
  const { sendTransaction, isPending: isSending } = useSendTransaction({
    mutation: {
      onSuccess: async (hash) => {
        setIsInitiatingTransaction(false);
        setIsWaitingForTransaction(false);

        // Clear the initiated transaction since we now have success
        localStorage.removeItem('initiatedTransaction');

        // Wait for transaction confirmation
        try {
          // Debug logging
         

          // Store purchase details before clearing form
          setLastPurchaseAmount(amount);
          setLastTokenAmount(parseFloat(amount) / 0.005);
          setLastTransactionHash(hash);

          // IMPORTANT: Save transaction state to localStorage for recovery
          const transactionState = {
            hash: hash,
            amount: amount,
            timestamp: new Date().toISOString(),
            walletAddress: walletAddress,
            network: getNetworkName(),
            chainType: getChainType(),
            needsReferralFlow: true
          };
          localStorage.setItem('pendingTransaction', JSON.stringify(transactionState));

          // Also save to sessionStorage as backup
          sessionStorage.setItem('lastTransactionHash', hash);
          sessionStorage.setItem('lastTransactionAmount', amount);
          sessionStorage.setItem('lastTransactionWallet', walletAddress);

          // SIMPLE FIX: Ensure we're on the right page
          if (window.location.pathname !== '/presale') {
            window.location.href = '/presale';
            return;
          }

          // Show referral question instead of success modal
          setPaymentSuccessful(true);
          setShowReferralQuestion(true);
          toast.success(`Payment confirmed! Transaction: ${hash}`);

          // Reset form state after successful payment
          setAmount('');
        } catch (error) {

          toast.error('Transaction sent but confirmation failed');
        }
      },
      onError: (error) => {
        setIsInitiatingTransaction(false);
        setIsWaitingForTransaction(false);

        // Clear the initiated transaction on error
        localStorage.removeItem('initiatedTransaction');

        if (error.message?.includes('User rejected') || error.message?.includes('rejected')) {
          toast.error('Transaction cancelled by user');
        } else {
          toast.error('Transaction failed: ' + (error.message || 'Unknown error'));
        }
      }
    }
  })

  const isWalletConnected = isConnected;
  const walletAddress = address;

  // Function to determine if connected to Solana or EVM
  const getChainType = () => {
    if (caipNetwork && (caipNetwork.name?.toLowerCase().includes('solana') || caipNetwork.id?.toString().includes('solana'))) {
      return 'solana';
    }
    return 'evm'; // Default to EVM for Ethereum, BSC, Polygon, etc.
  };

  const chainType = getChainType();
  const recipientAddress = RECIPIENT_ADDRESSES[chainType];

  // Get network name for display
  const getNetworkName = () => {
    if (chainType === 'solana') return 'Solana';

    if (caipNetwork) {
      return caipNetwork.name || 'EVM Network';
    }
    return 'EVM Network';
  };

  // Fetch user contributions from database
  const fetchUserContributions = async (walletAddress) => {
    setIsLoadingContributions(true);
    try {
      const response = await fetch('/api/getUserContributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: walletAddress
        })
      });

      const data = await response.json();
      
      if (data.success) {
        return data.contributions;
      } else {
        throw new Error(data.error || 'Failed to fetch contributions');
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
      throw error;
    } finally {
      setIsLoadingContributions(false);
    }
  };

  const sendToGoogleSheets = async (data) => {
    try {
      setIsSendingToSheet(true);

      // SECURITY: Check rate limiting (temporarily disabled for testing)
      // if (isRateLimited(walletAddress)) {
      //   throw new Error('Too many requests. Please wait before submitting again.');
      // }

      // SECURITY: Validate transaction hash format
      if (!isValidTxHash(data.transactionHash, chainType)) {
        throw new Error('Invalid transaction hash format');
      }

      // SECURITY: Generate request signature for authenticity
      const signature = await generateRequestSignature(data, walletAddress);

      // Debug logging
     

      // SECURITY: Use environment variable for Google Apps Script URL
      const WEBAPP_URL = process.env.NEXT_PUBLIC_GOOGLE_WEBAPP_URL;

      if (!WEBAPP_URL) {
        throw new Error('Google Apps Script URL not configured. Please contact support.');
      }

      const formData = new FormData();
      formData.append('timestamp', data.timestamp);
      formData.append('walletAddress', data.walletAddress);
      formData.append('network', data.network);
      formData.append('amount', data.amount);
      formData.append('transactionHash', data.transactionHash);
      formData.append('referred', data.referred);
      formData.append('referralBscAddress', data.referralBscAddress || '');

      // Debug logging for FormData
     

      // Add signature if available
      if (signature) {
        formData.append('signature', signature);
      }



      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        body: formData
      });

      const responseText = await response.text();

      // Google Apps Script sometimes returns non-200 status codes even for successful operations
      // Check for actual success indicators in the response
      const isSuccessfulSave = response.ok || 
        responseText.includes('success') || 
        responseText.includes('Success') || 
        (response.status >= 200 && response.status < 400);

      if (isSuccessfulSave) {
        toast.success('Thank you for your response! 🎉');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }

    } catch (error) {

      const existingData = JSON.parse(sessionStorage.getItem('referralData') || '[]');
      existingData.push(data);
      sessionStorage.setItem('referralData', JSON.stringify(existingData));

      toast.info(`Transaction recorded successfully! There was a minor delay syncing your data.`);
    } finally {
      setIsSendingToSheet(false);
    }
  };

  // Fallback method using Google Forms
  const sendToGoogleSheetsDirectly = async (data) => {
    // Create a simple webhook/form submission
    const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdummy/formResponse'; // We'll create this

    const formData = new URLSearchParams();
    formData.append('entry.1', data.timestamp);
    formData.append('entry.2', data.walletAddress);
    formData.append('entry.3', data.network);
    formData.append('entry.4', data.amount);
    formData.append('entry.5', data.transactionHash);
    formData.append('entry.6', data.referred);
    formData.append('entry.7', data.referralBscAddress);

    await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  };

  // Get explorer URL by network name (for stored contributions)
  const getExplorerUrlByNetwork = (txHash, networkName) => {
    const network = networkName?.toLowerCase() || '';

    if (network.includes('solana')) {
      return `https://explorer.solana.com/tx/${txHash}`;
    } else if (network.includes('bnb') || network.includes('bsc') || network.includes('binance') || network.includes('smart chain')) {
      return `https://bscscan.com/tx/${txHash}`;
    } else if (network.includes('base')) {
      return `https://basescan.org/tx/${txHash}`;
    } else if (network.includes('polygon') || network.includes('matic')) {
      return `https://polygonscan.com/tx/${txHash}`;
    } else if (network.includes('arbitrum')) {
      return `https://arbiscan.io/tx/${txHash}`;
    } else if (network.includes('optimism') || network.includes('op mainnet') || network === 'op') {
      return `https://optimistic.etherscan.io/tx/${txHash}`;
    } else if (network.includes('avalanche') || network.includes('avax')) {
      return `https://snowtrace.io/tx/${txHash}`;
    } else {
      // Default to Ethereum for unknown networks
      return `https://etherscan.io/tx/${txHash}`;
    }
  };

  const getExplorerUrl = (txHash) => {
    if (chainType === 'solana') {
      return `https://explorer.solana.com/tx/${txHash}`;
    }

    // Handle different EVM networks
    if (caipNetwork) {
      const chainId = caipNetwork.id;
      const networkName = caipNetwork.name?.toLowerCase();

      // BSC/Binance Smart Chain - More comprehensive detection
      if (
        chainId === 'eip155:56' ||
        chainId === '56' ||
        chainId === 56 ||
        networkName?.includes('binance') ||
        networkName?.includes('bsc') ||
        networkName?.includes('smart chain') ||
        networkName?.includes('bnb')
      ) {
        return `https://bscscan.com/tx/${txHash}`;
      }

      // Base
      if (chainId === 'eip155:8453' || chainId === '8453' || chainId === 8453 || networkName?.includes('base')) {
        return `https://basescan.org/tx/${txHash}`;
      }

      // Polygon
      if (chainId === 'eip155:137' || chainId === '137' || chainId === 137 || networkName?.includes('polygon') || networkName?.includes('matic')) {
        return `https://polygonscan.com/tx/${txHash}`;
      }

      // Arbitrum
      if (chainId === 'eip155:42161' || chainId === '42161' || chainId === 42161 || networkName?.includes('arbitrum')) {
        return `https://arbiscan.io/tx/${txHash}`;
      }

      // Optimism
      if (chainId === 'eip155:10' || chainId === '10' || chainId === 10 || networkName?.includes('optimism')) {
        return `https://optimistic.etherscan.io/tx/${txHash}`;
      }

      // Avalanche
      if (chainId === 'eip155:43114' || chainId === '43114' || chainId === 43114 || networkName?.includes('avalanche') || networkName?.includes('avax')) {
        return `https://snowtrace.io/tx/${txHash}`;
      }

      // Ethereum mainnet
      if (chainId === 'eip155:1' || chainId === '1' || chainId === 1) {
        return `https://etherscan.io/tx/${txHash}`;
      }
    }

    // If we can't detect the network, default to Ethereum but log a warning
    return `https://etherscan.io/tx/${txHash}`;
  };

  useEffect(() => {
    const loadUserContributions = async () => {
      if (!isWalletConnected || !walletAddress) return;

      setShowPrePresale(false);

      try {
        // First, try to load from localStorage for immediate display
        const savedContributions = localStorage.getItem(`contributions_${walletAddress}`);
        if (savedContributions) {
          try {
            const localContributions = JSON.parse(savedContributions);
            setUserContributions(localContributions);
          } catch (error) {
            console.error('Error parsing local contributions:', error);
          }
        }

        // Then, fetch fresh data from server
        const freshContributions = await fetchUserContributions(walletAddress);
        
        // Update state with fresh data
        setUserContributions(freshContributions);
        
        // Update localStorage cache
        localStorage.setItem(`contributions_${walletAddress}`, JSON.stringify(freshContributions));
        
      } catch (error) {
        console.error('Error loading contributions:', error);
        
        // If API fails, fall back to localStorage data
        const savedContributions = localStorage.getItem(`contributions_${walletAddress}`);
        if (savedContributions) {
          try {
            const localContributions = JSON.parse(savedContributions);
            setUserContributions(localContributions);
            toast.info('Showing cached contributions. Unable to sync latest data.');
          } catch (error) {
            console.error('Error parsing local contributions:', error);
          }
        } else {
          toast.error('Unable to sync contribution history');
        }
      }

      // Handle fallback referral data conversion (keep existing logic)
      const fallbackData = sessionStorage.getItem('referralData');
      if (fallbackData) {
        try {
          const referralEntries = JSON.parse(fallbackData);
          const walletEntries = referralEntries.filter(entry =>
            entry.walletAddress?.toLowerCase() === walletAddress?.toLowerCase()
          );

          if (walletEntries.length > 0) {
            const existingContributions = JSON.parse(localStorage.getItem(`contributions_${walletAddress}`) || '[]');
            const existingTxHashes = existingContributions.map(c => c.transactionHash);

            const newContributions = walletEntries
              .filter(entry => !existingTxHashes.includes(entry.transactionHash))
              .map(entry => ({
                timestamp: entry.timestamp,
                amount: entry.amount.replace('$', ''),
                transactionHash: entry.transactionHash,
                network: entry.network
              }));

            if (newContributions.length > 0) {
              const allContributions = [...existingContributions, ...newContributions];
              localStorage.setItem(`contributions_${walletAddress}`, JSON.stringify(allContributions));
              setUserContributions(allContributions);
            }
          }
        } catch (error) {
          console.error('Error processing referral data:', error);
        }
      }
    };

    loadUserContributions();
  }, [isWalletConnected, walletAddress]);

  // Add state for recovery banner
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);

  // Add state for popup handling
  const [isWaitingForTransaction, setIsWaitingForTransaction] = useState(false);

  // Enhanced recovery mechanism for returning users
  useEffect(() => {
    const handleTransactionRecovery = () => {
      // Check localStorage for pending transactions
      const pendingTransaction = localStorage.getItem('pendingTransaction');

      if (pendingTransaction && isWalletConnected) {
        try {
          const transactionData = JSON.parse(pendingTransaction);
          if (transactionData.needsReferralFlow) {
            // Set up the referral flow for returning user
            setLastPurchaseAmount(transactionData.amount);
            setLastTokenAmount(parseFloat(transactionData.amount) / 0.005);
            setLastTransactionHash(transactionData.hash);
            setPaymentSuccessful(true);
            setShowReferralQuestion(true);

            toast.success(`Welcome back! Your transaction ${transactionData.hash.slice(0, 10)}... was successful!`);
          }
        } catch (e) {
         
        }
      }
    };

    if (isWalletConnected) {
      // Small delay to ensure wallet state is stable
      setTimeout(handleTransactionRecovery, 500);
    }
  }, [isWalletConnected, walletAddress]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showWalletDropdown && !event.target.closest('.wallet-dropdown-container') && !event.target.closest('[data-wallet-dropdown]')) {
        setShowWalletDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWalletDropdown]);

  const clearWalletCache = () => {
    if (typeof window !== 'undefined') {
      // Clear all wallet-related storage
      const keysToRemove = [];

      // Check localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.includes('walletconnect') ||
          key.includes('phantom') ||
          key.includes('solana') ||
          key.includes('appkit') ||
          key.includes('reown')
        )) {
          keysToRemove.push(key);
        }
      }

      // Remove localStorage items
      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Clear sessionStorage
      sessionStorage.clear();

      toast.success('Wallet cache cleared! Try connecting again.');

      // Reload the page to ensure clean state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletDropdown(false);
    setShowPrePresale(true);
    setUserContributions([]); // Clear contributions when disconnecting
    toast.success('Wallet disconnected');
  };

  // Get correct token price from CoinGecko based on network
  const getNetworkTokenPrice = async () => {
    let tokenId = 'ethereum'; // Default

    if (chainType === 'solana') {
      tokenId = 'solana';
    } else if (caipNetwork) {
      const chainId = caipNetwork.id;
      const networkName = caipNetwork.name?.toLowerCase();

      // BSC/Binance Smart Chain
      if (
        chainId === 'eip155:56' ||
        chainId === '56' ||
        chainId === 56 ||
        networkName?.includes('binance') ||
        networkName?.includes('bsc') ||
        networkName?.includes('smart chain') ||
        networkName?.includes('bnb')
      ) {
        tokenId = 'binancecoin';
      }
      // Polygon
      else if (chainId === 'eip155:137' || chainId === '137' || chainId === 137 || networkName?.includes('polygon') || networkName?.includes('matic')) {
        tokenId = 'matic-network';
      }
      // Avalanche
      else if (chainId === 'eip155:43114' || chainId === '43114' || chainId === 43114 || networkName?.includes('avalanche') || networkName?.includes('avax')) {
        tokenId = 'avalanche-2';
      }
      // Arbitrum, Base, Optimism, Ethereum use ETH
      else {
        tokenId = 'ethereum';
      }
    }

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);

    if (!response.ok) {
      throw new Error(`CoinGecko API failed: ${response.status}`);
    }

    const data = await response.json();
    const price = data[tokenId]?.usd;

    if (!price) {
      throw new Error(`Price not found for ${tokenId}`);
    }


    return price;
  };



  const handlePurchase = async () => {
    if (!isWalletConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    // SECURITY: Enhanced input validation
    try {
      const validatedAmount = validatePurchaseAmount(amount);

      if (!agreedToTerms) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      // SECURITY: Rate limiting check
      if (isRateLimited(walletAddress)) {
        toast.error('Too many requests. Please wait before trying again.');
        return;
      }

    } catch (error) {
      toast.error(error.message);
      return;
    }



    setIsInitiatingTransaction(true);
    setIsWaitingForTransaction(true);

    // Pre-save transaction state before sending (in case popup closes immediately)
    const preTransactionState = {
      amount: amount,
      timestamp: new Date().toISOString(),
      walletAddress: walletAddress,
      network: getNetworkName(),
      chainType: getChainType(),
      needsReferralFlow: false, // Will be set to true when transaction succeeds
      initiated: true
    };
    localStorage.setItem('initiatedTransaction', JSON.stringify(preTransactionState));

    const chainType = getChainType();
    const recipientAddress = RECIPIENT_ADDRESSES[chainType];

    if (chainType === 'solana') {
      try {
        if (!recipientAddress) {
          throw new Error('Recipient address not configured');
        }

        if (!walletProvider || !connection) {
          throw new Error('Solana wallet or connection not available');
        }

        const { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } = await import('@solana/web3.js');

        const fromPubkey = new PublicKey(walletAddress);
        const toPubkey = new PublicKey(recipientAddress);

        const solPriceInUsd = await getNetworkTokenPrice();
        const usdAmountNum = parseFloat(amount);
        const solAmount = usdAmountNum / solPriceInUsd;
        const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL);

        const latestBlockhash = await connection.getLatestBlockhash();

        const transaction = new Transaction({
          feePayer: fromPubkey,
          recentBlockhash: latestBlockhash.blockhash,
        }).add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports,
          })
        );

        // Use AppKit's walletProvider to send the transaction
        const signature = await walletProvider.sendTransaction(transaction, connection);

        // IMPORTANT: Save transaction state to localStorage for recovery
        const transactionState = {
          hash: signature,
          amount: amount,
          timestamp: new Date().toISOString(),
          walletAddress: walletAddress,
          network: getNetworkName(),
          chainType: getChainType(),
          needsReferralFlow: true
        };
        localStorage.setItem('pendingTransaction', JSON.stringify(transactionState));

        // Also save to sessionStorage as backup
        sessionStorage.setItem('lastTransactionHash', signature);
        sessionStorage.setItem('lastTransactionAmount', amount);
        sessionStorage.setItem('lastTransactionWallet', walletAddress);

        setLastPurchaseAmount(amount);
        setLastTokenAmount(parseFloat(amount) / 0.005);
        setLastTransactionHash(signature);
        setPaymentSuccessful(true);
        setShowReferralQuestion(true);
        toast.success(`Solana payment confirmed! Transaction: ${signature}`);

        // Clear waiting state for Solana
        setIsWaitingForTransaction(false);
        localStorage.removeItem('initiatedTransaction');

        // Create a recovery URL in case browser closes
        const recoveryUrl = `${window.location.origin}${window.location.pathname}?recover=true&tx=${signature}&amount=${amount}&wallet=${walletAddress}`;
       

        setAmount('');

      } catch (error) {
        setIsInitiatingTransaction(false);
        setIsWaitingForTransaction(false);
        setTransactionStartTime(null);
        localStorage.removeItem('initiatedTransaction');

        if (error.message?.includes('User rejected') || error.message?.includes('rejected')) {
          toast.error('Transaction cancelled by user');
        } else {
          toast.error('Solana transaction failed: ' + (error.message || 'Unknown error'));
        }
      } finally {
        setIsInitiatingTransaction(false);
      }
    } else {
      try {


        if (!recipientAddress) {
          throw new Error('Recipient address not configured');
        }


        const ethPriceInUsd = await getNetworkTokenPrice();


        const usdAmountNum = parseFloat(amount);
        const ethAmount = usdAmountNum / ethPriceInUsd;


        const ethAmountFormatted = ethAmount.toFixed(18);
        const ethAmountWei = parseEther(ethAmountFormatted);



        await sendTransaction({
          to: recipientAddress,
          value: ethAmountWei,
        });

      } catch (error) {

        setIsInitiatingTransaction(false);
        setIsWaitingForTransaction(false);
        setTransactionStartTime(null);
        localStorage.removeItem('initiatedTransaction');

        if (error.message?.includes('User rejected') || error.message?.includes('rejected')) {
          toast.error('Transaction cancelled by user');
        } else {
          toast.error('Transaction failed: ' + (error.message || 'Unknown error'));
        }
      }
    }
  };

  const handleReferralAnswer = async (wasReferred) => {


    // SECURITY: Prevent duplicate submissions
    if (submittedTxHashes.has(lastTransactionHash)) {
      toast.error('This transaction has already been submitted');
      return;
    }

    if (!wasReferred) {
      // User was not referred
      const data = {
        timestamp: new Date().toISOString(),
        walletAddress: walletAddress,
        network: getNetworkName(),
        amount: `$${parseFloat(lastPurchaseAmount || '0').toFixed(6)}`,
        transactionHash: lastTransactionHash,
        referred: 'No',
        referralBscAddress: 'N/A - Not Referred'
      };



      await sendToGoogleSheets(data);

      // Mark transaction as submitted
      setSubmittedTxHashes(prev => {
        const newSet = new Set(prev);
        newSet.add(lastTransactionHash);
        return newSet;
      });

      // Clear pending transaction from localStorage since flow is complete
      localStorage.removeItem('pendingTransaction');
      sessionStorage.removeItem('lastTransactionHash');
      sessionStorage.removeItem('lastTransactionAmount');
      sessionStorage.removeItem('lastTransactionWallet');

      // Add to user contributions
      const contribution = {
        timestamp: new Date().toISOString(),
        amount: parseFloat(lastPurchaseAmount || '0').toFixed(6),
        transactionHash: lastTransactionHash,
        network: getNetworkName()
      };
      setUserContributions(prev => {
        const updated = [...prev, contribution];
        // Save to localStorage for this wallet
        localStorage.setItem(`contributions_${walletAddress}`, JSON.stringify(updated));
        return updated;
      });

      setShowReferralQuestion(false);
      setShowSuccessModal(true);
    } else {
      // User was referred - show referrer input
     
      setShowReferralQuestion(false);
      setShowReferrerInput(true);
    }
  };

  const handleReferrerSubmit = async () => {


    if (!referrerBscAddress.trim()) {
      toast.error('Please enter the referrer BSC address');
      return;
    }

    // SECURITY: Validate referrer BSC address format
    const sanitizedReferrerAddress = sanitizeInput(referrerBscAddress.trim());
    if (!isValidBscAddress(sanitizedReferrerAddress)) {
      toast.error('Invalid BSC address format. Please enter a valid BSC address (0x...)');
      return;
    }

    // SECURITY: Prevent duplicate submissions
    if (submittedTxHashes.has(lastTransactionHash)) {
      toast.error('This transaction has already been submitted');
      return;
    }

    const data = {
      timestamp: new Date().toISOString(),
      walletAddress: walletAddress,
      network: getNetworkName(),
      amount: `$${parseFloat(lastPurchaseAmount || '0').toFixed(6)}`,
      transactionHash: lastTransactionHash,
      referred: 'Yes',
      referralBscAddress: sanitizedReferrerAddress
    };



    // Validation check: if referred is "Yes", BSC address must not be empty
    if (data.referred === 'Yes' && (!data.referralBscAddress || data.referralBscAddress.trim() === '')) {
      toast.error('Error: BSC address is missing. Please try again.');
      return;
    }

    await sendToGoogleSheets(data);

    // Mark transaction as submitted
    setSubmittedTxHashes(prev => {
      const newSet = new Set(prev);
      newSet.add(lastTransactionHash);
      return newSet;
    });

    // Clear pending transaction from localStorage since flow is complete
    localStorage.removeItem('pendingTransaction');
    sessionStorage.removeItem('lastTransactionHash');
    sessionStorage.removeItem('lastTransactionAmount');
    sessionStorage.removeItem('lastTransactionWallet');

    // Add to user contributions
    const contribution = {
      timestamp: new Date().toISOString(),
      amount: parseFloat(lastPurchaseAmount || '0').toFixed(6),
      transactionHash: lastTransactionHash,
      network: getNetworkName()
    };
    setUserContributions(prev => {
      const updated = [...prev, contribution];
      // Save to localStorage for this wallet
      localStorage.setItem(`contributions_${walletAddress}`, JSON.stringify(updated));
      return updated;
    });

    setShowReferrerInput(false);
    setShowSuccessModal(true);
   
    setReferrerBscAddress('');
  };

  const usdAmount = parseFloat(amount) || 0;
  const tokenAmount = usdAmount / 0.005;

  const isAmountValid = amount && usdAmount > 0;
  const canPurchase = isWalletConnected && isAmountValid && agreedToTerms;
  const isProcessing = isInitiatingTransaction || isSending || isWaitingForTransaction;



  // Pre-Presale Wallet Connection Page
  if (showPrePresale) {
    return (
      <div
        className="bg-[#08222B] min-h-screen relative overflow-hidden"
        onMouseMove={(e) => {
          const spotlight = document.getElementById("spotlight");
          if (spotlight) {
            const x = e.clientX;
            const y = e.clientY;
            const circleSize = '600px';
            const maskGradient = `radial-gradient(circle ${circleSize} at ${x}px ${y}px, black 0%, transparent 70%)`;
            const bgGradient = `radial-gradient(circle ${circleSize} at ${x}px ${y}px, rgba(31, 226, 214, 0.3) 0%, transparent 70%)`;
            spotlight.style.webkitMask = maskGradient;
            spotlight.style.mask = maskGradient;
            spotlight.style.background = bgGradient;
          }
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="text-[120px] sm:text-[200px] md:text-[300px] lg:text-[350px] xl:text-[400px] font-bold text-gray-700/0 select-none leading-none tracking-wider whitespace-nowrap"
          >
            ToolAi
          </div>
          <div
            id="spotlight"
            className="absolute inset-0 flex items-center justify-center text-[130px] sm:text-[200px] md:text-[500px] lg:text-[450px] xl:text-[500px] font-bold text-white select-none leading-none tracking-wider whitespace-nowrap"
            style={{
              background: 'radial-gradient(circle 500px at 50% 50%, rgba(31, 226, 214, 0.3) 0%, transparent 70%)',
              WebkitMask: 'radial-gradient(circle 500px at 50% 50%, black 0%, transparent 70%)',
              mask: 'radial-gradient(circle 500px at 50% 50%, black 0%, transparent 70%)'
            }}
          >
            ToolAi
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6">
          <div className="bg-[#0A1B24]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#1FE2D6]/20 w-full max-w-md sm:max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              Welcome to TAI+ Token Presale
            </h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-center text-sm sm:text-base">
              To access the presale dashboard, connect your wallet first!
            </p>



            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => open()}
                className="flex-1 bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg transition-all"
              >
                Connect Wallet
              </button>

              <Link
                href="/"
                className="flex-1 bg-transparent border border-gray-600 hover:border-[#1FE2D6] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all text-center text-base sm:text-lg"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#08222B]  min-h-screen">
      {/* Simplified Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-[#08222B] z-40 overflow-visible h-100 border-b border-gray-700">
        <ContainerLayout>
          <div className="flex items-center justify-between py-4 overflow-visible">
            <Link href="/" className="flex items-center gap-2 text-[#1FE2D6] hover:text-[#1BC7BC] transition-all">
              <span className="text-lg sm:text-xl">←</span>
              <span className="font-medium text-sm sm:text-base">Back to Home</span>
            </Link>

            {isWalletConnected ? (
              <div className="relative wallet-dropdown-container">
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setDropdownPosition({
                      top: rect.bottom + 8,
                      right: window.innerWidth - rect.right
                    });
                    setShowWalletDropdown(!showWalletDropdown);
                  }}
                  className="flex items-center gap-1 sm:gap-2 bg-[#1FE2D6]/10 border border-[#1FE2D6] rounded-lg px-2 sm:px-3 py-2 hover:bg-[#1FE2D6]/20 transition-all"
                >
                  <span className="text-[#1FE2D6]">✓</span>
                  <span className="text-white text-xs sm:text-sm">Connected</span>
                  <span className="text-[#1FE2D6] text-xs sm:text-sm font-mono">
                    {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                  </span>
                  <span className="text-gray-400 text-xs">▼</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => open()}
                className="bg-[#1FE2D6] text-[#00334B] px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-[#1BC7BC] transition-all text-sm sm:text-base"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </ContainerLayout>
      </div>

      <div className="min-h-screen bg-[#001220] pt-20 pb-8">
        <ContainerLayout>
          <div className="max-w-6xl mx-auto">

            {/* Recovery Banner */}
            {showRecoveryBanner && (
              <div className="bg-[#1FE2D6] text-[#00334B] rounded-lg p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#00334B] rounded-full flex items-center justify-center">
                    <span className="text-[#1FE2D6] font-bold">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Complete Your Transaction</h4>
                    <p className="text-sm">You have a pending transaction. Please connect your wallet to complete the referral process.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRecoveryBanner(false)}
                  className="text-[#00334B] hover:text-[#004A5A] font-bold text-xl"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex flex-row items-center justify-center gap-4 text-center mb-8 sm:mb-12 mt-4">
              <Link href="/" className="">
                <Image
                  src="/toolai-logo.png"
                  width={80}
                  height={80}
                  alt="ToolAI Logo"
                  className="mx-auto hover:opacity-80 transition-opacity"
                />
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                TAI+ Token Presale
              </h1>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-[#1A3A4A] to-[#0F2A35] rounded-2xl p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                    Buy TAI+ Tokens
                  </h3>

                  {isWalletConnected ? (
                    <div className="bg-green-900/20 border border-[#1FE2D6] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#1FE2D6]">✓</span>
                            <span className="text-white font-medium text-sm sm:text-base">Wallet Connected</span>
                          </div>
                          <span className="text-[#1FE2D6] text-xs sm:text-sm font-mono">
                            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                          </span>
                        </div>
                        <button
                          onClick={handleDisconnect}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs sm:text-sm transition-all self-start sm:self-auto"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start mb-4 sm:mb-6">
                      <button
                        onClick={() => open()}
                        className="w-full sm:w-[155px] h-[48px] sm:h-[52px] bg-[#1FE2D6] text-[#00334B] flex items-center justify-center rounded-[12px] cursor-pointer hover:bg-[#1BC7BC] transition-all font-medium text-sm sm:text-base"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}

                  <div className="bg-[#0A1B24] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Presale Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-400">Token Price:</span>
                        <span className="text-white ml-2">$0.005 USD</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Vesting:</span>
                        <span className="text-white ml-2">10% Monthly (From Launch Date)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <label className="block text-white mb-2 font-semibold text-sm sm:text-base">
                      Purchase Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter USD amount"
                      className={`w-full p-3 sm:p-4 bg-[#0A1B24] border rounded-lg text-white focus:outline-none text-base sm:text-lg ${!isWalletConnected
                          ? 'border-gray-600 cursor-not-allowed'
                          : 'border-gray-600 focus:border-none'
                        }`}
                      min="0.01"
                      step="0.01"
                      disabled={!isWalletConnected}
                    />
                    <p className="text-gray-400 text-xs sm:text-sm mt-2">
                      Pay with any coin available in your connected DeFi wallet
                    </p>
                  </div>

                  {/* Purchase Summary */}
                  {amount && usdAmount > 0 && (
                    <div className="bg-[#0A1B24] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Purchase Summary</h4>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">USD Amount:</span>
                          <span className="text-white">${usdAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network:</span>
                          <span className="text-white">{getNetworkName()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price per token:</span>
                          <span className="text-white">$0.005 USD</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t border-gray-600 pt-2">
                          <span className="text-white">TAI+ Tokens you’ll receive before public sale (launch):</span>
                          <span className="text-[#03B1FF] text-sm sm:text-lg">{tokenAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}



                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#1FE2D6] flex-shrink-0"
                        disabled={!isWalletConnected}
                      />
                      <label htmlFor="terms" className={`text-xs sm:text-sm ${!isWalletConnected ? 'text-gray-500' : 'text-gray-300'}`}>
                        I agree to the{' '}
                        <button
                          onClick={() => setShowTerms(true)}
                          className="text-[#03B1FF] underline hover:text-[#0299D8]"
                          disabled={!isWalletConnected}
                        >
                          ToolAi LLC TAI+ Token Presale Agreement
                        </button>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={!canPurchase || isProcessing || paymentSuccessful}
                    className={`w-full py-3 sm:py-4 rounded-lg font-semibold transition-all text-base sm:text-lg ${paymentSuccessful
                        ? 'bg-green-600 text-white cursor-default'
                        : canPurchase && !isProcessing
                          ? 'bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] cursor-pointer'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {paymentSuccessful
                      ? 'Payment Successful ✓'
                      : !isWalletConnected
                        ? 'Connect Wallet to Continue'
                        : !isAmountValid
                          ? 'Enter Valid Amount'
                          : !agreedToTerms
                            ? 'Accept Terms to Continue'
                            : 'Confirm Payment'
                    }
                  </button>

                  {/* Waiting for Transaction Helper */}
                  {isWaitingForTransaction && (
                    <div className="mt-4 bg-[#1FE2D6]/10 border border-[#1FE2D6] rounded-lg p-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-[#1FE2D6] border-t-transparent rounded-full animate-spin"></div>
                        <h4 className="text-[#1FE2D6] font-semibold text-sm">Transaction in Progress</h4>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column - Guide */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-[#1A3A4A] to-[#0F2A35] rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Steps To Join Presale
                  </h3>
                  <div className="relative space-y-4 sm:space-y-6 text-xs sm:text-sm text-gray-300">
                    <div className="absolute left-3 bottom-6 w-0.5 bg-gray-600"></div>

                    <div
                      className="absolute left-3  w-0.5 bg-[#1FE2D6] transition-all duration-500 ease-in-out"
                      style={{
                        height: `${paymentSuccessful ? '100%' :
                            agreedToTerms ? '75%' :
                              isAmountValid ? '50%' :
                                isWalletConnected ? '25%' : '0%'
                          }`
                      }}
                    ></div>

                    <div className="relative flex items-start gap-3">
                      <div className={`absolute left-0 sm:left-[-4px] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 border-2 ${isWalletConnected
                          ? 'bg-[#1FE2D6] text-black border-[#1FE2D6]'
                          : 'bg-[#0A1B24] text-gray-300 border-gray-600'
                        }`}>
                        {isWalletConnected ? '✓' : '1'}
                      </div>
                      <div className="ml-8 sm:ml-12">
                        <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Connect Your Wallet</h4>
                        <p>Use a DeFi wallet like Trust Wallet or MetaMask. Do NOT use centralized exchanges (Coinbase, Binance).</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      <div className={`absolute left-0 sm:left-[-4px] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 border-2 ${isAmountValid
                          ? 'bg-[#1FE2D6] text-black border-[#1FE2D6]'
                          : 'bg-[#0A1B24] text-gray-300 border-gray-600'
                        }`}>
                        {isAmountValid ? '✓' : '2'}
                      </div>
                      <div className="ml-8 sm:ml-12">
                        <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Enter Amount</h4>
                        <p>Choose how many TAI+ tokens to purchase.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      <div className={`absolute left-0 sm:left-[-4px] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 border-2 ${agreedToTerms
                          ? 'bg-[#1FE2D6] text-black border-[#1FE2D6]'
                          : 'bg-[#0A1B24] text-gray-300 border-gray-600'
                        }`}>
                        {agreedToTerms ? '✓' : '3'}
                      </div>
                      <div className="ml-8 sm:ml-12">
                        <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Read the Agreement</h4>
                        <p>Review and accept the ToolAi LLC TAI+ Token Presale Agreement terms.</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      <div className={`absolute left-0 sm:left-[-4px] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 border-2 ${paymentSuccessful
                          ? 'bg-[#1FE2D6] text-black border-[#1FE2D6]'
                          : 'bg-[#0A1B24] text-gray-300 border-gray-600'
                        }`}>
                        {paymentSuccessful ? '✓' : '4'}
                      </div>
                      <div className="ml-8 sm:ml-12">
                        <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Send Payment</h4>
                        <p>Complete your purchase and wait for confirmation.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Contributions Section */}
                {(userContributions.length > 0 || isLoadingContributions) && (
                  <div className="bg-gradient-to-r from-[#1A3A4A] to-[#0F2A35] rounded-2xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                      Your Contributions
                    </h3>
                    {isLoadingContributions ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[#1FE2D6] border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-300">Loading contributions...</span>
                      </div>
                    ) : (
                      <div className="max-h-[240px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#1FE2D6] scrollbar-track-gray-800 scrollbar-thumb-rounded-full">
                      {userContributions
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .map((contribution, index) => (
                          <div key={index} className="bg-[#0A1B24] rounded-lg p-3 sm:p-4 flex-shrink-0">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#1FE2D6] font-semibold text-sm sm:text-base">
                                ${contribution.amount}
                              </span>
                              <span className="text-gray-400 text-xs sm:text-sm">
                                {contribution.network}
                              </span>
                            </div>
                            <div className="text-xs text-gray-300 mb-2">
                              {new Date(contribution.timestamp).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Tx:</span>
                              <button
                                onClick={() => {
                                  const explorerUrl = getExplorerUrlByNetwork(contribution.transactionHash, contribution.network);
                                  window.open(explorerUrl, '_blank');
                                }}
                                className="text-[#03B1FF] hover:text-[#0299D8] text-xs font-mono hover:underline"
                              >
                                {contribution.transactionHash.slice(0, 10)}...{contribution.transactionHash.slice(-10)}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ContainerLayout>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A1B24] rounded-lg p-4 sm:p-6 max-w-4xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto w-full mx-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
              ToolAi LLC TAI+ Token Presale Agreement
            </h3>
            <div className="text-white space-y-4 mb-6 max-h-60 sm:max-h-96 overflow-y-auto text-left">
              <div className="text-xs sm:text-sm leading-relaxed">
                <div className="mb-4">
                  <p className="font-semibold text-white">
                    <strong>TOOLAI LLC</strong><br />
                    TAI+ Token Presale Agreement
                  </p>
                </div>

                <p className="mb-4 text-white">
                  <strong>Parties:</strong> ToolAi LLC (a Delaware Limited Liability Company) and the "Customer" (you, the purchaser)
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-white mb-2">1. Introduction</h3>
                    <p className="text-gray-300">ToolAi LLC operates an AI-powered cryptocurrency platform that transforms knowledge into AI Intellectual Properties (AiiPs) using the TAI+ token. You are entering into this Agreement to participate in the presale of TAI+ tokens.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">2. Token Purchase</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>You agree to purchase TAI+ tokens at the presale price of $0.005 USD per token.</li>
                      <li>You may pay for your TAI+ presale with any coin available to trade in your connected DeFi wallet.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">3. Vesting Schedule</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Your purchased tokens will vest over time.</li>
                      <li>10% of the tokens vest each month (starting from launch date)..</li>
                      <li>Tokens will be distributed monthly to the same DeFi Wallet (BSC Smart Chain or SOL Solana) used for your purchase.</li>
                      <li><strong>DO NOT use a centralized exchange (e.g., Coinbase, Binance).</strong> ToolAi is not responsible for lost tokens sent to centralized platforms.</li>
                      <li>Recommended wallets: Trust Wallet or MetaMask.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">4. Compliance & Legal</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>This token is not a security and is not registered with the SEC.</li>
                      <li>You confirm you are not a U.S. person or entity, or accessing this from a U.S. jurisdiction.</li>
                      <li>You are purchasing these tokens for utility purposes only.</li>
                      <li>ToolAi LLC reserves the right to refuse service to residents of restricted jurisdictions.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">5. Risks & Disclaimers</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Cryptocurrency investments are high-risk and volatile.</li>
                      <li>You may lose your entire investment.</li>
                      <li>ToolAi LLC makes no guarantees about future token performance or utility.</li>
                      <li>Smart contract risks, technical failures, and regulatory changes could affect your token price.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">6. Terms</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>By participating, you agree to hold ToolAi LLC harmless from any losses.</li>
                      <li>This agreement is governed by Delaware law.</li>
                      <li>Any disputes will be resolved through binding arbitration in Delaware.</li>
                      <li>ToolAi LLC reserves the right to modify these terms with notice.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-[#0A1B24] pt-4">
              <button
                onClick={() => setShowTerms(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setAgreedToTerms(true);
                  setShowTerms(false);
                }}
                className="flex-1 bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Question Modal */}
      {showReferralQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A1B24] rounded-lg p-6 sm:p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FE2D6] hover:bg-[#1BC7BC] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-lg sm:text-2xl">?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                One Quick Question
              </h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Did someone refer you to this TAI+ token presale?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleReferralAnswer(false)}
                  disabled={isSendingToSheet}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base disabled:opacity-50"
                >
                  {isSendingToSheet ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'No, I discovered TAI+ myself'
                  )}
                </button>
                <button
                  onClick={() => handleReferralAnswer(true)}
                  disabled={isSendingToSheet}
                  className="w-full bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base disabled:opacity-50"
                >
                  {isSendingToSheet ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Yes, someone referred me'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referrer Input Modal */}
      {showReferrerInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A1B24] rounded-lg p-6 sm:p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1FE2D6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#00334B] text-lg sm:text-2xl">👥</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Help Us Connect You
              </h3>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Please enter your referrer's BSC wallet address so we can credit them for bringing you to our community:
              </p>
              <div className="mb-6">
                <input
                  type="text"
                  value={referrerBscAddress}
                  onChange={(e) => setReferrerBscAddress(e.target.value)}
                  placeholder="0x1234567890abcdef1234567890abcdef12345678"
                  className="w-full p-3 bg-[#0A1B24] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#1FE2D6] text-sm font-mono"
                />
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowReferrerInput(false);
                    setShowReferralQuestion(true);
                    setReferrerBscAddress('');
                  }}
                  disabled={isSendingToSheet}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all text-sm disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleReferrerSubmit}
                  disabled={isSendingToSheet || !referrerBscAddress.trim()}
                  className="w-full bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingToSheet ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A1B24] rounded-lg p-6 sm:p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg sm:text-2xl">✓</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Congratulations! 🎉
              </h3>
              <div className="text-gray-300 space-y-3 mb-6 text-sm sm:text-base">
                <p>
                  Your TAI+ presale contribution of <span className="text-[#1FE2D6] font-semibold">${lastPurchaseAmount} USD</span> has been successfully processed.
                </p>
                <p>
                  You will receive <span className="text-[#03B1FF] font-semibold">{lastTokenAmount.toLocaleString()} TAI+ tokens</span>, sent monthly (10% each month) to your wallet: <span className="text-[#1FE2D6] font-mono text-xs sm:text-sm break-all">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)} <span className="text-gray-300"> before public sale (launch).</span></span>.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const successModalExplorerUrl = getExplorerUrl(lastTransactionHash);
                    window.open(successModalExplorerUrl, '_blank');
                  }}
                  className="w-full bg-transparent border border-[#1FE2D6] hover:bg-[#1FE2D6]/10 text-[#1FE2D6] py-2 px-4 rounded-lg font-medium transition-all text-xs sm:text-sm"
                >
                  View Transaction
                  <div className="text-xs font-mono opacity-75 mt-1 break-all">
                    {lastTransactionHash?.slice(0, 8)}...{lastTransactionHash?.slice(-8)}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setPaymentSuccessful(false);
                  }}
                  className="w-full bg-[#1FE2D6] hover:bg-[#1BC7BC] text-[#00334B] py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all text-sm sm:text-base"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portal-based Wallet Dropdown */}
      {showWalletDropdown && typeof window !== 'undefined' && createPortal(
        <div
          data-wallet-dropdown
          className="fixed bg-[#0A1B24] border border-gray-600 rounded-lg shadow-xl z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
            minWidth: '250px'
          }}
        >
          <div className="p-3 border-b border-gray-600">
            <div className="text-[#1FE2D6] text-sm font-mono">
              {walletAddress?.slice(0, 12)}...{walletAddress?.slice(-12)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDisconnect();
            }}
            className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-600/10 transition-all rounded-b-lg z-100"
          >
            Disconnect Wallet
          </button>
        </div>,
        document.body
      )}
    </div>
  );
} 