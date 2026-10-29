import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { actualitzarCarta, eliminarCarta } from '../js/script.js';

// Mock de fetch global
global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

test('actualitzarCarta fa una petició PUT correcta', async () => {
    const dades = { 
        remitent: 'Nou', 
        destinatari: 'Nou', 
        contingut: 'Nou', 
        personatge: 'Nou' 
    };
    
    global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ...dades, id: 1 }),
    });

    await actualitzarCarta(1, dades);

    expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/cartas/1',
        expect.objectContaining({ 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dades)
        })
    );
});

test('eliminarCarta fa una petició DELETE correcta', async () => {
    global.fetch.mockResolvedValue({ 
        ok: true, 
        status: 204 
    });

    await eliminarCarta(5);

    expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/cartas/5',
        expect.objectContaining({ method: 'DELETE' })
    );
});