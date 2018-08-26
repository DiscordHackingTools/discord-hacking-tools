import requests

import json
from pprint import pprint

with open('./info.json') as f:
  data = json.load(f)

API_ENDPOINT = 'https://discordapp.com/api/v6'
CLIENT_ID = data['bots']['ezDiscordBot']['clientId']
CLIENT_SECRET = data['bots']['ezDiscordBot']['clientSecret']
REDIRECT_URI = 'https://nicememe.website'

def get_token():
  data = {
    'grant_type': 'client_credentials',
    'scope': 'identify connections bot guilds guilds.join'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data, headers, auth=(CLIENT_ID, CLIENT_SECRET))
  r.raise_for_status()
  return r.json()
print(get_token())