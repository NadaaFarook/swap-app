"use client";

import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi";
import { useWriteContract } from "wagmi";
const VAULT_ADDRESS = "0xc61417D6979cFBEdEe6Fa404e7a88C6BEcB8e377";

export function useCreateVaults(token1: `0x${string}`, token2: `0x${string}`) {
  const { data, writeContractAsync } = useWriteContract();

  writeContractAsync({
    address: VAULT_ADDRESS,
    abi: VAULT_FACTORY_ABI,
    functionName: "createVault",
    args: [token1, token2],
  });
  return {
    data,
  };
}
