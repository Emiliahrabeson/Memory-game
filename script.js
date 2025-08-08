let level = 1;
let cardsNumber = 4;
function melanger(tab) {
  for (let i = tab.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tab[i], tab[j]] = [tab[j], tab[i]];
  }
  return tab;
}

function create_card() {
  const cardTable = document.getElementById("card_table");
  const tabs = [];
  const usedLetters = new Set();
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWYXZ";

  while (tabs.length < count) {
    const index = Math.floor(Math.random() * LETTERS.length);
    const letter = LETTERS[index];

    // Tsy atsofoka tsony izay efa tao
    if (!usedLetters.has(letter)) {
      pairs.push(letter, letter);
      usedLetters.add(letter);
    }
  }

  cardTable.innerHTML = "";
  const tab_melangee = melanger(tab);
  tab_melangee.forEach((lettre) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const face = document.createElement("div");
    face.classList.add("face");
    face.textContent = lettre;

    const cachee = document.createElement("div");
    cachee.classList.add("cachee");

    card.appendChild(face);
    card.appendChild(cachee);
    cardTable.appendChild(card);
  });

  console.log("done, contents:", tab_melangee);
  return tab_melangee;
}

function play() {
  let compteur = 0;
  let compteur_score = 0;
  let cartesCliquees = [];
  let congrats = document.querySelector(".fin");

  if (congrats) {
    congrats.remove();
  }

  const bouton = document.querySelector(".Play_game");
  bouton.innerHTML = "Replay";

  const tab_melangee = create_card();
  let pair = tab_melangee.length / 2;

  setTimeout(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.add("flipped");
    });
  }, 3000);

  const cards = document.querySelectorAll(".card");
  cards.forEach((carte) => {
    carte.addEventListener("click", () => {
      if (compteur >= 2 || cartesCliquees.includes(carte)) {
        return;
      }
      if (carte.classList.contains("flipped")) {
        carte.classList.toggle("flipped");
        cartesCliquees.push(carte);
        compteur++;
      }

      if (compteur === 2) {
        const lettre1 = cartesCliquees[0].querySelector(".face").textContent;
        const lettre2 = cartesCliquees[1].querySelector(".face").textContent;

        if (lettre1 === lettre2) {
          compteur_score++;
          cartesCliquees = [];
          compteur = 0;

          if (compteur_score === pair) {
            if (level % 3 === 0) cardsNumber += 8;
            cardsNumber += 4;
            level += 1;
            const congrats = document.createElement("div");
            congrats.textContent = `Congratulation. Your next level is: ${level}`;
            congrats.className = "fin";
            document.body.appendChild(congrats);

            setTimeout(() => {
              play();
            }, 2000);
          }
        } else {
          setTimeout(() => {
            cartesCliquees[0].classList.toggle("flipped");
            cartesCliquees[1].classList.toggle("flipped");
            cartesCliquees = [];
            compteur = 0;
          }, 1000);
        }
      }
    });
  });
}
