class Deck {
    #maxPokeId = 151;
    #pokemonToSet = [];
    #cards = [];
    getCards(imageNumber) {
        this.#pokemonToSet = [];
        this.#cards = [];
        while (this.#pokemonToSet.length < imageNumber) {
            this.#PickRandomPoke();
        }
        while (this.#cards.length < imageNumber * 2) {
            this.#PickRandomPokeCard();
        }
        return this.#cards;
    }
    #PickRandomPoke() {
        const pokeId = Math.floor(Math.random() * this.#maxPokeId);
        if (this.#pokemonToSet.includes(pokeId)) {
            this.#PickRandomPoke();
        } else {
            this.#pokemonToSet.push(pokeId);
        }
    }
    #PickRandomPokeCard() {
        const pokeId = this.#pokemonToSet[Math.floor(Math.random() * this.#pokemonToSet.length)];
        if (pokeId) {
            if (this.#cards.includes(pokeId)) {
                this.#pokemonToSet = this.#pokemonToSet.filter(x => x !== pokeId);
            }
            this.#cards.push(pokeId);
        }
    }
}


export default Deck;