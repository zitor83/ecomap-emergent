# 🌱 GoGoMap

**GoGoMap** es una aplicación web desarrollada para localizar y explorar puntos relacionados con los **17 Objetivos de Desarrollo Sostenible (ODS)** en Málaga.

La aplicación permite consultar puntos en un mapa, obtener información sobre ellos, guardarlos como favoritos y participar en diferentes funcionalidades de gamificación.

## 🚀 Demo

* **Aplicación:** https://gogomap-frontend.onrender.com
* **API:** https://gogomap-backend.onrender.com
* **Repositorio:** https://github.com/zitor83/ecomap-emergent

> El frontend y el backend están desplegados en Render y la aplicación utiliza una base de datos MySQL alojada en Aiven.

---

## ✨ Funcionalidades

### 🗺️ Mapa de puntos ODS

* Visualización de puntos ODS sobre un mapa interactivo.
* Filtrado de puntos por ODS.
* Consulta del detalle de cada punto.
* Geolocalización mediante la API de geolocalización del navegador.
* Cálculo de rutas mediante **OSRM**.
* Datos de puntos procedentes de archivos GeoJSON.

### 👤 Usuarios

* Registro e inicio de sesión.
* Autenticación mediante **JWT**.
* Perfil de usuario.
* Actualización de datos del perfil.

### ⭐ Participación y gamificación

* Guardado y gestión de puntos favoritos.
* Acciones sobre puntos y sistema de karma.
* Ranking de usuarios.
* Logros.
* Recompensas.
* Ruleta diaria.

### 🎨 Interfaz

* Diseño responsive.
* Navegación mediante React Router.
* Páginas de error para rutas no encontradas y errores generales.
* Iconografía correspondiente a los 17 ODS.

---

## 🛠️ Stack tecnológico

### Frontend

* **React 19**
* **TypeScript 6**
* **Vite 8**
* **React Router 7**
* **Axios**
* **Leaflet**
* **React-Leaflet**
* Clustering de marcadores
* **Tailwind CSS**
* Componentes basados en Radix UI / shadcn/ui
* **pnpm**

### Backend

* **Java 21**
* **Spring Boot 3.5.14**
* Spring Web
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* MySQL
* MapStruct
* Maven

### Infraestructura

* **Render** — frontend y backend
* **Aiven** — MySQL
* **Docker** — imagen del backend

---

## 📁 Estructura del proyecto

```text
GoGoMap/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── pnpm-lock.yaml
│
└── README.md
```

El proyecto está organizado como un monorepo con frontend y backend independientes.

Para conocer los detalles específicos de cada parte:

* [`frontend/README.md`](frontend/README.md)
* [`backend/README.md`](backend/README.md)

---

# 💻 Instalación local

## Requisitos

* Java 21
* Maven
* Node.js
* pnpm
* MySQL

## 1. Clonar el repositorio

```bash
git clone https://github.com/zitor83/ecomap-emergent.git
cd ecomap-emergent
```

## 2. Backend

Accede al directorio:

```bash
cd backend
```

Configura las variables necesarias para la conexión a MySQL y JWT.

Variables principales:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MINUTES
```

Por defecto, durante el desarrollo local, el backend utiliza:

```text
http://localhost:8080
```

Para ejecutar los tests:

```bash
mvn test
```

Para generar el proyecto:

```bash
mvn package
```

## 3. Frontend

Desde el directorio `frontend`:

```bash
pnpm install
```

Configura:

```text
VITE_API_BASE_URL
```

Para desarrollo local:

```text
VITE_API_BASE_URL=http://localhost:8080
```

El frontend añade automáticamente el prefijo `/api` al utilizar esta variable.

Iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

Comprobar lint:

```bash
pnpm run lint
```

Generar la build de producción:

```bash
pnpm run build
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

# 🔌 API

La API está desarrollada con Spring Boot y utiliza dos prefijos principales.

### Autenticación

```text
POST /api/auth/register
POST /api/auth/login
```

### Puntos ODS

```text
GET /api/v1/points
GET /api/v1/points/{id}
POST /api/v1/points/{id}/actions
GET /api/v1/points/{id}/actions/status
```

### Usuarios

