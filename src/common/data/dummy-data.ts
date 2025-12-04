// Dummy users
export const DUMMY_USERS = {
  'user-001': {
    id: 'user-001',
    email: 'john.doe@example.com',
    username: 'john_doe',
  },
  'user-002': {
    id: 'user-002',
    email: 'jane.smith@example.com',
    username: 'jane_smith',
  },
};

// Dummy point balances
export const DUMMY_BALANCES = {
  'user-001': {
    userId: 'user-001',
    freePoints: 5000,
    paidPoints: 10000,
    lockedPoints: 500,
    totalEarned: 50000,
    totalSpent: 35500,
    lastUpdated: new Date().toISOString(),
  },
  'user-002': {
    userId: 'user-002',
    freePoints: 2000,
    paidPoints: 5000,
    lockedPoints: 0,
    totalEarned: 20000,
    totalSpent: 13000,
    lastUpdated: new Date().toISOString(),
  },
};

// Dummy transactions
export const DUMMY_TRANSACTIONS = [
  {
    id: 'trans-001',
    userId: 'user-001',
    transactionType: 'EARN',
    pointType: 'FREE',
    amount: 100,
    balanceAfter: 5100,
    description: 'Daily login bonus',
    referenceType: 'CAMPAIGN',
    referenceId: 'campaign-001',
    createdAt: new Date('2025-12-04T10:30:00Z').toISOString(),
  },
  {
    id: 'trans-002',
    userId: 'user-001',
    transactionType: 'SPEND',
    pointType: 'FREE',
    amount: -50,
    balanceAfter: 5050,
    description: 'AI image generation',
    referenceType: 'GENERATION',
    referenceId: 'gen-001',
    createdAt: new Date('2025-12-04T09:15:00Z').toISOString(),
  },
  {
    id: 'trans-003',
    userId: 'user-001',
    transactionType: 'PURCHASE',
    pointType: 'PAID',
    amount: 1000,
    balanceAfter: 11000,
    description: 'Purchased Basic Pack',
    referenceType: 'PURCHASE',
    referenceId: 'purchase-001',
    createdAt: new Date('2025-12-03T14:20:00Z').toISOString(),
  },
  {
    id: 'trans-004',
    userId: 'user-001',
    transactionType: 'SWAP',
    pointType: 'PAID',
    amount: -500,
    balanceAfter: 10500,
    description: 'Swapped to $NXT tokens',
    referenceType: 'SWAP',
    referenceId: 'swap-001',
    createdAt: new Date('2025-12-02T16:45:00Z').toISOString(),
  },
  {
    id: 'trans-005',
    userId: 'user-002',
    transactionType: 'EARN',
    pointType: 'FREE',
    amount: 50,
    balanceAfter: 2050,
    description: 'Referral bonus',
    referenceType: 'REFERRAL',
    referenceId: 'ref-001',
    createdAt: new Date('2025-12-04T08:00:00Z').toISOString(),
  },
];

// Dummy purchase packages
export const DUMMY_PACKAGES = [
  {
    id: 'pkg-001',
    name: 'Starter Pack',
    description: '100 points to get started',
    pointsAmount: 100,
    pointType: 'PAID',
    pricing: {
      fiat: {
        amount: 0.99,
        currency: 'USD',
        stripePriceId: 'price_xxx',
      },
      crypto: {
        amountUsd: 0.99,
        currencies: [
          { currency: 'ETH', amount: '0.0005' },
          { currency: 'USDT', amount: '0.99' },
        ],
      },
    },
    bonusPercentage: 0,
    isFeatured: false,
    sortOrder: 1,
    createdAt: new Date('2025-11-01T00:00:00Z').toISOString(),
  },
  {
    id: 'pkg-002',
    name: 'Basic Pack',
    description: '500 points with 10% bonus',
    pointsAmount: 550,
    pointType: 'PAID',
    pricing: {
      fiat: {
        amount: 4.99,
        currency: 'USD',
        stripePriceId: 'price_yyy',
      },
      crypto: {
        amountUsd: 4.99,
        currencies: [
          { currency: 'ETH', amount: '0.0025' },
          { currency: 'USDT', amount: '4.99' },
        ],
      },
    },
    bonusPercentage: 10,
    isFeatured: false,
    sortOrder: 2,
    createdAt: new Date('2025-11-01T00:00:00Z').toISOString(),
  },
  {
    id: 'pkg-003',
    name: 'Popular Pack',
    description: '1000 points with 20% bonus',
    pointsAmount: 1200,
    pointType: 'PAID',
    pricing: {
      fiat: {
        amount: 9.99,
        currency: 'USD',
        stripePriceId: 'price_zzz',
      },
      crypto: {
        amountUsd: 9.99,
        currencies: [
          { currency: 'ETH', amount: '0.005' },
          { currency: 'USDT', amount: '9.99' },
        ],
      },
    },
    bonusPercentage: 20,
    isFeatured: true,
    badge: 'Most Popular',
    sortOrder: 3,
    createdAt: new Date('2025-11-01T00:00:00Z').toISOString(),
  },
];

