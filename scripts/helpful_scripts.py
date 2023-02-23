from brownie import network, accounts, config
import eth_utils
import os
import shutil
import yaml
import json

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def get_account(id=None, index=None):
    if id:
        return accounts.load(id)
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])


def encode_function_data(function=None, *args):
    if len(args) == 0 or not function:
        return eth_utils.to_bytes(hexstr="0x")
    else:
        return function.encode_input(*args)


def copy_folder_to_front(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def update_frontend():
    copy_folder_to_front("./build", "./frontend/src/chain-info")

    with open("brownie-config.yaml") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./frontend/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json, indent=4)
    print("frontend updated")
