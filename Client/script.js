// ==========================================
// 🟦 SETMANA 1: El botó de salutació
// ==========================================

// 1. Definim la funció que faltava!
function saluda() {
    alert("Hola, món! 📮");
}

// 2. Seleccionem el botó
const boto = document.getElementById("btnSaluda");

// 3. Comprovem que existeixi abans d'escoltar-lo (Bona pràctica)
if (boto) {
    boto.addEventListener("click", saluda);
} else {
    console.warn("⚠️ No s'ha trobat cap botó amb id 'btnSaluda' a l'HTML.");
}


// ==========================================
// 🟦 SETMANA 2: Manipulació del DOM
// ==========================================

// 1. Modifiquem el títol
const titol = document.querySelector("#titolPrincipal");
if (titol) {
    titol.textContent = "📮 El Cartero Invisible – Setmana 2";
    titol.setAttribute("data-role", "banner");
}

// 2. Injectem HTML al contenidor
const contenidor = document.querySelector("#contenidorCartes");
if (contenidor) {
    contenidor.innerHTML = "<p>Cartes pendents: 0</p>";
}

// 3. Canviem l'estil del paràgraf d'informació
const info = document.querySelector(".info");
if (info) {
    // Recorda: a JS les propietats CSS van en camelCase
    info.style.color = "#2c3e50"; 
}

function renderitzarCartes(cartes) {
    const contenidor = document.querySelector("#contenidorCartes");

    contenidor.innerHTML = "";

    cartes.forEach(carta => {
        const divCarta = document.createElement("div");
        divCarta.className = "carta";

        const titol = document.createElement("h3");
        titol.textContent = `De: ${carta.remitent}`;

        const paragraf = document.createElement("p");
        paragraf.textContent = carta.contingut;

        const idSpan = document.createElement("span");
        idSpan.textContent = `#${carta.id}`;
        idSpan.setAttribute("data-id", carta.id);

        divCarta.appendChild(titol);
        divCarta.appendChild(paragraf);
        divCarta.appendChild(idSpan);

        contenidor.appendChild(divCarta);
    });
}

export { renderitzarCartes };