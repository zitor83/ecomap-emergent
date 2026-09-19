# GoGoMap Backend

API REST del proyecto **GoGoMap**, desarrollada con Java y Spring Boot. Gestiona los puntos ODS de Málaga, usuarios, autenticación, favoritos y las funcionalidades de gamificación de la aplicación.

## 🛠️ Stack tecnológico

| Tecnología      | Versión / uso                   |
| --------------- | ------------------------------- |
| Java            | 21                              |
| Spring Boot     | 3.5.14                          |
| Spring Web MVC  | Spring Boot 3.5.14              |
| Spring Security | 6.5.10                          |
| Spring Data JPA | Gestionado por Spring Boot      |
| Hibernate ORM   | 6.6.49.Final                    |
| MySQL           | 8.x                             |
| MapStruct       | 1.5.5.Final                     |
| Lombok          | 1.18.x                          |
| Maven           | Build y gestión de dependencias |
| Docker          | Imagen para despliegue          |

---

## 📋 Funcionalidades

El backend proporciona:

* Registro e inicio de sesión de usuarios.
* Autenticación stateless mediante JWT.
* Gestión del perfil de usuario.
* Gestión de puntos de interés ODS.
* Favoritos.
* Acciones sobre puntos y sistema de karma.
* Ranking de usuarios.
* Logros.
* Recompensas.
* Ruleta diaria.
* Carga inicial de puntos ODS desde archivos GeoJSON.
* API REST documentada mediante Swagger/OpenAPI.
* Gestión global de excepciones.

---

## 🏗️ Arquitectura

El backend utiliza una **arquitectura en capas**, separando principalmente:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Las entidades JPA representan el modelo persistente y los DTO permiten separar los datos expuestos por la API de las entidades internas.

MapStruct se utiliza para realizar determinados mapeos entre entidades y DTOs.

### Principales paquetes

```text
src/main/java/com/esplai/backendgogomap/

├── auth/
│   ├── controller/
│   ├── dto/
│   ├── service/
│   └── exception/
│
├── config/
│
├── controllers/
│
├── exceptions/
│
├── mappers/
│
├── models/
│
├── repositories/
│
└── services/
```

Los nombres y responsabilidades concretas pueden evolucionar junto con el proyecto.

---

# 💻 Requisitos

Para ejecutar el backend localmente se necesita:

* **JDK 21**
* **Maven**
* **MySQL 8.x**
* Git, si se va a clonar el repositorio

Comprobar Java:

```bash
java -version
```

Comprobar Maven:

```bash
mvn --version
```

> El Maven Wrapper incluido actualmente en el repositorio (`mvnw` / `mvnw.cmd`) necesita ser revisado antes de utilizarlo como alternativa reproducible. Por este motivo, las instrucciones de este README utilizan Maven instalado en el sistema.

---

# 🚀 Configuración local

## 1. Base de datos

El backend utiliza MySQL.

Por ejemplo, para una instalación local:

```sql
CREATE DATABASE gogomap_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

El nombre, usuario, contraseña y demás parámetros pueden configurarse mediante variables de entorno.

---

## 2. Variables de entorno

Las principales variables utilizadas por el backend son:

| Variable                 | Descripción                         | Ejemplo                                                     |
| ------------------------ | ----------------------------------- | ----------------------------------------------------------- |
| `DB_URL`                 | URL JDBC de MySQL                   | `jdbc:mysql://localhost:3306/gogomap_db?serverTimezone=UTC` |
| `DB_USERNAME`            | Usuario de la base de datos         | `root`                                                      |
| `DB_PASSWORD`            | Contraseña de MySQL                 | `tu_password`                                               |
| `JWT_SECRET`             | Clave utilizada para firmar los JWT | `tu_clave_secreta`                                          |
| `JWT_EXPIRATION_MINUTES` | Duración del JWT en minutos         | `1440`                                                      |

No se deben almacenar credenciales reales en el repositorio.

### Desarrollo local

La configuración de `application.properties` proporciona valores por defecto para facilitar el desarrollo local.

La configuración debe revisarse antes de utilizar el backend contra una base de datos diferente de la local.

---

# ▶️ Ejecutar el backend

Desde el directorio `backend`:

```bash
mvn clean install
```

Ejecutar la aplicación:

