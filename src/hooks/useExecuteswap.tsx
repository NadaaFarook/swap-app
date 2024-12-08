"use client";

import { VAULT_ABI } from "@/abis/vault-abi";
import { Address } from "viem";
import { useWriteContract } from "wagmi";

export function useExecuteSwap({
  sellTokenAmount,
  buyTokenAmount,
  postionAddress,
  signature,
  buyTokenAddress,
  sellTokenAddress,
}: {
  postionAddress: Address;
  sellTokenAddress: Address;
  buyTokenAddress: Address;
  sellTokenAmount: number;
  buyTokenAmount: number;
  signature: Address;
}) {
  const { writeContract, ...rest } = useWriteContract();
  return {
    executeSwap: () =>
      writeContract({
        address: postionAddress,
        abi: VAULT_ABI,
        functionName: "executeSwap",
        args: [
          sellTokenAddress,
          buyTokenAddress,
          BigInt(sellTokenAmount),
          BigInt(buyTokenAmount),
          signature,
        ],
      }),
    ...rest,
  };
}
