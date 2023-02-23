from scripts.helpful_scripts import get_account
from web3 import Web3
from brownie import MoralisGovernor, Box, network, Contract
import time

PROP_ID = 111403445045297341215706412724676450176013144908035482631692245730699401792215
PROPOSAL_DESCRIPTION = "Store a value in the Box contract."


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


# States: {Pending, Active, Canceled, Defeated, Succeeded, Queued, Expired, Executed }
