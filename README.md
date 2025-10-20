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
│   ├── config.js          # Configuración y constantes
│   ├── map.js             # Lógica del mapa Leaflet
│   ├── data.js            # Gestión de datos de Supabase
│   ├── ui.js              # Interfaz de usuario
│   └── reports.js         # Sistema de reportes
└── README.md              # Este archivo
```

## Instalación

1. **Clonar el repositorio**:
```bash
git clone https://github.com/franzpc/test123.git
cd test123
```

2. **Configurar Supabase**:
   - Edita `js/config.js` y actualiza las credenciales de Supabase
   - Asegúrate de tener las tablas `poblados`, `reportes` y `aeropuertos` creadas

3. **Ejecutar la aplicación**:
   - Abre `index.html` en un navegador moderno
   - O usa un servidor local:
   ```bash
   python3 -m http.server 8000
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

⚠️ **IMPORTANTE**: Este proyecto actualmente tiene las credenciales de Supabase expuestas en el código del cliente. Para producción se recomienda:

1. Implementar un backend/API intermediario
2. Usar variables de entorno para credenciales
3. Configurar Row Level Security (RLS) en Supabase
4. Implementar autenticación de usuarios
5. Rotar credenciales expuestas

## Mejoras Futuras

- [ ] Backend con Node.js/Express
- [ ] Autenticación de usuarios
- [ ] Panel de administración para gestionar reportes
- [ ] Notificaciones push
- [ ] Modo offline (PWA)
- [ ] Tests automatizados
- [ ] CI/CD
- [ ] Análisis de datos geoespaciales
- [ ] Integración con más fuentes de datos

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
