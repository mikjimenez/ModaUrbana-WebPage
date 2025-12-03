import { useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCart } from '../context/AppContext';
import { CLOTHE_PRODUCTS, CATEGORIES } from '../data/clothe.mock';
import Filters from '../components/products/Filters';
import ProductGrid from '../components/products/ProductGrid';

export default function Products() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');

    const list = useMemo(() => {
        return filter === 'all'
        ? CLOTHE_PRODUCTS
        : CLOTHE_PRODUCTS.filter(p => p.category === filter);
    }, [filter]);

    return (
        <main>
        <Container>
            <h2 className="mb-2">CATALOGO DE PRODUCTOS</h2>
            <p className="text-muted mb-3">Pantalones, Poleras, Zapatillas y Hoodies</p>

            <Filters
            current={filter}
            onChange={setFilter}
            options={CATEGORIES}
            total={CLOTHE_PRODUCTS.length}
            />

            <ProductGrid items={list} onAdd={addToCart} />
        </Container>
        </main>
    );
}
