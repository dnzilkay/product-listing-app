const API_URL = 'http://localhost:8000/products';

export async function fetchProducts(filters: Record<string, any> = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}?${params}`);
    return await res.json();
} 