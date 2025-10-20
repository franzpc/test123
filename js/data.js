// ==================== VARIABLES GLOBALES DE DATOS ====================
let allPoblados = [];
let reportes = [];

// ==================== CARGAR TODOS LOS DATOS ====================
async function cargarDatos() {
    try {
        updateStatus('Cargando poblados...', 'info');

        // Cargar todos los poblados con paginación
        let allPobladosTemp = [];
        let offset = 0;
        const limit = DATA_CONFIG.batchSize;

        while (true) {
            const poblados = await fetch(
                `${SUPABASE_URL}/rest/v1/poblados?select=*,geom&limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                }
            );
            const batch = await poblados.json();

            if (batch.length === 0) break;

            allPobladosTemp = allPobladosTemp.concat(batch);
            offset += limit;

            updateStatus(`Cargando poblados... ${allPobladosTemp.length} registros`, 'info');

            if (batch.length < limit) break;
        }

        allPoblados = allPobladosTemp;

        updateStatus('Cargando reportes...', 'info');
        await cargarReportes();

        updateStatus('Cargando información de tablas...', 'info');
        await cargarInfoTablas();

        updateStatus(`Cargados: ${allPoblados.length} poblados, ${reportes.length} reportes`, 'success');

        mostrarDatos();

    } catch (error) {
        updateStatus(`Error: ${error.message}`, 'danger');
    }
}

// ==================== CARGAR REPORTES ====================
async function cargarReportes() {
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

        if (response.ok) {
            reportes = await response.json();
            document.getElementById('reportesCount').textContent = reportes.length;
        } else {
            console.warn('No se pudieron cargar los reportes desde la base de datos');
            reportes = [];
        }
    } catch (error) {
        console.error('Error cargando reportes:', error);
        reportes = [];
    }
}

// ==================== ACTUALIZAR SOLO REPORTES ====================
async function actualizarReportes() {
    updateStatus('Actualizando reportes...', 'info');
    await cargarReportes();
    mostrarDatos();
    updateStatus(`Reportes actualizados: ${reportes.length} reportes activos`, 'success');
}

// ==================== CARGAR INFO DE TABLAS ====================
async function cargarInfoTablas() {
    try {
        let infoHtml = '';

        for (const tabla of DATA_CONFIG.tables) {
            try {
                const count = await fetch(
                    `${SUPABASE_URL}/rest/v1/${tabla}?select=*&limit=0`,
                    {
                        headers: {
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${SUPABASE_KEY}`,
                            'Prefer': 'count=exact'
                        }
                    }
                );

                const totalCount = count.headers.get('content-range')?.split('/')[1] || '?';
                infoHtml += `<div class="tabla-info"><strong>${tabla}:</strong> ${totalCount} registros</div>`;
            } catch (e) {
                infoHtml += `<div class="tabla-info"><strong>${tabla}:</strong> N/A</div>`;
            }
        }

        document.getElementById('tablesInfo').innerHTML = infoHtml;
    } catch (error) {
        document.getElementById('tablesInfo').innerHTML =
            '<div class="tabla-info text-danger">Error cargando información</div>';
    }
}

// ==================== BUSCAR POBLADOS ====================
async function aplicarFiltros() {
    const nombre = document.getElementById('filtroNombre').value.trim();

    if (!nombre) {
        updateStatus('Por favor ingresa un nombre a buscar', 'warning');
        return;
    }

    try {
        updateStatus('Buscando...', 'info');

        const poblados = await fetch(
            `${SUPABASE_URL}/rest/v1/poblados?select=*,geom&nombre=ilike.*${nombre}*`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const pobladosEncontrados = await poblados.json();

        mostrarListaResultados(pobladosEncontrados);

        allPoblados = pobladosEncontrados;
        mostrarDatos();

        updateStatus(`Encontrados: ${pobladosEncontrados.length} poblados`, 'success');

    } catch (error) {
        updateStatus(`Error: ${error.message}`, 'danger');
    }
}

// ==================== LIMPIAR FILTROS ====================
function limpiarFiltros() {
    document.getElementById('filtroNombre').value = '';
    document.getElementById('listaResultados').style.display = 'none';
    cargarDatos();
}

// ==================== DESCARGAR REPORTES COMO GEOJSON ====================
function descargarReportesGeoJSON() {
    if (reportes.length === 0) {
        updateStatus('No hay reportes para descargar', 'warning');
        return;
    }

    const geojson = {
        "type": "FeatureCollection",
        "features": reportes.map(reporte => ({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [reporte.lng, reporte.lat]
            },
            "properties": {
                "id": reporte.id,
                "nombre": reporte.nombre,
                "tipo": reporte.tipo,
                "descripcion": reporte.descripcion,
                "fecha_creacion": reporte.fecha_creacion,
                "estado": reporte.estado || 'Pendiente',
                "visible": reporte.visible,
                "punto_cercano": reporte.punto_cercano || 'N/A'
            }
        }))
    };

    const dataStr = JSON.stringify(geojson, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `reportes_ecuador_${new Date().toISOString().split('T')[0]}.geojson`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    updateStatus(`Descargados ${reportes.length} reportes en formato GeoJSON`, 'success');
}
