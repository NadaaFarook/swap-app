'use client'

import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi"
import { Address } from "viem"
import { useWriteContract } from "wagmi"
const VAULT_FACTORY_ADDRESS = "0x"

export function useCreatePool(xTokenAddress: Address, yTokenAddress: Address) {
    const {writeContract, isPending, ...rest} = useWriteContract({})
    return {
        createPool: writeContract({
            address: VAULT_FACTORY_ADDRESS,
                functionName: "createVault",
                abi: VAULT_FACTORY_ABI,
                args: [xTokenAddress, yTokenAddress]
        })
    }

    return {
        createPool: writeContract,
        isPending,
        ...rest
    }
}