```bash
mvn spring-boot:run
```

Por defecto, el backend local está disponible en:

```text
http://localhost:8080
```

### Crear el JAR

```bash
mvn clean package
```

El artefacto generado actualmente es:

```text
target/backend-GoGoMap-0.0.1-SNAPSHOT.jar
```

Y puede ejecutarse mediante:

```bash
java -jar target/backend-GoGoMap-0.0.1-SNAPSHOT.jar
```

---

# 🔌 API REST

## URL base local

```text
http://localhost:8080
```

La API utiliza dos prefijos principales:

```text
/api/auth
/api/v1
```

---

## 🔐 Autenticación

| Método | Endpoint             | Acceso  |
| ------ | -------------------- | ------- |
| `POST` | `/api/auth/register` | Público |
| `POST` | `/api/auth/login`    | Público |

### Registro

```http
POST /api/auth/register
Content-Type: application/json
```

Ejemplo de petición:

```json
{
  "nombre": "Juan",
  "apellidos": "García López",
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

La autenticación devuelve un token JWT que el cliente debe enviar posteriormente mediante:

```http
Authorization: Bearer <token>
```

---

## 📍 Puntos ODS

| Método | Endpoint                             | Acceso    |
| ------ | ------------------------------------ | --------- |
| `GET`  | `/api/v1/points`                     | Público   |
| `GET`  | `/api/v1/points/{id}`                | Público   |
| `POST` | `/api/v1/points/{id}/actions`        | Protegido |
| `GET`  | `/api/v1/points/{id}/actions/status` | Protegido |

Los endpoints de consulta de puntos son públicos.

---

## 👤 Usuarios

| Método | Endpoint                | Acceso    |
| ------ | ----------------------- | --------- |
| `GET`  | `/api/v1/users/me`      | Protegido |
| `PUT`  | `/api/v1/users/me`      | Protegido |
| `GET`  | `/api/v1/users/ranking` | Protegido |

---

## ⭐ Favoritos

| Método   | Endpoint                               | Acceso    |
| -------- | -------------------------------------- | --------- |
| `GET`    | `/api/v1/users/me/favorites`           | Protegido |
| `POST`   | `/api/v1/users/me/favorites/{pointId}` | Protegido |
| `DELETE` | `/api/v1/users/me/favorites/{pointId}` | Protegido |

---

## 🎮 Gamificación

### Ruleta diaria

| Método | Endpoint                             |
| ------ | ------------------------------------ |
| `GET`  | `/api/v1/users/me/wheel-spin/status` |
| `POST` | `/api/v1/users/me/wheel-spin`        |

### Logros

```http
GET /api/v1/users/me/achievements
```

### Recompensas

```http
GET  /api/v1/users/me/rewards
POST /api/v1/users/me/rewards/{rewardId}/buy
```

Todos estos endpoints requieren autenticación.

---

# 🔐 Seguridad

La aplicación utiliza Spring Security con autenticación **stateless** basada en JWT.

### Características principales

* JWT para autenticación.
* Contraseñas almacenadas mediante BCrypt.
* Validación de tokens mediante Spring Security.
* Control de acceso para endpoints protegidos.
* CORS configurado para permitir la comunicación con el frontend.
* CSRF deshabilitado para la API stateless.

El token se envía mediante la cabecera:

```http
Authorization: Bearer <token>
```

### CORS

En el entorno actual se permiten:

```text
http://localhost:5173
https://gogomap-frontend.onrender.com
```

La segunda URL corresponde al frontend desplegado en Render.

---

# ⚠️ Manejo de errores

El backend dispone de gestión global de excepciones mediante `@RestControllerAdvice`.

Las respuestas de error utilizan un formato JSON consistente.

Ejemplo:

```json
{
  "timestamp": "2026-05-26T19:52:56.007",
  "status": 404,
  "error": "Not Found",
  "message": "Punto de Mapa no encontrado",
  "path": "/api/v1/points/99999"
}
```

Entre los códigos utilizados por la API se encuentran:

| Código | Significado                      |
| ------ | -------------------------------- |
| `200`  | Operación correcta               |
| `400`  | Petición incorrecta / validación |
| `401`  | No autenticado                   |
| `403`  | Acceso no permitido              |
| `404`  | Recurso no encontrado            |
| `409`  | Conflicto                        |
| `500`  | Error interno                    |

Los códigos concretos dependen del endpoint y de la excepción producida.

---

# 🌱 Carga inicial de datos

El backend incluye mecanismos de inicialización de datos durante el arranque de la aplicación.

Los puntos ODS se cargan desde los archivos GeoJSON situados en:

```text
src/main/resources/data/
```

Estos archivos contienen los datos utilizados para poblar inicialmente los puntos del mapa.

Durante el arranque también se inicializan los datos necesarios para determinadas funcionalidades de la aplicación, como logros y recompensas.

La aplicación utiliza Hibernate con:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Actualmente no se utiliza Flyway, Liquibase ni otro sistema de migraciones versionadas.

---

# 🧪 Testing

Actualmente el backend dispone de un test de contexto de Spring Boot:

```text
src/test/java/com/esplai/backendgogomap/BackendEcomapApplicationTests.java
```

Ejecutar:

```bash
mvn test
```

El test comprueba que el contexto principal de Spring Boot puede iniciarse correctamente.

---

# 📖 Swagger / OpenAPI

La API dispone de documentación interactiva mediante Swagger UI.

### Local

```text
http://localhost:8080/swagger-ui/index.html
```

### Producción

```text
https://gogomap-backend.onrender.com/swagger-ui/index.html
```

Swagger permite consultar los endpoints disponibles y probar las peticiones de la API.

Para endpoints protegidos se puede utilizar el botón **Authorize** e introducir el JWT mediante el formato:

```text
Bearer <token>
```

---

# 🐳 Docker

El backend dispone de un `Dockerfile` para generar la imagen utilizada en el despliegue.

La construcción utiliza dos etapas:

```text
Maven + JDK 21
      ↓
