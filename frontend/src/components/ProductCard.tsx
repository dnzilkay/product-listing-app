import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import Carousel from './Carousel';

type Product = {
    name: string;
    price: number;
    popularity: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    };
};

type Props = {
    product: Product;
};

const colorLabels: Record<string, string> = {
    yellow: 'Yellow Gold',
    white: 'White Gold',
    rose: 'Rose Gold',
};

const ProductCard: React.FC<Props> = ({ product }) => {
    const [color, setColor] = useState<'yellow' | 'rose' | 'white'>('yellow');

    // Yıldızları referansa uygun şekilde göster (dolu, yarım, boş)
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) stars.push(<span key={i}>★</span>);
        if (hasHalfStar) stars.push(<span key="half">☆</span>);
        while (stars.length < 5) stars.push(<span key={stars.length}>☆</span>);
        return stars;
    };

    return (
        <div className="card">
            <div className="product-image-box">
                <img src={product.images[color]} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <div className="price">${product.price.toLocaleString()} USD</div>
            <div className="color-picker">
                <ColorPicker currentColor={color} onChange={setColor} />
            </div>
            <div className="selected-color-label">{colorLabels[color]}</div>
            <div className="popularity">
                <span className="stars">{renderStars(product.popularity)}</span>
                <span style={{ marginLeft: 6, color: '#888', fontSize: '0.98rem' }}>{product.popularity}/5</span>
            </div>
        </div>
    );
};

export default ProductCard;
