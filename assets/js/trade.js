let tradeChart; // Global variable to store the Chart instance

async function fetchTradeData() {
    const country = document.getElementById("country-select").value;
    const years = 10; // Fetch last 10 years of data

    // World Bank API URLs for historical exports & imports
    const exportURL = `https://api.worldbank.org/v2/country/${country}/indicator/NE.EXP.GNFS.CD?date=${2023-years}:${2023}&format=json`;
    const importURL = `https://api.worldbank.org/v2/country/${country}/indicator/NE.IMP.GNFS.CD?date=${2023-years}:${2023}&format=json`;

    try {
        const [exportRes, importRes] = await Promise.all([
            fetch(exportURL),
            fetch(importURL)
        ]);

        const exportData = await exportRes.json();
        const importData = await importRes.json();

        if (exportData[1] && importData[1]) {
            const yearsArray = exportData[1].map(entry => entry.date);
            const exportValues = exportData[1].map(entry => entry.value);
            const importValues = importData[1].map(entry => entry.value);

            document.getElementById("trade-data").innerHTML = `
                <h2>${exportData[1][0].country.value} Trade Data</h2>
                <p><strong>Most Recent Year:</strong> ${exportData[1][0].date}</p>
                <p><strong>Exports (USD):</strong> $${exportData[1][0].value.toLocaleString()}</p>
                <p><strong>Imports (USD):</strong> $${importData[1][0].value.toLocaleString()}</p>
                <p><strong>Trade Balance:</strong> $${(exportData[1][0].value - importData[1][0].value).toLocaleString()}</p>
            `;

            // Update Chart
            updateChart(yearsArray, exportValues, importValues);
        } else {
            document.getElementById("trade-data").innerHTML = "<p>No data available</p>";
        }
    } catch (error) {
        console.error("Error fetching trade data:", error);
        document.getElementById("trade-data").innerHTML = "<p>Failed to load data</p>";
    }
}

// Function to create/update the Chart
function updateChart(years, exports, imports) {
    const ctx = document.getElementById("tradeChart").getContext("2d");

    // Destroy previous chart instance if exists
    if (tradeChart) {
        tradeChart.destroy();
    }

    tradeChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: years.reverse(),
            datasets: [
                {
                    label: "Exports (USD)",
                    data: exports.reverse(),
                    borderColor: "green",
                    fill: false,
                },
                {
                    label: "Imports (USD)",
                    data: imports.reverse(),
                    borderColor: "red",
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Year"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Trade Value (USD)"
                    }
                }
            }
        }
    });
}
