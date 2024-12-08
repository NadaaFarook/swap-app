// types.ts

export type Token = {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price: string;
  change24h: string;
  verified: boolean;
  address: string;
};

export type Pool = {
  id: number;
  userAddresss: string; // Note: keeps the typo from Prisma schema
  t1TokenName: string;
  t2TokenName: string;
  t1TokenAddress: string;
  t2TokenAddress: string;
  name: string;
  poolAddress: string;
  transactions?: Transaction[];
  createdAt: Date;
  updatedAt: Date;
};

export type Transaction = {
  id: number;
  userAddresss: string; // Note: keeps the typo from Prisma schema
  fee: string;
  inputTokenAddress: string;
  outputTokenAddress: string;
  inputAmount: string;
  outputAmount: string;
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
  pool?: Pool;
  poolId?: number;
};

export type AIAgent = {
  id: number;
  agentAddress: string;
  agentName: string;
  ownerAddress: string;
  seedPhrase: string;
  walletId: string;
  positions?: Position[];
};

export type Position = {
  id: number;
  buyTokenAddress: string;
  networkId: string;
  sellTokenAddress: string;
  buyOnPercentage: number;
  sellOnPercentage: number;
  buyDcaToken: number;
  sellDcaToken: number;
  lastBuyTokenPrice: number;
  aiAgentId: number;
  aiAgent?: AIAgent;
  createdAt: Date;
  updatedAt: Date;
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
    address: "0x...",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "🔵",
    balance: "1,234.56",
    price: "$1.00",
    change24h: "0%",
    verified: true,
    address: "0x...",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "💠",
    balance: "4.2",
    price: "$3,245.67",
    change24h: "-2.1%",
    verified: true,
    address: "0x...",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    icon: "🟡",
    balance: "0.45",
    price: "$65,432.10",
    change24h: "+1.8%",
    verified: true,
    address: "0x...",
  },
];
