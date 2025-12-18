import { Card, Button, Badge } from 'react-bootstrap';

export default function ProductCard({ product, onAdd }) {
    const { name, price, category, imageUrl, description, stock, size } = product;

    return (
        <Card data-testid="product-card" className="h-100 shadow-sm card-hover">
        {imageUrl && (
            <Card.Img
            variant="top"
            src={imageUrl}
            alt={`Imagen de ${name}`}
            loading="lazy"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
        )}
        <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                {name}
            </Card.Title>
            {category && <Badge bg="secondary">{category}</Badge>}
            </div>

            <Card.Text className="text-muted mb-2">
              ${Number(price).toLocaleString('es-CL')}
            </Card.Text>

            {description ? (
              <Card.Text className="mb-2" style={{ fontSize: '0.9rem' }}>
                {description}
              </Card.Text>
            ) : null}

            <Card.Text className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
              {size ? <>Talla: {size}</> : null}
              {size && typeof stock === 'number' ? ' • ' : null}
              {typeof stock === 'number' ? <>Stock: {stock}</> : null}
            </Card.Text>

            <Button
            variant="dark"
            onClick={onAdd}
            disabled={typeof stock === 'number' ? stock <= 0 : false}
            className="mt-auto fw-bold"
            aria-label={`Agregar ${name} al carrito`}
            style={{
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
>
            {typeof stock === 'number' && stock <= 0 ? 'Sin stock' : 'Agregar al Carrito'}
            </Button>
        </Card.Body>
        </Card>
    );
}
