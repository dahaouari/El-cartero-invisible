# Servidor/tests/test_main_setmana6.py

import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.mark.asyncio
async def test_update_carta():
    """Test que comprova que podem actualitzar una carta amb PUT."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Primer creem una carta
        payload_creacio = {
            "remitent": "Original",
            "destinatari": "Original",
            "contingut": "Contingut original",
            "personatge": "Einstein"
        }
        response_creacio = await ac.post("/cartas", json=payload_creacio)
        id_carta = response_creacio.json()["id"]
        
        # Ara l'actualitzem amb PUT
        payload_update = {
            "remitent": "Actualitzat",
            "destinatari": "Actualitzat",
            "contingut": "Contingut actualitzat",
            "personatge": "Newton"
        }
        response_update = await ac.put(f"/cartas/{id_carta}", json=payload_update)
        
        assert response_update.status_code == 200
        assert response_update.json()["remitent"] == "Actualitzat"
        assert response_update.json()["id"] == id_carta  # L'ID no canvia

@pytest.mark.asyncio
async def test_update_carta_not_found():
    """Test que comprova que retorna 404 si la carta no existeix."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "remitent": "X",
            "destinatari": "X",
            "contingut": "X",
            "personatge": "X"
        }
        response = await ac.put("/cartas/99999", json=payload)
        assert response.status_code == 404