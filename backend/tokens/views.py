from django.shortcuts import render
import json
from .services import get_token_balance, authenticate_challenge, verify_challenge
from django.http import HttpResponse

# Create your views here.
def get_balance(requests):
    address = requests.GET.get("address")
    result = get_token_balance(address)
    result_json = json.dumps(result)
    return HttpResponse(result_json, content_type="application/json")


def request_challenge(requests):
    chain_id = requests.GET.get("chainId")
    address = requests.GET.get("address")
    request_result = authenticate_challenge(chain_id, address)
    request_json = json.dumps(request_result)
    return HttpResponse(request_json, content_type="application/json")


def verify_challenge(requests):
    message = requests.GET.get("message")
    signature = requests.GET.get("signature")
    verify_result = verify_challenge(message, signature)
    verify_json = json.dumps(verify_result)
    return HttpResponse(verify_json, content_type="application/json")
