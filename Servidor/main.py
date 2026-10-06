from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# 1. Model Pydantic (el "control de seguretat" de l'oficina)
class Carta(BaseModel):
    remitent: str
    destinatari: str
    contingut: str
    personatge: str = "Einstein"  # Valor per defecte per no obligar a enviar-lo

# 2. Llista en memòria (mutable, amb dades inicials de prova)
# La posem en minúscules perquè la modificarem amb el POST
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
# 🏠 RUTA PRINCIPAL
# ==========================
@app.get("/")
def root():
    return {"missatge": "Hola, món! Benvingut a l'oficina de correus."}


# ==========================
# 🟩 NOU: POST /cartas (Rebre cartes)
# ==========================
@app.post("/cartas")
def crear_carta(carta: Carta):
    # Pydantic V2: fem servir model_dump() en lloc de .dict()
    nova_carta = carta.model_dump()
    
    # Generem un ID automàtic basat en la llargada actual
    nova_carta["id"] = len(cartes) + 1
    
    # Guardem la carta a la llista en memòria
    cartes.append(nova_carta)
    
    return nova_carta


# ==========================
# 🟩 GET /cartas/{id} (Buscar per ID)
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
# 🟩 GET /cartas (Llistar amb filtres)
# ==========================
@app.get("/cartas")
def llistar_cartes(limit: int = 10, offset: int = 0, personatge: str = None):
    # Si hi ha filtre per personatge, filtrem (segons el temari, filtrem per remitent)
    if personatge:
        cartesFiltrades = [c for c in cartes if c["remitent"] == personatge]
    else:
        cartesFiltrades = cartes
    
    # Apliquem la paginació (slicing)
    return cartesFiltrades[offset:offset + limit]