//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // Min Delay is the minimum time that needs to pass before a proposal can be executed
    // Proposers are the addresses that can create proposals
    // Executors are the addresses that can execute proposals
    // Admin is the address that can set the delay
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}

// The time lock is going to be the Owner of the Governed contract
// We use the time lock beacuase we want to wait until a new vote is executed
// Also we want to setup a minium fee to be able to vote, let's say 7 tokens.
// This Gives time to get out if they don't like the proposal.
