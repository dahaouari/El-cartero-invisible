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

    function renderitzarCartes(cartes) {

        const contenidor = document.querySelector("#contenidorCartes");

        if (!contenidor) {
            return;
        }

        // Buidem el contenidor abans de tornar a pintar
        contenidor.innerHTML = "";

        cartes.forEach(carta => {
            // 👇 INICI DEL BUCLE: Tot el que pengi d'una carta ha d'estar AQUÍ DINS

            // Creem el div de la carta
            const divCarta = document.createElement("div");
            divCarta.className = "carta";

            // Creem el títol
            const titolCarta = document.createElement("h3");
            titolCarta.textContent = `De: ${carta.remitent}`;

            // Creem el paràgraf (amb createTextNode per complir el temari)
            const paragraf = document.createElement("p");
            const textNode = document.createTextNode(carta.contingut);
            paragraf.appendChild(textNode);

            // Creem l'span de l'ID
            const idSpan = document.createElement("span");
            idSpan.textContent = `#${carta.id}`;
            idSpan.setAttribute("data-id", carta.id);

            // 🟦 SETMANA 4: Creem el botó Eliminar (HA D'ESTAR A DINS DEL FOREACH!)
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btn-eliminar";
            btnEliminar.dataset.id = carta.id; // 👈 Ara sí que sap quina 'carta' és

            // Muntem la carta (l'ordre en què s'enganxen al div)
            divCarta.appendChild(titolCarta);
            divCarta.appendChild(paragraf);
            divCarta.appendChild(idSpan);
            divCarta.appendChild(btnEliminar);

            // Afegim la carta al contenidor
            contenidor.appendChild(divCarta);

        }); // 👈 AQUÍ ES TANCA EL BUCLE forEach. La variable 'carta' deixa d'existir a partir d'aquí.
    }

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
                }
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
            formCarta.reset();
        });
    }

    inicialitzar();
}