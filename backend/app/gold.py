import httpx
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOLD_API_KEY")
API_URL = os.getenv("GOLD_API_URL")

async def get_gold_price():
    # CoinGecko API - Tamamen ücretsiz, API key gerektirmez
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("https://api.coingecko.com/api/v3/simple/price", 
                                      params={"ids": "gold", "vs_currencies": "usd"})
            data = response.json()
            return data["gold"]["usd"]
    except Exception as e:
        print(f"Altın fiyatı alınamadı: {e}")
        return 2800.00  # Fallback değer
