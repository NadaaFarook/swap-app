"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tokens, Pool } from "../types";
import { useToast } from "@/hooks/use-toast";
import PoolCreationDialog from "./NewValultModal";
import { useAccount, useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SwapCard from "./SwapCard";
import { VAULT_FACTORY_ABI } from "@/abis/vault-factory-abi";
import { useGetVaults } from "@/hooks/useGetVaults";
import { VAULT_ADDRESS } from "@/lib/constants";
const SwapInterface = () => {
  // State management
  const [activeTab, setActiveTab] = useState("swap");
  const [payToken, setPayToken] = useState(tokens[0]);
  const [receiveToken, setReceiveToken] = useState(tokens[1]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [showNewPoolDialog, setShowNewPoolDialog] = useState(false);

  // Hooks
  const { toast } = useToast();
  const { data, writeContractAsync } = useWriteContract();

  const { isConnected } = useAccount();
  const { vaults, isLoading: isVaultsLoading } = useGetVaults();

  console.log(vaults);
  // Handlers
  const handleCreatePool = async ({
    t1TokenAddress,
    t2TokenAddress,
  }: {
    t1TokenAddress: string;
    t2TokenAddress: string;
  }) => {
    if (!isConnected) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      writeContractAsync({
        address: VAULT_ADDRESS as any,
        abi: VAULT_FACTORY_ABI,
        functionName: "createVault",
        args: [t1TokenAddress as any, t2TokenAddress as any],
      });

      console.log(data, "data");
      toast({
        title: "Success",
        description: "Vault created successfully",
      });

      setShowNewPoolDialog(false);
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Error",
        description: "Failed to create vault",
        variant: "destructive",
      });
    }
  };
  console.log(data, "data");

  const handlePoolSelection = (pool: Pool) => {
    const firstToken = tokens.find((t) => t.symbol === pool.t1TokenName);
    const secondToken = tokens.find((t) => t.symbol === pool.t2TokenName);
    if (firstToken && secondToken) {
      setPayToken(firstToken);
      setReceiveToken(secondToken);
      setSelectedPool(pool);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Enhanced Navbar */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="ml-8">
        <nav className="flex justify-between items-center mb-8 p-4 backdrop-blur-lg rounded-lg border">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
              DeFi Swap
            </h1>

            <TabsList>
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-4">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const isConnected = ready && account && chain;

                return (
                  <Button
                    variant="outline"
                    onClick={isConnected ? openAccountModal : openConnectModal}
                    className="flex items-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    {isConnected ? account.displayName : "Connect Wallet"}
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </nav>

        <TabsContent value="swap" className="mt-0">
          {/* Main Swap Card */}
          <SwapCard
            payToken={payToken}
            setPayToken={setPayToken}
            receiveToken={receiveToken}
            setReceiveToken={setReceiveToken}
            selectedPool={selectedPool}
          />
        </TabsContent>

        <TabsContent value="pools" className="mt-0">
          {/* Pools List */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                Top Pools by TVL
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowNewPoolDialog(true)}
                className="hover:bg-blue-100"
              >
                Create New Pool
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm">
                      <th className="p-4 text-left">Pool</th>
                      <th className="p-4 text-right">Token Amount (Token1)</th>
                      <th className="p-4 text-right">Token Amount (Token2)</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isVaultsLoading && (
                      <tr>
                        <td colSpan={6} className="p-4 text-center">
                          Loading pools...
                        </td>
                      </tr>
                    )}
                    {!isVaultsLoading && vaults?.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-4 text-center">
                          No pools found
                        </td>
                      </tr>
                    )}
                    {vaults?.map((pool: any, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {
                                VAULT_ADDRESS.find(
                                  (vault) => vault.address === pool.token1
                                )?.name
                              }
                              -
                              {
                                VAULT_ADDRESS.find(
                                  (vault) => vault.address === pool.token0
                                )?.name
                              }
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {pool.totalAmount0}{" "}
                          {
                            VAULT_ADDRESS.find(
                              (vault) => vault.address === pool.token0
                            )?.name
                          }
                        </td>
                        <td className="p-4 text-right">
                          {pool.totalAmount1}{" "}
                          {
                            VAULT_ADDRESS.find(
                              (vault) => vault.address === pool.token1
                            )?.name
                          }
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              handlePoolSelection(pool);
                              setActiveTab("swap");
                            }}
                            className="text-blue-400 hover:bg-blue-400/10"
                          >
                            Trade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <PoolCreationDialog
        showNewPoolDialog={showNewPoolDialog}
        setShowNewPoolDialog={setShowNewPoolDialog}
        handleCreatePool={handleCreatePool}
      />
    </div>
  );
};

export default SwapInterface;
