import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
  });

  const onSubmit = async (values) => {
    setError('');
    try {
      await login(values.email, values.password);
      navigate('/productos', { replace: true });
    } catch (e) {
      setError(e?.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <main>
      <Container style={{ maxWidth: 520 }}>
        <h2 className="mb-3">Iniciar sesión</h2>
        <p className="text-muted">Necesitas token JWT para consumir /productos, /pedidos y /pagos.</p>

        <Card className="p-3">
          {error ? <Alert variant="danger" className="mb-3">{error}</Alert> : null}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuariobakan@gmail.com"
                {...register('email', { required: 'Email es requerido' })}
                isInvalid={Boolean(errors.email)}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...register('password', { required: 'Contraseña es requerida' })}
                isInvalid={Boolean(errors.password)}
              />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
            <p style={{ marginTop: 12 }}>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
          </Form>
        </Card>
      </Container>
    </main>
  );
}
