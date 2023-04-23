const title = document.querySelector("#poke-title");
const pokeImage = document.querySelector("#poke-image");
const habilitiesTitle = document.querySelector("#habilities-title");
const habilities = document.querySelector("#habilities");
const typeTitle = document.querySelector("#type-title");
const type = document.querySelector("#type");
const evolutionsTitle = document.querySelector("#evolutions-title");
const evolutions = document.querySelector("#evolutions");
let suggestion1;
let suggestion2;
let suggestion3;

async function pokeSearch(poke){

    if(event.key === 'Enter') {
        let pokemon = poke.value
        let searchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        let pokeJSON = await searchPokemon.json();
        pokeUpdate(pokeJSON);
    }
    
}

async function pokeSuggestionSearch(id){

    let pokemon = id;
    let searchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let pokeJSON = await searchPokemon.json();
    pokeUpdate(pokeJSON);
    
}

function pokeUpdate(pokemon) {

    updateSuggestion();
    let pokeName = pokemon.name;
    habilities.innerHTML = '';
    type.innerHTML = '';
    evolutions.innerHTML = '';
    pokeName = capitalize(pokeName);

    title.innerHTML = pokeName;
    pokeImage.src = pokemon.sprites.front_default;
    habilitiesTitle.innerHTML = `O Pokémon ${pokeName} tem diversas habilidades, como:`
    updateMoves(pokemon);

    for(let i = 0; i < pokemon.types.length; i++) {
        let pokeType = pokemon.types[i].type.name;
        pokeType = capitalize(pokeType);
            
        let p = document.createElement('p');
        p.innerHTML = pokeType;
        type.appendChild(p)
    }

    evolves(pokemon.species.url);

}

function updateMoves(pokemon) {

    for(let i = 0; i <= 9; i++) {
        if(pokemon.moves.length > 8) {
            let move = pokemon.moves[i].move.name;
            move = capitalize(move);
        
            let p = document.createElement('p');
            p.innerHTML = move;
            habilities.appendChild(p);
        } else {
            for(let j = 0; j < pokemon.moves.length; j++) {
                let move = pokemon.moves[j].move.name;
                move = capitalize(move);
                
                let p = document.createElement('p');
                p.innerHTML = move;
                habilities.appendChild(p);
            }
            return;
        }
    }

}

async function evolves(url){

    let searchUrl = await fetch(url);
    let urlJSON = await searchUrl.json();
    
    let searchEvolves = await fetch(urlJSON.evolution_chain.url);
    evolveJSON = await searchEvolves.json();
    evolveJSON = evolveJSON.chain

    let evolves = Object.values(evolveJSON);
    
    let p = document.createElement('p');
    p.innerHTML = capitalize(evolves[3].name);
    evolutions.appendChild(p);

    if(evolves[1].length === 1) {

        let p = document.createElement('p');
        p.innerHTML = capitalize(evolves[1][0].species.name);
        evolutions.appendChild(p);
        
        for(let i = 0; i <= evolves[1][0].evolves_to.length -1; i++) {
            let p = document.createElement('p');
            p.innerHTML = capitalize(evolves[1][0].evolves_to[i].species.name);
            evolutions.appendChild(p);

        }

    } else {

        for(let i = 0; i <= evolves[1].length -1; i++) {
            let p = document.createElement('p');
            p.innerHTML = capitalize(evolves[1][i].species.name);
            evolutions.appendChild(p);

        }
    }

}

function capitalize(word) {

    return word.charAt(0).toUpperCase() + word.slice(1);

}

function randomId() {

    return Math.floor(Math.random() * 1010);
    

}

function updateSuggestion() {

    let img1 = document.querySelector("#img-1");
    let img2 = document.querySelector("#img-2");
    let img3 = document.querySelector("#img-3");

    suggestion1 = randomId();
    suggestion2 = randomId();
    suggestion3 = randomId();

    img1.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${suggestion1}.png`;
    img2.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${suggestion2}.png`;
    img3.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${suggestion3}.png`;

}

function suggestionClick(suggestion){

    if(suggestion.id == 'img-1') {
        poke = suggestion1;
        pokeSuggestionSearch(poke);
    } else if(suggestion.id == 'img-2') {
        poke = suggestion2;
        pokeSuggestionSearch(poke);
    } else if(suggestion.id == 'img-3') {
        poke = suggestion3;
        pokeSuggestionSearch(poke);
    } else {

        alert('Erro!');

    }

}

updateSuggestion()