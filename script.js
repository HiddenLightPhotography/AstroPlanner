async function searchTargets() {
    try {
        let query = document.getElementById("search").value.toLowerCase();
        document.getElementById("results").innerHTML = "<p>Loading data, please wait...</p>"; // Show loading message

        let response = await fetch("https://hiddenlightphotography.github.io/AstroPlanner/dso-catalog.json");

        if (!response.ok) {
            throw new Error(`Failed to load catalog: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        console.log("✅ Data successfully loaded:", data.length, "objects"); // Debugging output

        if (!data || !Array.isArray(data)) {
            throw new Error("Invalid JSON format: Expected an array");
        }

        let results = data.filter(obj =>
            obj.name.toLowerCase().includes(query) ||
            (obj.alternate_names && obj.alternate_names.toLowerCase().includes(query))
        );

        document.getElementById("results").innerHTML = results.length > 0
            ? results.map(obj =>
                `<p><strong>${obj.name}</strong> - RA: ${obj.ra}, Dec: ${obj.dec} (${obj.type})</p>`
            ).join("")
            : "<p>No results found.</p>";
    } catch (error) {
        console.error("❌ Error loading catalog:", error);
        document.getElementById("results").innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}
