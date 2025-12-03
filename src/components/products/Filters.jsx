import { ButtonGroup, Button, Badge } from 'react-bootstrap';

export default function Filters({ current, onChange, options, total }) {
  const allActive = current === 'all';
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <ButtonGroup>
        <Button
          variant={allActive ? 'dark' : 'outline-dark'}
          onClick={() => onChange('all')}
          className="fw-bold"
        >
          Todos <Badge bg={allActive ? 'light' : 'dark'} text="dark" className="ms-1">{total}</Badge>
        </Button>
        {options.map(opt => {
          const isActive = current === opt;
          return (
            <Button
              key={opt}
              variant={isActive ? 'dark' : 'outline-dark'}
              onClick={() => onChange(opt)}
              className="fw-bold"
            >
              {opt}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
