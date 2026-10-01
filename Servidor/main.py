from fastapi import FastAPI, HTTPException

app = FastAPI()


@app.get("/")
def root():
    return {"missatge": "Hola, món!"}



app = FastAPI()


CARTES = [
    {
        "id": 1,
        "remitent": "Maria",
        "contingut": "Hola, com estàs?"
    },
    {
        "id": 2,
        "remitent": "Joan",
        "contingut": "T'escric des del passat."
    },
    {
        "id": 3,
        "remitent": "Anna",
        "contingut": "Ens veiem divendres?"
    }
]


@app.get("/")
def root():
    return {"missatge": "Hola, món!"}


@app.get("/cartas/{id}")
def obtenir_carta(id: int):

    for carta in CARTES:
        if carta["id"] == id:
            return carta

    raise HTTPException(
        status_code=404,
        detail="Carta no trobada"
    )


@app.get("/cartas")
def llistar_cartes(limit: int = 10, offset: int = 0):

    return CARTES[offset:offset + limit]