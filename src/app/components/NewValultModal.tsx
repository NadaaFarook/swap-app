import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PoolCreationDialog = ({
  showNewPoolDialog,
  setShowNewPoolDialog,
  handleCreatePool,
}: {
  showNewPoolDialog: boolean;
  setShowNewPoolDialog: (value: boolean) => void;
  handleCreatePool: (data: {
    t1TokenAddress: string;
    t2TokenAddress: string;
  }) => void;
}) => {
  const [token1Address, setToken1Address] = useState("");
  const [token2Address, setToken2Address] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreatePool({
      t1TokenAddress: token1Address,
      t2TokenAddress: token2Address,
    });
  };

  return (
    <Dialog open={showNewPoolDialog} onOpenChange={setShowNewPoolDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Vault
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <span>Token 1 Address</span>
            <Input
              id="token1"
              placeholder="0x..."
              value={token1Address}
              onChange={(e) => setToken1Address(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <span>Token 2 Address</span>
            <Input
              id="token2"
              placeholder="0x..."
              value={token2Address}
              onChange={(e) => setToken2Address(e.target.value)}
              className="w-full"
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowNewPoolDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Vault</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PoolCreationDialog;
