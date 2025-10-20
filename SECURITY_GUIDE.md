# Guía de Seguridad: Protección de Credenciales

## ⚠️ Realidad Importante

**En aplicaciones frontend puras (HTML/CSS/JS), NO es posible ocultar completamente las credenciales.**

Todo el código JavaScript se ejecuta en el navegador del cliente, por lo que cualquier credencial es visible si alguien inspecciona el código fuente o las solicitudes de red.

## 🔒 Solución Real: Row Level Security (RLS) en Supabase

La forma correcta de proteger tu aplicación NO es ocultar las credenciales, sino **limitar qué pueden hacer con ellas**.

### Paso 1: Habilitar RLS en tus tablas

Ejecuta estos comandos SQL en Supabase (Settings > SQL Editor):

```sql
-- 1. Habilitar RLS en la tabla poblados
ALTER TABLE poblados ENABLE ROW LEVEL SECURITY;

-- 2. Permitir solo lectura pública de poblados
CREATE POLICY "Permitir lectura pública de poblados"
ON poblados FOR SELECT
USING (true);

-- 3. Habilitar RLS en la tabla reportes
ALTER TABLE reportes ENABLE ROW LEVEL SECURITY;

-- 4. Permitir lectura pública solo de reportes visibles
CREATE POLICY "Permitir lectura pública de reportes visibles"
ON reportes FOR SELECT
USING (visible = true);

-- 5. Permitir inserción pública de reportes (para ciudadanos)
CREATE POLICY "Permitir inserción pública de reportes"
ON reportes FOR INSERT
WITH CHECK (true);

-- 6. Solo administradores pueden actualizar/eliminar
-- (esto requerirá autenticación en el futuro)
```

### Paso 2: Verificar que RLS está funcionando

Prueba en SQL Editor:

```sql
-- Esto debería funcionar (lectura permitida)
SELECT * FROM poblados LIMIT 5;

-- Esto debería funcionar (inserción permitida)
INSERT INTO reportes (nombre, tipo, descripcion, lat, lng)
VALUES ('Test', 'Otro', 'Prueba de seguridad', -1.0, -78.5);

-- Esto debería FALLAR (actualización no permitida sin auth)
UPDATE reportes SET estado = 'Completado' WHERE id = 1;
```

### Paso 3: Proteger tabla aeropuertos (si existe)

```sql
ALTER TABLE aeropuertos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública de aeropuertos"
ON aeropuertos FOR SELECT
USING (true);
```

## 🛡️ Qué Logras con RLS

Con RLS habilitado, aunque alguien vea tus credenciales:

✅ **Solo pueden LEER poblados** (no modificar/eliminar)
✅ **Solo pueden CREAR reportes** (no modificar los existentes)
✅ **Solo pueden VER reportes con visible=true**
✅ **NO pueden eliminar datos**
✅ **NO pueden modificar datos existentes**

## 🚀 Solución Avanzada: Backend Intermediario (Opcional)

Si necesitas ocultar completamente las credenciales, necesitas un backend:

### Opción A: Backend con Node.js/Express

Ver archivo: `BACKEND_EXAMPLE.md` para un ejemplo completo.

### Opción B: Funciones Serverless (Netlify/Vercel)

Gratuito y fácil de desplegar. Ver `SERVERLESS_EXAMPLE.md`.

### Opción C: Supabase Edge Functions

Usar las propias funciones serverless de Supabase.

## 📊 Comparación de Soluciones

| Solución | Seguridad | Complejidad | Costo |
|----------|-----------|-------------|-------|
| **RLS en Supabase** | ⭐⭐⭐⭐ | ⭐ (Fácil) | Gratis |
| **Backend Node.js** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (Difícil) | Hosting requerido |
| **Serverless Functions** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ (Medio) | Gratis (tier gratuito) |
| **Ofuscación de código** | ⭐ | ⭐⭐ | Gratis |

## 🎯 Recomendación

**Para tu geoportal actual:**

1. **Implementa RLS AHORA** (15 minutos, protección sólida)
2. **Considera backend** solo si necesitas:
   - Lógica de negocio compleja
   - Procesamiento de pagos
   - Análisis de datos privados
   - Autenticación compleja

## 🔐 Mejores Prácticas Adicionales

```javascript
// 1. Validar datos en el cliente antes de enviar
function validarReporte(reporte) {
    if (!reporte.nombre || reporte.nombre.length < 2) {
        throw new Error('Nombre inválido');
    }
    if (!reporte.descripcion || reporte.descripcion.length < 10) {
        throw new Error('Descripción muy corta');
    }
    // ... más validaciones
}

// 2. Sanitizar inputs
function sanitizar(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// 3. Rate limiting del lado del cliente
let ultimoReporte = 0;
function puedeReportar() {
    const ahora = Date.now();
    if (ahora - ultimoReporte < 60000) { // 1 minuto
        return false;
    }
    ultimoReporte = ahora;
    return true;
}
```

## 📞 Soporte

Para más información sobre RLS: https://supabase.com/docs/guides/auth/row-level-security
