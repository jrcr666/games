# Game Editor Application

Este proyecto es una aplicación de gestión de videojuegos, en la que se puede editar, votar, clonar y buscar juegos. La aplicación está construida utilizando **React** sin usar `react-router-dom`, para demostrar cómo se pueden manejar rutas de manera sencilla en una SPA. También implementa la persistencia de los datos en el `localStorage` para que los cambios realizados no se pierdan al recargar la página.

## Requisitos

- El proyecto debe mostrar una lista de videojuegos con su título, descripción y plataformas (obtenidos de la API de videojuegos [RAWG API](https://api.rawg.io)).
- Debe permitir la edición de los atributos de un videojuego (título, descripción y plataformas).
- Debe permitir clonar los videojuegos, lo cual añadirá el videojuego al final de la lista con un nuevo ID.
- El listado de juegos debe permitir ordenar los juegos según votos (upvote / downvote).
- Se debe mantener la persistencia en el `localStorage` para que los cambios no se pierdan al recargar la página.

```bash

npm install

npm run dev

```
