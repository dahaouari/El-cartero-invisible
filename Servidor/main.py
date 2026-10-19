from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

cartes_inicials = [
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
# 🗄️ L'ARXIVADOR (Persistència en JSON)
# ==========================

DATA_FILE = os.path.join(os.path.dirname(__file__), "cartas.json")


def cargar_cartes():
    """Llegeix les cartes del fitxer o conserva les cartes inicials."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return [carta.copy() for carta in cartes_inicials]


def guardar_cartes(cartes_a_guardar):
    """Escriu les cartes al fitxer."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(cartes_a_guardar, f, indent=2, ensure_ascii=False)


cartes = cargar_cartes()


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

    nova_carta["id"] = max((c["id"] for c in cartes), default=0) + 1

    cartes.append(nova_carta)
    guardar_cartes(cartes)

    return nova_carta


# ==========================
# 🟥 DELETE /cartas/{id}
# ==========================

@app.delete("/cartas/{id}")
def eliminar_carta(id: int):
    for carta in cartes:
        if carta["id"] == id:
            cartes.remove(carta)
            guardar_cartes(cartes)
            return {"missatge": f"Carta {id} eliminada correctament"}

    raise HTTPException(
        status_code=404,
        detail="Carta no trobada per eliminar"
    )


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
            if c.get("personatge") == personatge
        ]
    else:
        cartesFiltrades = cartes

    return cartesFiltrades[offset:offset + limit]