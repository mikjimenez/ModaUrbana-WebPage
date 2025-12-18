# ModaUrbanaSPA – Frontend (React)

Frontend web (Create React App) para consumir el backend **Spring Boot (usuarios)**.

## Requisitos
- Node.js + npm
- Backend corriendo en `http://localhost:8081`

## Configuración del Backend (URL)
Crea un archivo `.env` en la raíz del proyecto (o usa `.env.example`) con:

```bash
REACT_APP_API_URL=http://localhost:8081
```

> Si el backend está en otra IP/host (por ejemplo en Render), reemplaza la URL.

## Instalación y ejecución
```bash
npm install
npm start
```

La app abre en `http://localhost:3000`.

## Flujo de autenticación
1. Inicia sesión en **/login** con:
   - **Email** (se envía como `username` al backend)
   - **Password**
2. El JWT se guarda en `localStorage` (`modaUrbana.jwt`) y se envía como `Authorization: Bearer <token>` en las llamadas a:
   - `/productos`
   - `/pedidos`
   - `/pagos`

## Endpoints consumidos (principales)
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET/POST/PUT/DELETE /productos`
- `GET/POST/PUT/DELETE /pedidos`
- `GET/POST/PUT/DELETE /pagos`

## Notas
- Si ves error de **CORS**, asegúrate de ejecutar el frontend desde `http://localhost:3000` (es el origen permitido por defecto en el backend).
