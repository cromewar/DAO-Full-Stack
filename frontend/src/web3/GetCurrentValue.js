import { ethers } from "ethers";
import { useState } from "react";

import contractAddress from "../chain-info/deployments/map.json";
import contractABI from "../chain-info/contracts/Box.json"





export function useGetValue() {
    const [boxValue, setBoxValue] = useState();

    async function getValue() {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = contractAddress["5"]["Box"][0];
            const abi = contractABI.abi;
            const BoxContract = new ethers.Contract(contract, abi, provider);
            const value = await BoxContract.retrieve();
            setBoxValue(value.toString());
        } catch {
            console.log("error")
        }

    }


    return { boxValue, getValue }
}