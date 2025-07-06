from typing import Optional
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from app.utils import load_products_with_prices

app = FastAPI()

# CORS ayarı: Frontend'ten gelen istekleri kabul et
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/products")
async def get_products(
    minPrice: Optional[float] = Query(None),
    maxPrice: Optional[float] = Query(None),
    minPopularity: Optional[float] = Query(None),
):
    print("GELEN PARAMETRELER:", minPrice, maxPrice, minPopularity)
    all_products = await load_products_with_prices()

    filtered = [
        p for p in all_products
        if (minPrice is None or p["price"] >= minPrice)
        and (maxPrice is None or p["price"] <= maxPrice)
        and (minPopularity is None or p["popularity"] >= minPopularity)
    ]
    return filtered