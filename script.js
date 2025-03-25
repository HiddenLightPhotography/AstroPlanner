// Function to load the deep-sky object catalog from GitHub
async function loadCatalog() {
    try {
        let response = await fetch("https://raw.githubusercontent.com/HiddenLightPhotography/AstroPlanner/main/dso-catalog.json");
        let data = await response.json();
        return data.objects;
    } catch (error) {
        console.error("Error loading catalog:", error);
        document.getElementById("results").innerHTML = "<p style='color:red;'>Error loading deep-sky catalog.</p>";
        return [];
    }
}

// Function to search for deep-sky objects
async function searchTargets() {
    let query = document.getElementById("search").value.toLowerCase();
    let catalog = await loadCatalog(); // Fetch JSON from GitHub
    let results = catalog.filter(obj => obj.name.toLowerCase().includes(query));

    document.getElementById("results").innerHTML = results.length > 0
        ? results.map(obj =>
            `<p><strong>${obj.name}</strong> - RA: ${obj.ra}, Dec: ${obj.dec} (${obj.type})</p>`
        ).join("")
        : "<p>No results found.</p>";
}

// Add event listener for the search input field
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton").addEventListener("click", searchTargets);
});
