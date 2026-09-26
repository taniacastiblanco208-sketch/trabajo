# Proyecto Front + Back + MySQL

Proyecto completo de ejemplo con:

- **Frontend**: React + Vite + React Router + Axios + React Bootstrap
- **Backend**: Express + MySQL2 + CORS + dotenv
- **Base de datos**: MySQL

## Estructura del proyecto

```
proyecto/
├── backend/          # Servidor Express (puerto 3000)
├── frontend/         # Aplicación React/Vite (puerto 5173)
├── database/         # Scripts SQL (schema + seed)
└── README.md
```

## Requisitos previos

- Node.js 18+
- MySQL 8+ (o MariaDB)
- npm

## 1. Configurar la base de datos MySQL

1. Abre MySQL (Workbench, CLI o XAMPP/WAMP):
   ```bash
   mysql -u root -p
   ```

2. Ejecuta el script de creación:
   ```sql
   SOURCE /ruta/completa/a/proyecto/database/schema.sql;
   SOURCE /ruta/completa/a/proyecto/database/seed.sql;
   ```

   O copia y pega el contenido de `database/schema.sql` y luego `database/seed.sql`.

3. Verifica:
   ```sql
   USE tienda_db;
   SHOW TABLES;
   SELECT * FROM clientes;
   ```

## 2. Configurar el Backend

```bash
cd backend
cp .env.example .env
# Edita .env y pon tu password de MySQL
npm install
npm start
```

El servidor quedará en: **http://localhost:3000**

Rutas disponibles:
- `GET /clientes`
- `GET /productos`
- `GET /ventas`
- `GET /ventas/:id` (incluye detalle)

## 3. Configurar el Frontend

```bash
cd frontend
# El archivo .env ya tiene VITE_API_URL=http://localhost:3000
npm install
npm run dev
```

Abre: **http://localhost:5173**

## Diagrama relacional (tablas)

```
clientes
├── id_cliente (PK, AUTO_INCREMENT)
├── nomCliente
├── contacto
├── departamento
└── ciudad

productos
├── id_producto (PK, AUTO_INCREMENT)
├── nomProducto
├── cantidad
└── precio

ventas
├── id_venta (PK, AUTO_INCREMENT)
├── id_cliente (FK → clientes)
├── fecha_venta
└── total

detalle_venta
├── id_detalle (PK, AUTO_INCREMENT)
├── id_venta (FK → ventas)
├── id_producto (FK → productos)
├── cantidad
├── precio_unitario
└── subtotal
```

## Cómo se conecta Front ↔ Back

1. Backend usa `mysql2` + `dotenv` + `cors`
2. Frontend usa `axios` con instancia centralizada en `src/services/api.js`
3. Variable de entorno `VITE_API_URL` apunta al backend
4. React Router + menú con React Bootstrap para navegar entre Clientes, Productos y Ventas

## Notas

- Todos los IDs son `INT AUTO_INCREMENT`
- El menú usa `react-bootstrap` y estilos de Bootstrap
- Si cambias el puerto del backend, actualiza `frontend/.env`
