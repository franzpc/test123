// ==================== ACTUALIZAR STATUS ====================
function updateStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.className = `alert alert-${type} status`;
    statusEl.textContent = message;
}

// ==================== MOSTRAR LISTA DE RESULTADOS ====================
function mostrarListaResultados(poblados) {
    const listaDiv = document.getElementById('listaResultados');
    const contenidoDiv = document.getElementById('contenidoResultados');

    if (poblados.length === 0) {
        contenidoDiv.innerHTML = '<div class="p-2 text-muted">No se encontraron resultados</div>';
        listaDiv.style.display = 'block';
        return;
    }

    contenidoDiv.innerHTML = '';

    poblados.forEach(poblado => {
        const item = document.createElement('div');
        item.className = 'resultado-item';
        item.innerHTML = `
            <div><strong>${poblado.nombre}</strong></div>
            <small class="text-muted">${poblado.provincia || 'N/A'} - ${poblado.tipo || 'N/A'}</small>
        `;

        item.addEventListener('click', function() {
            irAPobladoEnMapa(poblado);
        });

        contenidoDiv.appendChild(item);
    });

    listaDiv.style.display = 'block';
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    initMap();

    // Cargar datos
    cargarDatos();

    // Event listener para Enter en búsqueda
    document.getElementById('filtroNombre').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') aplicarFiltros();
    });
});
