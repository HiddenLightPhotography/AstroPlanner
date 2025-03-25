let dsoCatalog = []; // Store catalog data in memory

// ✅ Preload the JSON catalog once when the page loads
async function preloadCatalog() {
    try {
        console.log("🔄 Loading DSO Catalog...");
        let response = await fetch("https://hiddenlightphotography.github.io/AstroPlanner/dso-catalog.json");

        if (!response.ok) throw new Error(`Failed to load catalog: ${response.status} ${response.statusText}`);

        dsoCatalog = await response.json();

        if (!Array.isArray(dsoCatalog)) throw new Error("Invalid JSON format: Expected an array");

        console.log(`✅ DSO Catalog Loaded: ${dsoCatalog.length} objects`);
    } catch (error) {
        console.error("❌ Error loading catalog:", error);
    }
}

// ✅ Search function uses preloaded data (instant filtering)
function searchTargets() {
    let query = document.getElementById("search").value.toLowerCase();
    let resultsContainer = document.getElementById("results");

    if (dsoCatalog.length === 0) {
        resultsContainer.innerHTML = "<p>Catalog not loaded yet. Please wait...</p>";
        return;
    }

    let results = dsoCatalog.filter(obj =>
        obj.name.toLowerCase().includes(query) ||
        (obj.alternate_names && obj.alternate_names.toLowerCase().includes(query))
    );

    resultsContainer.innerHTML = results.length > 0
        ? results.map(obj =>
            `<p><strong>${obj.name}</strong> - RA: ${obj.ra}, Dec: ${obj.dec} (${obj.type})</p>`
        ).join("")
        : "<p>No results found.</p>";
}

// ✅ Preload the catalog when the page loads
document.addEventListener("DOMContentLoaded", preloadCatalog);
