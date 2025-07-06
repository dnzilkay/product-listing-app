import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import ProductCard from './components/ProductCard';
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export type Product = {
    name: string;
    price: number;
    popularity: number;
    images: {
        yellow: string;
        white: string;
        rose: string;
    };
};

const priceRanges = [
    { label: 'Tümü', min: 0, max: 999999 },
    { label: '$5,000 - $10,000', min: 5000, max: 10000 },
    { label: '$10,000 - $15,000', min: 10000, max: 15000 },
    { label: '$15,000 - $20,000', min: 15000, max: 20000 },
    { label: '$20,000+', min: 20000, max: 999999 },
];

const popularityOptions = [
    { label: 'Tümü', min: 0 },
    { label: '1★ ve üzeri', min: 1 },
    { label: '2★ ve üzeri', min: 2 },
    { label: '3★ ve üzeri', min: 3 },
    { label: '4★ ve üzeri', min: 4 },
    { label: '5★', min: 5 },
];

const sortOptions = [
    { label: 'Önerilen', value: 'recommended' },
    { label: 'Fiyat: Düşükten Yükseğe', value: 'price-asc' },
    { label: 'Fiyat: Yüksekten Düşüğe', value: 'price-desc' },
    { label: 'Popülerlik', value: 'popularity' },
    { label: 'En Yeniler', value: 'newest' },
];

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPopularity, setSelectedPopularity] = useState(popularityOptions[0]);
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

    // Gizli filtreleme paneli
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState(0);

    // Filtrelere göre backend'den ürünleri çek
    useEffect(() => {
        const filters = {
            minPrice: selectedPriceRange.min,
            maxPrice: selectedPriceRange.max,
            minPopularity: selectedPopularity.min
        };

        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts(filters);
                setProducts(data);
            } catch (error) {
                console.error('Ürünler yüklenirken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [selectedPriceRange, selectedPopularity]);

    // Aktif filtre sayısını hesapla
    useEffect(() => {
        let count = 0;
        if (selectedPriceRange.label !== 'Tümü') count++;
        if (selectedPopularity.label !== 'Tümü') count++;
        if (selectedSort.value !== 'recommended') count++;
        setActiveFilters(count);
    }, [selectedPriceRange, selectedPopularity, selectedSort]);

    const resetAllFilters = () => {
        setSelectedPriceRange(priceRanges[0]);
        setSelectedPopularity(popularityOptions[0]);
        setSelectedSort(sortOptions[0]);
    };

    // Ürünleri sırala
    const sortedProducts = [...products].sort((a, b) => {
        switch (selectedSort.value) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'popularity':
                return b.popularity - a.popularity;
            case 'newest':
                return 0; // Şimdilik rastgele, gerçek veriye göre güncellenebilir
            default:
                return 0;
        }
    });

    return (
        <div className="main-app-layout">
            <header className="main-header">
                <div className="header-row">
                    <div className="header-line" />
                    <h1 className="header-title">Product List</h1>
                    <div className="header-line" />
                </div>
            </header>

            {/* Pandora Tarzı Gizli Filtreleme Alanı */}
            <div className="pandora-filter-section">
                <div className="filter-header">
                    <div className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                        <span className="filter-icon">🔍</span>
                        <span className="filter-text">Filtrele ve Sırala</span>
                        {activeFilters > 0 && (
                            <span className="active-filter-count">{activeFilters}</span>
                        )}
                        <span className={`toggle-arrow ${showFilters ? 'open' : ''}`}>▼</span>
                    </div>
                    
                    <div className="sort-selector">
                        <select 
                            value={selectedSort.value}
                            onChange={(e) => setSelectedSort(sortOptions.find(opt => opt.value === e.target.value) || sortOptions[0])}
                            className="sort-select"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gizli Filtreleme Paneli */}
                {showFilters && (
                    <div className="hidden-filter-panel">
                        <div className="filter-section">
                            <h3 className="filter-section-title">
                                <span className="filter-icon">💰</span>
                                Fiyat Aralığı
                            </h3>
                            
                            <div className="price-options-grid">
                                {priceRanges.map(opt => (
                                    <button
                                        key={opt.label}
                                        className={`price-option-btn${selectedPriceRange.label === opt.label ? ' active' : ''}`}
                                        onClick={() => setSelectedPriceRange(opt)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-section-title">
                                <span className="filter-icon">⭐</span>
                                Popülerlik
                            </h3>
                            <div className="popularity-options">
                                {popularityOptions.map(opt => (
                                    <button
                                        key={opt.label}
                                        className={`popularity-option-btn${selectedPopularity.label === opt.label ? ' active' : ''}`}
                                        onClick={() => setSelectedPopularity(opt)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filtre Sıfırlama */}
                        <div className="filter-reset">
                            <button onClick={resetAllFilters} className="reset-btn">
                                Tüm Filtreleri Sıfırla
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="carousel-section">
                {loading ? (
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <span>Ürünler yükleniyor...</span>
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={32}
                        slidesPerView={4}
                        breakpoints={{
                            1200: { slidesPerView: 4 },
                            900: { slidesPerView: 3 },
                            600: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                        style={{ width: '100%', maxWidth: 1400, padding: '0 32px' }}
                    >
                        {sortedProducts.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default App;
