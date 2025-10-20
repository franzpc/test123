# Funciones Serverless - Solución Más Fácil

## 🎯 Mejor Opción: Netlify Functions (Gratis y Fácil)

Las funciones serverless son más fáciles que un backend completo y **totalmente gratis**.

## 📦 Configuración Paso a Paso

### Paso 1: Estructura del Proyecto

```
test123/
├── netlify/
│   └── functions/
│       ├── poblados.js
│       ├── reportes.js
│       └── crear-reporte.js
├── netlify.toml
└── ... (tus archivos actuales)
```

### Paso 2: Crear archivo de configuración

**Archivo: `netlify.toml`**

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Paso 3: Crear las funciones

**Archivo: `netlify/functions/poblados.js`**

```javascript
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async (event, context) => {
    // Habilitar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    // Manejar preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método no permitido' })
        };
    }

    try {
        const { limit = '1000', offset = '0', nombre } = event.queryStringParameters || {};

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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

**Archivo: `netlify/functions/reportes.js`**

```javascript
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método no permitido' })
        };
    }

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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

**Archivo: `netlify/functions/crear-reporte.js`**

```javascript
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Método no permitido' })
        };
    }

    try {
        const { nombre, tipo, descripcion, lat, lng } = JSON.parse(event.body);

        // Validación
        if (!nombre || !tipo || !descripcion || !lat || !lng) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Faltan campos requeridos' })
            };
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
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true })
            };
        } else {
            const error = await response.text();
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

### Paso 4: Actualizar el Frontend

**Crear nuevo archivo: `js/api-config.js`**

```javascript
// Configuración para usar funciones serverless
const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:8888/api'  // Desarrollo local
    : '/api';  // Producción en Netlify

// Ya NO necesitas exponer SUPABASE_URL ni SUPABASE_KEY
```

**Actualizar `js/data.js` para usar las funciones:**

```javascript
async function cargarDatos() {
    try {
        updateStatus('Cargando poblados...', 'info');

        let allPobladosTemp = [];
        let offset = 0;
        const limit = 1000;

        while (true) {
            // Llamar a la función serverless en lugar de Supabase directamente
            const response = await fetch(
                `${API_BASE}/poblados?limit=${limit}&offset=${offset}`
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

### Paso 5: Desplegar en Netlify

#### Opción A: Desde GitHub (Recomendado)

1. Ve a https://app.netlify.com
2. Clic en "Add new site" > "Import an existing project"
3. Conecta tu repositorio GitHub
4. En "Build settings":
   - Build command: (dejar vacío)
   - Publish directory: `.`
5. En "Environment variables" agregar:
   - `SUPABASE_URL` = `https://neixcsnkwtgdxkucfcnb.supabase.co`
   - `SUPABASE_KEY` = `tu-key-completa`
6. Clic en "Deploy"

#### Opción B: Desde CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Configurar variables de entorno
netlify env:set SUPABASE_URL "https://neixcsnkwtgdxkucfcnb.supabase.co"
netlify env:set SUPABASE_KEY "tu-key-completa"

# Desplegar
netlify deploy --prod
```

### Paso 6: Probar Localmente

```bash
# Instalar Netlify CLI si no lo tienes
npm install -g netlify-cli

# Crear archivo .env local
echo "SUPABASE_URL=https://neixcsnkwtgdxkucfcnb.supabase.co" > .env
echo "SUPABASE_KEY=tu-key" >> .env

# Ejecutar en modo desarrollo
netlify dev
```

Esto iniciará un servidor en `http://localhost:8888`

## ✅ Ventajas de Serverless

- ✅ **100% Gratis** (Netlify free tier: 125k requests/mes)
- ✅ **Súper fácil de configurar**
- ✅ **Credenciales totalmente ocultas**
- ✅ **Auto-scaling**
- ✅ **HTTPS automático**
- ✅ **CDN global**
- ✅ **Sin servidor que mantener**

## 📊 Comparación

| Característica | Frontend Solo | Serverless | Backend Completo |
|----------------|---------------|------------|------------------|
| Costo | Gratis | Gratis* | $5-20/mes |
| Complejidad | ⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Seguridad | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Escalabilidad | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Mantenimiento | ⭐ | ⭐ | ⭐⭐⭐⭐ |

*Gratis hasta 125k requests/mes en Netlify

## 🎯 Mi Recomendación

Para tu geoportal: **Netlify Functions es la mejor opción**

Es el equilibrio perfecto entre:
- Seguridad (credenciales ocultas)
- Facilidad (no necesitas servidor)
- Costo (gratis)
- Escalabilidad (auto-scaling)
