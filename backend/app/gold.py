import httpx
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOLD_API_KEY")
API_URL = os.getenv("GOLD_API_URL")

async def get_gold_price():
    if not API_URL:
        raise ValueError("API_URL environment variable is not set")
    
    headers = {
        "x-access-token": API_KEY,
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(API_URL, headers=headers)
        data = response.json()
        return data[2500]
