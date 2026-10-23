/**
 * @jest-environment jsdom
 */
import { renderitzarCartes } from '../js/script.js';
import userEvent from '@testing-library/user-event';

// ==========================================
// 🟦 SETMANA 4: Test Delegació d'Esdeveniments
// ==========================================

test('delegació d\'events: elimina carta en clicar el botó', async () => {
    // 1. Muntem l'escenari HTML amb una carta
    document.body.innerHTML = `
        <div id="contenidorCartes">
            <div class="carta" data-id="1">
                <button class="btn-eliminar">Eliminar</button>
            </div>
        </div>
    `;

    // 2. Simulem la teva lògica de delegació (el "porter")
    const contenidor = document.getElementById('contenidorCartes');
    contenidor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const carta = e.target.closest('.carta');
            carta.remove();
        }
    });

    // 3. Simulem un clic real al botó
    const btn = document.querySelector('.btn-eliminar');
    await userEvent.click(btn);

    // 4. Comprovem que la carta ha desaparegut del DOM
    expect(document.querySelectorAll('.carta').length).toBe(0);
});

// ==========================================
// 🟦 SETMANA 4: Test Validació del Formulari
// ==========================================

test('formulari: no envia si falten camps obligatoris', async () => {
    // Muntem un formulari amb el camp "remitent" buit
    document.body.innerHTML = `
        <form id="formCarta">
            <input type="text" id="remitent" value="">
            <input type="text" id="destinatari" value="Anna">
            <textarea id="contingut">Hola Anna!</textarea>
            <button type="submit">Enviar</button>
        </form>
    `;

    const form = document.getElementById('formCarta');
    let alerta = false;
    let enviamentBloquejat = false;

    // Simulem la teva lògica de validació
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ⭐ Atura l'enviament
        enviamentBloquejat = true;

        const remitent = document.querySelector('#remitent').value.trim();
        const destinatari = document.querySelector('#destinatari').value.trim();
        const contingut = document.querySelector('#contingut').value.trim();

        if (!remitent || !destinatari || !contingut) {
            alerta = true; // Falta el remitent!
        }
    });

    // Simulem el clic al botó d'enviar
    const btnSubmit = form.querySelector('button[type="submit"]');
    await userEvent.click(btnSubmit);

    // Comprovem que el formulari s'ha bloquejat i s'ha mostrat l'alerta
    expect(enviamentBloquejat).toBe(true);
    expect(alerta).toBe(true);
});