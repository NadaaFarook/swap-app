export type Token = {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price: string;
  change24h: string;
  verified: boolean;
};

export type Vault = {
  id: number;
  pair: string;
  fee: string;
  tvl: string;
  apr: string;
  volume: string;
  rewards: string[];
  risk: string;
  utilization: number;
};

export type Transaction = {
  id: number;
  type: string;
  from: { symbol: string; amount: string };
  to: { symbol: string; amount: string };
  time: string;
  status: string;
};

export const tokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    icon: "🟣",
    balance: "12.5",
    price: "$102.45",
    change24h: "+5.2%",
    verified: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "🔵",
    balance: "1,234.56",
    price: "$1.00",
    change24h: "0%",
    verified: true,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "💠",
    balance: "4.2",
    price: "$3,245.67",
    change24h: "-2.1%",
    verified: true,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "🟡",
    balance: "0.45",
    price: "$65,432.10",
    change24h: "+1.8%",
    verified: true,
  },
];

// Enhanced vaults data
export const vaults: Vault[] = [
  {
    id: 1,
    pair: "WBTC/ETH",
    fee: "0.3%",
    tvl: "$176.8M",
    apr: "1.91%",
    volume: "$3.1M",
    rewards: ["$UNI", "$ETH"],
    risk: "Medium",
    utilization: 78,
  },
  {
    id: 2,
    pair: "USDC/ETH",
    fee: "0.05%",
    tvl: "$115.5M",
    apr: "3.944%",
    volume: "$25.0M",
    rewards: ["$UNI"],
    risk: "Low",
    utilization: 92,
  },
  {
    id: 3,
    pair: "ETH/USDT",
    fee: "0.3%",
    tvl: "$74.2M",
    apr: "7.812%",
    volume: "$5.3M",
    rewards: ["$UNI", "$ETH"],
    risk: "Medium",
    utilization: 65,
  },
  {
    id: 4,
    pair: "DAI/USDC",
    fee: "0.01%",
    tvl: "$69.5M",
    apr: "0.078%",
    volume: "$1.5M",
    rewards: ["$UNI"],
    risk: "Low",
    utilization: 45,
  },
];

// Mock transaction history
export const transactionHistory: Transaction[] = [
  {
    id: 1,
    type: "Swap",
    from: { symbol: "ETH", amount: "0.5" },
    to: { symbol: "USDC", amount: "1,623.45" },
    time: "2 mins ago",
    status: "completed",
  },
  {
    id: 2,
    type: "Swap",
    from: { symbol: "USDC", amount: "500" },
    to: { symbol: "SOL", amount: "4.88" },
    time: "5 mins ago",
    status: "completed",
  },
];
