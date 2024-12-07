"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowUpDown,
  Wallet,
  Settings2,
  Info,
  History,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { tokens, transactionHistory, vaults } from "../types";
import PoolCreationDialog from "./NewValultModal";

const SwapInterface = () => {
  const [activeTab, setActiveTab] = useState("swap");
  const [payToken, setPayToken] = useState(tokens[0]);
  const [receiveToken, setReceiveToken] = useState(tokens[1]);
  const [payAmount, setPayAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [connected, setConnected] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [priceImpact, setPriceImpact] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showNewPoolDialog, setShowNewPoolDialog] = useState(false);
  const [newPool, setNewPool] = useState({
    token1: tokens[0],
    token2: tokens[1],
    fee: 0.3,
    initialLiquidity1: "",
    initialLiquidity2: "",
    advanced: {
      tickSpacing: 60,
      priceRange: {
        min: "",
        max: "",
      },
      startPrice: "",
    },
  });
  const [poolCreationStep, setPoolCreationStep] = useState(1);
  const [poolValidation, setPoolValidation] = useState({
    liquidity1Valid: true,
    liquidity2Valid: true,
    priceRangeValid: true,
  });

  // Simulate price updates
  useEffect(() => {
    if (payAmount) {
      setLoadingPrice(true);
      const timeout = setTimeout(() => {
        const simulatedRate = Math.random() * (1.02 - 0.98) + 0.98;
        setReceiveAmount((parseFloat(payAmount) * simulatedRate).toFixed(6));
        setPriceImpact(Math.random() * 2);
        setLoadingPrice(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [payAmount, payToken, receiveToken]);

  const handleSwap = () => {
    if (!connected) return;
    // Add swap confirmation dialog here
    console.log("Swapping tokens...");
  };

  const handleTokenSwitch = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);
    const tempAmount = payAmount;
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  const handleVaultSelection = (vault) => {
    const [token1, token2] = vault.pair.split("/");
    const firstToken = tokens.find((t) => t.symbol === token1);
    const secondToken = tokens.find((t) => t.symbol === token2);
    if (firstToken && secondToken) {
      setPayToken(firstToken);
      setReceiveToken(secondToken);
      setSelectedVault(vault);
    }
  };

  const getPriceImpactColor = (impact) => {
    if (impact < 0.5) return "text-green-400";
    if (impact < 1.0) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen p-6">
      {/* Enhanced Navbar */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="ml-8">
        <nav className="flex justify-between items-center mb-8 p-4 backdrop-blur-lg rounded-lg border  ">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text  ">
              DeFi Swap
            </h1>

            <TabsList className="">
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTransactionHistory(true)}
                    className="transition-colors"
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Transaction History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                    className="transition-colors"
                  >
                    <Settings2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="outline"
              onClick={() => setConnected(!connected)}
              className="flex items-center gap-2   hover:  transition-all duration-300"
            >
              <Wallet className="h-4 w-4" />
              {connected ? "0x1234...5678" : "Connect Wallet"}
            </Button>
          </div>
        </nav>

        {/* Settings Panel */}
        <div
          className={`max-w-md mx-auto mb-4 overflow-hidden transition-all duration-300 ${
            showSettings ? "h-40" : "h-0"
          }`}
        >
          <Card className="  backdrop-blur-lg  ">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm  ">Slippage Tolerance</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[slippage]}
                    onValueChange={([value]) => setSlippage(value)}
                    max={5}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="min-w-[60px] text-right">{slippage}%</span>
                </div>
              </div>
              <div className="flex justify-between text-sm  ">
                <span>Transaction Deadline</span>
                <span>30 minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="swap" className="mt-0">
          {/* Main Swap Card */}
          <Card className="max-w-md mx-auto   backdrop-blur-lg   shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-6">
                {selectedVault && (
                  <Alert className="bg-blue-900/20   lue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Trading in {selectedVault.pair} pool fee tier
                    </AlertDescription>
                  </Alert>
                )}

                {/* Pay Section */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm  ">You Pay</label>
                    {connected && (
                      <span className="text-sm  ">
                        Balance: {payToken.balance} {payToken.symbol}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={payAmount}
                      onChange={(e) => {
                        if (Number.isNaN(e.target.value)) return;
                        setPayAmount(e.target.value);
                      }}
                      className="flex-1"
                      placeholder="0.0"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-[130px]transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {payToken.icon}
                            <span>{payToken.symbol}</span>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="">
                        {tokens.map((token) => (
                          <DropdownMenuItem
                            key={token.symbol}
                            onClick={() => setPayToken(token)}
                            className="   hover:   cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                {token.icon}
                                <div>
                                  <div>{token.symbol}</div>
                                  <div className="text-sm  ">{token.name}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div>{token.price}</div>
                                <div
                                  className={`text-sm ${
                                    token.change24h.startsWith("+")
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
                  </div>
                </div>

                {/* Switch Button */}
                <div className="flex justify-center relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleTokenSwitch}
                    className="switch-button rounded-full transition-all duration-300 transform"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Receive Section */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm  ">You Receive</label>
                    {connected && (
                      <span className="text-sm  ">
                        Balance: {receiveToken.balance} {receiveToken.symbol}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={receiveAmount}
                      onChange={(e) => {
                        if (Number.isNaN(e.target.value)) return;
                        setReceiveAmount(e.target.value);
                      }}
                      className="flex-1      focus:ring-blue-500"
                      placeholder="0.0"
                      disabled={loadingPrice}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-[130px] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {receiveToken.icon}
                            <span>{receiveToken.symbol}</span>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="">
                        {tokens.map((token) => (
                          <DropdownMenuItem
                            key={token.symbol}
                            onClick={() => setReceiveToken(token)}
                            className="   hover:   cursor-pointer transition-colors"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                {token.icon}
                                <div>
                                  <div>{token.symbol}</div>
                                  <div className="text-sm  ">{token.name}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div>{token.price}</div>
                                <div
                                  className={`text-sm ${
                                    token.change24h.startsWith("+")
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
                  </div>
                </div>

                {/* Transaction Details */}
                {payAmount && (
                  <div className="space-y-2 p-3    rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className=" ">Price</span>
                      {loadingPrice ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <span>
                          1 {payToken.symbol} ={" "}
                          {(receiveAmount / payAmount).toFixed(6)}{" "}
                          {receiveToken.symbol}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className=" ">Price Impact</span>
                      <span className={getPriceImpactColor(priceImpact)}>
                        {priceImpact.toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className=" ">Network Fee</span>
                      <span>≈ $2.50</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className=" ">Minimum Received</span>
                      <span>
                        {(receiveAmount * (1 - slippage / 100)).toFixed(6)}{" "}
                        {receiveToken.symbol}
                      </span>
                    </div>
                  </div>
                )}

                {/* Swap Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 relative overflow-hidden"
                  onClick={handleSwap}
                  disabled={!connected || loadingPrice || !payAmount}
                >
                  {!connected ? (
                    "Connect Wallet to Swap"
                  ) : loadingPrice ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚬</span> Calculating Price
                    </span>
                  ) : !payAmount ? (
                    "Enter an amount"
                  ) : (
                    "Swap Tokens"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools" className="mt-0">
          {/* Vaults List */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text  ">
                Top Pools by TVL
              </h2>
              <PoolCreationDialog
                showNewPoolDialog={showNewPoolDialog}
                setShowNewPoolDialog={setShowNewPoolDialog}
                poolCreationStep={poolCreationStep}
                setPoolCreationStep={setPoolCreationStep}
                newPool={newPool}
                setNewPool={setNewPool}
                poolValidation={poolValidation}
                setPoolValidation={setPoolValidation}
              />
            </div>

            <Card className="">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="  text-sm">
                      <th className="p-4 text-left">Pool</th>
                      <th className="p-4 text-right">TVL</th>
                      <th className="p-4 text-right">APR</th>
                      <th className="p-4 text-right">24h Volume</th>
                      <th className="p-4 text-right">Risk Level</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaults.map((vault) => (
                      <tr
                        key={vault.id}
                        className="     hover:  transition-colors duration-200"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{vault.pair}</span>

                            <Badge variant="outline" className="  text-sm">
                              {vault.fee}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 text-right">{vault.tvl}</td>
                        <td className="p-4 text-right">
                          <span className="text-green-400">{vault.apr}</span>
                          {vault.rewards.length > 0 && (
                            <div className="  text-sm  ">
                              +Rewards: {vault.rewards.join(", ")}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-right">{vault.volume}</td>
                        <td className="p-4 text-right">
                          <Badge
                            variant="outline"
                            className={
                              vault.risk === "Low"
                                ? "text-green-400 border-green-400/20"
                                : "text-yellow-400 border-yellow-400/20"
                            }
                          >
                            {vault.risk}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                handleVaultSelection(vault);
                                setActiveTab("swap");
                              }}
                              className="text-blue-400   lue-400/20 hover:bg-blue-400/10"
                            >
                              Trade
                            </Button>
                          </div>
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
      {/* Transaction History Dialog */}
      <Dialog
        open={showTransactionHistory}
        onOpenChange={setShowTransactionHistory}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
            <DialogDescription className=" ">
              Your recent transactions will appear here
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {transactionHistory.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3    rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <ArrowUpDown className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {tx.from.amount} {tx.from.symbol} → {tx.to.amount}{" "}
                      {tx.to.symbol}
                    </div>
                    <div className="text-sm  ">{tx.time}</div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-400 border-green-400/20"
                >
                  {tx.status}
                </Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SwapInterface;
