'use client'

import { VAULT_ABI } from "@/abis/vault-abi"
import { Address } from "viem"
import { useWriteContract } from "wagmi"

export function useOpenPostion({postionAddress,amount0, amount1}: {postionAddress: Address,amount0: number, amount1: number }) {
    const {writeContract, ...rest} = useWriteContract()

    return {
        openPostion: writeContract({
            abi: VAULT_ABI,
            functionName: "openPosition",
            args: [BigInt(amount0), BigInt(amount1)],
            address: postionAddress,
        }),
        ...rest
    }
}

