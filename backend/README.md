# Backend API

Bu backend, ürün listesi için RESTful API sağlar.

## Kurulum

1. Python sanal ortamını aktifleştirin:
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# veya
.venv\Scripts\activate  # Windows
```

2. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
```

3. Environment değişkenlerini ayarlayın:
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```
GOLD_API_KEY=your_gold_api_key_here
GOLD_API_URL=https://www.goldapi.io/api/XAU/USD
```

## Çalıştırma

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API http://localhost:8000 adresinde çalışacaktır.

## API Endpoints

- `GET /products` - Tüm ürünleri getirir
  - Query parametreleri:
    - `minPrice`: Minimum fiyat
    - `maxPrice`: Maksimum fiyat  
    - `minPopularity`: Minimum popülerlik skoru

## Not

Altın fiyatı için gerçek bir API kullanılmaktadır. API anahtarı almak için https://www.goldapi.io adresini ziyaret edin. 