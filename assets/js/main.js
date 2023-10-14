const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" key=${pokemon.number}>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class="stats">
                    <div>
                        <span class="stats-name">Height:</span>
                        <span>${pokemon.height} m</span>
                    </div>
                    <div>
                        <span class="stats-name">Weight:</span>
                        <span>${pokemon.weight} kg</span>
                    </div>
                </div>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.insertAdjacentHTML('beforeend', newHtml)
        pokemonList.querySelectorAll(".pokemon").forEach((node) => node.onclick = () => selectPokemon(node))
    })
}

let selectedPokemon
function selectPokemon(node) {
    if (selectedPokemon === undefined) {
        selectedPokemon = node
        selectedPokemon.classList.add("show")
        return
    }

    selectedPokemon.classList.remove("show")
    const number = node.getAttribute("key")
    if (number == selectedPokemon.getAttribute("key")) {
        selectedPokemon = undefined
    } else {
        selectedPokemon = node
        selectedPokemon.classList.add("show")
    }
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
