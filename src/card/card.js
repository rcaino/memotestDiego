function getCMSImageUrl(pokemonIdNumber) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('' + pokemonIdNumber).padStart(3, '0')}.png`;
}

function flip({ currentTarget }) {
    if (currentTarget.classList.contains('show') || currentTarget.classList.contains('solved')) return;
    setCardStatus(currentTarget, 'show');
}

export async function createCard(pokemonNumber) {
    const response = await fetch('/src/card/card.html');
    const element = document.createElement('div');
    element.innerHTML = await response.text();
    const pokeImg = element.querySelector('.frontImg');
    const card = element.querySelector('.card');
    card.setAttribute("poke", pokemonNumber);
    card.addEventListener("click", flip);
    pokeImg.src = getCMSImageUrl(pokemonNumber);
    return element;
}

export function setCardStatus({ classList }, status) {
    switch (status) {
        case 'show':
            classList.add('show');
            break;
        case 'solved':
            setTimeout(() => {
                classList.add('solved');
                classList.remove('show');
            }, 500);
            break;
        default:
            setTimeout(() => classList.remove('show'), 500);
            break;
    }
}