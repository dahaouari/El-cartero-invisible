// ==========================================
// script.js
// ==========================================

// Array de cartes simulades
const cartesSimulades = [
    {
        id: 1,
        remitent: "Maria",
        contingut: "Hola, com estàs? T'escric des del passat."
    },
    {
        id: 2,
        remitent: "Joan",
        contingut: "Avui he vist un carter misteriós."
    },
    {
        id: 3,
        remitent: "Laia",
        contingut: "Recorda que el temps és relatiu."
    }
];


// ==========================================
// 🟦 SETMANA 3: Renderitzar cartes
// ==========================================

function renderitzarCartes(cartes) {

    const contenidor = document.querySelector("#contenidorCartes");

    if (!contenidor) {
        return;
    }

    // Buidem el contenidor abans de tornar a pintar
    contenidor.innerHTML = "";

    cartes.forEach(carta => {

        // Creem el div de la carta
        const divCarta = document.createElement("div");
        divCarta.className = "carta";

        // Creem el títol
        const titolCarta = document.createElement("h3");
        titolCarta.textContent = `De: ${carta.remitent}`;

        // Creem el paràgraf
        const paragraf = document.createElement("p");
        paragraf.textContent = carta.contingut;

        // Creem l'span de l'ID
        const idSpan = document.createElement("span");
        idSpan.textContent = `#${carta.id}`;
        idSpan.setAttribute("data-id", carta.id);

        // Muntem la carta
        divCarta.appendChild(titolCarta);
        divCarta.appendChild(paragraf);
        divCarta.appendChild(idSpan);

        // Afegim la carta al contenidor
        contenidor.appendChild(divCarta);
    });
}


// ==========================================
//  INICIALITZACIÓ
// ==========================================

function inicialitzar() {

    // ======================================
    // SETMANA 1: Botó de salutació
    // ======================================

    function saluda() {
        alert("Hola, món! 📮");
    }

    const boto = document.getElementById("btnSaluda");

    if (boto) {
        boto.addEventListener("click", saluda);
    }


    // ======================================
    // SETMANA 2: Manipulació del DOM
    // ======================================

    const titol = document.querySelector("#titolPrincipal");

    if (titol) {
        titol.textContent = "📮 El Cartero Invisible – Setmana 2";
        titol.setAttribute("data-role", "banner");
    }


    const info = document.querySelector(".info");

    if (info) {
        info.style.color = "#2c3e50";
    }


    // ======================================
    // SETMANA 3: Mostrar les cartes
    // ======================================

    renderitzarCartes(cartesSimulades);


    // ======================================
    // SETMANA 3: Botó Afegir carta
    // ======================================

    const btnAfegir = document.querySelector("#btnAfegir");

    if (btnAfegir) {

        btnAfegir.addEventListener("click", () => {

            const nouId = cartesSimulades.length + 1;

            cartesSimulades.push({
                id: nouId,
                remitent: `Carter ${nouId}`,
                contingut: "Aquesta carta s'acaba de crear dinàmicament!"
            });

            renderitzarCartes(cartesSimulades);
        });
    }
}


// ==========================================
//  DOMContentLoaded
// ==========================================

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", inicialitzar);
}


// ==========================================
//  EXPORTACIÓ PER ALS TESTS
// ==========================================

export { renderitzarCartes };