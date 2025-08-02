let cartes = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F"];

function melanger(tab) {
    for (let i = tab.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
    return tab;
}

function create_card() {
    const cardTable = document.getElementById("card_table");
    const tab_melangee = melanger(cartes);

    tab_melangee.forEach(lettre => {
        const card = document.createElement('div');
        card.classList.add('card');

        const face = document.createElement('div');
        face.classList.add('face');
        face.textContent = lettre;

        const cachee = document.createElement('div');
        cachee.classList.add('cachee');

        card.appendChild(face); 
        card.appendChild(cachee);
        cardTable.appendChild(card);
    });

    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.add('flipped');
        });
    }, 5000); 

    const cards = document.querySelectorAll('.card');
    cards.forEach(carte => {
        carte.addEventListener("click", () => {
            carte.classList.toggle('flipped');      //suppr ou ajoute flipped
        });
    });
    

}



create_card();
