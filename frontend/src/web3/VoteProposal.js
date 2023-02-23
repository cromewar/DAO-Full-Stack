import { ethers } from "ethers";
import { useState } from "react";

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"





export function useVoteProposal() {



    async function voteInProposal(signer, proposalId, support, reason) {
        try {

            const moralisGovernor = contractAddresses["5"]["MoralisGovernor"][0];

            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);

            const voteTx = await moralisGovernorContractInstance.castVoteWithReason(proposalId, support, reason)
            const voteReceipt = await voteTx.wait(1)


        } catch (err) {
            console.log(err)
        }

    }

    return { voteInProposal }

}