// Landsat Mission Database
const landsatMissions = [
    {
        name: "Landsat 1",
        altName: "ERTS-1",
        launchDate: new Date("1972-07-23"),
        endDate: new Date("1978-01-06"),
        operationalStart: 1972,
        operationalEnd: 1978,
        status: "decommissioned",
        instruments: "MSS, RBV",
        spatialResolution: "80m (MSS)",
        spectralBands: 4,
        thermalBands: 0,
        description: "First civilian Earth observation satellite, pioneering systematic land imaging from space.",
        dataAccess: "USGS Earth Explorer",
        notes: "Historic mission, limited data availability compared to modern satellites."
    },
    {
        name: "Landsat 2",
        altName: "",
        launchDate: new Date("1975-01-22"),
        endDate: new Date("1982-02-25"),
        operationalStart: 1975,
        operationalEnd: 1982,
        status: "decommissioned",
        instruments: "MSS, RBV",
        spatialResolution: "80m (MSS)",
        spectralBands: 4,
        thermalBands: 0,
        description: "Continuity mission with identical sensors to Landsat 1.",
        dataAccess: "USGS Earth Explorer",
        notes: "Provided data continuity during early program years."
    },
    {
        name: "Landsat 3",
        altName: "",
        launchDate: new Date("1978-03-05"),
        endDate: new Date("1983-03-31"),
        operationalStart: 1978,
        operationalEnd: 1983,
        status: "decommissioned",
        instruments: "MSS (improved), RBV",
        spatialResolution: "80m (MSS), 240m (thermal)",
        spectralBands: 5,
        thermalBands: 1,
        description: "First Landsat with thermal imaging capability.",
        dataAccess: "USGS Earth Explorer",
        notes: "Enhanced MSS with thermal band added."
    },
    {
        name: "Landsat 4",
        altName: "",
        launchDate: new Date("1982-07-16"),
        endDate: new Date("2001-06-15"),
        operationalStart: 1982,
        operationalEnd: 2001,
        status: "decommissioned",
        instruments: "TM, MSS",
        spatialResolution: "30m (TM multispectral), 120m (thermal)",
        spectralBands: 7,
        thermalBands: 1,
        description: "Revolutionary Thematic Mapper with 30m resolution - major technological advancement.",
        dataAccess: "USGS Earth Explorer",
        notes: "Introduced Thematic Mapper (TM), dramatically improved spatial resolution."
    },
    {
        name: "Landsat 5",
        altName: "",
        launchDate: new Date("1984-03-01"),
        endDate: new Date("2013-06-05"),
        operationalStart: 1984,
        operationalEnd: 2013,
        status: "decommissioned",
        instruments: "TM, MSS",
        spatialResolution: "30m (TM multispectral), 120m (thermal)",
        spectralBands: 7,
        thermalBands: 1,
        description: "World record holder: longest-operating Earth observation satellite (28 years, 10 months).",
        dataAccess: "USGS Earth Explorer",
        notes: "Guinness World Record holder. Exceptional data continuity 1984-2013."
    },
    {
        name: "Landsat 6",
        altName: "",
        launchDate: new Date("1993-10-05"),
        endDate: new Date("1993-10-05"),
        operationalStart: 1993,
        operationalEnd: 1993,
        status: "failed",
        instruments: "ETM",
        spatialResolution: "N/A",
        spectralBands: 0,
        thermalBands: 0,
        description: "Launch failure - did not achieve orbit.",
        dataAccess: "No data available",
        notes: "Launch failure due to ruptured hydrazine manifold."
    },
    {
        name: "Landsat 7",
        altName: "",
        launchDate: new Date("1999-04-15"),
        endDate: null,
        operationalStart: 1999,
        operationalEnd: 2025,
        status: "operational",
        instruments: "ETM+",
        spatialResolution: "30m (multispectral), 15m (panchromatic), 60m (thermal)",
        spectralBands: 8,
        thermalBands: 1,
        description: "Enhanced Thematic Mapper Plus with 15m panchromatic band. Still operational despite SLC failure in 2003.",
        dataAccess: "USGS Earth Explorer, NASA LP DAAC",
        notes: "SLC failure May 2003 causes data gaps but still scientifically valuable. 25+ years operational."
    },
    {
        name: "Landsat 8",
        altName: "LDCM",
        launchDate: new Date("2013-02-11"),
        endDate: null,
        operationalStart: 2013,
        operationalEnd: 2025,
        status: "operational",
        instruments: "OLI, TIRS",
        spatialResolution: "30m (multispectral), 15m (panchromatic), 100m (thermal)",
        spectralBands: 11,
        thermalBands: 2,
        description: "Modern era with OLI/TIRS instruments, 12-bit data, improved SNR, new coastal and cirrus bands.",
        dataAccess: "USGS Earth Explorer, NASA LP DAAC, Google Earth Engine, AWS Open Data",
        notes: "Currently operational. Tandem operations with Landsat 9 provide 8-day global coverage."
    },
    {
        name: "Landsat 9",
        altName: "",
        launchDate: new Date("2021-09-27"),
        endDate: null,
        operationalStart: 2021,
        operationalEnd: 2025,
        status: "operational",
        instruments: "OLI-2, TIRS-2",
        spatialResolution: "30m (multispectral), 15m (panchromatic), 100m (thermal)",
        spectralBands: 11,
        thermalBands: 2,
        description: "Enhanced version of Landsat 8 with 14-bit data and improved TIRS-2 design.",
        dataAccess: "USGS Earth Explorer, NASA LP DAAC, Google Earth Engine, AWS Open Data",
        notes: "Currently operational. Together with Landsat 8 provides 8-day global coverage."
    },
    {
        name: "Landsat Next",
        altName: "",
        launchDate: new Date("2031-01-01"),
        endDate: null,
        operationalStart: 2031,
        operationalEnd: 2050,
        status: "planned",
        instruments: "LandIS (Landsat Next Instrument Suite)",
        spatialResolution: "10-20m (most bands)",
        spectralBands: 26,
        thermalBands: 5,
        description: "Revolutionary three-satellite constellation with 26 spectral bands, enhanced resolution, and 6-day revisit.",
        dataAccess: "Will be available through USGS and NASA data portals",
        notes: "Planned launch late 2030/early 2031. Will provide unprecedented Earth observation capabilities."
    }
];

