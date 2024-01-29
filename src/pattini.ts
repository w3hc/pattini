export const contractAddress = '0x4ce76EA09136fA38CD54c2EE82ab8403A9b8A414'
export const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_repositoryName',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_funderAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'issue',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pullRequest',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'commitHash',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'Paid',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'issue',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'previousCommitHash',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      }
    ],
    name: 'Taken',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'contributions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'issue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'previousCommitHash',
        type: 'string'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'paid',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'pullRequest',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'commitHash',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_issue',
        type: 'uint256'
      }
    ],
    name: 'flush',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'funderAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_issue',
        type: 'uint256'
      }
    ],
    name: 'getIssue',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'issue',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'previousCommitHash',
            type: 'string'
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address'
          },
          {
            internalType: 'bool',
            name: 'paid',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'pullRequest',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'commitHash',
            type: 'string'
          }
        ],
        internalType: 'struct Pattini.Contribution',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_issue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_pullRequest',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_commitHash',
        type: 'string'
      }
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'repositoryName',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_issue',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_previousCommitHash',
        type: 'string'
      },
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address'
      }
    ],
    name: 'take',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]
