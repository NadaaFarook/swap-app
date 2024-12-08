'use client'

import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi"
import { useReadContract } from "wagmi"
const VAULT_ADDRESS = '0x'

export function useGetVaults() {
    const {data: vaults, ...rest} = useReadContract({
        address: VAULT_ADDRESS,
        abi: VAULT_FACTORY_ABI,
        functionName: "allVaults"
    })

    return {
        vaults,
        ...rest
    }
}
