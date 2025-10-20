// ==================== VARIABLES GLOBALES DE REPORTES ====================
let ubicacionActual = null;

// ==================== ABRIR MODAL DE REPORTE ====================
function abrirModalReporte() {
    obtenerUbicacion();
}

// ==================== OBTENER UBICACIÓN ====================
function obtenerUbicacion() {
    const coordenadasDiv = document.getElementById('coordenadas');
    coordenadasDiv.textContent = 'Obteniendo ubicación...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                ubicacionActual = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                coordenadasDiv.textContent =
                    `Latitud: ${ubicacionActual.lat.toFixed(6)}, Longitud: ${ubicacionActual.lng.toFixed(6)}`;

                mostrarEstadoModal('Ubicación obtenida correctamente', 'success');
            },
            function(error) {
                let mensaje = 'Error obteniendo ubicación: ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        mensaje += 'Permiso denegado por el usuario';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensaje += 'Ubicación no disponible';
                        break;
                    case error.TIMEOUT:
                        mensaje += 'Tiempo de espera agotado';
                        break;
                    default:
                        mensaje += 'Error desconocido';
                }

                coordenadasDiv.textContent = 'No se pudo obtener la ubicación';
                mostrarEstadoModal(mensaje, 'danger');
            }
        );
    } else {
        coordenadasDiv.textContent = 'Geolocalización no soportada';
        mostrarEstadoModal('Este navegador no soporta geolocalización', 'warning');
    }
}

// ==================== MOSTRAR ESTADO EN MODAL ====================
function mostrarEstadoModal(mensaje, tipo) {
    const status = document.getElementById('statusModal');
    status.className = `alert alert-${tipo}`;
    status.textContent = mensaje;
    status.classList.remove('d-none');

    if (tipo === 'success') {
        setTimeout(() => {
            status.classList.add('d-none');
        }, 5000);
    }
}

// ==================== ENVIAR REPORTE ====================
async function enviarReporte(e) {
    e.preventDefault();

    if (!ubicacionActual) {
        mostrarEstadoModal('No se pudo obtener tu ubicación. Intenta recargar la página.', 'danger');
        return;
    }

    const reporte = {
        nombre: document.getElementById('nombre').value.trim(),
        tipo: document.getElementById('tipoProblema').value,
        descripcion: document.getElementById('descripcion').value.trim(),
        lat: ubicacionActual.lat,
        lng: ubicacionActual.lng
    };

    mostrarEstadoModal('Enviando reporte...', 'info');

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/reportes`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(reporte)
        });

        if (response.ok) {
            mostrarEstadoModal('¡Reporte enviado exitosamente!', 'success');

            // Limpiar formulario
            document.getElementById('reporteForm').reset();

            // Actualizar reportes en el mapa
            await actualizarReportes();

            // Cerrar modal después de 2 segundos
            setTimeout(() => {
                const modalElement = document.getElementById('reporteModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                // Limpiar estado del modal
                document.getElementById('statusModal').classList.add('d-none');
                ubicacionActual = null;
                document.getElementById('coordenadas').textContent = 'Obteniendo ubicación...';
            }, 2000);
        } else {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            mostrarEstadoModal(`Error del servidor: ${response.status}. Verifica que la tabla existe.`, 'danger');
        }

    } catch (error) {
        console.error('Error enviando reporte:', error);
        mostrarEstadoModal('Error de conexión. Verifica tu internet y que la tabla "reportes" existe en Supabase.', 'danger');
    }
}

// ==================== NOTA ====================
// Los event listeners de reportes se inicializan en ui.js
// dentro de la función inicializarApp() para evitar duplicación
