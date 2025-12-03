import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Contact(){
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = (data.get('name') || '').trim();
        const email = (data.get('email') || '').trim();
        const message = (data.get('message') || '').trim();

        const errs = [];
        if(!name) errs.push('El nombre es obligatorio');
        if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('El correo es obligatorio y debe ser válido');
        if(!message) errs.push('El mensaje es obligatorio');

        setErrors(errs);
        setMsg(errs.length === 0 ? '¡Mensaje enviado (simulado)!' : '');
    };

    return (
        <main>
        <Container>
            <h2>Contacto</h2>
            <p>¿Tienes consultas o necesitas un pedido especial? ¡Contáctanos!</p>
            {msg && <Alert variant="success">{msg}</Alert>}
            {errors.length > 0 && <Alert variant="danger">{errors.join('. ')}</Alert>}

            <Form onSubmit={onSubmit} noValidate>
            <Form.Group className="mb-3" controlId="name" required>
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="name" required placeholder=' Ej: Mikael Esteban Jimenez Santana' />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" name="email" required placeholder=' Ej: mikaelesteban12@gmail.com'/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} name="message" required placeholder=' Ej: Hola esperando se encuentren bien escribo este mensaje con el fin de poder comunicar que una prenda de la cual
                estoy interesado hace mucho tiempo no tiene stock y me gustaria saber si es que volveran a traerla a la tienda debido a que...'/>
            </Form.Group>

            <Button 
            type="submit"
            variant="dark"
            className="mt-auto fw-bold"
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
            Enviar
            </Button>
            </Form>
        </Container>
        </main>
    );
}

export default Contact;