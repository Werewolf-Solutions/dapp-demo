/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Crowdsale, CrowdsaleInterface } from "../../contracts/Crowdsale";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract MyToken",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalPrice",
        type: "uint256",
      },
    ],
    name: "TokensPurchased",
    type: "event",
  },
  {
    inputs: [],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
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
    name: "endTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "_price",
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
        name: "_tokenPrice",
        type: "uint256",
      },
    ],
    name: "setTokenPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startTime",
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
    name: "startTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract MyToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPrice",
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
    name: "tokensSold",
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
    name: "withdrawEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516107e63803806107e683398101604081905261002f9161006f565b60008054336001600160a01b031991821617909155600180549091166001600160a01b0395909516949094179093556002919091556003556004556100ba565b6000806000806080858703121561008557600080fd5b84516001600160a01b038116811461009c57600080fd5b60208601516040870151606090970151919890975090945092505050565b61071d806100c96000396000f3fe6080604052600436106100a75760003560e01c80638da5cb5b116100645780638da5cb5b1461014e578063a035b1fe14610186578063a85adeab1461019b578063d0febe4c146101b0578063e6fd48bc146101b8578063fc0c546a146101cd57600080fd5b80633197cbb6146100ac578063518ab2a8146100d55780636a61e5fc146100eb5780637362377b1461010d57806378e97925146101225780637ff9b59614610138575b600080fd5b3480156100b857600080fd5b506100c260045481565b6040519081526020015b60405180910390f35b3480156100e157600080fd5b506100c260055481565b3480156100f757600080fd5b5061010b6101063660046105ce565b6101ed565b005b34801561011957600080fd5b5061010b610225565b34801561012e57600080fd5b506100c260035481565b34801561014457600080fd5b506100c260025481565b34801561015a57600080fd5b5060005461016e906001600160a01b031681565b6040516001600160a01b0390911681526020016100cc565b34801561019257600080fd5b506002546100c2565b3480156101a757600080fd5b506004546100c2565b61010b610322565b3480156101c457600080fd5b506003546100c2565b3480156101d957600080fd5b5060015461016e906001600160a01b031681565b6000546001600160a01b031633146102205760405162461bcd60e51b8152600401610217906105e7565b60405180910390fd5b600255565b6000546001600160a01b0316331461024f5760405162461bcd60e51b8152600401610217906105e7565b60045442116102a05760405162461bcd60e51b815260206004820152601b60248201527f43726f776473616c6520686173206e6f7420656e6465642079657400000000006044820152606401610217565b47806102e55760405162461bcd60e51b81526020600482015260146024820152734e6f20457468657220746f20776974686472617760601b6044820152606401610217565b600080546040516001600160a01b039091169183156108fc02918491818181858888f1935050505015801561031e573d6000803e3d6000fd5b5050565b600354421015801561033657506004544211155b6103825760405162461bcd60e51b815260206004820152601760248201527f43726f776473616c65206973206e6f74206163746976650000000000000000006044820152606401610217565b600034116103f15760405162461bcd60e51b815260206004820152603660248201527f496e76616c696420616d6f756e742e20596f75206d7573742073656e6420457460448201527568657220746f20707572636861736520746f6b656e7360501b6064820152608401610217565b60025460009061040934670de0b6b3a764000061064c565b610413919061066b565b6001546040516370a0823160e01b815230600482015291925082916001600160a01b03909116906370a082319060240160206040518083038186803b15801561045b57600080fd5b505afa15801561046f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610493919061068d565b10156104f05760405162461bcd60e51b815260206004820152602660248201527f496e73756666696369656e7420746f6b656e7320617661696c61626c6520666f604482015265722073616c6560d01b6064820152608401610217565b60015460405163a9059cbb60e01b8152336004820152602481018390526001600160a01b039091169063a9059cbb90604401602060405180830381600087803b15801561053c57600080fd5b505af1158015610550573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057491906106a6565b50806005600082825461058791906106cf565b90915550506040805133815260208101839052348183015290517f8fafebcaf9d154343dad25669bfa277f4fbacd7ac6b0c4fed522580e040a0f339181900360600190a150565b6000602082840312156105e057600080fd5b5035919050565b6020808252602f908201527f4f6e6c792074686520636f6e7472616374206f776e65722063616e207065726660408201526e37b936903a3434b99030b1ba34b7b760891b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561066657610666610636565b500290565b60008261068857634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561069f57600080fd5b5051919050565b6000602082840312156106b857600080fd5b815180151581146106c857600080fd5b9392505050565b600082198211156106e2576106e2610636565b50019056fea2646970667358221220b2b1bb238c12e75a1af00708cc2546543a26db7b3804bddc975df3dda4a17e7f64736f6c63430008090033";

type CrowdsaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrowdsaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Crowdsale__factory extends ContractFactory {
  constructor(...args: CrowdsaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    _tokenPrice: PromiseOrValue<BigNumberish>,
    _startTime: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Crowdsale> {
    return super.deploy(
      _token,
      _tokenPrice,
      _startTime,
      _endTime,
      overrides || {}
    ) as Promise<Crowdsale>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    _tokenPrice: PromiseOrValue<BigNumberish>,
    _startTime: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token,
      _tokenPrice,
      _startTime,
      _endTime,
      overrides || {}
    );
  }
  override attach(address: string): Crowdsale {
    return super.attach(address) as Crowdsale;
  }
  override connect(signer: Signer): Crowdsale__factory {
    return super.connect(signer) as Crowdsale__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrowdsaleInterface {
    return new utils.Interface(_abi) as CrowdsaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Crowdsale {
    return new Contract(address, _abi, signerOrProvider) as Crowdsale;
  }
}
