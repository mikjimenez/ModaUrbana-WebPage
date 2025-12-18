import { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { useAuth } from '../context/AppContext';
import { ProductosApi } from '../api/modaUrbanaApi';
import Filters from '../components/products/Filters';
import ProductGrid from '../components/products/ProductGrid';

export default function Products() {
    const { addToCart } = useCart();
    const { token } = useAuth();
    const [filter, setFilter] = useState('all');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError('');
        ProductosApi.list(token)
            .then((data) => {
                if (!mounted) return;
                // Backend returns Producto[] with fields: id, nombre, descripcion, precio, categoria, imageUrl...
                const mapped = (Array.isArray(data) ? data : []).map((p) => ({
                    id: p.id,
                    name: p.nombre,
                    description: p.descripcion,
                    material: p.material,
                    size: p.talla,
                    price: p.precio,
                    stock: p.stock,
                    category: p.categoria,
                    imageUrl: p.imageUrl,
                }));
                setProducts(mapped);
            })
            .catch((e) => {
                if (!mounted) return;
                setError(e?.message || 'No se pudieron cargar los productos');
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });
        return () => { mounted = false; };
    }, [token]);

    const categories = useMemo(() => {
        const set = new Set(products.map(p => p.category).filter(Boolean));
        return Array.from(set);
    }, [products]);

    const list = useMemo(() => {
        return filter === 'all'
        ? products
        : products.filter(p => p.category === filter);
    }, [filter, products]);

    return (
        <main>
        <Container>
            <h2 className="mb-2">CATALOGO DE PRODUCTOS</h2>
            <p className="text-muted mb-3">Pantalones, Poleras, Zapatillas y Hoodies</p>

            <Filters
                current={filter}
                onChange={setFilter}
                options={categories}
                total={products.length}
            />

            {loading ? <p className="text-muted">Cargando productos...</p> : null}
            {error ? <p className="text-danger">{error}</p> : null}
            {!loading && !error ? <ProductGrid items={list} onAdd={addToCart} /> : null}
        </Container>
        </main>
    );
}
