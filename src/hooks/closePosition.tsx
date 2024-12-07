'use client'

import { VAULT_ABI } from "@/abis/vault-abi"
import { Address } from "viem"
import { useWriteContract } from "wagmi"

export function useClosePosition(vaultAddress: Address, positonId: number) {
    const {writeContract, isPending, ...rest} = useWriteContract()
    return {
        closePostion: writeContract({
            abi: VAULT_ABI,
            address: vaultAddress,
            functionName: "closePosition",
            args: [BigInt(positonId)]
        }),
        isPending,
        ...rest
    }
}
