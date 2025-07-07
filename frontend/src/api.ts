const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export async function fetchProducts(filters: Record<string, any> = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}?${params}`);
    return await res.json();
} 