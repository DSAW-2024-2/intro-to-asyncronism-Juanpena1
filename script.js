const Pokemonlist = document.querySelector("#list");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const resetBtn = document.getElementById('reset-btn');

// Cargar los 151 primeros Pokémon cuando se cargue la página
function loadInitialPokemon() {
    Pokemonlist.innerHTML = '';  // Limpiar lista antes de agregar los primeros 151 pokémon
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => showPokemon(data))
            .catch(error => console.error('Error al cargar los Pokémon:', error));
    }
    resetBtn.style.display = 'none'; // Ocultar el botón al cargar la página principal
}

// Llamar a la función cuando se cargue la página
loadInitialPokemon();

// Función para mostrar los Pokémon en la página
function showPokemon(pokemon) {
    let ab = pokemon.abilities.map((ability) => `<p class="${ability.ability.name} ability">${ability.ability.name}</p>`);
    ab = ab.join('');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="content">
            <div class="info">
                <div class="basic-info">
                    <h2 class="name">${pokemon.name}</h2>
                </div>
                <div class="image">
                    <img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}">
                </div>
                <div class="pokemon-abilities">
                    ${ab}
                </div>
                <div class="stats">
                    <p class="stat">${pokemon.height}m</p>
                    <p>|</p>
                    <p class="stat">${pokemon.weight}kg</p>
                </div>
            </div>
        </div>
    `;
    Pokemonlist.append(div);
}

// Búsqueda por nombre o ID al hacer clic en el botón
document.getElementById('search-btn').addEventListener('click', function() {
    const searchQuery = document.getElementById('pokemon-search').value.toLowerCase();
    if (searchQuery) {
        fetchPokemon(searchQuery);
    } else {
        alert('Por favor, ingresa un nombre o ID válido');
    }
});

// Función para buscar un Pokémon por nombre o ID
function fetchPokemon(query) {
    fetch(URL + query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar la lista de Pokémon actuales antes de mostrar el buscado
            Pokemonlist.innerHTML = '';
            showPokemon(data);
            // Mostrar el botón de reset después de la búsqueda
            resetBtn.style.display = 'block';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Agregar funcionalidad al botón de "Ver los primeros 151 Pokémon"
resetBtn.addEventListener('click', function() {
    // Limpiar cualquier resultado de búsqueda anterior
    Pokemonlist.innerHTML = '';
    // Volver a cargar los primeros 151 Pokémon
    loadInitialPokemon();
});
