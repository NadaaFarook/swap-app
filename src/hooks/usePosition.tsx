"use client";

import { VAULT_ABI } from "@/abis/vault-abi";
import { Address } from "viem";
import { useReadContract } from "wagmi";

export function useGetPositin(postionAddress: Address, postionId: number) {
  const { data, ...rest } = useReadContract({
    abi: VAULT_ABI,
    functionName: "getPosition",
    args: [BigInt(postionId)],
    address: postionAddress,
  });
  return {
    postion: data,
    ...rest,
  };
}