// Dummy purchases
export const DUMMY_PURCHASES = [
  {
    id: 'purchase-001',
    userId: 'user-001',
    package: {
      id: 'pkg-001',
      name: 'Starter Pack',
      pointsAmount: 100,
    },
    paymentMethod: 'STRIPE',
    paymentStatus: 'COMPLETED',
    pointsAmount: 100,
    fiatAmount: 0.99,
    currency: 'USD',
    stripeSessionId: 'cs_test_xxx',
    completedAt: new Date('2025-12-04T10:31:00Z').toISOString(),
    createdAt: new Date('2025-12-04T10:30:00Z').toISOString(),
  },
  {
    id: 'purchase-002',
    userId: 'user-001',
    package: {
      id: 'pkg-003',
      name: 'Popular Pack',
      pointsAmount: 1200,
    },
    paymentMethod: 'CRYPTO',
    paymentStatus: 'PROCESSING',
    pointsAmount: 1200,
    cryptoAmount: '0.005',
    cryptoCurrency: 'ETH',
    cryptoTxHash: '0x123456789abcdef...',
    confirmations: 8,
    minimumConfirmations: 12,
    createdAt: new Date('2025-12-04T10:35:00Z').toISOString(),
  },
];

// Dummy swap config
export const DUMMY_SWAP_CONFIG = {
  exchangeRate: 0.001,
  dailySwapLimit: 10000,
  monthlySwapLimit: 100000,
  minSwapAmount: 100,
  maxSwapAmount: 50000,
  isActive: true,
  effectiveFrom: new Date('2025-11-01T00:00:00Z').toISOString(),
};

// Dummy swaps
export const DUMMY_SWAPS = [
  {
    id: 'swap-001',
    userId: 'user-001',
    pointsAmount: 1000,
    tokenAmount: 1.0,
    exchangeRate: 0.001,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    status: 'COMPLETED',
    blockchainTxHash: '0xabc...def',
    completedAt: new Date('2025-12-04T10:35:00Z').toISOString(),
    createdAt: new Date('2025-12-04T10:30:00Z').toISOString(),
  },
  {
    id: 'swap-002',
    userId: 'user-001',
    pointsAmount: 5000,
    tokenAmount: 5.0,
    exchangeRate: 0.001,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    status: 'PROCESSING',
    blockchainTxHash: '0x123...456',
    confirmations: 8,
    minimumConfirmations: 12,
    createdAt: new Date('2025-12-04T10:40:00Z').toISOString(),
  },
];

// Dummy swap limits
export const DUMMY_SWAP_LIMITS = {
  'user-001': {
    daily: {
      limit: 10000,
      used: 1000,
      remaining: 9000,
      periodStart: new Date('2025-12-04T00:00:00Z').toISOString(),
      periodEnd: new Date('2025-12-04T23:59:59Z').toISOString(),
      resetsIn: 50400,
    },
    monthly: {
      limit: 100000,
      used: 5000,
      remaining: 95000,
      periodStart: new Date('2025-12-01T00:00:00Z').toISOString(),
      periodEnd: new Date('2025-12-31T23:59:59Z').toISOString(),
      resetsIn: 2332800,
    },
  },
  'user-002': {
    daily: {
      limit: 10000,
      used: 0,
      remaining: 10000,
      periodStart: new Date('2025-12-04T00:00:00Z').toISOString(),
      periodEnd: new Date('2025-12-04T23:59:59Z').toISOString(),
      resetsIn: 50400,
    },
    monthly: {
      limit: 100000,
      used: 0,
      remaining: 100000,
      periodStart: new Date('2025-12-01T00:00:00Z').toISOString(),
      periodEnd: new Date('2025-12-31T23:59:59Z').toISOString(),
      resetsIn: 2332800,
    },
  },
};
