# Guía para Agregar Imágenes al Sitio Web de Landsat Next

## Resumen Rápido

Este sitio web está listo para agregar imágenes. Esta guía te muestra exactamente cómo y dónde obtenerlas.

## 🎯 Imágenes Prioritarias Recomendadas

### 1. Página Principal (index.html)

**Imagen Hero Principal:**
- Buscar: "Landsat Next constellation" o "Landsat satellite constellation"
- Fuente: https://images.nasa.gov/
- Tamaño: 1920x1080px
- Colocar después de: `<h1>The Future of Earth Observation</h1>`

**Ejemplo de código:**
```html
<img src="assets/images/landsat-next-hero.jpg"
     alt="Landsat Next satellite constellation"
     style="width: 100%; max-width: 1200px; border-radius: 10px; margin: 2rem auto; display: block;">
```

### 2. Página de Historia (history.html)

**Imágenes de lanzamientos históricos:**
- Landsat 1 (1972)
- Landsat 5 (récord mundial)
- Landsat 8 lanzamiento
- Landsat 9 lanzamiento

**Dónde encontrarlas:**
- https://images.nasa.gov/ → buscar "Landsat launch"
- https://www.usgs.gov/media/images

### 3. Ejemplos de Imágenes Satelitales (todas las páginas)

**Ejemplos impactantes que puedes usar:**
1. **Deforestación del Amazonas** - Comparación 1984 vs 2024
2. **Retroceso de glaciares** - Series temporales
3. **Crecimiento urbano** - Por ejemplo, Las Vegas o Dubai
4. **Monitoreo de incendios forestales**
5. **Calidad del agua** - Floraciones de algas

**Fuentes principales:**
- https://landsat.visibleearth.nasa.gov/
- https://earthobservatory.nasa.gov/
- https://earthexplorer.usgs.gov/

## 📥 Cómo Descargar Imágenes de NASA

### Opción 1: NASA Image and Video Library (Recomendado)

1. Ir a: https://images.nasa.gov/
2. Buscar términos como:
   - "Landsat 8"
   - "Landsat 9"
   - "Landsat Next"
   - "Landsat satellite"
   - "Landsat Amazon"
3. Filtrar por "Images"
4. Hacer clic en la imagen deseada
5. Descargar en resolución "Original" o "Large"
6. Guardar en `landsatnext-site/assets/images/`

### Opción 2: Landsat Image Gallery

1. Ir a: https://landsat.visibleearth.nasa.gov/
2. Explorar las categorías
3. Descargar imágenes de alta calidad
4. Todas son de dominio público

### Opción 3: USGS Earth Explorer (Para imágenes satelitales reales)

1. Ir a: https://earthexplorer.usgs.gov/
2. Seleccionar área de interés en el mapa
3. Elegir "Data Sets" → Landsat → Landsat 8-9 OLI/TIRS
4. Buscar y previsualizar
5. Descargar imágenes de ejemplo

## 🖼️ Lista de Imágenes Específicas Recomendadas

### Para Descargar de NASA Images (https://images.nasa.gov/)

Busca estos términos exactos:

1. **"Landsat 8 satellite"**
   - Para: missions.html, technical-specs.html
   - Tipo: Ilustración artística del satélite

2. **"Landsat 9 launch"**
   - Para: history.html, missions.html
   - Tipo: Foto del lanzamiento

3. **"Landsat deforestation"**
   - Para: index.html (ejemplos de aplicaciones)
   - Tipo: Comparación temporal

4. **"Landsat glacier"**
   - Para: index.html, landsat-next.html
   - Tipo: Series temporales de glaciares

5. **"Landsat urban growth"**
   - Para: index.html
   - Tipo: Expansión urbana

## 💡 Ejemplos Específicos de Código

### Agregar imagen en la sección Hero (index.html)

Insertar después de la línea 60 (después del párrafo del hero):

```html
<figure style="text-align: center; margin: 2rem 0;">
    <img src="assets/images/landsat-next-constellation.jpg"
         alt="Landsat Next three-satellite constellation concept"
         style="width: 100%; max-width: 1000px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
    <figcaption style="margin-top: 1rem; color: var(--gray); font-style: italic;">
        Artist's concept of the Landsat Next constellation. Credit: NASA
    </figcaption>
</figure>
```

### Agregar galería de comparación temporal

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;">
    <figure>
        <img src="assets/images/amazon-1984.jpg" alt="Amazon rainforest 1984">
        <figcaption>Amazon rainforest - 1984</figcaption>
    </figure>
    <figure>
        <img src="assets/images/amazon-2024.jpg" alt="Amazon rainforest 2024">
        <figcaption>Amazon rainforest - 2024</figcaption>
    </figure>
</div>
```

## 🎨 Optimización de Imágenes

Antes de subir las imágenes al sitio:

1. **Redimensionar:**
   - Ancho máximo: 1920px para imágenes hero
   - Ancho máximo: 1200px para imágenes de contenido

2. **Comprimir:**
   - Herramientas online: https://tinypng.com/ o https://squoosh.app/
   - Objetivo: Menos de 500KB por imagen

3. **Renombrar:**
   - Usar nombres descriptivos
   - Ejemplo: `landsat-8-amazon-deforestation-1984-2024.jpg`

## 📂 Estructura de Carpetas

```
landsatnext-site/assets/images/
├── satellites/          (fotos de satélites)
├── examples/           (ejemplos de imágenes Landsat)
├── diagrams/           (diagramas técnicos)
├── logos/              (logos NASA/USGS)
└── timeline/           (imágenes históricas)
```

## ✅ Checklist de Imágenes Esenciales

Marca cuando las hayas agregado:

- [ ] Imagen hero principal (Landsat Next constellation)
- [ ] Landsat 8 en órbita (ilustración)
- [ ] Landsat 9 lanzamiento
- [ ] Ejemplo de deforestación (antes/después)
- [ ] Ejemplo de glaciar (series temporal)
- [ ] Logo NASA
- [ ] Logo USGS
- [ ] Diagrama de bandas espectrales
- [ ] Ejemplo de monitoreo agrícola
- [ ] Ejemplo de calidad del agua

## 🔗 Enlaces Directos Útiles

- **NASA Images**: https://images.nasa.gov/
- **Landsat Gallery**: https://landsat.visibleearth.nasa.gov/
- **NASA Earth Observatory**: https://earthobservatory.nasa.gov/
- **USGS Media**: https://www.usgs.gov/media
- **TinyPNG (comprimir)**: https://tinypng.com/

## 📝 Nota sobre Licencias

✅ **Todas las imágenes de NASA y USGS son de dominio público**

Siempre incluir crédito:
- "Image: NASA"
- "Image: NASA/USGS Landsat"
- "Image: USGS"

## 🚀 Después de Agregar las Imágenes

1. Probar que todas las imágenes carguen correctamente
2. Verificar que el sitio siga siendo rápido
3. Asegurarse de que las imágenes se vean bien en móvil
4. Actualizar el README.md con la información de las imágenes agregadas

---

¿Necesitas ayuda específica para implementar alguna imagen? ¡Déjame saber!
