export const VAULT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_token0",
                type: "address",
            },
            {
                internalType: "address",
                name: "_token1",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address",
            },
        ],
        name: "ERC721InvalidApprover",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "ERC721InvalidOperator",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "ERC721InvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "ERC721InvalidReceiver",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "ERC721InvalidSender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ERC721NonexistentToken",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newRate",
                type: "uint256",
            },
        ],
        name: "FeeRateUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        name: "FeesCollected",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        name: "PositionClosed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addedAmount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "addedAmount1",
                type: "uint256",
            },
        ],
        name: "PositionModified",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        name: "PositionOpened",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "sellToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "sellAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "buyAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "feeAmount",
                type: "uint256",
            },
        ],
        name: "SwapExecuted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [],
        name: "FEE_DENOMINATOR",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
        ],
        name: "closePosition",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sellToken",
                type: "address",
            },
            {
                internalType: "address",
                name: "buyToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "sellAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minBuyAmount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "signature",
                type: "bytes",
            },
        ],
        name: "executeSwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "feeGrowthGlobal0",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "feeGrowthGlobal1",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "positionId",
                type: "uint256",
            },
        ],
        name: "getPosition",
        outputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feesClaimed0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feesClaimed1",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "unclaimedFees0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "unclaimedFees1",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "originAddress",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "originNetwork",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "metadata",
                type: "bytes",
            },
        ],
        name: "onMessageReceived",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
        ],
        name: "openPosition",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "positions",
        outputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feesClaimed0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "feesClaimed1",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "entryFeeGrowthGlobal0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "entryFeeGrowthGlobal1",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "swapFeeRate",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "token0",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "token1",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalAmount0",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalAmount1",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "newFeeRate",
                type: "uint256",
            },
        ],
        name: "updateFeeRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "userPositions",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;
