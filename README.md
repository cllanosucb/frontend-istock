# iStock — Frontend (React)

Interfaz web del sistema de gestión de inventario y ventas de iPhones de medio uso.
Construido con Create React App + Tailwind CSS + React Router + lucide-react.
Consume la API REST del backend de iStock.

## Requisitos previos

- Node.js 18 o superior
- El backend de iStock corriendo

## 1. Instalación

```bash
git clone https://github.com/cllanosucb/frontend-istock.git
cd frontend-istock
npm install
```

## 2. Variables de entorno
Archivo `.env`.

Por defecto apunta al backend local:

```
REACT_APP_API_URL=http://localhost:4000/api
```

Si el backend corre en otra URL o puerto, ajustar esta variable.

> Importante: el backend debe tener `CORS_ORIGIN` configurado con la URL
> donde corre este frontend (por defecto `http://localhost:3000` con CRA).

## 3. Ejecutar en desarrollo

```bash
npm start
```

Abre automáticamente `http://localhost:3000`.

Usuario de prueba (creado por el seed del backend):
- Email: `admin@istock.com`
- Contraseña: `admin123`

## 4. Build de producción

```bash
npm run build
```

Genera la carpeta `build/` lista para servir con cualquier servidor estático.

## 5. Pantallas incluidas

| Ruta                        | Pantalla                                       |
|-----------------------------|--------------------------------------------------|
| `/login`                    | Login                                             |
| `/dashboard`                | Dashboard con métricas y últimas transacciones    |
| `/inventario`                | Listado de equipos (inventario)                   |
| `/inventario/nuevo`          | Registrar nuevo equipo                            |
| `/inventario/:id/editar`     | Editar equipo existente                           |
| `/ventas`                    | Listado de ventas                                 |
| `/ventas/nueva`              | Registrar nueva venta                             |
| `/ventas/:id/editar`         | Editar venta existente                            |

Todas las rutas excepto `/login` están protegidas: si no hay sesión iniciada,
redirige automáticamente al login.

## 6. Estructura del proyecto

```
istock-frontend/
├── src/
│   ├── api/
│   │   ├── client.js        # fetch centralizado (headers, token, errores)
│   │   └── resources.js     # funciones por recurso (auth, equipos, ventas, dashboard)
│   ├── context/
│   │   └── AuthContext.js   # sesion y token en localStorage
│   ├── components/
│   │   ├── Layout.js        # header + sidebar + main + footer
│   │   ├── ProtectedRoute.js
│   │   ├── MetricCard.js
│   │   ├── BadgeEstado.js
│   │   └── BadgeBateria.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── InventarioListPage.js
│   │   ├── InventarioFormPage.js
│   │   ├── VentasListPage.js
│   │   └── VentasFormPage.js
│   └── App.js                # definicion de rutas
├── .env.example
└── tailwind.config.js
```
