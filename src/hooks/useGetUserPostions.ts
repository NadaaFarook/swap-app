"use client";

import { VAULT_ABI } from "@/abis/vault-abi";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useUserPostions(vaultAddress: Address) {
    const { address } = useAccount();
    const { data: postions, ...rest } = useReadContract({
        abi: VAULT_ABI,
        functionName: "userPositions",
        args: [address!],
        address: vaultAddress,
    });

    return {
        postions,
        ...rest,
    };
}
