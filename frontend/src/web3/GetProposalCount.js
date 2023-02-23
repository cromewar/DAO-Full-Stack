import { ethers } from "ethers";
import { useState } from "react";

import contractAddress from "../chain-info/deployments/map.json";
import contractABI from "../chain-info/contracts/MoralisGovernor.json"

export function useGetProposals() {
    const [proposalCount, setProposalCount] = useState();

    async function getProposalCount() {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = contractAddress["5"]["MoralisGovernor"][0];
            const abi = contractABI.abi;
            const GovernanceToken = new ethers.Contract(contract, abi, provider);
            const value = await GovernanceToken.getNumberOfProposals();
            setProposalCount(value.toString());
        } catch {
            console.log("error")
        }

    }


    return { proposalCount, getProposalCount }
}