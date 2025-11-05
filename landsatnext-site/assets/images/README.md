# Images Directory

This directory is for storing images to enhance the Landsat Next website.

## Recommended Images to Add

### 1. Satellite Images and Illustrations

**Landsat Satellites:**
- `landsat-8-satellite.jpg` - Artist rendering of Landsat 8 in orbit
- `landsat-9-launch.jpg` - Landsat 9 launch photo
- `landsat-next-concept.jpg` - Artist concept of Landsat Next constellation
- `landsat-timeline-graphic.png` - Visual timeline of all Landsat missions

**Sources:**
- NASA Image Gallery: https://images.nasa.gov/
- USGS Landsat Missions: https://www.usgs.gov/landsat-missions/landsat-satellite-missions
- NASA Goddard Media Studios: https://svs.gsfc.nasa.gov/

### 2. Earth Observation Examples

**Landsat Imagery Examples:**
- `landsat-amazon-comparison.jpg` - Amazon deforestation time series (1980s vs 2020s)
- `landsat-glacier-retreat.jpg` - Glacier retreat over time
- `landsat-urban-growth.jpg` - Urban expansion example
- `landsat-water-quality.jpg` - Water quality monitoring example
- `landsat-agriculture.jpg` - Agricultural monitoring example
- `landsat-wildfire.jpg` - Wildfire detection and monitoring

**Sources:**
- USGS Earth Explorer: https://earthexplorer.usgs.gov/
- Landsat Image Gallery: https://landsat.visibleearth.nasa.gov/
- NASA Earth Observatory: https://earthobservatory.nasa.gov/

### 3. Technical Diagrams

**Spectral Band Comparisons:**
- `spectral-bands-comparison.png` - Chart comparing spectral bands across Landsat generations
- `oli-tirs-diagram.png` - OLI and TIRS instrument diagrams
- `landsat-orbit-diagram.png` - Orbital configuration illustration
- `landsat-coverage-pattern.png` - Global coverage pattern visualization

### 4. Mission Logos and Badges

- `nasa-logo.png` - NASA official logo
- `usgs-logo.png` - USGS official logo
- `landsat-program-logo.png` - Landsat program logo

## Image Guidelines

### File Formats
- Use **JPEG** for photographs and satellite imagery
- Use **PNG** for logos, diagrams, and graphics with transparency
- Optimize images for web (compress without losing quality)

### Recommended Sizes
- **Hero images**: 1920x1080px or 1600x900px
- **Content images**: 1200px width maximum
- **Thumbnails**: 400x300px
- **Logos**: 200-400px width

### Attribution
All images must include proper attribution. For NASA and USGS images:
- Most NASA images are public domain
- Credit as: "Image: NASA" or "Image: NASA/USGS Landsat"
- Always check individual image licensing

### SEO Optimization
- Use descriptive filenames (e.g., `landsat-8-amazon-rainforest-2020.jpg`)
- Add alt text in HTML for accessibility
- Include image captions when appropriate

## HTML Implementation

When adding images to the website, use this format:

```html
<figure>
    <img src="assets/images/landsat-8-satellite.jpg"
         alt="Artist rendering of Landsat 8 satellite in Earth orbit"
         loading="lazy">
    <figcaption>Landsat 8 satellite in orbit. Credit: NASA</figcaption>
</figure>
```

## Where to Add Images

### index.html
- Hero section: Landsat Next constellation concept
- Grid items: Icons or small satellite images for each feature
- Mission applications: Examples of each application type

### history.html
- Timeline items: Historical mission photos
- Milestones section: Launch photos, mission patches

### missions.html
- Each mission section: Satellite photo or artist rendering
- Comparison tables: Instrument diagrams

### landsat-next.html
- Hero section: Landsat Next artist concept
- Spectral capabilities: Spectrum diagrams
- Mission applications: Before/after comparison images

### technical-specs.html
- Instrument sections: Technical diagrams
- Spectral band tables: Spectrum visualization charts

### mission-finder.html
- Results section: Small satellite icons for each mission

## Free Image Resources

### NASA Image Libraries
- **NASA Image and Video Library**: https://images.nasa.gov/
- **NASA Scientific Visualization Studio**: https://svs.gsfc.nasa.gov/
- **Landsat Image Gallery**: https://landsat.visibleearth.nasa.gov/

### USGS Resources
- **USGS Media Library**: https://www.usgs.gov/media
- **USGS Landsat Missions**: https://www.usgs.gov/landsat-missions

### License
Most NASA and USGS images are in the **public domain** and free to use. Always verify licensing for each image.

## Notes
- Keep total page size under 3MB for good performance
- Use lazy loading for images below the fold
- Provide responsive images for mobile devices
- Consider using WebP format for better compression (with JPEG fallback)
