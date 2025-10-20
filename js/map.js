// ==================== VARIABLES GLOBALES DEL MAPA ====================
let map, pobladosLayer, reportesLayer;
let activeLayers = { poblados: true, reportes: true };

// ==================== INICIALIZACIÓN DEL MAPA ====================
function initMap() {
    map = L.map('map').setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

    L.tileLayer(MAP_CONFIG.tileLayer, {
        attribution: MAP_CONFIG.attribution,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom
    }).addTo(map);

    pobladosLayer = L.layerGroup().addTo(map);
    reportesLayer = L.layerGroup().addTo(map);

    // Listener para actualizar visualización según zoom
    map.on('zoomend', function() {
        mostrarDatos();
    });
}

// ==================== FUNCIONES DE ICONOS ====================
function getPobladoIcon(tipo) {
    let color;
    switch(tipo) {
        case POBLADO_TYPES.capitalProvincial:
            color = MARKER_COLORS.capitalProvincial;
            break;
        case POBLADO_TYPES.cabezeraCantonal:
            color = MARKER_COLORS.cabezeraCantonal;
            break;
        case POBLADO_TYPES.cabezParroquial:
            color = MARKER_COLORS.cabezParroquial;
            break;
        case POBLADO_TYPES.recinto:
            color = MARKER_COLORS.recinto;
            break;
        default:
            color = MARKER_COLORS.default;
    }

    return new L.Icon({
        iconUrl: `${ICON_CONFIG.baseUrl}${color}.png`,
        shadowUrl: ICON_CONFIG.shadowUrl,
        iconSize: ICON_CONFIG.size,
        iconAnchor: ICON_CONFIG.anchor,
        popupAnchor: ICON_CONFIG.popupAnchor,
        shadowSize: ICON_CONFIG.shadowSize
    });
}

function getReporteIcon(isRecent = false) {
    return new L.Icon({
        iconUrl: `${ICON_CONFIG.baseUrl}${MARKER_COLORS.reporte}.png`,
        shadowUrl: ICON_CONFIG.shadowUrl,
        iconSize: ICON_CONFIG.size,
        iconAnchor: ICON_CONFIG.anchor,
        popupAnchor: ICON_CONFIG.popupAnchor,
        shadowSize: ICON_CONFIG.shadowSize,
        className: isRecent ? 'reporte-recent' : ''
    });
}

// ==================== DETERMINAR VISIBILIDAD SEGÚN ZOOM ====================
function shouldShowPoblado(tipo, zoom) {
    if (zoom >= ZOOM_LEVELS.showAll) return true;
    if (zoom >= ZOOM_LEVELS.cabezParroquial &&
        [POBLADO_TYPES.capitalProvincial, POBLADO_TYPES.cabezeraCantonal, POBLADO_TYPES.cabezParroquial].includes(tipo))
        return true;
    if (zoom >= ZOOM_LEVELS.cabezeraCantonal &&
        [POBLADO_TYPES.capitalProvincial, POBLADO_TYPES.cabezeraCantonal].includes(tipo))
        return true;
    if (zoom >= ZOOM_LEVELS.capitalProvincial && tipo === POBLADO_TYPES.capitalProvincial)
        return true;
    return false;
}

// ==================== EXTRAER COORDENADAS ====================
function extractCoordinates(geom) {
    try {
        if (typeof geom === 'string') {
            const match = geom.match(/POINT\(([^)]+)\)/);
            if (match) {
                const [lng, lat] = match[1].split(' ').map(parseFloat);
                return [lat, lng];
            }
        } else if (geom && geom.coordinates) {
            const [lng, lat] = geom.coordinates;
            return [lat, lng];
        } else if (geom && geom.type === 'Point') {
            const [lng, lat] = geom.coordinates;
            return [lat, lng];
        }
        return null;
    } catch (error) {
        console.error('Error extrayendo coordenadas:', error, geom);
        return null;
    }
}

