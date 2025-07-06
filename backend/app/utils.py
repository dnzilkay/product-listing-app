import json
from app.gold import get_gold_price

def popularity_to_5star(score: float) -> float:
    return round(score * 5, 1)

async def load_products_with_prices():
    with open("app/products.json", "r") as f:
        products = json.load(f)

    gold_price = await get_gold_price()

    for product in products:
        popularity = product["popularityScore"]
        weight = product["weight"]
        price = round((popularity + 1) * weight * gold_price, 2)

        product["price"] = price
        product["popularity"] = popularity_to_5star(popularity)

    return products
