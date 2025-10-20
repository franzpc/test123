// ==================== CONFIGURACIÓN DE SUPABASE ====================
// IMPORTANTE: Copia este archivo a config.js y reemplaza con tus credenciales reales
// El archivo config.js NO se subirá a git por seguridad

const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// ==================== CONFIGURACIÓN DEL MAPA ====================
const MAP_CONFIG = {
    center: [-1.0, -78.5],
    zoom: 7,
    minZoom: 5,
    maxZoom: 18,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
};

// ==================== CONFIGURACIÓN DE DATOS ====================
const DATA_CONFIG = {
    batchSize: 1000,
    tables: ['poblados', 'aeropuertos', 'reportes']
};

// ==================== CONFIGURACIÓN DE ZOOM PARA POBLADOS ====================
const ZOOM_LEVELS = {
    capitalProvincial: 6,
    cabezeraCantonal: 8,
    cabezParroquial: 10,
    showAll: 12
};

// ==================== TIPOS DE POBLADOS ====================
const POBLADO_TYPES = {
    capitalProvincial: 'Capital Provincial',
    cabezeraCantonal: 'Cabecera Cantonal',
    cabezParroquial: 'Cabecera Parroquial',
    recinto: 'Recinto'
};

// ==================== CONFIGURACIÓN DE ICONOS ====================
const ICON_CONFIG = {
    size: [25, 41],
    anchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    baseUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-'
};

// ==================== COLORES DE MARCADORES ====================
const MARKER_COLORS = {
    capitalProvincial: 'red',
    cabezeraCantonal: 'orange',
    cabezParroquial: 'green',
    recinto: 'blue',
    reporte: 'yellow',
    default: 'grey'
};

// ==================== TIPOS DE PROBLEMAS ====================
const PROBLEM_TYPES = [
    { value: 'Infraestructura', label: 'Problemas de infraestructura' },
    { value: 'Servicios', label: 'Servicios públicos' },
    { value: 'Seguridad', label: 'Seguridad ciudadana' },
    { value: 'Medio Ambiente', label: 'Medio ambiente' },
    { value: 'Transporte', label: 'Transporte público' },
    { value: 'Otro', label: 'Otro' }
];

// ==================== CONFIGURACIÓN DE ZOOM PARA NAVEGACIÓN ====================
const NAVIGATION_ZOOM = {
    capitalProvincial: 11,
    cabezeraCantonal: 12,
    cabezParroquial: 13,
    recinto: 14,
    default: 13
};
