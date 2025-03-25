let dsoCatalog = [];
let isCatalogLoaded = false;

async function preloadCatalog() {
    try {
        console.log("🔄 Fetching DSO Catalog...");
        let response = await fetch("https://hiddenlightphotography.github.io/AstroPlanner/dso-catalog.json");

        if (!response.ok) throw new Error(`Failed to load catalog: ${response.status} ${response.statusText}`);

        dsoCatalog = await response.json();
        isCatalogLoaded = true;

        if (!Array.isArray(dsoCatalog)) throw new Error("Invalid JSON format: Expected an array");

        console.log(`✅ DSO Catalog Loaded: ${dsoCatalog.length} objects`);
    } catch (error) {
        console.error("❌ Error loading catalog:", error);
    }
}

function searchTargets() {
    let query = document.getElementById("search").value.toLowerCase();
    let resultsContainer = document.getElementById("results");

    if (!isCatalogLoaded) {
        resultsContainer.innerHTML = "<p>🔄 Loading catalog... Please wait.</p>";
        return;
    }

    console.log(`🔍 Searching for: "${query}"`);

    let results = dsoCatalog.filter(obj =>
        obj.name.toLowerCase().includes(query) ||
        (obj.alternate_names && obj.alternate_names.toLowerCase().includes(query))
    );

    console.log(`✅ Found ${results.length} results`);

    let displayedResults = results.slice(0, 10);

    resultsContainer.innerHTML = displayedResults.length > 0
        ? displayedResults.map(obj =>
            `<p><strong>${obj.name}</strong> - RA: ${obj.ra}, Dec: ${obj.dec} (${obj.type})</p>`
        ).join("")
        : "<p>❌ No results found.</p>";

    if (results.length > 10) {
        resultsContainer.innerHTML += `<p>⚠️ Showing first 10 results. Refine search for more.</p>`;
    }
}

// ✅ Load catalog when the page loads
document.addEventListener("DOMContentLoaded", preloadCatalog);