Compilación del proyecto
      ↓
JRE 21
      ↓
Ejecución del JAR
```

El Dockerfile se encuentra en:

```text
backend/Dockerfile
```

La imagen expone el puerto:

```text
8080
```

La configuración del servicio de producción puede establecer variables de entorno y el puerto utilizado por la plataforma.

---

# ☁️ Deployment

El backend está desplegado actualmente en **Render** como Web Service.

**API de producción:**

https://gogomap-backend.onrender.com

La base de datos de producción está alojada en **Aiven MySQL**.

Arquitectura de producción:

```text
GoGoMap Frontend
       │
       │ HTTPS / REST
       ▼
GoGoMap Backend
       │
       │ MySQL + SSL
       ▼
Aiven MySQL
```

### Variables de producción

El servicio utiliza variables de entorno para la configuración sensible:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION_MINUTES
SERVER_PORT
```

Los valores reales no están incluidos en el repositorio.

La configuración del servicio de Render no está versionada mediante `render.yaml`.

---

# 📂 Estructura principal

```text
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/esplai/backendgogomap/
│   │   │       ├── auth/
│   │   │       ├── config/
│   │   │       ├── controllers/
│   │   │       ├── exceptions/
│   │   │       ├── mappers/
│   │   │       ├── models/
│   │   │       ├── repositories/
│   │   │       └── services/
│   │   │
│   │   └── resources/
│   │       ├── data/
│   │       └── application.properties
│   │
│   └── test/
│
├── Dockerfile
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

# 🔧 Desarrollo

Para trabajar sobre el backend:

```bash
mvn clean install
mvn test
mvn spring-boot:run
```

Antes de realizar cambios importantes se recomienda comprobar:

```bash
mvn test
```

y verificar manualmente los endpoints afectados.

---

## 🔗 Enlaces

* **Proyecto:** https://github.com/zitor83/ecomap-emergent
* **Frontend:** https://gogomap-frontend.onrender.com
* **Backend:** https://gogomap-backend.onrender.com
* **Swagger:** https://gogomap-backend.onrender.com/swagger-ui/index.html

### Documentación oficial

* [Spring Boot](https://spring.io/projects/spring-boot)
* [Spring Security](https://spring.io/projects/spring-security)
* [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
* [MapStruct](https://mapstruct.org/)
* [JWT](https://jwt.io/introduction)
* [MySQL](https://www.mysql.com/)
* [Render](https://render.com/)
* [Aiven](https://aiven.io/)
