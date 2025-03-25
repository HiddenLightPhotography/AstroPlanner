async function searchTargets() {
    try {
        let query = document.getElementById("search").value.toLowerCase();
        let response = await fetch("dso-catalog.json");

        if (!response.ok) {
            throw new Error(`Failed to load catalog: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();

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
        console.error("Error loading catalog:", error);
        document.getElementById("results").innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}
