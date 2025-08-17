# Livedex API

API sencilla para manejar una Livedex personal (registro de entradas con nombre, descripción, tipo e imagen por URL). Incluye autenticación de usuarios (registro y login) usando Node.js, Express y MongoDB Atlas.

## Características

- Registro y login de usuario (JWT)
- CRUD básico de livedex para usuario autenticado
- Cada entrada: nombre, descripción, tipo, imagen (URL)
- Conexión a MongoDB Atlas
- CORS habilitado para frontend

## Requisitos

- Node.js 16+
- Acceso a una base de datos MongoDB Atlas

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/livedex-api.git
   cd livedex-api
   ```
2. Instala dependencias:
```bash
npm install
```
3. Crea un archivo .env en la raíz con el siguiente contenido:

MONGODB_URI=<tu cadena de conexión a MongoDB Atlas>
JWT_SECRET=<una clave secreta para JWT>

3. Inicia el servidor:
```bash
npx nodemon server.js
# o
node server.js
```

El API arrancará por defecto en http://localhost:5000.

## Endpoints principales
- POST /api/auth/register — Registro de usuario
- POST /api/auth/login — Login de usuario
- GET /api/livedex — Listar entradas (requiere JWT)
- POST /api/livedex — Crear entrada (requiere JWT)
- PUT /api/livedex/:id — Editar entrada (requiere JWT)
- DELETE /api/livedex/:id — Eliminar entrada (requiere JWT)

## Licencia
MIT