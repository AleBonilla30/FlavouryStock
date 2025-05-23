# FlavouryStock

Sistema de gestión de inventario y stock para establecimientos de hostelería, desarrollado con Angular y Node.js.

## 📂 Frontend

### Descripción

Aplicación web desarrollada con Angular que proporciona una interfaz moderna y responsive para la gestión de inventario, permitiendo a los usuarios administrar productos, categorías y realizar seguimiento del stock.

### Tecnologías

- Angular v19.1.0
- TypeScript v5.7.2
- RxJS v7.8.0
- Bootstrap v5.3.3
- SweetAlert2 v11.17.2
- Swiper v11.2.6

### Estructura de Carpetas

```
Frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes de la aplicación
│   │   │   ├── auth/      # Componentes de autenticación
│   │   │   ├── products/  # Gestión de productos
│   │   │   └── shared/    # Componentes reutilizables
│   │   ├── services/      # Servicios HTTP y lógica de negocio
│   │   ├── models/        # Interfaces y tipos
│   │   ├── pipes/         # Pipes personalizados
│   │   └── error/         # Manejo de errores
│   ├── assets/            # Recursos estáticos
│   └── environments/      # Configuraciones por entorno
```

### Funcionalidades Implementadas

1. **Autenticación**

   - Login con JWT
   - Registro de usuarios
   - Protección de rutas
   - Interceptor HTTP para tokens

   ## 🔐 Autenticación con JWT

La aplicación implementa autenticación basada en JWT (JSON Web Tokens). Al iniciar sesión, el backend genera un token JWT que se almacena en `localStorage`. Este token se adjunta automáticamente en el header `Authorization` de cada petición HTTP mediante un interceptor de Angular. Las rutas protegidas en el backend utilizan un middleware que valida el token antes de permitir el acceso.

- Frontend: guarda el token y protege rutas con `AuthGuard` y `AuthInterceptor`.
- Backend: verifica el token con un middleware antes de procesar las solicitude

2. **Gestión de Productos**

   - Listado con paginación
   - Filtrado por categoría
   - Búsqueda por nombre
   - CRUD completo de productos
   - Validación de formularios

3. **Control de Stock**
   - Visualización de stock actual
   - Actualización de cantidades
   - Alertas de stock bajo

### Instalación y Desarrollo

1. Instalar dependencias:

```bash
cd Frontend
npm install
```

2. Iniciar servidor de desarrollo:

```bash
npm start
```

3. Compilar para producción:

```bash
npm run build
```

### Configuración de Entornos

El proyecto incluye dos entornos:

- `environment.ts`: Desarrollo local
- `environment.prod.ts`: Producción

## 🔙 Backend

### Descripción

API REST desarrollada con Node.js y Express que proporciona endpoints para la gestión de datos, autenticación y operaciones CRUD del sistema.

### Tecnologías

- Node.js
- Express v4.21.2
- MySQL v3.13.0
- bcryptjs para encriptación
- dotenv para variables de entorno

### Estructura de Carpetas

```
Backend/
├── src/
│   ├── controllers/   # Controladores de rutas
│   │   ├── authController.js    # Autenticación
│   │   ├── productController.js # Gestión de productos
│   │   └── stockController.js   # Control de stock
│   ├── models/        # Modelos de datos
│   │   ├── User.js    # Modelo de usuario
│   │   └── Product.js # Modelo de producto
│   ├── routes/        # Definición de rutas
│   │   ├── auth.js    # Rutas de autenticación
│   │   └── api.js     # Rutas de la API
│   └── config/        # Configuraciones
│       ├── db.js      # Conexión a base de datos
```

### Funcionalidades Implementadas

1. **Autenticación**

   - Registro de usuarios con encriptación de contraseñas
   - Login con generación de JWT
   - Middleware de verificación de token
   - Manejo de sesiones

2. **Gestión de Productos**

   - CRUD completo de productos
   - Validación de datos
   - Relaciones con categorías
   - Búsqueda y filtrado

3. **Control de Stock**
   - Actualización de cantidades
   - Verificación de stock disponible
   - Registro de movimientos
   - Alertas de stock bajo

### Instalación y Desarrollo

1. Instalar dependencias:

```bash
cd Backend
npm install
```

2. Configurar variables de entorno:
   Crear archivo `.env` con:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=flavoury_stock
JWT_SECRET=your_secret_key
```

3. Iniciar servidor:

```bash
npm run dev
```

### Endpoints Principales

| Método | Ruta               | Descripción               |
| ------ | ------------------ | ------------------------- |
| POST   | /api/auth/login    | Autenticación de usuario  |
| POST   | /api/auth/register | Registro de nuevo usuario |
| GET    | /api/products      | Listar productos          |
| POST   | /api/products      | Crear producto            |
| PUT    | /api/products/:id  | Actualizar producto       |
| DELETE | /api/products/:id  | Eliminar producto         |
| GET    | /api/categories    | Listar categorías         |
| GET    | /api/stock         | Consultar stock           |

## 🧑‍💻 Manual de Usuario

### Funcionalidades Principales

- Gestión de inventario en tiempo real
- Control de stock y alertas de bajo inventario
- Categorización de productos
- Gestión de usuarios y roles

### Guía de Uso

1. **Registro y Acceso**

   - Acceder a la página de login
   - Registrarse con email y contraseña
   - Iniciar sesión con credenciales

2. **Gestión de Productos**

   - Añadir nuevo producto con detalles y stock inicial
   - Editar información de productos existentes
   - Eliminar productos del sistema
   - Filtrar y buscar productos

3. **Control de Stock**
   - Visualizar niveles de stock actual
   - Actualizar cantidades
   - Recibir alertas de stock bajo
   - Generar reportes de inventario

### Consejos y Atajos

- Usa la barra de búsqueda para encontrar productos rápidamente
- Filtra por categorías para una mejor organización
- Configura alertas de stock bajo según tus necesidades
