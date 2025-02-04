

// const list = document.getElementById('list')
// async function getData(){
//     const res = await fetch('https://restcountries.com/v3.1/all')
//     const data = await res.json()

//     if(!res.ok || res.status!==200){
//         throw new Error('Xatolik')
//     }
    

//     return data
// }


// getData()
// .then((data) => {
// render(data)
// })
// .catch((err) => {
//     console.log(err)

// })
// .finally(() =>{

// })

// function render(data){
//     if(data.length){
//         data.map((country)=>{
//             const div = document.createElement('div')
//             div.innerHTML = `
//             <img src='${country.flags.svg}' width = '264px' height = '160px' alt = '${country.flags.alt}'/>
//             <b>${country.name.common}</b>

//             <p>area</p>
//             `
//             console.log(country);

//             list.append(div)

            
//         })
//     }

// }






const list = document.getElementById('list');
const searchInput = document.getElementById('searchBtn');
const filterSelect = document.querySelector('.form-select');
const themeToggle = document.querySelector('header button');
const body = document.body;

// Fetch Countries Data
async function getData() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        if (!res.ok) {
            throw new Error('Error fetching data');
        }

        render(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

let countriesData = [];

getData().then(data => {
    countriesData = data;
});

// Render Function
function render(data) {
    list.innerHTML = "";
    data.forEach(country => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${country.flags.svg}" width="264px" height="160px" alt="${country.flags.alt}" />
            <b>${country.name.common}</b>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
        `;
        list.append(div);
    });
}

// Search Function
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    render(filteredData);
});

// Filter by Region
filterSelect.addEventListener('change', () => {
    const region = filterSelect.value;
    if (region === "Filter by Region") {
        render(countriesData);
    } else {
        const filteredData = countriesData.filter(country => country.region === region);
        render(filteredData);
    }
});

// Dark Mode Toggle
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});












