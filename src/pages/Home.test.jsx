import { render, screen, fireEvent} from '@testing-library/react';
import Home from './Home';

test('renderiza la página principal correctamente', () => {
  render(<Home />);

  // Verifica el título principal
  expect(
    screen.getByText(/TU DISTRIBUIDORA DE CONFIANZA/i)
  ).toBeInTheDocument();

  // Verifica la imagen principal
  const heroImage = screen.getByAltText(/Moda Urbana/i);
  expect(heroImage).toBeInTheDocument();
  expect(heroImage).toHaveAttribute('src', expect.stringContaining('bnr%20home-777-drop3-7.jpg'));

  // Verifica el botón de catálogo
  expect(
    screen.getByRole('button', { name: /Ver Catálogo Completo/i })
  ).toBeInTheDocument();
});


test('redirige al hacer clic en el botón Ver Catálogo Completo', () => {
  delete window.location; // eliminamos temporalmente la propiedad
  window.location = { href: '' }; // mock

  render(<Home />);
  
  const button = screen.getByRole('button', { name: /Ver Catálogo Completo/i });
  fireEvent.click(button);

  expect(window.location.href).toBe('/productos');
});
