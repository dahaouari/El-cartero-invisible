## Semana 2

### Frontend

Se ha trabajado la manipulación del DOM mediante:

- querySelector()
- querySelectorAll()
- textContent
- innerHTML
- setAttribute()
- style

### Backend

Se han creado los siguientes endpoints:

| Método | Ruta | Descripción |
|---|---|---|
| GET | / | Mensaje inicial |
| GET | /cartas/{id} | Obtener una carta |
| GET | /cartas | Listar cartas |

### Parámetros de consulta

Ejemplo:

/cartas?limit=1&offset=1

- limit: número máximo de cartas
- offset: posición inicial

### Errores

- /cartas/999 → 404
- /cartas/abc → 422

### CSS

Se ha trabajado:

- Box Model
- padding
- margin
- border
- border-radius
- box-shadow
- box-sizing: border-box
- px
- rem
- em
- %
