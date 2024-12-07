"use client";
import { Button } from "@/components/ui/button";
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
import { Info, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tokens } from "../types";

const PoolCreationDialog = ({
  showNewPoolDialog,
  setShowNewPoolDialog,
  poolCreationStep,
  setPoolCreationStep,
  newPool,
  setNewPool,
  poolValidation,
  setPoolValidation,
}: {
  showNewPoolDialog: boolean;
  setShowNewPoolDialog: (show: boolean) => void;
  poolCreationStep: number;
  setPoolCreationStep: Function;
  newPool: any;
  setNewPool: Function;
  poolValidation: any;
  setPoolValidation: Function;
}) => (
  <Dialog open={showNewPoolDialog} onOpenChange={setShowNewPoolDialog}>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text  "
      >
        Create New Pool
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          Create New Liquidity Pool
          <Badge variant="outline" className="ml-2">
            Step {poolCreationStep} of 3
          </Badge>
        </DialogTitle>
        <DialogDescription>
          Configure your new automated market maker pool
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {poolCreationStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Token 1</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {newPool.token1.icon} {newPool.token1.symbol}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {tokens.map((token) => (
                      <DropdownMenuItem
                        key={token.symbol}
                        onClick={() =>
                          setNewPool({ ...newPool, token1: token })
                        }
                      >
                        <div className="flex items-center gap-2">
                          {token.icon} {token.symbol}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label className="block text-sm mb-2">Token 2</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {newPool.token2.icon} {newPool.token2.symbol}
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {tokens.map((token) => (
                      <DropdownMenuItem
                        key={token.symbol}
                        onClick={() =>
                          setNewPool({ ...newPool, token2: token })
                        }
                      >
                        <div className="flex items-center gap-2">
                          {token.icon} {token.symbol}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Fee Tier</label>
              <div className="grid grid-cols-4 gap-4">
                {[0.01, 0.05, 0.3, 1].map((fee) => (
                  <Button
                    key={fee}
                    variant={newPool.fee === fee ? "default" : "outline"}
                    onClick={() => setNewPool({ ...newPool, fee })}
                    className="w-full"
                  >
                    {fee}%
                  </Button>
                ))}
              </div>
            </div>

            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Higher fees suit less frequently traded pairs and more volatile
                assets
              </AlertDescription>
            </Alert>
          </div>
        )}

        {poolCreationStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">
                Initial {newPool.token1.symbol} Liquidity
              </label>
              <Input
                type="number"
                value={newPool.initialLiquidity1}
                onChange={(e) => {
                  setNewPool({ ...newPool, initialLiquidity1: e.target.value });
                  setPoolValidation({
                    ...poolValidation,
                    liquidity1Valid: parseFloat(e.target.value) > 0,
                  });
                }}
                className={
                  !poolValidation.liquidity1Valid ? "border-red-500" : ""
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Initial {newPool.token2.symbol} Liquidity
              </label>
              <Input
                type="number"
                value={newPool.initialLiquidity2}
                onChange={(e) => {
                  setNewPool({ ...newPool, initialLiquidity2: e.target.value });
                  setPoolValidation({
                    ...poolValidation,
                    liquidity2Valid: parseFloat(e.target.value) > 0,
                  });
                }}
                className={
                  !poolValidation.liquidity2Valid ? "border-red-500" : ""
                }
              />
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-2">Advanced Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Tick Spacing
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 inline ml-2" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Smaller tick spacing allows for more precise prices
                            but may cost more gas
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <Slider
                    value={[newPool.advanced.tickSpacing]}
                    onValueChange={([value]) =>
                      setNewPool({
                        ...newPool,
                        advanced: { ...newPool.advanced, tickSpacing: value },
                      })
                    }
                    min={10}
                    max={100}
                    step={10}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {poolCreationStep === 3 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Price Range</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Min Price</label>
                  <Input
                    type="number"
                    value={newPool.advanced.priceRange.min}
                    onChange={(e) =>
                      setNewPool({
                        ...newPool,
                        advanced: {
                          ...newPool.advanced,
                          priceRange: {
                            ...newPool.advanced.priceRange,
                            min: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Max Price</label>
                  <Input
                    type="number"
                    value={newPool.advanced.priceRange.max}
                    onChange={(e) =>
                      setNewPool({
                        ...newPool,
                        advanced: {
                          ...newPool.advanced,
                          priceRange: {
                            ...newPool.advanced.priceRange,
                            max: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Setting a narrow price range concentrates your liquidity,
                potentially earning more fees, but may require more frequent
                rebalancing
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h4 className="font-medium">Summary</h4>
              <div className="bg-blue-950/20 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Pool Pair</span>
                  <span>
                    {newPool.token1.symbol}/{newPool.token2.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fee Tier</span>
                  <span>{newPool.fee}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Liquidity</span>
                  <span>
                    {newPool.initialLiquidity1} {newPool.token1.symbol} +{" "}
                    {newPool.initialLiquidity2} {newPool.token2.symbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <DialogFooter className="flex justify-between">
        {poolCreationStep > 1 && (
          <Button
            variant="outline"
            onClick={() => setPoolCreationStep(poolCreationStep - 1)}
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (poolCreationStep < 3) {
              setPoolCreationStep(poolCreationStep + 1);
            } else {
              // Handle pool creation
              console.log("Creating pool:", newPool);
              setShowNewPoolDialog(false);
              setPoolCreationStep(1);
            }
          }}
        >
          {poolCreationStep === 3 ? "Create Pool" : "Next"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default PoolCreationDialog;
