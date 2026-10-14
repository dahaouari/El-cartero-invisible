import pytest
import json
import os
from httpx import AsyncClient, ASGITransport
from main import app

# ==========================================
# 🟩 SETMANA 4: Test Persistència en JSON
# ==========================================

@pytest.mark.asyncio
async def test_persistencia_post():
    """Verifica que en fer POST, la carta es guarda al fitxer cartas.json."""
    
    # ⭐ SOLUCIÓ: Si el fitxer no existeix, el creem amb una llista buida
    if not os.path.exists("cartas.json"):
        with open("cartas.json", "w", encoding="utf-8") as f:
            json.dump([], f)
    
    # Llegim les dades abans (ara sabem que el fitxer existeix segur)
    with open("cartas.json", "r", encoding="utf-8") as f:
        dades_abans = json.load(f)

    # Fem el POST
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "remitent": "Test",
            "destinatari": "Test",
            "contingut": "Test de persistència",
            "personatge": "Test"
        }
        response = await ac.post("/cartas", json=payload)
        assert response.status_code == 200

    # Llegim les dades després
    with open("cartas.json", "r", encoding="utf-8") as f:
        dades_despres = json.load(f)

    # Comprovem que hi ha una carta més
    assert len(dades_despres) == len(dades_abans) + 1

# ==========================================
# 🟩 SETMANA 4: Test Endpoint DELETE
# ==========================================

@pytest.mark.asyncio
async def test_delete_carta():
    """Verifica que en fer DELETE, la carta s'elimina del fitxer cartas.json."""
    
    # ⭐ SOLUCIÓ: Assegurem que el fitxer existeix
    if not os.path.exists("cartas.json"):
        with open("cartas.json", "w", encoding="utf-8") as f:
            json.dump([], f)
    
    # Primer creem una carta per tenir-la a punt per eliminar
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        payload = {
            "remitent": "Eliminar",
            "destinatari": "Test",
            "contingut": "Aquesta carta serà eliminada",
            "personatge": "Test"
        }
        response = await ac.post("/cartas", json=payload)
        assert response.status_code == 200
        id_creat = response.json()["id"]

    # Ara eliminem la carta que acabem de crear
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.delete(f"/cartas/{id_creat}")
        assert response.status_code == 200

    # Verifiquem que ja no està al fitxer
    with open("cartas.json", "r", encoding="utf-8") as f:
        dades = json.load(f)
    
    assert not any(c["id"] == id_creat for c in dades)