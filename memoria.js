const images = [
  "img/a.jpg",
  "img/b.jpg",
  "img/c.jpg",
  "img/d.jpg",
  "img/e.jpg",
  "img/f.jpg"
];

// duplicamos para hacer parejas
let cards = [...images, ...images];
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matched = 0;

cards.forEach(img => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back" style="background-image:url('${img}')"></div>
    </div>
  `;

  card.addEventListener("click", () => flipCard(card, img));
  board.appendChild(card);
});

function flipCard(card, img) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flip");

  if (!firstCard) {
    firstCard = card;
    firstCard.dataset.img = img;
    return;
  }

  secondCard = card;
  secondCard.dataset.img = img;
  lockBoard = true;

  if (firstCard.dataset.img === secondCard.dataset.img) {
    matched += 2;
    resetTurn();

    if (matched === cards.length) {
      document.getElementById("winMessage").classList.remove("hidden");
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

