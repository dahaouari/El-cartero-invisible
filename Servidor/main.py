from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


# ==========================
# 🟦 MODEL PYDANTIC
# ==========================

class Carta(BaseModel):
    remitent: str
    destinatari: str
    contingut: str
    personatge: str = "Einstein"


# ==========================
# 🟦 LLISTA DE CARTES
# ==========================

cartes = [
    {
        "id": 1,
        "remitent": "Maria",
        "destinatari": "Joan",
        "contingut": "Hola, com estàs?",
        "personatge": "Einstein"
    },
    {
        "id": 2,
        "remitent": "Joan",
        "destinatari": "Maria",
        "contingut": "T'escric des del passat.",
        "personatge": "Newton"
    },
    {
        "id": 3,
        "remitent": "Anna",
        "destinatari": "Tothom",
        "contingut": "Ens veiem divendres?",
        "personatge": "Curie"
    }
]


# ==========================
# 🏠 GET /
# ==========================
@app.get("/")
def root():
    return {"missatge": "Hola, món! Benvingut a l'oficina de correus."}


# ==========================
# 🟩 POST /cartas
# ==========================

@app.post("/cartas")
def crear_carta(carta: Carta):

    nova_carta = carta.model_dump()

    nova_carta["id"] = len(cartes) + 1

    cartes.append(nova_carta)

    return nova_carta


# ==========================
# 🟩 GET /cartas/{id}
# ==========================

@app.get("/cartas/{id}")
def obtenir_carta(id: int):

    for carta in cartes:

        if carta["id"] == id:
            return carta

    raise HTTPException(
        status_code=404,
        detail="Carta no trobada"
    )


# ==========================
# 🟩 GET /cartas
# ==========================

@app.get("/cartas")
def llistar_cartes(
    limit: int = 10,
    offset: int = 0,
    personatge: str = None
):

    if personatge:
        cartesFiltrades = [
            c for c in cartes
            if c["personatge"] == personatge
        ]
    else:
        cartesFiltrades = cartes

    return cartesFiltrades[offset:offset + limit]