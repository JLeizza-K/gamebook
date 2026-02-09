# Gamebook – Backend API

---

## Descripción general
Gamebook es una API backend para una aplicación web tipo red social de juegos. Los usuarios pueden crear fichas de juegos, marcar juegos de otros usuarios como favoritos y puntuarlos.

El objetivo principal del proyecto es académico: aprender a diseñar e implementar un backend moderno con autenticación, autorización y una arquitectura pensada desde un enfoque Backend for Frontend (BFF), para luego conectarlo con un frontend en React.

## Objetivos de aprendizaje
* Diseñar un backend REST orientado a pantallas (BFF)
* Implementar autenticación y autorización de forma correcta
* Modelar relaciones reales en una base de datos relacional
* Utilizar migrations para versionar el esquema de la base de datos
* Conectar un backend con un frontend por primera vez
* Comprender el flujo completo request → validación → lógica → respuesta

## Tecnologías utilizadas

### Backend
* Node.js
* NestJS
   * Framework principal
   * Uso de módulos, controllers, services y guards
* TypeORM
   * ORM para el mapeo de entidades
   * Uso de migrations para el control del esquema
* PostgreSQL
   * Base de datos relacional principal
* Docker
   * Usado para levantar PostgreSQL en entorno local
* JWT (JSON Web Tokens)
   * Autenticación stateless

## Enfoque Backend for Frontend (BFF)
La API no expone directamente las entidades de base de datos. Cada endpoint devuelve DTOs orientados a las necesidades del frontend, reduciendo la cantidad de requests y evitando lógica de negocio en el cliente.

El backend se encarga de:
* Centralizar la lógica de negocio
* Aplicar reglas de autorización
* Devolver datos listos para ser consumidos por la interfaz

## Autenticación
La autenticación se implementa mediante JWT.

### Flujo general
1. El usuario se registra o inicia sesión
2. El backend valida las credenciales
3. Se emite un JWT
4. El frontend envía el token en cada request protegido

El token se envía en el header: `Authorization: Bearer <access_token>`

## Autorización
La autorización se basa en dos reglas principales:

### Acceso autenticado
Requiere que el usuario esté logueado:
* Crear juegos
* Puntuar juegos
* Marcar juegos como favoritos

### Ownership (propiedad del recurso)
Solo el autor de un juego puede:
* Editarlo
* Eliminarlo

Las validaciones de ownership se realizan en la capa de servicios, no en los controllers.

## Endpoints disponibles

### Autenticación
* `POST /auth/register` - Registro de usuario
* `POST /auth/login` - Inicio de sesión y emisión de JWT

### Usuarios
* `GET /users` - Lista de usuarios
* `GET /users/:id/profile` - Perfil de usuario con información agregada (contadores, etc.)
* `GET /users/:id/games` - Lista de juegos creados por el usuario
* `GET /users/:id/favourites` - Lista de juegos marcados como favoritos por el usuario
* `GET /users/:id/scores` - Lista de puntuaciones realizadas por el usuario

### Juegos
* `GET /games` - Lista de todos los juegos
* `GET /games/:id` - Detalle de un juego
* `POST /games` - Crea un juego nuevo. Requiere autenticación. El autor se obtiene del token JWT
* `PUT /games/:id` - Edita un juego existente. Requiere autenticación y ownership

### Favoritos
* `POST /favourites/:gameId` - Marca o desmarca un juego como favorito (toggle). Requiere autenticación. Un usuario no puede marcar el mismo juego como favorito más de una vez

### Scores
* `POST /scores/:gameId` - Crea o actualiza la puntuación de un juego. Requiere autenticación. Un usuario solo puede puntuar un juego una vez

## Persistencia y migrations
* La base de datos principal es PostgreSQL
* El esquema se controla mediante migrations de TypeORM
* La opción `synchronize` está deshabilitada
* Cada cambio en las entidades genera una migration nueva
* Las migrations representan la historia del esquema y no se modifican una vez ejecutadas

## Alcance actual
* Backend funcional
* Autenticación y autorización implementadas
* API preparada para ser consumida por un frontend en React

## Posibles extensiones futuras
* Feed de actividad (posible uso de NoSQL)
* Comentarios o reviews
* Sistema de roles (admin / moderador)
* Refresh tokens
* Storage externo para imágenes (S3 / MinIO)

---

# Gamebook – Backend API

---

## Overview
Gamebook is a backend API for a game-focused social network web application. Users can create game entries, mark other users' games as favorites, and rate them.

The main objective of the project is educational: learning how to design and implement a modern backend with authentication, authorization, and an architecture designed from a Backend for Frontend (BFF) approach, to later connect it with a React frontend.

## Learning Objectives
* Design a screen-oriented REST backend (BFF)
* Implement authentication and authorization correctly
* Model real-world relationships in a relational database
* Use migrations to version the database schema
* Connect a backend with a frontend for the first time
* Understand the complete flow: request → validation → logic → response

## Technologies Used

### Backend
* Node.js
* NestJS
   * Main framework
   * Use of modules, controllers, services, and guards
* TypeORM
   * ORM for entity mapping
   * Use of migrations for schema control
* PostgreSQL
   * Main relational database
* Docker
   * Used to run PostgreSQL in local environment
* JWT (JSON Web Tokens)
   * Stateless authentication

## Backend for Frontend (BFF) Approach
The API does not directly expose database entities. Each endpoint returns DTOs oriented to the frontend's needs, reducing the number of requests and avoiding business logic on the client side.

The backend is responsible for:
* Centralizing business logic
* Applying authorization rules
* Returning data ready to be consumed by the interface

## Authentication
Authentication is implemented using JWT.

### General Flow
1. User registers or logs in
2. Backend validates credentials
3. A JWT is issued
4. Frontend sends the token in each protected request

The token is sent in the header: `Authorization: Bearer <access_token>`

## Authorization
Authorization is based on two main rules:

### Authenticated Access
Requires the user to be logged in:
* Create games
* Rate games
* Mark games as favorites

### Ownership (Resource Ownership)
Only the author of a game can:
* Edit it
* Delete it

Ownership validations are performed in the service layer, not in controllers.

## Available Endpoints

### Authentication
* `POST /auth/register` - User registration
* `POST /auth/login` - Login and JWT issuance

### Users
* `GET /users` - List of users
* `GET /users/:id/profile` - User profile with aggregated information (counters, etc.)
* `GET /users/:id/games` - List of games created by the user
* `GET /users/:id/favourites` - List of games marked as favorites by the user
* `GET /users/:id/scores` - List of ratings made by the user

### Games
* `GET /games` - List of all games
* `GET /games/:id` - Game details
* `POST /games` - Creates a new game. Requires authentication. The author is obtained from the JWT token
* `PUT /games/:id` - Edits an existing game. Requires authentication and ownership

### Favorites
* `POST /favourites/:gameId` - Marks or unmarks a game as favorite (toggle). Requires authentication. A user cannot mark the same game as favorite more than once

### Scores
* `POST /scores/:gameId` - Creates or updates a game rating. Requires authentication. A user can only rate a game once

## Persistence and Migrations
* The main database is PostgreSQL
* The schema is controlled through TypeORM migrations
* The `synchronize` option is disabled
* Each change in entities generates a new migration
* Migrations represent the schema history and are not modified once executed

## Current Scope
* Functional backend
* Authentication and authorization implemented
* API ready to be consumed by a React frontend

## Possible Future Extensions
* Activity feed (possible use of NoSQL)
* Comments or reviews
* Role system (admin / moderator)
* Refresh tokens
* External storage for images (S3 / MinIO)