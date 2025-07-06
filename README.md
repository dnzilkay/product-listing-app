# Product Listing App

Modern ürün listeleme uygulaması - React + FastAPI ile geliştirilmiş.

## 🚀 Özellikler

- **gizli filtreleme** - Açılır/kapanır filtreleme paneli
- **Dolar cinsinden fiyat aralıkları** - $5,000 - $20,000+ arası
- **Popülerlik filtreleme** - Yıldız sistemi ile
- **Sıralama seçenekleri** - Fiyat, popülerlik, yenilik
- **Responsive tasarım** - Mobil ve masaüstü uyumlu
- **Gerçek zamanlı altın fiyatı** - API entegrasyonu

## 🛠️ Teknolojiler

### Frontend
- React 19 + TypeScript
- Vite
- Swiper (Carousel)
- CSS3 (Modern tasarım)

### Backend
- FastAPI
- Python 3.11
- httpx (HTTP client)
- CORS desteği

```
product-listing-app/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI uygulaması
│   │   ├── utils.py         # Yardımcı fonksiyonlar
│   │   ├── gold.py          # Altın fiyatı API
│   │   └── products.json    # Ürün verileri
│   ├── requirements.txt     # Python bağımlılıkları
│   └── README.md           # Backend dokümantasyonu
├── frontend/
│   ├── src/
│   │   ├── components/      # React bileşenleri
│   │   ├── App.tsx         # Ana uygulama
│   │   ├── api.ts          # API çağrıları
│   │   └── index.css       # Stiller
│   ├── package.json        # Node.js bağımlılıkları
│   └── README.md          # Frontend dokümantasyonu
└── README.md              # Bu dosya
```

## 🛠️ Kurulum

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

2. Frontend'i çalıştırın:
```bash
npm run dev
```

## 🌐 API Endpoints

- `GET /products` - Tüm ürünleri getirir
  - Query parametreleri:
    - `minPrice`: Minimum fiyat
    - `maxPrice`: Maksimum fiyat  
    - `minPopularity`: Minimum popülerlik skoru

## 💰 Fiyat Hesaplama

Ürün fiyatı şu formülle hesaplanır:
```
Fiyat = (Popülerlik Skoru + 1) × Ağırlık (gram) × Altın Fiyatı (USD/gram)
```

## 🎨 Tasarım Özellikleri

- Modern kart tasarımı
- Hover efektleri
- Responsive grid layout
- Swiper carousel
- Renk seçici butonları
- Yıldız derecelendirme sistemi

## 📱 Responsive Tasarım

- Desktop: Grid layout (3+ sütun)
- Tablet: Grid layout (2 sütun)
- Mobile: Tek sütun layout

## 🔧 Teknolojiler

### Backend
- FastAPI
- Python 3.8+
- httpx (HTTP client)
- python-dotenv

### Frontend
- React 19
- TypeScript
- Vite
- Swiper (Carousel)
- CSS Variables

## 📝 Notlar

- Altın fiyatı için gerçek bir API kullanılmaktadır
- API anahtarı almak için https://www.goldapi.io adresini ziyaret edin
- Uygulama tamamen responsive ve mobil uyumludur
- Carousel hem mouse hem de touch/swipe ile çalışır

## 🚀 Deployment

### Backend
- Heroku, Railway veya benzeri platformlarda deploy edilebilir
- Environment değişkenlerini ayarlamayı unutmayın

### Frontend
- Vercel, Netlify veya benzeri platformlarda deploy edilebilir
- Build komutu: `npm run build` 