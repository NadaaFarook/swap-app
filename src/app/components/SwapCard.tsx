"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Info, ChevronDown, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { tokens } from "../types";
import { useAccount } from "wagmi";
import { useState, useCallback } from "react";
import { useExecuteSwap } from "@/hooks/useExecuteswap";
import { useUserPostions } from "@/hooks/useGetUserPostions";
// import { useCreatePool } from "@/hooks/useCreatePool";
import { useToast } from "@/hooks/use-toast";

const SwapCard = ({
  setPayToken,
  setReceiveToken,
  payToken,
  receiveToken,
  selectedPool,
}: {
  setPayToken: any;
  setReceiveToken: any;
  payToken: any;
  receiveToken: any;
  selectedPool: any;
}) => {
  const { address, isConnected } = useAccount();

  const { toast } = useToast();
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { isError: isPositionsError, isLoading: isPositionsLoading } =
    useUserPostions(selectedPool?.address);

  // Execute swap hook
  const { executeSwap, isPending: isSwapPending } = useExecuteSwap({
    postionAddress: selectedPool?.address,
    sellTokenAddress: payToken?.address,
    buyTokenAddress: receiveToken?.address,
    sellTokenAmount: parseFloat(payAmount) || 0,
    buyTokenAmount: parseFloat(receiveAmount) || 0,
    signature: "0x", // Replace with actual signature
  });

  const calculateNetworkFee = useCallback((amount: string) => {
    if (!amount) return 0;
    return parseFloat(amount) * 0.003;
  }, []);

  const handleSwap = async () => {
    if (!isConnected || !payAmount || !selectedPool) {
      toast({
        title: "Error",
        description: "Please connect wallet and enter amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const networkFee = calculateNetworkFee(payAmount);

      // Execute the swap
      await executeSwap;

      toast({
        title: "Success",
        description: "Swap completed successfully",
      });

      // Reset form
      setPayAmount("");
      setReceiveAmount("");
    } catch (error: any) {
      console.error("Swap failed:", error);
      toast({
        title: "Error",
        description: error.message || "Swap failed",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTokenSwitch = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);
    const tempAmount = payAmount;
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  // useEffect(() => {
  //   if (payAmount) {
  //     setLoadingPrice(true);
  //     const timeout = setTimeout(() => {
  //       // In production, this should be replaced with actual price calculation
  //       const simulatedRate = Math.random() * (1.02 - 0.98) + 0.98;
  //       setReceiveAmount((parseFloat(payAmount) * simulatedRate).toFixed(6));
  //       setLoadingPrice(false);
  //     }, 500);
  //     return () => clearTimeout(timeout);
  //   } else {
  //     setReceiveAmount("");
  //   }
  // }, [payAmount, payToken, receiveToken]);

  // Error states
  if (isPositionsError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load necessary data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-md mx-auto backdrop-blur-lg shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Pool Selection Alert */}
          {selectedPool && (
            <Alert className="bg-blue-900/20">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Trading in {selectedPool.name} pool
              </AlertDescription>
            </Alert>
          )}

          {/* Pay Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm">You Pay</label>
              {isConnected && (
                <span className="text-sm">
                  Balance: {payToken?.balance} {payToken?.symbol}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="flex-1"
                placeholder="0.0"
                disabled={isProcessing}
              />
              <TokenSelector
                selectedToken={payToken}
                onSelectToken={setPayToken}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleTokenSwitch}
              disabled={isProcessing}
              className="rounded-full"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Receive Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm">You Receive</label>
              {isConnected && (
                <span className="text-sm">
                  Balance: {receiveToken?.balance} {receiveToken?.symbol}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="flex-1"
                placeholder="0.0"
                disabled={loadingPrice || isProcessing}
              />
              <TokenSelector
                selectedToken={receiveToken}
                onSelectToken={setReceiveToken}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Transaction Details */}
          {payAmount && (
            <div className="space-y-2 p-3 rounded-lg bg-slate-900/50">
              <div className="flex justify-between items-center text-sm">
                <span>Price</span>
                {loadingPrice ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculating...
                  </span>
                ) : (
                  <span>
                    1 {payToken?.symbol} ={" "}
                    {(
                      parseFloat(receiveAmount) / parseFloat(payAmount)
                    ).toFixed(6)}{" "}
                    {receiveToken?.symbol}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>Network Fee (0.3%)</span>
                <span>
                  {calculateNetworkFee(payAmount).toFixed(6)} {payToken?.symbol}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span>Minimum Received</span>
                <span>
                  {(parseFloat(receiveAmount) * 0.995).toFixed(6)}{" "}
                  {receiveToken?.symbol}
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSwap}
            disabled={
              !isConnected ||
              loadingPrice ||
              !payAmount ||
              isProcessing ||
              isSwapPending
            }
          >
            {!isConnected ? (
              "Connect Wallet to Swap"
            ) : loadingPrice ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Calculating Price...
              </span>
            ) : !payAmount ? (
              "Enter an amount"
            ) : isProcessing || isSwapPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Swapping...
              </span>
            ) : (
              "Swap Tokens"
            )}
          </Button>

          {/* Loading States */}
          {isPositionsLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Token Selector Component
const TokenSelector = ({
  selectedToken,
  onSelectToken,
  disabled,
}: {
  selectedToken: any;
  onSelectToken: any;
  disabled: boolean;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-32" disabled={disabled}>
          <div className="flex items-center gap-2">
            {selectedToken?.icon}
            <span>{selectedToken?.symbol}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {tokens.map((token) => (
          <DropdownMenuItem
            key={token.symbol}
            onClick={() => onSelectToken(token)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {token.icon}
                <div>
                  <div>{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div>{token.price}</div>
                <div
                  className={`text-sm ${
                    token.change24h?.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {token.change24h}
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwapCard;
