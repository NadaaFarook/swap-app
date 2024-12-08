"use client";

import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi";
import { VAULT_ABI } from "@/abis/vault-abi";
import { useReadContracts } from "wagmi";
import { useMemo } from "react";

const VAULT_ADDRESS = "0xc61417D6979cFBEdEe6Fa404e7a88C6BEcB8e377";

export function useGetVaults() {
  // First, get the total length of vaults
  const { data: lengthData, ...rest } = useReadContracts({
    contracts: [
      {
        address: VAULT_ADDRESS,
        abi: VAULT_FACTORY_ABI,
        functionName: "allVaultsLength",
      },
    ],
  });

  const length = Number(lengthData?.[0].result || 0);

  // Prepare contracts calls for all data we need
  const contracts = useMemo(() => {
    const calls = [];

    // Add calls to get all vault addresses
    for (let i = 0; i < length; i++) {
      calls.push({
        address: VAULT_ADDRESS,
        abi: VAULT_FACTORY_ABI,
        functionName: "allVaults",
        args: [BigInt(i)],
      });
    }

    return calls;
  }, [length]);

  // Get all vault addresses in one batch call
  const { data: vaultAddresses } = useReadContracts({
    contracts,
  });

  // Prepare contract calls for vault data
  const vaultDataContracts = useMemo(() => {
    const calls = [];

    vaultAddresses?.forEach((vaultData) => {
      if (!vaultData.result) return;
      const vaultAddress = vaultData.result;

      // Add calls for token0, token1, totalAmount0, totalAmount1
      calls.push(
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "token0",
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "token1",
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "totalAmount0",
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "totalAmount1",
        }
      );
    });

    return calls;
  }, [vaultAddresses]);

  // Get all vault data in one batch call
  const { data: vaultDataResults } = useReadContracts({
    contracts: vaultDataContracts,
  });

  // Process the results into the final format
  const vaults = useMemo(() => {
    if (!vaultAddresses || !vaultDataResults) return [];

    return vaultAddresses
      .map((vaultData, index) => {
        if (!vaultData.result) return null;

        const baseIndex = index * 4; // Each vault has 4 data points

        return {
          vault: vaultData.result,
          token0: vaultDataResults[baseIndex]?.result,
          token1: vaultDataResults[baseIndex + 1]?.result,
          totalAmount0: Number(vaultDataResults[baseIndex + 2]?.result),
          totalAmount1: Number(vaultDataResults[baseIndex + 3]?.result),
        };
      })
      .filter(Boolean);
  }, [vaultAddresses, vaultDataResults]);

  return {
    vaults,
    ...rest,
  };
}