// Find satellites operational in a given year
function findSatellitesForYear(year) {
    return landsatMissions.filter(mission => {
        if (mission.status === "failed") return false;
        return year >= mission.operationalStart && year <= mission.operationalEnd;
    });
}

// Main search function
function findSatellites() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Get all entered years
    const years = [];
    for (let i = 1; i <= 5; i++) {
        const yearInput = document.getElementById(`year${i}`).value;
        if (yearInput && yearInput.trim() !== '') {
            const year = parseInt(yearInput);
            if (year >= 1972 && year <= 2035) {
                years.push(year);
            } else {
                resultsDiv.innerHTML = `<div class="error-box"><strong>Error:</strong> Please enter years between 1972 and 2035.</div>`;
                return;
            }
        }
    }

    if (years.length === 0) {
        resultsDiv.innerHTML = `<div class="warning-box"><strong>Please enter at least one year.</strong></div>`;
        return;
    }

    // Sort years
    years.sort((a, b) => a - b);

    // Display header
    let html = `<h3>Results for Year(s): ${years.join(', ')}</h3>`;

    // Process each year
    years.forEach(year => {
        const satellites = findSatellitesForYear(year);

        html += `<div class="result-item">`;
        html += `<h3>Year ${year}</h3>`;

        if (satellites.length === 0) {
            html += `<div class="warning-box"><strong>No operational Landsat satellites found for ${year}.</strong><br>`;
            if (year < 1972) {
                html += `The Landsat program began in 1972 with Landsat 1.`;
            } else if (year > 2025 && year < 2031) {
                html += `This is between current missions and Landsat Next (planned for 2031).`;
            }
            html += `</div>`;
        } else {
            html += `<p><strong>${satellites.length} satellite(s) operational in ${year}:</strong></p>`;

            satellites.forEach(sat => {
                const statusClass = `status-${sat.status}`;
                html += `<div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">`;
                html += `<h4>${sat.name} <span class="satellite-status ${statusClass}">${sat.status}</span></h4>`;
                if (sat.altName) {
                    html += `<p style="font-style: italic; color: var(--gray);">Also known as: ${sat.altName}</p>`;
                }
                html += `<p>${sat.description}</p>`;

                html += `<div class="specs-list">`;
                html += `<div class="spec-item"><div class="spec-label">Operational Period</div><div class="spec-value">${sat.operationalStart} - ${sat.operationalEnd === 2025 && sat.status === 'operational' ? 'Present' : sat.operationalEnd}</div></div>`;
                html += `<div class="spec-item"><div class="spec-label">Instruments</div><div class="spec-value">${sat.instruments}</div></div>`;
                html += `<div class="spec-item"><div class="spec-label">Spatial Resolution</div><div class="spec-value">${sat.spatialResolution}</div></div>`;
                html += `<div class="spec-item"><div class="spec-label">Spectral Bands</div><div class="spec-value">${sat.spectralBands} bands</div></div>`;
                html += `<div class="spec-item"><div class="spec-label">Thermal Bands</div><div class="spec-value">${sat.thermalBands} band(s)</div></div>`;
                html += `<div class="spec-item"><div class="spec-label">Data Access</div><div class="spec-value">${sat.dataAccess}</div></div>`;
                html += `</div>`;

                if (sat.notes) {
                    html += `<div style="margin-top: 1rem; padding: 0.75rem; background: var(--light-bg); border-radius: 5px;">`;
                    html += `<strong>Important Notes:</strong> ${sat.notes}`;
                    html += `</div>`;
                }

                html += `</div>`;
            });
        }

        html += `</div>`;
    });

    // Add recommendations
    if (years.length > 1) {
        html += generateRecommendations(years);
    }

    resultsDiv.innerHTML = html;
}

