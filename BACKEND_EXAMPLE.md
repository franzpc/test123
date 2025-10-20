# Backend Simple para Ocultar Credenciales

## 🎯 Objetivo

Crear un backend que actúe como intermediario entre tu frontend y Supabase, ocultando las credenciales.

## 📦 Opción 1: Backend con Node.js/Express (Simple)

### Paso 1: Crear el servidor

**Archivo: `server/index.js`**

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Credenciales en el servidor (NO visibles al cliente)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// ==================== ENDPOINTS ====================

// GET /api/poblados - Obtener poblados
app.get('/api/poblados', async (req, res) => {
    try {
        const { limit = 1000, offset = 0, nombre } = req.query;

        let url = `${SUPABASE_URL}/rest/v1/poblados?select=*,geom&limit=${limit}&offset=${offset}`;

        if (nombre) {
            url += `&nombre=ilike.*${nombre}*`;
        }

        const response = await fetch(url, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/reportes - Obtener reportes
app.get('/api/reportes', async (req, res) => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/reportes?select=*&visible=eq.true&order=fecha_creacion.desc`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/reportes - Crear reporte
app.post('/api/reportes', async (req, res) => {
    try {
        const { nombre, tipo, descripcion, lat, lng } = req.body;

        // Validación
        if (!nombre || !tipo || !descripcion || !lat || !lng) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const response = await fetch(`${SUPABASE_URL}/rest/v1/reportes`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ nombre, tipo, descripcion, lat, lng })
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            const error = await response.text();
            res.status(response.status).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/tables-info - Información de tablas
app.get('/api/tables-info', async (req, res) => {
    try {
        const tables = ['poblados', 'aeropuertos', 'reportes'];
        const info = {};

        for (const table of tables) {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=0`,
                {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`,
                        'Prefer': 'count=exact'
                    }
                }
            );

            const totalCount = response.headers.get('content-range')?.split('/')[1] || '?';
            info[table] = totalCount;
        }

        res.json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

### Paso 2: Variables de entorno

**Archivo: `server/.env`**

```env
SUPABASE_URL=https://neixcsnkwtgdxkucfcnb.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laXhjc25rd3RnZHhrdWNmY25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzQ0OTQsImV4cCI6MjA2NTE1MDQ5NH0.OLcE9XYvYL6vzuXqcgp3dMowDZblvQo8qR21Cj39nyY
PORT=3000
```

### Paso 3: Package.json

**Archivo: `server/package.json`**

```json
{
  "name": "geoportal-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Paso 4: Instalar y ejecutar

```bash
cd server
npm install
npm start
```

### Paso 5: Modificar el frontend

**Actualizar `js/config.js`:**

```javascript
// Reemplazar las credenciales de Supabase con la URL del backend
const API_URL = 'http://localhost:3000/api';

// Ya no necesitas SUPABASE_URL ni SUPABASE_KEY aquí
```

**Actualizar `js/data.js`:**

```javascript
// Reemplazar las llamadas a Supabase con llamadas al backend

async function cargarDatos() {
    try {
        updateStatus('Cargando poblados...', 'info');

        let allPobladosTemp = [];
        let offset = 0;
        const limit = 1000;

        while (true) {
            const response = await fetch(
                `${API_URL}/poblados?limit=${limit}&offset=${offset}`
            );
            const batch = await response.json();

            if (batch.length === 0) break;

            allPobladosTemp = allPobladosTemp.concat(batch);
            offset += limit;

            updateStatus(`Cargando poblados... ${allPobladosTemp.length} registros`, 'info');

            if (batch.length < limit) break;
        }

        allPoblados = allPobladosTemp;
        // ... resto del código
    } catch (error) {
        updateStatus(`Error: ${error.message}`, 'danger');
    }
}
```

## 🚀 Desplegar en Producción

### Opción A: Render.com (Gratis)

1. Crear cuenta en https://render.com
2. New > Web Service
3. Conectar tu repositorio GitHub
4. Build Command: `cd server && npm install`
5. Start Command: `node server/index.js`
6. Agregar variables de entorno (SUPABASE_URL, SUPABASE_KEY)

### Opción B: Railway.app (Gratis)

1. Crear cuenta en https://railway.app
2. New Project > Deploy from GitHub
3. Seleccionar tu repositorio
4. Agregar variables de entorno

### Opción C: Heroku

```bash
heroku create geoportal-api
git push heroku main
heroku config:set SUPABASE_URL=...
heroku config:set SUPABASE_KEY=...
```

## ✅ Ventajas del Backend

- ✅ Credenciales 100% ocultas
- ✅ Puedes agregar lógica de negocio
- ✅ Rate limiting del lado del servidor
- ✅ Validación robusta de datos
- ✅ Logs y monitoreo centralizados

## ⚠️ Desventajas

- ❌ Requiere hosting adicional
- ❌ Más complejo de mantener
- ❌ Más puntos de fallo

## 🎯 Recomendación

Para un proyecto como este, **RLS es suficiente**. Solo usa backend si:
- Necesitas procesar pagos
- Tienes lógica de negocio compleja
- Quieres analytics avanzados
- Planeas escalar mucho
