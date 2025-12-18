import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      await registerUser({
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      });

      // Igual que flujo típico: registrar -> ir a login
      navigate("/login");
    } catch (e) {
      // Intenta mostrar el mensaje del backend si viene
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "No se pudo registrar. Revisa los datos e inténtalo nuevamente.";
      setError(msg);
    }
  };

  return (
    <main>
      <Container style={{ maxWidth: 520 }}>
        <h2 className="mb-3">Crear cuenta</h2>
        <p className="text-muted">
          Regístrate para obtener acceso a productos, pedidos y pagos.
        </p>

        <Card className="p-3">
          {error ? (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          ) : null}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Juan Pérez"
                {...register("nombre", { required: "Nombre es requerido" })}
                isInvalid={Boolean(errors.nombre)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuariobakan@gmail.com"
                {...register("email", { required: "Email es requerido" })}
                isInvalid={Boolean(errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...register("password", { required: "Contraseña es requerida" })}
                isInvalid={Boolean(errors.password)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>

            <p style={{ marginTop: 12 }}>
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Form>
        </Card>
      </Container>
    </main>
  );
}
