import { apiRequest } from './client';

// =========================
// Auth
// =========================

/**
 * Backend: POST /api/v1/auth/login
 * Body: { username, password }
 * Response: { token }
 */
export async function login({ username, password }) {
  return apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: { username, password },
  });
}

export async function register(data) {
  return apiRequest('/api/v1/auth/register', {
    method: 'POST',
    body: data,
  });
}



// =========================
// Productos
// =========================

export const ProductosApi = {
  list: (token) => 
    apiRequest('/productos', { token }),

  get: (id, token) => 
    apiRequest(`/productos/${id}`, { token }),

  create: (producto, token) => 
    apiRequest('/productos', { method: 'POST', body: producto, token }),

  update: (id, producto, token) => 
    apiRequest(`/productos/${id}`, { method: 'PUT', body: producto, token }),

  remove: (id, token) => 
    apiRequest(`/productos/${id}`, { method: 'DELETE', token }),

  actualizarStock: (id, nuevoStock, token) => 
    apiRequest(`/productos/${id}/stock?nuevoStock=${encodeURIComponent(nuevoStock)}`, { method: 'PUT', token }),

  aplicarDescuento: (id, porcentaje, token) => 
    apiRequest(`/productos/${id}/descuento?porcentaje=${encodeURIComponent(porcentaje)}`, { method: 'PUT', token }),
};

// =========================
// Pedidos
// =========================

export const PedidosApi = {
  list: (token) => 
    apiRequest('/pedidos', { token }),

  get: (id, token) => 
    apiRequest(`/pedidos/${id}`, { token }),

  create: (pedido, token) => 
    apiRequest('/pedidos', { method: 'POST', body: pedido, token }),

  update: (id, pedido, token) => 
    apiRequest(`/pedidos/${id}`, { method: 'PUT', body: pedido, token }),

  remove: (id, token) => 
    apiRequest(`/pedidos/${id}`, { method: 'DELETE', token }),

  actualizarEstado: (id, estado, token) => 
    apiRequest(`/pedidos/${id}/estado?estado=${encodeURIComponent(estado)}`, { method: 'PUT', token }),
};

// =========================
// Pagos
// =========================

export const PagosApi = {
  list: (token) => 
    apiRequest('/pagos', { token }),

  get: (id, token) => 
    apiRequest(`/pagos/${id}`, { token }),

  create: (pago, token) => 
    apiRequest('/pagos', { method: 'POST', body: pago, token }),

  update: (id, pago, token) => 
    apiRequest(`/pagos/${id}`, { method: 'PUT', body: pago, token }),

  remove: (id, token) => 
    apiRequest(`/pagos/${id}`, { method: 'DELETE', token }),
  
  actualizarEstado: (id, estado, token) => 
    apiRequest(`/pagos/${id}/estado?estado=${encodeURIComponent(estado)}`, { method: 'PUT', token }),
};