```text
GET /api/v1/users/me
PUT /api/v1/users/me
GET /api/v1/users/ranking
```

### Favoritos

```text
GET    /api/v1/users/me/favorites
POST   /api/v1/users/me/favorites/{pointId}
DELETE /api/v1/users/me/favorites/{pointId}
```

### Gamificación

```text
GET  /api/v1/users/me/wheel-spin/status
POST /api/v1/users/me/wheel-spin

GET  /api/v1/users/me/achievements

GET  /api/v1/users/me/rewards
POST /api/v1/users/me/rewards/{rewardId}/buy
```

La documentación interactiva de la API está disponible mediante **Swagger/OpenAPI** en el backend desplegado.

---

# 🚀 Despliegue

La versión actualmente desplegada utiliza la siguiente arquitectura:

```text
                    ┌──────────────────────────┐
                    │   GoGoMap Frontend       │
                    │   Render Static Site     │
                    └────────────┬─────────────┘
                                 │
                                 │ HTTPS / REST API
                                 ▼
                    ┌──────────────────────────┐
                    │   GoGoMap Backend        │
                    │   Render Web Service     │
                    │   Spring Boot + Docker   │
                    └────────────┬─────────────┘
                                 │
                                 │ MySQL / SSL
                                 ▼
                    ┌──────────────────────────┐
                    │      Aiven MySQL         │
                    │       Persistencia       │
                    └──────────────────────────┘
```

### Frontend

El frontend está desplegado como **Static Site** en Render.

**URL:**

https://gogomap-frontend.onrender.com

Durante el proceso de build se utiliza:

```bash
pnpm install --frozen-lockfile
pnpm run build
```

El resultado publicado corresponde al directorio:

```text
frontend/dist
```

La configuración de Render incluye un rewrite de:

```text
/*
```

hacia:

```text
/index.html
```

Esto permite que las rutas gestionadas por React Router funcionen correctamente al acceder directamente a ellas.

### Backend

El backend está desplegado como **Web Service** en Render utilizando el `Dockerfile` situado en:

```text
backend/Dockerfile
```

**URL:**

https://gogomap-backend.onrender.com

El contenedor utiliza Java 21 y ejecuta la aplicación Spring Boot generada por Maven.

### Base de datos

La aplicación utiliza **MySQL** como base de datos de producción.

La instancia actual está alojada en **Aiven** y es utilizada por el backend desplegado en Render.

La conexión utiliza SSL.

Las credenciales y datos de conexión se proporcionan mediante variables de entorno y **no forman parte del repositorio**.

### Variables de entorno del backend

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MINUTES
SERVER_PORT
```

### Variables de entorno del frontend

```text
VITE_API_BASE_URL
```

En producción:

```text
VITE_API_BASE_URL=https://gogomap-backend.onrender.com
```

El frontend añade `/api` automáticamente al construir las peticiones.

### CORS

El backend permite actualmente las siguientes procedencias:

```text
http://localhost:5173
https://gogomap-frontend.onrender.com
```

La configuración de los servicios de Render y de Aiven se gestiona fuera del repositorio.

---

# 🧪 Testing y calidad

Actualmente el backend dispone de un test de contexto de Spring Boot.

Ejecutar:

```bash
mvn test
```

En el frontend se utilizan las comprobaciones disponibles mediante:

```bash
pnpm run lint
pnpm run build
```

No se incluyen actualmente tests automatizados de frontend.

---

# ⚠️ Consideraciones actuales

* La aplicación es una **aplicación web**, no una aplicación móvil nativa.
* La base de datos de producción utiliza MySQL en Aiven.
* Hibernate utiliza `ddl-auto=update`; actualmente no existe un sistema de migraciones versionadas como Flyway o Liquibase.
* La configuración de Render no está versionada mediante `render.yaml`.
* Las credenciales y secretos de producción se mantienen fuera del repositorio.
* Las características de PWA y el cumplimiento formal de WCAG no se consideran parte de la documentación técnica hasta disponer de una verificación específica.

---

## 📚 Documentación

Para información más detallada:

* [Documentación del frontend](frontend/README.md)
* [Documentación del backend](backend/README.md)
* [Swagger / OpenAPI](https://gogomap-backend.onrender.com/swagger-ui/index.html)

---

