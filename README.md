# Geoportal Ecuador

Un portal geográfico interactivo y moderno para visualizar poblados de Ecuador y gestionar reportes ciudadanos.

## Descripción

Geoportal Ecuador es una aplicación web que permite a los usuarios visualizar poblados ecuatorianos clasificados por tipo (Capitales Provinciales, Cabeceras Cantonales, Cabeceras Parroquiales y Recintos), así como reportar problemas comunitarios georreferenciados.

## Características

### Visualización de Poblados
- **Marcadores categorizados**: Visualización de diferentes tipos de poblados con marcadores de colores
- **Zoom adaptativo**: Los poblados se muestran según el nivel de zoom para optimizar la visualización
- **Información detallada**: Popup con datos de cada poblado (nombre, provincia, tipo, código)
- **Búsqueda avanzada**: Filtro por nombre de poblado con resultados en tiempo real

### Sistema de Reportes Ciudadanos
- **Geolocalización automática**: Captura automática de la ubicación del usuario
- **Categorización**: Tipos de problemas (Infraestructura, Servicios públicos, Seguridad, Medio Ambiente, Transporte)
- **Visualización en mapa**: Los reportes se muestran con marcadores amarillos
- **Exportación GeoJSON**: Descarga de reportes en formato estándar GIS
- **Actualización en tiempo real**: Sincronización automática con la base de datos

### Características Técnicas
- **Capas activables**: Control de visibilidad de poblados y reportes
- **Diseño responsivo**: Adaptable a dispositivos móviles y escritorio
- **Interfaz moderna**: Diseño minimalista con esquema de colores elegante
- **Optimización de carga**: Carga progresiva de datos (1000 registros por lote)

## Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.0
- **Mapas**: Leaflet 1.9.4
- **Tiles**: OpenStreetMap
- **Backend**: Supabase (PostgreSQL + PostGIS)
- **Formato de datos**: GeoJSON

## Estructura del Proyecto

```
test123/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos modernos
├── js/
│   ├── config.js          # Configuración y constantes (NO se sube a git)
│   ├── config.example.js  # Plantilla de configuración
│   ├── map.js             # Lógica del mapa Leaflet
│   ├── data.js            # Gestión de datos de Supabase
│   ├── ui.js              # Interfaz de usuario
│   └── reports.js         # Sistema de reportes
├── .gitignore             # Archivos ignorados por git
└── README.md              # Este archivo
```

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/franzpc/test123.git
cd test123
```

### 2. Configurar las credenciales de Supabase

**IMPORTANTE**: Las credenciales NO están incluidas en el repositorio por seguridad.

```bash
# Copiar el archivo de ejemplo
cp js/config.example.js js/config.js
```

Luego edita `js/config.js` y reemplaza las credenciales:

```javascript
// Reemplaza estos valores con tus credenciales reales de Supabase
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_KEY = 'tu-anon-key-aqui';
```

**¿Dónde encontrar tus credenciales?**
1. Ve a tu proyecto en [Supabase](https://app.supabase.com)
2. Navega a Settings > API
3. Copia el `Project URL` y `anon/public key`

### 3. Configurar la base de datos

Asegúrate de tener las siguientes tablas creadas en Supabase (ver sección [Base de Datos](#base-de-datos) más abajo).

### 4. Ejecutar la aplicación

Opción A - Abrir directamente:
```bash
# Abre index.html en tu navegador
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

Opción B - Usar servidor local:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si tienes http-server instalado)
npx http-server

# Luego abre http://localhost:8000
```

## Base de Datos

### Tabla: poblados
```sql
CREATE TABLE poblados (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  provincia TEXT,
  tipo TEXT,
  f_code TEXT,
  soc TEXT,
  geom GEOMETRY(Point, 4326)
);
```

### Tabla: reportes
```sql
CREATE TABLE reportes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  estado TEXT DEFAULT 'Pendiente',
  visible BOOLEAN DEFAULT true,
  punto_cercano TEXT
);
```

## Uso

### Buscar Poblados
1. Escribe el nombre del poblado en el campo de búsqueda
2. Presiona "Buscar" o Enter
3. Haz clic en un resultado para ver su ubicación en el mapa

### Reportar un Problema
1. Haz clic en "📝 Reportar Problema"
2. Autoriza el uso de tu ubicación
3. Completa el formulario con tus datos
4. Haz clic en "📤 Enviar Reporte"

### Exportar Reportes
- Haz clic en "📥 Descargar Reportes (GeoJSON)" para obtener todos los reportes en formato GeoJSON

### Controlar Capas
- Marca/desmarca "🏘️ Poblados" para mostrar/ocultar poblados
- Marca/desmarca "⚠️ Reportes" para mostrar/ocultar reportes

## Tipos de Poblados y Zoom

- **Zoom 6+**: Capital Provincial (rojo)
- **Zoom 8+**: Cabecera Cantonal (naranja)
- **Zoom 10+**: Cabecera Parroquial (verde)
- **Zoom 12+**: Todos los tipos incluyendo Recintos (azul)

## Seguridad

### ✅ Credenciales Protegidas

Este proyecto implementa buenas prácticas de seguridad:

- ✅ **Credenciales NO incluidas** en el repositorio
- ✅ **Archivo `.gitignore`** configurado para proteger `config.js`
- ✅ **Plantilla `config.example.js`** para guiar la configuración
- ✅ Las credenciales se configuran localmente y nunca se suben a git

### Recomendaciones Adicionales para Producción

Para un entorno de producción, considera implementar:

1. **Backend/API intermediario**: Crea un servidor que gestione las peticiones a Supabase
2. **Row Level Security (RLS)**: Configura políticas de seguridad en Supabase
   ```sql
   -- Ejemplo: Solo permitir lectura de poblados
   ALTER TABLE poblados ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Permitir lectura pública" ON poblados FOR SELECT USING (true);
   ```
3. **Autenticación de usuarios**: Implementa login para gestión de reportes
4. **Rate limiting**: Limita el número de peticiones por IP
5. **HTTPS**: Sirve la aplicación solo por HTTPS en producción
6. **Service Key**: Nunca expongas la `service_role` key en el frontend

### ⚠️ Nota Importante

Aunque las credenciales están protegidas del repositorio, la `anon key` de Supabase siempre es visible en el cliente. Por esto es crucial:
- Configurar RLS en todas las tablas
- Usar políticas restrictivas de lectura/escritura
- Validar todos los datos en el backend cuando sea posible

## Mejoras Futuras

- [x] ~~Protección de credenciales con variables de entorno~~ ✅
- [ ] Backend con Node.js/Express para mayor seguridad
- [ ] Autenticación de usuarios con Supabase Auth
- [ ] Panel de administración para gestionar reportes
- [ ] Notificaciones push cuando se creen nuevos reportes
- [ ] Modo offline (PWA) con Service Workers
- [ ] Tests automatizados (Jest, Cypress)
- [ ] CI/CD con GitHub Actions
- [ ] Análisis de datos geoespaciales avanzados
- [ ] Integración con más fuentes de datos oficiales
- [ ] Modo oscuro/claro
- [ ] Filtros avanzados por tipo, provincia, fecha

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo licencia MIT.

## Autor

**Francisco PC**
- GitHub: [@franzpc](https://github.com/franzpc)

## Agradecimientos

- Datos geográficos de Ecuador
- OpenStreetMap por los tiles del mapa
- Leaflet por la librería de mapas
- Bootstrap por el framework CSS
- Supabase por el backend como servicio
