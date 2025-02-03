document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const countriesContainer = document.getElementById("countries");

    // Load theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Fetch countries data
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            countriesContainer.innerHTML = data.slice(0, 20).map(country => `
                <div class="card">
                    <img src="${country.flags.png}" alt="${country.name.common}" style="width: 100%; height: 150px; object-fit: cover;">
                    <h2>${country.name.common}</h2>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                </div>
            `).join("");
        });
});



document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }
    
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });
    
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("countries-container");
            data.slice(0, 20).forEach(country => {
                const card = document.createElement("div");
                card.classList.add("country-card");
                card.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.name.common}" width="100%">
                    <h3>${country.name.common}</h3>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Region: ${country.region}</p>
                `;
                container.appendChild(card);
            });
        });
});
