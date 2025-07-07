# Backend - Altın Fiyatı Entegrasyonu

## Altın Fiyatı API Entegrasyonu

Bu projede altın fiyatı, God API üzerinden çekilir ve 8 saatte bir güncellenerek `app/gold_price.json` dosyasında saklanır. Böylece API limiti aşılmaz ve uygulama daha hızlı çalışır.

### .env Ayarları
Aşağıdaki değişkenleri `.env` dosyanıza ekleyin:

```
GOLD_API_KEY=senin_api_keyin
GOLD_API_URL=https://api.godapi.com/gold/price  # örnek URL, kendi URL'inizi girin
```

### Çalışma Mantığı
- Her ürün isteğinde, önce `app/gold_price.json` dosyasına bakılır.
- Eğer dosyada son güncellemeden itibaren 8 saat geçmemişse, dosyadaki fiyat kullanılır.
- Eğer dosyada fiyat yoksa veya 8 saatten eskiyse, API'den yeni fiyat çekilir ve dosyaya kaydedilir.

### Manuel Güncelleme
Altın fiyatını manuel olarak güncellemek için aşağıdaki Python kodunu çalıştırabilirsiniz:

```python
import asyncio
from app.gold import fetch_gold_price_from_api, save_gold_price

async def update_gold_price():
    price = await fetch_gold_price_from_api()
    save_gold_price(price)
    print(f"Güncel altın fiyatı: {price}")

asyncio.run(update_gold_price())
```

### Otomatik Güncelleme
- Her 8 saatte bir fiyat otomatik güncellenir.
- API limiti çok kısıtlıysa, 24 saatte bir güncelleme de tercih edebilirsiniz. Bunun için zamanlayıcı (cron job) ile yukarıdaki kodu 24 saatte bir çalıştırabilirsiniz.

### Notlar
- API anahtarınızı ve URL'inizi kimseyle paylaşmayın.
- `app/gold_price.json` dosyasını silerseniz, bir sonraki istekle otomatik olarak yeniden oluşturulur. 