import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';   // ESTA LÍNEA ES LA CLAVE
import Products from './Products';

// Usamos un único mock compartido para poder hacer asserts de llamadas
const addToCartMock = jest.fn();

// Mock del contexto del carrito
jest.mock('../context/AppContext', () => ({
  useCart: () => ({
    addToCart: addToCartMock,
  }),
}));

describe('Componente Products', () => {

  beforeEach(() => {
    // Limpia el historial de llamadas entre tests
    addToCartMock.mockClear();
  });

  test('cada tarjeta tiene su botón "Agregar"', async () => {
    render(<Products />);

    // Espera hasta que aparezcan las tarjetas
    const cards = await screen.findAllByTestId("product-card"); 
    expect(cards.length).toBeGreaterThan(0);

    // Comprobar que cada tarjeta tenga el botón "Agregar"
    cards.forEach(card => {
      expect(within(card).getByRole('button', { name: /Agregar/i }))
        .toBeInTheDocument();
    });
  });

  test("renderiza todas las tarjetas de producto", async () => {
    render(<Products />);

    // Selecciona todas las tarjetas renderizadas (async por si cargan luego)
    const productCards = await screen.findAllByTestId("product-card");

    // Confirma que haya al menos una
    expect(productCards.length).toBeGreaterThan(0);

    // Validar que cada tarjeta tenga precio (hay un $)
    productCards.forEach(card => {
      expect(card).toHaveTextContent(/\$/i);            // Precio (tiene $)
    });
  });

  test('el botón "Agregar" aparece en cada tarjeta', async () => {
    // reemplaza el contenido por la pruebas específicas
    render(<Products />);

    // Obtener todas las tarjetas de producto (async si hay fetch/useEffect)
    const cards = await screen.findAllByTestId("product-card");
    expect(cards.length).toBeGreaterThan(0);

    // Comprobar que cada tarjeta tenga el botón "Agregar"
    cards.forEach(card => {
      const Button = within(card).getByRole('button', { name: /Agregar/i });
      expect(Button).toBeInTheDocument();
    });
  });

  test('renderiza productos y permite agregar', async () => {
    // reemplaza el contenido por la pruebas específicas
    const user = userEvent.setup();   // ✅ ya instalaste la versión latest
    render(<Products />);

    // Primero asegurarte que hay productos renderizados
    // (usa findByText por si los productos llegan de forma asíncrona)
    await screen.findByText(/La Ropería/i);

    // Buscar el primer botón Agregar
    const addButton = screen.getAllByRole('button', { name: /Agregar/i })[0];

    // Clickear el botón
    await user.click(addButton);

    // ✅ Assert real: se llamó a addToCart (mockeado desde el contexto)
    expect(addToCartMock).toHaveBeenCalledTimes(1);

    // Si addToCart recibe el producto como parámetro, puedes asertarlo así:
    // expect(addToCartMock).toHaveBeenCalledWith(expect.objectContaining({
    //   name: 'La Ropería',
    // }));

    // Test de renderizado condicional (si no hay productos)
  test('muestra mensaje si no hay productos', async () => {
    // Mock para devolver array vacío
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });
    
    render(<Products />);
    
    // Esperar mensaje de "no hay productos" o similar
    expect(await screen.findByText(/no hay productos/i)).toBeInTheDocument();
  });
  });
});
