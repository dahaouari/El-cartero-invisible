import pytest
from httpx import ASGITransport, AsyncClient

from main import app


@pytest.mark.asyncio
async def test_obtenir_carta():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:

        response = await ac.get("/cartas/1")

        assert response.status_code == 200
        assert response.json()["id"] == 1


@pytest.mark.asyncio
async def test_carta_no_trobada():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:

        response = await ac.get("/cartas/999")

        assert response.status_code == 404


@pytest.mark.asyncio
async def test_paginacio():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:

        response = await ac.get("/cartas?limit=1&offset=0")

        assert response.status_code == 200
        assert len(response.json()) == 1