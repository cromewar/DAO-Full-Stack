import { ethers } from "ethers";
import { useState } from "react";

import contractAddress from "../chain-info/deployments/map.json";
import contractABI from "../chain-info/contracts/GovernanceToken.json"





export function useGetTotalVoters() {
    const [voters, setVoters] = useState();

    async function getVoters() {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = contractAddress["5"]["GovernanceToken"][0];
            const abi = contractABI.abi;
            const GovernanceToken = new ethers.Contract(contract, abi, provider);
            const value = await GovernanceToken.getHolderLength();
            setVoters(value.toString());
        } catch {
            console.log("error")
        }

    }


    return { voters, getVoters }
}