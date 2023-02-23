import { ethers } from "ethers";
import { useState } from "react";

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"





export function useExecuteProposal() {



    async function queueProposal(signer, value, proposalDescription) {
        try {
            const boxContract = contractAddresses["5"]["Box"][0];
            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const encodedFunction = boxInterface.encodeFunctionData('store', [value]);
            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposalDescription))

            const queueTx = await moralisGovernorContractInstance.queue([boxContract], [0], [encodedFunction], descriptionHash, { gasLimit: 1000000 })
            const proposeReceipt = await queueTx.wait(5)

        } catch (err) {
            console.log(err)
        }

    }

    async function executeProposal(signer, value, proposalDescription) {
        try {
            const boxContract = contractAddresses["5"]["Box"][0];
            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const encodedFunction = boxInterface.encodeFunctionData('store', [value]);
            const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposalDescription))
            // const hexHash = ethers.utils.hexlify(descriptionHash)

            const executeTx = await moralisGovernorContractInstance.execute([boxContract], [0], [encodedFunction], descriptionHash, { gasLimit: 1000000 })
            const proposeReceipt = await executeTx.wait(5)

        } catch (err) {
            console.log(err)
        }

    }

    return { queueProposal, executeProposal }

}