import httpx
import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOLD_API_KEY")
API_URL = os.getenv("GOLD_API_URL")
GOLD_PRICE_FILE = "app/gold_price.json"

def save_gold_price(price: float):
    with open(GOLD_PRICE_FILE, "w") as f:
        json.dump({
            "datetime": datetime.now().isoformat(),
            "price": price
        }, f)

def load_saved_gold_price():
    if not os.path.exists(GOLD_PRICE_FILE):
        return None
    with open(GOLD_PRICE_FILE, "r") as f:
        try:
            data = json.load(f)
            return data
        except Exception as e:
            print("gold_price.json dosyası okunurken hata oluştu:", e)
            return None

async def fetch_gold_price_from_api():
    if not API_URL:
        raise ValueError("API_URL environment variable is not set")
    headers = {
        "x-access-token": API_KEY,
        "Content-Type": "application/json"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(API_URL, headers=headers)
        data = response.json()
        return float(data["price"])

async def get_gold_price():
    now = datetime.now()
    saved = load_saved_gold_price()
    if saved:
        raw_datetime = saved.get("datetime")
        if isinstance(raw_datetime, str):
            try:
                last_time = datetime.fromisoformat(raw_datetime)
            except Exception as e:
                print("Datetime string hatalı, yeni veri alınacak:", e)
                last_time = now - timedelta(hours=24)
        else:
            print("Datetime alanı string değil veya mevcut değil, yeni veri alınacak.")
            last_time = now - timedelta(hours=24)
        if now - last_time < timedelta(hours=8):
            return saved["price"]
    price = await fetch_gold_price_from_api()
    save_gold_price(price)
    return price
