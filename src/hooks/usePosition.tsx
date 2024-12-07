'use client'

import { VAULT_ABI } from "@/abis/vault-abi"
import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi"
import { Address } from "viem"
import { useReadContract, useWriteContract } from "wagmi"

export function useGetPositin(postionAddress: Address, postionId: number) {
    const {data, ...rest} = useReadContract({
        abi: VAULT_ABI,
        functionName:"getPosition",
        args: [BigInt(postionId)],
        address: postionAddress
    })
   return {
        postion: data, ...rest
   } 
}
