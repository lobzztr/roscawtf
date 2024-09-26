import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { contractABI } from "./contractABI";
import { fiatContractABI } from "./fiatContractABI";

const contractAddress = "0x627D0A5ff92c05EB1Ba450887E835A6020E26e69";

export const contract = getContract({
    client : client,
    chain : chain,
    address : contractAddress,
    abi : contractABI
});

const erc20FiatContractAddress = "0x42F253D3E3Ee7Dd8676DE6075c15A252879FA9cF";

export const erc20Contract = getContract({
    client : client,
    chain : chain,
    address : erc20FiatContractAddress,
    abi : fiatContractABI
});