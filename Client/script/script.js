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

export function renderitzarCartes(cartes) {

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
        const textNode = document.createTextNode(carta.contingut); // 👈 Creem el node de text
        paragraf.appendChild(textNode);                             // 👈 L'enganxem al paràgraf

        // Creem l'span de l'ID
        const idSpan = document.createElement("span");
        idSpan.textContent = `#${carta.id}`;
        idSpan.setAttribute("data-id", carta.id);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";
        btnEliminar.dataset.id = carta.id;

        // Muntem la carta
        divCarta.appendChild(titolCarta);
        divCarta.appendChild(paragraf);
        divCarta.appendChild(idSpan);
        divCarta.appendChild(btnEliminar);

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

    /* const boto = document.getElementById("btnSaluda");

    if (boto) {
        boto.addEventListener("click", saluda);
    }
    function saluda() {
        alert("Hola, món! Benvingut a l'oficina de correus.");
    } */

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
    // SETMANA 4: Botó Mostrar/Ocultar Cartes (TOGGLE)
    // ======================================
    const botoMostrarCartes = document.querySelector("#btnMostrar");
    if (botoMostrarCartes) {
        botoMostrarCartes.addEventListener("click", () => {
            const contenidor = document.querySelector("#contenidorCartes");
            const clearfix = document.querySelector("#contenidorCartes + .clearfix"); // El germà del contenidor
            if (!contenidor) return;

            // Mirem l'estil real que s'està aplicant
            const estilActual = window.getComputedStyle(contenidor).display;

            if (estilActual === "none") {
                // Estava amagat → el mostrem i canviem el text del botó
                contenidor.style.display = "block";
                if (clearfix) clearfix.style.display = "block";
                renderitzarCartes(cartesSimulades);
                botoMostrarCartes.textContent = "👁️ Amagar Cartes";
            } else {
                // Estava visible → l'amaguem i canviem el text del botó
                contenidor.style.display = "none";
                if (clearfix) clearfix.style.display = "none";
                botoMostrarCartes.textContent = "👁️ Mostrar Cartes";
            }
        });
    }

    const botoAfegirCartes = document.querySelector("#btnAfegir");
    if (botoAfegirCartes) {
        botoAfegirCartes.addEventListener("click", () => {
            const nouId = cartesSimulades.length > 0
                ? Math.max(...cartesSimulades.map(carta => carta.id)) + 1
                : 1;
            cartesSimulades.push({
                id: nouId,
                remitent: "Nou Remitent",
                contingut: "Aquesta és una carta de prova."
            });
            renderitzarCartes(cartesSimulades);
            renderitzarTaula(cartesSimulades);
        });
    }

    renderitzarCartes(cartesSimulades);
    renderitzarTaula(cartesSimulades);

    // ======================================
    // 🟦 SETMANA 4: Delegació d'esdeveniments (EL PORTER)
    // ======================================
    const contenidorCartes = document.querySelector("#contenidorCartes");
    if (contenidorCartes) {
        contenidorCartes.addEventListener("click", (event) => {
            if (event.target.classList.contains("btn-eliminar")) {
                const idAEliminar = parseInt(event.target.dataset.id);

                const index = cartesSimulades.findIndex(c => c.id === idAEliminar);
                if (index !== -1) {
                    cartesSimulades.splice(index, 1);
                    renderitzarCartes(cartesSimulades);
                    renderitzarTaula(cartesSimulades);
                }
            }
        });
    }

    const cosTaula = document.querySelector("#cosTaula");
    if (cosTaula) {
        cosTaula.addEventListener("click", (event) => {
            if (!(event.target instanceof Element) || !event.target.classList.contains("btn-eliminar")) {
                return;
            }

            const idAEliminar = parseInt(event.target.dataset.id, 10);
            const index = cartesSimulades.findIndex(carta => carta.id === idAEliminar);
            if (index !== -1) {
                cartesSimulades.splice(index, 1);
                renderitzarCartes(cartesSimulades);
                renderitzarTaula(cartesSimulades);
            }
        });
    }

    // ======================================
    // 🟦 SETMANA 4: Formulari
    // ======================================
    const formCarta = document.querySelector("#formCarta");
    if (formCarta) {
        formCarta.addEventListener("submit", (event) => {
            event.preventDefault();

            const remitent = document.querySelector("#remitent").value.trim();
            const destinatari = document.querySelector("#destinatari").value.trim();
            const contingut = document.querySelector("#contingut").value.trim();
            const personatge = document.querySelector("#personatge").value.trim() || "Einstein";

            if (!remitent || !destinatari || !contingut) {
                alert("Els camps remitent, destinatari i contingut són obligatoris!");
                return;
            }

            const nouId = cartesSimulades.length > 0 ? Math.max(...cartesSimulades.map(c => c.id)) + 1 : 1;

            cartesSimulades.push({
                id: nouId,
                remitent: remitent,
                destinatari: destinatari,
                contingut: contingut,
                personatge: personatge
            });

            renderitzarCartes(cartesSimulades);
            renderitzarTaula(cartesSimulades);
            formCarta.reset();
        });
    }

    // 🟪 SETMANA 4: Listener per al botó Mostrar/Ocultar
    const btnMostrarTaula = document.querySelector("#btnMostrarTaula");
    if (btnMostrarTaula) {
        btnMostrarTaula.addEventListener("click", toggleTaula);
    }
    
}

if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", inicialitzar);
}

// ==========================================
// 🟪 SETMANA 4: FUNCIONS DE LA TAULA
// ==========================================

// 1. Funció per renderitzar la taula
function renderitzarTaula(cartes) {
    const cosTaula = document.querySelector("#cosTaula");
    if (!cosTaula) return;

    cosTaula.innerHTML = ""; // Buidem la taula

    cartes.forEach(carta => {
        const fila = document.createElement("tr");

        // Cel·la ID
        const cellId = document.createElement("td");
        cellId.textContent = carta.id;
        fila.appendChild(cellId);

        // Cel·la Remitent
        const cellRemitent = document.createElement("td");
        cellRemitent.textContent = carta.remitent;
        fila.appendChild(cellRemitent);

        // Cel·la Destinatari
        const cellDestinatari = document.createElement("td");
        cellDestinatari.textContent = carta.destinatari || "-";
        fila.appendChild(cellDestinatari);

        // Cel·la Contingut (⭐ Amb la classe per truncar text!)
        const cellContingut = document.createElement("td");
        cellContingut.textContent = carta.contingut;
        cellContingut.className = "contingut-cell"; // 👈 Aplica l'ellipsis
        fila.appendChild(cellContingut);

        // Cel·la Accions (Botó eliminar a la taula)
        const cellAccions = document.createElement("td");
        const btnEliminarTaula = document.createElement("button");
        btnEliminarTaula.textContent = "Eliminar";
        btnEliminarTaula.className = "btn-eliminar";
        btnEliminarTaula.dataset.id = carta.id;
        cellAccions.appendChild(btnEliminarTaula);
        fila.appendChild(cellAccions);

        cosTaula.appendChild(fila);
    });
}

// 2. Funció per mostrar/ocultar la taula
function toggleTaula() {
    const taula = document.querySelector("#taulaCartes");
    if (!taula) return;

    // Obtenim l'estil COMPUTAT (el que realment s'aplica, vingui del CSS o inline)
    const estilActual = window.getComputedStyle(taula).display;

    if (estilActual === "none") {
        taula.style.display = "table"; // La mostrem
    } else {
        taula.style.display = "none";  // L'ocultem
    }
}