// Generate recommendations for multi-year analysis
function generateRecommendations(years) {
    let html = `<div class="recommendation-box">`;
    html += `<h4>Recommendations for Multi-Temporal Analysis</h4>`;

    const allSatellites = new Set();
    years.forEach(year => {
        const sats = findSatellitesForYear(year);
        sats.forEach(sat => allSatellites.add(sat.name));
    });

    html += `<p><strong>Satellites across your selected years:</strong> ${Array.from(allSatellites).join(', ')}</p>`;

    // Check for consistency
    const earliestYear = Math.min(...years);
    const latestYear = Math.max(...years);
    const timespan = latestYear - earliestYear;

    if (timespan > 0) {
        html += `<p><strong>Analysis timespan:</strong> ${timespan} years (${earliestYear} to ${latestYear})</p>`;
    }

    // Provide specific recommendations
    html += `<ul style="margin-top: 1rem;">`;

    // Check if all years have consistent sensors
    const earlyMSS = years.some(y => y <= 1983);
    const tmEra = years.some(y => y >= 1982 && y <= 2012);
    const modernEra = years.some(y => y >= 2013);

    if (earlyMSS && (tmEra || modernEra)) {
        html += `<li><strong>Resolution Inconsistency:</strong> Your years span different sensor generations. Early years (MSS) have 80m resolution while later years have 30m or better. Consider resampling to a common resolution for comparison.</li>`;
    }

    if (tmEra && modernEra) {
        html += `<li><strong>Sensor Transition:</strong> You're crossing from TM/ETM+ to OLI/TIRS sensors. While band definitions are similar, some spectral band differences exist. Review <a href="technical-specs.html">technical specifications</a> for band comparisons.</li>`;
    }

    const hasLandsat7After2003 = years.some(y => y >= 2003 && y <= 2012);
    if (hasLandsat7After2003) {
        html += `<li><strong>Landsat 7 SLC-off Data:</strong> For years 2003-2012, Landsat 7 data has scan line gaps due to SLC failure. Consider using gap-filling algorithms or supplementing with other satellites if available.</li>`;
    }

    if (latestYear >= 2013) {
        html += `<li><strong>Modern Data Advantages:</strong> For years 2013 onwards, you have access to higher radiometric resolution (12-14 bit), improved SNR, and additional spectral bands (coastal aerosol, cirrus).</li>`;
    }

    html += `<li><strong>Data Access:</strong> All historical Landsat data is freely available through <a href="https://earthexplorer.usgs.gov/" target="_blank">USGS Earth Explorer</a>, <a href="https://glovis.usgs.gov/" target="_blank">GloVis</a>, and <a href="https://earthengine.google.com/" target="_blank">Google Earth Engine</a>.</li>`;

    html += `</ul>`;
    html += `</div>`;

    return html;
}

// Quick search with single year
function quickSearch(year) {
    document.getElementById('year1').value = year;
    // Clear other fields
    for (let i = 2; i <= 5; i++) {
        document.getElementById(`year${i}`).value = '';
    }
    findSatellites();
}

// Quick search with multiple years
function quickSearchMultiple(years) {
    // Clear all fields first
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`year${i}`).value = '';
    }
    // Fill in the years
    years.forEach((year, index) => {
        if (index < 5) {
            document.getElementById(`year${index + 1}`).value = year;
        }
    });
    findSatellites();
}

// Reset form
function resetForm() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`year${i}`).value = '';
    }
    document.getElementById('results').innerHTML = '';
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`year${i}`).addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findSatellites();
            }
        });
    }
});
