import { createCard, setCardStatus } from './src/card/card.js';
import Deck from './src/deck/deck.js';

function calculateColumns(imagesQty) {
    if (imagesQty <= 1) return 1;
    const totalImages = imagesQty * 2;
    for (let columns = Math.ceil(Math.sqrt(totalImages)); columns < totalImages; columns++) {
        if (totalImages % columns === 0) {
            return columns;
        }
    }
}
window.onload = async () => {
    await renderCards(document.getElementById('cardQtyInp').value);
    document.getElementById('newGameBtn').onclick = async () => await renderCards();
};

function onCardClick() {
    const cardsDisplayed = document.querySelectorAll('.card.show');
    if (cardsDisplayed.length === 2) {
        if (cardsDisplayed[0].getAttribute('poke') == cardsDisplayed[1].getAttribute('poke')) {
            cardsDisplayed.forEach(card => setCardStatus(card, 'solved'));
        } else {
            cardsDisplayed.forEach(card => setCardStatus(card, 'reset'));
        }
    }
}

async function renderCards() {
    const qty = +document.getElementById('cardQtyInp').value;
    clearGameBoard(calculateColumns(qty))
    const deck = new Deck().getCards(qty);
    for (let i = 0; i < deck.length; i++) {
        const card = await createCard(deck[i]);
        document.querySelector('.gameBoard').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', onCardClick))
}

function clearGameBoard(columns) {
    const board = document.querySelector('.gameBoard');
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}