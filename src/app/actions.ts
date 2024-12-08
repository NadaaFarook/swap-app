//actions.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface CreatePool {
  name: string;
  userAddress: string;
  t1TokenName: string;
  t2TokenName: string;
  t1TokenAddress: string;
  t2TokenAddress: string;
}

export interface CreateTransaction {
  fee: number;
  inputAmount: number;
  inputTokenAddress: string;
  outputAmount: number;
  outputTokenAddress: string;
  userAddress: string;
  transactionHash: string;
  poolId: number;
}

// Pool API calls
export const getPools = async (): Promise<CreatePool[]> => {
  console.log("getPools");
  const response = await fetch(`${API_BASE_URL}/api/pools`);
  console.log(response + "response");
  if (!response.ok) {
    throw new Error(`Failed to fetch pools: ${response.statusText}`);
  }
  return response.json();
};

export const createPool = async (poolData: CreatePool): Promise<CreatePool> => {
  console.log(poolData + "poolData");
  const response = await fetch(`${API_BASE_URL}/api/pools`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poolData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create pool: ${response.statusText}`);
  }
  return response.json();
};

// Transaction API calls
export const getTransactions = async (
  userAddress?: string,
  poolId?: number
): Promise<CreateTransaction[]> => {
  const params = new URLSearchParams();
  if (userAddress) params.append("userAddress", userAddress);
  if (poolId) params.append("poolId", poolId.toString());

  const response = await fetch(`${API_BASE_URL}/api/txs?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }
  return response.json();
};

export const createTransaction = async (
  txData: CreateTransaction
): Promise<CreateTransaction> => {
  const response = await fetch(`${API_BASE_URL}/api/txs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(txData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create transaction: ${response.statusText}`);
  }
  return response.json();
};

// Usage examples:
/*
// Get all pools
const pools = await getPools();

// Create a new pool
const newPool = await createPool({
  name: "ETH-USDC Pool",
  userAddress: "0x...",
  t1TokenName: "ETH",
  t2TokenName: "USDC",
  t1TokenAddress: "0x...",
  t2TokenAddress: "0x..."
});

// Get transactions for a specific user and pool
const transactions = await getTransactions("0x...", 1);

// Create a new transaction
// const newTransaction = await createTransaction({
//   fee: 0.001,
//   inputAmount: 1.0,
//   inputTokenAddress: "0x...",
//   outputAmount: 1000,
//   outputTokenAddress: "0x...",
//   userAddress: "0x...",
//   transactionHash: "0x...",
//   poolId: 1,
// });
*/
