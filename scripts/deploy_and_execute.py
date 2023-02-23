from brownie import (
    MoralisGovernor,
    TimeLock,
    Box,
    GovernanceToken,
    network,
    config,
    Contract,
    accounts,
    chain,
)
from scripts.helpful_scripts import get_account
from scripts.deploy_contracts import deploy_contracts
from web3 import Web3
import time

PROPOSAL_DESCRIPTION = "Store a value in the Box contract."

STORE_VALUE = 150

VOTING_PERIOD = 300  # 1 hour


def execute_proposal():
    deploy_contracts()
    proposal_id = propose(STORE_VALUE)
    print(f"proposal id: {proposal_id}")
    if network.show_active() == "development":
        move_blocks(10)
    vote(proposal_id, 1)
    if network.show_active() == "development":
        move_blocks(VOTING_PERIOD + 1)
    print(f"Proposal State {MoralisGovernor[-1].state(proposal_id)}")
    queue_and_execute(STORE_VALUE)


def propose(store_value):
    account = get_account()
    args = (store_value,)
    encoded_function = Contract.from_abi("Box", Box[-1], Box.abi).store.encode_input(
        *args
    )
    print(encoded_function)
    propose_tx = MoralisGovernor[-1].propose(
        [Box[-1].address],
        [0],
        [encoded_function],
        PROPOSAL_DESCRIPTION,
        {"from": account},
    )
    if network.show_active() == "development":
        tx = account.transfer(accounts[0], "0.1 ether")
        tx.wait(1)
    propose_tx.wait(2)
    proposal_id = propose_tx.events["ProposalCreated"]["proposalId"]
    print(f"Proposal State {MoralisGovernor[-1].state(proposal_id)}")
    print(f"Proposal Snapshot {MoralisGovernor[-1].proposalSnapshot(proposal_id)}")
    print(f"Proposal deadline {MoralisGovernor[-1].proposalDeadline(proposal_id)}")

    return proposal_id


def vote(proposal_id: int, vote: int):
    # 0 => Against, 1 => For, 2 => Abstain
    print(f"Voting yes on {proposal_id}")
    account = get_account()
    tx = MoralisGovernor[-1].castVoteWithReason(
        proposal_id, vote, "I vote yes because reasons...", {"from": account}
    )
    tx.wait(1)
    print(tx.events["VoteCast"])


def queue_and_execute(store_value):
    account = get_account()
    args = (store_value,)
    encoded_function = Contract.from_abi("Box", Box[-1], Box.abi).store.encode_input(
        *args
    )
    # description hash
    description_hash = Web3.keccak(text=PROPOSAL_DESCRIPTION).hex()
    tx = MoralisGovernor[-1].queue(
        [Box[-1].address],
        [0],
        [encoded_function],
        description_hash,
        {"from": account},
    )

    tx.wait(1)

    if network.show_active() == "development":
        time.sleep(5)

    tx = MoralisGovernor[-1].execute(
        [Box[-1].address],
        [0],
        [encoded_function],
        description_hash,
        {"from": account},
    )
    tx.wait(1)
    print(f"Box Value: {Box[-1].retrieve()}")


def move_blocks(amount):
    for block in range(amount):
        get_account().transfer(get_account(), "0 ether")
    print(chain.height)


def main():
    execute_proposal()