// ==================== MOSTRAR DATOS EN EL MAPA ====================
function mostrarDatos() {
    pobladosLayer.clearLayers();
    reportesLayer.clearLayers();

    const zoom = map.getZoom();

    // Mostrar poblados
    if (activeLayers.poblados) {
        allPoblados.forEach((poblado) => {
            if (poblado.nombre && poblado.geom) {
                const coords = extractCoordinates(poblado.geom);
                if (coords && shouldShowPoblado(poblado.tipo, zoom)) {
                    const icon = getPobladoIcon(poblado.tipo);
                    const marker = L.marker(coords, { icon })
                        .bindPopup(`
                            <strong>🏘️ ${poblado.nombre}</strong><br>
                            <strong>Provincia:</strong> ${poblado.provincia || 'N/A'}<br>
                            <strong>Tipo:</strong> ${poblado.tipo || 'N/A'}<br>
                            <strong>Código:</strong> ${poblado.f_code || 'N/A'}<br>
                            <strong>Soc:</strong> ${poblado.soc || 'N/A'}
                        `)
                        .bindTooltip(poblado.nombre, {
                            permanent: false,
                            direction: 'top',
                            className: 'poblado-tooltip',
                            offset: [0, -15]
                        });
                    pobladosLayer.addLayer(marker);
                }
            }
        });
    }

    // Mostrar reportes
    if (activeLayers.reportes) {
        reportes.forEach((reporte, index) => {
            const coords = [reporte.lat, reporte.lng];
            const icon = getReporteIcon(index < 5);
            const marker = L.marker(coords, { icon }).bindPopup(`
                <strong>⚠️ REPORTE - ${reporte.tipo || 'Sin especificar'}</strong><br>
                <strong>Reportado por:</strong> ${reporte.nombre}<br>
                <strong>Descripción:</strong> ${reporte.descripcion}<br>
                <strong>Fecha:</strong> ${new Date(reporte.fecha_creacion).toLocaleString()}<br>
                <strong>Estado:</strong> ${reporte.estado || 'Pendiente'}<br>
                ${reporte.punto_cercano ? `<strong>Punto cercano:</strong> ${reporte.punto_cercano}<br>` : ''}
            `);
            reportesLayer.addLayer(marker);
        });
    }

    updateInfo();
}

// ==================== TOGGLE DE CAPAS ====================
function toggleLayer(layerName) {
    activeLayers[layerName] = !activeLayers[layerName];

    if (layerName === 'poblados') {
        if (activeLayers.poblados) {
            map.addLayer(pobladosLayer);
        } else {
            map.removeLayer(pobladosLayer);
        }
    } else if (layerName === 'reportes') {
        if (activeLayers.reportes) {
            map.addLayer(reportesLayer);
        } else {
            map.removeLayer(reportesLayer);
        }
    }

    mostrarDatos();
}

// ==================== NAVEGAR A POBLADO ====================
function irAPobladoEnMapa(poblado) {
    if (poblado.geom) {
        const coords = extractCoordinates(poblado.geom);
        if (coords) {
            let zoomLevel;
            switch(poblado.tipo) {
                case POBLADO_TYPES.capitalProvincial:
                    zoomLevel = NAVIGATION_ZOOM.capitalProvincial;
                    break;
                case POBLADO_TYPES.cabezeraCantonal:
                    zoomLevel = NAVIGATION_ZOOM.cabezeraCantonal;
                    break;
                case POBLADO_TYPES.cabezParroquial:
                    zoomLevel = NAVIGATION_ZOOM.cabezParroquial;
                    break;
                case POBLADO_TYPES.recinto:
                    zoomLevel = NAVIGATION_ZOOM.recinto;
                    break;
                default:
                    zoomLevel = NAVIGATION_ZOOM.default;
            }

            map.setView(coords, zoomLevel);

            // Asegurar que los poblados están visibles
            if (!activeLayers.poblados) {
                document.getElementById('poblados').checked = true;
                toggleLayer('poblados');
            }

            // Mostrar popup después de un breve delay
            setTimeout(() => {
                pobladosLayer.eachLayer(function(layer) {
                    if (layer.getPopup() && layer.getPopup().getContent().includes(poblado.nombre)) {
                        layer.openPopup();
                    }
                });
            }, 500);

            updateStatus(`Mostrando: ${poblado.nombre}`, 'info');
        }
    }
}

// ==================== ACTUALIZAR INFO FOOTER ====================
function updateInfo() {
    const poblados = pobladosLayer.getLayers().length;
    const reportesCount = reportesLayer.getLayers().length;
    document.getElementById('info').textContent =
        `Mostrando: ${poblados} poblados, ${reportesCount} reportes (Zoom: ${map.getZoom()})`;
}
